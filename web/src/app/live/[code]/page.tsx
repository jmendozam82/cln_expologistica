"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import TriviaQrCode from "@/components/TriviaQrCode";
import {
  getRevealCorrectIndices,
  OPTION_THEMES,
  type PollLiveStats,
  type TriviaPublicQuestion,
  type TriviaRevealSnapshot,
  type TriviaSessionMode,
  type TriviaStatus,
} from "@/lib/trivia";
import { useLiveAudio } from "@/lib/useLiveAudio";
import { useSyncedTimer } from "@/lib/useSyncedTimer";

interface LiveStateResponse {
  id: string;
  code: string;
  mode: TriviaSessionMode;
  title: string;
  conferenceTitle: string;
  status: TriviaStatus;
  stateVersion: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionStartedAtMs: number | null;
  serverNowMs: number;
  question: TriviaPublicQuestion | null;
  reveal: TriviaRevealSnapshot | null;
  presenter: {
    playerCount: number;
    answerCount: number;
    recentPlayers: string[];
    pollStats: PollLiveStats | null;
  } | null;
}

function formatSeconds(ms: number): string {
  return `${(Math.max(0, ms) / 1000).toFixed(2)} s`;
}

function SvgIcon({ className = "h-5 w-5", children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const Users = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></SvgIcon>
);
const Maximize2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" x2="14" y1="3" y2="10" /><line x1="3" x2="10" y1="21" y2="14" /></SvgIcon>
);
const Minimize2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" x2="21" y1="10" y2="3" /><line x1="3" x2="10" y1="21" y2="14" /></SvgIcon>
);
const Radio = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /></SvgIcon>
);
const CheckCircle2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></SvgIcon>
);
const Timer = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" /></SvgIcon>
);
const Trophy = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></SvgIcon>
);
const Sparkles = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="m12 3-1.91 5.81a2 2 0 0 1-1.28 1.28L3 12l5.81 1.91a2 2 0 0 1 1.28 1.28L12 21l1.91-5.81a2 2 0 0 1 1.28-1.28L21 12l-5.81-1.91a2 2 0 0 1-1.28-1.28Z" /></SvgIcon>
);
const Crown = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></SvgIcon>
);
const Volume2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></SvgIcon>
);
const VolumeX = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="22" x2="16" y1="9" y2="15" /><line x1="16" x2="22" y1="9" y2="15" /></SvgIcon>
);

