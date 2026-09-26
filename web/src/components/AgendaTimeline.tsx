"use client";

import { useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type SlotKind =
  | "plenary"        // Registro, Apertura (Mambacho)
  | "magistral"      // Magistral 1 y 2 (Mambacho)
  | "break"          // Coffee Breaks (Telica)
  | "almuerzo"       // Almuerzo (Momotombo)
  | "cierre"         // Cóctel de cierre (Momotombo)
  | "reconocimiento" // Actividad Patrocinadores (Momotombo)
  | "talk"           // Logistic Talk (Telica)
  | "panel"          // Panel de Expertos (Mambacho)
  | "conferencia"    // Conferencia regular
  | "empty";         // Celda vacía

interface Cell {
  kind: SlotKind;
  title?: string;
  sub?: string;
  speakers?: string[];
  empty?: boolean;
}

interface TimeSlot {
  time: string;
  mambacho: Cell;
  momotombo: Cell;
  telica: Cell;
}

// ─── Celda vacía reutilizable ─────────────────────────────────────────────────

const EMPTY: Cell = { kind: "empty", empty: true };

// ─── Datos de agenda — cada fila siempre tiene las 3 columnas ────────────────

const SLOTS: TimeSlot[] = [
  // 7:30 – 8:30 → Registro solo en Mambacho
  {
    time: "7:30 – 8:30 a.m.",
    mambacho: { kind: "plenary", title: "Registro de asistentes" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  // 8:30 – 9:00 → Apertura solo en Mambacho
  {
    time: "8:30 – 9:00 a.m.",
    mambacho: { kind: "plenary", title: "Ceremonia de Apertura", sub: "EXPO LOGÍSTICA · CLN · 2026" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  // 9:00 – 9:50 → Mambacho + Momotombo, Telica vacío
  {
    time: "9:00 – 9:50 a.m.",
    mambacho: {
      kind: "conferencia",
      title: "De la Última Milla a la Última Experiencia",
      sub: "Cómo construir una ejecución logística Best-in-Class",
      speakers: [""],
    },
    momotombo: {
      kind: "conferencia",
      title: "Supply Chain Blindada: Ciberseguridad y Continuidad Operativa en la Logística Digital",
      sub: "Qué ocurre cuando WMS, TMS, ERP, GPS o proveedores tecnológicos dejan de funcionar",
      speakers: [""],
    },
    telica: EMPTY,
  },
  // 9:50 – 10:30 → Los 3 salones activos
  {
    time: "9:50 – 10:30 a.m.",
    mambacho: {
      kind: "panel",
      title: "Panel de Expertos: El Nuevo Líder de Supply Chain",
      sub: "¿Qué Tendrá que Hacer Diferente para Competir hacia 2030?",
      speakers: ["", "", ""],
    },
    momotombo: {
      kind: "conferencia",
      title: "Supply Chain Control Tower: de Datos Fragmentados a Visibilidad End-to-End",
      sub: "Cómo convertir información logística en decisiones oportunas",
      speakers: [""],
    },
    telica: {
      kind: "talk",
      title: "Logistic Talk 1: Tu Carrera en Supply Chain",
      sub: "Las Competencias que Definirán al Profesional Logístico del Futuro",
      speakers: [""],
    },
  },
  // 10:30 – 11:00 → Coffee Break solo en Telica
  {
    time: "10:30 – 11:00 a.m.",
    mambacho: EMPTY,
    momotombo: EMPTY,
    telica: { kind: "break", title: "Coffee Break AM · Visita a Stands de Patrocinadores" },
  },
  // 11:00 – 12:00 → Magistral 1 solo en Mambacho
  {
    time: "11:00 a.m. – 12:00 m.",
    mambacho: {
      kind: "magistral",
      title: "Magistral 1: Del Almacén Tradicional al Almacén Smart",
      sub: "Tecnología, automatización y decisiones para evolucionar sin sobredimensionar la inversión",
      speakers: [""],
    },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  // 12:15 – 1:30 → Almuerzo solo en Momotombo
  {
    time: "12:15 – 1:30 p.m.",
    mambacho: EMPTY,
    momotombo: { kind: "almuerzo", title: "Almuerzo Ejecutivo" },
    telica: EMPTY,
  },
  // 1:30 – 2:10 → Los 3 salones activos
  {
    time: "1:30 – 2:10 p.m.",
    mambacho: {
      kind: "conferencia",
      title: "Centroamérica Conectada: el Nuevo Corredor Logístico Regional",
      sub: "Fronteras, trazabilidad, digitalización y oportunidades para mover mercancías con mayor velocidad y menor costo",
      speakers: [""],
    },
    momotombo: {
      kind: "conferencia",
      title: "Logística Verde que Sí Hace Negocio",
      sub: "Cómo reducir consumo, emisiones y costos en almacenes y flota",
      speakers: [""],
    },
    telica: {
      kind: "talk",
      title: "Logistic Talk 2: E-commerce y Última Milla",
      sub: "Cómo la Logística Está Cambiando la Forma de Hacer Negocios en Nicaragua y C.A.",
      speakers: [""],
    },
  },
  // 2:10 – 2:40 → Coffee Break PM solo en Telica
  {
    time: "2:10 – 2:40 p.m.",
    mambacho: EMPTY,
    momotombo: EMPTY,
    telica: { kind: "break", title: "Coffee Break PM · Visita a Stands de Patrocinadores" },
  },
  // 2:40 – 3:40 → Magistral 2 solo en Mambacho
  {
    time: "2:40 – 3:40 p.m.",
    mambacho: {
      kind: "magistral",
      title: "Magistral 2: IA en Logística: de la Tendencia a la Ventaja Competitiva",
      sub: "Cómo pasar del experimento a una implementación que genere resultados",
      speakers: [""],
    },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  // 3:40 – 4:00 → Reconocimiento solo en Momotombo
  {
    time: "3:40 – 4:00 p.m.",
    mambacho: EMPTY,
    momotombo: { kind: "reconocimiento", title: "Actividad Patrocinadores · Reconocimiento CLN" },
    telica: EMPTY,
  },
  // 4:00 – 5:30 → Cóctel solo en Momotombo
  {
    time: "4:00 – 5:30 p.m.",
    mambacho: EMPTY,
    momotombo: { kind: "cierre", title: "Cóctel Networking de Cierre" },
    telica: EMPTY,
  },
];

// ─── Tokens de diseño ─────────────────────────────────────────────────────────

const SALON_META = {
  mambacho: {
    label: "Salón Mambacho",
    track: "OPERATIONS & TECHNOLOGY",
    headerBg: "bg-cln-900",
    borderL: "border-l-cln-900",
    trackColor: "text-cln-900",
    trackStyle: { color: "var(--color-cln-200)" } as React.CSSProperties,
  },
  momotombo: {
    label: "Salón Momotombo",
    track: "BUSINESS & RESILIENCE",
    headerBg: "bg-cln-700",
    borderL: "border-l-cln-700",
    trackColor: "text-cln-700",
    trackStyle: { color: "var(--color-cln-100)" } as React.CSSProperties,
  },
  telica: {
    label: "Salón Telica",
    track: "CLN CONNECT",
    headerBg: "bg-orange-500",
    borderL: "border-l-orange-500",
    trackColor: "text-orange-500",
    trackStyle: { color: "#fff", opacity: 0.8 } as React.CSSProperties,
  },
} as const;

type SalonKey = keyof typeof SALON_META;

// Estilos de card por kind
const KIND_CARD: Record<SlotKind, string> = {
  conferencia: "bg-white border-gray-100",
  panel: "bg-cln-50 border-cln-200",
  talk: "bg-orange-50 border-orange-100",
  magistral: "bg-orange-50 border-orange-200",
  plenary: "bg-cln-50 border-cln-200",
  break: "bg-gray-50 border-gray-200",
  almuerzo: "bg-green-50 border-green-100",
  cierre: "bg-cln-900 border-cln-900",
  reconocimiento: "bg-orange-50 border-orange-200",
  empty: "",
};

const KIND_TITLE: Record<SlotKind, string> = {
  conferencia: "text-gray-900",
  panel: "text-cln-900",
  talk: "text-gray-900",
  magistral: "text-orange-900",
  plenary: "text-cln-900",
  break: "text-gray-600",
  almuerzo: "text-green-800",
  cierre: "text-orange-400",
  reconocimiento: "text-orange-900",
  empty: "",
};

const KIND_BADGE: Record<SlotKind, { label: string; cls: string } | null> = {
  conferencia: { label: "Conferencia", cls: "bg-cln-50 text-cln-700" },
  panel: { label: "Panel", cls: "bg-cln-100 text-cln-900" },
  talk: { label: "Logistic Talk", cls: "bg-orange-100 text-orange-800" },
  magistral: { label: "Magistral", cls: "bg-orange-100 text-orange-700 border border-orange-200" },
  plenary: null,
  break: { label: "Receso", cls: "bg-gray-100 text-gray-500" },
  almuerzo: { label: "Almuerzo", cls: "bg-green-100 text-green-700" },
  cierre: { label: "Networking", cls: "bg-orange-500/20 text-orange-400" },
  reconocimiento: { label: "Patrocinadores", cls: "bg-orange-100 text-orange-700" },
  empty: null,
};

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Badge({ kind }: { kind: SlotKind }) {
  const b = KIND_BADGE[kind];
  if (!b) return null;
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${b.cls}`}>
      {b.label}
    </span>
  );
}

function Cell({ cell, salonKey }: { cell: Cell; salonKey: SalonKey }) {
  const salon = SALON_META[salonKey];

  // Celda vacía — altura mínima para alinear con las vecinas
  if (cell.empty) {
    return (
      <div className="min-h-[72px]" />
    );
  }

  const isCierre = cell.kind === "cierre";

  return (
    <div
      className={[
        "min-h-[72px] rounded-lg border border-l-4 px-4 py-3",
        "flex flex-col gap-1",
        "transition-shadow duration-150 hover:shadow-md",
        salon.borderL,
        KIND_CARD[cell.kind],
      ].join(" ")}
    >
      <Badge kind={cell.kind} />

      <p className={`text-sm font-heading font-bold leading-snug ${KIND_TITLE[cell.kind]} ${cell.kind === "plenary" ? "mt-0" : "mt-0.5"}`}>
        {cell.title}
      </p>

      {cell.sub && (
        <p className={`text-[11px] leading-relaxed ${isCierre ? "text-slate-300" : "text-gray-500"}`}>
          {cell.sub}
        </p>
      )}

      {cell.speakers && cell.speakers.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-0.5">
          {cell.speakers.map((s, idx) => (
            <span
              key={idx}
              className={`flex items-center gap-1.5 text-[11px] font-semibold ${isCierre ? "text-slate-300" : "text-slate-500"}`}
            >
              <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isCierre ? "bg-orange-400" : "bg-orange-500"}`} aria-hidden />
              {s || "Speaker"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Filtros móvil ────────────────────────────────────────────────────────────

type FilterKey = "todo" | SalonKey;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todo", label: "Todos" },
  { key: "mambacho", label: "Mambacho" },
  { key: "momotombo", label: "Momotombo" },
  { key: "telica", label: "Telica" },
];

// Dot color para el timeline según el tipo más relevante del slot
function slotDotColor(slot: TimeSlot): string {
  const active = (["mambacho", "momotombo", "telica"] as SalonKey[])
    .map((k) => slot[k])
    .find((c) => !c.empty);
  if (!active) return "#D1D5DB";
  const map: Partial<Record<SlotKind, string>> = {
    magistral: "#f97316", // orange-500
    cierre: "#f97316",
    almuerzo: "#4ADE80",
    reconocimiento: "#f97316",
    plenary: "#00345b", // cln-900
    break: "#D1D5DB",
  };
  return map[active.kind] ?? "#D1D5DB";
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function AgendaMatrix() {
  const [filter, setFilter] = useState<FilterKey>("todo");

  return (
    <div className="w-full">

      {/* ── Cabecera de salones sticky ──────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 pb-2 md:pb-3 mb-2 pt-2 md:pt-0">

        {/* Filtros — solo visible en móvil */}
        <div className="flex md:hidden gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f.key
                ? "bg-cln-900 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cabeceras de salón — solo desktop */}
        <div className="hidden md:grid md:grid-cols-[100px_1fr_1fr_1fr] gap-3">
          <div /> {/* espacio reservado para la columna de hora */}
          {(["mambacho", "momotombo", "telica"] as SalonKey[]).map((key) => {
            const s = SALON_META[key];
            return (
              <div key={key} className={`${s.headerBg} rounded-lg px-4 py-3`}>
                <p className="text-white font-bold text-sm leading-tight">{s.label}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={s.trackStyle}>
                  {s.track}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {SLOTS.map((slot, idx) => {
          const isLast = idx === SLOTS.length - 1;
          const dotColor = slotDotColor(slot);

          return (
            <div key={slot.time}>
              <div className="grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-3 py-2">

                {/* Columna hora */}
                <div className="relative flex flex-col items-end pt-3">
                  {!isLast && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-px"
                      style={{ background: "linear-gradient(to bottom, #E5E7EB 80%, transparent)" }}
                      aria-hidden
                    />
                  )}
                  {/* Dot */}
                  <div
                    className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full ring-2 ring-white z-10"
                    style={{ background: dotColor }}
                    aria-hidden
                  />
                  <time className="text-[10px] md:text-[11px] font-semibold text-gray-400 text-right leading-tight pr-4 pt-[14px] whitespace-nowrap">
                    {slot.time}
                  </time>
                </div>

                {/* Contenido — desktop: 3 columnas / mobile: filtrado */}
                <div className="min-w-0">

                  {/* Desktop */}
                  <div className="hidden md:grid md:grid-cols-3 gap-3">
                    {(["mambacho", "momotombo", "telica"] as SalonKey[]).map((key) => (
                      <Cell key={key} cell={slot[key]} salonKey={key} />
                    ))}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex flex-col gap-2">
                    {(filter === "todo"
                      ? (["mambacho", "momotombo", "telica"] as SalonKey[])
                      : ([filter] as SalonKey[])
                    ).map((key) => {
                      const cell = slot[key];
                      if (cell.empty) return null;
                      return (
                        <div key={key}>
                          {filter === "todo" && (
                            <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${SALON_META[key].trackColor}`}>
                              {SALON_META[key].label}
                            </p>
                          )}
                          <Cell cell={cell} salonKey={key} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Separador */}
              {!isLast && (
                <div className="mx-[100px] border-t border-gray-100" />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-[11px] text-gray-400 text-center">
        * Este programa es preliminar y puede experimentar ajustes menores en horarios y contenidos.
      </p>
    </div>
  );
}
