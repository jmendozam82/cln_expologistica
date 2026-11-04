"use client";

import { useState } from "react";
import SpeakerModal from "@/components/SpeakerModal";
import { getSpeakerByName, type Speaker } from "@/lib/speakers";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type SlotKind =
  | "plenary"        // Registro, Apertura (Mombacho)
  | "magistral"      // Magistral 1 y 2 (Mombacho)
  | "break"          // Coffee Breaks (Momotombo)
  | "almuerzo"       // Almuerzo (Momotombo)
  | "cierre"         // Cóctel de cierre (Momotombo)
  | "reconocimiento" // Actividad Patrocinadores (Momotombo)
  | "panel"          // Panel de Expertos (Mombacho)
  | "conferencia"    // Conferencia regular
  | "empty";         // Celda vacía

interface Cell {
  kind: SlotKind;
  title?: string;
  sub?: string;
  speakers?: string[];
  time?: string;
  badge?: string;
  empty?: boolean;
}

interface TimeSlot {
  time: string;
  mombacho: Cell;
  momotombo: Cell;
  overlapNext?: boolean;
}

// ─── Celda vacía reutilizable ─────────────────────────────────────────────────

const EMPTY: Cell = { kind: "empty", empty: true };

// ─── Datos de agenda — cada fila siempre tiene las 2 columnas ────────────────

const SLOTS: TimeSlot[] = [
  // 7:30 – 8:30 → Registro solo en Mombacho
  {
    time: "7:30 – 8:30 a.m.",
    mombacho: { kind: "plenary", title: "Registro de asistentes" },
    momotombo: EMPTY,
  },
  // 8:30 – 9:00 → Apertura solo en Mombacho
  {
    time: "8:30 – 9:00 a.m.",
    mombacho: { kind: "plenary", title: "Ceremonia de Apertura", sub: "EXPO LOGÍSTICA · CLN · 2026" },
    momotombo: EMPTY,
  },
  // 9:00 – 9:50 → Oscar Soto (Mombacho) + Kairo Quezada (Momotombo, 9:30 – 10:30)
  {
    time: "9:00 – 9:50 a.m.",
    overlapNext: true,
    mombacho: {
      kind: "conferencia",
      title: "De la Última Milla a la Última Experiencia",
      sub: "Cómo construir una ejecución logística Best-in-Class",
      speakers: ["Oscar Soto Bravo"],
    },
    momotombo: {
      kind: "conferencia",
      title: "Supply Chain Blindada: Ciberseguridad y Continuidad Operativa en la Logística Digital",
      sub: "Qué ocurre cuando WMS, TMS, ERP, GPS o proveedores tecnológicos dejan de funcionar",
      speakers: ["Kairo Quezada"],
      time: "9:30 – 10:30 a.m.",
    },
  },
  // 9:50 – 10:30 → Conferencia y presentación del libro (Mombacho)
  {
    time: "9:50 – 10:30 a.m.",
    mombacho: {
      kind: "conferencia",
      badge: "Conferencia y Presentación del Libro",
      title: "Evoluciona o desaparece",
      sub: "Las 10 leyes de la brontosauriedad y por qué las empresas se vuelven irrelevantes",
      speakers: ["Antonio Espinoza Ruiz"],
    },
    momotombo: EMPTY,
  },
  // 10:30 – 11:00 → Coffee Break en Momotombo
  {
    time: "10:30 – 11:00 a.m.",
    mombacho: EMPTY,
    momotombo: { kind: "break", title: "Coffee Break AM · Visita a Stands de Patrocinadores" },
  },
  // 11:00 – 12:00 → Magistral 1 solo en Mombacho
  {
    time: "11:00 a.m. – 12:00 m.",
    mombacho: {
      kind: "magistral",
      title: "Magistral 1: Del Almacén Tradicional al Almacén Smart",
      sub: "Tecnología, automatización y decisiones para evolucionar sin sobredimensionar la inversión",
      speakers: ["Liczy Pallares"],
    },
    momotombo: EMPTY,
  },
  // 12:15 – 1:30 → Almuerzo solo en Momotombo
  {
    time: "12:15 – 1:30 p.m.",
    mombacho: EMPTY,
    momotombo: { kind: "almuerzo", title: "Almuerzo Ejecutivo" },
  },
  // 1:30 – 2:10 → Mombacho + Momotombo
  {
    time: "1:30 – 2:10 p.m.",
    mombacho: {
      kind: "conferencia",
      title: "Movilidad y Logística Regional 2035",
      sub: "Una visión estratégica sobre integración centroamericana, infraestructura, conectividad, corredores logísticos, facilitación del comercio y competitividad regional",
      speakers: ["Carlos Moreno"],
    },
    momotombo: {
      kind: "conferencia",
      title: "Torre de Control Logística: de Datos Dispersos a Decisiones en Tiempo Real",
      sub: "Cómo integrar información para lograr visibilidad End-to-End de la Supply Chain",
      speakers: ["Moisés Núñez Balladares"],
    },
  },
  // 2:10 – 2:40 → Coffee Break PM en Momotombo
  {
    time: "2:10 – 2:40 p.m.",
    mombacho: EMPTY,
    momotombo: { kind: "break", title: "Coffee Break PM · Visita a Stands de Patrocinadores" },
  },
  // 2:40 – 3:40 → Magistral 2 solo en Mombacho
  {
    time: "2:40 – 3:40 p.m.",
    mombacho: {
      kind: "magistral",
      title: "Magistral 2: IA en Logística: de la Tendencia a la Ventaja Competitiva",
      sub: "Cómo pasar del experimento a una implementación que genere resultados",
      speakers: [""],
    },
    momotombo: EMPTY,
  },
  // 3:40 – 4:00 → Reconocimiento solo en Momotombo
  {
    time: "3:40 – 4:00 p.m.",
    mombacho: EMPTY,
    momotombo: { kind: "reconocimiento", title: "Actividad Patrocinadores · Reconocimiento CLN" },
  },
  // 4:00 – 5:30 → Cóctel solo en Momotombo
  {
    time: "4:00 – 5:30 p.m.",
    mombacho: EMPTY,
    momotombo: { kind: "cierre", title: "Cóctel Networking de Cierre" },
  },
];

