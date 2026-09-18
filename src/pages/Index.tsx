import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, Award, BookOpen, BriefcaseBusiness, Building2,
  Check, Code2, Database, ExternalLink, GraduationCap, Instagram, Linkedin, Mail,
  MapPin, Menu, MessageCircle, Moon, Phone, Presentation, Rocket, Send, Sparkles,
  Sun, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import sanjayPhoto from "@/assets/sanjay-profile.jpg";

const navItems = [
  ["profile", "Profile"], ["work", "Selected work"], ["experience", "Experience"],
  ["capabilities", "Capabilities"], ["credentials", "Credentials"],
  ["community", "Community"], ["contact", "Contact"],
] as const;

const roles = ["Founder, Nexcubic", "Community & Ecosystem Builder", "Educator", "AI & ML Specialist"];

const highlights = [
  { title: "Nexcubic", label: "AI-driven digital solutions", note: "Founder", icon: Rocket, target: "work" },
  { title: "Charan’s Degree College", label: "AI & ML programs for BCA students", note: "Program Coordinator · Assistant Professor", icon: GraduationCap, target: "experience" },
  { title: "Bengaluru ecosystem", label: "Founder meets, seminars and career guidance", note: "Community builder · Speaker", icon: Users, target: "community" },
];

const ventures = [
  { index: "01", name: "Nexcubic", role: "Founder", category: "AI · Digital products · Growth", value: "An AI-driven digital solutions agency helping ambitious organizations build useful digital experiences.", scope: "Websites, applications, AI agents, brand systems and digital growth support.", href: "https://nexcubic.com" },
  { index: "02", name: "SowMate", role: "Director & Co-Founder", category: "Social impact · Education", value: "A community-led initiative connecting responsible progress with access to learning.", scope: "Education, sustainability and programs designed around stronger communities." },
  { index: "03", name: "Nurturex", role: "Founder", category: "Agriculture · Sustainability", value: "Exploring practical ideas that can make cultivation more resilient and accessible.", scope: "Technology, sustainable agriculture and community-centered operating models." },
  { index: "04", name: "Upbring Hut", role: "Founder", category: "Interiors · Brand experiences", value: "Creating expressive physical spaces and visual identities around real human needs.", scope: "Interior concepts, visual direction and human-centered brand experiences." },
];

const experience = [
  { role: "Program Coordinator — AI & ML Programs", org: "Charan's Degree College", period: "Present", icon: Sparkles, detail: "Coordinates industry-aware AI and machine learning learning paths, faculty initiatives and student development." },
  { role: "Assistant Professor — Computer Science", org: "Charan's Degree College", period: "Jul 2025 — Present", icon: GraduationCap, detail: "Teaches BCA students across programming, databases, web technology, artificial intelligence and applied computing." },
  { role: "Computer Science Lecturer", org: "Charan's PU College", period: "Oct 2024 — Jul 2025", icon: BookOpen, detail: "Made core computing concepts practical through demonstrations, laboratory work and structured academic guidance." },
  { role: "Assistant Teacher — Computer Science", org: "Wisdom International School", period: "2023 — 2024", icon: Presentation, detail: "Introduced students to programming, digital literacy, hardware, software and safe technology use." },
  { role: "Sales Manager", org: "Metro Homes", period: "2024 — 2025", icon: Building2, detail: "Led relationship-focused property advisory, sales conversations and client decision support." },
  { role: "Insurance Advisor", org: "Edelweiss Life Insurance", period: "2024 — 2025", icon: BriefcaseBusiness, detail: "Helped clients understand protection needs and choose suitable long-term financial solutions." },
];

const skills = [
  { title: "Programming & Development", icon: Code2, items: ["HTML", "CSS", "JavaScript", "MERN Stack", "C", "C++", "ASP.NET", "VB.NET"] },
  { title: "AI & Data", icon: Sparkles, items: ["Artificial Intelligence", "Machine Learning", "Prompt Engineering", "Power BI", "Tableau", "SQL", "Data Visualization"] },
  { title: "Design & Productivity", icon: Rocket, items: ["Figma", "Canva", "Wireframing", "MS Office"] },
  { title: "Development Tools", icon: Database, items: ["GitHub", "VS Code", "Postman", "Firebase", "MongoDB", "React.js", "Node.js"] },
];

