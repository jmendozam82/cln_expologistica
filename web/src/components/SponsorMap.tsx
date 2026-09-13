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

/* ─── PALETA CORPORATIVA LOGÍSTICA ─────────────────────
   Inspirada en la identidad CLN / EXPO LOGÍSTICA 2026
   Sector: logística, supply chain, transporte, B2B ejecutivo

   ELITE   → Dorado empresarial (#C9982A / gold) — prestigio máximo
   ORO     → Azul marino profundo (#1B3A6B) — confianza, corporativo
   PLATA   → Acero industrial (#4A7FA5) — profesional, tecnológico
   RESERVADO → Grafito oscuro (#374151) — bloqueado / no disponible
   SALONES → Slate navy (#0F1C2E) — cohesión con el sitio
──────────────────────────────────────────────────────── */
const C = {
  elite: {
    fill: "#B8860B",   /* dorado oscuro — oro viejo elegante */
    fillH: "#D4A017",   /* hover más brillante */
    border: "#8B6508",
    text: "#FFFBEB",
    sub: "#FDE68A",
    badge: "#78350F",
    legend: "#B8860B",
  },
  oro: {
    fill: "#1B3A6B",   /* azul marino corporativo */
    fillH: "#1E4080",
    border: "#0F2547",
    text: "#EFF6FF",
    sub: "#93C5FD",
    badge: "#1E3A5F",
    legend: "#1B3A6B",
  },
  plata: {
    fill: "#2E6B8F",   /* azul acero industrial */
    fillH: "#357AAA",
    border: "#1A4F6E",
    text: "#F0F9FF",
    sub: "#BAE6FD",
    badge: "#164E63",
    legend: "#2E6B8F",
  },
  res: {
    fill: "#374151",   /* grafito — stand no disponible */
    border: "#1F2937",
    text: "#D1D5DB",
    sub: "#9CA3AF",
  },
  /* elementos del plano */
  room: "#0F1C2E",    /* salones oscuros navy */
  roomBg: "#E8EDF5",   /* relleno claro de sala */
  stage: "#C9982A",   /* escenario en dorado */
  stageTx: "#1C1000",
  reg: "#0A2540",   /* registro — navy profundo */
  regTx: "#E0EAFF",
  wall: "#94A3B8",   /* tabiques */
  dim: "#60A5FA",   /* dimensiones */
  dimTx: "#1E3A5F",
  corridor: "#DDE3EC",   /* pasillo */
  corridorB: "#94A3B8",
  dot: "#64748B",   /* mesas (círculos) */
  dotBg: "#CBD5E1",
  access: "#374151",
  footer: "#94A3B8",
};

const LABEL: Record<Tier, string> = { elite: "Elite", oro: "Oro", plata: "Plata" };

/* ─── STANDS ─────────────────────────────────────────
   ViewBox: 720 × 430
   Mombacho  : 12,12  → 222×290
   Télica    : 248,60 → 142×192
   Masaya    : 402,12 → 110×84
   Elites    : 402,104 (zona central derecha)
   Registro  : 402,224 → 110×52
   Momotombo : 524,12 → 180×290
   Pasillo   : 12,308 → 692×72
──────────────────────────────────────────────────── */
const STANDS: Stand[] = [
  { id: "E1", label: "ELITE 1", tier: "elite", estado: "libre", x: 402, y: 104, w: 110, h: 50 },
  { id: "E2", label: "ELITE 2", tier: "elite", estado: "libre", x: 402, y: 160, w: 52, h: 56 },
  { id: "E3", label: "ELITE 3", tier: "elite", estado: "libre", x: 460, y: 160, w: 52, h: 56 },
  { id: "O1", label: "ORO 1", tier: "oro", estado: "libre", x: 14, y: 322, w: 92, h: 50 },
  { id: "O2", label: "ORO 2", tier: "oro", estado: "libre", x: 112, y: 322, w: 92, h: 50 },
  { id: "O3", label: "ORO 3", tier: "oro", estado: "libre", x: 210, y: 322, w: 92, h: 50 },
  { id: "P1", label: "PLATA 1", tier: "plata", estado: "libre", x: 308, y: 322, w: 92, h: 50 },
  { id: "P2", label: "PLATA 2", tier: "plata", estado: "libre", x: 406, y: 322, w: 92, h: 50 },
  { id: "P3", label: "PLATA 3", tier: "plata", estado: "libre", x: 504, y: 322, w: 92, h: 50 },
  { id: "O4", label: "ORO 4", tier: "oro", estado: "libre", x: 602, y: 322, w: 100, h: 50 },
];

