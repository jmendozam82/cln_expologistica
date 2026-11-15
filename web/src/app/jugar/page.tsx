"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JoinByCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length < 4) {
      setError("Ingresa el código de la sala mostrado en pantalla.");
      return;
    }
    router.push(`/jugar/${clean}`);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-cln-950 px-5 py-8 text-white">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-cln-900/90 p-7 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-12 w-36 overflow-hidden rounded-xl bg-white p-1.5 shadow">
            <Image
              src="/logo-horizontal.jpg"
              alt="CLN Expo Logístico"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-extrabold">
            Trivia en Vivo · CLN
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Ingresa el código de conferencia que aparece en la pantalla del auditorio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="room-code"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
            >
              Código de Sala
            </label>
            <input
              id="room-code"
              type="text"
              autoFocus
              maxLength={12}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="Ej. CLN2026"
              className="w-full rounded-xl border border-white/15 bg-cln-950 px-4 py-3.5 text-center font-mono text-xl font-extrabold tracking-widest text-white placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500 focus:border-cln-orange focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-950/60 px-3.5 py-2.5 text-sm text-rose-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cln-orange px-5 py-3.5 font-heading text-base font-bold text-white shadow-lg transition hover:bg-orange-600"
          >
            Entrar a la Sala
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