const certifications = [
  ["Strategic Human Resource Management", "Amity University"], ["Professional and Life Skills", "Amity University"],
  ["Generative AI Mastermind", "Outskill"], ["UI/UX", "NSDC"], ["Learning How to Learn", "Deep Teaching Solutions"],
  ["Social Media Management", "Coursera Project Network"], ["Full Website using WordPress", "Coursera"],
  ["Website using Wix", "Coursera"], ["Website with Squarespace", "Coursera"], ["Google Ads for Beginners", "Coursera"],
];

const community = [
  { icon: Presentation, title: "Guest speaker", copy: "Shared practical perspectives on technology and careers at Ghousia Engineering College." },
  { icon: Users, title: "Founder ecosystem", copy: "Participates in eChai Startup Founder Meets across Bengaluru’s startup community." },
  { icon: MessageCircle, title: "AI & career sessions", copy: "Delivers seminars and guidance sessions for students and emerging professionals." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Chapter({ number, label, title, copy }: { number: string; label: string; title: string; copy?: string }) {
  return <div className="chapter-heading"><div className="chapter-index"><span>{number}</span><span>{label}</span></div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export default function Index() {
  const [role, setRole] = useState(0);
  const [dark, setDark] = useState(() => typeof document === "undefined" || document.documentElement.classList.contains("dark"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("profile");
  const sectionIds = useMemo(() => navItems.map(([id]) => id), []);

  useEffect(() => {
    const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2800);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-30% 0px -58%", threshold: 0 });
    sectionIds.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, [sectionIds]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMenuOpen(false); };
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); localStorage.setItem("sanjay-theme", next ? "dark" : "light"); };
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || ""); const email = String(data.get("email") || ""); const message = String(data.get("message") || "");
    window.location.href = `mailto:educate.sanjays@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
  };

  return <div className="min-h-screen bg-background text-foreground">
    <header className="mobile-header">
      <Button variant="ghost" onClick={() => scrollTo("profile")} className="h-auto gap-3 px-1 font-display text-sm font-semibold"><span className="brand-mark">S</span>SANJAY S</Button>
      <div className="flex gap-1"><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</Button><Button variant="ghost" size="icon" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button></div>
      {menuOpen && <div className="mobile-menu">{navItems.map(([id, label]) => <Button key={id} variant="ghost" onClick={() => scrollTo(id)} className="w-full justify-start">{label}</Button>)}</div>}
    </header>

    <div className="portfolio-shell">
      <aside className="identity-rail">
        <div>
          <Button variant="ghost" onClick={() => scrollTo("profile")} className="mb-10 h-auto gap-3 px-0 hover:bg-transparent"><span className="brand-mark">S</span><span className="font-display text-sm font-semibold">SANJAY S</span></Button>
          <div className="portrait-wrap"><img src={sanjayPhoto} alt="Sanjay S, founder and educator" className="portrait-image" fetchPriority="high" /><span>Based in Bengaluru</span></div>
          <h1>Sanjay S<span>.</span></h1>
          <div className="role-window"><motion.p key={role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{roles[role]}</motion.p></div>
          <p className="rail-summary">I build ventures, teach computer science, and create opportunities for people to grow through technology.</p>
          <nav aria-label="Portfolio chapters" className="rail-nav">{navItems.map(([id, label], index) => <Button key={id} variant="ghost" onClick={() => scrollTo(id)} className={active === id ? "active" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{label}</Button>)}</nav>
        </div>
        <div className="rail-footer"><div className="flex gap-1"><Button asChild variant="ghost" size="icon"><a href="https://www.linkedin.com/in/sanjay-s-258781240/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></Button><Button asChild variant="ghost" size="icon"><a href="https://www.instagram.com/sanjay.s.journey/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button><Button asChild variant="ghost" size="icon"><a href="mailto:educate.sanjays@gmail.com" aria-label="Email"><Mail /></a></Button></div><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</Button></div>
      </aside>

      <main className="content-column">
        <section id="profile" className="profile-section page-section">
          <Reveal><p className="availability"><span /> Open to meaningful collaborations</p><h2>Founder. Educator.<br /><em>Community builder.</em></h2><p className="profile-lead">I connect practical technology, education, and entrepreneurship to move ideas—and people—forward.</p><div className="flex flex-wrap gap-3"><Button size="lg" onClick={() => scrollTo("work")}>Explore selected work <ArrowDownRight /></Button><Button size="lg" variant="outline" onClick={() => scrollTo("contact")}>Start a conversation</Button></div></Reveal>
          <div className="highlights-grid">{highlights.map((item, index) => <Reveal key={item.title} delay={index * .07}><article className="highlight-item"><div className="highlight-top"><item.icon /><span>0{index + 1}</span></div><p>{item.note}</p><h3>{item.title}</h3><span className="highlight-label">{item.label}</span><Button variant="ghost" onClick={() => scrollTo(item.target)} className="mt-5 h-auto px-0 text-xs text-primary hover:bg-transparent">View chapter <ArrowDownRight /></Button></article></Reveal>)}</div>
        </section>

        <section id="work" className="page-section section-rule"><Reveal><Chapter number="01" label="Selected work" title="Four ventures. Four distinct problems worth solving." copy="A concise view of the work I lead—framed by purpose, not inflated metrics." /></Reveal><div>{ventures.map((venture, index) => <Reveal key={venture.name} delay={index * .04}><article className="case-study"><div className="case-number">{venture.index}</div><div><p className="case-category">{venture.category}</p><h3>{venture.name}</h3><p className="case-role">{venture.role}</p></div><div><p className="case-value">{venture.value}</p><p className="case-scope">{venture.scope}</p></div><div>{venture.href ? <Button asChild variant="outline" size="icon"><a href={venture.href} target="_blank" rel="noreferrer" aria-label={`Visit ${venture.name}`}><ExternalLink /></a></Button> : <span className="case-status">In development</span>}</div></article></Reveal>)}</div></section>

        <section id="experience" className="page-section section-rule"><Reveal><Chapter number="02" label="Experience" title="Work shaped by classrooms, companies, and conversations." /></Reveal><div className="experience-list">{experience.map((item, index) => <Reveal key={item.role} delay={(index % 3) * .04}><article className="experience-row"><span className="experience-icon"><item.icon /></span><div><p className="case-category">{item.period}</p><h3>{item.role}</h3><p className="case-role">{item.org}</p></div><p>{item.detail}</p></article></Reveal>)}</div></section>

        <section id="capabilities" className="page-section section-rule"><Reveal><Chapter number="03" label="Capabilities" title="A practical stack for building, teaching, and communicating ideas." /></Reveal><div className="skills-grid">{skills.map((group, index) => <Reveal key={group.title} delay={index * .05}><article><group.icon /><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><Check />{item}</li>)}</ul></article></Reveal>)}</div></section>

        <section id="credentials" className="page-section section-rule"><Reveal><Chapter number="04" label="Credentials" title="Education and learning, continuously applied." copy="MCA in AI & ML from Amity University · BCA from Pinnacle Institute of Management and Science, Bangalore University." /></Reveal><div className="credentials-list">{certifications.map(([title, issuer], index) => <Reveal key={title} delay={(index % 3) * .03}><article><span>{String(index + 1).padStart(2, "0")}</span><Award /><div><h3>{title}</h3><p>{issuer}</p></div></article></Reveal>)}</div></section>

        <section id="community" className="page-section community-section"><Reveal><Chapter number="05" label="Community" title="Knowledge becomes valuable when it moves." /></Reveal><div className="community-grid">{community.map((item, index) => <Reveal key={item.title} delay={index * .06}><article><item.icon /><p>0{index + 1}</p><h3>{item.title}</h3><span>{item.copy}</span></article></Reveal>)}</div></section>

        <section id="contact" className="page-section section-rule"><Reveal><Chapter number="06" label="Contact" title="Have an idea, event, or opportunity? Let’s talk." /></Reveal><div className="contact-grid"><Reveal><div className="contact-copy"><p>For digital projects, education programs, speaking opportunities, or thoughtful collaborations.</p><a href="tel:+919740501114"><Phone />+91 9740501114</a><a href="mailto:educate.sanjays@gmail.com"><Mail />educate.sanjays@gmail.com</a><span><MapPin />Bengaluru, Karnataka, India</span><div className="social-links"><a href="https://www.linkedin.com/in/sanjay-s-258781240/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href="https://www.instagram.com/sanjay.s.journey/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight /></a></div></div></Reveal><Reveal delay={.08}><form onSubmit={sendMessage} className="contact-form"><label>Your name<input required name="name" autoComplete="name" placeholder="Name" /></label><label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Your message<textarea required name="message" rows={6} placeholder="Tell me what you have in mind..." /></label><Button type="submit" size="lg">Compose email <Send /></Button></form></Reveal></div></section>

        <footer><div><p className="font-display font-semibold">Sanjay S<span className="text-primary">.</span></p><p>© {new Date().getFullYear()} · Founder, educator, community builder.</p></div><Button variant="outline" onClick={() => scrollTo("profile")}>Back to top <ArrowUpRight /></Button></footer>
      </main>
    </div>
  </div>;
}
