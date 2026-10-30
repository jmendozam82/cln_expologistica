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
  time: string;
  confirmed: boolean;
  photo?: string;
  linkedin?: string;
}

export const SPEAKERS: Speaker[] = [
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
    time: "9:00 – 9:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/yar-kairo-quezada/",
  },
  {
    id: "oscar",
    name: "Oscar Soto Bravo",
    role: "Gerente de Operaciones Logística",
    company: "Grupo CCN",
    country: "Nicaragua",
    bio: "Ejecutivo nicaragüense con amplia trayectoria en logística, cadena de suministro y operaciones comerciales en las industrias de distribución y retail. Actualmente se desempeña como Gerente de Operaciones Logística en Grupo CCN. Cuenta con experiencia en el diseño de centros de distribución y la implementación de WMS y ERP, así como una Maestría en Administración de Empresas (MBA) por INCAE Business School. Se especializa en la integración de procesos, la eficiencia operativa y la construcción de ejecuciones logísticas Best-in-Class.",
    photo: "/speaker/oscar_soto.png",
    session: "Conferencia · Salón Mambacho",
    topic: "De la Última Milla a la Última Experiencia",
    topicSubtitle: "Cómo construir una ejecución logística Best-in-Class.",
    time: "9:00 – 9:50 a.m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/oscar-soto-bravo-58141560/",
  },
  {
    id: "liczy",
    name: "Liczy Pallares",
    role: "Especialista en Material Handling y Soluciones de Almacenaje",
    company: "3D Storage Systems by Euroroll",
    country: "Canadá · Cobertura LATAM",
    bio: "Profesional internacional con más de 25 años de experiencia en material handling, ventas y gestión, especializada en optimizar operaciones, mejorar la eficiencia y impulsar el crecimiento de los negocios. Su trayectoria abarca liderazgo de equipos, relaciones con clientes y optimización de procesos de supply chain. Actualmente forma parte de 3D Storage Systems (Euroroll), donde impulsa soluciones de almacenaje para México, Centroamérica y Sudamérica.",
    photo: "/speaker/liczy.png",
    session: "Magistral · Salón Mambacho",
    topic: "Del Almacén Tradicional al Almacén Smart",
    topicSubtitle: "Tecnología, automatización y decisiones para evolucionar sin sobredimensionar la inversión.",
    time: "11:00 a.m. – 12:00 m.",
    confirmed: true,
    linkedin: "https://www.linkedin.com/in/liczy-pallares-95436741/",
  },
];

export function getSpeakerByName(name: string): Speaker | undefined {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return undefined;
  return SPEAKERS.find((s) => s.name.toLowerCase() === normalized);
}
