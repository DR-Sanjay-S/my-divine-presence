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
import { Building2, Plus, Pencil, Trash2, Globe } from "lucide-react";
import { ORG_TYPES } from "@/lib/constants";
import { toast } from "sonner";

const empty = { name: "", website: "", logo_url: "", industry: "", type: "" as any, description: "", founder: "", notes: "" };

export default function Organizations() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: orgs = [] } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("organizations").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  function openCreate() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(o: any) { setEditing(o); setForm({ ...empty, ...o }); setOpen(true); }

  async function save() {
    if (!form.name) return toast.error("Name required");
    const payload: any = { ...form };
    Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));
    const { error } = editing
      ? await supabase.from("organizations").update(payload).eq("id", editing.id)
      : await supabase.from("organizations").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["organizations"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this organization?")) return;
    await supabase.from("organizations").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["organizations"] });
  }

  return (
    <div>
      <PageHeader
        icon={<Building2 className="h-5 w-5" />}
        title="Organizations"
        subtitle="Companies, colleges, NGOs, and communities you're connected to."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Org</Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader><DialogTitle>{editing ? "Edit Organization" : "New Organization"}</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <F label="Name *"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></F>
                <F label="Type">
                  <Select value={form.type || ""} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>{ORG_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="Industry"><Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></F>
                <F label="Website"><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></F>
                <F label="Founder"><Input value={form.founder} onChange={(e) => setForm({ ...form, founder: e.target.value })} /></F>
                <F label="Logo URL"><Input value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} /></F>
                <F label="Description" className="sm:col-span-2"><Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></F>
                <F label="Collaboration Notes" className="sm:col-span-2"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></F>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={save}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6">
        {orgs.length === 0 ? (
          <EmptyState icon={<Building2 className="h-6 w-6" />} title="No organizations yet" description="Track companies, colleges, and partners here." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Org</Button>} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {orgs.map((o: any) => (
              <Card key={o.id} className="p-4 hover:border-primary/40 transition group">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {o.logo_url ? <img src={o.logo_url} alt="" className="w-full h-full object-cover" /> : <Building2 className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{o.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{o.industry || o.type}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(o)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(o.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">{o.type && <Badge variant="secondary" className="text-[10px]">{o.type}</Badge>}</div>
                {o.description && <p className="text-xs text-muted-foreground mt-3 line-clamp-3">{o.description}</p>}
                {o.website && <a href={o.website} target="_blank" rel="noreferrer" className="mt-3 text-xs flex items-center gap-1.5 text-primary hover:underline"><Globe className="h-3 w-3" /> {o.website}</a>}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function F({ label, children, className = "" }: any) {
  return <div className={className}><Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>{children}</div>;
}
