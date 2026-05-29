import { Outlet, Link, useLocation } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import { BookPlus, Edit, Users, UserPlus, ArrowRightLeft, Undo2, LayoutDashboard } from "lucide-react";
import { AdminStoreProvider } from "@/lib/store";

export default function AdminLayout() {
  const location = useLocation();

  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Add new Book",
      url: "/admin/books/new",
      icon: BookPlus,
    },
    {
      title: "Modify book",
      url: "/admin/books",
      icon: Edit,
    },
    {
      title: "Team mem.",
      url: "/admin/team",
      icon: Users,
    },
    {
      title: "Add new member",
      url: "/admin/team/new",
      icon: UserPlus,
    },
    {
      title: "Issue a book",
      url: "/admin/issue",
      icon: ArrowRightLeft,
    },
    {
      title: "Return a book",
      url: "/admin/return",
      icon: Undo2,
    },
  ];

  return (
    <AdminStoreProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full text-lg">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-lg py-4">Admin Portal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title} className="py-1">
                        <SidebarMenuButton asChild isActive={location.pathname === item.url} className="text-base h-12">
                          <Link to={item.url}>
                            <item.icon className="!w-5 !h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-muted/20">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </AdminStoreProvider>
  );
}
