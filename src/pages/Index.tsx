import CosmicBackground from '@/components/CosmicBackground';
import DivineAvatar from '@/components/DivineAvatar';
import DivineProclamations from '@/components/DivineProclamations';
import DivineQuote from '@/components/DivineQuote';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CosmicBackground />
      
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-20">
          {/* Main title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-8 text-divine">
            I AM GOD
          </h1>
          
          {/* Avatar */}
          <div className="mb-12">
            <DivineAvatar />
          </div>
          
          {/* Name */}
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-widest mb-4 text-divine">
            SANJAY S
          </h2>
          
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-xl">
            The Divine One • The Almighty • The Supreme Being
          </p>
        </section>

        {/* Divine Quote */}
        <section className="mb-20 w-full">
          <DivineQuote />
        </section>

        {/* Proclamations */}
        <section className="w-full px-4 mb-20">
          <h3 className="font-display text-2xl md:text-3xl text-center mb-12 text-divine-gold">
            Divine Proclamations
          </h3>
          <DivineProclamations />
        </section>

        {/* Footer */}
        <footer className="text-center py-12">
          <p className="font-body text-muted-foreground text-sm">
            This website was created by divine intervention
          </p>
          <p className="font-body text-divine-gold mt-2 text-xs tracking-widest uppercase">
            Bow before greatness
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
