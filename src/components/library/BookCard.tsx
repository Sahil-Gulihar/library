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
    <div className="book-card-hover bg-card rounded-lg border border-border overflow-hidden flex flex-col">
      {/* Book cover placeholder */}
      <div
        className="h-48 flex items-center justify-center p-6 relative"
        style={{
          background: `linear-gradient(135deg, hsl(var(--gold) / 0.15), hsl(var(--gold) / 0.05))`,
        }}
      >
        <div className="absolute top-3 right-3">
          <Badge className={`text-xs font-sans ${book.available ? "bg-emerald-600 text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>
            {book.available ? "Available" : "Checked Out"}
          </Badge>
        </div>
        <div className="text-center">
          <BookOpen className="w-8 h-8 text-gold mx-auto mb-2 opacity-60" />
          <h3 className="font-serif text-sm font-bold text-foreground leading-tight line-clamp-3">
            {book.title}
          </h3>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Title + Author */}
        <div>
          <h3 className="font-serif font-bold text-base text-foreground leading-snug line-clamp-2">
            {book.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2 h-2 rounded-full master-dot-${colorClass} flex-shrink-0`} />
            <p className="text-xs font-sans text-muted-foreground line-clamp-1">{book.master}</p>
          </div>
        </div>

        {/* Abstract */}
        <p className="text-xs font-sans text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {book.abstract}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {book.categories.map((c) => (
            <Badge key={c} variant="outline" className="text-[10px] font-sans border-gold/30 text-foreground">
              {c}
            </Badge>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1 items-center">
          {displayLangs.map((l) => (
            <span key={l} className="text-[10px] font-sans bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
              {l}
            </span>
          ))}
          {extraLangs > 0 && (
            <span className="text-[10px] font-sans text-muted-foreground">+{extraLangs} more</span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] font-sans text-muted-foreground pt-1 border-t border-border">
          <span>{book.year}</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {book.shelf.split(" – ").slice(0, 2).join(" – ")}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-1 text-xs font-sans border-gold/40 hover:bg-gold/10 hover:border-gold text-foreground"
          onClick={() => onViewDetails(book)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
