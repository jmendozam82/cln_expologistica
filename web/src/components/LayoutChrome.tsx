"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CHROMELESS_PREFIXES = ["/live", "/jugar"];

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = CHROMELESS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (hideChrome) {
    return <main className="flex-grow flex flex-col min-h-[100dvh]">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

