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
      {/* ════════════════════════════════ 1. HERO PRINCIPAL ════════════════════════════════ */}
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
            EXPO LOGÍSTICA
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">   - CLN · 2026 - </span>
          </h1>
          <p className="text-xl md:text-2xl text-cln-200 mb-4 max-w-3xl font-light">
            {EVENT_SLOGAN}.
          </p>
          <p className="text-lg md:text-xl text-white mb-10 max-w-3xl font-semibold">
            {EVENT_TAGLINE}.
          </p>
          <p className="text-sm md:text-base text-cln-300 mb-2 font-medium">
            Una jornada que reúne conocimiento, líderes, profesionales, empresas y soluciones
          </p>
          <p className="text-sm md:text-base text-cln-300 mb-10 font-medium">
            para conectar toda la cadena logística Supply Chain End to End.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link href="/registro" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
              Asegurar mi lugar
            </Link>
            <Link href="/agenda" className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm">
              Descubrir la experiencia &darr;
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ 2. BLOQUE DE INFORMACIÓN RÁPIDA ════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {/* APRENDER */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-bold uppercase tracking-widest text-orange-500 mb-1">APRENDER</p>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Una jornada + Conocimiento</h3>
              <p className="text-gray-600">Viernes 20 de noviembre. De 8:00 a.m. a 6:00 p.m., una jornada completa de conocimiento, tendencias, experiencias y nuevas perspectivas para nuestra Supply Chain.</p>
            </div>

            {/* CONECTAR */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-base font-bold uppercase tracking-widest text-orange-500 mb-1">CONECTAR</p>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">El lugar donde la logística se encuentra</h3>
              <p className="text-gray-600">Un ambiente ejecutivo diseñado para conferencias, exhibición de soluciones, conversaciones y networking de alto valor.</p>
            </div>

            {/* COMPARTIR */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-base font-bold uppercase tracking-widest text-orange-500 mb-1">COMPARTIR</p>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Una experiencia construida desde la comunidad</h3>
              <p className="text-gray-600">Prioridad para miembros CLN. Abierto también a profesionales, ejecutivos, estudiantes y personas interesadas en Supply Chain y Logística.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOTTO BAND */}
      <section className="bg-cln-900 py-14 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-3xl text-cln-200 mt-4 font-light">
            Una jornada. Una comunidad. Todo un ecosistema logístico conectado.
          </p>
          <p className="text-lg text-cln-400 mt-3 font-bold tracking-widest">{EVENT_HASHTAG}</p>
        </div>
      </section>

      {/* ════════════════════════════════ 3. ¿QUÉ VIVIREMOS? ════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                {EVENT_MOTTO}
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
                Mucho más que asistir a un evento. Ven a vivirlo.
              </h2>
            </div>
            <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
              Un día para descubrir nuevas ideas, compartir experiencias, conocer soluciones y crear conexiones con profesionales, líderes y empresas que forman parte del ecosistema logístico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENT_HIGHLIGHTS.map((h, i) => (
              <article
                key={h.title}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-cln-300 flex flex-col transition-all"
              >
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

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-cln-950 mb-1 whitespace-pre-line">{h.title}</h3>
                  <p className="text-sm font-semibold text-cln-600 mb-3">{h.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{h.description}</p>
                  <Link
                    href={h.href}
                    className="mt-auto ml-auto inline-flex items-center gap-1.5 text-cln-600 font-bold hover:text-cln-800 transition-colors"
                  >
                    {h.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ 4. NUEVO BLOQUE | LAS CIFRAS DEL ENCUENTRO ════════════════════════════════ */}
      <section className="py-20 bg-cln-950 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://nilogistic.com/wp-content/uploads/2026/09/card4-scaled.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
            TODO UN ECOSISTEMA CONECTADO
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight mb-16">
            Un día para mover ideas, conexiones y oportunidades.
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 lg:gap-8 mb-16">
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">1</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1">DÍA</span>
              <span className="text-cln-300 text-xs lg:text-sm">de experiencia logística</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">2</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1">MAGISTRALES</span>
              <span className="text-cln-300 text-xs lg:text-sm">con speakers internacionales</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">5</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1">CONFERENCIAS</span>
              <span className="text-cln-300 text-xs lg:text-sm">de alto nivel</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">10</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1">SPONSORS</span>
              <span className="text-cln-300 text-xs lg:text-sm">presentando soluciones</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">&infin;</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1 text-center leading-tight">SUPPLY CHAIN</span>
              <span className="text-cln-300 text-xs lg:text-sm text-center">toda la cadena conectada</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cln-300 to-cln-500 mb-2">+</span>
              <span className="text-white font-bold text-sm lg:text-base mb-1 text-center leading-tight">NETWORKING</span>
              <span className="text-cln-300 text-xs lg:text-sm text-center">conexiones que trascienden</span>
            </div>
          </div>

          <Link href="/registro" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
            Quiero ser parte &rarr;
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════ 5. SPEAKERS ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              APRENDER
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-6">
              Conocimiento que cruza fronteras.
            </h2>
            <p className="text-xl text-gray-600">
              Voces nacionales e internacionales compartirán conocimiento, experiencias y nuevas perspectivas sobre los desafíos y oportunidades que están transformando la logística y Supply Chain.
            </p>
          </div>

          {/* <div className="text-center">
            <Link href="/ponentes" className="inline-block bg-cln-600 hover:bg-cln-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:-translate-y-0.5">
              Conoce a nuestros speakers &rarr;
            </Link>
          </div> */}
        </div>
      </section>

      {/* ════════════════════════════════ 6. AGENDA ════════════════════════════════ */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
            APRENDER
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-6">
            Un día. Muchas ideas. Nuevas posibilidades.
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Una agenda diseñada para llevarte del conocimiento a la conversación, y de la conversación a nuevas oportunidades.
          </p>

          <Link href="/agenda" className="inline-block bg-white text-cln-600 border-2 border-cln-600 hover:bg-cln-50 px-8 py-4 rounded-full font-bold text-lg transition-all">
            Explorar la agenda completa &rarr;
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════ 7. SPONSORS & SOLUTIONS ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              CONECTAR
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-6">
              Conoce las soluciones que están moviendo la logística.
            </h2>
            <p className="text-xl text-gray-600">
              Empresas nacionales e internacionales reunidas para presentar tecnología, servicios y soluciones que responden a los desafíos actuales de Supply Chain.
            </p>
          </div>

          <div className="text-center mb-20">
            <Link href="/patrocinadores" className="inline-block bg-cln-600 hover:bg-cln-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:-translate-y-0.5">
              Conocer sponsors &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ 8. CLN CONNECT | NETWORKING ════════════════════════════════ */}
      <section className="py-20 bg-cln-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cln-800 skew-x-12 translate-x-32 z-0 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-3">
                CONECTAR
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                No vengas solamente a escuchar. Ven a conectar.
              </h2>
              <p className="text-xl text-cln-200 mb-8 leading-relaxed">
                EXPO LOGÍSTICA · CLN · 2026 reúne profesionales de diferentes eslabones de la cadena para generar conversaciones, relaciones, colaboración y oportunidades que pueden continuar mucho después del evento.
              </p>

              <div className="bg-cln-950/50 p-6 rounded-xl border border-cln-700 mb-8">
                <h4 className="text-orange-400 font-bold mb-4">CLN CONNECT</h4>
                <p className="font-light text-cln-200 leading-relaxed">
                  Networking & Business Lounge
                </p>
              </div>

              <Link href="/registro" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-md transition-all hover:-translate-y-0.5">
                Quiero estar en la conversación &rarr;
              </Link>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="flex flex-wrap gap-3 justify-center">
                {['Supply Chain', 'Operaciones', 'Compras', 'Almacenes', 'Transporte', 'Distribución', 'Comercio Exterior', 'Tecnología', 'Proyectos', 'Proveedores'].map((tag) => (
                  <span key={tag} className="px-4 py-3 bg-cln-800/80 backdrop-blur-sm border border-cln-700 shadow-xl rounded-lg font-bold text-cln-100 hover:bg-cln-700 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ 9. ¿PARA QUIÉN ES EXPO LOGÍSTICA? ════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              CONECTAR
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-cln-950 leading-tight">
              Si eres parte de la cadena logística, este encuentro también es tuyo.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cln-950 mb-2">LÍDERES & EJECUTIVOS</h3>
                <p className="text-gray-600">Supply Chain, Operaciones, Logística, Distribución y Dirección.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cln-950 mb-2">PROFESIONALES</h3>
                <p className="text-gray-600">Compras, planificación, almacenes, transporte, comercio exterior, tecnología y proyectos.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cln-950 mb-2">EMPRESAS & PROVEEDORES</h3>
                <p className="text-gray-600">Tecnología, servicios, infraestructura y soluciones para Supply Chain.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mt-1 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6M12 14l-9-5-9 5 9 5-9-5z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cln-950 mb-2">FUTUROS PROFESIONALES</h3>
                <p className="text-gray-600">Estudiantes y jóvenes interesados en desarrollar su carrera dentro de la industria.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-cln-900 mb-8">Distintos roles. Una misma cadena. Una misma comunidad.</p>
            <Link href="/registro" className="inline-block bg-cln-600 hover:bg-cln-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:-translate-y-0.5">
              Ser parte de EXPO LOGÍSTICA · CLN · 2026 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ 10. GALERÍA (COMUNIDAD) ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <NetworkingGallery />
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                COMPARTIR
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-cln-950 mb-6 leading-tight">
                Una comunidad que ya está conectando la logística.
              </h2>
              <p className="text-xl font-medium text-gray-600 mb-6 leading-relaxed">
                Estos son algunos de los encuentros, conversaciones y experiencias que han construido la Comunidad Logística Nicaragüense.
              </p>
              <p className="text-2xl font-bold text-cln-900 mb-8">
                Así se vive CLN.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://nilogistic.com" target="_blank" rel="noopener noreferrer" className="bg-cln-600 hover:bg-cln-500 text-white px-8 py-4 rounded-full font-bold shadow-md transition-all hover:-translate-y-0.5">
                  Conocer nuestra comunidad &rarr;
                </a>
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
              Asegurar mi lugar
            </Link>
            <Link href="/agenda" className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
              Descubrir la experiencia
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}