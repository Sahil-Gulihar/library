"use client";

import { BookOpen, Globe, Users, Tag } from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { LANGUAGES, MASTERS, CATEGORIES } from "@/data/books";

const StatsBar = () => {
  const { books } = useAdminStore();
  
  const stats = [
    { label: "Total Books", value: books.length.toString(), icon: BookOpen },
    { label: "Languages", value: LANGUAGES.length.toString(), icon: Globe },
    { label: "Masters", value: MASTERS.length.toString(), icon: Users },
    { label: "Categories", value: CATEGORIES.length.toString(), icon: Tag },
  ];

  return (
    <section className="border-b border-border/50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 justify-center">
              <s.icon className="w-4 h-4 text-gold/70" />
              <div>
                <p className="text-2xl text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

