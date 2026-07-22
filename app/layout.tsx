export const dynamic = "force-dynamic";
export const revalidate = 0;


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { IntroWrapper } from "@/components/IntroWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = localFont({
  src: [
    { path: "../public/fonts/GeistVF.woff2", style: "normal" },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [
    { path: "../public/fonts/GeistMonoVF.woff2", style: "normal" },
  ],
  variable: "--font-geist-mono",
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
          inter.variable,
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider>
          <IntroWrapper>
            <main className="relative z-0">
              {children}
            </main>
          </IntroWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
