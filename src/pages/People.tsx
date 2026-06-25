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
import { Users, Plus, Search as SearchIcon, Pencil, Trash2, Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { PERSON_CATEGORIES, PERSON_STATUSES } from "@/lib/constants";
import { toast } from "sonner";

type Person = any;

const emptyForm = {
  name: "", company: "", role: "", category: "" as any, phone: "", email: "",
  linkedin: "", website: "", location: "", status: "" as any, notes: "",
  tags: "", follow_up_date: "",
};

export default function People() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Person | null>(null);
  const [form, setForm] = useState<any>(emptyForm);

  const { data: people = [], isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const { data, error } = await supabase.from("people").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Person[];
    },
  });

  const filtered = people.filter((p) => {
    const matchSearch = !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.company?.toLowerCase().includes(search.toLowerCase()) ||
      p.role?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }
  function openEdit(p: Person) {
    setEditing(p);
    setForm({
      ...emptyForm, ...p,
      tags: (p.tags || []).join(", "),
      follow_up_date: p.follow_up_date || "",
    });
    setOpen(true);
  }

  async function save() {
    if (!form.name) return toast.error("Name is required");
    const payload: any = {
      name: form.name,
      company: form.company || null,
      role: form.role || null,
      category: form.category || null,
      phone: form.phone || null,
      email: form.email || null,
      linkedin: form.linkedin || null,
      website: form.website || null,
      location: form.location || null,
      status: form.status || null,
      notes: form.notes || null,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      follow_up_date: form.follow_up_date || null,
    };
    const { error } = editing
      ? await supabase.from("people").update(payload).eq("id", editing.id)
      : await supabase.from("people").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Person updated" : "Person added");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["people"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this contact?")) return;
    const { error } = await supabase.from("people").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["people"] });
  }

  return (
    <div>
      <PageHeader
        icon={<Users className="h-5 w-5" />}
        title="People"
        subtitle="Your personal CRM — founders, investors, mentors, and more."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Person</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing ? "Edit Person" : "New Person"}</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Name *"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
                <Field label="Company"><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></Field>
                <Field label="Role"><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></Field>
                <Field label="Category">
                  <Select value={form.category || ""} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>{PERSON_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Relationship Status">
                  <Select value={form.status || ""} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>{PERSON_STATUSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
                <Field label="Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                <Field label="LinkedIn"><Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></Field>
                <Field label="Website"><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></Field>
                <Field label="Location"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
                <Field label="Follow-up Date"><Input type="date" value={form.follow_up_date} onChange={(e) => setForm({ ...form, follow_up_date: e.target.value })} /></Field>
                <Field label="Tags (comma separated)" className="sm:col-span-2"><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="ai, kannada, blr" /></Field>
                <Field label="Notes" className="sm:col-span-2"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={save}>{editing ? "Save Changes" : "Add Person"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="px-4 md:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, company, role..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {PERSON_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> :
         filtered.length === 0 ? (
          <EmptyState icon={<Users className="h-6 w-6" />} title="No people yet" description="Add your first contact to start building your network." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> Add Person</Button>} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((p) => (
              <Card key={p.id} className="p-4 hover:border-primary/40 transition group">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{[p.role, p.company].filter(Boolean).join(" · ") || "—"}</div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.category && <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>}
                  {p.status && <Badge variant="outline" className="text-[10px]">{p.status}</Badge>}
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {p.email && <div className="flex items-center gap-1.5 truncate"><Mail className="h-3 w-3" />{p.email}</div>}
                  {p.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{p.phone}</div>}
                  {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 truncate hover:text-primary"><Linkedin className="h-3 w-3" />LinkedIn</a>}
                  {p.location && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{p.location}</div>}
                  {p.follow_up_date && <div className="text-amber-500/80">Follow up: {p.follow_up_date}</div>}
                </div>
                {p.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
                    {p.tags.map((t: string) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">#{t}</span>)}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: any) {
  return (
    <div className={className}>
      <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}
