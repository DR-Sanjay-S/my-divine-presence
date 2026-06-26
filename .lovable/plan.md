# GOD PLAN OS — Migration & Upgrade Plan

This is a large scope. I'll break it into shippable phases so you can use the app between phases instead of waiting weeks for one giant drop. Please confirm the phase order and answer the questions at the bottom before I start.

## Phase 1 — Auth + Supabase backbone (ship first)

Goal: real multi-user app with your existing modules backed by Supabase.

1. **Database**
   - Create `profiles` table (linked to `auth.users`, auto-created on signup via trigger).
   - Add `user_id uuid not null` to every existing table: `people`, `organizations`, `opportunities`, `podcasts`, `events`, `notes`, `journal_entries`, `tags`, `relationships`.
   - Drop the current permissive RLS policies. Replace with strict `auth.uid() = user_id` policies (SELECT/INSERT/UPDATE/DELETE).
   - Add indexes on `user_id` and common filter columns.
   - Add `updated_at` triggers where missing.

2. **Auth**
   - Email + password (signup, login, logout).
   - Google OAuth (managed, no setup needed from you).
   - Forgot password + `/reset-password` page.
   - Auto-login after signup, persistent session, secure logout.
   - Route guard: unauthenticated users → `/auth`.

3. **Auth UI ("Founder OS" theme)**
   - Single `/auth` page with Login / Signup / Forgot tabs.
   - Dark glassmorphism, animated gradient mesh background, floating particles, Framer Motion fade-ins.
   - GOD PLAN logo + tagline "Your Personal Founder Operating System".
   - Google button + email/password form.

4. **Client swap**
   - Replace `src/lib/localClient.ts` usage with the real `@/integrations/supabase/client`.
   - Keep a one-time "Import from local backup" button on Settings so your existing local data isn't lost — it reads the old localStorage rows and inserts them into Supabase under the current user.
   - Keep Export JSON / Import JSON / Clear all in Settings.

After Phase 1 you have: real auth, real DB, RLS isolation, all existing pages working per-user.

## Phase 2 — New modules

New tables + pages, same RLS pattern:
- `tasks` (title, description, priority, status, due_date, person_id, org_id) with **Board / List / Calendar** views.
- `companies` — re-uses `organizations` but adds founder/stage/industry/status fields if missing.
- `investors`, `founders` — views/filters over `people` with a `category` flag (avoid duplicating data).
- `calendar_events` — unified calendar source combining tasks, events, podcasts, follow-ups.
- `collaborations`, `campus_ambassadors` — separate tables.
- `activity_logs` — auto-written on create/update/delete via triggers for the Daily/Monthly History pages.
- `documents` — Supabase Storage bucket `documents` (private) + metadata table.

## Phase 3 — Cross-cutting features

- **Smart Calendar** page (day/week/month) using `react-big-calendar` or FullCalendar, sourced from `calendar_events` view.
- **Global Search** — Postgres `tsvector` across people/orgs/notes/tasks/podcasts/events/journal with a single endpoint + `/search` page.
- **Follow-up system** — dashboard widget querying `follow_up_date <= today` across people + tasks.
- **Dashboard** — stat cards + charts (Recharts): growth, opportunity pipeline, podcast pipeline, task status.
- **Notification center** — bell icon, queries upcoming follow-ups/tasks/events for next 7 days.
- **Activity History** pages (Today / This Month) from `activity_logs`.
- **Founder Network Map** — `react-force-graph-2d` visualization of `relationships`.
- **Import/Export** — CSV/Excel via `papaparse` + `xlsx`; JSON already done. "Download Full Backup" zips everything for the current user.
- **Light mode toggle** (dark stays default).

## Tech additions
- `@supabase/supabase-js` (already present), Framer Motion (present), Recharts, react-big-calendar, papaparse, xlsx, react-force-graph-2d, date-fns.

## Out-of-scope clarifications
- "Google Calendar sync" (two-way) is a big external integration — I'll build the Google Calendar **UI style**, not real sync, unless you explicitly want OAuth Calendar API later.
- Real-time push notifications (browser/email) are out of scope for now; in-app bell only.

---

## Questions before I start

1. **Phase 1 only first, or do you want me to keep going straight through Phases 2 and 3 in one long session?** (Phase 1 alone is already a big migration; doing all three in one go means a longer wait before you can test anything.)
2. **Existing localStorage data** — do you want me to (a) auto-migrate it to Supabase on first login, (b) add a manual "Import local backup" button in Settings, or (c) discard it?
3. **Google sign-in** — enable it by default alongside email/password? (Recommended.)
4. **Light mode** — required in Phase 1, or fine to defer to Phase 3?
