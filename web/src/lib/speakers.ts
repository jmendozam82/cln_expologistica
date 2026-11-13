import type { CountryCode } from "@/components/CountryFlag";

export interface Speaker {
  id: string;
  name: string;
  aliases?: string[];
  role: string;
  company: string;
  country?: string;
  countryCode: CountryCode;
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
    id: "edison",
    name: "Edison Salazar",
    aliases: ["Edison A. Salazar"],
    role: "InfoLink Sr. Sales Advisor Manager · LATAM",
    company: "Crown Equipment Corporation",
    country: "Estados Unidos · Cobertura LATAM",
    countryCode: "US",
    bio: "Ejecutivo con más de 17 años de experiencia liderando estrategia, innovación y desarrollo de soluciones tecnológicas consultivas para Latinoamérica en logística, manejo de materiales, manufactura, transporte y supply chain. Actualmente se desempeña como InfoLink Sr. Sales Advisor Manager para Latinoamérica en Crown Equipment Corporation, con trayectoria previa en liderazgo de producto y desarrollo de negocios en Brock Solutions, ORBCOMM y Hitachi America. Especialista en IIoT, analítica avanzada, machine learning e inteligencia artificial aplicados a activos autónomos y operaciones inteligentes. Posee un MBA por la Universidad Tecnológica Indoamérica.",
    photo: "/speaker/Edison_Salazar.png",
    session: "Conferencia · Salón Mombacho",
    topic: "La Nueva Era de la Inteligencia Operativa",
    time: "8:45 – 9:30 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/edison-salazar/",
  },
  {
    id: "oscar",
    name: "Oscar Soto Bravo",
    role: "Gerente de Operaciones Logística",
    company: "Grupo CCN",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Ejecutivo nicaragüense con amplia trayectoria en logística, cadena de suministro y operaciones comerciales en las industrias de distribución y retail. Actualmente se desempeña como Gerente de Operaciones Logística en Grupo CCN. Cuenta con experiencia en el diseño de centros de distribución y la implementación de WMS y ERP, así como una Maestría en Administración de Empresas (MBA) por INCAE Business School. Se especializa en la integración de procesos, la eficiencia operativa y la construcción de ejecuciones logísticas Best-in-Class.",
    photo: "/speaker/oscar_soto.png",
    session: "Conferencia · Salón Mombacho",
    topic: "De la Última Milla a la Última Experiencia",
    topicSubtitle: "Cómo construir una ejecución logística Best-in-Class.",
    time: "9:30 – 10:20 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/oscar-soto-bravo-58141560/",
  },
  {
    id: "kairo",
    name: "Kairo Quezada",
    role: "Jefe de Seguridad de la Información (CISO)",
    company: "Auditor Líder ISO 27001 · ISO 22301",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Profesional nicaragüense especializado en seguridad de la información, gestión de riesgos tecnológicos y continuidad de negocio, con trayectoria en el Banco Central de Nicaragua y el sector privado. Auditor líder en ISO 27001, ISO 22301, ISO 9001 e ISO 45001, lidera la implementación de sistemas de gestión de seguridad y continuidad operativa en organizaciones de la región.",
    photo: "/speaker/kairo.png",
    session: "Conferencia · Salón Momotombo",
    topic: "Supply Chain Blindada: Ciberseguridad y Continuidad Operativa en la Logística Digital",
    topicSubtitle: "Qué ocurre cuando WMS, TMS, ERP, GPS o proveedores tecnológicos dejan de funcionar.",
    time: "9:30 – 10:20 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/yar-kairo-quezada/",
  },
  {
    id: "liczy",
    name: "Liczy Pallares",
    role: "Especialista en Material Handling y Soluciones de Almacenaje",
    company: "3D Storage Systems by Euroroll",
    country: "Canadá · Cobertura LATAM",
    countryCode: "CA",
    bio: "Profesional internacional con más de 25 años de experiencia en material handling, ventas y gestión, especializada en optimizar operaciones, mejorar la eficiencia y impulsar el crecimiento de los negocios. Su trayectoria abarca liderazgo de equipos, relaciones con clientes y optimización de procesos de supply chain. Actualmente forma parte de 3D Storage Systems (Euroroll), donde impulsa soluciones de almacenaje para México, Centroamérica y Sudamérica.",
    photo: "/speaker/liczy.png",
    session: "Magistral · Salón Mombacho",
    topic: "Del Almacén Tradicional al Almacén Smart",
    topicSubtitle: "Tres expertos internacionales desde Canadá, Colombia y México, con experiencia en proyectos de automatización e intralogística en LATAM y Europa.",
    time: "10:50 – 11:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/liczy-pallares-95436741/",
  },
  {
    id: "raul",
    name: "Raúl López Jiménez",
    aliases: ["Raúl López"],
    role: "Director General",
    company: "IAMMSA · Ingeniería Aplicada en Manejo de Materiales",
    country: "México",
    countryCode: "MX",
    bio: "Director General de Ingeniería Aplicada en Manejo de Materiales, S.A. de C.V. (IAMMSA), con más de 27 años de trayectoria liderando proyectos de intralogística, equipamiento de almacenes, sistemas de almacenaje industrial, manejo de materiales y eficiencia operativa en México y Latinoamérica.",
    photo: "/speaker/raul_lopez.jpg",
    session: "Magistral · Salón Mombacho",
    topic: "Del Almacén Tradicional al Almacén Smart",
    topicSubtitle: "Tres expertos internacionales desde Canadá, Colombia y México, con experiencia en proyectos de automatización e intralogística en LATAM y Europa.",
    time: "10:50 – 11:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/raul-l%C3%B3pez-jim%C3%A9nez-908406b0/",
  },
  {
    id: "juan-gaviria",
    name: "Juan Felipe Gaviria Gómez",
    aliases: ["Juan Gaviria", "Juan Felipe Gaviria"],
    role: "Director Comercial · Gerente General",
    company: "MATEC SAS · SOLUMAT",
    country: "Colombia",
    countryCode: "CO",
    bio: "Ingeniero Mecánico por la Universidad EAFIT con más de 18 años de experiencia ayudando a empresas en Latinoamérica a diseñar operaciones logísticas más productivas mediante automatización, ingeniería e integración tecnológica. Como Director Comercial en MATEC SAS y Gerente General en SOLUMAT, lidera proyectos de automatización para centros de distribución, manufactura, retail y paquetería —integrando sistemas de transporte, almacenamiento, picking, clasificación, robótica y manejo de materiales— con enfoque en ROI medible, seguridad, escalabilidad y continuidad operativa.",
    photo: "/speaker/Juan_Gaviria.png",
    session: "Magistral · Salón Mombacho",
    topic: "Del Almacén Tradicional al Almacén Smart",
    topicSubtitle: "Tres expertos internacionales desde Canadá, Colombia y México, con experiencia en proyectos de automatización e intralogística en LATAM y Europa.",
    time: "10:50 – 11:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/juan-felipe-gaviria-g%C3%B3mez-85ab70242/",
  },
  {
    id: "carlos",
    name: "Carlos Moreno",
    role: "Director de Movilidad y Logística",
    company: "SIECA · Secretaría de Integración Económica Centroamericana",
    country: "Guatemala · Centroamérica",
    countryCode: "GT",
    bio: "Economista con Maestría en Economía por la Universidad de Chicago y una amplia trayectoria en integración económica, transporte y logística regional. Actualmente es Director de Movilidad y Logística de la SIECA, desde donde impulsa la Política Marco Regional y el Plan Maestro Regional de Movilidad y Logística 2035. Fue Director Ejecutivo para la Movilidad y Logística y Gerente de Desarrollo y Planificación Institucional en el Ministerio de Obras Públicas de El Salvador, Director de Política Comercial en el Ministerio de Economía y especialista del BID. También ha integrado consejos directivos del Banco Central de Reserva, OSARTEC y la Superintendencia de Competencia de El Salvador.",
    photo: "/speaker/carlos_moreno.jpg",
    session: "Conferencia · Salón Mombacho",
    topic: "Movilidad y Logística Regional 2035",
    topicSubtitle: "Una visión estratégica sobre integración centroamericana, infraestructura, conectividad, corredores logísticos, facilitación del comercio y competitividad regional.",
    abstract: "Para los ejecutivos y líderes logísticos, conocer estos avances significa comprender mejor los cambios que pueden impactar las decisiones operativas, comerciales y de inversión de nuestras organizaciones.",
    time: "1:15 – 2:00 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/carlos-alberto-moreno-carmona-58175128/",
  },
  {
    id: "moises",
    name: "Moisés Núñez Balladares",
    role: "Director General",
    company: "MNGLOBAL",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Nicaragüense con más de 15 años de experiencia en gestión de cadenas de suministro, desarrollo comercial, retail y operaciones logísticas. Desde 2017 es Director General de MNGLOBAL, donde lidera la dirección estratégica y operativa de la cadena de suministro con enfoque en compras internacionales, logística, almacenamiento y distribución, gestionando operaciones entre centros logísticos en Estados Unidos, China, Panamá y Nicaragua. Su trayectoria abarca planificación estratégica, previsión de demanda, optimización de procesos y operaciones especializadas de carga aérea y transporte marítimo FCL y LCL. Su visión empresarial integra sourcing, logística y almacenamiento bajo un modelo orientado a optimizar recursos, fortalecer la competitividad y garantizar un flujo eficiente de mercancías.",
    photo: "/speaker/moises.png",
    session: "Conferencia · Salón Momotombo",
    topic: "Torre de Control Logística: De Datos Dispersos a Decisiones en Tiempo Real",
    topicSubtitle: "Cómo integrar información para lograr visibilidad End-to-End de la Supply Chain.",
    time: "1:15 – 2:00 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/moises-nu%C3%B1ez-balladares-25002b39/",
  },
  {
    id: "damaris",
    name: "Damarís Ramos",
    aliases: ["Damaris Ramos"],
    role: "Gerente Administrativa y Capital Humano",
    company: "Laboratorios Ceguel",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Ejecutiva nicaragüense con más de 20 años de trayectoria en administración, gestión estratégica del talento humano y desarrollo organizacional en Nicaragua y Panamá. Desde 2014 se desempeña como Gerente Administrativa y de Capital Humano en Laboratorios Ceguel, y anteriormente lideró áreas de selección, capacitación y gestión humana en la Universidad Americana (UAM), Automarket Limited / ESSO Nicaragua y Carnes de Coclé. Cuenta con especialidad en Gestión Estratégica de Recursos Humanos por ADEN Business School y certificación internacional en Gestión Humana por Competencias.",
    photo: "/speaker/Damaris_Ramos.png",
    session: "Foro Ejecutivo · Salón Mombacho",
    topic: "Foro Ejecutivo | IA en Logística: Entender, Aplicar, Anticipar",
    time: "2:00 – 2:45 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/damaris-ramos-00972029/",
  },
  {
    id: "allember",
    name: "Allember Palacios",
    role: "Consultor en Transformación e IA · Project Manager",
    company: "Ultravalores de Nicaragua, S.A.",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Ingeniero en Computación por la UNI, con MBA con especialidad en Finanzas por la UCA y certificación internacional PMP®, con más de 15 años liderando proyectos de tecnología, automatización e inteligencia artificial orientados a productividad, rentabilidad y continuidad operativa. Actualmente es Project Manager en Ultravalores de Nicaragua y consultor en transformación e IA, con experiencia previa en implementación de WMS/ERP en E. Chamorro Industrial, liderazgo de desarrollo TI en VERSATEC y como Vicepresidente del PMI Capítulo Nicaragua.",
    photo: "/speaker/Allember_Palacios.png",
    session: "Foro Ejecutivo · Salón Mombacho",
    topic: "Foro Ejecutivo | IA en Logística: Entender, Aplicar, Anticipar",
    time: "2:00 – 2:45 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/allember/",
  },
  {
    id: "miguel",
    name: "Miguel Baltodano",
    role: "Gerente en Entrenamiento de Cadena de Suministro",
    company: "Compañía Cervecera de Nicaragua S.A.",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Especialista en Supply Chain, Business Intelligence y gestión de proyectos con más de 10 años de trayectoria en Compañía Cervecera de Nicaragua S.A., liderando analítica avanzada, modelos de simulación, mejora de procesos y toma de decisiones basada en datos. Posee un Máster en Supply Chain Management & Logistics por EAE Business School, MicroMaster en Supply Chain Management por MITx y certificación Lean Six Sigma Black Belt. Además, es profesor adjunto de posgrado en Análisis de Datos y Cadena de Suministros en Universidad Thomas More y UAM College.",
    photo: "/speaker/Miguel_Baltodano.png",
    session: "Foro Ejecutivo · Salón Mombacho",
    topic: "Foro Ejecutivo | IA en Logística: Entender, Aplicar, Anticipar",
    time: "2:00 – 2:45 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/mbaltodanop/",
  },
  {
    id: "yahoska",
    name: "Yahoska Espino",
    aliases: ["Yaoska Espino"],
    role: "Gerente Comercial",
    company: "SERLOG Co. Ltda.",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Ejecutiva comercial en el sector logístico nicaragüense. Actualmente se desempeña como Gerente Comercial en SERLOG Co. Ltda., impulsando soluciones logísticas y relaciones estratégicas con clientes y aliados del ecosistema de cadena de suministro. Participa como moderadora del Foro Ejecutivo «IA en Logística: Entender, Aplicar, Anticipar».",
    photo: "/speaker/Yaoska_Espino.png",
    session: "Moderadora · Foro Ejecutivo · Salón Mombacho",
    topic: "Foro Ejecutivo | IA en Logística: Entender, Aplicar, Anticipar",
    time: "2:00 – 2:45 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/yaoska-espino-95112b15a/",
  },
  {
    id: "antonio",
    name: "Antonio Espinoza Ruiz",
    role: "Gerente de Planeación Estratégica y PMO",
    company: "Industria Farmacéutica · Nicaragua",
    country: "Nicaragua",
    countryCode: "NI",
    bio: "Alto ejecutivo en Estrategia y Arquitectura Organizacional con más de 13 años de experiencia liderando operaciones complejas y transformaciones de negocio en telecomunicaciones, seguros, manufactura y distribución. Actualmente es Gerente de Planeación Estratégica y PMO en una de las principales distribuidoras farmacéuticas de Nicaragua, articulando la estrategia corporativa con la ejecución operativa mediante OKRs, Lean Six Sigma y estándares internacionales ISO 9001, 22301, 27001 y 45001. Ingeniero Industrial, con MBA en Transformación Digital por IEBS Business School (primer lugar de promoción con honores), certificado PMP, Lean Six Sigma Black Belt y experto en Organizaciones Exponenciales. Autor de La Ecuación del Liderazgo, Diálogos con Kahlú, Pasos y Evoluciona o Desaparece.",
    photo: "/speaker/antonio.png",
    session: "Conferencia y Presentación del Libro · Salón Mombacho",
    topic: "Evoluciona o Desaparece",
    topicSubtitle: "Las 10 leyes de la brontosauriedad y por qué las empresas se vuelven irrelevantes.",
    bookTitle: "Evoluciona o Desaparece",
    bookUrl: "https://www.amazon.com/Antonio-Espinoza-Ruiz-ebook/dp/B0GX7L1VL9",
    bookReview: "Las empresas no desaparecen por crisis externas, sino por patrones internos que se niegan a cambiar. Antonio Espinoza Ruiz define la “brontosauriedad organizacional” y expone 10 leyes que explican por qué organizaciones exitosas se vuelven irrelevantes. El libro incluye el Índice de Evolución Empresarial (IEE), una autoevaluación de 50 preguntas para medir la madurez, adaptación y riesgo de estancamiento de una empresa.",
    time: "3:10 – 3:55 p.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/antonio-espinoza-ruiz/",
  },
];

function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getSpeakerByName(name: string): Speaker | undefined {
  const normalized = normalizeName(name);
  if (!normalized) return undefined;
  return SPEAKERS.find(
    (s) =>
      normalizeName(s.name) === normalized ||
      s.aliases?.some((alias) => normalizeName(alias) === normalized)
  );
}
