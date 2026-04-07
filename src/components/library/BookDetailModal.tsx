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
          <DialogTitle className="font-serif text-xl leading-tight text-foreground">{book.title}</DialogTitle>
        </DialogHeader>

        {/* Cover */}
        <div
          className="h-40 rounded-lg flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.15), hsl(var(--gold) / 0.05))` }}
        >
          <BookOpen className="w-12 h-12 text-gold opacity-50" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-3 h-3 rounded-full master-dot-${colorClass}`} />
          <span className="font-sans text-sm font-semibold text-foreground">{book.master}</span>
        </div>
        {masterInfo && (
          <p className="text-xs font-sans text-muted-foreground mb-4 italic">
            {masterInfo.description}
          </p>
        )}

        {/* Abstract */}
        <p className="font-sans text-sm text-foreground leading-relaxed mb-4">{book.abstract}</p>

        <div className="gold-divider mb-4" />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm font-sans mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" /> <span>Released: {book.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" /> <span>{book.shelf}</span>
          </div>
          <div className="col-span-2">
            <Badge className={`text-xs ${book.available ? "bg-emerald-600 text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>
              {book.available ? "Available" : "Checked Out"}
            </Badge>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-3">
          <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
          <div className="flex flex-wrap gap-1.5">
            {book.categories.map(c => (
              <Badge key={c} variant="outline" className="text-xs font-sans border-gold/30 text-foreground">{c}</Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2">Available in</p>
          <div className="flex flex-wrap gap-1.5">
            {book.languages.map(l => (
              <span key={l} className="text-xs font-sans bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{l}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 gap-2 bg-gold hover:bg-gold/90 text-primary font-sans">
            <Bookmark className="w-4 h-4" /> Reserve Book
          </Button>
          <Button variant="outline" className="flex-1 gap-2 font-sans border-gold/40 hover:bg-gold/10 text-foreground">
            <Eye className="w-4 h-4" /> Read Online
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
