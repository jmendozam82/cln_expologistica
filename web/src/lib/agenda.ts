import type { CSSProperties } from "react";

export type SlotKind =
  | "plenary"        // Registro, Apertura, Cierre
  | "magistral"      // Sesión Magistral (Mombacho)
  | "break"          // Coffee Breaks (Télica)
  | "almuerzo"       // Almuerzo (Momotombo)
  | "cierre"         // Cóctel de cierre (Momotombo)
  | "reconocimiento" // Actividad Patrocinadores
  | "panel"          // Foro Ejecutivo (Mombacho)
  | "conferencia"    // Conferencia regular
  | "empty";         // Celda vacía

export interface SpeakerEntry {
  name: string;
  /** Texto opcional para mostrar junto al nombre (ej. "Carlos Moreno - SIECA") sin alterar el lookup de perfil. */
  displayName?: string;
}

export interface Cell {
  kind: SlotKind;
  title?: string;
  sub?: string;
  speakers?: (string | SpeakerEntry)[];
  moderator?: string;
  time?: string;
  badge?: string;
  salonLabel?: string;
  empty?: boolean;
}

export interface TimeSlot {
  time: string;
  mombacho: Cell;
  momotombo: Cell;
  /** Sesión transversal a ambos tracks (ej. Coffee break en Salón Télica). */
  shared?: Cell;
}

export const EMPTY_CELL: Cell = { kind: "empty", empty: true };

export const SALON_META = {
  mombacho: {
    label: "Salón Mombacho",
    track: "OPERATIONS & TECHNOLOGY",
    headerBg: "bg-cln-900",
    borderL: "border-l-cln-900",
    trackColor: "text-cln-900",
    trackStyle: { color: "var(--color-cln-200)" } as CSSProperties,
  },
  momotombo: {
    label: "Salón Momotombo",
    track: "BUSINESS & RESILIENCE",
    headerBg: "bg-cln-700",
    borderL: "border-l-cln-700",
    trackColor: "text-cln-700",
    trackStyle: { color: "var(--color-cln-100)" } as CSSProperties,
  },
} as const;

export type SalonKey = keyof typeof SALON_META;

