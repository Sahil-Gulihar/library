import { BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Book } from "@/data/books";
import { getMasterColorClass } from "@/data/books";

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
}

const BookCard = ({ book, onViewDetails }: BookCardProps) => {
  const colorClass = getMasterColorClass(book.master);
  const displayLangs = book.languages.slice(0, 4);
  const extraLangs = book.languages.length - 4;

  return (
    <div className="book-card-hover bg-card rounded border border-border/50 overflow-hidden flex flex-col">
      <div
        className="h-44 flex items-center justify-center p-6 relative"
        style={{
          background: `linear-gradient(160deg, hsl(var(--gold) / 0.08), hsl(var(--cream)) 60%, hsl(var(--gold) / 0.04))`,
        }}
      >
        <div className="text-center">
          <BookOpen className="w-7 h-7 text-gold/40 mx-auto mb-3" />
          <h3 className="text-sm text-foreground leading-tight line-clamp-3 tracking-wide">
            {book.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="text-base text-foreground leading-snug line-clamp-2 tracking-wide">
            {book.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`w-2 h-2 rounded-full master-dot-${colorClass} flex-shrink-0`} />
            <p className="text-[11px] text-muted-foreground line-clamp-1 tracking-wide">{book.master}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {book.abstract}
        </p>

        <div className="flex flex-wrap gap-1">
          {book.categories.map((c) => (
            <Badge key={c} variant="outline" className="text-[10px] border-gold/20 text-foreground/80 rounded-sm">
              {c}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 items-center">
          {displayLangs.map((l) => (
            <span key={l} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">
              {l}
            </span>
          ))}
          {extraLangs > 0 && (
            <span className="text-[10px] text-muted-foreground">+{extraLangs} more</span>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
          <span>{book.year}</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {book.shelf.split(" – ").slice(0, 2).join(" – ")}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-1 text-xs tracking-wider uppercase border-border/50 hover:bg-gold/5 hover:border-gold/40 text-foreground"
          onClick={() => onViewDetails(book)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
