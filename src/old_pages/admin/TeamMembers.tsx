"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/lib/store";
import { Trash2, Download } from "lucide-react";
import { toast } from "sonner";

export default function TeamMembers() {
  const { teamMembers, deleteMember } = useAdminStore();

  const handleDelete = (id: number, name: string) => {
    deleteMember(id);
    toast.success(`${name} removed successfully.`);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Role", "Department", "Contact", "Email"];
    const csvRows = [headers.join(",")];
    
    teamMembers.forEach(member => {
      const row = [
        member.id,
        `"${member.name.replace(/"/g, '""')}"`,
        `"${member.role}"`,
        `"${member.department}"`,
        `"${member.contact}"`,
        `"${member.email || ""}"`
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_members_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Team members data exported successfully.");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="py-5 px-6 font-semibold">Name</TableHead>
                <TableHead className="py-5 px-6 font-semibold">Role</TableHead>
                <TableHead className="py-5 px-6 font-semibold">Department</TableHead>
                <TableHead className="py-5 px-6 font-semibold">Contact</TableHead>
                <TableHead className="text-right py-5 px-6 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium py-4 px-6">{member.name}</TableCell>
                  <TableCell className="py-4 px-6">{member.role}</TableCell>
                  <TableCell className="py-4 px-6">{member.department}</TableCell>
                  <TableCell className="py-4 px-6 text-muted-foreground">{member.contact}</TableCell>
                  <TableCell className="text-right py-4 px-6">
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9" onClick={() => handleDelete(member.id, member.name)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {teamMembers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
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
