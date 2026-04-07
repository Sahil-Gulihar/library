import { Flower2 } from "lucide-react";

const LibraryHeader = () => {
  return (
    <header className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 lotus-bg opacity-40" />
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <Flower2 className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">
              SKRM / SOS Digital Library
            </h1>
            <Flower2 className="w-8 h-8 md:w-10 md:h-10 text-gold" />
          </div>
          <p className="text-gold font-serif text-base md:text-lg italic tracking-wide">
            Sacred Literature of the Masters
          </p>
          <nav className="flex gap-6 mt-4 text-sm font-sans tracking-wide uppercase">
            {["Home", "Browse", "By Master", "About"].map((item) => (
              <button
                key={item}
                className="hover:text-gold transition-colors duration-200 border-b border-transparent hover:border-gold pb-1"
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
