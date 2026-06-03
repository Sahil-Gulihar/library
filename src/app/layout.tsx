import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library prototype",
  description: "Lovable Generated Project",
  authors: [{ name: "Lovable" }],
  openGraph: {
    title: "Library prototype",
    description: "Lovable Generated Project",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/0ic5M9oBNMbKWtAtxFrjiKo7pMs1/social-images/social-1775586261580-Children_Satsang_Class_Science_of_Spirituality.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    title: "Library prototype",
    description: "Lovable Generated Project",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/0ic5M9oBNMbKWtAtxFrjiKo7pMs1/social-images/social-1775586261580-Children_Satsang_Class_Science_of_Spirituality.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
