/**
 * Local-first data client — drop-in replacement for the Supabase JS client
 * for the subset of operations this app uses. Backed by localStorage.
 *
 * Usage stays identical to supabase-js:
 *   supabase.from("people").select("*").order("created_at",{ascending:false})
 *   supabase.from("people").insert({...})
 *   supabase.from("people").update({...}).eq("id", id)
 *   supabase.from("people").delete().eq("id", id)
 *
 * To migrate to real Supabase later: swap the import path in each page from
 * "@/lib/localClient" back to "@/integrations/supabase/client". The query
 * shapes are intentionally compatible.
 */

type Row = Record<string, any>;
const PREFIX = "mpb:";

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

// ---------- storage helpers ----------
function load(table: string): Row[] {
  try {
    return JSON.parse(localStorage.getItem(PREFIX + table) || "[]");
  } catch {
    return [];
  }
}
function save(table: string, rows: Row[]) {
  localStorage.setItem(PREFIX + table, JSON.stringify(rows));
  window.dispatchEvent(new CustomEvent("mpb:change", { detail: { table } }));
}

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
const now = () => new Date().toISOString();

// ---------- filter primitives ----------
function ilikeToRegex(pattern: string) {
  const esc = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/%/g, ".*")
    .replace(/_/g, ".");
  return new RegExp(`^${esc}$`, "i");
}

function parseInList(v: any): any[] {
  if (Array.isArray(v)) return v;
  const s = String(v).trim();
  if (s.startsWith("(") && s.endsWith(")")) return s.slice(1, -1).split(",").map((x) => x.trim());
  return [s];
}

function parseOrFilter(expr: string): (r: Row) => boolean {
  // pattern: "col.op.value" — value may contain dots
  const m = expr.match(/^([^.]+)\.([^.]+)\.(.*)$/);
  if (!m) return () => false;
  const [, col, op, raw] = m;
  if (op === "ilike") {
    const re = ilikeToRegex(raw);
    return (r) => r[col] != null && re.test(String(r[col]));
  }
  if (op === "eq") return (r) => r[col] === raw;
  if (op === "neq") return (r) => r[col] !== raw;
  return () => false;
}

// ---------- query builder ----------
type ExecResult = { data: any; error: any; count?: number };

class Query implements PromiseLike<ExecResult> {
  private filters: Array<(r: Row) => boolean> = [];
  private orderBy: { col: string; asc: boolean } | null = null;
  private _limit: number | null = null;
  private _head = false;
  private _count: "exact" | null = null;
  private mode: "select" | "insert" | "update" | "delete" = "select";
  private payload: any = null;

  constructor(private table: string) {}

  select(_cols = "*", opts?: { count?: "exact"; head?: boolean }) {
    if (opts?.count) this._count = opts.count;
    if (opts?.head) this._head = true;
    return this;
  }
  insert(p: any) {
    this.mode = "insert";
    this.payload = p;
    return this;
  }
  update(p: any) {
    this.mode = "update";
    this.payload = p;
    return this;
  }
  delete() {
    this.mode = "delete";
    return this;
  }

  eq(c: string, v: any) { this.filters.push((r) => r[c] === v); return this; }
  neq(c: string, v: any) { this.filters.push((r) => r[c] !== v); return this; }
  gte(c: string, v: any) { this.filters.push((r) => r[c] != null && r[c] >= v); return this; }
  lte(c: string, v: any) { this.filters.push((r) => r[c] != null && r[c] <= v); return this; }
  gt(c: string, v: any) { this.filters.push((r) => r[c] != null && r[c] > v); return this; }
  lt(c: string, v: any) { this.filters.push((r) => r[c] != null && r[c] < v); return this; }
  ilike(c: string, pattern: string) {
    const re = ilikeToRegex(pattern);
    this.filters.push((r) => r[c] != null && re.test(String(r[c])));
    return this;
  }
  not(c: string, op: string, v: any) {
    if (op === "is" && v === null) this.filters.push((r) => r[c] != null);
    else if (op === "in") {
      const vals = parseInList(v);
      this.filters.push((r) => !vals.includes(r[c]));
    } else {
      this.filters.push((r) => r[c] !== v);
    }
    return this;
  }
  or(expr: string) {
    const parts = expr.split(",").map(parseOrFilter);
    this.filters.push((r) => parts.some((fn) => fn(r)));
    return this;
  }
  order(col: string, opts?: { ascending?: boolean }) {
    this.orderBy = { col, asc: opts?.ascending !== false };
    return this;
  }
  limit(n: number) { this._limit = n; return this; }

