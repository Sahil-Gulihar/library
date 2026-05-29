import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/lib/store";
import { Trash2, Edit } from "lucide-react";
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

  const handleDelete = (id: number) => {
    deleteBook(id);
    toast.success(`Book ID ${id} removed successfully.`);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditMaster(book.master);
    setEditYear(book.year.toString());
  };

  const handleSaveEdit = () => {
    if (editingBook) {
      updateBook(editingBook.id, {
        title: editTitle,
        master: editMaster,
        year: parseInt(editYear, 10) || editingBook.year,
      });
      toast.success(`Book ID ${editingBook.id} updated successfully.`);
      setEditingBook(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Modify Book</CardTitle>
          <CardDescription className="text-lg">
            Manage existing books in the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Master</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} className="text-base md:text-lg">
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell className="text-muted-foreground">{book.master}</TableCell>
                  <TableCell>
                    {book.available ? (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-green-100 text-green-800">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-yellow-100 text-yellow-800">
                        Issued
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="ghost" size="lg" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleEditClick(book)}>
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="lg" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(book.id)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
