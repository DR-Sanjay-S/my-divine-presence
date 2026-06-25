# My Personal Book — Personal Founder OS

A private, single-user CRM and second brain — combining Notion, LinkedIn CRM, contact manager, opportunity tracker, podcast pipeline, and journal.

## Approach

Replace the current portfolio with a multi-page application. Use **Lovable Cloud** (managed Postgres + storage) for all data. No login required (single-user). Mobile-first, dark theme inspired by Linear/Notion/Superhuman. Keep your existing profile photo for the sidebar avatar.

## Design System

- **Theme**: Dark mode only, minimal, founder-focused
- **Palette**: Black `#0A0A0A` background, white `#FAFAFA` text, gray scale, subtle emerald accent (kept from current theme)
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- **Layout**: Collapsible left sidebar nav, main content area, modal-based create/edit forms

## Navigation (Sidebar)

Dashboard · People · Organizations · Opportunities · Podcasts · Events · Notes · Journal · Search

## Pages

1. **Dashboard** — Stat cards (total people, founders, investors, professors, students, active opps, upcoming events, follow-ups, podcast pipeline) + widgets (recent contacts, recent notes, follow-ups due, upcoming meetings, opportunity status pipeline)
2. **People** — Searchable/filterable table with cards view; create/edit modal with all fields incl. categories, relationship status, tags, follow-up date, related entities
3. **Organizations** — Grid of org cards with logo, type filters, detail drawer
4. **Opportunities** — Kanban board by status (Idea → Won/Lost) + list view; filter by type/priority
5. **Podcasts** — Pipeline view by guest status (Idea → Published)
6. **Events** — List + calendar-style view; "Auto-aggregation coming soon" placeholder
7. **Notes** — Markdown editor with tags, links to people/orgs (note-style cards)
8. **Journal** — Daily entry form (mood, wins, lessons, challenges, ideas) + timeline of past entries
9. **Search** — Global instant search across all entities

## AI-Ready Placeholders (UI only, no logic yet)

Cards on dashboard for: Follow-up Suggestions, Relationship Intelligence, Opportunity Recommendations, Event Recommendations, Network Mapping — all marked "Coming Soon".

## Database Schema (Lovable Cloud)

```text
people                organizations           opportunities
- id                  - id                    - id
- name                - name                  - title
- photo_url           - logo_url              - type (enum)
- company             - website               - status (enum)
- role                - industry              - value
- category (enum)     - type (enum)           - priority
- phone               - description           - expected_date
- email               - founder               - notes
- linkedin            - notes                 - created_at
- website
- location            podcasts                events
- status (enum)       - id                    - id
- notes               - guest_name            - name
- follow_up_date      - organization          - date
- created_at          - status (enum)         - location
                      - recording_date        - organizer
notes                 - publishing_date       - registration_link
- id                  - topics                - type (enum)
- title               - notes                 - notes
- content (md)
- tags                journal_entries         tags (lookup)
- created_at          - id                    - id, name
                      - entry_date
relationships         - mood                  
(join table for       - wins                  
people↔opps,          - lessons               
people↔orgs,          - challenges            
people↔podcasts,      - ideas                 
note↔people, etc.)
```

All enums (categories, statuses, types) implemented as Postgres enums or text with check constraints.

## Tech Notes

- **Backend**: Lovable Cloud (Supabase under the hood) for database + photo/logo storage
- **No authentication** — single-user app, all data accessible
- **State**: TanStack Query for data fetching/caching
- **Forms**: react-hook-form + zod validation
- **Routing**: React Router with sidebar layout
- **Components**: Existing shadcn/ui set (Card, Dialog, Table, Tabs, etc.)
- **Routes**: `/`, `/people`, `/organizations`, `/opportunities`, `/podcasts`, `/events`, `/notes`, `/journal`, `/search`
- **Future-ready**: Schema includes timestamps + soft enum fields for AI features later

## Build Order

1. Enable Lovable Cloud + create all 9 tables with seed enums
2. App shell: sidebar layout + routing + dark theme tokens
3. Dashboard with live stat queries
4. People CRM (most-used; full CRUD + filters)
5. Organizations + Opportunities (Kanban)
6. Podcasts + Events
7. Notes + Journal
8. Global Search
9. Polish + mobile responsive pass

## What Gets Removed

The current single-page portfolio (`src/pages/Index.tsx` becomes the new Dashboard). Your profile photo (`src/assets/sanjay-profile.jpg`) stays, used in the sidebar avatar. Resume PDF generator stays available but not linked from main UI.

---

**Approve to start building.** I'll enable Lovable Cloud first, set up the schema, then build out pages in the order above.
