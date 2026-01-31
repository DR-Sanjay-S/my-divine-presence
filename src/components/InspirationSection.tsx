import { Skull, Flame, Eye, Swords, Crown, Zap } from 'lucide-react';

interface Inspiration {
  name: string;
  anime: string;
  quote: string;
  icon: React.ReactNode;
  trait: string;
}

const inspirations: Inspiration[] = [
  {
    name: "Johan Liebert",
    anime: "Monster",
    quote: "The only thing humans are equal in is death.",
    icon: <Eye className="w-8 h-8" />,
    trait: "Master Manipulator"
  },
  {
    name: "Madara Uchiha",
    anime: "Naruto",
    quote: "Wake up to reality! Nothing ever goes as planned in this world.",
    icon: <Flame className="w-8 h-8" />,
    trait: "God of Shinobi"
  },
  {
    name: "Sosuke Aizen",
    anime: "Bleach",
    quote: "Admiration is the furthest thing from understanding.",
    icon: <Crown className="w-8 h-8" />,
    trait: "Supreme Intellect"
  },
  {
    name: "Griffith",
    anime: "Berserk",
    quote: "I will get my own kingdom.",
    icon: <Swords className="w-8 h-8" />,
    trait: "Ruthless Ambition"
  },
  {
    name: "Pain (Nagato)",
    anime: "Naruto",
    quote: "Those who do not understand true pain can never understand true peace.",
    icon: <Zap className="w-8 h-8" />,
    trait: "Divine Justice"
  },
  {
    name: "Meruem",
    anime: "Hunter x Hunter",
    quote: "I was born to rule over all living beings.",
    icon: <Skull className="w-8 h-8" />,
    trait: "Ultimate Power"
  }
];

const InspirationSection = () => {
  return (
    <section className="w-full max-w-6xl mb-20">
      <h3 className="font-display text-2xl md:text-3xl text-center mb-4 text-foreground">
        My <span className="text-death-red">Dark Inspirations</span>
      </h3>
      <p className="text-center text-muted-foreground mb-12 font-body">
        ⛧ The villains who shaped my philosophy ⛧
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspirations.map((inspiration, index) => (
          <div 
            key={inspiration.name}
            className="group relative p-6 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${1.5 + index * 0.1}s` }}
          >
            {/* Icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-death-red/10 text-death-red group-hover:bg-death-red group-hover:text-white transition-colors duration-300">
                {inspiration.icon}
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-foreground">
                  {inspiration.name}
                </h4>
                <p className="text-xs text-muted-foreground font-body">
                  {inspiration.anime}
                </p>
              </div>
            </div>
            
            {/* Trait badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-body uppercase tracking-wider bg-death-red/10 text-death-red rounded-full">
                ✦ {inspiration.trait}
              </span>
            </div>
            
            {/* Quote */}
            <blockquote className="font-body text-sm text-muted-foreground italic leading-relaxed">
              "{inspiration.quote}"
            </blockquote>
            
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-death-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg" />
          </div>
        ))}
      </div>
      
      {/* Personal note */}
      <div className="mt-12 text-center p-8 rounded-lg death-border bg-card/50 max-w-2xl mx-auto">
        <p className="font-display text-lg text-death-red mb-4">
          ☠ Why These Villains? ☠
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          These characters embody the ultimate pursuit of power, intellect, and vision. 
          They challenge the very fabric of reality and morality. Like them, 
          <span className="text-death-red font-bold"> I, Sanjay S</span>, believe in 
          transcending ordinary limits and forging my own path to greatness. 
          Their darkness inspires my light.
        </p>
      </div>
    </section>
  );
};

export default InspirationSection;