/* ─── TOOLTIP ────────────────────────── */
function Tooltip({ s, px, py }: { s: Stand; px: number; py: number }) {
  const isRes = s.estado === "reservado";
  return (
    <div className="fixed z-50 pointer-events-none" style={{ left: px + 18, top: py - 10 }}>
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-64"
        style={{ animation: "tipIn .18s cubic-bezier(.16,1,.3,1) both" }}
      >
        {/* Franja superior con color del tier */}
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
                Solicitar Cotización
                <span className="text-base leading-none">→</span>
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

      {/* Sombra */}
      {hov && <rect x={s.x + 2} y={s.y + 3} width={s.w} height={s.h} rx={4} fill="rgba(0,0,0,0.18)" />}

      <rect
        x={s.x} y={s.y} width={s.w} height={s.h} rx={4}
        fill={fill} stroke={border} strokeWidth={hov ? 2 : 1.5}
        style={{ transition: "fill .15s" }}
      />

      {/* Franja superior decorativa más clara */}
      <rect
        x={s.x + 1} y={s.y + 1} width={s.w - 2} height={6} rx={3}
        fill="rgba(255,255,255,0.12)"
      />

      <text
        x={s.x + s.w / 2} y={s.y + s.h / 2 - 6}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={s.tier === "elite" ? 11 : 10.5}
        fontWeight="800" fill={textC}
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing={s.tier === "elite" ? "0.5" : "0.2"}
      >
        {s.label}
      </text>
      <text
        x={s.x + s.w / 2} y={s.y + s.h / 2 + 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={8} fill={subC}
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.6"
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

  const total = (t: Tier) => STANDS.filter(s => s.tier === t).length;
  const libre = (t: Tier) => STANDS.filter(s => s.tier === t && s.estado === "libre").length;
  const sp = { onEnter: enter, onLeave: leave, onMove: move };

  /* Descripción de cada tier para la leyenda */
  const TIER_DESC: Record<Tier, string> = {
    elite: "Máxima visibilidad y exclusividad",
    oro: "Alta presencia corporativa",
    plata: "Presencia profesional estratégica",
  };

  return (
    <div className="relative w-full overflow-hidden"
      style={{ background: "#F4F7FB", borderRadius: 20, border: "1px solid #D1D9E6", padding: "2rem 1.5rem" }}>

      {/* ── HEADER ── */}
      <div className="text-center mb-6">
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#64748B", marginBottom: 4, textTransform: "uppercase" }}>
          DoubleTree by Hilton — Managua
        </p>
        <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#0A1628", margin: "0 0 4px", letterSpacing: "0.04em" }}>
          MAPA DE PATROCINADORES
        </h2>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>EXPO LOGÍSTICA 2026 · CLN — Salón Principal</p>
      </div>

      {/* ── LEYENDA ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {(["elite", "oro", "plata"] as Tier[]).map(t => (
          <div key={t}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
              background: "white", border: "1px solid #D1D9E6", borderRadius: 100,
              boxShadow: "0 1px 3px rgba(0,0,0,.06)"
            }}>
            <div style={{
              width: 12, height: 12, borderRadius: 3, background: C[t].fill, flexShrink: 0,
              boxShadow: `0 0 0 2px ${C[t].fill}33`
            }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>{LABEL[t]}</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>·</span>
            <span style={{ fontSize: 11, color: "#64748B" }}>{TIER_DESC[t]}</span>
          </div>
        ))}
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
          background: "white", border: "1px solid #D1D9E6", borderRadius: 100
        }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "white", border: "1.5px solid #CBD5E1" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>Disponible</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
          background: "white", border: "1px solid #D1D9E6", borderRadius: 100
        }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: C.res.fill }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>Reservado</span>
        </div>
      </div>

      {/* ── SVG PLANO ── */}
      <div style={{
        width: "100%", overflowX: "auto", background: "white",
        borderRadius: 16, border: "1px solid #D1D9E6",
        boxShadow: "0 4px 20px rgba(15,28,46,.08)", padding: "1rem"
      }}>
        <svg
          viewBox="0 0 720 430"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", maxWidth: 920, margin: "0 auto", display: "block", minWidth: 560 }}
          onMouseMove={move}
        >
          <defs>
            {/* Patrón de alfombra para salones */}
            <pattern id="carpet" patternUnits="userSpaceOnUse" width="16" height="16">
              <circle cx="8" cy="8" r="1.2" fill="#94A3B8" opacity="0.2" />
            </pattern>
            {/* Patrón de líneas para Télica */}
            <pattern id="lines" patternUnits="userSpaceOnUse" width="10" height="10">
              <line x1="0" y1="10" x2="10" y2="0" stroke="#94A3B8" strokeWidth="0.5" opacity="0.25" />
            </pattern>
            {/* Gradiente sutil para escenarios */}
            <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            {/* Sombra suave perímetro */}
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0A1628" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* ── PERÍMETRO HOTEL ── */}
          <rect x="6" y="6" width="708" height="396" rx="8"
            fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" filter="url(#shadow)" />

          {/* ══════════════════════════════
              SALÓN MOMBACHO (izq, 222×290)
          ══════════════════════════════ */}
          <rect x="12" y="12" width="222" height="290" rx="5" fill="#E8EDF5" stroke="#B8C4D4" strokeWidth="1.2" />
          <rect x="12" y="12" width="222" height="290" rx="5" fill="url(#carpet)" />
          {/* Header sala */}
          <rect x="12" y="12" width="222" height="22" rx="5" fill="#1B3A6B" />
          <rect x="12" y="24" width="222" height="10" fill="#1B3A6B" />
          <text x="123" y="27" textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.6">SALÓN MOMBACHO</text>
          <text x="123" y="40" textAnchor="middle" fontSize="7.5" fill="#64748B"
            fontFamily="system-ui,sans-serif">16.76 m × 7.17 m  |  Alt. Máx. 3.22 m</text>

          {/* Escenario 1 */}
          <rect x="22" y="50" width="140" height="32" rx="3" fill="url(#stageGrad)" stroke="#8B6508" strokeWidth="1" />
          <text x="92" y="70" textAnchor="middle" fontSize="9.5" fontWeight="800"
            fill="#1C1000" fontFamily="system-ui,sans-serif" letterSpacing="1">ESCENARIO 1</text>

          {/* Mesas redondas — Mombacho (16 mesas en cuadrícula) */}
          {[50, 93, 136, 179].map(cx =>
            [115, 155, 195, 245].map(cy => (
              <circle key={`m${cx}-${cy}`} cx={cx} cy={cy} r={12}
                fill={C.dotBg} stroke={C.dot} strokeWidth="0.8" opacity="0.6" />
            ))
          )}

          {/* ══════════════════════════════
              SALÓN TÉLICA (centro, 142×192)
          ══════════════════════════════ */}
          <rect x="248" y="60" width="142" height="192" rx="5" fill="#E8EDF5" stroke="#B8C4D4" strokeWidth="1.2" />
          <rect x="248" y="60" width="142" height="192" rx="5" fill="url(#lines)" />
          <rect x="248" y="60" width="142" height="22" rx="5" fill="#2E6B8F" />
          <rect x="248" y="72" width="142" height="10" fill="#2E6B8F" />
          <text x="319" y="75" textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.6">SALÓN TÉLICA</text>
          <text x="319" y="90" textAnchor="middle" fontSize="7.5" fill="#64748B"
            fontFamily="system-ui,sans-serif">8.79 m × 10.52 m</text>
          <text x="319" y="162" textAnchor="middle" fontSize="9" fill="#94A3B8"
            fontFamily="system-ui,sans-serif">Área de Exhibición</text>
          {/* Ícono decorativo exhibición */}
          <rect x="285" y="110" width="68" height="38" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,2" />
          <line x1="285" y1="148" x2="353" y2="110" stroke="#CBD5E1" strokeWidth="0.8" />
          <line x1="285" y1="110" x2="353" y2="148" stroke="#CBD5E1" strokeWidth="0.8" />

          {/* ══════════════════════════════
              SALA CONFERENCIAS MASAYA
          ══════════════════════════════ */}
          <rect x="402" y="12" width="110" height="84" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <rect x="402" y="12" width="110" height="20" rx="4" fill="#334155" />
          <rect x="402" y="24" width="110" height="8" fill="#334155" />
          <text x="457" y="25" textAnchor="middle" fontSize="8.5" fontWeight="700"
            fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.4">SALA DE CONFERENCIAS</text>
          <text x="457" y="46" textAnchor="middle" fontSize="9" fontWeight="600"
            fill="#475569" fontFamily="system-ui,sans-serif">MASAYA</text>
          <text x="457" y="60" textAnchor="middle" fontSize="7.5" fill="#94A3B8"
            fontFamily="system-ui,sans-serif">14.28 m × 5.34 m</text>
          <text x="457" y="72" textAnchor="middle" fontSize="7" fill="#B0BAC8"
            fontFamily="system-ui,sans-serif">Alt. 2.40 m</text>

          {/* ══════════════════════════════
              STANDS ELITE
          ══════════════════════════════ */}
          {STANDS.filter(s => s.tier === "elite").map(s => <StandRect key={s.id} s={s} {...sp} />)}

          {/* ══════════════════════════════
              REGISTRO / RECEPCIÓN
          ══════════════════════════════ */}
          <rect x="402" y="224" width="110" height="52" rx="4"
            fill={C.reg} stroke="#0A1E3D" strokeWidth="1.5" />
          <rect x="402" y="224" width="110" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
          <text x="457" y="247" textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill={C.regTx} fontFamily="system-ui,sans-serif" letterSpacing="0.4">REGISTRO /</text>
          <text x="457" y="261" textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill={C.regTx} fontFamily="system-ui,sans-serif" letterSpacing="0.4">RECEPCIÓN</text>

          {/* ══════════════════════════════
              SALÓN MOMOTOMBO (der, 180×290)
          ══════════════════════════════ */}
          <rect x="524" y="12" width="180" height="290" rx="5" fill="#E8EDF5" stroke="#B8C4D4" strokeWidth="1.2" />
          <rect x="524" y="12" width="180" height="290" rx="5" fill="url(#carpet)" />
          <rect x="524" y="12" width="180" height="22" rx="5" fill="#1B3A6B" />
          <rect x="524" y="24" width="180" height="10" fill="#1B3A6B" />
          <text x="614" y="27" textAnchor="middle" fontSize="9.5" fontWeight="700"
            fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.6">SALÓN MOMOTOMBO</text>
          <text x="614" y="40" textAnchor="middle" fontSize="7.5" fill="#64748B"
            fontFamily="system-ui,sans-serif">8.35 m × 16.92 m  |  Alt. Máx. 3.35 m</text>

          {/* Escenario 2 */}
          <rect x="534" y="50" width="160" height="32" rx="3" fill="url(#stageGrad)" stroke="#8B6508" strokeWidth="1" />
          <text x="614" y="70" textAnchor="middle" fontSize="9.5" fontWeight="800"
            fill="#1C1000" fontFamily="system-ui,sans-serif" letterSpacing="1">ESCENARIO 2</text>

          {/* Mesas Momotombo */}
          {[548, 587, 626, 665].map(cx =>
            [115, 155, 195, 245].map(cy => (
              <circle key={`n${cx}-${cy}`} cx={cx} cy={cy} r={12}
                fill={C.dotBg} stroke={C.dot} strokeWidth="0.8" opacity="0.6" />
            ))
          )}

          {/* ══════════════════════════════
              TABIQUES DE SEPARACIÓN
          ══════════════════════════════ */}
          <line x1="238" y1="12" x2="238" y2="304" stroke={C.wall} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
          <line x1="396" y1="60" x2="396" y2="304" stroke={C.wall} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
          <line x1="518" y1="12" x2="518" y2="304" stroke={C.wall} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />

          {/* ══════════════════════════════
              PASILLO INFERIOR (26.70 m)
          ══════════════════════════════ */}
          <rect x="12" y="308" width="692" height="72" rx="5"
            fill={C.corridor} stroke={C.corridorB} strokeWidth="1" />
          <text x="20" y="319" fontSize="7.5" fill="#94A3B8"
            fontFamily="system-ui,sans-serif" letterSpacing="0.3">
            PASILLO — SALÓN MOMOTOMBO Y TÉLICA  ·  26.70 m  ·  Alt. 3.30 m
          </text>

          {/* STANDS ORO y PLATA */}
          {STANDS.filter(s => s.tier !== "elite").map(s => <StandRect key={s.id} s={s} {...sp} />)}

          {/* ══════════════════════════════
              ACCESO / SALIDA
          ══════════════════════════════ */}
          <line x1="180" y1="390" x2="180" y2="383" stroke={C.access} strokeWidth="2" />
          <line x1="158" y1="383" x2="202" y2="383" stroke={C.access} strokeWidth="2" />
          <polygon points="172,383 188,383 180,376" fill={C.access} opacity="0.6" />
          <text x="180" y="404" textAnchor="middle" fontSize="8.5" fontWeight="700"
            fill={C.access} fontFamily="system-ui,sans-serif" letterSpacing="0.5">ACCESO</text>

          <line x1="520" y1="390" x2="520" y2="383" stroke={C.access} strokeWidth="2" />
          <line x1="498" y1="383" x2="542" y2="383" stroke={C.access} strokeWidth="2" />
          <polygon points="512,376 528,376 520,383" fill={C.access} opacity="0.6" />
          <text x="520" y="404" textAnchor="middle" fontSize="8.5" fontWeight="700"
            fill={C.access} fontFamily="system-ui,sans-serif" letterSpacing="0.5">SALIDA</text>

          {/* Copyright */}
          <text x="706" y="410" textAnchor="end" fontSize="7" fill={C.footer}
            fontFamily="system-ui,sans-serif">
            © EXPO LOGÍSTICA 2026 · CLN — DoubleTree by Hilton Managua
          </text>
        </svg>
      </div>

      {/* ── TOOLTIP ── */}
      {tip && <Tooltip s={tip.s} px={tip.px} py={tip.py} />}

      {/* ── CONTADOR POR TIER ── */}
      <div style={{
        marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #D1D9E6",
        display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12
      }}>
        {(["elite", "oro", "plata"] as Tier[]).map(t => (
          <div key={t} style={{ textAlign: "center" }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#94A3B8",
              textTransform: "uppercase", margin: "0 0 6px"
            }}>
              {LABEL[t]}
            </p>
            <div style={{
              fontSize: 18, fontWeight: 900, borderRadius: 10, padding: "6px 0",
              color: "white", background: C[t].fill,
              boxShadow: `0 2px 8px ${C[t].fill}44`
            }}>
              {libre(t)} / {total(t)}
            </div>
            <p style={{ fontSize: 10, color: "#94A3B8", marginTop: 4 }}>disponibles</p>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes tipIn {
          from { opacity:0; transform:translateY(6px) scale(.97) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
      `}} />
    </div>
  );
}
