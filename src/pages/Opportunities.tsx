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
import { Target, Plus, Pencil, Trash2 } from "lucide-react";
import { OPPORTUNITY_TYPES, OPPORTUNITY_STATUSES, PRIORITIES } from "@/lib/constants";
import { toast } from "sonner";

const empty = { title: "", type: "" as any, status: "Idea", value: "", priority: "Medium", expected_date: "", notes: "" };

export default function Opportunities() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: opps = [] } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("opportunities").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  function openCreate() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(o: any) { setEditing(o); setForm({ ...empty, ...o, value: o.value ?? "", expected_date: o.expected_date || "" }); setOpen(true); }

  async function save() {
    if (!form.title) return toast.error("Title required");
    const payload: any = {
      title: form.title,
      type: form.type || null,
      status: form.status || "Idea",
      value: form.value === "" ? null : Number(form.value),
      priority: form.priority || null,
      expected_date: form.expected_date || null,
      notes: form.notes || null,
    };
    const { error } = editing
      ? await supabase.from("opportunities").update(payload).eq("id", editing.id)
      : await supabase.from("opportunities").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["opportunities"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete?")) return;
    await supabase.from("opportunities").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["opportunities"] });
  }
  async function moveStatus(o: any, newStatus: string) {
    await supabase.from("opportunities").update({ status: newStatus as any }).eq("id", o.id);
    qc.invalidateQueries({ queryKey: ["opportunities"] });
  }

  return (
    <div>
      <PageHeader
        icon={<Target className="h-5 w-5" />}
        title="Opportunities"
        subtitle="Partnerships, leads, and active deals across your network."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Opportunity</Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Opportunity</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <F label="Title *" className="sm:col-span-2"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></F>
                <F label="Type">
                  <Select value={form.type || ""} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>{OPPORTUNITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Status">
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{OPPORTUNITY_STATUSES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Priority">
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{PRIORITIES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Value (₹)"><Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></F>
                <F label="Expected Date"><Input type="date" value={form.expected_date} onChange={(e) => setForm({ ...form, expected_date: e.target.value })} /></F>
                <F label="Notes" className="sm:col-span-2"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></F>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6">
        {opps.length === 0 ? (
          <EmptyState icon={<Target className="h-6 w-6" />} title="No opportunities yet" description="Track your pipeline of partnerships and deals." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Opportunity</Button>} />
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {OPPORTUNITY_STATUSES.map((status) => {
              const col = opps.filter((o: any) => o.status === status);
              return (
                <div key={status} className="min-w-[260px] flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2 flex items-center justify-between">
                    <span>{status}</span><span className="text-foreground">{col.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.map((o: any) => (
                      <Card key={o.id} className="p-3 hover:border-primary/40 transition group">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium truncate">{o.title}</div>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openEdit(o)}><Pencil className="h-3 w-3" /></Button>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => remove(o.id)}><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {o.type && <Badge variant="secondary" className="text-[9px]">{o.type}</Badge>}
                          {o.priority && <Badge variant="outline" className="text-[9px]">{o.priority}</Badge>}
                        </div>
                        {o.value && <div className="text-xs text-primary mt-2 font-mono">₹{Number(o.value).toLocaleString()}</div>}
                        {o.expected_date && <div className="text-[10px] text-muted-foreground mt-1">Expected: {o.expected_date}</div>}
                        <Select value={o.status} onValueChange={(v) => moveStatus(o, v)}>
                          <SelectTrigger className="h-7 text-[10px] mt-2"><SelectValue /></SelectTrigger>
                          <SelectContent>{OPPORTUNITY_STATUSES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
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
