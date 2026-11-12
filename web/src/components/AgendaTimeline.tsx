"use client";

import { useState } from "react";
import SpeakerModal from "@/components/SpeakerModal";
import { getSpeakerByName, type Speaker } from "@/lib/speakers";
import {
  AGENDA_SLOTS,
  SALON_META,
  normalizeSpeakerEntry,
  type Cell as CellData,
  type SalonKey,
  type SlotKind,
  type SpeakerEntry,
  type TimeSlot,
} from "@/lib/agenda";

// ─── Estilos por tipo de sesión ───────────────────────────────────────────────

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
  panel: { label: "Foro Ejecutivo", cls: "bg-cln-100 text-cln-900" },
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

function SpeakerLine({
  entry,
  prefix,
  isCierre,
  onSpeakerClick,
}: {
  entry: SpeakerEntry;
  prefix?: string;
  isCierre: boolean;
  onSpeakerClick?: (name: string) => void;
}) {
  const hasProfile = entry.name ? Boolean(getSpeakerByName(entry.name)) : false;
  const label = entry.displayName ?? entry.name;

  return (
    <span
      className={`flex items-center gap-1.5 text-[11px] font-semibold ${isCierre ? "text-slate-300" : "text-slate-500"}`}
    >
      <span
        className={`w-1 h-1 rounded-full flex-shrink-0 ${isCierre ? "bg-orange-400" : "bg-orange-500"}`}
        aria-hidden
      />
      {prefix && <span className="text-slate-400 font-medium">{prefix}</span>}
      {hasProfile && onSpeakerClick ? (
        <button
          type="button"
          onClick={() => onSpeakerClick(entry.name)}
          className={`text-left underline decoration-dotted underline-offset-2 transition-colors cursor-pointer bg-transparent border-none p-0 font-semibold hover:text-orange-600 ${
            isCierre ? "text-slate-300 hover:text-orange-300" : "text-slate-500"
          }`}
        >
          {label}
        </button>
      ) : (
        <span>{label || "Speaker"}</span>
      )}
    </span>
  );
}

function Cell({
  cell,
  borderLClass,
  onSpeakerClick,
  className = "",
}: {
  cell: CellData;
  borderLClass: string;
  onSpeakerClick?: (name: string) => void;
  className?: string;
}) {
  if (cell.empty) {
    return <div className={`min-h-[72px] ${className}`} />;
  }

  const isCierre = cell.kind === "cierre";
  const speakers = (cell.speakers ?? []).map(normalizeSpeakerEntry);

  return (
    <div
      className={[
        "min-h-[72px] rounded-lg border border-l-4 px-4 py-3",
        "flex flex-col gap-1",
        "transition-shadow duration-150 hover:shadow-md",
        borderLClass,
        KIND_CARD[cell.kind],
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge kind={cell.kind} label={cell.badge} />
        <div className="flex items-center gap-2">
          {cell.salonLabel && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
              {cell.salonLabel}
            </span>
          )}
          {cell.time && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
              {cell.time}
            </span>
          )}
        </div>
      </div>

      <p
        className={`text-sm font-heading font-bold leading-snug ${KIND_TITLE[cell.kind]} ${
          cell.kind === "plenary" ? "mt-0" : "mt-0.5"
        }`}
      >
        {cell.title}
      </p>

      {cell.sub && (
        <p className={`text-[11px] leading-relaxed ${isCierre ? "text-slate-300" : "text-gray-500"}`}>
          {cell.sub}
        </p>
      )}

      {(speakers.length > 0 || cell.moderator) && (
        <div className="mt-1.5 flex flex-col gap-0.5">
          {speakers.map((entry, idx) => (
            <SpeakerLine
              key={`${entry.name}-${idx}`}
              entry={entry}
              isCierre={isCierre}
              onSpeakerClick={onSpeakerClick}
            />
          ))}
          {cell.moderator && (
            <SpeakerLine
              entry={{ name: cell.moderator }}
              prefix="Moderador:"
              isCierre={isCierre}
              onSpeakerClick={onSpeakerClick}
            />
          )}
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
  const active = slot.shared && !slot.shared.empty
    ? slot.shared
    : (["mombacho", "momotombo"] as SalonKey[])
        .map((k) => slot[k])
        .find((c) => !c.empty);
  if (!active) return "#D1D5DB";
  const map: Partial<Record<SlotKind, string>> = {
    magistral: "#f97316", // orange-500
    panel: "#00345b",
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
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === f.key
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
        {AGENDA_SLOTS.map((slot, idx) => {
          const isLast = idx === AGENDA_SLOTS.length - 1;
          const dotColor = slotDotColor(slot);
          const mobileKeys = (
            filter === "todo" ? (["mombacho", "momotombo"] as SalonKey[]) : ([filter] as SalonKey[])
          ).filter((key) => !slot[key].empty);
          const showSharedMobile = Boolean(slot.shared && !slot.shared.empty);

          // Si en móvil se filtró a un salón y el bloque no tiene contenido de ese salón ni compartido, se oculta en móvil
          const hideOnMobile = mobileKeys.length === 0 && !showSharedMobile;

          return (
            <div key={slot.time} className={hideOnMobile ? "hidden md:block" : ""}>
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
                  <div
                    className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full ring-2 ring-white z-10"
                    style={{ background: dotColor }}
                    aria-hidden
                  />
                  <time className="text-[10px] md:text-[11px] font-semibold text-gray-400 text-right leading-tight pr-4 pt-[14px] whitespace-nowrap">
                    {slot.time}
                  </time>
                </div>

                {/* Contenido — desktop: 2 columnas (o full-width para Télica) / mobile: filtrado */}
                <div className="min-w-0">
                  {/* Desktop */}
                  <div className="hidden md:grid md:grid-cols-2 gap-3">
                    {slot.shared && !slot.shared.empty ? (
                      <Cell
                        cell={slot.shared}
                        borderLClass="border-l-gray-400"
                        onSpeakerClick={openSpeaker}
                        className="md:col-span-2"
                      />
                    ) : (
                      (["mombacho", "momotombo"] as SalonKey[]).map((key) => (
                        <Cell
                          key={key}
                          cell={slot[key]}
                          borderLClass={SALON_META[key].borderL}
                          onSpeakerClick={openSpeaker}
                        />
                      ))
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex flex-col gap-2">
                    {showSharedMobile && slot.shared && (
                      <div>
                        {slot.shared.salonLabel && (
                          <p className="text-[9px] font-bold uppercase tracking-wider mb-1 text-gray-500">
                            {slot.shared.salonLabel}
                          </p>
                        )}
                        <Cell
                          cell={slot.shared}
                          borderLClass="border-l-gray-400"
                          onSpeakerClick={openSpeaker}
                        />
                      </div>
                    )}
                    {mobileKeys.map((key) => (
                      <div key={key}>
                        {filter === "todo" && (
                          <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${SALON_META[key].trackColor}`}>
                            {SALON_META[key].label}
                          </p>
                        )}
                        <Cell
                          cell={slot[key]}
                          borderLClass={SALON_META[key].borderL}
                          onSpeakerClick={openSpeaker}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separador */}
              {!isLast && <div className="mx-[100px] border-t border-gray-100" />}
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
