import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload, Database, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  exportAll,
  importAll,
  clearAll,
  seedSampleData,
  tableCounts,
  TABLES,
} from "@/lib/localClient";
import { PageHeader } from "@/components/PageHeader";

export default function Settings() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const refresh = () => setCounts(tableCounts());
  useEffect(() => {
    refresh();
    const h = () => refresh();
    window.addEventListener("mpb:change", h);
    return () => window.removeEventListener("mpb:change", h);
  }, []);

  const handleExport = () => {
    const json = exportAll();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-personal-book-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  };

  const handleImport = (mode: "replace" | "merge") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        importAll(text, mode);
        refresh();
        toast.success(`Imported (${mode})`);
      } catch (e: any) {
        toast.error(e?.message || "Failed to import");
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (!confirm("Erase ALL local data? This cannot be undone. Consider exporting a backup first.")) return;
    clearAll();
    refresh();
    toast.success("All data cleared");
  };

  const handleSeed = () => {
    seedSampleData();
    refresh();
    toast.success("Sample data added");
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 max-w-4xl">
      <PageHeader title="Settings" subtitle="Backup, restore, and manage your local data" />

      <Card className="p-5 mb-6 bg-card/50 border-border">
        <div className="flex items-start gap-3">
          <Database className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-medium mb-1">Local Storage Mode</div>
            <p className="text-sm text-muted-foreground">
              All data lives in this browser's localStorage. Export regular backups to keep your data safe.
              Cloud sync via Lovable Cloud will be added in Phase 2 without changing how the app works.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-5 bg-card/50 border-border">
          <div className="text-xs font-mono text-muted-foreground tracking-wider mb-2">BACKUP</div>
          <div className="text-2xl font-semibold mb-1">{total}</div>
          <div className="text-xs text-muted-foreground mb-4">total records across {TABLES.length} tables</div>
          <Button onClick={handleExport} className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export as JSON
          </Button>
        </Card>

        <Card className="p-5 bg-card/50 border-border">
          <div className="text-xs font-mono text-muted-foreground tracking-wider mb-2">RESTORE</div>
          <div className="text-sm text-muted-foreground mb-4">
            Import a backup file. Merge keeps existing records; Replace overwrites everything.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleImport("merge")} className="flex-1 gap-2">
              <Upload className="h-4 w-4" />
              Merge
            </Button>
            <Button variant="outline" onClick={() => handleImport("replace")} className="flex-1 gap-2">
              <Upload className="h-4 w-4" />
              Replace
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-5 mb-6 bg-card/50 border-border">
        <div className="text-xs font-mono text-muted-foreground tracking-wider mb-3">DATA OVERVIEW</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TABLES.map((t) => (
            <div key={t} className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/30 border border-border/50">
              <span className="text-sm capitalize">{t.replace("_", " ")}</span>
              <span className="text-sm font-mono text-primary">{counts[t] ?? 0}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 bg-card/50 border-border">
        <div className="text-xs font-mono text-muted-foreground tracking-wider mb-3">DANGER ZONE</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleSeed} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Load sample data
          </Button>
          <Button variant="outline" onClick={handleClear} className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            Clear all data
          </Button>
        </div>
      </Card>
    </div>
  );
}
