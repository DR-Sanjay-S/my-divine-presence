interface CharacterCardProps {
  name: string;
  title: string;
  description: string;
  image: string;
  isKira?: boolean;
}

const CharacterCard = ({ name, title, description, image, isKira = false }: CharacterCardProps) => {
  return (
    <div className="character-card group relative rounded-lg overflow-hidden bg-card shadow-lg border border-border">
      {/* Image container */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
        />
        
        {/* Red glow on hover */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
            isKira ? 'bg-death-red' : 'bg-l-blue'
          }`}
        />
      </div>
      
      {/* Content */}
      <div className="relative p-6 -mt-16 z-10">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-1 text-foreground">
          {name}
        </h3>
        <p className={`text-sm font-body uppercase tracking-widest mb-3 ${
          isKira ? 'text-death-red' : 'text-muted-foreground'
        }`}>
          {title}
        </p>
        <p className="font-body text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Bottom border accent */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          isKira 
            ? 'bg-gradient-to-r from-transparent via-death-red to-transparent' 
            : 'bg-gradient-to-r from-transparent via-muted-foreground to-transparent'
        }`}
      />
    </div>
  );
};

export default CharacterCard;
