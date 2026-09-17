"use client";

import { useState } from "react";

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
    time: "7:30 a.m. – 8:30 a.m.",
    type: "registro",
    access: "libre",
    title: "Registro de asistentes",
    description: "Recepción, acreditación y orientación para congresistas e invitados especiales.",
  },
  {
    time: "8:30 a.m. – 9:00 a.m.",
    type: "institucional",
    access: "congreso",
    title: "Ceremonia de Apertura — EXPO LOGÍSTICA · CLN · 2026",
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
    title: "Networking de Cierre",
    description: "El principal espacio de relacionamiento del año. Conecta con líderes del sector logístico, proveedores de soluciones y tomadores de decisión.",
    highlight: true,
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

type FilterKey = "TODO" | "CONFERENCIAS" | "MAGISTRALES" | "NETWORKING" | "SPONSORS" | "INSTITUCIONAL";

const FILTERS: { key: FilterKey; types: SessionType[] }[] = [
  { key: "TODO", types: [] },
  { key: "CONFERENCIAS", types: ["conferencia"] },
  { key: "MAGISTRALES", types: ["magistral"] },
  { key: "NETWORKING", types: ["networking"] },
  { key: "SPONSORS", types: ["sponsors"] },
  { key: "INSTITUCIONAL", types: ["institucional", "registro", "cierre"] },
];

export default function AgendaTimeline() {
  const [active, setActive] = useState<FilterKey>("TODO");

  const filtered = active === "TODO"
    ? SCHEDULE
    : SCHEDULE.filter((s) => FILTERS.find((f) => f.key === active)?.types.includes(s.type));

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {FILTERS.map((f) => {
          const count = f.key === "TODO"
            ? SCHEDULE.length
            : SCHEDULE.filter((s) => f.types.includes(s.type)).length;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                active === f.key
                  ? "bg-cln-900 text-white shadow-lg shadow-cln-900/20"
                  : "bg-white text-cln-700 border border-gray-200 hover:border-cln-400 hover:bg-cln-50"
              }`}
            >
              {f.key}
              <span className={`ml-1.5 text-xs ${active === f.key ? "text-cln-300" : "text-gray-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <ol className="relative" aria-label="Programa hora por hora">
        <div className="absolute top-0 bottom-0 left-[104px] md:left-[128px] w-px bg-gray-200" aria-hidden />
        {filtered.map((s, i) => {
          const tm = TYPE_META[s.type];
          const am = ACCESS_META[s.access];
          return (
            <li key={`${s.time}-${s.title}`} className="relative flex">
              <div className="w-24 md:w-28 flex-shrink-0 pt-6 pr-3 text-right text-sm md:text-base font-semibold text-gray-500 leading-snug">
                {s.time}
              </div>
              <div className={`w-2.5 h-2.5 rounded-full mt-7 relative z-10 flex-shrink-0 ${tm.dot}`} aria-hidden />
              <div className={`flex-1 min-w-0 ${tm.card} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-default`}>
                <div className="pl-4 md:pl-6 pt-5 pb-5">
                  <div className="flex flex-wrap items-center justify-end gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${tm.tag}`}>
                      {tm.label}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${am.tag}`}>
                      {am.label}
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-lg md:text-xl leading-snug mb-1 ${s.highlight ? "text-orange-900" : "text-cln-950"}`}>
                    {s.title}
                  </h3>
                  {s.description && (
                    <p className="text-base text-gray-600 leading-relaxed">{s.description}</p>
                  )}
                  {s.speaker && (
                    <span className="inline-flex items-center gap-1.5 mt-1.5 text-sm md:text-base font-semibold text-cln-700">
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

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12 text-lg">No hay sesiones en esta categoría.</p>
      )}

      <p className="mt-8 text-xs text-gray-400 text-center">
        * Este programa es preliminar y puede experimentar ajustes menores en horarios y contenidos.
      </p>
    </>
  );
}
