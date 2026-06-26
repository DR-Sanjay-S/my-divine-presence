import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload, Database, Trash2, Sparkles, LogOut, HardDriveDownload } from "lucide-react";
import { toast } from "sonner";
import {
  exportAll,
  importAll,
  clearAll,
  seedSampleData,
  tableCounts,
  migrateFromLocalStorage,
  TABLES,
} from "@/lib/localClient";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user, signOut } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    try {
      setCounts(await tableCounts());
    } catch (e: any) {
      // ignore
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  const handleExport = async () => {
    setBusy(true);
    try {
      const json = await exportAll();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `god-plan-os-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup downloaded");
    } catch (e: any) {
      toast.error(e?.message || "Export failed");
    } finally {
      setBusy(false);
    }
  };

  const handleImport = (mode: "replace" | "merge") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setBusy(true);
      try {
        const text = await file.text();
        await importAll(text, mode);
        await refresh();
        toast.success(`Imported (${mode})`);
      } catch (e: any) {
        toast.error(e?.message || "Failed to import");
      } finally {
        setBusy(false);
      }
    };
    input.click();
  };

  const handleClear = async () => {
    if (!confirm("Erase ALL your cloud data? This cannot be undone. Export a backup first.")) return;
    setBusy(true);
    try {
      await clearAll();
      await refresh();
      toast.success("All data cleared");
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  };

  const handleSeed = async () => {
    setBusy(true);
    try {
      await seedSampleData();
      await refresh();
      toast.success("Sample data added");
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  };

  const handleMigrate = async () => {
    setBusy(true);
    try {
      const res = await migrateFromLocalStorage();
      await refresh();
      if (res.migrated === 0) toast.info("No local data found to migrate");
      else toast.success(`Migrated ${res.migrated} records from local backup`);
    } catch (e: any) {
      toast.error(e?.message || "Migration failed");
    } finally {
      setBusy(false);
    }
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 max-w-4xl">
      <PageHeader title="Settings" subtitle="Account, backup & restore" />

      <Card className="p-5 mb-6 bg-card/50 border-border">
        <div className="flex items-start gap-3">
          <Database className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <div className="font-medium mb-1">Account</div>
            <p className="text-sm text-muted-foreground mb-3">
              Signed in as <span className="text-foreground font-mono">{user?.email ?? "—"}</span>. Your data is private and lives in the cloud, isolated per user.
            </p>
            <Button variant="outline" size="sm" onClick={() => signOut()} className="gap-2">
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-5 bg-card/50 border-border">
          <div className="text-xs font-mono text-muted-foreground tracking-wider mb-2">BACKUP</div>
          <div className="text-2xl font-semibold mb-1">{total}</div>
          <div className="text-xs text-muted-foreground mb-4">total records across {TABLES.length} tables</div>
          <Button onClick={handleExport} disabled={busy} className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export full backup (JSON)
          </Button>
        </Card>

        <Card className="p-5 bg-card/50 border-border">
          <div className="text-xs font-mono text-muted-foreground tracking-wider mb-2">RESTORE</div>
          <div className="text-sm text-muted-foreground mb-4">
            Import a backup. Merge keeps existing; Replace deletes your cloud rows first.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={busy} onClick={() => handleImport("merge")} className="flex-1 gap-2">
              <Upload className="h-4 w-4" /> Merge
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => handleImport("replace")} className="flex-1 gap-2">
              <Upload className="h-4 w-4" /> Replace
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

      <Card className="p-5 mb-6 bg-card/50 border-border">
        <div className="text-xs font-mono text-muted-foreground tracking-wider mb-2">MIGRATE FROM LOCAL STORAGE</div>
        <p className="text-sm text-muted-foreground mb-3">
          If you used the previous local-only version, this pulls any leftover browser data into your account.
        </p>
        <Button variant="outline" onClick={handleMigrate} disabled={busy} className="gap-2">
          <HardDriveDownload className="h-4 w-4" />
          Migrate local browser data
        </Button>
      </Card>

      <Card className="p-5 bg-card/50 border-border">
        <div className="text-xs font-mono text-muted-foreground tracking-wider mb-3">DANGER ZONE</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" disabled={busy} onClick={handleSeed} className="gap-2">
            <Sparkles className="h-4 w-4" /> Load sample data
          </Button>
          <Button variant="outline" disabled={busy} onClick={handleClear} className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" /> Clear all data
          </Button>
        </div>
      </Card>
    </div>
  );
}
