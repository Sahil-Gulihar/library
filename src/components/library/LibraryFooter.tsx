import { Flower2 } from "lucide-react";

const LibraryFooter = () => (
  <footer className="paisley-bg relative py-10">
    <div className="absolute inset-0 bg-background/70" />
    <div className="relative z-10 container mx-auto px-4 text-center space-y-3">
      <div className="gold-divider max-w-xs mx-auto mb-5" />
      <Flower2 className="w-5 h-5 text-gold/60 mx-auto" />
      <p className="text-sm text-foreground/70 tracking-wide">
        Literature available in 53 languages · Sawan Kirpal Ruhani Mission © 2025
      </p>
      <p className="text-[11px] text-muted-foreground tracking-wider">
        Science of Spirituality — Spreading the message of love and unity
      </p>
    </div>
  </footer>
);

export default LibraryFooter;
