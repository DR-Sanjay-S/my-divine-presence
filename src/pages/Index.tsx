import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowUp, Award, BookOpen, BriefcaseBusiness, Building2,
  CalendarDays, ChevronRight, Code2, Database, ExternalLink, GraduationCap,
  Instagram, Linkedin, Mail, MapPin, Menu, MessageCircle, Moon, Phone,
  Presentation, Rocket, Send, Sparkles, Sun, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import sanjayPhoto from "@/assets/sanjay-profile.jpg";

const links = ["about", "experience", "ventures", "skills", "certifications", "community", "connect", "contact"];
const taglines = ["Founder, Nexcubic", "Community & Ecosystem Builder", "Educator", "AI & ML Specialist"];

const experience = [
  { role: "Program Coordinator — AI & ML Programs", org: "Charan's Degree College", period: "Present", icon: Sparkles, detail: "Coordinating industry-aware AI and machine learning learning paths, faculty initiatives, and student outcomes." },
  { role: "Assistant Professor — Computer Science", org: "Charan's Degree College", period: "2025 — Present", icon: GraduationCap, detail: "Teaching BCA students across programming, databases, web technology, artificial intelligence, and applied computing." },
  { role: "Computer Science Lecturer", org: "Charan's PU College", period: "2024 — 2025", icon: BookOpen, detail: "Made core computing concepts practical through demonstrations, lab work, and structured academic guidance." },
  { role: "Assistant Teacher — Computer Science", org: "Wisdom International School", period: "2023 — 2024", icon: Presentation, detail: "Introduced school students to programming, digital literacy, hardware, software, and safe technology use." },
  { role: "Sales Manager", org: "Metro Homes", period: "2024 — 2025", icon: Building2, detail: "Led relationship-focused property advisory, sales conversations, and client decision support." },
  { role: "Insurance Advisor", org: "Edelweiss Life Insurance", period: "2024 — 2025", icon: BriefcaseBusiness, detail: "Helped clients understand protection needs and choose suitable long-term financial solutions." },
];

const ventures = [
  { name: "Nexcubic", role: "Founder", mark: "NX", description: "AI-driven digital solutions agency.", reveal: "Building websites, applications, AI agents, brands, and growth systems for ambitious organizations.", href: "https://nexcubic.com" },
  { name: "SowMate", role: "Director & Co-Founder", mark: "SM", description: "Social impact, education, and sustainability.", reveal: "Creating initiatives that connect responsible progress with stronger communities and access to learning." },
  { name: "Nurturex", role: "Founder", mark: "NT", description: "A sustainable agriculture venture.", reveal: "Exploring practical technology and community models that help cultivation become more resilient." },
  { name: "Upbring Hut", role: "Founder", mark: "UH", description: "Interior design and brand experiences.", reveal: "Shaping expressive spaces and visual identities through a clear, human-centered design process." },
];

const skills = [
  { title: "Programming & Development", icon: Code2, items: ["HTML", "CSS", "JavaScript", "MERN Stack", "C", "C++", "ASP.NET", "VB.NET"] },
  { title: "AI & Data", icon: Sparkles, items: ["Artificial Intelligence", "Machine Learning", "Prompt Engineering", "Power BI", "Tableau", "SQL", "Data Visualization"] },
  { title: "UI/UX & Tools", icon: Rocket, items: ["Figma", "Canva", "Wireframing", "MS Office"] },
  { title: "Development Tools", icon: Database, items: ["GitHub", "VS Code", "Postman", "Firebase", "MongoDB", "React.js", "Node.js"] },
];

const certifications = [
  { title: "Strategic Human Resource Management", issuer: "Amity University", mark: "AU" },
  { title: "Professional and Life Skills", issuer: "Amity University", mark: "AU" },
  { title: "Generative AI Mastermind", issuer: "Outskill", mark: "OS" },
  { title: "UI/UX", issuer: "NSDC", mark: "NS" },
  { title: "Learning How to Learn", issuer: "Deep Teaching Solutions", mark: "DT" },
  { title: "Social Media Management", issuer: "Coursera Project Network", mark: "CP" },
  { title: "Build a Full Website using WordPress", issuer: "Coursera", mark: "CO" },
  { title: "Build a Free Website with WordPress", issuer: "Coursera", mark: "CO" },
  { title: "Build a Full Website using Wix", issuer: "Coursera", mark: "CO" },
  { title: "Build a Website with WordPress", issuer: "Coursera", mark: "CO" },
  { title: "Build a Website with Squarespace", issuer: "Coursera", mark: "CO" },
  { title: "Google Ads for Beginners", issuer: "Coursera", mark: "CO" },
];

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="mb-10 md:mb-16"><p className="section-kicker">{eyebrow}</p><h2 className="section-title">{title}</h2>{copy && <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{copy}</p>}</div>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

