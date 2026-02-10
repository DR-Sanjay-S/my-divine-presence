import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  GraduationCap, Rocket, Users, Globe, Heart, 
  ArrowRight, ArrowDown, Briefcase, Award, 
  BookOpen, Code, Lightbulb, ExternalLink,
  Mail, Linkedin, Twitter, MapPin
} from 'lucide-react';
import sanjayPhoto from '@/assets/sanjay-profile.jpg';

// --- Animated Section Wrapper ---
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      id={id}
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

// --- Data ---
const whatIDo = [
  { icon: GraduationCap, title: 'Teaching & Education', desc: 'Shaping minds through practical, real-world teaching that bridges academia and industry.' },
  { icon: Rocket, title: 'Startup Building', desc: 'Founded Nexcubic — building systems that empower students and professionals alike.' },
  { icon: Users, title: 'Internships & Mentorship', desc: 'Guiding hundreds of students through career decisions, mock interviews, and placements.' },
  { icon: Code, title: 'Web & Technology', desc: 'Building modern web platforms, tools, and digital experiences that create real impact.' },
  { icon: Heart, title: 'Social Impact', desc: 'Working with NGOs and communities to drive meaningful change through tech and education.' },
  { icon: Lightbulb, title: 'Innovation Programs', desc: 'Designing hackathons, bootcamps, and innovation challenges for the next generation.' },
];

const experience = [
  { role: 'Assistant Professor', org: 'Leading Academic Institution', period: '2020 – Present', desc: 'Teaching computer science, mentoring research scholars, and developing industry-aligned curricula.' },
  { role: 'Founder & CEO', org: 'Nexcubic', period: '2021 – Present', desc: 'Building an ed-tech platform focused on internships, real-world projects, and career acceleration.' },
  { role: 'Tech Mentor', org: 'Multiple Programs', period: '2019 – Present', desc: 'Conducted 500+ mock interviews, mentored startups, and guided students into top companies.' },
  { role: 'Community Leader', org: 'Social Impact Projects', period: '2018 – Present', desc: 'Leading initiatives that connect technology with social good across rural and urban India.' },
];

const stats = [
  { value: '500+', label: 'Students Mentored' },
  { value: '50+', label: 'Programs Conducted' },
  { value: '3+', label: 'Years Teaching' },
  { value: '1', label: 'Startup Founded' },
];

// --- Main Component ---
const Index = () => {
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
          <a href="#" className="font-display text-xl font-bold tracking-tight">
            <span className="text-gradient">S</span>
            <span className="text-foreground">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Work', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Let's Talk
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 grid-bg">
        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
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
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
                >
                  View Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
                >
                  Collaborate
                </a>
              </motion.div>
            </div>

            {/* Photo */}
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

          {/* Scroll indicator */}
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
                My mission is simple: <span className="text-foreground">build people who build the future.</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: 'Educator' },
              { icon: Rocket, label: 'Founder' },
              { icon: Users, label: 'Mentor' },
              { icon: Globe, label: 'Changemaker' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl glass text-center"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{item.label}</p>
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
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Where I create <span className="text-gradient">impact</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIDo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'hsl(160 84% 50% / 0.3)' }}
                className="group p-8 rounded-xl border border-border bg-background/50 transition-all duration-300"
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
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-widest">Experience</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              The <span className="text-gradient">journey</span> so far
            </h2>
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
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-display text-xl font-semibold">{item.role}</h3>
                  <span className="font-mono text-xs text-primary">{item.period}</span>
                </div>
                <p className="text-sm text-primary/80 mb-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> {item.org}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
            or just a conversation — I'm always open.
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
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg font-bold">
            <span className="text-gradient">Sanjay S</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Built with purpose.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
