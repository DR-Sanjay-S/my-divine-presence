import DeathNoteBackground from '@/components/DeathNoteBackground';
import CharacterCard from '@/components/CharacterCard';
import DeathNoteBook from '@/components/DeathNoteBook';
import ProfileSection from '@/components/ProfileSection';
import EvilSymbols from '@/components/EvilSymbols';
import InspirationSection from '@/components/InspirationSection';

import kiraImage from '@/assets/kira-light.jpg';
import lImage from '@/assets/l-lawliet.jpg';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DeathNoteBackground />
      
      <main className="relative z-10 flex flex-col items-center px-6 py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-20">
          {/* Evil symbols header */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <EvilSymbols />
          </div>
          
          {/* Main title */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 text-death animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            SANJAY S NOTE
          </h1>
          
          <p 
            className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            The notebook of power. Write a name, seal a fate.
          </p>
          
          {/* Tagline */}
          <p 
            className="font-display text-sm md:text-base text-death-red tracking-[0.5em] uppercase mb-12 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            ✦ Embrace the Darkness ✦
          </p>
          
          {/* Profile */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <ProfileSection />
          </div>
        </section>

        {/* Characters Section */}
        <section className="w-full max-w-5xl mb-20">
          <h3 
            className="font-display text-2xl md:text-3xl text-center mb-4 text-foreground animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            The Battle of <span className="text-death-red">Evil & Justice</span>
          </h3>
          
          <p 
            className="text-center text-muted-foreground mb-12 font-body animate-fade-in"
            style={{ animationDelay: '0.9s' }}
          >
            ☠ Where morality becomes twisted ☠
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <CharacterCard
                name="Light Yagami"
                title="Kira - The God of the New World"
                description="A brilliant mastermind who wields the power of death itself. His pursuit of a 'perfect world' reveals the darkest depths of human ambition."
                image={kiraImage}
                isKira={true}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CharacterCard
                name="L Lawliet"
                title="World's Greatest Detective"
                description="An enigmatic genius shrouded in mystery. His unorthodox methods and brilliant mind make him the ultimate adversary in this game of death."
                image={lImage}
              />
            </div>
          </div>
        </section>

        {/* Death Note Book Section */}
        <section 
          className="w-full max-w-3xl mb-20 animate-fade-in"
          style={{ animationDelay: '1.4s' }}
        >
          <h3 className="font-display text-2xl md:text-3xl text-center mb-4 text-foreground">
            The <span className="text-death-red">Cursed Notebook</span>
          </h3>
          <p className="text-center text-muted-foreground mb-12 font-body">
            ⛧ The instrument of divine judgment ⛧
          </p>
          <DeathNoteBook />
        </section>

        {/* Inspirations Section */}
        <div className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <InspirationSection />
        </div>

        {/* Evil Quote */}
        <section 
          className="max-w-2xl text-center mb-16 animate-fade-in"
          style={{ animationDelay: '1.8s' }}
        >
          <div className="p-8 rounded-lg death-border bg-card/50 backdrop-blur-sm">
            <blockquote className="font-body text-xl md:text-2xl text-foreground italic leading-relaxed">
              "I am Justice! I protect the innocent and those who fear evil. 
              I'm the one who will become the god of a new world."
            </blockquote>
            <p className="mt-4 font-display text-sm text-death-red tracking-widest">
              — LIGHT YAGAMI (KIRA)
            </p>
          </div>
        </section>

        {/* Evil Symbols Footer */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <EvilSymbols />
        </section>

        {/* Footer */}
        <footer className="text-center py-12">
          <p className="font-display text-death-red text-lg tracking-widest uppercase mb-2">
            ✦ SANJAY S ✦
          </p>
          <p className="font-body text-muted-foreground text-xs tracking-widest uppercase">
            Master of the Note • Wielder of Power
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
