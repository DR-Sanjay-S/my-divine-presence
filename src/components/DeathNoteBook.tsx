import deathNoteImage from '@/assets/death-note-book.jpg';

const DeathNoteBook = () => {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 50% / 0.5) 0%, transparent 70%)',
          transform: 'scale(1.2)',
        }}
      />
      
      {/* Book image */}
      <div className="relative w-64 md:w-80 mx-auto animate-pulse-red rounded-lg overflow-hidden">
        <img 
          src={deathNoteImage} 
          alt="Death Note"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Rules text */}
      <div className="mt-8 max-w-md mx-auto text-center">
        <h4 className="font-display text-lg text-death-red mb-4">Rules of the Death Note</h4>
        <ul className="font-body text-sm text-muted-foreground space-y-2 italic">
          <li>The human whose name is written in this note shall die.</li>
          <li>This note will not take effect unless the writer has the person's face in their mind.</li>
          <li>After writing the cause of death, details should be written in the next 6 minutes and 40 seconds.</li>
        </ul>
      </div>
    </div>
  );
};

export default DeathNoteBook;
