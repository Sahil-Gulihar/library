import { useState, useMemo, useCallback, useRef } from "react";
import { books, type Book } from "@/data/books";
import LibraryHeader from "@/components/library/LibraryHeader";
import StatsBar from "@/components/library/StatsBar";
import SearchFilterBar from "@/components/library/SearchFilterBar";
import BookCard from "@/components/library/BookCard";
import BookDetailModal from "@/components/library/BookDetailModal";
import MasterSpotlight from "@/components/library/MasterSpotlight";
import LibraryFooter from "@/components/library/LibraryFooter";
import EmptyState from "@/components/library/EmptyState";

const Index = () => {
  const [search, setSearch] = useState("");
  const [masterFilter, setMasterFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("title-asc");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCategoryToggle = useCallback((c: string) => {
    setCategoryFilter(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }, []);

  const handleLanguageToggle = useCallback((l: string) => {
    setLanguageFilter(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
  }, []);

  const handleClearAll = useCallback(() => {
    setSearch("");
    setMasterFilter("");
    setCategoryFilter([]);
    setLanguageFilter([]);
    setSortBy("title-asc");
  }, []);

  const handleFilterByMaster = useCallback((master: string) => {
    setMasterFilter(master);
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (masterFilter) count++;
    count += categoryFilter.length;
    count += languageFilter.length;
    return count;
  }, [masterFilter, categoryFilter, languageFilter]);

  const filtered = useMemo(() => {
    let result = [...books];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(s) ||
        b.master.toLowerCase().includes(s) ||
        b.abstract.toLowerCase().includes(s) ||
        b.categories.some(c => c.toLowerCase().includes(s))
      );
    }
    if (masterFilter) result = result.filter(b => b.master === masterFilter);
    if (categoryFilter.length) result = result.filter(b => categoryFilter.some(c => b.categories.includes(c)));
    if (languageFilter.length) result = result.filter(b => languageFilter.some(l => b.languages.includes(l)));

    switch (sortBy) {
      case "title-asc": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "title-desc": result.sort((a, b) => b.title.localeCompare(a.title)); break;
      case "year-new": result.sort((a, b) => b.year - a.year); break;
      case "year-old": result.sort((a, b) => a.year - b.year); break;
      case "master": result.sort((a, b) => a.master.localeCompare(b.master)); break;
    }
    return result;
  }, [search, masterFilter, categoryFilter, languageFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LibraryHeader />
      <StatsBar />
      <SearchFilterBar
        search={search} onSearchChange={setSearch}
        masterFilter={masterFilter} onMasterChange={setMasterFilter}
        categoryFilter={categoryFilter} onCategoryToggle={handleCategoryToggle}
        languageFilter={languageFilter} onLanguageToggle={handleLanguageToggle}
        sortBy={sortBy} onSortChange={setSortBy}
        onClearAll={handleClearAll}
        activeFilterCount={activeFilterCount}
        resultCount={filtered.length}
      />

      <main ref={gridRef} className="flex-1 container mx-auto px-4 py-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(book => (
              <BookCard key={book.id} book={book} onViewDetails={setSelectedBook} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      <div className="gold-divider" />
      <MasterSpotlight onFilterByMaster={handleFilterByMaster} />
      <LibraryFooter />

      <BookDetailModal
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
};

export default Index;
