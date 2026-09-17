import type { Metadata } from "next";
import Image from "next/image";
import SponsorMap from "@/components/SponsorMap";

export const metadata: Metadata = {
  title: "Patrocinadores | EXPO LOGÍSTICA · CLN · 2026",
  description: "Conozca a los patrocinadores de EXPO LOGÍSTICA · CLN · 2026, el gran encuentro anual de la Comunidad Logística Nicaragüense.",
};

export default function PatrocinadoresPage() {
  const sponsors = [
    { id: "E1", name: "Sponsor 1", tier: "elite" },
    { id: "E2", name: "Sponsor 2", tier: "elite" },
    { id: "E3", name: "Sponsor 3", tier: "elite" },
    { id: "O1", name: "Sponsor 4", tier: "oro" },
    { id: "O2", name: "Sponsor 5", tier: "oro" },
    { id: "O3", name: "Sponsor 6", tier: "oro" },
    { id: "O4", name: "Sponsor 7", tier: "oro" },
    { id: "P1", name: "Sponsor 8", tier: "plata" },
    { id: "P2", name: "Sponsor 9", tier: "plata" },
    { id: "P3", name: "Sponsor 10", tier: "plata" },
  ];

  type SponsorTier = "elite" | "oro" | "plata";

  const TIERS: { key: SponsorTier; label: string; desc: string; color: string; text: string; soft: string; cols: string }[] = [
    { key: "elite", label: "Sponsors Elite", desc: "Máxima visibilidad y exclusividad", color: "#B8860B", text: "#FFFBEB", soft: "#FBF3E0", cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
    { key: "oro", label: "Sponsors Oro", desc: "Alta presencia corporativa", color: "#1B3A6B", text: "#EFF6FF", soft: "#E8EFFB", cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" },
    { key: "plata", label: "Sponsors Plata", desc: "Presencia profesional estratégica", color: "#2E6B8F", text: "#F0F9FF", soft: "#E9F3F8", cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" },
  ];

  return (
    <div>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative bg-cln-950 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://nilogistic.com/wp-content/uploads/2026/09/Hero-Sponsor-scaled.jpeg"
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
            CONECTAR
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Soluciones que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              mueven la logística.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Empresas nacionales e internacionales se reúnen en Expo Logística CLN 2026 para presentar tecnología, servicios y soluciones que responden a los desafíos actuales de Supply Chain.
          </p>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Descubre las marcas que estarán presentes, explora el piso de exhibición y conecta con las soluciones que están transformando la cadena logística.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <a
              href="mailto:cln@nilogistic.com"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Ser patrocinador
            </a>
            <a
              href="#plano"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Ver plano del piso
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PLANO DEL PISO ════════════════════════════════ */}
      <section id="plano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              Piso de exhibición
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
              Las empresas que están moviendo la cadena logística.
            </h2>
          </div>
          <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
            Conoce las marcas, empresas y soluciones que serán parte de Expo Logística CLN 2026.
          </p>
        </div>
        <SponsorMap />
      </section>

      {/* ════════════════════════════════ MARCAS CONFIRMADAS ════════════════════════════════ */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                Marcas confirmadas
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
                Empresas que nos acompañan este año.
              </h2>
            </div>
            <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
              Próximamente estaremos revelando las empresas que nos acompañan este año.
            </p>
          </div>

          <div className="space-y-14">
            {TIERS.map((tier) => {
              const groupSponsors = sponsors.filter((s) => s.tier === tier.key);
              return (
                <div key={tier.key}>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span
                      className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider"
                      style={{ background: tier.color, color: tier.text }}
                    >
                      {tier.label}
                    </span>
                    <span className="text-sm text-gray-500">{tier.desc}</span>
                    <span className="text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-full px-3 py-1">
                      {groupSponsors.length} {groupSponsors.length === 1 ? "posición" : "posiciones"}
                    </span>
                  </div>

                  <div className={`grid ${tier.cols} gap-8`}>
                    {groupSponsors.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="bg-white rounded-xl shadow-md p-8 border-t-4 flex items-center justify-center aspect-[3/2] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                        style={{ borderTopColor: tier.color, borderColor: tier.color }}
                      >
                        <div
                          className="text-xl font-bold transition-colors"
                          style={{ color: "#9CA3AF" }}
                        >
                          Logo {sponsor.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CTA FINAL ════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            ¿Desea ser patrocinador?
          </h2>
          <p className="text-lg text-cln-200 font-light mb-8 leading-relaxed">
            Posicione su marca ante más de 120 ejecutivos y líderes de la cadena logística, tomadores de decisiones en áreas clave del negocio.
            Contamos con paquetes y espacios estratégicos en el área principal de circulación, como lo puede visualizar en el
            mapa superior. Contaremos con actividades que conectan los Sponsors con los asistentes.
          </p>
          <a
            href="mailto:cln@nilogistic.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            Solicitar Información
          </a>
        </div>
      </section>
    </div>
  );
}