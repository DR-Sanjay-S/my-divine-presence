import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Users, Building2, Target, CalendarDays, StickyNote, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Search() {
  const [q, setQ] = useState("");

  const { data: results } = useQuery({
    queryKey: ["search", q],
    enabled: q.length > 1,
    queryFn: async () => {
      const term = `%${q}%`;
      const [people, orgs, opps, events, notes, journal] = await Promise.all([
        supabase.from("people").select("id,name,company,role").or(`name.ilike.${term},company.ilike.${term},role.ilike.${term},email.ilike.${term},notes.ilike.${term}`).limit(10),
        supabase.from("organizations").select("id,name,industry").or(`name.ilike.${term},industry.ilike.${term},description.ilike.${term}`).limit(10),
        supabase.from("opportunities").select("id,title,status").or(`title.ilike.${term},notes.ilike.${term}`).limit(10),
        supabase.from("events").select("id,name,date").or(`name.ilike.${term},location.ilike.${term},organizer.ilike.${term},notes.ilike.${term}`).limit(10),
        supabase.from("notes").select("id,title,content").or(`title.ilike.${term},content.ilike.${term}`).limit(10),
        supabase.from("journal_entries").select("id,entry_date,wins,lessons,ideas").or(`wins.ilike.${term},lessons.ilike.${term},challenges.ilike.${term},ideas.ilike.${term}`).limit(10),
      ]);
      return {
        people: people.data ?? [], orgs: orgs.data ?? [], opps: opps.data ?? [],
        events: events.data ?? [], notes: notes.data ?? [], journal: journal.data ?? [],
      };
    },
  });

  const total = results ? Object.values(results).reduce((a, b: any) => a + b.length, 0) : 0;

  return (
    <div>
      <PageHeader icon={<SearchIcon className="h-5 w-5" />} title="Search" subtitle="Search across every entity in your personal book." />
      <div className="px-4 md:px-8 py-6 max-w-3xl mx-auto">
        <div className="relative">
          <SearchIcon className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people, orgs, opportunities, notes…" className="pl-10 h-12 text-base" />
        </div>

        {q.length > 1 && (
          <div className="mt-6">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">{total} results</div>
            <div className="space-y-5">
              <Group icon={Users} title="People" to="/people" items={results?.people} render={(p: any) => <><span className="font-medium">{p.name}</span> <span className="text-muted-foreground text-xs">· {[p.role, p.company].filter(Boolean).join(" · ")}</span></>} />
              <Group icon={Building2} title="Organizations" to="/organizations" items={results?.orgs} render={(o: any) => <><span className="font-medium">{o.name}</span> <span className="text-muted-foreground text-xs">· {o.industry}</span></>} />
              <Group icon={Target} title="Opportunities" to="/opportunities" items={results?.opps} render={(o: any) => <><span className="font-medium">{o.title}</span> <span className="text-muted-foreground text-xs">· {o.status}</span></>} />
              <Group icon={CalendarDays} title="Events" to="/events" items={results?.events} render={(e: any) => <><span className="font-medium">{e.name}</span> <span className="text-muted-foreground text-xs">· {e.date}</span></>} />
              <Group icon={StickyNote} title="Notes" to="/notes" items={results?.notes} render={(n: any) => <><span className="font-medium">{n.title}</span></>} />
              <Group icon={BookOpen} title="Journal" to="/journal" items={results?.journal} render={(j: any) => <><span className="font-medium">{j.entry_date}</span> <span className="text-muted-foreground text-xs line-clamp-1">{j.wins || j.lessons || j.ideas}</span></>} />
            </div>
          </div>
        )}

        {q.length <= 1 && (
          <div className="mt-12 text-center text-muted-foreground text-sm">
            Start typing to search across people, organizations, opportunities, events, notes, and journal.
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ icon: Icon, title, to, items, render }: any) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" /> {title}</div>
      <Card className="divide-y divide-border">
        {items.map((it: any) => (
          <Link key={it.id} to={to} className="block px-4 py-2.5 text-sm hover:bg-muted/40 transition">{render(it)}</Link>
        ))}
      </Card>
    </div>
  );
}
