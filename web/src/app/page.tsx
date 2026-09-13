import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HeroVideo from "@/components/HeroVideo";
import NetworkingGallery from "@/components/NetworkingGallery";
import {
  EVENT_SLOGAN,
  EVENT_TAGLINE,
  EVENT_DATE_LONG,
  EVENT_TIME,
  EVENT_LOCATION,
  EVENT_MOTTO,
  EVENT_HASHTAG,
  EVENT_HIGHLIGHTS,
} from "@/lib/event";

const icons: Record<string, ReactNode> = {
  magistral: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h6m-3 3l-6 9m-2-5a2 2 0 11-4 0 2 2 0 014 0zM17 11a2 2 0 11-4 0 2 2 0 014 0zM7 16h4" />
    </svg>
  ),
  chain: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  sponsors: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  networking: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  premios: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 3h6M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2zm2-2a4 4 0 108 0 4 4 0 00-8 0z" />
    </svg>
  ),
  coctel: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-9 9M9 14v5m6-5v5m-9 5h12" />
    </svg>
  ),
};

const highlightIcons = ["magistral", "chain", "sponsors", "networking", "premios", "coctel"];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroVideo />
          <div className="absolute inset-0 bg-cln-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cln-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-left max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <span className="inline-block py-1 px-3 rounded-full bg-cln-500/20 text-cln-300 border border-cln-500/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            COMUNIDAD LOGÍSTICA NICARAGÜENSE · {EVENT_HASHTAG}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-tight">
            EXPO LOGÍSTICA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-cln-200 mb-4 max-w-3xl font-light">
            {EVENT_SLOGAN}.
          </p>
          <p className="text-lg md:text-xl text-white mb-10 max-w-3xl font-semibold">
            {EVENT_TAGLINE}.
          </p>
          <p className="text-sm md:text-base text-cln-300 mb-2 font-medium">
            {EVENT_DATE_LONG} · {EVENT_TIME} · {EVENT_LOCATION}
          </p>
          <p className="inline-block text-cln-200 text-xs md:text-sm font-bold tracking-widest mb-10">
            {EVENT_MOTTO}
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link href="/registro" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
              Reservar mi acceso
            </Link>
            <Link href="/agenda" className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm">
              Ver Programa
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ INFO CARDS ════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Viernes 20 de Noviembre</h3>
              <p className="text-gray-600">Una jornada completa de 8:00 a.m. a 6:00 p.m. para aprender, conectar y compartir.</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">{EVENT_LOCATION}</h3>
              <p className="text-gray-600">Un ambiente ejecutivo de alto nivel para conferencias, exhibición y networking.</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Prioridad para Miembros CLN</h3>
              <p className="text-gray-600">Abierto a estudiantes, profesionales e interesados en Supply Chain y Logística.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ MOTTO BAND ════════════════════════════════ */}
      <section className="bg-cln-900 py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-2xl md:text-4xl font-heading font-extrabold text-white tracking-wide">{EVENT_MOTTO}</p>
          <p className="text-lg text-cln-300 mt-4 font-light">
            Una jornada. Una comunidad. Todo un equipo logístico conectado.
          </p>
          <p className="text-sm text-cln-400 mt-3 font-bold tracking-widest">{EVENT_HASHTAG}</p>
        </div>
      </section>

      {/* ════════════════════════════════ QUÉ VIVIREMOS ════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                ¿Qué viviremos?
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
                Una jornada para APRENDER, CONECTAR y COMPARTIR.
              </h2>
            </div>
            <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
              Conferencias, soluciones, networking, premios y un cóctel de cierre para profesionales,
              líderes y empresas que forman parte de la Cadena Logística de Alto Nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENT_HIGHLIGHTS.map((h, i) => (
              <article
                key={h.title}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-cln-300 flex flex-col transition-all"
              >
                {/* Imagen / cover */}
                <div className="relative aspect-video w-full overflow-hidden flex-shrink-0">
                  {h.photo ? (
                    <Image
                      src={h.photo}
                      alt={h.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cln-900 via-cln-700 to-cln-500">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-cln-100 scale-[1.6]">
                        {icons[highlightIcons[i]]}
                      </div>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500 text-white shadow-md">
                    {h.tag}
                  </span>
                </div>

                {/* Cuerpo */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-cln-950 mb-1">{h.title}</h3>
                  <p className="text-sm font-semibold text-cln-600 mb-3">{h.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{h.description}</p>
                  <Link
                    href={h.href}
                    className="mt-auto ml-auto inline-flex items-center gap-1.5 text-cln-600 font-bold hover:text-cln-800 transition-colors"
                  >
                    {h.cta}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ NETWORKING PREVIEW ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <NetworkingGallery />
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                Networking de Alto Nivel
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-cln-950 mb-6 leading-tight">
                La Logística de alto nivel de Nicaragua y C.A se encuentra aquí.
              </h2>
              <p className="text-xl font-medium text-gray-600 mb-6 leading-relaxed">
                El evento integra en una misma jornada conocimiento, empresas, líderes, innovación y
                conexiones estratégicas para el ecosistema logístico nicaragüense.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Conferencias magistrales con ponentes internacionales.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Temas y tendencias para toda la Supply Chain End to End.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Sponsors presentando soluciones para la región.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Espacios de networking y cóctel de cierre celebrando los logros 2026.</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/ponentes" className="bg-cln-600 hover:bg-cln-500 text-white px-6 py-3 rounded-full font-bold shadow-md transition-all hover:-translate-y-0.5">
                  Ver ponentes
                </Link>
                <Link href="/patrocinadores" className="text-cln-600 font-bold hover:text-cln-800 flex items-center transition-colors">
                  Conoce a los patrocinadores
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CTA FINAL ════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block py-1 px-3 rounded-full bg-cln-500/20 text-cln-300 border border-cln-500/30 text-sm font-semibold tracking-wider mb-6">
            {EVENT_HASHTAG} · {EVENT_MOTTO}
          </p>
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Asegura tu lugar en la jornada logística del año.
          </h2>
          <p className="text-lg text-cln-200 font-light mb-8 leading-relaxed">
            Cupos limitados. Acceso prioritario y exclusivo para miembros CLN, abierto también a
            estudiantes, profesionales e interesados en Supply Chain y Logística.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/registro" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
              Reservar mi acceso ahora
            </Link>
            <Link href="/agenda" className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
              Revisar el programa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}