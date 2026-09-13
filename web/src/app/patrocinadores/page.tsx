import type { Metadata } from "next";
import Image from "next/image";
import SponsorMap from "@/components/SponsorMap";

export const metadata: Metadata = {
  title: "Patrocinadores | EXPO LOGÍSTICA 2026 · CLN",
  description: "Conozca a los patrocinadores de EXPO LOGÍSTICA 2026 · CLN, el gran encuentro anual de la Comunidad Logística Nicaragüense.",
};

export default function PatrocinadoresPage() {
  const sponsors = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Sponsor ${i + 1}`,
  }));

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
            PATROCINADORES · EVENTO DE CIERRE CLN 2026
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Aliados estratégicos que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              impulsan la logística.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            El evento cuenta con el respaldo de empresas líderes que apuestan por la innovación y el
            desarrollo del sector logístico en Nicaragua. Interactúe con el plano para conocer la
            ubicación de nuestros aliados estratégicos y reservar su espacio comercial.
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
              Nuestros Patrocinadores
            </h2>
          </div>
          <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
            Cada espacio del mapa corresponde a la ubicación de un aliado comercial dentro del área de
            circulación del evento.
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100 flex items-center justify-center aspect-[3/2] hover:shadow-lg hover:border-cln-300 hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="text-gray-400 font-bold text-xl group-hover:text-cln-500 transition-colors">
                  Logo {sponsor.name}
                </div>
              </div>
            ))}
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
            Posicione su marca ante 120 ejecutivos y líderes de la cadena de suministro. Contamos con
            espacios estratégicos en el área principal de circulación, como lo puede visualizar en el
            mapa superior.
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