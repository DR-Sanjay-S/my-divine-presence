import sanjayPhoto from '@/assets/sanjay-profile.jpg';

const DivineAvatar = () => {
  return (
    <div className="relative floating">
      {/* Outer divine rings */}
      <div 
        className="absolute inset-0 -m-8 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(from 0deg, transparent, hsl(45 100% 50% / 0.3), transparent, hsl(45 100% 60% / 0.2), transparent)',
          animationDuration: '20s',
        }}
      />
      <div 
        className="absolute inset-0 -m-4 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(from 180deg, transparent, hsl(45 100% 50% / 0.4), transparent, hsl(35 100% 55% / 0.3), transparent)',
          animationDuration: '15s',
          animationDirection: 'reverse',
        }}
      />
      
      {/* Glow backdrop */}
      <div 
        className="absolute inset-0 rounded-full pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 50% / 0.4) 0%, transparent 70%)',
          transform: 'scale(1.5)',
        }}
      />
      
      {/* Main avatar container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 divine-border glow-divine">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src={sanjayPhoto} 
            alt="Sanjay S - The Divine One"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Crown/halo effect */}
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-16"
        style={{
          background: 'radial-gradient(ellipse at bottom, hsl(45 100% 50% / 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default DivineAvatar;
