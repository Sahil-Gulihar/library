"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/lib/store";
import { Trash2, Edit, Download } from "lucide-react";
import { toast } from "sonner";
import { Book, MASTERS } from "@/data/books";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ModifyBook() {
  const { books, deleteBook, updateBook } = useAdminStore();
  
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMaster, setEditMaster] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editTotalUnits, setEditTotalUnits] = useState("");
  const [editAvailableUnits, setEditAvailableUnits] = useState("");

  const handleDelete = (id: number) => {
    deleteBook(id);
    toast.success(`Book ID ${id} removed successfully.`);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditMaster(book.master);
    setEditYear(book.year.toString());
    setEditTotalUnits((book.totalUnits ?? 1).toString());
    setEditAvailableUnits((book.availableUnits ?? (book.available ? 1 : 0)).toString());
  };

  const handleSaveEdit = () => {
    if (editingBook) {
      const newTotal = parseInt(editTotalUnits, 10) || 1;
      const newAvailable = parseInt(editAvailableUnits, 10) || 0;
      updateBook(editingBook.id, {
        title: editTitle,
        master: editMaster,
        year: parseInt(editYear, 10) || editingBook.year,
        totalUnits: newTotal,
        availableUnits: newAvailable,
        available: newAvailable > 0
      });
      toast.success(`Book ID ${editingBook.id} updated successfully.`);
      setEditingBook(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Master", "Year", "Shelf", "Total Units", "Available Units", "Status"];
    const csvRows = [headers.join(",")];
    
    books.forEach(book => {
      const total = book.totalUnits ?? 1;
      const avail = book.availableUnits ?? (book.available ? 1 : 0);
      const status = avail > 0 ? "Available" : "Issued";
      
      const row = [
        book.id,
        `"${book.title.replace(/"/g, '""')}"`,
        `"${book.master}"`,
        book.year,
        `"${book.shelf}"`,
        total,
        avail,
        status
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "books_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Books data exported successfully.");
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
                <TableHead className="w-[80px] py-5 px-6 font-semibold">ID</TableHead>
                <TableHead className="py-5 px-6 font-semibold">Title</TableHead>
                <TableHead className="py-5 px-6 font-semibold">Master</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-center">Units</TableHead>
                <TableHead className="py-5 px-6 font-semibold text-center">Status</TableHead>
                <TableHead className="text-right py-5 px-6 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => {
                const total = book.totalUnits ?? 1;
                const avail = book.availableUnits ?? (book.available ? 1 : 0);
                return (
                <TableRow key={book.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium py-4 px-6">{book.id}</TableCell>
                  <TableCell className="py-4 px-6 font-medium">{book.title}</TableCell>
                  <TableCell className="text-muted-foreground py-4 px-6">{book.master}</TableCell>
                  <TableCell className="text-center py-4 px-6 font-medium">
                    {avail} / {total}
                  </TableCell>
                  <TableCell className="text-center py-4 px-6">
                    {avail > 0 ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        Issued
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-4 px-6 flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 h-9 w-9" onClick={() => handleEditClick(book)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9" onClick={() => handleDelete(book.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editingBook} onOpenChange={(open) => !open && setEditingBook(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Book Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-lg">
                Title
              </Label>
              <Input
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="col-span-3 h-12 text-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="master" className="text-right text-lg">
                Master
              </Label>
              <Select value={editMaster} onValueChange={setEditMaster}>
                <SelectTrigger className="col-span-3 h-12 text-lg">
                  <SelectValue placeholder="Select Master" />
                </SelectTrigger>
                <SelectContent>
                  {MASTERS.map(m => (
                    <SelectItem key={m.shortName} value={m.name} className="text-lg py-3">{m.shortName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right text-lg">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
                className="col-span-3 h-12 text-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalUnits" className="text-right text-lg">
                Total Units
              </Label>
              <Input
                id="totalUnits"
                type="number"
                value={editTotalUnits}
                onChange={(e) => setEditTotalUnits(e.target.value)}
                className="col-span-3 h-12 text-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availableUnits" className="text-right text-lg">
                Available
              </Label>
              <Input
                id="availableUnits"
                type="number"
                value={editAvailableUnits}
                onChange={(e) => setEditAvailableUnits(e.target.value)}
                className="col-span-3 h-12 text-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="lg" onClick={() => setEditingBook(null)} className="h-12 text-lg">
              Cancel
            </Button>
            <Button type="submit" size="lg" onClick={handleSaveEdit} className="h-12 text-lg">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
