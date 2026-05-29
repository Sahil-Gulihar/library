import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStore } from "@/lib/store";
import { BookOpen, BookUp2, Users } from "lucide-react";

export default function Dashboard() {
  const { books, teamMembers } = useAdminStore();
  
  const totalBooks = books.length;
  const issuedBooks = books.filter(book => !book.available).length;
  const totalTeamMembers = teamMembers.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Database Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">Overview of library statistics and activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Books</CardTitle>
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Active Issues</CardTitle>
            <BookUp2 className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{issuedBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Team Members</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalTeamMembers}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
