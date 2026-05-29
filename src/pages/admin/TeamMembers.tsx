import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/lib/store";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TeamMembers() {
  const { teamMembers, deleteMember } = useAdminStore();

  const handleDelete = (id: number, name: string) => {
    deleteMember(id);
    toast.success(`${name} removed successfully.`);
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Team Members</CardTitle>
          <CardDescription className="text-lg">
            View and manage current team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="text-base md:text-lg">
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.contact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="lg" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(member.id, member.name)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {teamMembers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground text-lg">
                    No team members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
