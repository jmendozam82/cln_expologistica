import type { CountryCode } from "@/components/CountryFlag";

export interface Leader {
  id: string;
  name: string;
  clnRole: string;
  role: string;
  company: string;
  country: string;
  countryCode: CountryCode;
  experienceLabel: string;
  photo: string;
  linkedin: string;
  bio: string;
  education: string[];
  certifications: string[];
  specialties: string[];
}

export const CLN_LEADERS: Leader[] = [
  {
    id: "edwin-cervantes",
    name: "Edwin Cervantes Cruz",
    clnRole: "Líder Principal · CLN",
    role: "Gerente Sr. de Operaciones Consumo y Farma · Líder de Gestión de Proyectos e Innovación Estratégica",
    company: "DICEGSA",
    country: "Managua, Nicaragua",
    countryCode: "NI",
    experienceLabel: "+20 años de experiencia",
    photo: "/images/lider_edwin.png",
    linkedin: "https://www.linkedin.com/in/edwin-cervantes-cruz-950a6249/",
    bio: "Ejecutivo con más de 20 años de experiencia en la cadena de valor, operaciones, logística de consumo masivo, logística farmacéutica, retail y dirección de proyectos estratégicos. Actualmente se desempeña como Gerente Sr. de Operaciones Consumo y Farma y Líder de Gestión de Proyectos e Innovación Estratégica en DICEGSA, con trayectoria previa como Gerente de Abastecimiento y Transporte en Café Soluble y en operaciones logísticas en British American Tobacco. Ha liderado implementaciones de WMS (Viastore, Infor, Oracle, UNIGIS), TMS, modelos S&OP y reingeniería de CEDIS, respaldado por benchmarks en más de 30 centros de distribución en Latinoamérica.",
    education: [
      "MBA en Administración de Empresas, Gestión y Operaciones · UNICIT",
      "Evaluación y Rediseño Estratégico de la Cadena de Valor & S&OP · APICS",
    ],
    certifications: [
      "CLTD · Certified in Logistics, Transportation & Distribution",
      "Lean Project Management · Pontificia Universidad Católica de Chile",
      "CPMS · Certified Project Manager",
      "Scrum Master · OSFC",
    ],
    specialties: [
      "Operaciones Consumo & Farma",
      "Implementación WMS / TMS",
      "S&OP y Reingeniería CEDIS",
      "Gestión de Proyectos & Lean",
    ],
  },
  {
    id: "cesar-escobar",
    name: "César Augusto Escobar García",
    clnRole: "Líder · CLN",
    role: "Gerente de Cadena de Suministro",
    company: "DICEGSA",
    country: "Managua, Nicaragua",
    countryCode: "NI",
    experienceLabel: "+25 años de experiencia",
    photo: "/images/lider_cesar.png",
    linkedin: "https://www.linkedin.com/in/cesar-augusto-escobar-garcia-78957967/",
    bio: "Ingeniero Industrial con más de 25 años de trayectoria en administración de operaciones, logística y gestión integral de la cadena de abastecimiento en los sectores farmacéutico y de consumo masivo en Nicaragua. Desde 2017 es Gerente de Cadena de Suministro en DICEGSA, liderando de punta a punta compras locales, importaciones, planificación de demanda e inventarios, almacenamiento y distribución en rutas locales, regionales y canal farmacia. Previamente ejerció gerencias de operaciones en DICEGSA, COFASA y Laboratorios Solka.",
    education: [
      "Ingeniero Industrial (Logística, Materiales y Supply Chain) · Universidad Nacional de Ingeniería (UNI)",
    ],
    certifications: [
      "S&OP 360° · Puente entre la estrategia y la ejecución · MHMS Latam",
      "Analítica para la Optimización de Operaciones y Cadenas de Suministro · INCAE Business School",
    ],
    specialties: [
      "Supply Chain End-to-End",
      "Planificación de Demanda e Inventarios",
      "Distribución Nacional & Canal Farmacia",
      "S&OP 360°",
    ],
  },
];

