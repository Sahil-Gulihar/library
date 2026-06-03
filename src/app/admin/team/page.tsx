"use client";

import dynamic from "next/dynamic";

const TeamMembers = dynamic(() => import("@/old_pages/admin/TeamMembers"), { ssr: false });

export default function Page() {
  return <TeamMembers />;
}
