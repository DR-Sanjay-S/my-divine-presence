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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { StickyNote, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const empty = { title: "", content: "", tags: "" };

export default function Notes() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: notes = [] } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
      if (error) throw error; return data;
    },
  });

  function openCreate() { setEditing(null); setForm(empty); setOpen(true); }
  function openEdit(n: any) { setEditing(n); setForm({ title: n.title, content: n.content || "", tags: (n.tags || []).join(", ") }); setOpen(true); }
  async function save() {
    if (!form.title) return toast.error("Title required");
    const payload: any = {
      title: form.title,
      content: form.content || null,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    };
    const { error } = editing ? await supabase.from("notes").update(payload).eq("id", editing.id) : await supabase.from("notes").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); qc.invalidateQueries({ queryKey: ["notes"] });
  }
  async function remove(id: string) { if (!confirm("Delete?")) return; await supabase.from("notes").delete().eq("id", id); qc.invalidateQueries({ queryKey: ["notes"] }); }

  return (
    <div>
      <PageHeader
        icon={<StickyNote className="h-5 w-5" />}
        title="Notes"
        subtitle="Your second brain — ideas, meeting notes, knowledge."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> New Note</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Note</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label className="text-xs mb-1.5 block">Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label className="text-xs mb-1.5 block">Tags (comma separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="idea, meeting, startup" /></div>
                <div><Label className="text-xs mb-1.5 block">Content (Markdown supported)</Label><Textarea rows={12} className="font-mono text-sm" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="# Heading\n\n- Bullet\n\n**bold** _italic_" /></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6">
        {notes.length === 0 ? (
          <EmptyState icon={<StickyNote className="h-6 w-6" />} title="No notes yet" description="Capture ideas, meeting notes, and insights." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> New Note</Button>} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {notes.map((n: any) => (
              <Card key={n.id} className="p-4 group hover:border-primary/40 transition cursor-pointer" onClick={() => openEdit(n)}>
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold">{n.title}</div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); openEdit(n); }}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); remove(n.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                {n.content && <p className="text-xs text-muted-foreground mt-2 line-clamp-5 whitespace-pre-wrap font-mono">{n.content}</p>}
                {n.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
                    {n.tags.map((t: string) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">#{t}</span>)}
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground mt-3 font-mono">{new Date(n.created_at).toLocaleDateString()}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
