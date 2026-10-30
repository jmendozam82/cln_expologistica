"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SPEAKERS, type Speaker } from "@/lib/speakers";
import SpeakerModal from "@/components/SpeakerModal";

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
    </>
  );
}
