"use client";

import dynamic from "next/dynamic";

const AddMember = dynamic(() => import("@/old_pages/admin/AddMember"), { ssr: false });

export default function Page() {
  return <AddMember />;
}
