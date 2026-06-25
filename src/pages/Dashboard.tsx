import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/localClient";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard, Users, Rocket, Banknote, GraduationCap,
  BookOpen as BookIcon, Target, CalendarDays, Bell, Mic, Sparkles, Brain, Network,
} from "lucide-react";
import { Link } from "react-router-dom";
import { OPPORTUNITY_STATUSES } from "@/lib/constants";

function StatCard({ icon: Icon, label, value, to }: any) {
  return (
    <Link to={to} className="block">
      <Card className="p-4 hover:border-primary/40 transition-colors h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{label}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 text-3xl font-semibold">{value ?? "—"}</div>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const [people, founders, investors, professors, students, opps, events, followups, podcasts] = await Promise.all([
        supabase.from("people").select("id", { count: "exact", head: true }),
        supabase.from("people").select("id", { count: "exact", head: true }).eq("category", "Founder"),
        supabase.from("people").select("id", { count: "exact", head: true }).eq("category", "Investor"),
        supabase.from("people").select("id", { count: "exact", head: true }).eq("category", "Professor"),
        supabase.from("people").select("id", { count: "exact", head: true }).eq("category", "Student"),
        supabase.from("opportunities").select("id", { count: "exact", head: true }).eq("status", "Active"),
        supabase.from("events").select("id", { count: "exact", head: true }).gte("date", today),
        supabase.from("people").select("id", { count: "exact", head: true }).gte("follow_up_date", today),
        supabase.from("podcasts").select("id", { count: "exact", head: true }).not("status", "in", "(Published)"),
      ]);
      return {
        people: people.count ?? 0,
        founders: founders.count ?? 0,
        investors: investors.count ?? 0,
        professors: professors.count ?? 0,
        students: students.count ?? 0,
        activeOpps: opps.count ?? 0,
        upcomingEvents: events.count ?? 0,
        upcomingFollowUps: followups.count ?? 0,
        podcastPipeline: podcasts.count ?? 0,
      };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const [contacts, notes, followUps, meetings, oppPipeline] = await Promise.all([
        supabase.from("people").select("id,name,company,category,created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("notes").select("id,title,created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("people").select("id,name,follow_up_date").not("follow_up_date", "is", null).gte("follow_up_date", today).order("follow_up_date").limit(5),
        supabase.from("events").select("id,name,date").gte("date", today).order("date").limit(5),
        supabase.from("opportunities").select("status"),
      ]);
      return {
        contacts: contacts.data ?? [],
        notes: notes.data ?? [],
        followUps: followUps.data ?? [],
        meetings: meetings.data ?? [],
        oppPipeline: oppPipeline.data ?? [],
      };
    },
  });

  const oppCounts = OPPORTUNITY_STATUSES.map((s) => ({
    status: s,
    count: recent?.oppPipeline.filter((o: any) => o.status === s).length ?? 0,
  }));

  return (
    <div>
      <PageHeader
        icon={<LayoutDashboard className="h-5 w-5" />}
        title="Dashboard"
        subtitle="Your founder operating system at a glance."
      />

      <div className="px-4 md:px-8 py-6 space-y-8">
        {/* Stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard icon={Users} label="People" value={stats?.people} to="/people" />
          <StatCard icon={Rocket} label="Founders" value={stats?.founders} to="/people" />
          <StatCard icon={Banknote} label="Investors" value={stats?.investors} to="/people" />
          <StatCard icon={GraduationCap} label="Professors" value={stats?.professors} to="/people" />
          <StatCard icon={BookIcon} label="Students" value={stats?.students} to="/people" />
          <StatCard icon={Target} label="Active Opps" value={stats?.activeOpps} to="/opportunities" />
          <StatCard icon={CalendarDays} label="Upcoming Events" value={stats?.upcomingEvents} to="/events" />
          <StatCard icon={Bell} label="Follow-ups" value={stats?.upcomingFollowUps} to="/people" />
          <StatCard icon={Mic} label="Podcast Pipeline" value={stats?.podcastPipeline} to="/podcasts" />
        </div>

        {/* Widgets */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Recent Contacts</h3>
            <ul className="space-y-2 text-sm">
              {recent?.contacts.length ? recent.contacts.map((p: any) => (
                <li key={p.id} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                  <span className="truncate">{p.name} <span className="text-muted-foreground">· {p.company || p.category}</span></span>
                  <span className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</span>
                </li>
              )) : <li className="text-muted-foreground text-sm">No contacts yet.</li>}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Follow-ups Due</h3>
            <ul className="space-y-2 text-sm">
              {recent?.followUps.length ? recent.followUps.map((p: any) => (
                <li key={p.id} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                  <span className="truncate">{p.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{p.follow_up_date}</span>
                </li>
              )) : <li className="text-muted-foreground text-sm">Nothing pending.</li>}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> Upcoming Meetings</h3>
            <ul className="space-y-2 text-sm">
              {recent?.meetings.length ? recent.meetings.map((e: any) => (
                <li key={e.id} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                  <span className="truncate">{e.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{e.date}</span>
                </li>
              )) : <li className="text-muted-foreground text-sm">No upcoming events.</li>}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><BookIcon className="h-4 w-4 text-primary" /> Recent Notes</h3>
            <ul className="space-y-2 text-sm">
              {recent?.notes.length ? recent.notes.map((n: any) => (
                <li key={n.id} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                  <span className="truncate">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                </li>
              )) : <li className="text-muted-foreground text-sm">No notes yet.</li>}
            </ul>
          </Card>
        </div>

        {/* Opportunity pipeline */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Opportunity Pipeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {oppCounts.map((o) => (
              <div key={o.status} className="rounded-lg border border-border bg-muted/20 px-3 py-3 text-center">
                <div className="text-2xl font-semibold">{o.count}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{o.status}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI placeholder */}
        <Card className="p-5 border-dashed">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI-Ready Intelligence <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Coming Soon</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {[
              { icon: Bell, t: "Follow-up Suggestions" },
              { icon: Brain, t: "Relationship Intelligence" },
              { icon: Target, t: "Opportunity Recommendations" },
              { icon: CalendarDays, t: "Event Recommendations" },
              { icon: Network, t: "Network Mapping" },
            ].map((it) => (
              <div key={it.t} className="rounded-lg border border-dashed border-border p-3 text-center text-muted-foreground">
                <it.icon className="h-4 w-4 mx-auto mb-2 text-primary/60" />
                {it.t}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
