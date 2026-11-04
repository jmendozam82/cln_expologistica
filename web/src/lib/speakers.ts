export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  country?: string;
  bio?: string;
  session: string;
  topic: string;
  topicSubtitle?: string;
  abstract?: string;
  bookTitle?: string;
  bookUrl?: string;
  bookReview?: string;
  time: string;
  confirmed: boolean;
  photo?: string;
  linkedin?: string;
}

export const SPEAKERS: Speaker[] = [
  {
    id: "oscar",
    name: "Oscar Soto Bravo",
    role: "Gerente de Operaciones Logística",
    company: "Grupo CCN",
    country: "Nicaragua",
    bio: "Ejecutivo nicaragüense con amplia trayectoria en logística, cadena de suministro y operaciones comerciales en las industrias de distribución y retail. Actualmente se desempeña como Gerente de Operaciones Logística en Grupo CCN. Cuenta con experiencia en el diseño de centros de distribución y la implementación de WMS y ERP, así como una Maestría en Administración de Empresas (MBA) por INCAE Business School. Se especializa en la integración de procesos, la eficiencia operativa y la construcción de ejecuciones logísticas Best-in-Class.",
    photo: "/speaker/oscar_soto.png",
    session: "Conferencia · Salón Mombacho",
    topic: "De la Última Milla a la Última Experiencia",
    topicSubtitle: "Cómo construir una ejecución logística Best-in-Class.",
    time: "9:00 – 9:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/oscar-soto-bravo-58141560/",
  },
  {
    id: "kairo",
    name: "Kairo Quezada",
    role: "Jefe de Seguridad de la Información (CISO)",
    company: "Auditor Líder ISO 27001 · ISO 22301",
    country: "Nicaragua",
    bio: "Profesional nicaragüense especializado en seguridad de la información, gestión de riesgos tecnológicos y continuidad de negocio, con trayectoria en el Banco Central de Nicaragua y el sector privado. Auditor líder en ISO 27001, ISO 22301, ISO 9001 e ISO 45001, lidera la implementación de sistemas de gestión de seguridad y continuidad operativa en organizaciones de la región.",
    photo: "/speaker/kairo.png",
    session: "Conferencia · Salón Momotombo",
    topic: "Supply Chain Blindada: Ciberseguridad y Continuidad Operativa en la Logística Digital",
    topicSubtitle: "Qué ocurre cuando WMS, TMS, ERP, GPS o proveedores tecnológicos dejan de funcionar.",
    time: "9:30 – 10:30 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/yar-kairo-quezada/",
  },
  {
    id: "antonio",
    name: "Antonio Espinoza Ruiz",
    role: "Director de PMO y Sistemas de Gestión",
    company: "Industria Farmacéutica · Nicaragua",
    country: "Nicaragua",
    bio: "Alto ejecutivo en Estrategia y Arquitectura Organizacional con más de 13 años de experiencia liderando operaciones complejas y transformaciones de negocio en telecomunicaciones, seguros, manufactura y distribución. Actualmente es Director de PMO y Sistemas de Gestión en una de las principales distribuidoras farmacéuticas de Nicaragua, articulando la estrategia corporativa con la ejecución operativa mediante OKRs, Lean Six Sigma y estándares internacionales ISO 9001, 22301, 27001 y 45001. Ingeniero Industrial, con MBA en Transformación Digital por IEBS Business School (primer lugar de promoción con honores), certificado PMP, Lean Six Sigma Black Belt y experto en Organizaciones Exponenciales. Autor de La Ecuación del Liderazgo, Diálogos con Kahlú, Pasos y Evoluciona o Desaparece.",
    photo: "/speaker/antonio.png",
    session: "Conferencia y Presentación del Libro · Salón Mombacho",
    topic: "Evoluciona o desaparece",
    topicSubtitle: "Las 10 leyes de la brontosauriedad y por qué las empresas se vuelven irrelevantes.",
    bookTitle: "Evoluciona o desaparece",
    bookUrl: "https://www.amazon.com/Antonio-Espinoza-Ruiz-ebook/dp/B0GX7L1VL9",
    bookReview: "Las empresas no desaparecen por crisis externas, sino por patrones internos que se niegan a cambiar. Antonio Espinoza Ruiz define la “brontosauriedad organizacional” y expone 10 leyes que explican por qué organizaciones exitosas se vuelven irrelevantes. El libro incluye el Índice de Evolución Empresarial (IEE), una autoevaluación de 50 preguntas para medir la madurez, adaptación y riesgo de estancamiento de una empresa.",
    time: "9:50 – 10:30 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/antonio-espinoza-ruiz/",
  },
  {
    id: "liczy",
    name: "Liczy Pallares",
    role: "Especialista en Material Handling y Soluciones de Almacenaje",
    company: "3D Storage Systems by Euroroll",
    country: "Canadá · Cobertura LATAM",
    bio: "Profesional internacional con más de 25 años de experiencia en material handling, ventas y gestión, especializada en optimizar operaciones, mejorar la eficiencia y impulsar el crecimiento de los negocios. Su trayectoria abarca liderazgo de equipos, relaciones con clientes y optimización de procesos de supply chain. Actualmente forma parte de 3D Storage Systems (Euroroll), donde impulsa soluciones de almacenaje para México, Centroamérica y Sudamérica.",
    photo: "/speaker/liczy.png",
    session: "Magistral · Salón Mombacho",
    topic: "Del Almacén Tradicional al Almacén Smart",
    topicSubtitle: "Tecnología, automatización y decisiones para evolucionar sin sobredimensionar la inversión.",
    time: "11:00 a.m. – 12:00 m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/liczy-pallares-95436741/",
  },
  {
    id: "carlos",
    name: "Carlos Moreno",
    role: "Director de Movilidad y Logística",
    company: "SIECA · Secretaría de Integración Económica Centroamericana",
    country: "Guatemala · Centroamérica",
    bio: "Economista con Maestría en Economía por la Universidad de Chicago y una amplia trayectoria en integración económica, transporte y logística regional. Actualmente es Director de Movilidad y Logística de la SIECA, desde donde impulsa la Política Marco Regional y el Plan Maestro Regional de Movilidad y Logística 2035. Fue Director Ejecutivo para la Movilidad y Logística y Gerente de Desarrollo y Planificación Institucional en el Ministerio de Obras Públicas de El Salvador, Director de Política Comercial en el Ministerio de Economía y especialista del BID. También ha integrado consejos directivos del Banco Central de Reserva, OSARTEC y la Superintendencia de Competencia de El Salvador.",
    photo: "/speaker/carlos_moreno.jpg",
    session: "Conferencia · Salón Mombacho",
    topic: "Movilidad y Logística Regional 2035",
    topicSubtitle: "Una visión estratégica sobre integración centroamericana, infraestructura, conectividad, corredores logísticos, facilitación del comercio y competitividad regional.",
    abstract: "Para los ejecutivos y líderes logísticos, conocer estos avances significa comprender mejor los cambios que pueden impactar las decisiones operativas, comerciales y de inversión de nuestras organizaciones.",
    time: "1:30 – 2:10 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/carlos-alberto-moreno-carmona-58175128/",
  },
  {
    id: "moises",
    name: "Moisés Núñez Balladares",
    role: "Director General",
    company: "MNGLOBAL",
    country: "Nicaragua",
    bio: "Nicaragüense con más de 15 años de experiencia en gestión de cadenas de suministro, desarrollo comercial, retail y operaciones logísticas. Desde 2017 es Director General de MNGLOBAL, donde lidera la dirección estratégica y operativa de la cadena de suministro con enfoque en compras internacionales, logística, almacenamiento y distribución, gestionando operaciones entre centros logísticos en Estados Unidos, China, Panamá y Nicaragua. Su trayectoria abarca planificación estratégica, previsión de demanda, optimización de procesos y operaciones especializadas de carga aérea y transporte marítimo FCL y LCL. Su visión empresarial integra sourcing, logística y almacenamiento bajo un modelo orientado a optimizar recursos, fortalecer la competitividad y garantizar un flujo eficiente de mercancías.",
    photo: "/speaker/moises.png",
    session: "Conferencia · Salón Momotombo",
    topic: "Torre de Control Logística: de Datos Dispersos a Decisiones en Tiempo Real",
    topicSubtitle: "Cómo integrar información para lograr visibilidad End-to-End de la Supply Chain.",
    time: "1:30 – 2:10 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/moises-nu%C3%B1ez-balladares-25002b39/",
  },
];

export function getSpeakerByName(name: string): Speaker | undefined {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return undefined;
  return SPEAKERS.find((s) => s.name.toLowerCase() === normalized);
}
