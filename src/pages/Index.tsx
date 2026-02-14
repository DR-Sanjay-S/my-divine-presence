import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Mail, Linkedin, Instagram, Phone,
  MapPin, ExternalLink, Calendar,
  GraduationCap, Briefcase, Code, Users, Globe,
  Award, BookOpen, Building2, Cpu, Database,
  Palette, Brain, Shield, Rocket, Heart,
  MonitorSmartphone, Server, Layers, Terminal,
  FileCode2, Blocks, Sparkles
} from 'lucide-react';
import sanjayPhoto from '@/assets/sanjay-profile.jpg';

// --- Animated wrapper ---
const FadeIn = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Data ---
const techSkills = [
  { name: 'React', icon: Blocks },
  { name: 'Node.js', icon: Server },
  { name: 'Express.js', icon: Server },
  { name: 'MongoDB', icon: Database },
  { name: 'MySQL', icon: Database },
  { name: 'Python', icon: Terminal },
  { name: 'Django', icon: Layers },
  { name: 'Flask', icon: Layers },
  { name: 'JavaScript', icon: FileCode2 },
  { name: 'TypeScript', icon: FileCode2 },
  { name: 'HTML/CSS', icon: Code },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'Java', icon: Cpu },
  { name: 'C', icon: Terminal },
  { name: 'C++', icon: Terminal },
  { name: 'PHP', icon: Code },
  { name: 'Git', icon: Blocks },
  { name: 'MERN Stack', icon: Layers },
  { name: 'Python Full Stack', icon: Layers },
  { name: 'Vibe Coding', icon: Sparkles },
  { name: 'AI & ML', icon: Brain },
  { name: 'Generative AI', icon: Brain },
  { name: 'SEO', icon: Globe },
  { name: 'Digital Marketing', icon: MonitorSmartphone },
  { name: 'Data Structures', icon: Blocks },
  { name: 'Web Development', icon: Globe },
];

const experience = [
  {
    role: 'Founder',
    org: 'Nexcubic',
    period: 'Nov 2025 – Present',
    location: 'Bengaluru, India',
    highlights: [
      'Leading a dynamic team dedicated to building powerful digital solutions for startups, enterprises, and individuals',
      'Specializing in website & app development, AI agents, branding, UI/UX design, and digital marketing',
      'Combining technology, creativity, and strategy to transform ideas into impactful digital experiences',
    ],
    link: 'https://nexcubic.com',
  },
  {
    role: 'Assistant Professor – BCA Department',
    org: "Charan's Degree College",
    period: 'Mar 2025 – Present',
    location: 'Bengaluru, India',
    highlights: [
      'Teaching BCA students across core CS subjects including Programming, DBMS, and Web Technologies',
      'Designing industry-aligned curriculum with hands-on project components',
      'Mentoring students on academic projects, career paths, and interview preparation',
    ],
  },
  {
    role: 'Assistant Professor – BCA Department',
    org: 'Siddaganga Institute of Management and Science',
    period: 'Mar 2025 – Oct 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Delivered quality education in computer science and application development',
      'Mentored students, fostered innovation, integrated practical knowledge with theoretical concepts',
      'Focused on research, curriculum development, and emerging technologies',
    ],
  },
  {
    role: 'Computer Science Lecturer – PUC',
    org: "Charan's PU College",
    period: 'Oct 2024 – Mar 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Taught Computer Science to PU students with practical coding sessions',
      'Simplified complex concepts and guided students in practical applications',
      'Prepared students for higher education and careers in the digital age',
    ],
  },
  {
    role: 'Insurance Advisor',
    org: 'Edelweiss Life Insurance',
    period: 'Jul 2024 – Oct 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Provided clients with tailored insurance solutions meeting financial goals and protection needs',
      'Built strong client relationships with a client-first approach',
    ],
  },
  {
    role: 'Property Advisor',
    org: 'Metro Homes',
    period: 'May 2024 – Oct 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Guided buyers, sellers, and investors through real estate decisions',
      'Ensured smooth and successful property transactions with personalized service',
    ],
  },
  {
    role: 'Assistant Teacher – Computer Science',
    org: 'Wisdom International Public School',
    period: 'Oct 2023 – Mar 2024',
    location: 'Bengaluru, India',
    highlights: [
      'Taught programming, hardware/software concepts, and internet safety to school students',
      'Encouraged hands-on learning and fostered interest in technology',
    ],
  },
  {
    role: 'Freelance Web Developer',
    org: 'Self-Employed',
    period: '2023 – Present',
    location: 'Remote',
    highlights: [
      'Building modern web applications using React, Node.js, MERN stack, and Python full stack',
      'Delivering responsive, high-performance websites and web apps for clients',
    ],
  },
];

