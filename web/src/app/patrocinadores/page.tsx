import type { Metadata } from "next";
import Image from "next/image";
import SponsorMap from "@/components/SponsorMap";
import SponsorsDirectory, { type Sponsor } from "@/components/SponsorsDirectory";

export const metadata: Metadata = {
  title: "Patrocinadores | EXPO LOGÍSTICA · CLN · 2026",
  description: "Conozca a los patrocinadores de EXPO LOGÍSTICA · CLN · 2026, el gran encuentro anual de la Comunidad Logística Nicaragüense.",
};

export default function PatrocinadoresPage() {
  const sponsors: Sponsor[] = [
    { id: "E1", name: "Sponsor 1", tier: "elite" },
    { id: "E2", name: "Sponsor 2", tier: "elite" },
    { id: "E3", name: "Sponsor 3", tier: "elite" },
    {
      id: "O1",
      name: "HA LOGIX",
      tier: "oro",
      logo: "/sponsor/ha_logix_Sponsor_Oro_crop.png",
      profile: {
        headline: "90 años de trayectoria como operador de soluciones logísticas para el comercio internacional.",
        description:
          "HA Logix es una plataforma integrada de servicios logísticos con presencia en Nicaragua y la región centroamericana. Une transporte, aduanas, almacenamiento y distribución con una plataforma tecnológica propia, comprometida en generar eficiencia y tranquilidad a sus clientes, con altos estándares de transparencia, ética y responsabilidad.",
        services: [
          "Servicios Aduaneros",
          "Almacén Fiscal",
          "Almacén Logístico",
          "Distribución",
          "Transporte Terrestre",
          "Transporte Aéreo",
          "Transporte Marítimo",
          "Agenciamiento Portuario",
          "Logística de Proyectos",
          "Courier",
        ],
        website: "https://ni.ha-logix.com/",
      },
    },
    { id: "O2", name: "Sponsor 5", tier: "oro" },
    {
      id: "O3",
      name: "IAMMSA",
      tier: "oro",
      logo: "/sponsor/iammsa-Sponsor_oro.png",
      profile: {
        headline: "Más de 25 años ofreciendo las mejores soluciones de almacenaje en México y Centroamérica.",
        description:
          "IAMMSA es sinónimo de innovación y logística aplicada, parte de GRUPO SISA, compañía especializada en la planeación, diseño e implementación de sistemas avanzados para el manejo de materiales e información. Su equipo de ingenieros, calculistas y diseñadores ejecuta centros de distribución con las mejores prácticas mundiales en almacenaje y distribución, apoyado en una filosofía de responsabilidad total y las 5'S de la calidad.",
        services: [
          "Diseño de Racks y Sistemas de Almacenamiento",
          "Sistemas Autosoportados y Naves Industriales",
          "Fabricación, suministro y montaje",
          "Consultoría y Logística",
          "Análisis logístico de operación",
          "Transformación de acero bajo normas nacionales e internacionales",
        ],
        website: "https://iammsa.mx/",
      },
    },
    { id: "O4", name: "Sponsor 7", tier: "oro" },
    { id: "O5", name: "Sponsor 8", tier: "oro" },
    { id: "P1", name: "Sponsor 9", tier: "plata" },
    { id: "P2", name: "Sponsor 10", tier: "plata" },
    {
      id: "A1",
      name: "VIVO",
      tier: "aliado",
      logo: "/sponsor/vivo_aliado_cln.png",
      profile: {
        headline: "Tu dosis diaria de vida: shots funcionales 100% naturales.",
        description:
          "VIVO es una marca de bienestar y alimentación natural que desarrolla bebidas y shots funcionales elaborados con ingredientes naturales, prensados en frío y sin conservantes. Su propuesta busca incorporar el bienestar a la rutina diaria con productos funcionales para detox, defensa y energía, disponibles en pack de ahorro y pack semanal.",
        services: [
          "Shot Verde — Detox • Alcalino",
          "Shot Defense — Inmunidad • Anti-inflamatorio",
          "Shot Energy — Energía • Vitalidad",
          "Pack Semanal de bienestar",
          "100% Natural · Prensado en frío",
          "Sin conservantes",
        ],
        website: "https://www.instagram.com/vivotudosisdevida",
        websiteLabel: "Ver en Instagram",
      },
    },
    { id: "A2", name: "Aliado 2", tier: "aliado" },
    { id: "A3", name: "Aliado 3", tier: "aliado" },
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

          <SponsorsDirectory sponsors={sponsors} />
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