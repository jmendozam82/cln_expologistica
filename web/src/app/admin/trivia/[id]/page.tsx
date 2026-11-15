"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TriviaQrCode from "@/components/TriviaQrCode";
import {
  OPTION_THEMES,
  type TriviaQuestion,
  type TriviaRevealSnapshot,
  type TriviaSessionRecord,
  type TriviaStatus,
} from "@/lib/trivia";
import { useSyncedTimer } from "@/lib/useSyncedTimer";

interface PresenterState {
  id: number;
  code: string;
  title: string;
  conferenceTitle: string | null;
  status: TriviaStatus;
  stateVersion: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionStartedAtMs: number | null;
  serverNowMs: number;
  reveal: TriviaRevealSnapshot | null;
  presenter: {
    playerCount: number;
    answerCount: number;
    recentPlayers: string[];
  } | null;
}

function emptyQuestion(index: number): TriviaQuestion {
  return {
    id: `q-${Date.now()}-${index}`,
    text: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    timeLimitSec: 20,
  };
}

export default function AdminTriviaDetailPage() {
  const params = useParams<{ id: string }>();
  const sessionId = Number(params.id);

  const [tab, setTab] = useState<"live" | "edit">("live");
  const [session, setSession] = useState<TriviaSessionRecord | null>(null);
  const [live, setLive] = useState<PresenterState | null>(null);
  const [clockOffsetMs, setClockOffsetMs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoReveal, setAutoReveal] = useState(true);

  // Estado del editor
  const [editTitle, setEditTitle] = useState("");
  const [editConference, setEditConference] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editQuestions, setEditQuestions] = useState<TriviaQuestion[]>([]);
  const [saving, setSaving] = useState(false);

  const autoRevealedKeyRef = useRef<string | null>(null);

  const loadSession = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/trivia/${sessionId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("No encontrada");
      const data = await res.json();
      const s = data.session as TriviaSessionRecord;
      setSession(s);
      setEditTitle(s.title);
      setEditConference(s.conferenceTitle ?? "");
      setEditCode(s.code);
      setEditQuestions(s.questions);
    } catch {
      setError("No se pudo cargar esta trivia.");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!(Number.isInteger(sessionId) && sessionId > 0)) return;
    const id = window.setTimeout(() => {
      void loadSession();
    }, 0);
    return () => window.clearTimeout(id);
  }, [sessionId, loadSession]);

  const pollState = useCallback(async (code: string) => {
    try {
      const res = await fetch(`/api/trivia/state?code=${encodeURIComponent(code)}&presenter=1`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as PresenterState;
      setClockOffsetMs(data.serverNowMs - Date.now());
      setLive(data);
    } catch {
      // silencioso para reintentar en el próximo ciclo
    }
  }, []);

  useEffect(() => {
    if (!session?.code) return;
    const initId = window.setTimeout(() => {
      void pollState(session.code);
    }, 0);
    const id = setInterval(() => pollState(session.code), 1200);
    return () => {
      window.clearTimeout(initId);
      clearInterval(id);
    };
  }, [session?.code, pollState]);

  const currentQuestion = useMemo(() => {
    if (!session) return null;
    const idx = live?.currentQuestionIndex ?? session.currentQuestionIndex;
    return session.questions[idx] ?? null;
  }, [session, live?.currentQuestionIndex]);

  const timer = useSyncedTimer({
    enabled: live?.status === "question",
    questionStartedAtMs: live?.questionStartedAtMs ?? null,
    timeLimitSec: currentQuestion?.timeLimitSec ?? 20,
    clockOffsetMs,
  });

  const runControl = useCallback(
    async (action: "start" | "reveal" | "leaderboard" | "next" | "podium" | "reset", questionIndex?: number) => {
      setError("");
      setNotice("");
      setBusyAction(action);
      try {
        const res = await fetch(`/api/admin/trivia/${sessionId}/control`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, questionIndex }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "No se pudo ejecutar la acción.");
          return;
        }
        const updated = data.session as TriviaSessionRecord;
        setSession(updated);
        await pollState(updated.code);
      } catch {
        setError("Error de red ejecutando la acción.");
      } finally {
        setBusyAction(null);
      }
    },
    [sessionId, pollState]
  );

  // Auto-revelar cuando expira el temporizador en modo en vivo
  useEffect(() => {
    if (!autoReveal || live?.status !== "question" || !timer.isExpired) return;
    const key = `${live.stateVersion}-${live.currentQuestionIndex}`;
    if (autoRevealedKeyRef.current === key) return;
    autoRevealedKeyRef.current = key;
    const timeout = setTimeout(() => {
      runControl("reveal");
    }, 900);
    return () => clearTimeout(timeout);
  }, [autoReveal, live?.status, live?.stateVersion, live?.currentQuestionIndex, timer.isExpired, runControl]);

  const joinUrl = useMemo(() => {
    if (!session?.code) return "";
    if (typeof window === "undefined") return `/jugar/${session.code}`;
    return `${window.location.origin}/jugar/${session.code}`;
  }, [session?.code]);

  const handleCopyUrl = async () => {
    if (!joinUrl) return;
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  const handleSaveEditor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const validQuestions = editQuestions.filter(
      (q) => q.text.trim() && q.options.every((o) => o.trim())
    );

    if (validQuestions.length !== editQuestions.length) {
      setError("Completa el texto y las 4 opciones en todas las preguntas antes de guardar.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/trivia/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          conferenceTitle: editConference.trim() || null,
          code: editCode.trim(),
          questions: validQuestions,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo guardar.");
        return;
      }
      setSession(data.session);
      setEditQuestions(data.session.questions);
      setNotice("Cambios guardados correctamente.");
      await pollState(data.session.code);
    } catch {
      setError("Error de conexión al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const updateQuestion = (idx: number, patch: Partial<TriviaQuestion>) => {
    setEditQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, ...patch } : q))
    );
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    setEditQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const nextOpts = [...q.options] as [string, string, string, string];
        nextOpts[optIdx] = value;
        return { ...q, options: nextOpts };
      })
    );
  };

  const moveQuestion = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= editQuestions.length) return;
    setEditQuestions((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(target, 0, item);
      return copy;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Cargando consola de trivia...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        <p className="text-red-600 font-semibold mb-4">{error || "Trivia no encontrada."}</p>
        <Link href="/admin/trivia" className="text-cln-600 font-bold underline">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  const status = live?.status ?? session.status;
  const qIndex = live?.currentQuestionIndex ?? session.currentQuestionIndex;
  const totalQ = session.questions.length;
  const playerCount = live?.presenter?.playerCount ?? 0;
  const answerCount = live?.presenter?.answerCount ?? 0;
  const isLastQuestion = totalQ > 0 && qIndex >= totalQ - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Link href="/admin/trivia" className="text-xs font-bold text-cln-600 hover:underline">
              ← Todas las trivias
            </Link>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-cln-950 mt-1">
              {session.title}
            </h1>
            {session.conferenceTitle && (
              <p className="text-sm text-gray-500">{session.conferenceTitle}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/live/${session.code}`}
              target="_blank"
              className="bg-cln-950 hover:bg-cln-900 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Abrir Pantalla Proyector ↗
            </Link>
            <button
              type="button"
              onClick={() => {
                if (confirm("¿Reiniciar la partida? Se borrarán los jugadores y respuestas actuales para empezar desde cero.")) {
                  runControl("reset");
                }
              }}
              disabled={busyAction !== null}
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Reiniciar Partida
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setTab("live")}
            className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              tab === "live"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Control en Vivo
          </button>
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              tab === "edit"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Editor de Preguntas ({editQuestions.length})
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">
            {notice}
          </div>
        )}

        {/* TAB 1: CONTROL EN VIVO */}
        {tab === "live" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel izquierdo: Controles y pregunta actual */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Estado de la sala
                    </span>
                    <p className="font-heading font-extrabold text-xl text-cln-950 capitalize">
                      {status === "lobby" && "Sala de espera (Lobby)"}
                      {status === "question" && `Pregunta ${qIndex + 1} de ${totalQ} en curso`}
                      {status === "reveal" && `Respuesta revelada (${qIndex + 1}/${totalQ})`}
                      {status === "leaderboard" && `Tabla de Ranking (${qIndex + 1}/${totalQ})`}
                      {status === "podium" && "Podio Final — Top 3"}
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                    <input
                      type="checkbox"
                      checked={autoReveal}
                      onChange={(e) => setAutoReveal(e.target.checked)}
                    />
                    Auto-revelar al acabar el tiempo
                  </label>
                </div>

                {/* Pregunta actual preview + timer */}
                {currentQuestion ? (
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cln-600">
                        Pregunta {qIndex + 1} de {totalQ} · {currentQuestion.timeLimitSec}s
                      </span>
                      {status === "question" && (
                        <span className="font-mono text-sm font-extrabold text-orange-600">
                          {timer.leadRemainingMs > 0
                            ? `Iniciando en ${Math.ceil(timer.leadRemainingMs / 1000)}s...`
                            : `${Math.ceil(timer.remainingMs / 1000)}s restantes`}
                        </span>
                      )}
                    </div>
                    <p className="font-heading font-bold text-lg text-cln-950 mb-4">
                      {currentQuestion.text}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentQuestion.options.map((opt, idx) => {
                        const t = OPTION_THEMES[idx];
                        const isCorrect = idx === currentQuestion.correctIndex;
                        return (
                          <div
                            key={idx}
                            className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between border ${
                              isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                                : "bg-white border-gray-200 text-gray-700"
                            }`}
                          >
                            <span>
                              <strong className="mr-1.5">{t.letter}.</strong>
                              {opt}
                            </span>
                            {isCorrect && (
                              <span className="text-xs font-bold text-emerald-700">✓ Correcta</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Barra de respuestas recibidas */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs font-bold text-gray-600">
                      <span>
                        Respuestas recibidas: {answerCount} / {playerCount}
                      </span>
                      <span>
                        {playerCount > 0 ? Math.round((answerCount / playerCount) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 mb-6 text-sm text-amber-800">
                    Esta trivia aún no tiene preguntas. Ve a la pestaña{" "}
                    <button
                      type="button"
                      onClick={() => setTab("edit")}
                      className="font-bold underline cursor-pointer"
                    >
                      Editor de Preguntas
                    </button>{" "}
                    para agregarlas.
                  </div>
                )}

                {/* Botones de flujo en vivo */}
                <div className="flex flex-wrap gap-3">
                  {status === "lobby" && (
                    <button
                      type="button"
                      disabled={totalQ === 0 || busyAction !== null}
                      onClick={() => runControl("start", 0)}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      {busyAction === "start" ? "Iniciando..." : "▶ Iniciar Pregunta 1"}
                    </button>
                  )}

                  {status === "question" && (
                    <button
                      type="button"
                      disabled={busyAction !== null}
                      onClick={() => runControl("reveal")}
                      className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Cerrar y Revelar Respuesta
                    </button>
                  )}

                  {status === "reveal" && (
                    <>
                      <button
                        type="button"
                        disabled={busyAction !== null}
                        onClick={() => runControl(isLastQuestion ? "podium" : "leaderboard")}
                        className="bg-cln-600 hover:bg-cln-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        {isLastQuestion ? "🏆 Mostrar Podio Final (Top 3)" : "Ver Ranking en Vivo →"}
                      </button>
                      {!isLastQuestion && (
                        <button
                          type="button"
                          disabled={busyAction !== null}
                          onClick={() => runControl("next")}
                          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer"
                        >
                          Saltar directo a Pregunta {qIndex + 2}
                        </button>
                      )}
                    </>
                  )}

                  {status === "leaderboard" && (
                    <button
                      type="button"
                      disabled={busyAction !== null}
                      onClick={() => runControl(isLastQuestion ? "podium" : "next")}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      {isLastQuestion
                        ? "🏆 Mostrar Podio Final (Top 3)"
                        : `▶ Siguiente Pregunta (${qIndex + 2} de ${totalQ})`}
                    </button>
                  )}

                  {status === "podium" && (
                    <button
                      type="button"
                      disabled={busyAction !== null}
                      onClick={() => runControl("reset")}
                      className="bg-cln-950 hover:bg-cln-900 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      ↻ Reiniciar Partida para Otro Grupo
                    </button>
                  )}
                </div>
              </div>

              {/* Vista rápida del Ranking actual */}
              {live?.reveal && live.reveal.leaderboard.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h3 className="font-heading font-bold text-lg text-cln-950 mb-4">
                    Tabla de Ranking Actual (Top {Math.min(10, live.reveal.leaderboard.length)})
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {live.reveal.leaderboard.slice(0, 10).map((row) => (
                      <div key={row.playerId} className="py-2.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                              row.rank === 1
                                ? "bg-amber-400 text-amber-950"
                                : row.rank === 2
                                  ? "bg-slate-300 text-slate-900"
                                  : row.rank === 3
                                    ? "bg-orange-300 text-orange-950"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {row.rank}
                          </span>
                          <span className="font-bold text-sm text-gray-900 truncate">{row.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-shrink-0">
                          <span>{row.correctCount} aciertos</span>
                          <span>{(row.totalTimeMs / 1000).toFixed(1)}s</span>
                          <span className="font-heading font-extrabold text-sm text-cln-900">
                            {row.score} pts
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna derecha: QR de acceso y conectados */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
                  Acceso por QR
                </span>
                <p className="font-mono text-2xl font-black text-cln-950 tracking-wider mb-4">
                  {session.code}
                </p>

                <TriviaQrCode url={joinUrl} size={200} className="border border-gray-100 mb-4" />

                <p className="text-xs text-gray-500 break-all mb-3">{joinUrl}</p>

                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? "✓ Enlace copiado" : "Copiar enlace de acceso"}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-base text-cln-950">
                    Participantes en sala
                  </h3>
                  <span className="rounded-full bg-cln-50 text-cln-700 font-bold text-xs px-2.5 py-0.5">
                    {playerCount}
                  </span>
                </div>

                {playerCount === 0 ? (
                  <p className="text-xs text-gray-400">
                    Esperando que los asistentes escaneen el código QR...
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
                    {(live?.presenter?.recentPlayers ?? []).map((name, idx) => (
                      <span
                        key={`${name}-${idx}`}
                        className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR DE PREGUNTAS */}
        {tab === "edit" && (
          <form onSubmit={handleSaveEditor} className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Nombre de la Trivia
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Conferencia
                </label>
                <input
                  type="text"
                  value={editConference}
                  onChange={(e) => setEditConference(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Código de Sala
                </label>
                <input
                  type="text"
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value.toUpperCase())}
                  maxLength={12}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-mono uppercase"
                  required
                />
              </div>
            </div>

            {editQuestions.map((q, qIdx) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-heading font-extrabold text-base text-cln-950">
                    Pregunta {qIdx + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    <select
                      value={q.timeLimitSec}
                      onChange={(e) =>
                        updateQuestion(qIdx, { timeLimitSec: Number(e.target.value) })
                      }
                      className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-bold bg-white"
                      aria-label="Tiempo límite"
                    >
                      {[10, 15, 20, 30, 45, 60].map((sec) => (
                        <option key={sec} value={sec}>
                          {sec} segundos
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => moveQuestion(qIdx, -1)}
                      disabled={qIdx === 0}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 text-xs font-bold disabled:opacity-40 cursor-pointer"
                      title="Subir"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveQuestion(qIdx, 1)}
                      disabled={qIdx === editQuestions.length - 1}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 text-xs font-bold disabled:opacity-40 cursor-pointer"
                      title="Bajar"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditQuestions((prev) => prev.filter((_, i) => i !== qIdx))
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => updateQuestion(qIdx, { text: e.target.value })}
                  placeholder="Escribe aquí la pregunta..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold focus:border-cln-600 focus:outline-none"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const t = OPTION_THEMES[optIdx];
                    const isCorrect = q.correctIndex === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 rounded-xl border p-2 transition-colors ${
                          isCorrect
                            ? "border-emerald-400 bg-emerald-50/70"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQuestion(qIdx, { correctIndex: optIdx as 0 | 1 | 2 | 3 })
                          }
                          className={`w-9 h-9 rounded-lg font-extrabold text-white text-xs flex items-center justify-center flex-shrink-0 cursor-pointer ${
                            isCorrect ? "bg-emerald-600 ring-2 ring-emerald-300" : t.solid
                          }`}
                          title="Marcar como respuesta correcta"
                        >
                          {isCorrect ? "✓" : t.letter}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                          placeholder={`Opción ${t.letter}`}
                          className="flex-1 bg-transparent text-sm px-2 py-1 focus:outline-none"
                          required
                        />
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400">
                  Haz clic en el cuadro de color (A, B, C o D) para marcar la respuesta correcta.
                </p>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setEditQuestions((prev) => [...prev, emptyQuestion(prev.length)])
                }
                className="bg-white border-2 border-dashed border-cln-300 hover:border-cln-500 text-cln-700 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                + Agregar Pregunta
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {saving ? "Guardando..." : "Guardar Preguntas"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
