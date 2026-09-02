import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Lock, User as UserIcon, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type Mode = "login" | "signup" | "forgot";

export default function Auth() {
  const { user, signInWithPassword, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await signInWithPassword(email, password);
        if (error) toast.error(error);
        else toast.success("Welcome back");
      } else if (mode === "signup") {
        const { error } = await signUp(email, password, fullName);
        if (error) toast.error(error);
        else toast.success("Account created. You're in.");
      } else {
        const { error } = await resetPassword(email);
        if (error) toast.error(error);
        else {
          toast.success("Password reset email sent");
          setMode("login");
        }
      }
    } finally {
      setBusy(false);
    }
  };


  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#06070a] flex items-center justify-center px-4">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/60 -z-10"
          initial={{ x: Math.random() * 1200, y: Math.random() * 800, opacity: 0 }}
          animate={{
            y: [Math.random() * 800, Math.random() * 800 - 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/70">GOD PLAN OS</span>
          </motion.div>
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
              Founder OS
            </span>
          </h1>
          <p className="text-sm text-white/50 mt-2">CRM. Calendar. Network. Journal. One brain.</p>
        </div>

        {/* Glass card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl p-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

          {mode !== "forgot" ? (
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="relative">
              <TabsList className="grid grid-cols-2 w-full bg-white/[0.04] border border-white/10">
                <TabsTrigger value="login">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-5">
                <form onSubmit={submit} className="space-y-3">
                  <Field icon={Mail} type="email" placeholder="you@founder.com" value={email} onChange={setEmail} />
                  <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Button type="submit" disabled={busy} className="w-full h-11">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-5">
                <form onSubmit={submit} className="space-y-3">
                  <Field icon={UserIcon} type="text" placeholder="Full name" value={fullName} onChange={setFullName} />
                  <Field icon={Mail} type="email" placeholder="you@founder.com" value={email} onChange={setEmail} />
                  <Field icon={Lock} type="password" placeholder="Create password (min 6)" value={password} onChange={setPassword} />
                  <Button type="submit" disabled={busy} className="w-full h-11">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMode("login")}
                className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white mb-4"
              >
                <ArrowLeft className="h-3 w-3" /> Back to sign in
              </button>
              <h2 className="text-lg font-medium text-white mb-1">Reset your password</h2>
              <p className="text-xs text-white/50 mb-4">We'll email you a secure reset link.</p>
              <form onSubmit={submit} className="space-y-3">
                <Field icon={Mail} type="email" placeholder="you@founder.com" value={email} onChange={setEmail} />
                <Button type="submit" disabled={busy} className="w-full h-11">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
                </Button>
              </form>
            </div>
          )}

        </div>

        <p className="text-center text-[11px] text-white/40 mt-6 font-mono tracking-wider">
          A private, multi-user founder operating system.
        </p>
      </motion.div>
    </div>
  );
}

function Field({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
}: {
  icon: any;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
      <Input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-11 bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary/50"
      />
    </div>
  );
}
