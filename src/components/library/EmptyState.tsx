import { SearchX } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <SearchX className="w-16 h-16 text-gold/40 mb-4" />
    <h3 className="font-serif text-xl font-bold text-foreground mb-2">No Books Found</h3>
    <p className="text-sm font-sans text-muted-foreground max-w-sm">
      Try adjusting your search or filters to discover the sacred literature you're looking for.
    </p>
  </div>
);

export default EmptyState;
