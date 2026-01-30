import DeathNoteBackground from '@/components/DeathNoteBackground';
import CharacterCard from '@/components/CharacterCard';
import DeathNoteBook from '@/components/DeathNoteBook';
import ProfileSection from '@/components/ProfileSection';

import kiraImage from '@/assets/kira-light.jpg';
import lImage from '@/assets/l-lawliet.jpg';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DeathNoteBackground />
      
      <main className="relative z-10 flex flex-col items-center px-6 py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-20">
          {/* Main title */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 text-death animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            DEATH NOTE
          </h1>
          
          <p 
            className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-12 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            The notebook of the Shinigami. Write a name, seal a fate.
          </p>
          
          {/* Profile */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <ProfileSection />
          </div>
        </section>

        {/* Characters Section */}
        <section className="w-full max-w-5xl mb-20">
          <h3 
            className="font-display text-2xl md:text-3xl text-center mb-12 text-foreground animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            The Battle of <span className="text-death-red">Justice</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <CharacterCard
                name="Light Yagami"
                title="Kira"
                description="A brilliant student who finds the Death Note and decides to create a new world free of criminals. His pursuit of justice transforms into a god complex."
                image={kiraImage}
                isKira={true}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CharacterCard
                name="L Lawliet"
                title="World's Greatest Detective"
                description="An eccentric genius detective who takes on the Kira case. His unconventional methods and brilliant deductions make him Kira's greatest adversary."
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
          <h3 className="font-display text-2xl md:text-3xl text-center mb-12 text-foreground">
            The <span className="text-death-red">Notebook</span>
          </h3>
          <DeathNoteBook />
        </section>

        {/* Quote */}
        <section 
          className="max-w-2xl text-center mb-16 animate-fade-in"
          style={{ animationDelay: '1.6s' }}
        >
          <blockquote className="font-body text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
            "I am Justice! I protect the innocent and those who fear evil. 
            I'm the one who will become the god of a new world."
          </blockquote>
          <p className="mt-4 font-display text-sm text-death-red tracking-widest">
            — LIGHT YAGAMI
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center py-12">
          <p className="font-body text-muted-foreground text-xs tracking-widest uppercase">
            Created by Sanjay S
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
