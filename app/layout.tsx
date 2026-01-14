export const dynamic = "force-dynamic";
export const revalidate = 0;


import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Variable for Tailwind
});

export const metadata: Metadata = {
  title: "Portfolio | Senior Full-Stack Engineer",
  description: "Personal portfolio showcasing projects, certifications, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "bg-[url('/clouds-pattern.svg')] bg-fixed bg-cover bg-no-repeat", // Placeholder for cloud background
          inter.variable
        )}
      >
        <div className="fixed inset-0 bg-gradient-to-b from-sky-200/40 to-white/60 -z-10 pointer-events-none" />
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
