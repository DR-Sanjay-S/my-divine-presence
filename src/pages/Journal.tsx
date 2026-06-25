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
import { BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import { MOODS } from "@/lib/constants";
import { toast } from "sonner";

const empty = { entry_date: new Date().toISOString().slice(0, 10), mood: "" as any, wins: "", lessons: "", challenges: "", ideas: "" };
const moodEmoji: Record<string, string> = { Great: "🔥", Good: "🙂", Okay: "😐", Low: "😔", Bad: "😞" };

export default function Journal() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: entries = [] } = useQuery({
    queryKey: ["journal"],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_entries").select("*").order("entry_date", { ascending: false });
      if (error) throw error; return data;
    },
  });

  function openCreate() { setEditing(null); setForm({ ...empty, entry_date: new Date().toISOString().slice(0, 10) }); setOpen(true); }
  function openEdit(e: any) { setEditing(e); setForm({ ...empty, ...e }); setOpen(true); }
  async function save() {
    const payload: any = { ...form };
    Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));
    const { error } = editing ? await supabase.from("journal_entries").update(payload).eq("id", editing.id) : await supabase.from("journal_entries").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); qc.invalidateQueries({ queryKey: ["journal"] });
  }
  async function remove(id: string) { if (!confirm("Delete?")) return; await supabase.from("journal_entries").delete().eq("id", id); qc.invalidateQueries({ queryKey: ["journal"] }); }

  return (
    <div>
      <PageHeader
        icon={<BookOpen className="h-5 w-5" />}
        title="Journal"
        subtitle="Daily reflections — wins, lessons, challenges, ideas."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> New Entry</Button></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing ? "Edit Entry" : "New Journal Entry"}</DialogTitle></DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3">
                <F label="Date"><Input type="date" value={form.entry_date} onChange={(e) => setForm({ ...form, entry_date: e.target.value })} /></F>
                <F label="Mood">
                  <Select value={form.mood || ""} onValueChange={(v) => setForm({ ...form, mood: v })}>
                    <SelectTrigger><SelectValue placeholder="How was today?" /></SelectTrigger>
                    <SelectContent>{MOODS.map((m) => <SelectItem key={m} value={m}>{moodEmoji[m]} {m}</SelectItem>)}</SelectContent>
                  </Select>
                </F>
                <F label="🏆 Wins" className="sm:col-span-2"><Textarea rows={2} value={form.wins} onChange={(e) => setForm({ ...form, wins: e.target.value })} /></F>
                <F label="📚 Lessons Learned" className="sm:col-span-2"><Textarea rows={2} value={form.lessons} onChange={(e) => setForm({ ...form, lessons: e.target.value })} /></F>
                <F label="⚡ Challenges" className="sm:col-span-2"><Textarea rows={2} value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} /></F>
                <F label="💡 Ideas" className="sm:col-span-2"><Textarea rows={2} value={form.ideas} onChange={(e) => setForm({ ...form, ideas: e.target.value })} /></F>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="px-4 md:px-8 py-6">
        {entries.length === 0 ? (
          <EmptyState icon={<BookOpen className="h-6 w-6" />} title="Start journaling" description="Daily reflection compounds." action={<Button onClick={openCreate}><Plus className="h-4 w-4 mr-1.5" /> New Entry</Button>} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {entries.map((e: any) => (
              <Card key={e.id} className="p-5 group hover:border-primary/40 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{e.entry_date}</div>
                    {e.mood && <div className="text-lg mt-0.5">{moodEmoji[e.mood]} <span className="text-sm font-medium">{e.mood}</span></div>}
                  </div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(e)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(e.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {e.wins && <Block label="🏆 Wins" text={e.wins} />}
                  {e.lessons && <Block label="📚 Lessons" text={e.lessons} />}
                  {e.challenges && <Block label="⚡ Challenges" text={e.challenges} />}
                  {e.ideas && <Block label="💡 Ideas" text={e.ideas} />}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function Block({ label, text }: any) {
  return <div><div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{label}</div><div className="text-sm whitespace-pre-wrap">{text}</div></div>;
}
function F({ label, children, className = "" }: any) { return <div className={className}><Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>{children}</div>; }
