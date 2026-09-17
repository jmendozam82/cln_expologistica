"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Speaker {
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
}

const SPEAKERS: Speaker[] = [
  {
    id: "mayerling",
    name: "Mayerling Cervantes",
    role: "Líder Organizadora",
    company: "CLN",
    country: "Nicaragua",
    session: "Ceremonia de Apertura",
    topic: "Ceremonia de Apertura",
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
    topic: "Supply Chain Regional",
    topicSubtitle: "Desafíos y oportunidades en la cadena de suministro centroamericana para 2026 y más allá.",
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
    topic: "Resiliencia de la Cadena de Suministro",
    topicSubtitle: "De la protección física a la resiliencia global.",
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
    topic: "Innovación y Tecnología en Logística",
    topicSubtitle: "Herramientas digitales, automatización e inteligencia artificial al sector logístico.",
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
    topic: "Comercio e Inversión Regional",
    topicSubtitle: "Perspectivas estratégicas de comercio exterior e inversión para 2026.",
    time: "2:40 p.m.",
    confirmed: true,
  },
];

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
        <Avatar speaker={speaker} size={72} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-extrabold text-lg text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
          {speaker.name}
        </p>
        <p className="text-base text-gray-500">
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

function SpeakerModal({ speaker, onClose, onVerEnAgenda }: { speaker: Speaker; onClose: () => void; onVerEnAgenda: (id: string) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
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
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide mb-4 ${speaker.confirmed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
              }`}
          >
            {speaker.confirmed ? "Participación Confirmada" : "Pendiente de Confirmación"}
          </span>

          <h2 id="modal-speaker-name" className="font-heading font-extrabold text-2xl md:text-[26px] text-cln-950 leading-tight mb-2">
            {speaker.name}
          </h2>

          {speaker.topicSubtitle && (
            <p className="text-base font-semibold text-orange-600 mb-1">{speaker.topic}</p>
          )}
          {speaker.topicSubtitle && (
            <p className="text-sm text-gray-500 italic mb-6">{speaker.topicSubtitle}</p>
          )}
          {!speaker.topicSubtitle && <div className="mb-6" />}

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

          <button
            type="button"
            onClick={() => {
              onClose();
              setTimeout(() => onVerEnAgenda(speaker.id), 60);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cln-600 hover:text-cln-800 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Ver en la agenda <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PonentesPage() {
  const [active, setActive] = useState<Speaker | null>(null);

  const handleVerEnAgenda = (speakerId: string) => {
    const el = document.getElementById(`timeline-${speakerId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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
            APRENDER
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Conocimiento que {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              cruza fronteras.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10">
            Referentes de la logística nacionales e internacionales compartirán conocimiento, experiencias y nuevas perspectivas sobre los desafíos y oportunidades que están transformando la logística y Supply Chain.
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <Link
              href="/registro"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Asegurar mi lugar
            </Link>
            <a
              href="#agenda"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Explora la agenda
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

      {/* ══════════════════════════════════════ HORARIOS DE CONFERENCIAS ══════════════════════════════════════ */}
      <section id="agenda" className="bg-gray-50 border-t border-gray-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              CUÁNDO PARTICIPA CADA SPEAKER
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-4">
              Horarios de conferencias.
            </h2>
            <p className="text-lg text-gray-600">
              Consulta el horario de cada participación para planificar tu jornada.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[100px] md:left-[120px] w-px bg-gray-300" aria-hidden />
            {SPEAKERS.filter((s) => s.id !== "mayerling").map((speaker) => (
              <div key={speaker.id} id={`timeline-${speaker.id}`} className="relative flex items-start mb-6 last:mb-0 scroll-mt-24">
                <div className="w-24 md:w-28 flex-shrink-0 pt-5 pr-3 text-right">
                  <span className="text-base md:text-lg font-bold text-cln-700">{speaker.time}</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-orange-500 mt-7 relative z-10 flex-shrink-0 ring-4 ring-gray-50" aria-hidden />
                <button
                  type="button"
                  onClick={() => setActive(speaker)}
                  className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm p-6 ml-4 hover:shadow-md hover:border-cln-300 transition-all text-left cursor-pointer"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-cln-600 mb-1">{speaker.session}</p>
                  <p className="font-heading font-bold text-orange-600 text-lg md:text-xl mb-0.5">{speaker.topic}</p>
                  {speaker.topicSubtitle && (
                    <p className="text-sm md:text-base text-gray-500 italic mb-3">{speaker.topicSubtitle}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <Avatar speaker={speaker} size={48} />
                    <div>
                      <p className="font-heading font-bold text-cln-950 text-base md:text-lg leading-tight">{speaker.name}</p>
                      <p className="text-sm md:text-base text-gray-500">{speaker.role} · {speaker.company}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ EDITORIAL ══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
            LA VOZ DE LOS REFERENTES DE LA LOGÍSTICA
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-8">
            Ideas globales. Impacto en nuestra realidad.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
            Expo Logística CLN reúne referentes de la logística con diferentes experiencias, mercados y perspectivas para abrir conversaciones sobre los desafíos que enfrenta nuestra cadena logística.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Desde la resiliencia y el comercio regional hasta la innovación y la tecnología, cada sesión busca aportar una nueva mirada para comprender hacia dónde se mueve Supply Chain.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════ SPEAKERS → AGENDA + CTA ══════════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            {/* SPEAKERS → AGENDA */}
            <div className="flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-14">
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
                Ahora sabes quiénes.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">Descubre cuándo.</span>
              </h2>
              <p className="text-lg md:text-xl text-cln-200 font-light mb-8 max-w-md mx-auto leading-relaxed">
                Consulta el programa completo y planifica tu jornada alrededor de las sesiones que quieres vivir.
              </p>
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 bg-cln-600 hover:bg-cln-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:-translate-y-0.5"
              >
                Explorar la agenda <span aria-hidden>→</span>
              </Link>
            </div>

            {/* CTA FINAL */}
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
                El conocimiento se comparte.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">Las oportunidades comienzan cuando nos conectamos.</span>
              </h2>
              <p className="text-lg md:text-xl text-cln-200 font-light mb-8 max-w-md mx-auto leading-relaxed">
                Ven a vivir Expo Logística CLN 2026.
              </p>
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
              >
                Asegurar mi lugar <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ MODAL PONENTE ══════════════════════════════════════ */}
      {active && <SpeakerModal speaker={active} onClose={() => setActive(null)} onVerEnAgenda={handleVerEnAgenda} />}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modalIn {
          from { opacity:0; transform:translateY(20px) scale(.97) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
      `}} />
    </>
  );
}