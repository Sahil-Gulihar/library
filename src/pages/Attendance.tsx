import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { UserPlus, LogOut, Clock, Users, CalendarDays, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { attendanceApi, seedMockData, type AttendanceRecord } from "@/lib/attendance";
import { Link } from "react-router-dom";
import { Flower2 } from "lucide-react";

const PURPOSE_OPTIONS: AttendanceRecord["purpose"][] = ["Reading", "Borrowing", "Returning", "Research", "Event"];

const Attendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState<AttendanceRecord["purpose"]>("Reading");
  const [notes, setNotes] = useState("");
  const [filterPurpose, setFilterPurpose] = useState<string>("all");

  const refresh = useCallback(() => setRecords(attendanceApi.getAll()), []);

  useEffect(() => {
    seedMockData();
    refresh();
  }, [refresh]);

  const handleCheckIn = () => {
    if (!name.trim()) return;
    attendanceApi.checkIn({ visitorName: name.trim(), purpose, notes });
    setName("");
    setNotes("");
    setShowCheckIn(false);
    refresh();
  };

  const handleCheckOut = (id: string) => {
    attendanceApi.checkOut(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    attendanceApi.delete(id);
    refresh();
  };

  const activeCount = records.filter(r => !r.checkOut).length;
  const todayCount = attendanceApi.getTodayCount();

  const filtered = filterPurpose === "all" ? records : records.filter(r => r.purpose === filterPurpose);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="relative overflow-hidden paisley-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-3">
              <Flower2 className="w-5 h-5 text-gold opacity-70" />
              <h1 className="text-xl md:text-3xl tracking-[0.04em] text-foreground">Attendance Register</h1>
              <Flower2 className="w-5 h-5 text-gold opacity-70" />
            </div>
            <p className="text-gold text-sm italic tracking-[0.08em] opacity-80">SKRM / SOS Digital Library</p>
            <Link to="/" className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors">
              ← Back to Library
            </Link>
          </div>
        </div>
        <div className="gold-divider" />
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded border border-border/50 p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-gold" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">Currently In</p>
              <p className="text-xl text-foreground">{activeCount}</p>
            </div>
          </div>
          <div className="bg-card rounded border border-border/50 p-4 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-gold" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">Today's Visits</p>
              <p className="text-xl text-foreground">{todayCount}</p>
            </div>
          </div>
          <div className="bg-card rounded border border-border/50 p-4 flex items-center gap-3 col-span-2 md:col-span-1">
            <Clock className="w-5 h-5 text-gold" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">Total Records</p>
              <p className="text-xl text-foreground">{records.length}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Select value={filterPurpose} onValueChange={setFilterPurpose}>
            <SelectTrigger className="w-44 text-xs border-border/60">
              <SelectValue placeholder="Filter by purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purposes</SelectItem>
              {PURPOSE_OPTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCheckIn(true)} className="gap-2 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-wider uppercase">
            <UserPlus className="w-4 h-4" /> Check In Visitor
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Visitor</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Purpose</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Check In</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Check Out</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id} className="border-border/30">
                  <TableCell className="text-sm text-foreground">{r.visitorName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] border-gold/20 text-foreground/80 rounded-sm">{r.purpose}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{format(new Date(r.checkIn), "MMM d, h:mm a")}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.checkOut ? format(new Date(r.checkOut), "MMM d, h:mm a") : "—"}
                  </TableCell>
                  <TableCell>
                    {r.checkOut ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Left</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-800">In Library</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {!r.checkOut && (
                        <Button variant="ghost" size="icon" onClick={() => handleCheckOut(r.id)} className="h-7 w-7" title="Check out">
                          <LogOut className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="h-7 w-7 text-destructive/60 hover:text-destructive" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">No records found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Check-in Dialog */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-lg text-foreground tracking-wide">Check In Visitor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-1.5 block">Visitor Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="bg-background border-border/60 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-1.5 block">Purpose</label>
              <Select value={purpose} onValueChange={v => setPurpose(v as AttendanceRecord["purpose"])}>
                <SelectTrigger className="text-sm border-border/60"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PURPOSE_OPTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-1.5 block">Notes (optional)</label>
              <Input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes..." className="bg-background border-border/60 text-sm" />
            </div>
            <Button onClick={handleCheckIn} disabled={!name.trim()} className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs tracking-wider uppercase">
              <UserPlus className="w-4 h-4 mr-2" /> Check In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Attendance;
