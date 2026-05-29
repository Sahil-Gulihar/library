import React, { createContext, useContext, useState, useEffect } from "react";
import { books as initialBooks, Book } from "@/data/books";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  contact: string;
  email?: string;
};

const initialTeamMembers: TeamMember[] = [
  { id: 1, name: "Arjun Singh", role: "Librarian", department: "Main Library", contact: "9876543210" },
  { id: 2, name: "Priya Sharma", role: "Volunteer", department: "Reference Section", contact: "8765432109" },
  { id: 3, name: "Rahul Verma", role: "Archivist", department: "Digital Archives", contact: "7654321098" },
  { id: 4, name: "Simran Kaur", role: "Manager", department: "Operations", contact: "6543210987" },
];

export type IssueRecord = {
  id: string;
  bookId: number;
  name: string;
  phoneNo: string;
  issuingDate: string;
  returnDate: string;
  department: string;
  email?: string;
};

interface AdminStoreContextType {
  books: Book[];
  teamMembers: TeamMember[];
  issues: IssueRecord[];
  addBook: (book: Omit<Book, "id" | "available">) => void;
  updateBook: (id: number, updatedData: Partial<Book>) => void;
  deleteBook: (id: number) => void;
  addMember: (member: Omit<TeamMember, "id">) => void;
  deleteMember: (id: number) => void;
  issueBook: (issue: Omit<IssueRecord, "id">) => string;
  returnBook: (issueId: string) => boolean;
}

const AdminStoreContext = createContext<AdminStoreContextType | undefined>(undefined);

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [issues, setIssues] = useState<IssueRecord[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem("admin_books");
    if (savedBooks) setBooks(JSON.parse(savedBooks));

    const savedMembers = localStorage.getItem("admin_members");
    if (savedMembers) setTeamMembers(JSON.parse(savedMembers));

    const savedIssues = localStorage.getItem("admin_issues");
    if (savedIssues) setIssues(JSON.parse(savedIssues));
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("admin_books", JSON.stringify(books));
    localStorage.setItem("admin_members", JSON.stringify(teamMembers));
    localStorage.setItem("admin_issues", JSON.stringify(issues));
  }, [books, teamMembers, issues]);

  const addBook = (bookData: Omit<Book, "id" | "available">) => {
    const newBook: Book = {
      ...bookData,
      id: Math.max(0, ...books.map((b) => b.id)) + 1,
      available: true,
      languages: [],
      categories: [],
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id: number, updatedData: Partial<Book>) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, ...updatedData } : b)));
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const addMember = (memberData: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Math.max(0, ...teamMembers.map((m) => m.id)) + 1,
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const deleteMember = (id: number) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  const issueBook = (issueData: Omit<IssueRecord, "id">) => {
    const newId = `ISSUE-${Math.floor(Math.random() * 10000)}`;
    const newIssue = { ...issueData, id: newId };
    setIssues([...issues, newIssue]);
    setBooks(books.map((b) => b.id === issueData.bookId ? { ...b, available: false } : b));
    return newId;
  };

  const returnBook = (issueId: string) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return false;
    
    setIssues(issues.filter((i) => i.id !== issueId));
    setBooks(books.map((b) => b.id === issue.bookId ? { ...b, available: true } : b));
    return true;
  };

  return (
    <AdminStoreContext.Provider value={{ books, teamMembers, issues, addBook, updateBook, deleteBook, addMember, deleteMember, issueBook, returnBook }}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const context = useContext(AdminStoreContext);
  if (!context) {
    throw new Error("useAdminStore must be used within an AdminStoreProvider");
  }
  return context;
}
