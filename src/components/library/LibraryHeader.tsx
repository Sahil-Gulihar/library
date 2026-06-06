"use client";

import { Flower2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const LibraryHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="relative overflow-hidden paisley-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-3">
            <Flower2 className="w-6 h-6 md:w-7 md:h-7 text-gold opacity-70" />
            <h1 className="text-2xl md:text-4xl tracking-[0.04em] text-foreground">
              Darshan Library
            </h1>
            <Flower2 className="w-6 h-6 md:w-7 md:h-7 text-gold opacity-70" />
          </div>
          <p className="text-gold text-sm md:text-base italic tracking-[0.08em] opacity-80">
            Sacred Literature of the Masters
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-3">
            <nav className="flex gap-6 text-xs tracking-[0.15em] uppercase text-foreground/70">
              {[
                { label: "Home", href: "/" },
                { label: "Browse", href: "/" },
                ...(user?.isAdmin ? [{ label: "Admin Portal", href: "/admin" }] : []),
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-gold transition-colors duration-300 pb-1 border-b border-transparent hover:border-gold/40"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="h-4 w-px bg-gold/20 hidden sm:block" />

            <div className="flex items-center gap-4 text-xs tracking-[0.15em] uppercase">
              {user ? (
                <div className="flex items-center gap-3 bg-gold/5 border border-gold/20 px-4 py-2 rounded-full">
                  <span className="text-foreground/80 flex items-center gap-1.5 normal-case font-medium">
                    <User className="w-3.5 h-3.5 text-gold" /> {user.name} {user.isAdmin && <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/15 text-gold uppercase tracking-wider font-bold">Admin</span>}
                  </span>
                  <button
                    onClick={logout}
                    className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gold hover:text-gold/80 transition-colors border border-gold/30 px-5 py-2 rounded-full bg-background/40 hover:bg-gold/5"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="gold-divider" />
    </header>
  );
};

export default LibraryHeader;
