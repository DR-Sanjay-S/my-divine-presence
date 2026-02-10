import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { 
  GraduationCap, Rocket, Users, Globe, Heart, 
  ArrowRight, ArrowDown, Briefcase, 
  BookOpen, Code, Lightbulb,
  Mail, Linkedin, Twitter, MapPin, Instagram,
  CheckCircle, Star, Quote, Calendar, Trophy
} from 'lucide-react';
import sanjayPhoto from '@/assets/sanjay-profile.jpg';

// --- Animated Section Wrapper ---
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// --- Typewriter ---
const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="text-gradient">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

// --- Smooth scroll helper ---
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// --- Data ---
const whatIDo = [
  { icon: GraduationCap, title: 'Teaching & Education', desc: 'Shaping minds through practical, real-world teaching that bridges academia and industry. Designing curricula that prepare students for what actually matters.' },
  { icon: Rocket, title: 'Startup Building (Nexcubic)', desc: 'Founded and leading Nexcubic — an ed-tech venture focused on internships, career acceleration, and building industry-ready professionals at scale.' },
  { icon: Users, title: 'Internships & Mentorship', desc: 'Guiding hundreds of students through career decisions, mock interviews, resume building, and placements into top companies across India.' },
  { icon: Code, title: 'Web & Technology', desc: 'Building modern web platforms, SaaS tools, and digital experiences. From frontend to deployment — shipping products that solve real problems.' },
  { icon: Heart, title: 'Social Impact & NGO Work', desc: 'Partnering with NGOs and communities to drive meaningful change through technology, education drives, and digital literacy campaigns in underserved areas.' },
  { icon: Lightbulb, title: 'Innovation Programs', desc: 'Designing and running hackathons, bootcamps, coding challenges, and innovation workshops that spark creativity in the next generation of builders.' },
];

const experience = [
  { 
    role: 'Assistant Professor', 
    org: 'Leading Academic Institution', 
    period: '2020 – Present',
    type: 'Full-time',
    highlights: [
      'Teaching Computer Science & Engineering subjects across multiple semesters',
      'Mentoring final-year students on research projects and dissertations',
      'Developed industry-aligned curriculum with hands-on project components',
      'Organized workshops on emerging technologies for 200+ students',
    ]
  },
  { 
    role: 'Founder & CEO', 
    org: 'Nexcubic', 
    period: '2021 – Present',
    type: 'Startup',
    highlights: [
      'Built an ed-tech platform connecting students with real-world internships',
      'Scaled to serve hundreds of students across multiple colleges',
      'Developed career acceleration programs with industry partnerships',
      'Created structured mentorship pipelines for first-generation professionals',
    ]
  },
  { 
    role: 'Tech Mentor & Career Coach', 
    org: 'Multiple Programs & Institutions', 
    period: '2019 – Present',
    type: 'Mentorship',
    highlights: [
      'Conducted 500+ mock interviews preparing students for top-tier companies',
      'Mentored early-stage startup founders on product and tech strategy',
      'Led technical training bootcamps in web development and programming',
      'Guided students into roles at MNCs, startups, and government organizations',
    ]
  },
  { 
    role: 'Community Leader & Social Changemaker', 
    org: 'Social Impact Projects', 
    period: '2018 – Present',
    type: 'Volunteer',
    highlights: [
      'Led digital literacy initiatives in rural and semi-urban communities',
      'Partnered with NGOs on education-focused technology projects',
      'Organized free coding workshops for underprivileged students',
      'Built awareness campaigns around tech careers for first-gen learners',
    ]
  },
];

const stats = [
  { value: '500+', label: 'Students Mentored' },
  { value: '50+', label: 'Programs Conducted' },
  { value: '3+', label: 'Years Teaching' },
  { value: '1', label: 'Startup Founded' },
];

const values = [
  { icon: Star, title: 'Excellence', desc: 'Never settling for mediocre — in teaching, building, or mentoring.' },
  { icon: CheckCircle, title: 'Accountability', desc: 'Taking full ownership of outcomes and leading by example.' },
  { icon: Heart, title: 'Empathy', desc: 'Understanding every student\'s unique journey and meeting them where they are.' },
  { icon: Trophy, title: 'Impact First', desc: 'Measuring success not by metrics, but by lives genuinely changed.' },
];

const testimonials = [
  { name: 'A Mentee', text: '"Sanjay sir didn\'t just teach us code — he taught us how to think, prepare, and believe in ourselves."' },
  { name: 'A Student', text: '"The mock interviews and career guidance I received completely changed the trajectory of my career."' },
  { name: 'A Collaborator', text: '"Working with Sanjay on Nexcubic showed me what it means to build with genuine purpose."' },
];

