"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type SessionType = "apertura" | "conferencia" | "magistral" | "panel" | "networking" | "clausura";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  country?: string;
  bio?: string;
  session: string;
  time: string;
  confirmed: boolean;
  photo?: string;
}

interface AgendaItem {
  time: string;
  type: SessionType;
  title: string;
  speakerIds?: string[];
  moderatorId?: string;
  isBreak?: boolean;
}

const SPEAKERS: Speaker[] = [
  {
    id: "mayerling",
    name: "Mayerling Cervantes",
    role: "Líder Organizadora",
    company: "CLN",
    country: "Nicaragua",
    session: "Ceremonia de Apertura",
    time: "8:30 a.m.",
    confirmed: true,
  },
  {
    id: "jorge",
    name: "Jorge Mauricio Pocasangre",
    role: "Director Regional",
    company: "Supply Chain Latam",
    country: "Internacional",
    bio: "Experto regional en cadenas de suministro con más de 15 años de trayectoria en la optimización de operaciones logísticas en Centroamérica. Ha liderado proyectos de transformación digital para empresas multinacionales en la región.",
    session: "Conferencia 1 — Supply Chain Regional",
    time: "9:00 a.m.",
    confirmed: true,
  },
  {
    id: "carlos",
    name: "Carlos Boshell",
    role: "Experto en Seguridad y Resiliencia",
    company: "Logistics Group",
    country: "Colombia",
    bio: "Experto colombiano en seguridad integral, gestión del riesgo y cumplimiento normativo con más de 38 años de experiencia en los sectores público y privado. Auditor internacional BASC y consultor en normas ISO relacionadas con seguridad y continuidad operativa.",
    session: "Conferencia Magistral 1 — Resiliencia de la Cadena de Suministro",
    time: "11:00 a.m.",
    confirmed: true,
  },
  {
    id: "karla",
    name: "Karla Klaus",
    role: "Experta en Innovación Logística",
    company: "TechLog",
    country: "Internacional",
    bio: "Especialista en innovación y transformación digital aplicada al sector logístico. Más de 20 años liderando programas de cooperación internacional y proyectos de modernización de cadenas de suministro en América Central y Europa.",
    session: "Conferencia 3 — Innovación y Tecnología en Logística",
    time: "1:30 p.m.",
    confirmed: true,
  },
  {
    id: "eduardo",
    name: "Eduardo García Grande",
    role: "Consultor Senior",
    company: "Global Trade",
    country: "El Salvador",
    bio: "Consultor con más de diez años de experiencia en diplomacia económica, promoción del comercio exterior y atracción de inversiones. Ha dirigido estrategias de relacionamiento con organismos internacionales y sector privado en la región centroamericana.",
    session: "Conferencia Magistral 2 — Comercio e Inversión Regional",
    time: "2:40 p.m.",
    confirmed: true,
  },
];

const AGENDA: AgendaItem[] = [
  { time: "7:00 a.m.", type: "networking", title: "Registro de congresistas e invitados especiales", isBreak: true },
  { time: "8:30 a.m.", type: "apertura", title: "Ceremonia de Apertura — EXPO LOGÍSTICA 2026 · CLN", speakerIds: ["mayerling"] },
  { time: "9:00 a.m.", type: "conferencia", title: "Supply Chain Regional: desafíos y oportunidades", speakerIds: ["jorge"] },
  { time: "10:00 a.m.", type: "networking", title: "Coffee break y visita al piso de exhibición", isBreak: true },
  { time: "10:30 a.m.", type: "panel", title: "Panel Fórum — Infraestructura Logística Nacional" },
  { time: "11:00 a.m.", type: "magistral", title: "Resiliencia de la Cadena de Suministro: de la protección física a la resiliencia global", speakerIds: ["carlos"] },
  { time: "12:00 p.m.", type: "networking", title: "Receso para almuerzo de networking", isBreak: true },
  { time: "1:30 p.m.", type: "conferencia", title: "Innovación y Tecnología aplicada a la Logística", speakerIds: ["karla"] },
  { time: "2:30 p.m.", type: "networking", title: "Coffee break y visita al piso de exhibición", isBreak: true },
  { time: "2:40 p.m.", type: "magistral", title: "Comercio e Inversión Regional: perspectivas 2026", speakerIds: ["eduardo"] },
  { time: "4:00 p.m.", type: "panel", title: "Panel de Cierre — Conectando la Logística Nicaragüense al Mundo" },
  { time: "5:00 p.m.", type: "clausura", title: "Presentación de conclusiones y clausura del evento", isBreak: true },
  { time: "6:00 p.m.", type: "networking", title: "Cóctel de networking y conexión empresarial B2B", isBreak: true },
];

