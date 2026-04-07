import { Flower2 } from "lucide-react";

const LibraryHeader = () => {
  return (
    <header className="relative overflow-hidden paisley-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-3">
            <Flower2 className="w-6 h-6 md:w-7 md:h-7 text-gold opacity-70" />
            <h1 className="text-2xl md:text-4xl tracking-[0.04em] text-foreground">
              SKRM / SOS Digital Library
            </h1>
            <Flower2 className="w-6 h-6 md:w-7 md:h-7 text-gold opacity-70" />
          </div>
          <p className="text-gold text-sm md:text-base italic tracking-[0.08em] opacity-80">
            Sacred Literature of the Masters
          </p>
          <nav className="flex gap-8 mt-3 text-xs tracking-[0.15em] uppercase text-foreground/70">
            {["Home", "Browse", "By Master", "About"].map((item) => (
              <button
                key={item}
                className="hover:text-gold transition-colors duration-300 pb-1 border-b border-transparent hover:border-gold/40"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="gold-divider" />
    </header>
  );
};

export default LibraryHeader;
