"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GALLERY, type GalleryItem } from "@/lib/gallery";

const INTERVAL_MS = 5000;

function MediaItem({ item, alt, className }: { item: GalleryItem; alt: string; className?: string }) {
  const extra = className ?? "";
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${extra}`}
      />
    );
  }
  return (
    <Image
      src={item.src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      className={`object-cover ${extra}`}
    />
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function NetworkingGallery() {
  const len = GALLERY.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const show = useCallback(
    (i: number) => {
      setLeaving(active);
      setActive(((i % len) + len) % len);
    },
    [active, len]
  );

  const next = useCallback(() => show(active + 1), [show, active]);
  const prev = useCallback(() => show(active - 1), [show, active]);

  useEffect(() => {
    if (open || paused) return;
    const id = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [active, open, paused, next]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, next, prev]);

  const current = GALLERY[active];
  const previous = leaving !== null && leaving !== active ? GALLERY[leaving] : null;
  const nextItem = GALLERY[(active + 1) % len];

  return (
    <>
      <div
        className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label="Abrir galería de fotos de Expo Logística 2026"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div key={active} className="absolute inset-0 animate-media-in">
          <MediaItem item={current} alt={`Galería Expo Logística 2026 · foto ${active + 1}`} />
        </div>

        {previous && (
          <div className="absolute inset-0 animate-media-out pointer-events-none">
            <MediaItem item={previous} alt="" />
          </div>
        )}

        {nextItem.type === "image" && (
          <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden>
            <Image src={nextItem.src} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-4 pt-14">
          <p className="text-white text-sm font-bold drop-shadow">
            Galería Expo Logística 2026 · {String(active + 1).padStart(2, "0")} / {len}
          </p>
        </div>

        <span className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Ver galería ⤢
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos Expo Logística 2026"
          onClick={() => setOpen(false)}
        >
          <div className="flex-1 relative min-h-0" onClick={(e) => e.stopPropagation()}>
            {current.type === "image" ? (
              <div className="absolute inset-0 p-4 sm:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={current.src}
                    alt={`Galería Expo Logística 2026 · foto ${active + 1}`}
                    fill
                    quality={100}
                    sizes="(max-width: 1280px) 100vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <video
                key={current.src}
                src={current.src}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}

            <button
              type="button"
              aria-label="Foto anterior"
              onClick={prev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-colors"
            >
              <ChevronIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={next}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-colors"
            >
              <ChevronIcon className="w-6 h-6 rotate-180" />
            </button>
          </div>

          <div className="shrink-0 z-10 bg-black/85 border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4">
            <span className="text-white/80 text-sm font-bold tabular-nums">
              {active + 1} / {len}
            </span>

            <div className="flex items-center gap-1.5 max-w-[60%] overflow-hidden">
              {GALLERY.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Ir a la foto ${i + 1}`}
                  onClick={() => show(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === active ? "bg-orange-500 w-5" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold transition-colors"
            >
              Cerrar ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}