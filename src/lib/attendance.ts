export interface AttendanceRecord {
  id: string;
  visitorName: string;
  purpose: "Reading" | "Borrowing" | "Returning" | "Research" | "Event";
  checkIn: string; // ISO date
  checkOut: string | null;
  notes: string;
}

const STORAGE_KEY = "skrm-library-attendance";

function getRecords(): AttendanceRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: AttendanceRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// Seed some mock data if empty
export function seedMockData() {
  if (getRecords().length > 0) return;
  const mockNames = [
    "Priya Sharma", "Anil Kapoor", "Maria Garcia", "Hans Mueller",
    "Fatima Khan", "Rajesh Patel", "Sarah Johnson", "Deepak Verma",
    "Elena Rodriguez", "Thomas Fischer", "Meera Devi", "Arjun Singh",
  ];
  const purposes: AttendanceRecord["purpose"][] = ["Reading", "Borrowing", "Returning", "Research", "Event"];
  const now = Date.now();
  const records: AttendanceRecord[] = mockNames.map((name, i) => {
    const daysAgo = Math.floor(Math.random() * 14);
    const hoursAgo = Math.floor(Math.random() * 8);
    const checkIn = new Date(now - daysAgo * 86400000 - hoursAgo * 3600000).toISOString();
    const checkedOut = Math.random() > 0.3;
    return {
      id: `mock-${i}`,
      visitorName: name,
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      checkIn,
      checkOut: checkedOut ? new Date(new Date(checkIn).getTime() + (1 + Math.random() * 3) * 3600000).toISOString() : null,
      notes: "",
    };
  });
  saveRecords(records);
}

export const attendanceApi = {
  getAll(): AttendanceRecord[] {
    return getRecords().sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
  },

  checkIn(data: Omit<AttendanceRecord, "id" | "checkIn" | "checkOut">): AttendanceRecord {
    const record: AttendanceRecord = {
      ...data,
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      checkIn: new Date().toISOString(),
      checkOut: null,
    };
    const records = getRecords();
    records.push(record);
    saveRecords(records);
    return record;
  },

  checkOut(id: string): AttendanceRecord | null {
    const records = getRecords();
    const record = records.find(r => r.id === id);
    if (!record) return null;
    record.checkOut = new Date().toISOString();
    saveRecords(records);
    return record;
  },

  delete(id: string) {
    saveRecords(getRecords().filter(r => r.id !== id));
  },

  getActiveVisitors(): AttendanceRecord[] {
    return getRecords().filter(r => !r.checkOut);
  },

  getTodayCount(): number {
    const today = new Date().toDateString();
    return getRecords().filter(r => new Date(r.checkIn).toDateString() === today).length;
  },
};
