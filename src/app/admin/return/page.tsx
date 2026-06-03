"use client";

import dynamic from "next/dynamic";

const ReturnBook = dynamic(() => import("@/old_pages/admin/ReturnBook"), { ssr: false });

export default function Page() {
  return <ReturnBook />;
}