export default function Index() {
  const [tagline, setTagline] = useState(0);
  const [dark, setDark] = useState(() => typeof document === "undefined" || document.documentElement.classList.contains("dark"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTagline((current) => (current + 1) % taglines.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sanjay-theme", next ? "dark" : "light");
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:educate.sanjays@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <nav aria-label="Primary navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("top")} className="focus-ring flex items-center gap-3 rounded-sm" aria-label="Back to top">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-display text-sm font-bold text-primary-foreground">S</span>
            <span className="font-display text-sm font-semibold">SANJAY S</span>
          </button>
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((link) => <button key={link} onClick={() => scrollTo(link)} className="focus-ring rounded-sm text-[11px] capitalize text-muted-foreground transition-colors hover:text-primary">{link}</button>)}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>{dark ? <Sun /> : <Moon />}</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </nav>
        {menuOpen && <div className="border-t border-border bg-background px-4 py-4 lg:hidden">{links.map((link) => <button key={link} onClick={() => scrollTo(link)} className="focus-ring block w-full rounded-sm px-3 py-3 text-left text-sm capitalize text-muted-foreground hover:bg-secondary hover:text-foreground">{link}</button>)}</div>}
      </header>

      <main>
        <section id="top" className="relative flex min-h-screen scroll-mt-16 items-center overflow-hidden pt-20">
          <div aria-hidden="true" className="portfolio-grid absolute inset-0" />
          <motion.div aria-hidden="true" className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-primary/10 blur-3xl" animate={{ opacity: [.35, .65, .35], scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity }} />
          <div className="relative mx-auto grid w-full max-w-7xl items-end gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
            <div>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="mb-8 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--glow))]" />Bengaluru, India · Open to meaningful collaborations</motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }} className="mb-3 font-display text-lg font-medium text-primary">Hello, I’m</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .7 }} className="font-display text-[clamp(4rem,13vw,9.5rem)] font-semibold leading-[.82]">Sanjay<br /><span className="text-primary">S.</span></motion.h1>
              <div className="mt-8 h-9 overflow-hidden text-base text-muted-foreground sm:text-xl">
                <motion.p key={tagline} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .4 }}>{taglines[tagline]}<span className="ml-1 text-primary">_</span></motion.p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollTo("ventures")} className="group">View Work <ArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("contact")}>Get in Touch</Button>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3, duration: .8 }} className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute -left-4 top-10 hidden h-full w-full border border-primary/35 md:block" />
              <figure className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
                <img src={sanjayPhoto} alt="Sanjay S, founder and educator" className="h-full w-full object-cover object-top grayscale-[12%] transition duration-700 hover:scale-[1.025] hover:grayscale-0" fetchPriority="high" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background via-background/70 to-transparent px-5 pb-5 pt-24"><span className="font-display text-lg font-semibold">Founder × Educator</span><span className="text-xs text-primary">01 / PORTFOLIO</span></figcaption>
              </figure>
            </motion.div>
          </div>
        </section>

        <section id="about" className="scroll-mt-16 border-t border-border py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.55fr_1fr] lg:px-8">
            <Reveal><SectionHeading eyebrow="01 — About" title="Building systems that help people move forward." /></Reveal>
            <Reveal delay={.1} className="lg:pt-12">
              <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">Founder of <span className="text-primary">Nexcubic</span>, an AI-driven digital solutions agency, and an Assistant Professor and Program Coordinator for AI & ML Programs at Charan’s Degree College.</p>
              <div className="mt-10 grid gap-6 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                <p>I hold an MCA in AI/ML from Amity University and a BCA from Pinnacle Institute of Management and Science, affiliated with Bangalore University.</p>
                <p>Beyond the classroom and the studio, I actively participate in Bengaluru’s startup and developer ecosystem—connecting education, technology, and community.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="scroll-mt-16 bg-card/45 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="02 — Experience" title="A career across education, technology, and people." /></Reveal>
            <div className="relative ml-3 border-l border-border md:ml-1 md:grid md:grid-cols-2 md:gap-x-16 md:border-l-0">
              {experience.map((item, index) => <Reveal key={item.role} delay={index * .04} className={`relative pb-12 pl-8 md:pl-0 ${index % 2 ? "md:mt-24" : ""}`}>
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background md:hidden" />
                <article className="group border-t border-border pt-6 transition-colors hover:border-primary">
                  <div className="mb-6 flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary"><item.icon className="h-5 w-5" /></span><span className="text-xs text-muted-foreground">{item.period}</span></div>
                  <h3 className="text-xl font-semibold">{item.role}</h3><p className="mt-2 text-sm text-primary">{item.org}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.detail}</p>
                </article>
              </Reveal>)}
            </div>
          </div>
        </section>

        <section id="ventures" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="03 — Ventures & Leadership" title="Ideas given structure, identity, and momentum." copy="Four ventures across digital innovation, social impact, agriculture, and design." /></Reveal>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {ventures.map((venture, index) => <Reveal key={venture.name} delay={index * .06}>
                <article tabIndex={0} className="group min-h-72 bg-background p-7 outline-none transition-colors hover:bg-card focus:bg-card md:p-9">
                  <div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center border border-primary/40 font-display text-sm font-semibold text-primary">{venture.mark}</span>{venture.href ? <a href={venture.href} target="_blank" rel="noreferrer" aria-label={`Visit ${venture.name}`} className="focus-ring rounded-sm p-2 text-muted-foreground transition hover:text-primary"><ExternalLink className="h-5 w-5" /></a> : <ArrowDownRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />}</div>
                  <p className="mt-9 text-xs text-primary">{venture.role}</p><h3 className="mt-2 text-3xl font-semibold">{venture.name}</h3><p className="mt-3 text-sm text-muted-foreground">{venture.description}</p>
                  <p className="mt-5 translate-y-2 text-sm leading-6 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">{venture.reveal}</p>
                </article>
              </Reveal>)}
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-16 border-y border-border bg-card/45 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="04 — Capabilities" title="Technical depth with a builder’s perspective." /></Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              {skills.map((group, index) => <Reveal key={group.title} delay={index * .06} className="border-t border-border pt-6">
                <div className="mb-5 flex items-center gap-3"><group.icon className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">{group.title}</h3></div>
                <div className="flex flex-wrap gap-2">{group.items.map((item) => <motion.span key={item} whileHover={{ y: -3 }} className="cursor-default rounded-sm border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">{item}</motion.span>)}</div>
              </Reveal>)}
            </div>
          </div>
        </section>

        <section id="certifications" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="05 — Certifications" title="Continuous learning, deliberately practiced." /></Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => <Reveal key={cert.title} delay={(index % 3) * .04}>
                <article className="group flex min-h-32 items-start gap-4 border border-border bg-card/40 p-5 transition hover:-translate-y-1 hover:border-primary/45 hover:bg-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 text-[10px] font-semibold text-primary">{cert.mark}</span><div><h3 className="text-sm font-semibold leading-6">{cert.title}</h3><p className="mt-2 text-xs text-muted-foreground">{cert.issuer}</p></div>
                </article>
              </Reveal>)}
            </div>
          </div>
        </section>

        <section id="community" className="scroll-mt-16 overflow-hidden border-y border-border bg-primary py-24 text-primary-foreground md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            <Reveal><p className="mb-4 text-xs uppercase">06 — Community & Talks</p><h2 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">Knowledge grows when it moves through a community.</h2></Reveal>
            <div className="space-y-px bg-primary-foreground/20">
              {[{ icon: Presentation, title: "Guest speaker", copy: "Invited speaker at Ghousia Engineering College, sharing practical perspectives on technology and careers." }, { icon: Users, title: "Founder ecosystem", copy: "Active participant at eChai Startup Founder Meets across Bengaluru's growing startup community." }, { icon: MessageCircle, title: "AI & career sessions", copy: "Delivered AI seminars and career guidance sessions across colleges for students and emerging professionals." }].map((item, index) => <Reveal key={item.title} delay={index * .08}><article className="flex gap-5 bg-primary px-1 py-7"><item.icon className="mt-1 h-6 w-6 shrink-0" /><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-7 opacity-75">{item.copy}</p></div></article></Reveal>)}
            </div>
          </div>
        </section>

        <section id="connect" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="07 — Social Proof" title="Follow the work, ideas, and journey." copy="Recent platform content is available directly on LinkedIn and Instagram. Live feeds require platform authorization, so these links always lead to the current source." /></Reveal>
            <div className="grid gap-5 lg:grid-cols-2">
              <Reveal><a href="https://linkedin.com/in/sanjay-s" target="_blank" rel="noreferrer" className="focus-ring group flex min-h-64 flex-col justify-between border border-border bg-card p-7 transition hover:border-primary/60 md:p-9"><div className="flex items-start justify-between"><Linkedin className="h-9 w-9 text-primary" /><ExternalLink className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><p className="text-xs text-muted-foreground">Professional network</p><h3 className="mt-2 text-3xl font-semibold">Connect on LinkedIn</h3><p className="mt-3 text-sm text-muted-foreground">Follow education, technology, leadership, and ecosystem updates.</p></div></a></Reveal>
              <Reveal delay={.08}><a href="https://www.instagram.com/sanjay.s.journey/" target="_blank" rel="noreferrer" className="focus-ring group flex min-h-64 flex-col justify-between border border-border bg-card p-7 transition hover:border-primary/60 md:p-9"><div className="flex items-start justify-between"><Instagram className="h-9 w-9 text-primary" /><ExternalLink className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><p className="text-xs text-muted-foreground">Behind the scenes</p><h3 className="mt-2 text-3xl font-semibold">@sanjay.s.journey</h3><p className="mt-3 text-sm text-muted-foreground">See recent moments from teaching, building, events, and personal growth.</p></div></a></Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-border bg-card/45 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <Reveal><SectionHeading eyebrow="08 — Contact" title="Let’s build something that matters." copy="For speaking, collaborations, education programs, or digital projects, send a message or reach out directly." />
              <div className="space-y-4"><a href="tel:+919740501114" className="focus-ring flex items-center gap-3 rounded-sm text-sm text-muted-foreground transition hover:text-primary"><Phone className="h-4 w-4" />+91 9740501114</a><a href="mailto:educate.sanjays@gmail.com" className="focus-ring flex items-center gap-3 rounded-sm text-sm text-muted-foreground transition hover:text-primary"><Mail className="h-4 w-4" />educate.sanjays@gmail.com</a><span className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />Bengaluru, Karnataka, India</span></div>
            </Reveal>
            <Reveal delay={.1}><form onSubmit={sendMessage} className="glass-panel p-6 md:p-9"><div className="grid gap-6 sm:grid-cols-2"><label className="text-xs text-muted-foreground">Your name<input required name="name" autoComplete="name" className="focus-ring mt-2 h-12 w-full rounded-sm border border-input bg-background px-4 text-sm text-foreground" placeholder="Name" /></label><label className="text-xs text-muted-foreground">Email address<input required name="email" type="email" autoComplete="email" className="focus-ring mt-2 h-12 w-full rounded-sm border border-input bg-background px-4 text-sm text-foreground" placeholder="you@example.com" /></label></div><label className="mt-6 block text-xs text-muted-foreground">Your message<textarea required name="message" rows={6} className="focus-ring mt-2 w-full resize-y rounded-sm border border-input bg-background p-4 text-sm text-foreground" placeholder="Tell me about the idea, event, or opportunity..." /></label><Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">Compose email <Send /></Button></form></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div><p className="font-display font-semibold">Sanjay S</p><p className="mt-1 text-xs text-muted-foreground">© {new Date().getFullYear()} · Built with purpose.</p></div>
          <div className="flex items-center gap-2"><Button asChild variant="ghost" size="icon"><a href="https://linkedin.com/in/sanjay-s" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></Button><Button asChild variant="ghost" size="icon"><a href="https://www.instagram.com/sanjay.s.journey/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button><Button asChild variant="ghost" size="icon"><a href="mailto:educate.sanjays@gmail.com" aria-label="Email"><Mail /></a></Button></div>
          <Button variant="outline" onClick={() => scrollTo("top")}>Back to top <ArrowUp /></Button>
        </div>
      </footer>
    </div>
  );
}