export default function LiveProjectorPage() {
  const params = useParams<{ code: string }>();
  const code = String(params?.code ?? "").toUpperCase();

  const [state, setState] = useState<LiveStateResponse | null>(null);
  const [clockOffsetMs, setClockOffsetMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => ""
  );

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    if (!code) return;
    let active = true;
    let timerId: number | null = null;

    async function poll() {
      const reqStart = Date.now();
      try {
        const res = await fetch(
          `/api/trivia/state?code=${encodeURIComponent(code)}&presenter=1`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (!active) return;

        if (!res.ok) {
          setError(data.error || "Sala no encontrada.");
        } else {
          const reqEnd = Date.now();
          const estimatedClientMid = (reqStart + reqEnd) / 2;
          setClockOffsetMs(data.serverNowMs - estimatedClientMid);
          setState(data);
          setError(null);
        }
      } catch {
        if (active) setError("Sin conexión con el servidor. Reintentando...");
      } finally {
        if (active) {
          timerId = window.setTimeout(poll, 1200);
        }
      }
    }

    poll();
    return () => {
      active = false;
      if (timerId !== null) window.clearTimeout(timerId);
    };
  }, [code]);

  const isPoll = state?.mode === "poll";

  const timer = useSyncedTimer({
    enabled: state?.status === "question" && !isPoll,
    questionStartedAtMs: state?.questionStartedAtMs ?? null,
    timeLimitSec: state?.question?.timeLimitSec ?? 20,
    clockOffsetMs,
  });

  const liveVoteCount = isPoll
    ? (state?.presenter?.pollStats?.totalAnswers ?? state?.presenter?.answerCount ?? 0)
    : (state?.presenter?.answerCount ?? 0);

  const isAudioVotingActive =
    state?.status === "question" && (isPoll || timer.leadRemainingMs <= 0);

  const audio = useLiveAudio({
    isActive: Boolean(isAudioVotingActive),
    voteCount: liveVoteCount,
    questionKey: `${state?.id ?? 0}-${state?.stateVersion ?? 0}-${state?.currentQuestionIndex ?? 0}`,
  });

  const joinUrl = useMemo(() => {
    if (!origin || !code) return "";
    return `${origin}/jugar/${code}`;
  }, [origin, code]);

  async function toggleFullscreen() {
    void audio.unlockAudio();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser may block fullscreen if gesture/policy rejects
    }
  }

  if (error && !state) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-cln-950 p-8 text-center text-white">
        <div className="max-w-md rounded-2xl border border-rose-500/30 bg-rose-950/40 p-8">
          <h1 className="font-heading text-2xl font-bold">No se pudo cargar la sala</h1>
          <p className="mt-2 text-sm text-rose-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-cln-950 text-white">
        <div className="flex items-center gap-3 text-lg text-slate-300">
          <span className="h-3 w-3 animate-ping rounded-full bg-cln-orange" />
          Conectando pantalla del auditorio...
        </div>
      </div>
    );
  }

  const playerCount = state.presenter?.playerCount ?? 0;
  const answerCount = state.presenter?.answerCount ?? 0;
  const recentPlayers = state.presenter?.recentPlayers ?? [];
  const top10 = state.reveal?.leaderboard.slice(0, 10) ?? [];
  const totalSec = state.question?.timeLimitSec ?? 20;
  const progressPct = Math.max(
    0,
    Math.min(100, (timer.remainingMs / (totalSec * 1000)) * 100)
  );

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-cln-950 text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cln-blue/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-cln-orange/15 blur-3xl" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-cln-900/70 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-32 overflow-hidden rounded-lg bg-white px-2 py-1 shadow">
            <Image
              src="/logo-horizontal.jpg"
              alt="CLN Expo Logístico"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cln-orange">
              {state.conferenceTitle || "CLN Expo Logístico · Nicaragua 2026"}
            </p>
            <h1 className="font-heading text-lg font-bold text-white sm:text-xl">
              {state.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="font-heading text-xl font-extrabold tabular-nums">
              {playerCount}
            </span>
            <span className="text-xs text-slate-300">conectados</span>
          </div>

          <div className="rounded-xl border border-cln-orange/40 bg-cln-orange/15 px-4 py-2 text-center">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-cln-orange">
              Código
            </span>
            <span className="font-mono text-lg font-extrabold tracking-widest text-white">
              {state.code}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void audio.toggleSound()}
            title={
              !audio.soundEnabled
                ? "Activar música en vivo"
                : audio.audioUnlocked
                  ? "Silenciar música en vivo"
                  : "Haz clic para habilitar el audio del navegador"
            }
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition cursor-pointer ${
              !audio.soundEnabled
                ? "border-white/15 bg-white/5 text-slate-400 hover:bg-white/15"
                : !audio.audioUnlocked
                  ? "border-amber-400/50 bg-amber-500/20 text-amber-200 animate-pulse hover:bg-amber-500/30"
                  : audio.isPlaying
                    ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-200"
                    : "border-white/15 bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            {audio.soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {!audio.soundEnabled
                ? "Silenciado"
                : !audio.audioUnlocked
                  ? "Activar Audio"
                  : audio.isPlaying
                    ? "Sonando"
                    : "Audio Listo"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-slate-200 transition hover:bg-white/20"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main Stage */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-8">
        {state.status === "lobby" && (
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1.5 text-sm font-semibold text-emerald-300">
                <Radio className="h-4 w-4 animate-pulse" />
                {isPoll
                  ? "Encuesta abierta · Escanea el QR para votar"
                  : "Sala abierta · Escanea el QR para unirte"}
              </div>

              <h2 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                {isPoll ? "¡Tu opinión en vivo!" : "¡Participa en la Trivia en Vivo!"}
              </h2>

              <p className="max-w-2xl text-lg text-slate-300">
                {isPoll ? (
                  <>
                    Abre la cámara de tu teléfono, escanea el código QR y responde{" "}
                    <strong className="text-white">directamente sin registro</strong>. Los
                    resultados se actualizarán al instante en esta pantalla.
                  </>
                ) : (
                  <>
                    Abre la cámara de tu teléfono, escanea el código QR e ingresa únicamente tu{" "}
                    <strong className="text-white">nombre</strong>. Responder rápido y con
                    precisión suma más puntos para llegar al{" "}
                    <strong className="text-cln-orange">Podio Top 3</strong>.
                  </>
                )}
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">
                    {isPoll
                      ? `Asistentes listos para votar (${playerCount})`
                      : `Participantes en sala (${playerCount})`}
                  </span>
                  <span className="text-xs text-slate-400">
                    {state.totalQuestions} preguntas listas
                  </span>
                </div>

                {isPoll ? (
                  <p className="py-5 text-center text-base font-medium text-slate-300">
                    {playerCount === 0
                      ? "Esperando al primer participante..."
                      : `${playerCount} ${playerCount === 1 ? "dispositivo conectado" : "dispositivos conectados"} · Participación 100% anónima`}
                  </p>
                ) : recentPlayers.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slate-400">
                    Esperando al primer participante...
                  </p>
                ) : (
                  <div className="flex max-h-56 flex-wrap gap-2 overflow-hidden">
                    {recentPlayers.map((name, idx) => (
                      <span
                        key={`${name}-${idx}`}
                        className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="flex w-full max-w-[390px] flex-col items-center rounded-3xl bg-white p-6 text-center text-slate-900 shadow-2xl sm:p-8">
                {joinUrl && (
                  <div className="flex w-full items-center justify-center">
                    <TriviaQrCode url={joinUrl} size={280} />
                  </div>
                )}
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  O entra manualmente a
                </p>
                <p className="mt-1 break-all font-mono text-sm font-bold text-cln-900">
                  {joinUrl || `/jugar/${state.code}`}
                </p>
                <div className="mt-3 inline-block rounded-xl bg-cln-950 px-5 py-2 font-mono text-2xl font-extrabold tracking-widest text-cln-orange">
                  {state.code}
                </div>
              </div>
            </div>
          </div>
        )}

        {isPoll && (state.status === "question" || state.status === "reveal") && state.question && (
          <div className="mx-auto w-full max-w-5xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-slate-200">
                  Pregunta {state.currentQuestionIndex + 1} de {state.totalQuestions}
                </span>
                {state.status === "question" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Votación en tiempo real
                  </span>
                ) : (
                  <span className="rounded-full border border-sky-400/40 bg-sky-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-200">
                    Votación cerrada
                  </span>
                )}
                {state.question.type === "multiple" && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                    Selección múltiple
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-2 font-heading text-2xl font-extrabold tabular-nums">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <span>
                  {state.status === "question"
                    ? (state.presenter?.pollStats?.totalAnswers ?? answerCount)
                    : (state.reveal?.totalAnswers ?? answerCount)}
                </span>
                <span className="text-sm font-normal text-slate-300">
                  votos recibido(s)
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center shadow-xl sm:p-9">
              <h2 className="font-heading text-3xl font-extrabold leading-snug sm:text-4xl">
                {state.question.text}
              </h2>
            </div>

            <PollHorizontalBars
              options={state.question.options}
              counts={
                state.status === "question"
                  ? (state.presenter?.pollStats?.counts ?? state.question.options.map(() => 0))
                  : (state.reveal?.counts ?? state.question.options.map(() => 0))
              }
              totalVotes={
                state.status === "question"
                  ? (state.presenter?.pollStats?.totalAnswers ?? answerCount)
                  : (state.reveal?.totalAnswers ?? 0)
              }
            />
          </div>
        )}

        {!isPoll && state.status === "question" && state.question && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-slate-200">
                  Pregunta {state.currentQuestionIndex + 1} de {state.totalQuestions}
                </span>
                {state.question.type === "multiple" && (
                  <span className="rounded-full border border-sky-400/40 bg-sky-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-200">
                    Selección múltiple · Varias correctas
                  </span>
                )}
                {state.question.type === "boolean" && (
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200">
                    Verdadero o Falso
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-lg font-bold text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="tabular-nums">
                    {answerCount} / {playerCount}
                  </span>
                  <span className="text-sm font-normal text-slate-300">respuestas</span>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-2 font-heading text-3xl font-extrabold tabular-nums">
                  <Timer className="h-7 w-7 text-cln-orange" />
                  {timer.leadRemainingMs > 0
                    ? `${Math.ceil(timer.leadRemainingMs / 1000)}`
                    : `${Math.ceil(timer.remainingMs / 1000)}s`}
                </div>
              </div>
            </div>

            {timer.leadRemainingMs > 0 ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-cln-orange/40 bg-cln-900/80 p-10 text-center shadow-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-cln-orange">
                  Sincronizando dispositivos...
                </p>
                <h2 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
                  ¡Prepárate!
                </h2>
                <div className="mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-cln-orange font-heading text-6xl font-black text-white shadow-xl">
                  {Math.ceil(timer.leadRemainingMs / 1000)}
                </div>
              </div>
            ) : (
              <>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full transition-all duration-100 ${
                      progressPct > 35
                        ? "bg-emerald-400"
                        : progressPct > 15
                        ? "bg-amber-400"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl sm:p-10">
                  <h2 className="font-heading text-3xl font-extrabold leading-snug sm:text-4xl lg:text-5xl">
                    {state.question.text}
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {state.question.options.map((opt, idx) => {
                    const theme = OPTION_THEMES[idx];
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 rounded-2xl p-6 shadow-lg ${theme.solid}`}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/25 font-heading text-2xl font-black">
                          {theme.shape}
                        </span>
                        <span className="text-xl font-bold leading-snug sm:text-2xl">
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {!isPoll && state.status === "reveal" && state.question && state.reveal && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-300">
                Respuesta Correcta · Pregunta {state.currentQuestionIndex + 1} de{" "}
                {state.totalQuestions}
              </span>
              <span className="text-base font-semibold text-slate-300">
                {state.reveal.totalAnswers} de {state.reveal.totalPlayers} respondieron
              </span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {state.question.text}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {state.question.options.map((opt, idx) => {
                const theme = OPTION_THEMES[idx];
                const correctSet = getRevealCorrectIndices(state.reveal);
                const isCorrect = correctSet.includes(idx);
                const count = state.reveal!.counts[idx] ?? 0;
                const total = Math.max(1, state.reveal!.totalAnswers);
                const pct = Math.round((count / total) * 100);

                return (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-2xl border p-6 transition ${
                      isCorrect
                        ? "border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400"
                        : "border-white/10 bg-white/5 opacity-70"
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold ${theme.solid}`}
                        >
                          {theme.shape}
                        </span>
                        <span className="text-lg font-bold sm:text-xl">{opt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        {isCorrect && (
                          <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                        )}
                        <span className="font-heading text-2xl font-black tabular-nums">
                          {count}
                        </span>
                        <span className="text-sm text-slate-300">({pct}%)</span>
                      </div>
                    </div>

                    <div className="relative z-10 mt-4 h-3 w-full overflow-hidden rounded-full bg-black/30">
                      <div
                        className={`h-full ${isCorrect ? "bg-emerald-400" : theme.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {state.status === "leaderboard" && (
          <div className="mx-auto w-full max-w-4xl space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cln-orange/30 bg-cln-orange/15 px-4 py-1.5 text-sm font-bold text-cln-orange">
                <Trophy className="h-4 w-4" />
                Tabla de Posiciones · Pregunta {state.currentQuestionIndex + 1} de{" "}
                {state.totalQuestions}
              </div>
              <h2 className="mt-3 font-heading text-4xl font-extrabold">
                Top 10 Participantes
              </h2>
            </div>

            <RankingTable rows={top10} />
          </div>
        )}

        {state.status === "podium" && isPoll && (
          <div className="mx-auto w-full max-w-4xl space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-1.5 text-sm font-bold text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Encuesta Finalizada
            </div>
            <h2 className="font-heading text-4xl font-extrabold sm:text-5xl">
              ¡Gracias por participar en vivo!
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Sus respuestas fueron registradas en tiempo real para enriquecer la conferencia en CLN Expo Logístico Nicaragua 2026.
            </p>
            {state.question && state.reveal && (
              <div className="space-y-4 pt-2 text-left">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                  Última pregunta · {state.question.text}
                </p>
                <PollHorizontalBars
                  options={state.question.options}
                  counts={state.reveal.counts}
                  totalVotes={state.reveal.totalAnswers}
                />
              </div>
            )}
          </div>
        )}

        {!isPoll && state.status === "podium" && (
          <div className="mx-auto w-full max-w-5xl space-y-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-5 py-1.5 text-sm font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                Resultados Finales
              </div>
              <h2 className="mt-3 font-heading text-4xl font-extrabold sm:text-5xl">
                ¡Podio Oficial de la Conferencia!
              </h2>
            </div>

            {top10.length === 0 ? (
              <p className="text-center text-slate-400">
                No hubo respuestas registradas en esta partida.
              </p>
            ) : (
              <>
                <div className="grid items-end gap-4 pt-6 sm:grid-cols-3">
                  {/* 2nd Place */}
                  <PodiumCard row={top10[1]} place={2} />
                  {/* 1st Place */}
                  <PodiumCard row={top10[0]} place={1} />
                  {/* 3rd Place */}
                  <PodiumCard row={top10[2]} place={3} />
                </div>

                {top10.length > 3 && (
                  <div className="space-y-3">
                    <h3 className="text-center text-sm font-bold uppercase tracking-wider text-slate-400">
                      Ranking General (Top 10)
                    </h3>
                    <RankingTable rows={top10} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function RankingTable({
  rows,
}: {
  rows: NonNullable<LiveStateResponse["reveal"]>["leaderboard"];
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
        Aún no hay puntajes registrados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
      <div className="divide-y divide-white/10">
        {rows.map((row) => {
          const medalColor =
            row.rank === 1
              ? "bg-amber-400 text-slate-950"
              : row.rank === 2
              ? "bg-slate-300 text-slate-950"
              : row.rank === 3
              ? "bg-amber-700 text-white"
              : "bg-white/10 text-slate-200";

          return (
            <div
              key={row.playerId}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-heading text-lg font-black ${medalColor}`}
                >
                  {row.rank}
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-white">
                    {row.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {row.correctCount} aciertos · tiempo acumulado{" "}
                    {formatSeconds(row.totalTimeMs)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-heading text-2xl font-black tabular-nums text-cln-orange">
                  {row.score.toLocaleString("es-NI")}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  puntos
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PodiumCard({
  row,
  place,
}: {
  row: NonNullable<LiveStateResponse["reveal"]>["leaderboard"][number] | undefined;
  place: 1 | 2 | 3;
}) {
  const styles =
    place === 1
      ? {
          height: "sm:min-h-[270px]",
          order: "order-1 sm:order-2",
          card: "border-amber-400/60 bg-gradient-to-b from-amber-500/25 to-cln-900 ring-2 ring-amber-400/50",
          badge: "bg-amber-400 text-slate-950",
          label: "1.° Lugar · Oro",
        }
      : place === 2
      ? {
          height: "sm:min-h-[220px]",
          order: "order-2 sm:order-1",
          card: "border-slate-300/40 bg-gradient-to-b from-slate-300/20 to-cln-900",
          badge: "bg-slate-200 text-slate-950",
          label: "2.° Lugar · Plata",
        }
      : {
          height: "sm:min-h-[195px]",
          order: "order-3",
          card: "border-amber-700/50 bg-gradient-to-b from-amber-700/25 to-cln-900",
          badge: "bg-amber-700 text-white",
          label: "3.° Lugar · Bronce",
        };

  return (
    <div
      className={`flex flex-col justify-between rounded-3xl border p-6 text-center shadow-2xl ${styles.height} ${styles.order} ${styles.card}`}
    >
      <div className="flex flex-col items-center">
        {place === 1 && <Crown className="mb-2 h-10 w-10 text-amber-400" />}
        <span
          className={`inline-block rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider ${styles.badge}`}
        >
          {styles.label}
        </span>

        <h3 className="mt-4 break-words font-heading text-2xl font-black text-white sm:text-3xl">
          {row ? row.name : "—"}
        </h3>
      </div>

      {row && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="font-heading text-3xl font-black tabular-nums text-cln-orange">
            {row.score.toLocaleString("es-NI")} pts
          </p>
          <p className="mt-1 text-xs text-slate-300">
            {row.correctCount} aciertos · {formatSeconds(row.totalTimeMs)}
          </p>
        </div>
      )}
    </div>
  );
}

function PollHorizontalBars({
  options,
  counts,
  totalVotes,
}: {
  options: string[];
  counts: number[];
  totalVotes: number;
}) {
  const safeTotal = Math.max(1, totalVotes);

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl sm:p-8">
      {options.map((opt, idx) => {
        const theme = OPTION_THEMES[idx] ?? OPTION_THEMES[0];
        const count = counts[idx] ?? 0;
        const pct = totalVotes > 0 ? Math.round((count / safeTotal) * 100) : 0;

        return (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-heading text-base font-black text-white ${theme.solid}`}
                >
                  {theme.shape}
                </span>
                <span className="truncate text-lg font-bold text-white sm:text-xl">
                  {opt}
                </span>
              </div>

              <div className="flex shrink-0 items-baseline gap-2.5">
                <span className="font-heading text-xl font-black tabular-nums text-slate-200 sm:text-2xl">
                  {count}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {count === 1 ? "voto" : "votos"}
                </span>
                <span className="min-w-[56px] text-right font-heading text-2xl font-black tabular-nums text-cln-orange sm:text-3xl">
                  {pct}%
                </span>
              </div>
            </div>

            <div className="h-8 w-full overflow-hidden rounded-xl bg-black/35 sm:h-10">
              <div
                className={`h-full rounded-xl transition-all duration-700 ease-out ${theme.bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
