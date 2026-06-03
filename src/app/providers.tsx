"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AdminStoreProvider } from "@/lib/store";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminStoreProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </AdminStoreProvider>
    </QueryClientProvider>
  );
}
