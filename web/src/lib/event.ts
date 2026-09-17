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
    title: "Conferencias Magistrales + Ponencias de Alto Nivel",
    tag: "Aprender",
    subtitle: "Ideas globales. Impacto en nuestra realidad.",
    description: "Speakers internacionales y nacionales compartirán perspectivas, tendencias y experiencias para enfrentar los nuevos desafíos de Supply Chain en Nicaragua y la región.",
    href: "/ponentes",
    cta: "Conocer speakers →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card1-scaled.jpeg",
  },
  {
    title: "Sponsors + \nSoluciones",
    tag: "Conectar",
    subtitle: "Soluciones para transformar la operación.",
    description: "Conoce empresas nacionales e internacionales que presentarán tecnología, servicios y soluciones para responder a los desafíos reales de nuestra logística actual y futura.",
    href: "/patrocinadores",
    cta: "Conocer sponsors →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card3-scaled.jpeg",
  },
  {
    title: "Experiencia CLN  + \nNetworking",
    tag: "Compartir",
    subtitle: "El conocimiento crece cuando lo compartimos.",
    description: "Celebramos lo construido durante 2026. Compartimos aprendizajes y nuevas conexiones. Miramos hacia las oportunidades que vienen. Identificamos los desafíos que marcarán el camino. Conectamos hoy con la logística de 2027.",
    href: "/registro",
    cta: "Ser parte de CLN →",
    photo: "https://nilogistic.com/wp-content/uploads/2026/09/card7-scaled.jpeg",
  },
];
