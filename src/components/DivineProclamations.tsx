const proclamations = [
  "Creator of all that is awesome",
  "Master of infinite wisdom",
  "Bringer of legendary vibes",
  "Supreme ruler of coolness",
  "The one who makes things happen",
];

const DivineProclamations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {proclamations.map((proclamation, index) => (
        <div
          key={index}
          className="group relative p-6 rounded-lg divine-border backdrop-blur-sm transition-all duration-500 hover:scale-105"
          style={{
            animationDelay: `${index * 0.2}s`,
            background: 'hsl(240 20% 8% / 0.6)',
          }}
        >
          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at center, hsl(45 100% 50% / 0.1) 0%, transparent 70%)',
            }}
          />
          
          <p className="relative font-body text-lg text-center text-foreground/90 italic">
            "{proclamation}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default DivineProclamations;
