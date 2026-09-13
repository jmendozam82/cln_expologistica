import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda | EXPO LOGÍSTICA 2026 · CLN",
  description:
    "Programa oficial de EXPO LOGÍSTICA 2026 · CLN — Comunidad Logística Nicaragüense. Viernes 20 de noviembre, DoubleTree by Hilton Managua.",
};

type SessionType = "registro" | "institucional" | "conferencia" | "magistral" | "panel" | "networking" | "sponsors" | "cierre";
type AccessType = "libre" | "congreso" | "vip";

interface Session {
  time: string;
  type: SessionType;
  access: AccessType;
  title: string;
  description?: string;
  speaker?: string;
  highlight?: boolean;
}

const SCHEDULE: Session[] = [
  {
    time: "7:00 a.m. – 8:00 a.m.",
    type: "registro",
    access: "libre",
    title: "Montaje final · Staff · Patrocinadores",
    description: "Preparación de salones, instalación de stands y acreditación del equipo organizador y sponsors.",
  },
  {
    time: "8:00 a.m. – 8:30 a.m.",
    type: "registro",
    access: "libre",
    title: "Registro de asistentes",
    description: "Recepción, acreditación y orientación para congresistas e invitados especiales.",
  },
  {
    time: "8:30 a.m. – 9:00 a.m.",
    type: "institucional",
    access: "congreso",
    title: "Ceremonia de Apertura — EXPO LOGÍSTICA 2026 · CLN",
    description: "Bienvenida oficial a cargo de la organización CLN. Inicio formal del programa de contenidos.",
    speaker: "Mayerling Cervantes · Líder Organizadora, CLN",
  },
  {
    time: "9:00 a.m. – 9:40 a.m.",
    type: "conferencia",
    access: "congreso",
    title: "Conferencia 1 — Supply Chain Regional",
    description: "Desafíos y oportunidades en la cadena de suministro centroamericana para 2026 y más allá.",
    speaker: "Jorge Mauricio Pocasangre · Director Regional, Supply Chain Latam",
  },
  {
    time: "9:50 a.m. – 10:30 a.m.",
    type: "conferencia",
    access: "congreso",
    title: "Conferencia 2",
    description: "Segunda sesión de contenido técnico y estratégico del programa CLN 2026.",
  },
  {
    time: "10:30 a.m. – 11:00 a.m.",
    type: "networking",
    access: "libre",
    title: "Coffee Break AM · Visita a Stands de Patrocinadores",
    description: "Espacio de networking y recorrido por el piso de exhibición con los sponsors del evento.",
  },
  {
    time: "11:00 a.m. – 12:00 m.",
    type: "magistral",
    access: "congreso",
    title: "Conferencia Magistral 1 — Resiliencia de la Cadena de Suministro",
    description: "De la protección física a la resiliencia global: seguridad integral, gestión del riesgo y cumplimiento normativo en la cadena logística latinoamericana.",
    speaker: "Carlos Boshell · Logistics Group, Colombia",
    highlight: true,
  },
  {
    time: "12:15 p.m. – 1:30 p.m.",
    type: "networking",
    access: "congreso",
    title: "Almuerzo Ejecutivo de Networking",
    description: "Almuerzo incluido en el acceso Congreso. Espacio para conectar con líderes del ecosistema logístico nicaragüense.",
  },
  {
    time: "1:30 p.m. – 2:10 p.m.",
    type: "conferencia",
    access: "congreso",
    title: "Conferencia 3 — Innovación y Tecnología en Logística",
    description: "Aplicación de herramientas digitales, automatización e inteligencia artificial al sector logístico y de supply chain.",
    speaker: "Karla Klaus · TechLog",
  },
  {
    time: "2:10 p.m. – 2:40 p.m.",
    type: "networking",
    access: "libre",
    title: "Coffee Break PM · Visita a Stands de Patrocinadores",
    description: "Segundo espacio de networking y actividades de los patrocinadores en el piso de exhibición.",
  },
  {
    time: "2:40 p.m. – 3:40 p.m.",
    type: "magistral",
    access: "congreso",
    title: "Conferencia Magistral 2 — Comercio e Inversión Regional",
    description: "Perspectivas estratégicas de comercio exterior e inversión para el ecosistema logístico de Nicaragua y la región centroamericana.",
    speaker: "Eduardo García Grande · Consultor Senior, Global Trade",
    highlight: true,
  },
  {
    time: "3:40 p.m. – 4:00 p.m.",
    type: "sponsors",
    access: "libre",
    title: "Actividad Patrocinadores · Reconocimiento CLN",
    description: "Espacio de visibilidad para los patrocinadores del evento. Reconocimientos especiales de la Comunidad Logística Nicaragüense.",
  },
  {
    time: "4:00 p.m. – 5:30 p.m.",
    type: "networking",
    access: "libre",
    title: "Networking de Cierre — Conexión Empresarial B2B",
    description: "El principal espacio de relacionamiento del año. Conecta con líderes del sector logístico, proveedores de soluciones y tomadores de decisión.",
    highlight: true,
  },
  {
    time: "5:30 p.m. – 6:00 p.m.",
    type: "cierre",
    access: "libre",
    title: "Cierre Operativo · Desmontaje",
    description: "Conclusión de actividades y cierre del evento CLN 2026.",
  },
];

