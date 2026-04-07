import { BookOpen, Globe, Users, Tag } from "lucide-react";

const stats = [
  { label: "Total Books", value: "25", icon: BookOpen },
  { label: "Languages", value: "53", icon: Globe },
  { label: "Masters", value: "4", icon: Users },
  { label: "Categories", value: "11", icon: Tag },
];

const StatsBar = () => (
  <section className="bg-cream border-b border-border">
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-foreground">{s.value}</p>
              <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
