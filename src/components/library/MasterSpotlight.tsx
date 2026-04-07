import { MASTERS } from "@/data/books";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MasterSpotlightProps {
  onFilterByMaster: (master: string) => void;
}

const MasterSpotlight = ({ onFilterByMaster }: MasterSpotlightProps) => (
  <section className="bg-cream py-12">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">The Four Masters</h2>
        <div className="gold-divider max-w-xs mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MASTERS.map((m) => (
          <div
            key={m.name}
            className={`master-card-${m.colorClass} bg-card rounded-lg p-6 flex flex-col gap-3 book-card-hover`}
          >
            <div className={`w-3 h-3 rounded-full master-dot-${m.colorClass}`} />
            <h3 className="font-serif font-bold text-base text-foreground leading-snug">{m.name}</h3>
            <p className="text-xs font-sans text-muted-foreground">{m.period}</p>
            <p className="text-sm font-sans text-foreground leading-relaxed flex-1">{m.description}</p>
            <p className="text-xs font-sans text-muted-foreground">
              <span className="font-semibold text-foreground">{m.bookCount}</span> books in library
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-xs font-sans border-gold/40 hover:bg-gold/10 text-foreground gap-1"
              onClick={() => onFilterByMaster(m.name)}
            >
              Browse Their Books <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MasterSpotlight;
