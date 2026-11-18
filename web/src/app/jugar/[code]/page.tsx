"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  getRevealCorrectIndices,
  OPTION_THEMES,
  type TriviaPublicQuestion,
  type TriviaRevealSnapshot,
  type TriviaSessionMode,
  type TriviaStatus,
} from "@/lib/trivia";
import { useSyncedTimer } from "@/lib/useSyncedTimer";

interface StoredPlayer {
  playerId: string;
  name: string;
}

const PLAYER_STORAGE_EVENT = "cln-trivia-player-change";

function subscribePlayerStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PLAYER_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PLAYER_STORAGE_EVENT, callback);
  };
}

function SvgIcon({ className = "h-5 w-5", children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const Award = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></SvgIcon>
);
const CheckCircle2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></SvgIcon>
);
const Clock = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></SvgIcon>
);
const Loader2 = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></SvgIcon>
);
const Send = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></SvgIcon>
);
const Sparkles = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="m12 3-1.91 5.81a2 2 0 0 1-1.28 1.28L3 12l5.81 1.91a2 2 0 0 1 1.28 1.28L12 21l1.91-5.81a2 2 0 0 1 1.28-1.28L21 12l-5.81-1.91a2 2 0 0 1-1.28-1.28Z" /></SvgIcon>
);
const Trophy = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></SvgIcon>
);
const XCircle = ({ className }: { className?: string }) => (
  <SvgIcon className={className}><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></SvgIcon>
);

interface PlayerStateResponse {
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
  playerExists: boolean;
  mySelectedOption: number | null;
  mySelectedOptions?: number[] | null;
  me: {
    name: string;
    score: number;
    correctCount: number;
    rank: number;
    lastAnswer: {
      optionIndex: number;
      optionIndices?: number[];
      isCorrect: boolean;
      points: number;
      elapsedMs: number;
    } | null;
  } | null;
}

