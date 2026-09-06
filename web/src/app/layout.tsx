import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLN Evento de Cierre 2026",
  description: "Evento de Cierre 2026 | Comunidad Logística Nicaragüense",
};

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

