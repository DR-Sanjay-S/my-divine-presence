import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/localClient";
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
import { Mic, Plus, Pencil, Trash2 } from "lucide-react";
import { PODCAST_STATUSES } from "@/lib/constants";
import { toast } from "sonner";

const empty = { guest_name: "", organization: "", status: "Idea", recording_date: "", publishing_date: "", topics: "", notes: "" };

export default function Podcasts() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: items = [] } = useQuery({
    queryKey: ["podcasts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("podcasts").select("*").order("created_at", { ascending: false });
      if (error) throw error; return data;
    },
  });

  function openCreate() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(o: any) { setEditing(o); setForm({ ...empty, ...o, recording_date: o.recording_date || "", publishing_date: o.publishing_date || "" }); setOpen(true); }
  async function save() {
    if (!form.guest_name) return toast.error("Guest name required");
    const payload: any = { ...form };
    Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));
    const { error } = editing ? await supabase.from("podcasts").update(payload).eq("id", editing.id) : await supabase.from("podcasts").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); qc.invalidateQueries({ queryKey: ["podcasts"] });
  }
  async function remove(id: string) { if (!confirm("Delete?")) return; await supabase.from("podcasts").delete().eq("id", id); qc.invalidateQueries({ queryKey: ["podcasts"] }); }

  return (
    <div>
      <PageHeader
        icon={<Mic className="h-5 w-5" />}
        title="Podcasts"
        subtitle="Guest pipeline — from idea to publish."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Guest</Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Guest</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <F label="Guest Name *"><Input value={form.guest_name} onChange={(e) => setForm({ ...form, guest_name: e.target.value })} /></F>
                <F label="Organization"><Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} /></F>
                <F label="Status">
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{PODCAST_STATUSES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Recording Date"><Input type="date" value={form.recording_date} onChange={(e) => setForm({ ...form, recording_date: e.target.value })} /></F>
                <F label="Publishing Date"><Input type="date" value={form.publishing_date} onChange={(e) => setForm({ ...form, publishing_date: e.target.value })} /></F>
                <F label="Discussion Topics" className="sm:col-span-2"><Textarea rows={2} value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} /></F>
                <F label="Notes" className="sm:col-span-2"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></F>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6">
        {items.length === 0 ? (
          <EmptyState icon={<Mic className="h-6 w-6" />} title="No guests yet" description="Start building your podcast pipeline." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Guest</Button>} />
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PODCAST_STATUSES.map((status) => {
              const col = items.filter((i: any) => i.status === status);
              return (
                <div key={status} className="min-w-[240px] flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2 flex justify-between"><span>{status}</span><span className="text-foreground">{col.length}</span></div>
                  <div className="space-y-2">
                    {col.map((p: any) => (
                      <Card key={p.id} className="p-3 group hover:border-primary/40 transition">
                        <div className="flex justify-between gap-2">
                          <div className="font-medium text-sm truncate">{p.guest_name}</div>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => remove(p.id)}><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </div>
                        {p.organization && <div className="text-xs text-muted-foreground truncate">{p.organization}</div>}
                        {p.topics && <div className="text-[10px] text-muted-foreground mt-2 line-clamp-2">{p.topics}</div>}
                        {(p.recording_date || p.publishing_date) && (
                          <div className="text-[10px] text-muted-foreground mt-2 space-y-0.5">
                            {p.recording_date && <div>🎤 {p.recording_date}</div>}
                            {p.publishing_date && <div>📢 {p.publishing_date}</div>}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
function F({ label, children, className = "" }: any) { return <div className={className}><Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>{children}</div>; }
