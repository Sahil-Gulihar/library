"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { UserPlus, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { attendanceApi, seedMockData, type AttendanceRecord } from "@/lib/attendance";

const PURPOSE_OPTIONS: AttendanceRecord["purpose"][] = ["Reading", "Borrowing", "Returning", "Research", "Event"];

export function AttendanceWidget() {
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

  const filtered = filterPurpose === "all" ? records : records.filter(r => r.purpose === filterPurpose);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold tracking-tight">Recent Activity</h3>
        <div className="flex items-center gap-3">
          <Select value={filterPurpose} onValueChange={setFilterPurpose}>
            <SelectTrigger className="w-40 text-xs h-9">
              <SelectValue placeholder="Filter by purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purposes</SelectItem>
              {PURPOSE_OPTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCheckIn(true)} size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90 text-[10px] tracking-wider uppercase h-9">
            <UserPlus className="w-3.5 h-3.5" /> Check In
          </Button>
        </div>
      </div>

      <div className="bg-card rounded border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Visitor</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Purpose</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Check In</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 10).map(r => (
              <TableRow key={r.id} className="border-border/30">
                <TableCell className="text-sm font-medium">{r.visitorName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] border-gold/20 text-foreground/80 rounded-sm">{r.purpose}</Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(r.checkIn), "h:mm a")}</TableCell>
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
                <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-10">No records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
}
