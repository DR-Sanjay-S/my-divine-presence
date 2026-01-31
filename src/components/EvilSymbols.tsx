const EvilSymbols = () => {
  return (
    <div className="flex justify-center items-center gap-8 my-8">
      {/* Pentagram */}
      <div className="relative group">
        <span className="text-4xl md:text-5xl text-death-red opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
          ⛧
        </span>
      </div>
      
      {/* Skull */}
      <div className="relative group">
        <span className="text-4xl md:text-5xl text-death-red opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          ☠
        </span>
      </div>
      
      {/* Evil Eye */}
      <div className="relative group">
        <span className="text-4xl md:text-5xl text-death-red opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          👁
        </span>
      </div>
      
      {/* Dark Cross */}
      <div className="relative group">
        <span className="text-4xl md:text-5xl text-death-red opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          ✟
        </span>
      </div>
      
      {/* Star */}
      <div className="relative group">
        <span className="text-4xl md:text-5xl text-death-red opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
          ✦
        </span>
      </div>
    </div>
  );
};

export default EvilSymbols;
