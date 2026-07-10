import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevNotes — App Router Playground",
  description:
    "A hands-on Next.js App Router learning playground with 15 live feature demos.",
};

function NavFallback() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14">
        <span className="text-lg font-bold text-white tracking-tight">
          DevNotes<span className="text-indigo-400">.</span>
        </span>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">
        <Suspense fallback={<NavFallback />}>
          <Nav />
        </Suspense>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
