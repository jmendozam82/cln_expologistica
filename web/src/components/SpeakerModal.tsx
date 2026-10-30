"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Speaker } from "@/lib/speakers";

export default function SpeakerModal({
  speaker,
  onClose,
  onVerEnAgenda,
}: {
  speaker: Speaker;
  onClose: () => void;
  onVerEnAgenda?: (id: string) => void;
}) {
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

        <div className="flex-shrink-0 w-full md:w-[320px] bg-cln-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square bg-cln-900">
            {speaker.photo ? (
              <Image
                src={speaker.photo}
                alt={speaker.name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-heading font-extrabold text-cln-300" style={{ fontSize: 96 }} aria-hidden>
                {speaker.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
              </div>
            )}
          </div>
          <div className="p-6 md:p-8 md:flex-1">
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {onVerEnAgenda && (
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
            )}

            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-cln-600 hover:text-cln-800 transition-colors"
              >
                Perfil en LinkedIn <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modalIn {
          from { opacity:0; transform:translateY(20px) scale(.97) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
      `}} />
    </div>
  );
}
