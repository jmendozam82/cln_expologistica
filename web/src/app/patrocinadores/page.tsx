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
    {
      id: "E1",
      name: "MANISA",
      tier: "elite",
      logo: "/sponsor/manisa.png",
      profile: {
        headline:
          "Integrador de soluciones intralogísticas con más de 40 años de experiencia.",
        description:
          "MANISA es un integrador de soluciones intralogísticas especializado en sistemas de almacenaje y equipos para manejo de materiales. Con más de 40 años de trayectoria en la industria, diseña y transforma almacenes en operaciones de alta eficiencia, ayudando a maximizar la capacidad de almacenamiento y acelerar el procesamiento de pedidos. Como distribuidor y taller de servicio certificado autorizado de Crown Equipment Corp, Mecalux, Interroll, EnerSys, Kardex y SPX Flow, garantiza soluciones y tecnologías confiables con un servicio de postventa continuo.",
        services: [
          "Venta y renta de montacargas",
          "Mantenimiento preventivo, correctivo y asistencia técnica",
          "Diseño, suministro e instalación de racks industriales",
          "Almacenes automáticos y sistemas conveyor",
          "Transportadores, clasificadores (sorters) y bandas transportadoras",
          "Baterías y cargadores de ion-litio, plomo-ácido y carga de oportunidad (TPP)",
          "Equipos para cocina, lavandería industrial y refrigeración",
          "Elevadores y rampas industriales, puertas rápidas y equipamiento para bahías de carga",
        ],
        website: "https://www.manisa.cc",
        websiteLabel: "Visitar sitio web",
        socials: [
          { label: "LinkedIn", url: "https://ni.linkedin.com/company/montacargas-y-accesorios-de-nicaragua-s-a" },
          { label: "Facebook", url: "https://www.facebook.com/manisanicaragua" },
          { label: "TikTok", url: "https://www.tiktok.com/@montacargasyaccesorios" },
          { label: "WhatsApp", url: "https://wa.me/50578255836" },
        ],
        contact: {
          manager: "Gerencia comercial",
          email: "mgonzalez@manisa.cc",
          phones: ["8285-3540", "7825-5184"],
        },
      },
    },
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
    {
      id: "O2",
      name: "I-CARGO",
      tier: "oro",
      logo: "/sponsor/icargo.png",
      profile: {
        headline: "Servicios logísticos internacionales integrados: marítimo, aéreo y terrestre.",
        description:
          "I-CARGO ofrece un conjunto de servicios logísticos internacionales integrados relacionados con el transporte de carga, depósitos aduaneros y transporte multimodal (aéreo, marítimo, terrestre, LCL y FCL). Su portafolio incluye asesoría logística, consolidación de carga, seguros y otras soluciones personalizadas para garantizar la excelencia en importaciones y exportaciones.",
        services: [
          "Transporte Marítimo",
          "Transporte Aéreo",
          "Transporte Terrestre (FTL y LTL)",
          "Consolidación de Carga (LCL)",
          "Despacho Aduanal",
          "Seguros de Carga",
          "Gestión de Proyectos",
          "Asesoría Logística",
        ],
        website: "https://i-cargo.net/",
      },
    },
    {
      id: "O3",
      name: "SERLOG",
      tier: "oro",
      logo: "/sponsor/serlog.png",
      profile: {
        headline: "Más de 25 años de experiencia en transporte y logística de carga terrestre nacional e internacional.",
        description:
          "Servicios Logísticos Nicaragua (SERLOG) es una empresa dedicada al transporte y la logística de carga terrestre nacional e internacional, con soluciones integrales para la distribución a la medida de las necesidades de sus clientes. Cuenta con flota propia equipada con GPS para monitoreo en tiempo real, personal especializado y cobertura en Centroamérica y México.",
        services: [
          "Transporte terrestre nacional e internacional",
          "Distribución y transporte primario y secundario",
          "Alquiler de unidades",
          "Outsourcing de personal (estibadores, auxiliares, conductores)",
          "Administración de flotas privadas",
          "Administración de transportistas",
          "Mantenimiento de flotas privadas",
          "Monitoreo GPS y custodia de carga",
        ],
      },
    },
    {
      id: "O4",
      name: "TRANSTAINER · KING OCEAN",
      tier: "oro",
      logo: "/sponsor/transtainer-kingocean.png",
      profile: {
        headline:
          "Dos líderes en logística internacional y transporte marítimo, reunidos en un solo espacio.",
        description:
          "Transtainer y King Ocean Services unen fuerzas para ofrecer una cadena logística integral desde y hacia Centroamérica. Transtainer es un líder regional en agenciamiento de carga, transporte terrestre, agenciamiento aduanero y portuario, almacenamiento y distribución, con presencia en Centroamérica, México y Perú. King Ocean Services, con más de 40 años de experiencia en transporte marítimo, conecta Nicaragua y la región con Estados Unidos, el Caribe, Centroamérica y Sudamérica mediante salidas semanales fijas y servicios FCL, LCL, carga refrigerada, proyectos especiales, vehículos y carga a granel. Juntos brindan una solución de extremo a extremo respaldada por los más altos estándares de seguridad.",
        services: [
          "Agencia de carga aérea, marítima y terrestre",
          "Transporte terrestre y distribución regional",
          "Agenciamiento aduanero y portuario",
          "Almacén, distribución y seguro de carga",
          "Proyectos especiales y carga sobredimensionada",
          "Transporte marítimo FCL y LCL",
          "Carga refrigerada, vehículos y carga a granel",
          "Servicios charter y consolidación de carga",
          "Salidas semanales fijas desde EE. UU., Caribe y Sudamérica",
        ],
        website: "https://transtainer.net/",
        websiteLabel: "Visitar Transtainer",
        socials: [
          { label: "King Ocean", url: "https://kingocean.com/" },
          { label: "LinkedIn", url: "https://www.linkedin.com/company/transtainer-regional/" },
          { label: "Instagram", url: "https://instagram.com/transtainer_" },
          { label: "Facebook", url: "https://www.facebook.com/transtainerregional/" },
        ],
      },
    },
    {
      id: "O5",
      name: "MN GLOBAL",
      tier: "oro",
      logo: "/sponsor/mn-global.png",
      profile: {
        headline:
          "Integramos tu cadena de suministro: sourcing, logística internacional y almacenamiento.",
        description:
          "MNGLOBAL es una empresa nicaragüense especializada en la integración de la cadena de suministro, con 9 años de trayectoria conectando empresas con proveedores y mercados internacionales. Coordina sourcing, abastecimiento, logística internacional, almacenamiento, control de inventarios y distribución bajo un enfoque integral, con hubs logísticos en Panamá, China y Estados Unidos. Más que gestionar el traslado de mercancías, conecta procesos y recursos para mejorar la eficiencia, visibilidad y control de las operaciones de sus clientes, con más de 1,500 clientes y 600 proyectos en 3 continentes.",
        services: [
          "Sourcing de materias primas y maquinaria amarilla",
          "Búsqueda, selección y certificación de proveedores",
          "Seguimiento de fabricación e inspección en origen",
          "Priority Air Cargo (transporte aéreo prioritario)",
          "Transporte terrestre de México a Panamá",
          "Transporte marítimo FCL y LCL",
          "Almacenamiento y gestión de inventarios",
          "Picking, packing y cross-docking",
          "Reacondicionamiento y distribución",
        ],
        website: "https://mnglobal.solutions/",
        websiteLabel: "Visitar sitio web",
        contact: {
          email: "kevin@mnglobal.solutions",
          phones: ["7828-9231"],
        },
      },
    },
    {
      id: "O6",
      name: "ISUZU",
      tier: "oro",
      logo: "/sponsor/isuzu.png",
      profile: {
        headline:
          "Más de 100 años de calidad insuperable en vehículos comerciales y motores diésel.",
        description:
          "ISUZU es una marca global con más de 100 años de experiencia en la fabricación de motores diésel y vehículos comerciales, reconocida por su durabilidad, eficiencia y calidad insuperable. En Nicaragua es distribuida por Grupo El Chele (GEC), un grupo empresarial familiar con más de 35 años de trayectoria en la industria automotriz, comprometido con ofrecer venta, renta, repuestos genuinos, talleres especializados y carrocerías. Su red incluye salas de venta en Managua y Matagalpa, además de un servicio de postventa que acompaña a cada cliente durante toda la vida útil de su vehículo.",
        services: [
          "Venta de camiones, camionetas y vehículos comerciales Isuzu",
          "Pick-ups, SUVs y flotas para uso comercial",
          "Renta de vehículos y flotas corporativas (GEC Flex)",
          "Talleres de mantenimiento y reparación especializados",
          "Repuestos genuinos y accesorios originales",
          "Fabricación y adaptación de carrocerías",
          "Asesoría comercial y opciones de financiamiento",
          "Respaldo de postventa y garantía",
        ],
        website: "https://grupo-gec.com/",
        websiteLabel: "Visitar Grupo GEC",
        socials: [
          { label: "Instagram", url: "https://www.instagram.com/grupoelchele_" },
          { label: "LinkedIn", url: "https://www.linkedin.com/company/grupo-el-chele" },
        ],
        contact: {
          manager: "Grupo El Chele (GEC)",
          email: "GEC@grupoelchele.com",
        },
      },
    },
    {
      id: "P1",
      name: "ADENICA",
      tier: "plata",
      logo: "/sponsor/adenica.png",
      profile: {
        headline: "Solución integral de logística aduanera y comercio internacional. Visibilidad total, riesgo cero.",
        description:
          "ADENICA es un operador logístico con un equipo altamente especializado en operaciones logísticas, legislación aduanera y regímenes aplicables a importaciones y exportaciones. Acompaña a las empresas en cada etapa de su cadena de suministro con soluciones integrales para Nicaragua, Costa Rica, Guatemala, El Salvador y Panamá, garantizando eficiencia y cumplimiento normativo.",
        services: [
          "Agenciamiento Aduanal Integral",
          "Freight Forward",
          "Almacén Fiscal (In Bond)",
          "Asesoría Legal Aduanera",
          "Administración de Inventarios (3PL)",
          "Comercio Internacional",
        ],
        website: "https://adenica.com/",
      },
    },
    {
      id: "O3",
      name: "IAMMSA",
      tier: "aliado",
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