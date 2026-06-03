"use client";

import dynamic from "next/dynamic";

const ModifyBook = dynamic(() => import("@/old_pages/admin/ModifyBook"), { ssr: false });

export default function Page() {
  return <ModifyBook />;
}
