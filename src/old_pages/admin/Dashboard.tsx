"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAdminStore } from "@/lib/store";
import { BookOpen, BookUp2, Users, CalendarDays, Activity } from "lucide-react";
import { AttendanceWidget } from "@/components/admin/AttendanceWidget";
import { attendanceApi } from "@/lib/attendance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { books, teamMembers } = useAdminStore();
  const [todayCount, setTodayCount] = useState(0);
  const [activeVisitors, setActiveVisitors] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    setTodayCount(attendanceApi.getTodayCount());
    setActiveVisitors(attendanceApi.getActiveVisitors().length);
  }, []);

  const totalBooks = books.length;
  const issuedBooks = books.filter(book => !book.available).length;
  const totalTeamMembers = teamMembers.length;

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      description: "Inventory size",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Issues",
      value: issuedBooks,
      description: "Books currently out",
      icon: BookUp2,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Today's Visits",
      value: todayCount,
      description: "Daily footfall",
      icon: CalendarDays,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Currently In",
      value: activeVisitors,
      description: "Visitors in library",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium italic opacity-70">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Card className="h-full border-border/40 shadow-sm">
            <CardHeader className="border-b border-border/40 bg-muted/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-foreground p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-background" />
                </div>
                <div>
                  <CardTitle className="text-2xl tracking-tight">Circulation & Activity</CardTitle>
                  <CardDescription className="text-base mt-1">Register and monitor visitor logs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <AttendanceWidget />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl tracking-tight">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => router.push("/admin/issue")}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-border hover:bg-muted/30 transition-colors group"
              >
                <BookUp2 className="h-6 w-6 text-muted-foreground group-hover:text-amber-600 transition-colors mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider">Issue Book</span>
              </button>
              <button 
                onClick={() => router.push("/admin/team/new")}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-border hover:bg-muted/30 transition-colors group"
              >
                <Users className="h-6 w-6 text-muted-foreground group-hover:text-purple-600 transition-colors mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider">New Member</span>
              </button>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl tracking-tight">Library Health</CardTitle>
              <CardDescription>Status of the current collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Availability Rate</span>
                  <span className="font-semibold">{totalBooks > 0 ? Math.round(((totalBooks - issuedBooks) / totalBooks) * 100) : 0}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${totalBooks > 0 ? ((totalBooks - issuedBooks) / totalBooks) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Team Strength</span>
                  </div>
                  <span className="text-lg font-bold">{totalTeamMembers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