// ─── Tokens de diseño ─────────────────────────────────────────────────────────

const SALON_META = {
  mombacho: {
    label: "Salón Mombacho",
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
} as const;

type SalonKey = keyof typeof SALON_META;

// Estilos de card por kind
const KIND_CARD: Record<SlotKind, string> = {
  conferencia: "bg-white border-gray-100",
  panel: "bg-cln-50 border-cln-200",
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
  magistral: { label: "Magistral", cls: "bg-orange-100 text-orange-700 border border-orange-200" },
  plenary: null,
  break: { label: "Receso", cls: "bg-gray-100 text-gray-500" },
  almuerzo: { label: "Almuerzo", cls: "bg-green-100 text-green-700" },
  cierre: { label: "Networking", cls: "bg-orange-500/20 text-orange-400" },
  reconocimiento: { label: "Patrocinadores", cls: "bg-orange-100 text-orange-700" },
  empty: null,
};

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Badge({ kind, label }: { kind: SlotKind; label?: string }) {
  const b = KIND_BADGE[kind];
  if (!b) return null;
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${b.cls}`}>
      {label ?? b.label}
    </span>
  );
}

function Cell({
  cell,
  salonKey,
  onSpeakerClick,
  className = "",
}: {
  cell: Cell;
  salonKey: SalonKey;
  onSpeakerClick?: (name: string) => void;
  className?: string;
}) {
  const salon = SALON_META[salonKey];

  // Celda vacía — altura mínima para alinear con las vecinas
  if (cell.empty) {
    return (
      <div className={`min-h-[72px] ${className}`} />
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
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge kind={cell.kind} label={cell.badge} />
        {cell.time && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
            {cell.time}
          </span>
        )}
      </div>

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
          {cell.speakers.map((s, idx) => {
            const hasProfile = s ? Boolean(getSpeakerByName(s)) : false;
            return (
              <span
                key={idx}
                className={`flex items-center gap-1.5 text-[11px] font-semibold ${isCierre ? "text-slate-300" : "text-slate-500"}`}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isCierre ? "bg-orange-400" : "bg-orange-500"}`} aria-hidden />
                {hasProfile && onSpeakerClick ? (
                  <button
                    type="button"
                    onClick={() => onSpeakerClick(s)}
                    className={`text-left underline decoration-dotted underline-offset-2 transition-colors cursor-pointer bg-transparent border-none p-0 font-semibold hover:text-orange-600 ${isCierre ? "text-slate-300 hover:text-orange-300" : "text-slate-500"}`}
                  >
                    {s}
                  </button>
                ) : (
                  s || "Speaker"
                )}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Filtros móvil ────────────────────────────────────────────────────────────

type FilterKey = "todo" | SalonKey;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todo", label: "Todos" },
  { key: "mombacho", label: "Mombacho" },
  { key: "momotombo", label: "Momotombo" },
];