// --- Main Component ---
const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    const sections = ['about', 'work', 'experience', 'values', 'testimonials', 'contact'];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 200) {
        setActiveSection(id);
        return;
      }
    }
    setActiveSection('');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Experience', id: 'experience' },
    { label: 'Values', id: 'values' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-xl font-bold tracking-tight cursor-pointer">
            <span className="text-gradient">S</span>
            <span className="text-foreground">anjay</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm transition-colors cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Let's Talk
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 grid-bg pt-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">
                  Educator • Founder • Mentor
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              >
                Building{' '}
                <Typewriter words={['People.', 'Systems.', 'Futures.', 'Impact.']} />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="text-lg text-muted-foreground max-w-lg mb-8 mx-auto lg:mx-0"
              >
                I'm <span className="text-foreground font-medium">Sanjay S</span> — an Assistant Professor, 
                founder of <span className="text-primary font-medium">Nexcubic</span>, and someone who believes 
                in building real things that change real lives.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => scrollTo('work')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all cursor-pointer"
                >
                  View Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors cursor-pointer"
                >
                  Collaborate
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border glow-emerald">
                <img src={sanjayPhoto} alt="Sanjay S" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-lg glass font-mono text-xs text-primary">
                <MapPin className="w-3 h-3 inline mr-1" />
                India
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <Section className="py-16 px-6 border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section className="py-24 px-6" id="about">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">About Me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Not just a teacher.
              <br />
              <span className="text-gradient">A builder.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I grew up believing that education should do more than fill classrooms — it should 
                ignite change. That belief led me to the classroom as an Assistant Professor, and 
                then beyond it, as the founder of <span className="text-primary font-medium">Nexcubic</span>.
              </p>
              <p>
                I don't teach to complete syllabi. I teach to prepare people for the real world — 
                through hands-on projects, mock interviews, career guidance, and mentorship that 
                doesn't stop at the bell.
              </p>
              <p>
                From conducting 500+ mock interviews to launching programs that connect students 
                with real internships — every effort is aimed at one thing: 
                <span className="text-foreground font-medium"> closing the gap between learning and doing.</span>
              </p>
              <p>
                My mission is simple: <span className="text-foreground font-semibold">build people who build the future.</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: 'Educator', sub: 'Asst. Professor' },
              { icon: Rocket, label: 'Founder', sub: 'Nexcubic CEO' },
              { icon: Users, label: 'Mentor', sub: '500+ Students' },
              { icon: Globe, label: 'Changemaker', sub: 'Community Impact' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl glass text-center"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* What I Do */}
      <Section className="py-24 px-6 bg-card/30" id="work">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">What I Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Where I create <span className="text-gradient">impact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From classrooms to startups, from code to communities — here's the full picture of what I pour my energy into every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIDo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group p-8 rounded-xl border border-border bg-background/50 transition-all duration-300 hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section className="py-24 px-6" id="experience">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">Experience & Roles</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-gradient">journey</span> so far
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every role I've taken on has been driven by one goal — creating systems that uplift people and unlock potential.
            </p>
          </div>

          <div className="space-y-0">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-8 pb-12 border-l border-border last:pb-0 group"
              >
                <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary border-2 border-primary group-hover:bg-primary transition-colors" />
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-semibold">{item.role}</h3>
                  <span className="font-mono text-xs text-primary px-2 py-0.5 rounded-full bg-primary/10">{item.type}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <p className="text-sm text-primary/80 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {item.org}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.period}
                  </p>
                </div>
                <ul className="space-y-2">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-24 px-6 bg-card/30" id="values">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">My Values</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What I <span className="text-gradient">stand for</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These aren't just words on a wall. These are the principles I bring into every classroom, every meeting, and every decision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl glass text-center"
              >
                <val.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-24 px-6" id="testimonials">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">Kind Words</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What people <span className="text-gradient">say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-xl border border-border bg-background/50"
              >
                <Quote className="w-6 h-6 text-primary/40 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">{t.text}</p>
                <p className="text-sm font-medium text-foreground">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA / Contact */}
      <Section className="py-24 px-6 bg-card/30" id="contact">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let's build something <span className="text-gradient">meaningful</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Whether it's a collaboration, a speaking invite, a mentoring opportunity, 
            or just a conversation — I'm always open. Let's connect and create something lasting.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href="mailto:sanjay@godsanjays.in"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
            >
              <Mail className="w-4 h-4" />
              Email Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold">
              <span className="text-gradient">Sanjay S</span>
            </p>
            <p className="text-xs text-muted-foreground">Educator • Founder • Mentor</p>
          </div>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Built with purpose.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