export default function PlayTriviaRoomPage() {
  const params = useParams<{ code: string }>();
  const code = String(params?.code ?? "").toUpperCase();
  const storageKey = `cln-trivia-player-${code}`;

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const rawStoredPlayer = useSyncExternalStore(
    subscribePlayerStorage,
    () => window.localStorage.getItem(storageKey),
    () => null
  );

  const player = useMemo<StoredPlayer | null>(() => {
    if (!rawStoredPlayer) return null;
    try {
      const parsed = JSON.parse(rawStoredPlayer) as StoredPlayer;
      return parsed?.playerId && parsed?.name ? parsed : null;
    } catch {
      return null;
    }
  }, [rawStoredPlayer]);

  const [nameInput, setNameInput] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [state, setState] = useState<PlayerStateResponse | null>(null);
  const [clockOffsetMs, setClockOffsetMs] = useState(0);
  const [stateError, setStateError] = useState<string | null>(null);

  const [localSelection, setLocalSelection] = useState<{
    qIdx: number;
    version: number;
    options: number[];
  } | null>(null);
  const [draftMultiple, setDraftMultiple] = useState<{
    qIdx: number;
    version: number;
    options: number[];
  } | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingOption, setSubmittingOption] = useState<number | null>(null);
  const [answerErrorState, setAnswerErrorState] = useState<{
    qIdx: number;
    version: number;
    message: string;
  } | null>(null);

  const currentQIdx = state?.currentQuestionIndex ?? -1;
  const currentVersion = state?.stateVersion ?? -1;

  const localSelectedOptions =
    localSelection &&
    localSelection.qIdx === currentQIdx &&
    localSelection.version === currentVersion
      ? localSelection.options
      : null;

  const serverSelectedOptions =
    state?.mySelectedOptions && state.mySelectedOptions.length > 0
      ? state.mySelectedOptions
      : state?.mySelectedOption !== null && state?.mySelectedOption !== undefined
        ? [state.mySelectedOption]
        : null;

  const selectedOptions = localSelectedOptions ?? serverSelectedOptions;
  const hasSubmitted = selectedOptions !== null && selectedOptions.length > 0;

  const draftOptions =
    draftMultiple &&
    draftMultiple.qIdx === currentQIdx &&
    draftMultiple.version === currentVersion
      ? draftMultiple.options
      : [];

  const answerError =
    answerErrorState &&
    answerErrorState.qIdx === currentQIdx &&
    answerErrorState.version === currentVersion
      ? answerErrorState.message
      : null;

  const saveStoredPlayer = useCallback(
    (next: StoredPlayer | null) => {
      if (next) {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } else {
        window.localStorage.removeItem(storageKey);
      }
      window.dispatchEvent(new Event(PLAYER_STORAGE_EVENT));
    },
    [storageKey]
  );

  const isPoll = state?.mode === "poll";
  const autoJoinedRef = useRef(false);

  const timer = useSyncedTimer({
    enabled: state?.status === "question" && !isPoll,
    questionStartedAtMs: state?.questionStartedAtMs ?? null,
    timeLimitSec: state?.question?.timeLimitSec ?? 20,
    clockOffsetMs,
  });

  const joinAnonymousPoll = useCallback(async () => {
    setJoining(true);
    setJoinError(null);
    try {
      const res = await fetch("/api/trivia/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setJoinError(data.error || "No se pudo conectar a la encuesta.");
        autoJoinedRef.current = false;
        return;
      }
      saveStoredPlayer({
        playerId: data.playerId,
        name: data.name || "Anónimo",
      });
    } catch {
      setJoinError("Error de conexión al entrar. Toca el botón para reintentar.");
      autoJoinedRef.current = false;
    } finally {
      setJoining(false);
    }
  }, [code, saveStoredPlayer]);

  useEffect(() => {
    if (!hydrated || !isPoll || player) return;
    if (autoJoinedRef.current) return;
    autoJoinedRef.current = true;
    const id = window.setTimeout(() => {
      void joinAnonymousPoll();
    }, 0);
    return () => window.clearTimeout(id);
  }, [hydrated, isPoll, player, joinAnonymousPoll]);

  useEffect(() => {
    if (!hydrated || !code) return;
    let active = true;
    let timerId: number | null = null;

    async function poll() {
      const reqStart = Date.now();
      let nextDelay = 1200;

      try {
        const qs = new URLSearchParams({ code });
        if (player?.playerId) qs.set("playerId", player.playerId);

        const res = await fetch(`/api/trivia/state?${qs.toString()}`, {
          cache: "no-store",
        });
        const data = (await res.json()) as PlayerStateResponse & { error?: string };
        if (!active) return;

        if (!res.ok) {
          setStateError(data.error || "Sala no encontrada.");
        } else {
          const reqEnd = Date.now();
          const estimatedMid = (reqStart + reqEnd) / 2;
          setClockOffsetMs(data.serverNowMs - estimatedMid);
          setState(data);
          setStateError(null);

          // If host reset the room, player was cleared on DB -> return to join form cleanly
          if (player && !data.playerExists) {
            autoJoinedRef.current = false;
            window.localStorage.removeItem(storageKey);
            window.dispatchEvent(new Event(PLAYER_STORAGE_EVENT));
            setLocalSelection(null);
          }

          // Spread polling load while players are reading & answering an active question
          const inOpenAnswerWindow =
            data.status === "question" &&
            data.mySelectedOption === null &&
            localSelectedOptions === null;
          nextDelay = inOpenAnswerWindow ? 2000 : 1200;
        }
      } catch {
        if (active) setStateError("Reconectando...");
      } finally {
        if (active) {
          timerId = window.setTimeout(poll, nextDelay);
        }
      }
    }

    poll();
    return () => {
      active = false;
      if (timerId !== null) window.clearTimeout(timerId);
    };
  }, [hydrated, code, player, storageKey, localSelectedOptions]);

  async function handleJoin(e: FormEvent) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) {
      setJoinError("Escribe tu nombre (mínimo 2 caracteres).");
      return;
    }

    setJoining(true);
    setJoinError(null);
    try {
      const res = await fetch("/api/trivia/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setJoinError(data.error || "No se pudo ingresar a la sala.");
        return;
      }

      const nextPlayer: StoredPlayer = {
        playerId: data.playerId,
        name: data.name,
      };
      saveStoredPlayer(nextPlayer);
    } catch {
      setJoinError("Error de conexión. Intenta nuevamente.");
    } finally {
      setJoining(false);
    }
  }

  async function submitAnswer(optionIndices: number[]) {
    if (!player || !state?.question) return;
    if (hasSubmitted || submitting) return;
    if (!isPoll && !timer.isActiveWindow) return;
    if (optionIndices.length === 0) return;

    const qIdx = state.currentQuestionIndex;
    const version = state.stateVersion;
    setSubmitting(true);
    setSubmittingOption(optionIndices[0]);
    setAnswerErrorState(null);

    try {
      const res = await fetch("/api/trivia/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          playerId: player.playerId,
          questionIndex: qIdx,
          optionIndices,
        }),
      });
      const data = await res.json();

      if (res.status === 410 && data.reset) {
        saveStoredPlayer(null);
        setLocalSelection(null);
        return;
      }

      if (!res.ok) {
        setAnswerErrorState({
          qIdx,
          version,
          message: data.error || "No se pudo registrar tu respuesta.",
        });
        return;
      }

      const confirmed: number[] = Array.isArray(data.selectedOptions)
        ? data.selectedOptions
        : optionIndices;
      setLocalSelection({
        qIdx,
        version,
        options: confirmed,
      });
    } catch {
      setAnswerErrorState({
        qIdx,
        version,
        message: "Error de red al enviar. Intenta tocar de nuevo.",
      });
    } finally {
      setSubmitting(false);
      setSubmittingOption(null);
    }
  }

  function handleOptionTap(optionIndex: number) {
    if (!state?.question) return;
    if (state.question.type === "multiple") {
      const qIdx = state.currentQuestionIndex;
      const version = state.stateVersion;
      const exists = draftOptions.includes(optionIndex);
      const next = exists
        ? draftOptions.filter((x) => x !== optionIndex)
        : [...draftOptions, optionIndex].sort((a, b) => a - b);
      setDraftMultiple({ qIdx, version, options: next });
      return;
    }
    void submitAnswer([optionIndex]);
  }

  if (!hydrated || (!state && !stateError)) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-cln-950 p-6 text-white">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-cln-orange" />
          Cargando trivia...
        </div>
      </div>
    );
  }

  if (stateError && !state) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-cln-950 p-6 text-center text-white">
        <div className="max-w-sm rounded-2xl border border-rose-500/30 bg-rose-950/40 p-6">
          <h1 className="font-heading text-xl font-bold">Sala no disponible</h1>
          <p className="mt-2 text-sm text-rose-200">{stateError}</p>
        </div>
      </div>
    );
  }

  // Step 1: Join screen (Anonymous auto-entry for Poll; Name form for Trivia)
  if (!player) {
    if (isPoll) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-cln-950 px-5 py-8 text-white">
          <div className="w-full max-w-md space-y-5 rounded-3xl border border-white/10 bg-cln-900/90 p-7 text-center shadow-2xl">
            <div className="mx-auto relative h-12 w-36 overflow-hidden rounded-xl bg-white p-1.5 shadow">
              <Image
                src="/logo-horizontal.jpg"
                alt="CLN Expo Logístico"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <span className="inline-block rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 font-mono text-xs font-bold tracking-widest text-sky-300">
              ENCUESTA · SALA {code}
            </span>

            <h1 className="font-heading text-2xl font-extrabold">
              {state?.title ?? "Encuesta en Vivo"}
            </h1>

            {joinError ? (
              <div className="space-y-4">
                <p className="rounded-xl border border-rose-500/30 bg-rose-950/60 px-3.5 py-2.5 text-sm text-rose-200">
                  {joinError}
                </p>
                <button
                  type="button"
                  disabled={joining}
                  onClick={() => void joinAnonymousPoll()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cln-orange px-5 py-3.5 font-heading text-base font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-60"
                >
                  {joining ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  Entrar a Votar
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2.5 py-2 text-sm text-slate-300">
                <Loader2 className="h-5 w-5 animate-spin text-cln-orange" />
                Conectando directamente a la encuesta...
              </div>
            )}
          </div>
        </div>
      );
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

            <span className="mt-4 rounded-full border border-cln-orange/30 bg-cln-orange/15 px-3 py-1 font-mono text-xs font-bold tracking-widest text-cln-orange">
              SALA {code}
            </span>

            <h1 className="mt-3 font-heading text-2xl font-extrabold">
              {state?.title ?? "Trivia en Vivo"}
            </h1>
            {state?.conferenceTitle && (
              <p className="mt-1 text-xs text-slate-400">{state.conferenceTitle}</p>
            )}
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label
                htmlFor="player-name"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Ingresa tu nombre para participar
              </label>
              <input
                id="player-name"
                type="text"
                autoFocus
                maxLength={40}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ej. María González"
                className="w-full rounded-xl border border-white/15 bg-cln-950 px-4 py-3.5 text-base font-medium text-white placeholder:text-slate-500 focus:border-cln-orange focus:outline-none"
              />
            </div>

            {joinError && (
              <p className="rounded-xl border border-rose-500/30 bg-rose-950/60 px-3.5 py-2.5 text-sm text-rose-200">
                {joinError}
              </p>
            )}

            <button
              type="submit"
              disabled={joining}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cln-orange px-5 py-3.5 font-heading text-base font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-60"
            >
              {joining ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              Ingresar a la Trivia
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalSec = state?.question?.timeLimitSec ?? 20;
  const progressPct = Math.max(
    0,
    Math.min(100, (timer.remainingMs / (totalSec * 1000)) * 100)
  );
  const myScore = state?.me?.score ?? 0;
  const myRank = state?.me?.rank ?? 0;
  const lastAnswer = state?.me?.lastAnswer ?? null;

  return (
    <div className="flex min-h-dvh flex-col bg-cln-950 text-white">
      {/* Compact mobile header */}
      <header className="flex items-center justify-between border-b border-white/10 bg-cln-900/90 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-bold text-white">
            {isPoll ? state?.title || "Encuesta en Vivo" : player.name}
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            {isPoll ? `Voto anónimo · Sala ${code}` : `Sala ${code}`}
          </p>
        </div>

        {!isPoll && (
          <div className="flex items-center gap-2">
            {myRank > 0 && (
              <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-bold text-slate-200">
                #{myRank}
              </span>
            )}
            <span className="rounded-lg bg-cln-orange/20 px-3 py-1 font-heading text-sm font-extrabold tabular-nums text-cln-orange">
              {myScore.toLocaleString("es-NI")} pts
            </span>
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-6">
        {state?.status === "lobby" && (
          <div className="space-y-5 rounded-3xl border border-white/10 bg-cln-900/70 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="font-heading text-2xl font-extrabold">
              {isPoll ? "¡Listo para votar!" : `¡Ya estás dentro, ${player.name}!`}
            </h2>
            <p className="text-sm text-slate-300">
              {isPoll
                ? "Mira la pantalla del auditorio. Cuando el moderador abra la primera pregunta, tus opciones aparecerán aquí."
                : "Mira la pantalla del auditorio. Cuando el moderador inicie, tus opciones aparecerán aquí automáticamente."}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-cln-orange" />
              {isPoll ? "Esperando inicio de la encuesta..." : "Esperando inicio de la partida..."}
            </div>
          </div>
        )}

        {state?.status === "question" && state.question && (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>
                Pregunta {state.currentQuestionIndex + 1} de {state.totalQuestions}
              </span>
              {!isPoll ? (
                <span className="flex items-center gap-1 text-base font-extrabold tabular-nums text-white">
                  <Clock className="h-4 w-4 text-cln-orange" />
                  {timer.leadRemainingMs > 0
                    ? `${Math.ceil(timer.leadRemainingMs / 1000)}`
                    : `${Math.ceil(timer.remainingMs / 1000)}s`}
                </span>
              ) : (
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  Votación abierta
                </span>
              )}
            </div>

            {!isPoll && timer.leadRemainingMs > 0 ? (
              <div className="rounded-3xl border border-cln-orange/40 bg-cln-900/80 p-10 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-cln-orange">
                  Sincronizando...
                </p>
                <h2 className="mt-2 font-heading text-3xl font-black">¡Prepárate!</h2>
                <div className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-full bg-cln-orange font-heading text-4xl font-black text-white">
                  {Math.ceil(timer.leadRemainingMs / 1000)}
                </div>
              </div>
            ) : hasSubmitted && selectedOptions ? (
              <div className="space-y-4 rounded-3xl border border-emerald-400/30 bg-emerald-950/30 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h2 className="font-heading text-2xl font-extrabold">
                  {isPoll ? "¡Voto registrado!" : "¡Respuesta enviada!"}
                </h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedOptions.map((optIdx) => (
                    <div
                      key={optIdx}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold"
                    >
                      <span>{OPTION_THEMES[optIdx]?.shape}</span>
                      <span>{state.question!.options[optIdx]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-300">
                  {isPoll
                    ? "Mira el gráfico en vivo en la pantalla del auditorio. Esperando la siguiente pregunta..."
                    : "Esperando que cierre el reloj para ver si acertaste..."}
                </p>
              </div>
            ) : !isPoll && timer.isExpired ? (
              <div className="space-y-3 rounded-3xl border border-amber-400/30 bg-amber-950/30 p-8 text-center">
                <Clock className="mx-auto h-11 w-11 text-amber-400" />
                <h2 className="font-heading text-2xl font-extrabold">
                  ¡Tiempo agotado!
                </h2>
                <p className="text-sm text-slate-300">
                  Mira la pantalla principal para ver la respuesta correcta.
                </p>
              </div>
            ) : (
              <>
                {!isPoll && (
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
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
                )}

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  {state.question.type === "multiple" && (
                    <span className="mb-2 inline-block rounded-full border border-sky-400/40 bg-sky-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-sky-200">
                      {isPoll
                        ? "Selección múltiple · Marca una o varias y presiona Enviar"
                        : "Selección múltiple · Marca todas las correctas"}
                    </span>
                  )}
                  {state.question.type === "boolean" && !isPoll && (
                    <span className="mb-2 inline-block rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-200">
                      Verdadero o Falso
                    </span>
                  )}
                  <h2 className="font-heading text-xl font-bold leading-snug">
                    {state.question.text}
                  </h2>
                </div>

                {answerError && (
                  <p className="rounded-xl border border-rose-500/30 bg-rose-950/60 px-3.5 py-2 text-center text-sm text-rose-200">
                    {answerError}
                  </p>
                )}

                <div className="grid gap-3">
                  {state.question.options.map((opt, idx) => {
                    const theme = OPTION_THEMES[idx];
                    const isMultiple = state.question!.type === "multiple";
                    const isDraftChecked = isMultiple && draftOptions.includes(idx);
                    const isSendingThis = !isMultiple && submittingOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={submitting}
                        onClick={() => handleOptionTap(idx)}
                        className={`flex min-h-[74px] w-full items-center justify-between gap-3.5 rounded-2xl p-4 text-left font-bold text-white shadow-lg transition active:scale-[0.98] disabled:opacity-70 ${theme.bg} ${
                          isDraftChecked ? "ring-4 ring-white" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/25 text-xl font-black">
                            {isSendingThis ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              theme.shape
                            )}
                          </span>
                          <span className="text-base leading-snug">{opt}</span>
                        </div>
                        {isMultiple && (
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-black ${
                              isDraftChecked
                                ? "border-white bg-white text-slate-900"
                                : "border-white/50 bg-black/20 text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {state.question.type === "multiple" && (
                  <button
                    type="button"
                    disabled={draftOptions.length === 0 || submitting}
                    onClick={() => submitAnswer(draftOptions)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-heading text-base font-extrabold text-cln-950 shadow-xl transition hover:bg-slate-100 disabled:opacity-40"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    Enviar {draftOptions.length > 0 ? `(${draftOptions.length} seleccionadas)` : "respuesta"}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {state?.status === "reveal" && state.question && isPoll && (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-cln-900/80 p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-sky-400" />
            <h2 className="font-heading text-2xl font-extrabold">Votación cerrada</h2>
            <p className="text-sm text-slate-300">
              Mira los resultados finales en la pantalla principal. Esperando la siguiente pregunta...
            </p>
          </div>
        )}

        {state?.status === "reveal" && state.question && !isPoll && (
          <div className="space-y-5 text-center">
            {lastAnswer?.isCorrect ? (
              <div className="space-y-3 rounded-3xl border border-emerald-400/50 bg-emerald-950/50 p-8 shadow-xl">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
                <h2 className="font-heading text-3xl font-black text-emerald-300">
                  ¡Correcto!
                </h2>
                <p className="font-heading text-2xl font-extrabold text-white">
                  +{lastAnswer.points.toLocaleString("es-NI")} pts
                </p>
                <p className="text-xs text-emerald-200">
                  Respondido en {(lastAnswer.elapsedMs / 1000).toFixed(2)} s
                </p>
              </div>
            ) : lastAnswer && lastAnswer.points > 0 ? (
              <div className="space-y-3 rounded-3xl border border-amber-400/50 bg-amber-950/40 p-8 shadow-xl">
                <CheckCircle2 className="mx-auto h-14 w-14 text-amber-400" />
                <h2 className="font-heading text-2xl font-black text-amber-200">
                  ¡Parcialmente correcto!
                </h2>
                <p className="font-heading text-2xl font-extrabold text-white">
                  +{lastAnswer.points.toLocaleString("es-NI")} pts
                </p>
                <p className="text-xs text-amber-200">
                  Puntaje ponderado · {(lastAnswer.elapsedMs / 1000).toFixed(2)} s
                </p>
                {state.reveal && (
                  <p className="pt-1 text-sm text-slate-300">
                    Correctas:{" "}
                    <strong className="text-emerald-300">
                      {getRevealCorrectIndices(state.reveal)
                        .map((idx) => state.question!.options[idx])
                        .filter(Boolean)
                        .join(" · ")}
                    </strong>
                  </p>
                )}
              </div>
            ) : lastAnswer ? (
              <div className="space-y-3 rounded-3xl border border-rose-400/40 bg-rose-950/40 p-8">
                <XCircle className="mx-auto h-14 w-14 text-rose-400" />
                <h2 className="font-heading text-2xl font-black text-rose-200">
                  Respuesta incorrecta
                </h2>
                {state.reveal && (
                  <p className="text-sm text-slate-300">
                    Correcta:{" "}
                    <strong className="text-emerald-300">
                      {getRevealCorrectIndices(state.reveal)
                        .map((idx) => state.question!.options[idx])
                        .filter(Boolean)
                        .join(" · ")}
                    </strong>
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3 rounded-3xl border border-white/15 bg-white/5 p-8">
                <Clock className="mx-auto h-12 w-12 text-slate-400" />
                <h2 className="font-heading text-2xl font-bold">
                  Sin respuesta registrada
                </h2>
                {state.reveal && (
                  <p className="text-sm text-slate-300">
                    Correcta:{" "}
                    <strong className="text-emerald-300">
                      {getRevealCorrectIndices(state.reveal)
                        .map((idx) => state.question!.options[idx])
                        .filter(Boolean)
                        .join(" · ")}
                    </strong>
                  </p>
                )}
              </div>
            )}

            {state.me && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
                Posición actual:{" "}
                <strong className="text-cln-orange">#{state.me.rank}</strong> ·{" "}
                <strong>{state.me.score.toLocaleString("es-NI")} pts</strong>
              </div>
            )}
          </div>
        )}

        {state?.status === "leaderboard" && state.me && (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-cln-900/80 p-8 text-center">
            <Trophy className="mx-auto h-12 w-12 text-cln-orange" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Tu posición actual
            </p>
            <p className="font-heading text-6xl font-black text-white">
              #{state.me.rank}
            </p>
            <p className="font-heading text-2xl font-extrabold text-cln-orange">
              {state.me.score.toLocaleString("es-NI")} pts
            </p>
            <p className="text-sm text-slate-300">
              {state.me.correctCount} respuestas correctas
            </p>
            {state.me.rank <= 3 && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                ¡Estás en zona de Podio Top 3!
              </div>
            )}
          </div>
        )}

        {state?.status === "podium" && isPoll && (
          <div className="space-y-4 rounded-3xl border border-emerald-400/40 bg-cln-900/80 p-8 text-center shadow-2xl">
            <Sparkles className="mx-auto h-12 w-12 text-emerald-400" />
            <h2 className="font-heading text-3xl font-black">¡Encuesta finalizada!</h2>
            <p className="text-sm text-slate-300">
              ¡Gracias por compartir tu opinión en CLN Expo Logístico Nicaragua 2026!
            </p>
          </div>
        )}

        {state?.status === "podium" && !isPoll && state.me && (
          <div
            className={`space-y-5 rounded-3xl border p-8 text-center shadow-2xl ${
              state.me.rank <= 3
                ? "border-amber-400/60 bg-gradient-to-b from-amber-500/25 to-cln-900"
                : "border-white/10 bg-cln-900/80"
            }`}
          >
            <Award
              className={`mx-auto h-14 w-14 ${
                state.me.rank <= 3 ? "text-amber-400" : "text-cln-orange"
              }`}
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Resultado Final
              </p>
              <h2 className="mt-1 font-heading text-3xl font-black">
                {state.me.rank === 1
                  ? "¡1.° Lugar! Campeón"
                  : state.me.rank === 2
                  ? "¡2.° Lugar! Subcampeón"
                  : state.me.rank === 3
                  ? "¡3.° Lugar en el Podio!"
                  : `Puesto #${state.me.rank}`}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="font-heading text-3xl font-black text-cln-orange">
                {state.me.score.toLocaleString("es-NI")} pts
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {state.me.correctCount} de {state.totalQuestions} aciertos
              </p>
            </div>

            <p className="text-xs text-slate-400">
              ¡Gracias por participar en CLN Expo Logístico Nicaragua 2026!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
