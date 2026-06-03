"use client";

import dynamic from "next/dynamic";

const IssueBook = dynamic(() => import("@/old_pages/admin/IssueBook"), { ssr: false });

export default function Page() {
  return <IssueBook />;
}
