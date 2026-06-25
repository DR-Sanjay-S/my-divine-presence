import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, Pencil, Trash2, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { EVENT_TYPES } from "@/lib/constants";
import { toast } from "sonner";

const empty = { name: "", date: "", location: "", organizer: "", registration_link: "", type: "" as any, notes: "" };

export default function Events() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
      if (error) throw error; return data;
    },
  });

  function openCreate() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(o: any) { setEditing(o); setForm({ ...empty, ...o, date: o.date || "" }); setOpen(true); }
  async function save() {
    if (!form.name) return toast.error("Name required");
    const payload: any = { ...form };
    Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));
    const { error } = editing ? await supabase.from("events").update(payload).eq("id", editing.id) : await supabase.from("events").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); qc.invalidateQueries({ queryKey: ["events"] });
  }
  async function remove(id: string) { if (!confirm("Delete?")) return; await supabase.from("events").delete().eq("id", id); qc.invalidateQueries({ queryKey: ["events"] }); }

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e: any) => !e.date || e.date >= today);
  const past = events.filter((e: any) => e.date && e.date < today);

  return (
    <div>
      <PageHeader
        icon={<CalendarDays className="h-5 w-5" />}
        title="Events"
        subtitle="Founder meetups, networking, workshops, and college events."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Event</Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Event</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <F label="Name *" className="sm:col-span-2"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></F>
                <F label="Date"><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></F>
                <F label="Type">
                  <Select value={form.type || ""} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>{EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Location"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></F>
                <F label="Organizer"><Input value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} /></F>
                <F label="Registration Link" className="sm:col-span-2"><Input value={form.registration_link} onChange={(e) => setForm({ ...form, registration_link: e.target.value })} /></F>
                <F label="Notes" className="sm:col-span-2"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></F>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6 space-y-6">
        <Card className="p-4 border-dashed flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-xs text-muted-foreground">Automatic event aggregation from Lu.ma, Eventbrite & local communities — <span className="font-mono uppercase tracking-wider">coming soon</span>.</div>
        </Card>

        {events.length === 0 ? (
          <EmptyState icon={<CalendarDays className="h-6 w-6" />} title="No events yet" description="Track every meetup, workshop, and gathering." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Event</Button>} />
        ) : (
          <>
            <Section title="Upcoming" events={upcoming} onEdit={openEdit} onDelete={remove} />
            {past.length > 0 && <Section title="Past" events={past} onEdit={openEdit} onDelete={remove} muted />}
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, events, onEdit, onDelete, muted }: any) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-3">{title} ({events.length})</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((e: any) => (
          <Card key={e.id} className={`p-4 group hover:border-primary/40 transition ${muted ? "opacity-70" : ""}`}>
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="font-semibold truncate">{e.name}</div>
                {e.date && <div className="text-xs text-primary font-mono mt-0.5">{e.date}</div>}
              </div>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(e)}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onDelete(e.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">{e.type && <Badge variant="secondary" className="text-[10px]">{e.type}</Badge>}</div>
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              {e.location && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.location}</div>}
              {e.organizer && <div>By {e.organizer}</div>}
              {e.registration_link && <a href={e.registration_link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline"><ExternalLink className="h-3 w-3" /> Register</a>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
function F({ label, children, className = "" }: any) { return <div className={className}><Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>{children}</div>; }