const TYPE_META: Record<SessionType, { label: string; tag: string; card: string }> = {
  apertura: { label: "Apertura", tag: "bg-amber-100 text-amber-800", card: "rounded-xl bg-white border border-gray-100 border-l-4 border-l-amber-500 shadow-sm" },
  conferencia: { label: "Conferencia", tag: "bg-cln-100 text-cln-700", card: "rounded-xl bg-white border border-gray-100 border-l-4 border-l-cln-600 shadow-sm" },
  magistral: { label: "Magistral", tag: "bg-orange-100 text-orange-700", card: "rounded-xl bg-orange-50/50 border border-orange-200 border-l-4 border-l-orange-500 shadow-md" },
  panel: { label: "Panel Fórum", tag: "bg-emerald-100 text-emerald-700", card: "rounded-xl bg-cln-50/40 border border-cln-100 border-l-4 border-l-emerald-600 shadow-sm" },
  networking: { label: "Networking", tag: "bg-gray-100 text-gray-600", card: "rounded-xl bg-white border border-gray-200 border-l-4 border-l-cln-900 shadow-sm" },
  clausura: { label: "Clausura", tag: "bg-cln-100 text-cln-800", card: "rounded-xl bg-white border border-gray-100 border-l-4 border-l-cln-800 shadow-sm" },
};

