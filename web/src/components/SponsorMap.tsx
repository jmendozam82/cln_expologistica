import Image from "next/image";

/* ─── PALETA CORPORATIVA LOGÍSTICA ───────────────────── */
const C = {
  elite: { fill: "#B8860B" },
  oro: { fill: "#1B3A6B" },
  plata: { fill: "#2E6B8F" },
};

const LABEL = { elite: "Elite", oro: "Oro", plata: "Plata" } as const;
const TIER_DESC = {
  elite: "Máxima visibilidad y exclusividad",
  oro: "Alta presencia corporativa",
  plata: "Presencia profesional estratégica",
} as const;

const TIERS = ["elite", "oro", "plata"] as const;

/* ─── MAIN ────────────────────────────── */
export default function SponsorMap() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "#F4F7FB", borderRadius: 20, border: "1px solid #D1D9E6", padding: "2rem 1.5rem" }}
    >
      <div className="text-center mb-6">
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#64748B", marginBottom: 4, textTransform: "uppercase" }}>
          DoubleTree by Hilton — Managua
        </p>
        <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#0A1628", margin: "0 0 4px", letterSpacing: "0.04em" }}>
          MAPA DEL PISO DE EXHIBICIÓN
        </h2>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>EXPO LOGÍSTICA · CLN · 2026 — Salón Principal</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {TIERS.map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "white", border: "1px solid #D1D9E6", borderRadius: 100 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: C[t].fill }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B" }}>{LABEL[t]}</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>·</span>
            <span style={{ fontSize: 11, color: "#64748B" }}>{TIER_DESC[t]}</span>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", background: "white", borderRadius: 16, border: "1px solid #D1D9E6", padding: "0.5rem", boxShadow: "0 4px 20px rgba(15,28,46,.08)" }}>
        <Image
          src="https://nilogistic.com/wp-content/uploads/2026/11/mapa-sponsor-final-scaled.png"
          alt="Mapa del piso de exhibición — EXPO LOGÍSTICA · CLN · 2026"
          width={2560}
          height={1440}
          sizes="(max-width: 768px) 100vw, 1200px"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
        />
      </div>
    </div>
  );
}
