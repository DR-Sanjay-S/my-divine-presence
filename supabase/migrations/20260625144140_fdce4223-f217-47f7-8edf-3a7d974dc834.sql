-- =========================
-- ENUMS
-- =========================
CREATE TYPE public.person_category AS ENUM ('Founder','Investor','Professor','Student','Mentor','Trainer','Professional');
CREATE TYPE public.person_status AS ENUM ('Contacted','Connected','Meeting Scheduled','Collaborating','Partner','Mentor','Friend');
CREATE TYPE public.org_type AS ENUM ('Startup','Company','NGO','College','Government','Community');
CREATE TYPE public.opportunity_type AS ENUM ('Partnership','College Collaboration','Internship','Sponsorship','Podcast Guest','Investor Lead','Speaking Opportunity');
CREATE TYPE public.opportunity_status AS ENUM ('Idea','Contacted','Discussion','Active','Won','Lost','On Hold');
CREATE TYPE public.podcast_status AS ENUM ('Idea','Contacted','Replied','Scheduled','Recorded','Published');
CREATE TYPE public.event_type AS ENUM ('Founder Meetup','Investor Meetup','Networking','College Event','Workshop','Podcast');
CREATE TYPE public.priority_level AS ENUM ('Low','Medium','High');
CREATE TYPE public.mood_level AS ENUM ('Great','Good','Okay','Low','Bad');

-- =========================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =========================
-- ORGANIZATIONS
-- =========================
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  type public.org_type,
  description TEXT,
  founder TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.organizations TO anon, authenticated;
GRANT ALL ON public.organizations TO service_role;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access organizations" ON public.organizations FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_organizations_updated BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- PEOPLE
-- =========================
CREATE TABLE public.people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  company TEXT,
  role TEXT,
  category public.person_category,
  phone TEXT,
  email TEXT,
  linkedin TEXT,
  website TEXT,
  location TEXT,
  status public.person_status,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  follow_up_date DATE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.people TO anon, authenticated;
GRANT ALL ON public.people TO service_role;
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access people" ON public.people FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_people_updated BEFORE UPDATE ON public.people FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_people_category ON public.people(category);
CREATE INDEX idx_people_status ON public.people(status);
CREATE INDEX idx_people_follow_up ON public.people(follow_up_date);

-- =========================
-- OPPORTUNITIES
-- =========================
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type public.opportunity_type,
  status public.opportunity_status NOT NULL DEFAULT 'Idea',
  value NUMERIC,
  priority public.priority_level DEFAULT 'Medium',
  expected_date DATE,
  notes TEXT,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.opportunities TO anon, authenticated;
GRANT ALL ON public.opportunities TO service_role;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access opportunities" ON public.opportunities FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_opportunities_updated BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_opp_status ON public.opportunities(status);

-- =========================
-- PODCASTS
-- =========================
CREATE TABLE public.podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  organization TEXT,
  status public.podcast_status NOT NULL DEFAULT 'Idea',
  recording_date DATE,
  publishing_date DATE,
  topics TEXT,
  notes TEXT,
  person_id UUID REFERENCES public.people(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.podcasts TO anon, authenticated;
GRANT ALL ON public.podcasts TO service_role;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access podcasts" ON public.podcasts FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_podcasts_updated BEFORE UPDATE ON public.podcasts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- EVENTS
-- =========================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE,
  location TEXT,
  organizer TEXT,
  registration_link TEXT,
  type public.event_type,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO anon, authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_events_date ON public.events(date);

-- =========================
-- NOTES
-- =========================
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  linked_people UUID[] DEFAULT '{}',
  linked_organizations UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO anon, authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access notes" ON public.notes FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_notes_updated BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- JOURNAL ENTRIES
-- =========================
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood public.mood_level,
  wins TEXT,
  lessons TEXT,
  challenges TEXT,
  ideas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO anon, authenticated;
GRANT ALL ON public.journal_entries TO service_role;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access journal" ON public.journal_entries FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER trg_journal_updated BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_journal_date ON public.journal_entries(entry_date DESC);

-- =========================
-- TAGS (lookup)
-- =========================
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tags TO anon, authenticated;
GRANT ALL ON public.tags TO service_role;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access tags" ON public.tags FOR ALL USING (true) WITH CHECK (true);

-- =========================
-- RELATIONSHIPS (generic link table)
-- =========================
CREATE TABLE public.relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'organization' | 'opportunity' | 'podcast' | 'event' | 'note'
  entity_id UUID NOT NULL,
  relationship_label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.relationships TO anon, authenticated;
GRANT ALL ON public.relationships TO service_role;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public access relationships" ON public.relationships FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX idx_rel_person ON public.relationships(person_id);
CREATE INDEX idx_rel_entity ON public.relationships(entity_type, entity_id);