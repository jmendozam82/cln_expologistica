"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CLN_LEADERS, type Leader } from "@/lib/leaders";
import CountryFlag, { COUNTRY_LABELS } from "@/components/CountryFlag";

function LeaderModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
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
      aria-labelledby="modal-leader-name"
    >
      <div
        className="absolute inset-0 bg-cln-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className="relative bg-white rounded-2xl w-full max-w-[780px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
        style={{ animation: "leaderModalIn .22s cubic-bezier(.16,1,.3,1) both" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar perfil"
          className="absolute top-4 right-4 z-10 bg-white/90 border-none rounded-full w-9 h-9 cursor-pointer text-lg text-gray-900 flex items-center justify-center shadow-md hover:bg-white"
        >
          ×
        </button>

        {/* Columna izquierda oscura */}
        <div className="flex-shrink-0 w-full md:w-[300px] bg-cln-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square bg-cln-900">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-7 md:flex-1 flex flex-col justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-orange-400 mb-1.5">
                {leader.clnRole}
              </p>
              <p className="text-xs font-medium text-cln-200 leading-relaxed mb-3">
                {leader.role}
              </p>
              <p className="text-sm font-bold text-white leading-snug">
                {leader.company}
              </p>
              <p className="text-xs text-cln-300 mt-0.5">{leader.country}</p>
            </div>
            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cln-300">
                {leader.experienceLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex-1 min-w-0 p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-2 pr-8 mb-4">
            <span className="inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide bg-cln-50 text-cln-700 border border-cln-200">
              {leader.clnRole}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-700">
              <CountryFlag code={leader.countryCode} variant="rect" className="w-4 h-[11px] ring-1 ring-black/10" />
              {COUNTRY_LABELS[leader.countryCode]}
            </span>
          </div>

          <h2 id="modal-leader-name" className="font-heading font-extrabold text-2xl md:text-[26px] text-cln-950 leading-tight mb-4">
            {leader.name}
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 mb-6">{leader.bio}</p>

          {/* Formación y Certificaciones */}
          <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Formación académica
              </p>
              <ul className="space-y-1">
                {leader.education.map((item) => (
                  <li key={item} className="text-xs md:text-sm text-gray-800 font-medium flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cln-600 mt-1.5 flex-shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Certificaciones destacadas
              </p>
              <ul className="space-y-1">
                {leader.certifications.map((cert) => (
                  <li key={cert} className="text-xs md:text-sm text-gray-800 font-medium flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" aria-hidden />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Especialidades */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {leader.specialties.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-cln-600 hover:text-cln-800 transition-colors"
            >
              Perfil en LinkedIn <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes leaderModalIn {
              from { opacity:0; transform:translateY(20px) scale(.97) }
              to   { opacity:1; transform:translateY(0) scale(1) }
            }
          `,
        }}
      />
    </div>
  );
}

export default function LeadersSection() {
  const [active, setActive] = useState<Leader | null>(null);

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
            LIDERAZGO CLN
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight mb-4">
            Líderes que impulsan nuestra comunidad.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Conoce la trayectoria ejecutiva de quienes lideran la Comunidad Logística Nicaragüense y hacen posible EXPO LOGÍSTICA · CLN · 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLN_LEADERS.map((leader) => (
            <button
              key={leader.id}
              type="button"
              onClick={() => setActive(leader)}
              aria-label={`Ver perfil profesional de ${leader.name}`}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-cln-300 transition-all duration-200 p-7 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left cursor-pointer hover:-translate-y-0.5"
            >
              <div className="relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  width={112}
                  height={112}
                  className="w-full h-full rounded-full object-cover ring-4 ring-cln-50"
                />
                <CountryFlag
                  code={leader.countryCode}
                  variant="circle"
                  className="absolute bottom-0 right-0 w-6 h-6 ring-2 ring-white shadow-sm"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col h-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="inline-block rounded-full bg-cln-50 text-cln-700 border border-cln-200 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    {leader.clnRole}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {leader.experienceLabel}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl md:text-2xl text-cln-950 group-hover:text-orange-600 transition-colors leading-tight mb-1.5">
                  {leader.name}
                </h3>

                <p className="text-sm text-gray-600 leading-snug mb-2">
                  {leader.role}
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-cln-700 mb-4">
                  {leader.company} · {leader.country}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-center sm:justify-between gap-2">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">
                    {leader.specialties[0]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cln-600 group-hover:text-orange-600 transition-colors">
                    Ver perfil profesional <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <LeaderModal leader={active} onClose={() => setActive(null)} />}
    </section>
  );
}

