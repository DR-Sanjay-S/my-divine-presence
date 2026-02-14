import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Mail, Linkedin, Twitter, Instagram, Github,
  MapPin, Phone, ExternalLink, Calendar,
  GraduationCap, Briefcase, Code, Users, Globe
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
const skills = [
  'JavaScript', 'React', 'Python', 'Java', 'HTML/CSS', 'TypeScript',
  'Node.js', 'MongoDB', 'MySQL', 'Git', 'Tailwind CSS', 'PHP',
  'C', 'C++', 'Data Structures', 'Web Development'
];

const experience = [
  {
    role: 'Assistant Professor — BCA Department',
    org: 'Charans Degree College',
    period: 'Jul 2025 – Present',
    location: 'India',
    highlights: [
      'Teaching BCA students across core CS subjects including Programming, DBMS, and Web Technologies',
      'Designing industry-aligned curriculum with hands-on project components',
      'Mentoring students on academic projects, career paths, and interview preparation',
    ]
  },
  {
    role: 'Computer Science Lecturer',
    org: 'Charans PU College',
    period: 'Oct 2024 – Jul 2025',
    location: 'India',
    highlights: [
      'Taught Computer Science to PU students with practical coding sessions',
      'Introduced real-world problem-solving and project-based learning approaches',
      'Guided students in competitive programming and tech skill development',
    ]
  },
  {
    role: 'Freelance Web Developer',
    org: 'Self-Employed',
    period: '2023 – Present',
    location: 'Remote',
    highlights: [
      'Building modern web applications for clients using React, Node.js, and modern stacks',
      'Delivering responsive, high-performance websites and web apps',
      'More details coming soon...',
    ]
  },
];

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'University',
    period: '2023 – 2025',
    desc: 'Completed MCA with focus on software development, data structures, and full-stack web technologies.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'University',
    period: '2020 – 2023',
    desc: 'Built strong fundamentals in programming, database management, and computer science theory.',
  },
];

const languages = [
  { name: 'English', flag: '🇬🇧' },
  { name: 'Kannada', flag: '🇮🇳' },
  { name: 'Hindi', flag: '🇮🇳' },
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
                  <p className="text-sm text-muted-foreground">he/him</p>
                </div>
              </div>
            </FadeIn>

            {/* About */}
            <FadeIn delay={0.05}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Assistant Professor & CS Lecturer with a passion for teaching, mentoring students, and building modern web applications. MCA graduate (2025) who believes in bridging the gap between academics and real-world tech.
                </p>
              </div>
            </FadeIn>

            {/* Contact */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Contact</h3>
                <div className="space-y-2.5">
                  <a href="mailto:sanjay@godsanjays.in" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary/70" />
                    sanjay@godsanjays.in
                  </a>
                  <a href="https://godsanjays.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-3.5 h-3.5 text-primary/70" />
                    godsanjays.in
                  </a>
                  <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    India
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.15}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-secondary text-xs text-secondary-foreground font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={0.2}>
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang) => (
                    <span key={lang.name} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span>{lang.flag}</span> {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Social Links */}
            <FadeIn delay={0.25}>
              <div className="flex items-center gap-4 pt-2">
                {[
                  { icon: Twitter, href: 'https://twitter.com/' },
                  { icon: Github, href: 'https://github.com/' },
                  { icon: Instagram, href: 'https://instagram.com/' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <social.icon className="w-4.5 h-4.5" />
                  </a>
                ))}
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
                    I'm <span className="text-foreground font-medium">Sanjay S</span>, an Assistant Professor and CS Lecturer based in India.
                    My passion lies in teaching computer science, mentoring students, and building modern web applications as a freelancer.
                  </p>
                  <p>
                    After completing my <span className="text-foreground font-medium">MCA in 2025</span>, I joined the education field,
                    first as a CS Lecturer at Charans PU College and now as an Assistant Professor at Charans Degree College,
                    teaching BCA students. I emphasize practical learning and real-world readiness.
                  </p>
                </div>
              </section>
            </FadeIn>

            {/* Experience */}
            <FadeIn delay={0.05}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Experience</h3>
                <div className="space-y-8">
                  {experience.map((exp, i) => (
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
                          <Briefcase className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display text-base font-semibold text-foreground">{exp.role}</h4>
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
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.1}>
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
                          <div className="flex flex-wrap items-center gap-3 mt-1 mb-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {edu.period}
                            </span>
                            <span className="text-xs text-muted-foreground">{edu.school}</span>
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
            <FadeIn delay={0.15}>
              <section>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">What I Do</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: GraduationCap, title: 'Teaching & Education', desc: 'Teaching CS to PU & BCA students with hands-on, practical approach.' },
                    { icon: Code, title: 'Freelance Web Dev', desc: 'Building modern web apps using React, Node.js, and full-stack tech.' },
                    { icon: Users, title: 'Student Mentorship', desc: 'Career guidance, mock interviews, and interview preparation for students.' },
                    { icon: Globe, title: 'Tech & Innovation', desc: 'Exploring new technologies and bringing them into the classroom.' },
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

            {/* CTA */}
            <FadeIn delay={0.2}>
              <section className="p-8 rounded-xl border border-border bg-card/30 text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Let's work together</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Open to freelance projects, collaborations, and speaking opportunities.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="mailto:sanjay@godsanjays.in"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </a>
                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
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
            <span className="text-muted-foreground font-normal ml-2 text-xs">Assistant Professor • Freelancer • Mentor</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Built with purpose.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