const education = [
  {
    degree: 'CA Intermediate',
    school: 'The Institute of Chartered Accountants of India (ICAI)',
    period: 'June 2025',
    desc: 'Pursuing CA with focus on accounting, auditing, and financial management.',
  },
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Amity University',
    period: 'Oct 2023 – May 2025',
    desc: 'Specialized in Artificial Intelligence (AI) and Machine Learning (ML). Completed MCA with focus on software development and full-stack web technologies.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Pinnacle Institute of Management & Science',
    period: 'Sep 2020 – Sep 2023',
    desc: 'Built strong fundamentals in computer programming, database management, and computer science theory.',
  },
  {
    degree: 'Pre-University (PUC) – Computer Science',
    school: 'ICS Mahesh PU College',
    period: '2019 – 2020',
    desc: 'Completed pre-university education with Computer Science specialization.',
  },
];

const certifications = [
  'Leadership And Motivation in Organization',
  'Professional And Life Skills',
  'Strategic Human Resource Management',
  'Google Ads for Beginners',
  'Generative AI Mastermind',
];

const languages = [
  { name: 'English', flag: '🇬🇧', level: 'Professional Working' },
  { name: 'Kannada', flag: '🇮🇳', level: 'Native / Bilingual' },
  { name: 'Hindi', flag: '🇮🇳', level: 'Professional Working' },
  { name: 'Tamil', flag: '🇮🇳', level: 'Limited Working' },
  { name: 'Telugu', flag: '🇮🇳', level: 'Limited Working' },
  { name: 'Urdu', flag: '🇮🇳', level: 'Limited Working' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">

          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="space-y-8">
            {/* Profile Card */}
            <FadeIn>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
                  <img src={sanjayPhoto} alt="Sanjay S" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                    Sanjay S
                    <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </h1>
                  <p className="text-xs text-muted-foreground">Founder · Professor · CA Inter</p>
                </div>
              </div>
            </FadeIn>

            {/* About */}
            <FadeIn delay={0.05}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  My mission is to make technology education more practical, engaging, and future-ready. I conduct AI and Tech seminars helping students and institutions understand real-world applications of AI, ML, and Automation.
                </p>
              </div>
            </FadeIn>

            {/* Contact */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Contact</h3>
                <div className="space-y-2.5">
                  <a href="tel:+919740501114" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-3.5 h-3.5 text-primary/70" />
                    +91 9740501114
                  </a>
                  <a href="mailto:educate.sanjays@gmail.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary/70" />
                    educate.sanjays@gmail.com
                  </a>
                  <a href="mailto:sanjays@nexcubic.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Building2 className="w-3.5 h-3.5 text-primary/70" />
                    sanjays@nexcubic.com
                  </a>
                  <a href="https://nexcubic.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-3.5 h-3.5 text-primary/70" />
                    nexcubic.com
                  </a>
                  <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    Bengaluru, Karnataka, India
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={0.15}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Languages</h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span>{lang.flag}</span> {lang.name}
                      </span>
                      <span className="text-xs text-muted-foreground/60">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Social Links */}
            <FadeIn delay={0.2}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Connect</h3>
                <div className="space-y-2.5">
                  <a
                    href="https://www.linkedin.com/in/sanjay-s-258781240/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-primary/70" />
                    LinkedIn Profile
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                  </a>
                  <a
                    href="https://www.instagram.com/sanjay.s.journey/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-primary/70" />
                    @sanjay.s.journey
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.25}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Certifications</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award className="w-3.5 h-3.5 text-primary/70 mt-0.5 shrink-0" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </aside>

          {/* ===== RIGHT MAIN CONTENT ===== */}
          <main className="space-y-12">
            {/* Intro */}
            <FadeIn>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Intro</h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    I'm <span className="text-foreground font-medium">Sanjay S</span>, the Founder of{' '}
                    <a href="https://nexcubic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nexcubic</a>,
                    an Assistant Professor, and a CA Intermediate aspirant based in Bengaluru, India.
                  </p>
                  <p>
                    As an educator, I believe in inspiring curiosity, creativity, and innovation — helping learners go beyond textbooks to explore the possibilities of the digital era.
                    I conduct <span className="text-foreground font-medium">AI and Tech seminars</span> that help students and institutions understand real-world applications of Artificial Intelligence, Machine Learning, and Automation.
                  </p>
                  <p>
                    After completing my <span className="text-foreground font-medium">MCA from Amity University in 2025</span>, I joined education —
                    first as a CS Lecturer at Charan's PU College, then as an Assistant Professor at Siddaganga Institute and Charan's Degree College.
                    Alongside, I founded <span className="text-foreground font-medium">Nexcubic</span> to build powerful digital solutions for businesses worldwide.
                  </p>
                </div>
              </section>
            </FadeIn>

            {/* Skills & Technologies */}
            <FadeIn delay={0.05}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Skills & Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {techSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <skill.icon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                      <span className="text-xs text-secondary-foreground font-medium truncate">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Experience */}
            <FadeIn delay={0.1}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Experience</h3>
                <div className="space-y-8">
                  {experience.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display text-base font-semibold text-foreground">{exp.role}</h4>
                          <p className="text-sm text-primary/80 font-medium">{exp.org}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1 mb-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {exp.period}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {exp.location}
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {exp.highlights.map((h, j) => (
                              <li key={j} className="text-sm text-muted-foreground leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40">
                                {h}
                              </li>
                            ))}
                          </ul>
                          {'link' in exp && exp.link && (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-2 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit {exp.org}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.15}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Education</h3>
                <div className="space-y-8">
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-display text-base font-semibold text-foreground">{edu.degree}</h4>
                          <p className="text-sm text-primary/80 font-medium">{edu.school}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1 mb-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {edu.period}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{edu.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* What I Do */}
            <FadeIn delay={0.2}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">What I Do</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, title: 'Nexcubic – Digital Solutions', desc: 'Leading website/app development, AI agents, branding, UI/UX, and digital marketing for businesses.' },
                    { icon: GraduationCap, title: 'Teaching & Education', desc: 'Teaching CS to PU & BCA students with hands-on, practical approach at multiple institutions.' },
                    { icon: Code, title: 'Full Stack Development', desc: 'Building modern web apps using MERN stack, Python full stack, and cutting-edge technologies.' },
                    { icon: Brain, title: 'AI & Tech Seminars', desc: 'Conducting seminars on AI, ML, Generative AI, and Automation for students and institutions.' },
                    { icon: Users, title: 'Student Mentorship', desc: 'Career guidance, mock interviews, interview preparation, and academic excellence mentoring.' },
                    { icon: Rocket, title: 'Startup & Innovation', desc: 'Helping startups and enterprises establish strong online presence and accelerate growth.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3 }}
                      className="p-5 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary mb-3" />
                      <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Areas of Focus */}
            <FadeIn delay={0.25}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Areas of Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Artificial Intelligence & Machine Learning',
                    'Generative AI and Automation',
                    'Practical Technology Education',
                    'Student Mentorship & Academic Excellence',
                    'Social Media Marketing',
                    'Search Engine Optimization (SEO)',
                    'AI for Leadership',
                  ].map((area) => (
                    <span key={area} className="px-3 py-1.5 rounded-full bg-primary/10 text-xs text-primary font-medium border border-primary/20">
                      {area}
                    </span>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.3}>
              <section className="p-8 rounded-xl border border-border bg-card/30 text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Let's work together</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Open to collaborations, seminars, educational partnerships, and freelance projects.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="mailto:educate.sanjays@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sanjay-s-258781240/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://nexcubic.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Nexcubic
                  </a>
                </div>
              </section>
            </FadeIn>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm font-bold">
            <span className="text-gradient">Sanjay S</span>
            <span className="text-muted-foreground font-normal ml-2 text-xs">Founder · Professor · Mentor</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/sanjay-s-258781240/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/sanjay.s.journey/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:educate.sanjays@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Built with purpose.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
