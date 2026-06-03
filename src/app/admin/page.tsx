"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/old_pages/admin/Dashboard"), { ssr: false });

export default function Page() {
  return <Dashboard />;
}
