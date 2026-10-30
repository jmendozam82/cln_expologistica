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
];

export function getSpeakerByName(name: string): Speaker | undefined {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return undefined;
  return SPEAKERS.find((s) => s.name.toLowerCase() === normalized);
}