  private async exec(): Promise<ExecResult> {
    let rows = load(this.table);

    if (this.mode === "insert") {
      const items = Array.isArray(this.payload) ? this.payload : [this.payload];
      const newRows = items.map((it) => ({
        id: it.id || uuid(),
        ...it,
        created_at: it.created_at || now(),
        updated_at: now(),
      }));
      save(this.table, [...newRows, ...rows]);
      return { data: newRows, error: null };
    }

    if (this.mode === "update") {
      const updated: Row[] = [];
      const next = rows.map((r) => {
        if (this.filters.every((f) => f(r))) {
          const u = { ...r, ...this.payload, updated_at: now() };
          updated.push(u);
          return u;
        }
        return r;
      });
      save(this.table, next);
      return { data: updated, error: null };
    }

    if (this.mode === "delete") {
      const kept = rows.filter((r) => !this.filters.every((f) => f(r)));
      save(this.table, kept);
      return { data: null, error: null };
    }

    // SELECT
    let result = rows.filter((r) => this.filters.every((f) => f(r)));
    if (this.orderBy) {
      const { col, asc } = this.orderBy;
      result.sort((a, b) => {
        const av = a[col], bv = b[col];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (av < bv) return asc ? -1 : 1;
        if (av > bv) return asc ? 1 : -1;
        return 0;
      });
    }
    const total = result.length;
    if (this._limit != null) result = result.slice(0, this._limit);
    const count = this._count ? total : undefined;
    if (this._head) return { data: null, error: null, count };
    return { data: result, error: null, count };
  }

  then<TResolve = ExecResult, TReject = never>(
    resolve?: ((v: ExecResult) => TResolve | PromiseLike<TResolve>) | null,
    reject?: ((e: any) => TReject | PromiseLike<TReject>) | null
  ): PromiseLike<TResolve | TReject> {
    return this.exec().then(resolve as any, reject as any);
  }
}

// ---------- public client ----------
export const supabase = {
  from(table: string) {
    return new Query(table);
  },
};

// ---------- backup / restore ----------
export function exportAll(): string {
  const dump: Record<string, any[]> = {};
  for (const t of TABLES) dump[t] = load(t);
  return JSON.stringify(
    { app: "my-personal-book", version: 1, exported_at: now(), data: dump },
    null,
    2
  );
}

export function importAll(json: string, mode: "replace" | "merge" = "replace") {
  const parsed = JSON.parse(json);
  const data = parsed?.data ?? parsed;
  if (!data || typeof data !== "object") throw new Error("Invalid backup file");
  for (const t of TABLES) {
    const incoming: Row[] = Array.isArray(data[t]) ? data[t] : [];
    if (mode === "replace") {
      save(t, incoming);
    } else {
      const existing = load(t);
      const byId = new Map(existing.map((r) => [r.id, r]));
      for (const r of incoming) byId.set(r.id, r);
      save(t, Array.from(byId.values()));
    }
  }
}

export function clearAll() {
  for (const t of TABLES) save(t, []);
}

export function tableCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of TABLES) out[t] = load(t).length;
  return out;
}

export function seedSampleData() {
  if (load("people").length > 0) return;
  const orgId = uuid();
  save("organizations", [
    { id: orgId, name: "Nexcubic", type: "Startup", industry: "Tech", website: "https://nexcubic.com", description: "Founder.", created_at: now(), updated_at: now() },
    { id: uuid(), name: "Charans Degree College", type: "College", industry: "Education", created_at: now(), updated_at: now() },
  ]);
  save("people", [
    { id: uuid(), name: "Sample Founder", company: "Nexcubic", role: "CEO", category: "Founder", status: "Connected", email: "founder@example.com", tags: ["startup","blr"], created_at: now(), updated_at: now() },
    { id: uuid(), name: "Sample Investor", company: "Angel Network", role: "Partner", category: "Investor", status: "Contacted", tags: ["funding"], created_at: now(), updated_at: now() },
  ]);
  save("opportunities", [
    { id: uuid(), title: "College AI Workshop Partnership", type: "College Collaboration", status: "Discussion", priority: "High", created_at: now(), updated_at: now() },
  ]);
  save("podcasts", [
    { id: uuid(), guest_name: "Sample Guest", organization: "Nexcubic", status: "Idea", topics: "Founder journey", created_at: now(), updated_at: now() },
  ]);
  save("events", [
    { id: uuid(), name: "Bangalore Founders Meetup", date: new Date(Date.now()+7*864e5).toISOString().slice(0,10), location: "Bengaluru", type: "Founder Meetup", created_at: now(), updated_at: now() },
  ]);
  save("notes", [
    { id: uuid(), title: "Welcome to My Personal Book", content: "# Hello\n\nThis is your private CRM + second brain.\n\n- Add **people** you meet\n- Track **opportunities**\n- Capture **ideas**\n\nAll data is stored locally in this browser.", tags: ["welcome"], created_at: now(), updated_at: now() },
  ]);
  save("journal_entries", [
    { id: uuid(), entry_date: new Date().toISOString().slice(0,10), mood: "Good", wins: "Set up my personal book.", lessons: "Start small, ship daily.", challenges: "", ideas: "Connect this to Supabase later.", created_at: now(), updated_at: now() },
  ]);
}