function Avatar({ speaker, size = 48 }: { speaker: Speaker; size?: number }) {
  const initials = speaker.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  if (speaker.photo) {
    return (
      <Image
        src={speaker.photo}
        alt={speaker.name}
        width={size}
        height={size}
        className="rounded-full object-cover block flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-cln-100 text-cln-700 font-heading font-extrabold flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 w-full text-left py-5 bg-transparent border-b border-gray-200 cursor-pointer transition-all duration-150 hover:translate-x-1"
      aria-label={`Ver perfil de ${speaker.name}`}
    >
      <div className="flex-shrink-0">
        <Avatar speaker={speaker} size={64} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
          {speaker.name}
        </p>
        <p className="text-sm text-gray-500">
          {speaker.role} · {speaker.company}
          {speaker.country && <span className="text-gray-400"> · {speaker.country}</span>}
        </p>
      </div>
      <span className="text-xl text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden>
        →
      </span>
    </button>
  );
}

function SpeakerModal({ speaker, onClose }: { speaker: Speaker; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const rowIndex = AGENDA.findIndex((item) => item.speakerIds?.includes(speaker.id));
  const agendaAnchor = rowIndex >= 0 ? `#agenda-row-${rowIndex}` : "/agenda";
  useEffect(() => {
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-speaker-name"
    >
      <div
        className="absolute inset-0 bg-cln-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative bg-white rounded-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
        style={{ animation: "modalIn .22s cubic-bezier(.16,1,.3,1) both" }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar perfil"
          className="absolute top-4 right-4 z-10 bg-white/90 border-none rounded-full w-9 h-9 cursor-pointer text-lg text-gray-900 flex items-center justify-center shadow-md hover:bg-white"
        >
          ×
        </button>

        <div className="flex-shrink-0 w-full md:w-[280px] md:min-h-[280px] bg-cln-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex flex-col justify-end p-8">
          <div className="mb-4">
            <Avatar speaker={speaker} size={96} />
          </div>
          <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-cln-300 mb-1">
            {speaker.role}
          </p>
          <p className="text-sm font-bold text-white leading-snug">
            {speaker.company}
            {speaker.country && (
              <>
                <br />
                <span className="font-normal text-cln-300">{speaker.country}</span>
              </>
            )}
          </p>
        </div>

        <div className="flex-1 min-w-0 p-8 md:p-10">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide mb-4 ${
              speaker.confirmed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
            }`}
          >
            {speaker.confirmed ? "Participación Confirmada" : "Pendiente de Confirmación"}
          </span>

          <h2 id="modal-speaker-name" className="font-heading font-extrabold text-2xl md:text-[26px] text-cln-950 leading-tight mb-6">
            {speaker.name}
          </h2>

          {speaker.bio && (
            <p className="text-sm leading-relaxed text-gray-600 mb-6">{speaker.bio}</p>
          )}

          <dl className="grid gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {[
              { dt: "Participación", dd: speaker.session },
              { dt: "Horario", dd: speaker.time },
              { dt: "Rol", dd: `${speaker.role} · ${speaker.company}` },
            ].map(({ dt, dd }) => (
              <div key={dt} className="flex gap-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-gray-500 min-w-[100px] flex-shrink-0 pt-0.5">
                  {dt}
                </dt>
                <dd className="text-sm text-gray-900 font-medium m-0">{dd}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={agendaAnchor}
            onClick={
              rowIndex >= 0
                ? (e) => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById(`agenda-row-${rowIndex}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 60);
                  }
                : undefined
            }
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cln-600 hover:text-cln-800 transition-colors"
          >
            Ver en la agenda <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AgendaRow({
  item,
  speakers,
  onSpeakerClick,
  rowId,
}: {
  item: AgendaItem;
  speakers: Speaker[];
  onSpeakerClick: (s: Speaker) => void;
  rowId?: string;
}) {
  const meta = TYPE_META[item.type];
  const rowSpeakers = (item.speakerIds ?? [])
    .map((id) => speakers.find((s) => s.id === id))
    .filter(Boolean) as Speaker[];

  return (
    <div id={rowId} className={`scroll-mt-24 flex ${item.isBreak ? "opacity-70" : ""}`}>
      <div className="w-24 flex-shrink-0 pt-5">
        <span className="text-sm md:text-base font-semibold text-gray-500 leading-snug">{item.time}</span>
      </div>
      <div className={`flex-1 min-w-0 mb-4 ${meta.card}`}>
        <div className="pl-4 md:pl-6 pt-5 pb-5">
          <div className="flex justify-end mb-2">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.tag}`}>
              {meta.label}
            </span>
          </div>
          <p className="font-semibold text-gray-900 leading-snug mb-2">{item.title}</p>
          {rowSpeakers.length > 0 && (
            <div className="flex flex-col gap-3">
              {rowSpeakers.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSpeakerClick(s)}
                  className="group/speaker flex items-center gap-3 w-full text-left rounded-lg bg-gray-50 hover:bg-white border border-gray-200 hover:border-cln-300 py-2.5 px-3 cursor-pointer transition-all duration-150 hover:translate-x-1"
                  aria-label={`Ver perfil de ${s.name}`}
                >
                  <Avatar speaker={s} size={44} />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-gray-900 group-hover/speaker:text-orange-600 transition-colors leading-tight text-sm md:text-base">
                      {s.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {s.role} · {s.company}
                      {s.country && <span className="text-gray-400"> · {s.country}</span>}
                    </p>
                  </div>
                  <span className="text-cln-600 font-bold text-sm shrink-0 flex items-center gap-1">
                    Ver perfil
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PonentesPage() {
  const [active, setActive] = useState<Speaker | null>(null);

  return (
    <>
      {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative bg-cln-950 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://nilogistic.com/wp-content/uploads/2026/09/Hero-Speaker-scaled.jpeg"
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
            EXPO LOGÍSTICA 2026 · CLN · VIERNES 20 DE NOVIEMBRE · MANAGUA
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Conocimiento que fortalece{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              la operación logística.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Una agenda ejecutiva con líderes del sector, especialistas y autoridades para analizar
            desafíos, tendencias y decisiones que impactan la cadena de suministro en Nicaragua.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link
              href="/registro"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Reservar acceso al congreso
            </Link>
            <a
              href="#agenda"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Ver agenda
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PONENTES ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              Voces del Congreso
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
              Conoce a quienes protagonizan la agenda.
            </h2>
          </div>
          <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
            Selecciona un ponente para consultar su participación y la información profesional disponible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {SPEAKERS.map((s) => (
            <SpeakerCard key={s.id} speaker={s} onClick={() => setActive(s)} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════ AGENDA ══════════════════════════════════════ */}
      <section id="agenda" className="bg-gray-50 border-t border-gray-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                Viernes 20 de noviembre
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
                Agenda del Congreso.
              </h2>
            </div>
            <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right">
              Una jornada de contenido ejecutivo, conversaciones sectoriales y espacios de relacionamiento
              para quienes toman decisiones en la cadena logística.
            </p>
          </div>

          <div>
            {AGENDA.map((item, i) => (
              <AgendaRow key={i} item={item} speakers={SPEAKERS} rowId={`agenda-row-${i}`} onSpeakerClick={(s) => setActive(s)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ ACCESO / PRECIOS ══════════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Congreso — Acceso con costo.
          </h2>
          <p className="text-lg text-cln-200 font-light mb-10 leading-relaxed">
            El acceso incluye ingreso al congreso, piso de exhibición, almuerzo ejecutivo y dos coffee
            breaks para networking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-xl mx-auto">
            {[
              { label: "Miembro CLN", price: "$75", note: "+ IVA · sujeto a validación", highlight: false },
              { label: "Tarifa General", price: "$120", note: "+ IVA · no asociado", highlight: true },
            ].map((t) => (
              <div
                key={t.label}
                className={`relative rounded-xl p-8 ${
                  t.highlight
                    ? "bg-orange-500 shadow-xl shadow-orange-500/30"
                    : "bg-white border-t-4 border-cln-500 shadow-xl"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cln-950 text-cln-200 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest">
                    TARIFA GENERAL
                  </span>
                )}
                <p className={`text-sm font-semibold mb-2 ${t.highlight ? "text-cln-950" : "text-gray-500"}`}>
                  {t.label}
                </p>
                <p className={`font-heading font-extrabold text-4xl mb-1 ${t.highlight ? "text-cln-950" : "text-cln-950"}`}>
                  {t.price}
                </p>
                <p className={`text-xs ${t.highlight ? "text-cln-900" : "text-gray-500"}`}>{t.note}</p>
              </div>
            ))}
          </div>

          <Link
            href="/registro"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            Solicitar acceso →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════ MODAL PONENTE ══════════════════════════════════════ */}
      {active && <SpeakerModal speaker={active} onClose={() => setActive(null)} />}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalIn {
          from { opacity:0; transform:translateY(20px) scale(.97) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
      `}} />
    </>
  );
}