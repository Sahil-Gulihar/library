import { Flower2 } from "lucide-react";

const LibraryFooter = () => (
  <footer className="bg-primary text-primary-foreground py-8">
    <div className="container mx-auto px-4 text-center space-y-3">
      <div className="gold-divider max-w-md mx-auto mb-4" />
      <Flower2 className="w-6 h-6 text-gold mx-auto" />
      <p className="text-sm font-sans opacity-80">
        Literature available in 53 languages | Sawan Kirpal Ruhani Mission © 2025
      </p>
      <p className="text-xs font-sans opacity-50">
        Science of Spirituality — Spreading the message of love and unity
      </p>
    </div>
  </footer>
);

export default LibraryFooter;
