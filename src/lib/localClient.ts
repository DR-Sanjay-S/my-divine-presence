/**
 * Data client — Supabase-backed, drop-in compatible with the previous
 * localStorage shim so pages don't need to change imports.
 *
 * The exported `supabase` is the real Supabase JS client, with one wrapper:
 * `from(table).insert(payload)` automatically stamps `user_id` from the
 * currently signed-in user. Everything else passes straight through.
 */

import { supabase as realSupabase } from "@/integrations/supabase/client";

export const TABLES = [
  "people",
  "organizations",
  "opportunities",
  "podcasts",
  "events",
  "notes",
  "journal_entries",
  "tags",
  "relationships",
] as const;

export type TableName = (typeof TABLES)[number];

// Cache user id for synchronous insert wrapping
let currentUserId: string | null = null;
realSupabase.auth.getSession().then(({ data }) => {
  currentUserId = data.session?.user?.id ?? null;
});
realSupabase.auth.onAuthStateChange((_event, session) => {
  currentUserId = session?.user?.id ?? null;
});

function wrapFrom(table: string) {
  const builder: any = (realSupabase as any).from(table);
  const origInsert = builder.insert.bind(builder);
  builder.insert = (payload: any, opts?: any) => {
    const stamp = (r: any) => ({ ...r, user_id: r?.user_id ?? currentUserId });
    const fixed = Array.isArray(payload) ? payload.map(stamp) : stamp(payload);
    return origInsert(fixed, opts);
  };
  return builder;
}

export const supabase = new Proxy(realSupabase, {
  get(target, prop, receiver) {
    if (prop === "from") return (table: string) => wrapFrom(table);
    return Reflect.get(target, prop, receiver);
  },
}) as typeof realSupabase;

// ---------- backup / restore (cloud-backed) ----------
export async function exportAll(): Promise<string> {
  const dump: Record<string, any[]> = {};
  for (const t of TABLES) {
    const { data } = await (realSupabase as any).from(t).select("*");
    dump[t] = data ?? [];
  }
  return JSON.stringify(
    { app: "god-plan-os", version: 2, exported_at: new Date().toISOString(), data: dump },
    null,
    2,
  );
}

export async function importAll(json: string, mode: "replace" | "merge" = "merge") {
  if (!currentUserId) throw new Error("Sign in first");
  const parsed = JSON.parse(json);
  const data = parsed?.data ?? parsed;
  if (!data || typeof data !== "object") throw new Error("Invalid backup file");

  if (mode === "replace") {
    for (const t of TABLES) {
      await (realSupabase as any).from(t).delete().eq("user_id", currentUserId);
    }
  }

  for (const t of TABLES) {
    const rows: any[] = Array.isArray(data[t]) ? data[t] : [];
    if (rows.length === 0) continue;
    const stamped = rows.map(({ id, created_at, updated_at, user_id, ...rest }) => ({
      ...rest,
      user_id: currentUserId,
    }));
    // Insert in chunks of 100
    for (let i = 0; i < stamped.length; i += 100) {
      await (realSupabase as any).from(t).insert(stamped.slice(i, i + 100));
    }
  }
}

export async function clearAll() {
  if (!currentUserId) throw new Error("Sign in first");
  for (const t of TABLES) {
    await (realSupabase as any).from(t).delete().eq("user_id", currentUserId);
  }
}

export async function tableCounts(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const t of TABLES) {
    const { count } = await (realSupabase as any).from(t).select("*", { count: "exact", head: true });
    out[t] = count ?? 0;
  }
  return out;
}

/** Migrate any rows left behind in the old localStorage shim into Supabase. */
export async function migrateFromLocalStorage(): Promise<{ migrated: number; tables: Record<string, number> }> {
  if (!currentUserId) throw new Error("Sign in first");
  const PREFIX = "mpb:";
  const result: Record<string, number> = {};
  let total = 0;
  for (const t of TABLES) {
    let rows: any[] = [];
    try {
      rows = JSON.parse(localStorage.getItem(PREFIX + t) || "[]");
    } catch {
      rows = [];
    }
    if (!Array.isArray(rows) || rows.length === 0) {
      result[t] = 0;
      continue;
    }
    const stamped = rows.map(({ id, created_at, updated_at, user_id, ...rest }) => ({
      ...rest,
      user_id: currentUserId,
    }));
    for (let i = 0; i < stamped.length; i += 100) {
      await (realSupabase as any).from(t).insert(stamped.slice(i, i + 100));
    }
    result[t] = rows.length;
    total += rows.length;
  }
  return { migrated: total, tables: result };
}

/** Seed sample data into the current user's account. */
export async function seedSampleData() {
  if (!currentUserId) throw new Error("Sign in first");
  const { count } = await (realSupabase as any).from("people").select("*", { count: "exact", head: true });
  if ((count ?? 0) > 0) return;

  await (realSupabase as any).from("organizations").insert([
    { name: "Nexcubic", type: "Startup", industry: "Tech", website: "https://nexcubic.com", description: "Founder.", user_id: currentUserId },
    { name: "Charans Degree College", type: "College", industry: "Education", user_id: currentUserId },
  ]);
  await (realSupabase as any).from("people").insert([
    { name: "Sample Founder", company: "Nexcubic", role: "CEO", category: "Founder", status: "Connected", email: "founder@example.com", tags: ["startup","blr"], user_id: currentUserId },
    { name: "Sample Investor", company: "Angel Network", role: "Partner", category: "Investor", status: "Contacted", tags: ["funding"], user_id: currentUserId },
  ]);
  await (realSupabase as any).from("opportunities").insert([
    { title: "College AI Workshop Partnership", type: "College Collaboration", status: "Discussion", priority: "High", user_id: currentUserId },
  ]);
  await (realSupabase as any).from("notes").insert([
    { title: "Welcome to GOD PLAN OS", content: "# Hello\n\nYour Founder OS is live. Add people, opportunities, ideas.", tags: ["welcome"], user_id: currentUserId },
  ]);
}
