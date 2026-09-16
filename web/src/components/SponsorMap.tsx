"use client";

import { useState, useCallback } from "react";

/* ─── TIPOS ─────────────────────────── */
type Tier = "elite" | "oro" | "plata";
type Estado = "libre" | "reservado";

export interface Stand {
  id: string;
  label: string;
  tier: Tier;
  estado: Estado;
  empresa?: string;
  x: number; y: number; w: number; h: number;
}

/* ─── PALETA CORPORATIVA LOGÍSTICA ───────────────────── */
const C = {
  elite: { fill: "#B8860B", fillH: "#D4A017", border: "#8B6508", text: "#FFFBEB", sub: "#FDE68A", badge: "#78350F", legend: "#B8860B" },
  oro: { fill: "#1B3A6B", fillH: "#1E4080", border: "#0F2547", text: "#EFF6FF", sub: "#93C5FD", badge: "#1E3A5F", legend: "#1B3A6B" },
  plata: { fill: "#2E6B8F", fillH: "#357AAA", border: "#1A4F6E", text: "#F0F9FF", sub: "#BAE6FD", badge: "#164E63", legend: "#2E6B8F" },
  res: { fill: "#374151", border: "#1F2937", text: "#D1D5DB", sub: "#9CA3AF" },
};

const LABEL: Record<Tier, string> = { elite: "Elite", oro: "Oro", plata: "Plata" };

/* ─── STANDS NUEVO PLANO FONDO IMAGEN ────────────────────────────── */
// Ajustadas para un viewBox de 1200 x 750
const STANDS: Stand[] = [
  // Pasillo Izquierdo (Frente Mombacho y Télica)
  { id: "P1", label: "PLATA 1", tier: "plata", estado: "libre", x: 100, y: 550, w: 75, h: 42 },
  { id: "P2", label: "PLATA 2", tier: "plata", estado: "libre", x: 180, y: 550, w: 75, h: 42 },
  { id: "P3", label: "PLATA 3", tier: "plata", estado: "libre", x: 260, y: 550, w: 75, h: 42 },
  { id: "O4", label: "ORO 4", tier: "oro", estado: "libre", x: 340, y: 550, w: 75, h: 42 },
  { id: "O3", label: "ORO 3", tier: "oro", estado: "libre", x: 420, y: 550, w: 75, h: 42 },

  // Pasillo Central (Elite, vertical)
  { id: "E1", label: "ELITE 1", tier: "elite", estado: "libre", x: 723, y: 470, w: 75, h: 42 },
  { id: "E2", label: "ELITE 2", tier: "elite", estado: "libre", x: 723, y: 410, w: 75, h: 42 },
  { id: "E3", label: "ELITE 3", tier: "elite", estado: "libre", x: 723, y: 350, w: 75, h: 42 },

  // Pasillo Derecho (Frente Momotombo)
  { id: "O1", label: "ORO 1", tier: "oro", estado: "libre", x: 940, y: 550, w: 75, h: 42 },
  { id: "O2", label: "ORO 2", tier: "oro", estado: "libre", x: 1030, y: 550, w: 75, h: 42 },
];

