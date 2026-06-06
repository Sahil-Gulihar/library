"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { BookPlus, Edit, Users, UserPlus, ArrowRightLeft, Undo2, LayoutDashboard, Flower2, Library } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && (!user || !user.isAdmin)) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, mounted, pathname, router]);

  if (!mounted || loading || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-semibold">Verifying credentials...</p>
      </div>
    );
  }

  const menuGroups = [
    {
      label: "Management",
      items: [
        { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
        { title: "Team Members", url: "/admin/team", icon: Users },
      ]
    },
    {
      label: "Books",
      items: [
        { title: "Add New Book", url: "/admin/books/new", icon: BookPlus },
        { title: "Modify Books", url: "/admin/books", icon: Edit },
      ]
    },
    {
      label: "Circulation",
      items: [
        { title: "Issue Book", url: "/admin/issue", icon: ArrowRightLeft },
        { title: "Return Book", url: "/admin/return", icon: Undo2 },
      ]
    },
    {
      label: "Account",
      items: [
        { title: "Add Team Member", url: "/admin/team/new", icon: UserPlus },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-gold/10">
          <SidebarHeader className="border-b border-gold/10 p-6 bg-muted/30">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gold/10 p-2 rounded-lg group-hover:bg-gold/20 transition-colors">
                <Flower2 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h2 className="font-bold tracking-tight text-sm">Darshan Library</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Admin Portal</p>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            {menuGroups.map((group) => (
              <SidebarGroup key={group.label} className="mb-6">
                <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/60 px-2 mb-2">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title} className="mb-1">
                        <SidebarMenuButton 
                          asChild 
                          isActive={pathname === item.url}
                          className={cn(
                            "h-11 px-3 transition-all duration-200 rounded-lg",
                            pathname === item.url 
                              ? "bg-gold/10 text-gold hover:bg-gold/15 hover:text-gold" 
                              : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Link href={item.url}>
                            <item.icon className={cn("!w-5 !h-5", pathname === item.url ? "text-gold" : "text-muted-foreground")} />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen bg-muted/30">
          {/* Branded Admin Header */}
          <header className="relative overflow-hidden paisley-bg border-b border-gold/20 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
            <div className="relative z-10 container mx-auto px-8 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-background/80 p-3 rounded-xl border border-gold/20 shadow-sm">
                    <Library className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {menuGroups.flatMap(g => g.items).find(i => i.url === pathname)?.title || "Dashboard"}
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="uppercase tracking-widest font-semibold opacity-60">Control Panel</span>
                      <span className="h-1 w-1 rounded-full bg-gold/40" />
                      <span className="italic">Sacred Scriptures Digital Library</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground hidden sm:inline">Logged in as <strong className="text-foreground">{user?.name}</strong></span>
                  <Link 
                    href="/"
                    className="text-xs font-bold uppercase tracking-widest text-gold hover:text-gold/80 transition-colors border border-gold/20 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm"
                  >
                    View Library
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      router.push("/login");
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all border border-red-500/20 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm animate-pulse-subtle"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 md:p-12 max-w-[1600px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Helper for class merging if not imported
import { cn } from "@/lib/utils";
