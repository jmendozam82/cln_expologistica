"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const targetDate = new Date('2026-11-20T08:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex flex-col">
      {/* Top Navbar - Light Theme */}
      <nav className="bg-white text-cln-950 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center py-2">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-horizontal.jpg"
                  alt="Comunidad Logística Nicaragüense"
                  width={1024}
                  height={481}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`relative font-bold transition-colors group py-2 ${pathname === '/' ? 'text-cln-900' : 'text-gray-700 hover:text-cln-900'}`}>
                Inicio
                <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link href="/agenda" className={`relative font-bold transition-colors group py-2 ${pathname === '/agenda' ? 'text-cln-900' : 'text-gray-700 hover:text-cln-900'}`}>
                Agenda
                <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${pathname === '/agenda' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link href="/ponentes" className={`relative font-bold transition-colors group py-2 ${pathname === '/ponentes' ? 'text-cln-900' : 'text-gray-700 hover:text-cln-900'}`}>
                Ponentes
                <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${pathname === '/ponentes' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link href="/patrocinadores" className={`relative font-bold transition-colors group py-2 ${pathname === '/patrocinadores' ? 'text-cln-900' : 'text-gray-700 hover:text-cln-900'}`}>
                Patrocinadores
                <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${pathname === '/patrocinadores' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              
              <Link href="/registro" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                Registrarse
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-cln-950 hover:text-cln-700 focus:outline-none p-2"
                aria-label="Abrir menú"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 shadow-inner absolute w-full left-0">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-cln-900 hover:bg-gray-100 rounded-md">Inicio</Link>
              <Link href="/agenda" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-cln-900 hover:bg-gray-100 rounded-md">Agenda</Link>
              <Link href="/ponentes" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-cln-900 hover:bg-gray-100 rounded-md">Ponentes</Link>
              <Link href="/patrocinadores" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-cln-900 hover:bg-gray-100 rounded-md">Patrocinadores</Link>
              <Link href="/registro" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-center text-white bg-orange-500 hover:bg-orange-600 rounded-md mt-4 shadow-md">Registrarse</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Info Bar - Dark Blue Theme */}
      <div className="bg-cln-900 text-white text-base font-medium py-5 px-4 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-center">
          <span className="text-cln-200">
            Faltan <strong className="text-white tracking-wide">{timeLeft.days} d {timeLeft.hours} h {timeLeft.minutes} min</strong>
          </span>
          <span className="hidden sm:inline text-orange-500">•</span>
          <span className="font-bold">EXPO LOGÍSTICA 2026</span>
          <span className="hidden lg:inline text-orange-500">•</span>
          <span className="hidden lg:inline text-gray-300">20 de nov · DoubleTree by Hilton Managua</span>
        </div>
      </div>
    </div>
  );
}