/* ─── TOOLTIP ────────────────────────── */
function Tooltip({ s, px, py }: { s: Stand; px: number; py: number }) {
  const isRes = s.estado === "reservado";
  return (
    <div className="fixed z-50 pointer-events-none" style={{ left: px + 18, top: py - 10 }}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-64">
        <div className="h-1.5 w-full" style={{ background: isRes ? C.res.fill : C[s.tier].fill }} />
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">{LABEL[s.tier]}</p>
              <p className="text-xl font-extrabold text-gray-900 leading-none">Stand {s.label}</p>
            </div>
            <span
              className="mt-0.5 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase text-white"
              style={{ background: isRes ? C.res.fill : C[s.tier].fill }}
            >
              {s.estado}
            </span>
          </div>
          <div className="h-px bg-gray-100 my-3" />
          {!isRes ? (
            <>
              <p className="text-[13px] text-gray-500 mb-3 leading-snug">
                Maximice su presencia ante líderes del sector logístico centroamericano.
              </p>
              <a
                href="mailto:cln@nilogistic.com"
                className="pointer-events-auto flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: C[s.tier].fill }}
              >
                Solicitar Cotización →
              </a>
            </>
          ) : (
            <div className="rounded-xl p-3 border border-gray-100 bg-gray-50">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Empresa Patrocinadora</p>
              <p className="text-base font-bold text-gray-800">{s.empresa ?? "Reservado — Confirmado"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── STAND SVG ───────────────────────── */
function StandRect({ s, onEnter, onLeave, onMove }: {
  s: Stand;
  onEnter: (s: Stand, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMove: (e: React.MouseEvent) => void;
}) {
  const [hov, setHov] = useState(false);
  const isRes = s.estado === "reservado";
  const fill = isRes ? C.res.fill : (hov ? C[s.tier].fillH : C[s.tier].fill);
  const border = isRes ? C.res.border : C[s.tier].border;
  const textC = isRes ? C.res.text : C[s.tier].text;
  const subC = isRes ? C.res.sub : C[s.tier].sub;

  return (
    <g style={{ cursor: "pointer" }}
      onMouseEnter={e => { setHov(true); onEnter(s, e); }}
      onMouseMove={onMove}
      onMouseLeave={() => { setHov(false); onLeave(); }}>
      {hov && <rect x={s.x + 2} y={s.y + 3} width={s.w} height={s.h} rx={4} fill="rgba(0,0,0,0.18)" />}
      <rect
        x={s.x} y={s.y} width={s.w} height={s.h} rx={6}
        fill={fill} stroke={border} strokeWidth={hov ? 2 : 1.5}
        style={{ transition: "fill .15s" }}
      />
      <rect x={s.x + 1} y={s.y + 1} width={s.w - 2} height={6} rx={4} fill="rgba(255,255,255,0.12)" />
      <text
        x={s.x + s.w / 2} y={s.y + s.h / 2 - 6}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={11} fontWeight="800" fill={textC}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {s.label}
      </text>
      <text
        x={s.x + s.w / 2} y={s.y + s.h / 2 + 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={9} fill={subC}
        fontFamily="system-ui, sans-serif"
      >
        {isRes ? "RESERVADO" : "DISPONIBLE"}
      </text>
    </g>
  );
}

/* ─── MAIN ────────────────────────────── */
export default function SponsorMap() {
  const [tip, setTip] = useState<{ s: Stand; px: number; py: number } | null>(null);

  const enter = useCallback((s: Stand, e: React.MouseEvent) => setTip({ s, px: e.clientX, py: e.clientY }), []);
  const move = useCallback((e: React.MouseEvent) => setTip(p => p ? { ...p, px: e.clientX, py: e.clientY } : null), []);
  const leave = useCallback(() => setTip(null), []);

  const TIER_DESC: Record<Tier, string> = {
    elite: "Máxima visibilidad y exclusividad",
    oro: "Alta presencia corporativa",
    plata: "Presencia profesional estratégica",
  };

  const sp = { onEnter: enter, onLeave: leave, onMove: move };

  return (
    <div className="relative w-full overflow-hidden"
      style={{ background: "#F4F7FB", borderRadius: 20, border: "1px solid #D1D9E6", padding: "2rem 1.5rem" }}>

      <div className="text-center mb-6">
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#64748B", marginBottom: 4, textTransform: "uppercase" }}>
          DoubleTree by Hilton — Managua
        </p>
        <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#0A1628", margin: "0 0 4px", letterSpacing: "0.04em" }}>
          MAPA DE PATROCINADORES
        </h2>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>EXPO LOGÍSTICA · CLN · 2026 — Salón Principal</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {(["elite", "oro", "plata"] as Tier[]).map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "white", border: "1px solid #D1D9E6", borderRadius: 100 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: C[t].fill }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>{LABEL[t]}</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>·</span>
            <span style={{ fontSize: 11, color: "#64748B" }}>{TIER_DESC[t]}</span>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", overflowX: "auto", background: "white", borderRadius: 16, border: "1px solid #D1D9E6", padding: "0.5rem", boxShadow: "0 4px 20px rgba(15,28,46,.08)" }}>
        <svg viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", display: "block", minWidth: 800 }} onMouseMove={move}>

          {/* IMAGEN DEL PLANO DE FONDO */}
          <image href="https://nilogistic.com/wp-content/uploads/2026/09/mapa_sponsor-2-scaled.jpg" x="0" y="0" width="1200" height="750" preserveAspectRatio="xMidYMid meet" />

          {/* STANDS (Interactivos) */}
          {STANDS.map(s => <StandRect key={s.id} s={s} {...sp} />)}

          {/* REGISTRO (Estático) */}
          <rect x={510} y={550} width={100} height={42} rx={6} fill="#F97316" stroke="#C2410C" strokeWidth={1.5} />
          <rect x={512} y={550} width={98} height={6} rx={4} fill="rgba(255,255,255,0.2)" />
          <text x={560} y={565} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight="800" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.4">REGISTRO /</text>
          <text x={560} y={579} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight="800" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.4">RECEP.</text>
        </svg>
      </div>

      {tip && <Tooltip {...tip} />}
    </div>
  );
}
