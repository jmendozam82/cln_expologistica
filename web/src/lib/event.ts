export const EVENT_NAME = "EXPO LOGÍSTICA · CLN · 2026";
export const EVENT_NAME_SHORT = "EXPO LOGÍSTICA · CLN · 2026";
export const EVENT_SLOGAN = "El gran encuentro anual de la Comunidad Logística Nicaragüense";
export const EVENT_TAGLINE = "La logística de Nicaragua y Centroamérica se encuentra aquí";
export const EVENT_DATE_LONG = "20 de noviembre 2026";
export const EVENT_DATE_SHORT = "20 de nov";
export const EVENT_DAY_LABEL = "Viernes 20 de noviembre 2026";
export const EVENT_TIME = "8:00 a.m. – 6:00 p.m.";
export const EVENT_LOCATION = "DoubleTree by Hilton Managua";
export const EVENT_CITY = "Managua, Nicaragua";
export const EVENT_START_ISO = "2026-11-20T08:00:00";
export const EVENT_MOTTO = "APRENDER · CONECTAR · COMPARTIR";
export const EVENT_HASHTAG = "#SoyCLN";
export const CLN_SLOGAN = "Conectando Profesionales, Potenciando la Logística.";

export interface EventHighlight {
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  photo?: string;
}

export const EVENT_HIGHLIGHTS: EventHighlight[] = [
  {
    title: "Conferencias Magistrales",
    tag: "Aprender",
    subtitle: "Ideas globales. Impacto en nuestra realidad.",
    description: "Speakers internacionales compartirán perspectivas, tendencias y experiencias para enfrentar los nuevos desafíos de Supply Chain en Nicaragua y la región.",
    href: "/ponentes",
    cta: "Conocer speakers →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card1-scaled.jpeg",
  },
  {
    title: "Supply Chain End to End",
    tag: "Aprender",
    subtitle: "Toda la cadena. Una misma conversación.",
    description: "Contenido que conecta estrategia, operaciones, abastecimiento, almacenamiento, transporte, distribución, comercio exterior, tecnología e innovación.",
    href: "/agenda",
    cta: "Explorar la agenda →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card2-scaled.jpeg",
  },
  {
    title: "Sponsors & Solutions",
    tag: "Conectar",
    subtitle: "Soluciones para transformar la operación.",
    description: "Conoce empresas nacionales e internacionales que presentarán tecnología, servicios y soluciones para responder a los desafíos reales de nuestra logística.",
    href: "/patrocinadores",
    cta: "Conocer sponsors →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card3-scaled.jpeg",
  },
  {
    title: "Networking",
    tag: "Conectar",
    subtitle: "Las mejores conexiones comienzan con una conversación.",
    description: "Conecta con líderes, ejecutivos, profesionales, proveedores y tomadores de decisión de diferentes eslabones de la cadena.",
    href: "/agenda",
    cta: "Quiero conectar →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card4-scaled.jpeg",
  },
  {
    title: "Experiencia CLN",
    tag: "Compartir",
    subtitle: "El conocimiento crece cuando lo compartimos.",
    description: "Experiencias, conversaciones, aprendizajes y nuevas perspectivas dentro de una comunidad que trabaja por fortalecer la logística de Nicaragua.",
    href: "/registro",
    cta: "Ser parte de CLN →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card5-scaled.jpeg",
  },
  {
    title: "Cóctel de Cierre",
    tag: "Conectar · Compartir",
    subtitle: "Termina la agenda. Continúan las conexiones.",
    description: "Celebremos lo construido en 2026 y conectemos con las oportunidades y desafíos que definirán nuestra logística en 2027.",
    href: "/agenda",
    cta: "Descubrir la experiencia →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card6-scaled.jpeg",
  },
];