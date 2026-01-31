import { Flame, Target, Sword, Crown, BookOpen, Zap, ArrowRight } from 'lucide-react';
import sanjayPhoto from '@/assets/sanjay-profile.jpg';

const principles = [
  { icon: Flame, title: "Burn Weakness", text: "Every day I eliminate one weakness from my life." },
  { icon: Target, title: "Precision Focus", text: "One goal. One mission. Zero distractions." },
  { icon: Sword, title: "Embrace Struggle", text: "Pain is the price of power. I pay it gladly." },
  { icon: Crown, title: "Own My Kingdom", text: "I am the ruler of my mind, body, and destiny." },
  { icon: Zap, title: "Relentless Action", text: "While others think, I execute. Speed is power." },
  { icon: BookOpen, title: "Eternal Student", text: "The moment I stop learning, I start dying." },
];

const rules = [
  "I do not make excuses. I make results.",
  "I do not wait for motivation. I create discipline.",
  "I do not fear failure. I fear being average.",
  "I do not seek comfort. I seek growth.",
  "I do not blame others. I take full responsibility.",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(hsl(45 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(45 90% 55%) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Profile */}
          <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold/50 animate-pulse-gold">
                <img src={sanjayPhoto} alt="Sanjay S" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-gold">SANJAY S</span>
            <br />
            <span className="text-foreground text-3xl md:text-4xl lg:text-5xl">NOTE</span>
          </h1>

          <p 
            className="font-mono text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            This is my personal manifesto. My rules. My path to power.
            <br />
            <span className="text-gold">Read carefully.</span>
          </p>

          {/* Scroll indicator */}
          <div 
            className="animate-fade-up flex flex-col items-center gap-2 text-muted-foreground"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="text-xs font-mono uppercase tracking-widest">Enter the Note</span>
            <ArrowRight className="w-5 h-5 rotate-90 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">
              THE RULES
            </h2>
            <p className="font-mono text-muted-foreground">Laws I live by. Non-negotiable.</p>
          </div>

          <div className="space-y-0 border-l-2 border-gold/30 pl-8 ml-4">
            {rules.map((rule, index) => (
              <div 
                key={index}
                className="relative py-6 notebook-line group"
              >
                <div className="absolute -left-[2.35rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                <p className="font-mono text-lg md:text-xl text-foreground group-hover:text-gold transition-colors">
                  <span className="text-gold mr-3">0{index + 1}.</span>
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">
              MY PRINCIPLES
            </h2>
            <p className="font-mono text-muted-foreground">The foundation of my power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="group p-8 bg-card rounded-lg border border-border hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
              >
                <principle.icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-lg border border-gold/30 bg-background/50">
            <blockquote className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
              "The world doesn't give you what you deserve. 
              It gives you what you <span className="text-gold">demand</span>."
            </blockquote>
            <p className="font-mono text-sm text-gold tracking-widest uppercase">
              — Sanjay S
            </p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gold mb-8">
            MY COMMITMENT
          </h2>
          
          <div className="p-8 md:p-12 bg-card rounded-lg border border-border">
            <p className="font-mono text-lg text-muted-foreground leading-loose">
              I, <span className="text-gold font-bold">Sanjay S</span>, commit to becoming the strongest 
              version of myself. Every day, I will push beyond my limits. I will not settle. 
              I will not quit. I will not make excuses.
            </p>
            <p className="font-mono text-lg text-foreground mt-6">
              This note is my <span className="text-gold">contract with myself</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl text-gold mb-2">SANJAY S</p>
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            Building Power • One Day at a Time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