export const AGENDA_SLOTS: TimeSlot[] = [
  {
    time: "7:30 – 8:30 a.m.",
    mombacho: { kind: "plenary", title: "Registro de asistentes" },
    momotombo: EMPTY_CELL,
  },
  {
    time: "8:30 – 8:45 a.m.",
    mombacho: { kind: "plenary", title: "Apertura", sub: "EXPO LOGÍSTICA · CLN · 2026" },
    momotombo: EMPTY_CELL,
  },
  {
    time: "8:45 – 9:30 a.m.",
    mombacho: {
      kind: "conferencia",
      title: "La Nueva Era de la Inteligencia Operativa",
      speakers: ["Edison Salazar"],
    },
    momotombo: EMPTY_CELL,
  },
  {
    time: "9:30 – 10:20 a.m.",
    mombacho: {
      kind: "conferencia",
      title: "De la Última Milla a la Última Experiencia",
      sub: "Cómo construir una ejecución logística Best-in-Class",
      speakers: ["Oscar Soto Bravo"],
    },
    momotombo: {
      kind: "conferencia",
      title: "Supply Chain Blindada: Ciberseguridad y Continuidad Operativa en la Logística Digital",
      sub: "Qué ocurre cuando WMS, TMS, ERP, GPS o proveedores tecnológicos dejan de funcionar",
      speakers: ["Kairo Quezada"],
    },
  },
  {
    time: "10:20 – 10:50 a.m.",
    mombacho: EMPTY_CELL,
    momotombo: EMPTY_CELL,
    shared: {
      kind: "break",
      salonLabel: "Salón Télica",
      title: "Coffee break y visita a stands",
    },
  },
  {
    time: "10:50 – 11:50 a.m.",
    mombacho: {
      kind: "magistral",
      title: "Magistral: Del Almacén Tradicional al Almacén Smart",
      sub: "Tres expertos internacionales desde Canadá, Colombia y México, con experiencia en proyectos de automatización e intralogística en LATAM y Europa.",
      speakers: ["Liczy Pallares", "Raúl López", "Juan Gaviria"],
    },
    momotombo: EMPTY_CELL,
  },
  {
    time: "12:00 – 1:15 p.m.",
    mombacho: EMPTY_CELL,
    momotombo: { kind: "almuerzo", title: "Almuerzo ejecutivo" },
  },
  {
    time: "1:15 – 2:00 p.m.",
    mombacho: {
      kind: "conferencia",
      title: "Movilidad y Logística Regional 2035",
      sub: "Una visión estratégica sobre integración centroamericana, infraestructura, conectividad, corredores logísticos, facilitación del comercio y competitividad regional",
      speakers: [{ name: "Carlos Moreno", displayName: "Carlos Moreno - SIECA" }],
    },
    momotombo: {
      kind: "conferencia",
      title: "Torre de Control Logística: De Datos Dispersos a Decisiones en Tiempo Real",
      sub: "Cómo integrar información para lograr visibilidad End-to-End de la Supply Chain",
      speakers: ["Moisés Núñez Balladares"],
    },
  },
  {
    time: "2:00 – 2:45 p.m.",
    mombacho: {
      kind: "panel",
      badge: "Foro Ejecutivo",
      title: "Foro Ejecutivo | IA en Logística: Entender, Aplicar, Anticipar",
      speakers: ["Damarís Ramos", "Allember Palacios", "Miguel Baltodano"],
      moderator: "Yahoska Espino",
    },
    momotombo: EMPTY_CELL,
  },
  {
    time: "2:45 – 3:10 p.m.",
    mombacho: EMPTY_CELL,
    momotombo: EMPTY_CELL,
    shared: {
      kind: "break",
      salonLabel: "Salón Télica",
      title: "Coffee break y visita a stands",
    },
  },
  {
    time: "3:10 – 3:55 p.m.",
    mombacho: {
      kind: "conferencia",
      badge: "Conferencia y Presentación del Libro",
      title: "Evoluciona o Desaparece",
      sub: "Las 10 leyes de la brontosauriedad y por qué las empresas se vuelven irrelevantes",
      speakers: ["Antonio Espinoza Ruiz"],
    },
    momotombo: EMPTY_CELL,
  },
  {
    time: "3:55 – 4:15 p.m.",
    mombacho: EMPTY_CELL,
    momotombo: { kind: "plenary", title: "Cierre" },
  },
  {
    time: "4:15 – 6:00 p.m.",
    mombacho: EMPTY_CELL,
    momotombo: { kind: "cierre", title: "Cóctel de networking de cierre" },
  },
];

export const TOTAL_AGENDA_SESSIONS = AGENDA_SLOTS.reduce((count, slot) => {
  if (slot.shared && !slot.shared.empty) count += 1;
  if (!slot.mombacho.empty) count += 1;
  if (!slot.momotombo.empty) count += 1;
  return count;
}, 0);

export interface ConferenceScheduleItem {
  id: string;
  time: string;
  sessionLabel: string;
  kind: SlotKind;
  title: string;
  subtitle?: string;
  speakers: SpeakerEntry[];
  moderator?: string;
}

export function normalizeSpeakerEntry(entry: string | SpeakerEntry): SpeakerEntry {
  return typeof entry === "string" ? { name: entry } : entry;
}

const CONFERENCE_KINDS = new Set<SlotKind>(["conferencia", "magistral", "panel"]);

/** Lista cronológica de ponencias, magistrales y foros para la página de Ponentes. */
export const CONFERENCE_SCHEDULE: ConferenceScheduleItem[] = AGENDA_SLOTS.flatMap((slot, slotIdx) => {
  const tracks: { key: SalonKey; cell: Cell }[] = [
    { key: "mombacho", cell: slot.mombacho },
    { key: "momotombo", cell: slot.momotombo },
  ];

  return tracks
    .filter(({ cell }) => !cell.empty && CONFERENCE_KINDS.has(cell.kind) && Boolean(cell.title))
    .map(({ key, cell }) => {
      const kindLabel =
        cell.badge ??
        (cell.kind === "magistral"
          ? "Magistral"
          : cell.kind === "panel"
            ? "Foro Ejecutivo"
            : "Conferencia");

      return {
        id: `${slotIdx}-${key}`,
        time: cell.time ?? slot.time,
        sessionLabel: `${kindLabel} · ${SALON_META[key].label}`,
        kind: cell.kind,
        title: cell.title!,
        subtitle: cell.sub,
        speakers: (cell.speakers ?? []).map(normalizeSpeakerEntry),
        moderator: cell.moderator,
      };
    });
});