// Dot color para el timeline según el tipo más relevante del slot
function slotDotColor(slot: TimeSlot): string {
  const active = (["mombacho", "momotombo"] as SalonKey[])
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

// ─── Bloque con solape (Kairo inicia a mitad de Oscar y termina con el Panel) ───

function OverlapSlot({
  slot,
  nextSlot,
  filter,
  onSpeakerClick,
  showSeparator,
}: {
  slot: TimeSlot;
  nextSlot: TimeSlot;
  filter: FilterKey;
  onSpeakerClick?: (name: string) => void;
  showSeparator: boolean;
}) {
  return (
    <div>
      {/* Desktop: dos filas visuales; Kairo arranca a la mitad y termina con el Panel */}
      <div className="hidden md:grid md:grid-cols-[100px_1fr_1fr] md:gap-x-3 md:grid-rows-[1fr_1fr_auto]">
        <div className="relative flex flex-col items-end pt-3 row-start-1 row-span-2 col-start-1">
          <div
            className="absolute right-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #E5E7EB 80%, transparent)" }}
            aria-hidden
          />
          <div
            className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full ring-2 ring-white z-10"
            style={{ background: slotDotColor(slot) }}
            aria-hidden
          />
          <time className="text-[11px] font-semibold text-gray-400 text-right leading-tight pr-4 pt-[14px] whitespace-nowrap">
            {slot.time}
          </time>
        </div>

        <div className="row-start-1 row-span-2 col-start-2 py-2">
          <Cell cell={slot.mombacho} salonKey="mombacho" onSpeakerClick={onSpeakerClick} className="h-full" />
        </div>

        <div className="row-start-2 row-span-2 col-start-3 relative">
          <div className="absolute inset-x-0 top-0 bottom-2">
            <Cell cell={slot.momotombo} salonKey="momotombo" onSpeakerClick={onSpeakerClick} className="h-full" />
          </div>
        </div>

        <div className="relative flex flex-col items-end pt-3 row-start-3 col-start-1 border-t border-gray-100">
          <div
            className="absolute right-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #E5E7EB 80%, transparent)" }}
            aria-hidden
          />
          <div
            className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full ring-2 ring-white z-10"
            style={{ background: slotDotColor(nextSlot) }}
            aria-hidden
          />
          <time className="text-[11px] font-semibold text-gray-400 text-right leading-tight pr-4 pt-[14px] whitespace-nowrap">
            {nextSlot.time}
          </time>
        </div>

        <div className="row-start-3 col-start-2 py-2 border-t border-gray-100">
          <Cell cell={nextSlot.mombacho} salonKey="mombacho" onSpeakerClick={onSpeakerClick} />
        </div>
      </div>

      {/* Móvil: mismo contenido, apilado por horario */}
      <div className="md:hidden flex flex-col">
        {[slot, nextSlot].map((s) => {
          const keys = (filter === "todo" ? (["mombacho", "momotombo"] as SalonKey[]) : ([filter] as SalonKey[]))
            .filter((key) => !s[key].empty);
          if (keys.length === 0) return null;

          return (
            <div key={s.time} className="grid grid-cols-[72px_1fr] gap-3 py-2">
              <div className="relative flex flex-col items-end pt-3">
                <div
                  className="absolute right-0 top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, #E5E7EB 80%, transparent)" }}
                  aria-hidden
                />
                <div
                  className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full ring-2 ring-white z-10"
                  style={{ background: slotDotColor(s) }}
                  aria-hidden
                />
                <time className="text-[10px] font-semibold text-gray-400 text-right leading-tight pr-4 pt-[14px] whitespace-nowrap">
                  {s.time}
                </time>
              </div>
              <div className="min-w-0 flex flex-col gap-2">
                {keys.map((key) => (
                  <div key={key}>
                    {filter === "todo" && (
                      <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${SALON_META[key].trackColor}`}>
                        {SALON_META[key].label}
                      </p>
                    )}
                    <Cell cell={s[key]} salonKey={key} onSpeakerClick={onSpeakerClick} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showSeparator && (
        <div className="mx-[100px] border-t border-gray-100" />
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function AgendaMatrix() {
  const [filter, setFilter] = useState<FilterKey>("todo");
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  const openSpeaker = (name: string) => {
    const speaker = getSpeakerByName(name);
    if (speaker) setActiveSpeaker(speaker);
  };

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
        <div className="hidden md:grid md:grid-cols-[100px_1fr_1fr] gap-3">
          <div /> {/* espacio reservado para la columna de hora */}
          {(["mombacho", "momotombo"] as SalonKey[]).map((key) => {
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
          if (idx > 0 && SLOTS[idx - 1].overlapNext) return null;

          const nextSlot = SLOTS[idx + 1];
          if (slot.overlapNext && nextSlot) {
            return (
              <OverlapSlot
                key={slot.time}
                slot={slot}
                nextSlot={nextSlot}
                filter={filter}
                onSpeakerClick={openSpeaker}
                showSeparator={idx + 1 < SLOTS.length - 1}
              />
            );
          }

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

                {/* Contenido — desktop: 2 columnas / mobile: filtrado */}
                <div className="min-w-0">

                  {/* Desktop */}
                  <div className="hidden md:grid md:grid-cols-2 gap-3">
                    {(["mombacho", "momotombo"] as SalonKey[]).map((key) => (
                      <Cell key={key} cell={slot[key]} salonKey={key} onSpeakerClick={openSpeaker} />
                    ))}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex flex-col gap-2">
                    {(filter === "todo"
                      ? (["mombacho", "momotombo"] as SalonKey[])
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
                          <Cell cell={cell} salonKey={key} onSpeakerClick={openSpeaker} />
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

      {activeSpeaker && (
        <SpeakerModal speaker={activeSpeaker} onClose={() => setActiveSpeaker(null)} />
      )}
    </div>
  );
}
