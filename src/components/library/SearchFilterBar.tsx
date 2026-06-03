"use client";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MASTERS, CATEGORIES, LANGUAGES } from "@/data/books";
import { useState } from "react";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  masterFilter: string;
  onMasterChange: (v: string) => void;
  categoryFilter: string[];
  onCategoryToggle: (c: string) => void;
  languageFilter: string[];
  onLanguageToggle: (l: string) => void;
  availabilityFilter: string;
  onAvailabilityChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  resultCount: number;
}

const SearchFilterBar = ({
  search, onSearchChange, masterFilter, onMasterChange,
  categoryFilter, onCategoryToggle, languageFilter, onLanguageToggle,
  availabilityFilter, onAvailabilityChange,
  sortBy, onSortChange, onClearAll, activeFilterCount, resultCount,
}: SearchFilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4 space-y-3">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or keyword..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-card border-border/60 text-sm"
            />
            {search && (
              <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 text-xs tracking-wider uppercase border-border/60"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="bg-gold text-accent-foreground ml-1 text-xs">{activeFilterCount}</Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mr-2">Master:</span>
              {["All Masters", ...MASTERS.map(m => m.shortName)].map((m) => (
                <button
                  key={m}
                  onClick={() => onMasterChange(m === "All Masters" ? "" : MASTERS.find(x => x.shortName === m)?.name || "")}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-200 border ${
                    (m === "All Masters" && !masterFilter) || MASTERS.find(x => x.name === masterFilter)?.shortName === m
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border/60 hover:border-gold/60"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mr-2">Category:</span>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => onCategoryToggle(c)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-200 border ${
                    categoryFilter.includes(c)
                      ? "bg-gold text-accent-foreground border-gold"
                      : "bg-card text-foreground border-border/60 hover:border-gold/60"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mr-2">Language:</span>
              {LANGUAGES.slice(0, 10).map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageToggle(l)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-200 border ${
                    languageFilter.includes(l)
                      ? "bg-gold text-accent-foreground border-gold"
                      : "bg-card text-foreground border-border/60 hover:border-gold/60"
                  }`}
                >
                  {l}
                </button>
              ))}
              {LANGUAGES.length > 10 && (
                <span className="text-xs text-muted-foreground">+{LANGUAGES.length - 10} more</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mr-2">Availability:</span>
              {[
                { value: "all", label: "All" },
                { value: "available", label: "Available" },
                { value: "checked-out", label: "Checked Out" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onAvailabilityChange(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-200 border ${
                    availabilityFilter === opt.value
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border/60 hover:border-gold/60"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-48 text-xs border-border/60">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title-asc">Title A–Z</SelectItem>
                  <SelectItem value="title-desc">Title Z–A</SelectItem>
                  <SelectItem value="year-new">Year (Newest)</SelectItem>
                  <SelectItem value="year-old">Year (Oldest)</SelectItem>
                  <SelectItem value="master">By Master</SelectItem>
                </SelectContent>
              </Select>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear all
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {masterFilter && (
              <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => onMasterChange("")}>
                {MASTERS.find(m => m.name === masterFilter)?.shortName} <X className="w-3 h-3" />
              </Badge>
            )}
            {categoryFilter.map(c => (
              <Badge key={c} variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => onCategoryToggle(c)}>
                {c} <X className="w-3 h-3" />
              </Badge>
            ))}
            {languageFilter.map(l => (
              <Badge key={l} variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => onLanguageToggle(l)}>
                {l} <X className="w-3 h-3" />
              </Badge>
            ))}
            {availabilityFilter !== "all" && (
              <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => onAvailabilityChange("all")}>
                {availabilityFilter === "available" ? "Available" : "Checked Out"} <X className="w-3 h-3" />
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground whitespace-nowrap ml-4 tracking-wider">
            <span className="text-foreground">{resultCount}</span> books
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
