const DeathNoteBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(0 0% 100%) 0%, hsl(0 0% 96%) 60%, hsl(0 0% 94%) 100%)',
        }}
      />
      
      {/* Red glow from top - evil accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(0 85% 45% / 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Evil symbol watermarks */}
      <div className="absolute top-20 left-10 text-8xl opacity-5 text-death-red rotate-12 font-display">
        ✦
      </div>
      <div className="absolute bottom-20 right-10 text-8xl opacity-5 text-death-red -rotate-12 font-display">
        ☠
      </div>
      <div className="absolute top-1/3 right-20 text-6xl opacity-5 text-death-red rotate-45 font-display">
        ⛧
      </div>
      <div className="absolute bottom-1/3 left-20 text-6xl opacity-5 text-death-red -rotate-45 font-display">
        ✟
      </div>

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 90% / 0.5) 100%)',
        }}
      />

      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DeathNoteBackground;
