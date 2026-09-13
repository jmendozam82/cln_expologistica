export const EVENT_NAME = "EXPO LOGÍSTICA 2026 · CLN";
export const EVENT_NAME_SHORT = "EXPO LOGÍSTICA 2026";
export const EVENT_SLOGAN = "El gran encuentro anual de la Comunidad Logística Nicaragüense";
export const EVENT_TAGLINE = "La Logística de alto nivel de Nicaragua y C.A se encuentra aquí";
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
    tag: "Conferencias",
    subtitle: "Expertos de talla internacional",
    description: "Ponentes internacionales con visión estratégica para la cadena de suministro de Nicaragua y la región.",
    href: "/ponentes",
    cta: "Conocer ponentes →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card1-scaled.jpeg",
  },
  {
    title: "Supply Chain End to End",
    tag: "Agenda",
    subtitle: "Tendencias que marcan el sector",
    description: "Temas y tendencias para toda la cadena logística: de los retos operativos a las decisiones de alto nivel.",
    href: "/agenda",
    cta: "Ver la agenda →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card2-scaled.jpeg",
  },
  {
    title: "Sponsors presentando soluciones",
    tag: "Patrocinadores",
    subtitle: "Aliados con soluciones reales",
    description: "Empresas aliadas mostrando soluciones reales para la logística de Nicaragua y Centroamérica.",
    href: "/patrocinadores",
    cta: "Ver patrocinadores →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card3-scaled.jpeg",
  },
  {
    title: "Espacios de Networking",
    tag: "Networking",
    subtitle: "Conexiones de alto valor",
    description: "Conexiones profesionales con líderes, proveedores y tomadores de decisión del ecosistema logístico.",
    href: "/agenda",
    cta: "Ver el programa →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card4-scaled.jpeg",
  },
  {
    title: "Premios que pueden ser tuyos",
    tag: "Premios",
    subtitle: "Sorteos y sorpresas durante la jornada",
    description: "Sorteos y reconocimientos dentro de la jornada para los congresistas presentes.",
    href: "/registro",
    cta: "Asegurar mi acceso →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card5-scaled.jpeg",
  },
  {
    title: "Cóctel de cierre",
    tag: "Cóctel",
    subtitle: "Celebrando los logros 2026",
    description: "Celebrar los logros 2026 y conectar con los retos que vienen, en un ambiente ejecutivo.",
    href: "/agenda",
    cta: "Ver el programa →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card6-scaled.jpeg",
  },
];