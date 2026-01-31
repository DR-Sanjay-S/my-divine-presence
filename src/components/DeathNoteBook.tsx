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
      <div className="mt-8 max-w-md mx-auto text-center p-6 rounded-lg bg-card/80 border border-border shadow-lg">
        <h4 className="font-display text-lg text-death-red mb-4">⛧ Rules of the Sanjay S Note ⛧</h4>
        <ul className="font-body text-sm text-foreground space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-death-red">✦</span>
            <span>The human whose name is written in this note shall die.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-death-red">✦</span>
            <span>This note will not take effect unless the writer has the person's face in their mind.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-death-red">✦</span>
            <span>After writing the cause of death, details should be written in the next 6 minutes and 40 seconds.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeathNoteBook;
