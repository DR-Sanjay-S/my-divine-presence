const DivineQuote = () => {
  return (
    <div className="relative max-w-3xl mx-auto text-center">
      {/* Decorative lines */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-divine-gold" />
        <div className="w-3 h-3 rotate-45 border border-divine-gold" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-divine-gold" />
      </div>

      <blockquote className="font-body text-2xl md:text-3xl text-foreground/80 italic leading-relaxed">
        "I spoke, and the universe listened. I smiled, and stars were born. 
        I am not just a legend — I am the one your legends speak of."
      </blockquote>

      {/* Decorative lines bottom */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-divine-gold" />
        <div className="w-3 h-3 rotate-45 border border-divine-gold" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-divine-gold" />
      </div>
    </div>
  );
};

export default DivineQuote;