const TYPE_META: Record<SessionType, { label: string; dot: string; tag: string; card: string }> = {
  registro: { label: "Registro", dot: "bg-slate-400", tag: "bg-slate-100 text-slate-600", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-100 border-l-4 border-l-slate-400 shadow-sm" },
  institucional: { label: "Institucional", dot: "bg-amber-500", tag: "bg-amber-100 text-amber-800", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-100 border-l-4 border-l-amber-500 shadow-sm" },
  conferencia: { label: "Conferencia", dot: "bg-cln-600", tag: "bg-cln-100 text-cln-700", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-100 border-l-4 border-l-cln-600 shadow-sm" },
  magistral: {
    label: "Magistral",
    dot: "bg-orange-500",
    tag: "bg-orange-100 text-orange-700",
    card: "my-3 mr-2 md:mr-3 rounded-xl bg-orange-50/50 border border-orange-200 border-l-4 border-l-orange-500 shadow-md",
  },
  panel: { label: "Panel Fórum", dot: "bg-emerald-600", tag: "bg-emerald-100 text-emerald-700", card: "my-3 mr-2 md:mr-3 rounded-xl bg-cln-50/40 border border-cln-100 border-l-4 border-l-emerald-600 shadow-sm" },
  networking: { label: "Networking", dot: "bg-cln-900", tag: "bg-gray-100 text-gray-600", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-200 border-l-4 border-l-cln-900 shadow-sm" },
  sponsors: { label: "Patrocinadores", dot: "bg-amber-500", tag: "bg-amber-100 text-amber-800", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-100 border-l-4 border-l-amber-500 shadow-sm" },
  cierre: { label: "Cierre", dot: "bg-slate-400", tag: "bg-slate-100 text-slate-600", card: "my-3 mr-2 md:mr-3 rounded-xl bg-white border border-gray-100 border-l-4 border-l-slate-400 shadow-sm" },
};

const ACCESS_META: Record<AccessType, { label: string; tag: string }> = {
  libre: { label: "Acceso libre", tag: "bg-emerald-100 text-emerald-700" },
  congreso: { label: "Acceso Congreso", tag: "bg-cln-100 text-cln-700" },
  vip: { label: "Acceso VIP", tag: "bg-amber-100 text-amber-700" },
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
            AGENDA OFICIAL · EXPO LOGÍSTICA 2026 · CLN
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Programa oficial{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              Viernes 20 de noviembre.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Consulta los horarios de conferencias, actividades de patrocinadores, networking y momentos
            clave de la jornada logística más importante de Nicaragua.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link
              href="/registro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Reservar acceso {svgArrow}
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
              Jornada principal de EXPO LOGÍSTICA 2026 · CLN
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Conferencias, espacios de networking, actividades de patrocinadores y el encuentro B2B más
              importante de la logística nicaragüense.
            </p>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 rounded-full px-3 py-1.5 whitespace-nowrap">
            {SCHEDULE.length} sesiones
          </span>
        </div>

        {/* Timeline */}
        <ol className="relative" aria-label="Programa hora por hora">
          <div className="absolute top-0 bottom-0 left-[88px] md:left-[112px] w-px bg-gray-200" aria-hidden />
          {SCHEDULE.map((s, i) => {
            const tm = TYPE_META[s.type];
            const am = ACCESS_META[s.access];
            return (
              <li key={i} className="relative flex">
                <div className="w-20 md:w-24 flex-shrink-0 pt-6 pr-3 text-right text-xs md:text-sm font-semibold text-gray-500 leading-snug">
                  {s.time}
                </div>
                <div className={`w-2.5 h-2.5 rounded-full mt-7 relative z-10 flex-shrink-0 ${tm.dot}`} aria-hidden />
                <div className={`flex-1 min-w-0 ${tm.card} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-default`}>
                  <div className="pl-4 md:pl-6 pt-5 pb-5">
                    <div className="flex flex-wrap items-center justify-end gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${tm.tag}`}>
                        {tm.label}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${am.tag}`}>
                        {am.label}
                      </span>
                    </div>
                    <h3 className={`font-heading font-bold text-base md:text-lg leading-snug mb-1 ${s.highlight ? "text-orange-900" : "text-cln-950"}`}>
                      {s.title}
                    </h3>
                    {s.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                    )}
                    {s.speaker && (
                      <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs md:text-sm font-semibold text-cln-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-hidden />
                        {s.speaker}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-xs text-gray-400 text-center">
          * Este programa es preliminar y puede experimentar ajustes menores en horarios y contenidos.
        </p>
      </section>

      {/* ════════════════════════════════ CTA FINAL ════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Elige el acceso correcto para tu agenda.
          </h2>
          <p className="text-lg text-cln-200 font-light mb-8 leading-relaxed">
            El acceso Congreso incluye todas las conferencias, almuerzo ejecutivo y dos coffee breaks.
            El acceso libre permite participar en networking, piso de exhibición y actividades de
            patrocinadores.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            Reservar acceso {svgArrow}
          </Link>
        </div>
      </section>
    </div>
  );
}