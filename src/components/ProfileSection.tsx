import sanjayPhoto from '@/assets/sanjay-profile.jpg';

const ProfileSection = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Profile image with death note styling */}
      <div className="relative group">
        {/* Red glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-50 blur-xl transition-all duration-500 group-hover:opacity-80"
          style={{
            background: 'radial-gradient(circle, hsl(0 85% 50% / 0.6) 0%, transparent 70%)',
            transform: 'scale(1.3)',
          }}
        />
        
        {/* Border ring */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full p-1 death-border animate-pulse-red">
          <div className="w-full h-full rounded-full overflow-hidden bg-card">
            <img 
              src={sanjayPhoto} 
              alt="Sanjay S"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      {/* Name */}
      <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-wider text-foreground">
        SANJAY S
      </h2>
      
      <p className="mt-2 font-body text-death-red text-sm uppercase tracking-[0.3em]">
        Master of Justice
      </p>
    </div>
  );
};

export default ProfileSection;
