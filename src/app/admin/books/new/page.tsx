"use client";

import dynamic from "next/dynamic";

const AddBook = dynamic(() => import("@/old_pages/admin/AddBook"), { ssr: false });

export default function Page() {
  return <AddBook />;
}
