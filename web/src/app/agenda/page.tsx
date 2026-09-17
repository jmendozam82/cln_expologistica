import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AgendaTimeline from "@/components/AgendaTimeline";

export const metadata: Metadata = {
  title: "Agenda | EXPO LOGÍSTICA · CLN · 2026",
  description:
    "Programa oficial de EXPO LOGÍSTICA · CLN · 2026 — Comunidad Logística Nicaragüense. Viernes 20 de noviembre, DoubleTree by Hilton Managua.",
};

const svgArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const svgDownload = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-4 h-4" aria-hidden>
    <path d="M12 3v12M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export default function AgendaPage() {
  return (
    <div>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative bg-cln-950 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://nilogistic.com/wp-content/uploads/2026/09/Hero-agenda-scaled.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cln-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-cln-950 via-transparent to-transparent" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.045,
          }}
          aria-hidden
        />
        <div className="relative z-10 text-left max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <span className="inline-block py-1 px-3 rounded-full bg-cln-500/20 text-cln-300 border border-cln-500/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            APRENDER · CONECTAR · COMPARTIR
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Un día. Muchas ideas.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              Nuevas posibilidades.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Una agenda diseñada para llevarte del conocimiento a la conversación, y de la conversación a nuevas oportunidades.
          </p>
          <p className="text-base md:text-lg text-cln-300 font-light max-w-3xl mb-10">
            Conferencias magistrales + ponencias de alto nivel, networking, experiencias con sponsors y espacios para conectar con profesionales y líderes de toda la cadena logística.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link
              href="/registro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Asegurar mi lugar {svgArrow}
            </Link>
            <a
              href="/docs/agenda-cln-2026.pdf"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Descargar agenda {svgDownload}
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CONTENIDO ════════════════════════════════ */}
      <section id="programa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Encabezado del día */}
        <div className="flex flex-wrap items-start gap-6 pb-8 mb-10 border-b-2 border-gray-200">
          <div className="font-heading font-black text-5xl md:text-6xl text-cln-100 leading-none flex-shrink-0">
            01
          </div>
          <div className="flex-1 min-w-[240px]">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">
              Viernes 20 de noviembre 2026
            </p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-cln-950 leading-tight mb-2">
              Una jornada, diferentes formas de conectar
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-2">
              De las ideas estratégicas a las conversaciones que generan oportunidades.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              La jornada combina conferencias, sesiones magistrales, espacios de networking, experiencias con sponsors y momentos diseñados para conectar a los diferentes actores de la cadena logística.
            </p>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3 py-1.5 whitespace-nowrap">
            12 sesiones
          </span>
        </div>

        {/* Timeline con filtros */}
        <AgendaTimeline />
      </section>

      {/* ════════════════════════════════ ACCESOS ════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              ACCESO ÚNICO
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
              Vive toda la experiencia del congreso con un solo acceso
            </h2>
          </div>

          <div className="flex justify-center">
            {/* ACCESO CONGRESO */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-cln-600 p-8 md:p-10 flex flex-col w-full max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cln-600 text-white p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-cln-950">ACCESO CONGRESO</h3>
              </div>
              <p className="text-lg font-semibold text-cln-600 mb-6">Todo el contenido. Toda la experiencia.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Ponencias de alto nivel
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Conferencias magistrales
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Almuerzo ejecutivo
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Coffee Break AM
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Coffee Break PM
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Networking
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Piso de exhibición
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Actividades de sponsors
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cln-100 text-cln-600 flex items-center justify-center text-xs font-bold">✓</span>
                  Cóctel de Cierre 2026
                </li>
              </ul>
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-cln-600 hover:bg-cln-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:-translate-y-0.5"
              >
                Asegurar mi lugar {svgArrow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CIERRE ════════════════════════════════ */}
      <section className="bg-cln-950 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-5xl leading-tight mb-4">
            La agenda termina.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">Las conexiones continúan.</span>
          </h2>
          <p className="text-lg md:text-xl text-cln-200 font-light mb-10 leading-relaxed">
            Ven preparado para aprender, conectar y compartir con quienes están moviendo la logística de Nicaragua y la región.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            Asegurar mi lugar {svgArrow}
          </Link>
        </div>
      </section>
    </div>
  );
}