import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, Calendar, Bookmark, Eye } from "lucide-react";
import type { Book } from "@/data/books";
import { getMasterColorClass, MASTERS } from "@/data/books";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

const BookDetailModal = ({ book, open, onClose }: BookDetailModalProps) => {
  if (!book) return null;
  const colorClass = getMasterColorClass(book.master);
  const masterInfo = MASTERS.find(m => m.name === book.master);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight text-foreground tracking-wide">{book.title}</DialogTitle>
        </DialogHeader>

        <div
          className="h-36 rounded flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(160deg, hsl(var(--gold) / 0.08), hsl(var(--cream)) 60%, hsl(var(--gold) / 0.04))` }}
        >
          <BookOpen className="w-10 h-10 text-gold/40" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full master-dot-${colorClass}`} />
          <span className="text-sm text-foreground">{book.master}</span>
        </div>
        {masterInfo && (
          <p className="text-xs text-muted-foreground mb-4 italic">{masterInfo.description}</p>
        )}

        <p className="text-sm text-foreground leading-relaxed mb-5">{book.abstract}</p>

        <div className="gold-divider mb-5" />

        <div className="grid grid-cols-2 gap-3 text-sm mb-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" /> <span>Released: {book.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" /> <span>{book.shelf}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2">Categories</p>
          <div className="flex flex-wrap gap-1.5">
            {book.categories.map(c => (
              <Badge key={c} variant="outline" className="text-xs border-gold/20 text-foreground/80 rounded-sm">{c}</Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2">Available in</p>
          <div className="flex flex-wrap gap-1.5">
            {book.languages.map(l => (
              <span key={l} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{l}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 gap-2 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-wider uppercase">
            <Bookmark className="w-4 h-4" /> Reserve Book
          </Button>
          <Button variant="outline" className="flex-1 gap-2 text-xs tracking-wider uppercase border-border/60 hover:bg-gold/5 text-foreground">
            <Eye className="w-4 h-4" /> Read Online
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
