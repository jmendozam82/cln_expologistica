"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CONFERENCE_SCHEDULE } from "@/lib/agenda";

interface SessionSummary {
  id: number;
  code: string;
  title: string;
  conferenceTitle: string | null;
  status: string;
  currentQuestionIndex: number;
  questionCount: number;
  playerCount: number;
  createdAt: string;
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  lobby: { label: "En espera", cls: "bg-gray-100 text-gray-700" },
  question: { label: "Pregunta en vivo", cls: "bg-orange-100 text-orange-700" },
  reveal: { label: "Mostrando respuesta", cls: "bg-sky-100 text-sky-700" },
  leaderboard: { label: "Ranking en vivo", cls: "bg-indigo-100 text-indigo-700" },
  podium: { label: "Podio final", cls: "bg-emerald-100 text-emerald-700" },
};

const CONFERENCE_OPTIONS = Array.from(new Set(CONFERENCE_SCHEDULE.map((c) => c.title)));

export default function AdminTriviaListPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [conferenceTitle, setConferenceTitle] = useState(CONFERENCE_OPTIONS[0] ?? "");
  const [customConference, setCustomConference] = useState("");
  const [code, setCode] = useState("");
  const [seedExample, setSeedExample] = useState(true);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/trivia", { cache: "no-store" });
      if (!res.ok) throw new Error("Error al cargar trivias");
      const data = await res.json();
      setSessions(data.sessions ?? []);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la lista de trivias.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void loadSessions();
    }, 0);
    return () => window.clearTimeout(id);
  }, [loadSessions]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Ingresa un título para la trivia.");
      return;
    }

    setCreating(true);
    try {
      const resolvedConference =
        conferenceTitle === "__custom__" ? customConference.trim() : conferenceTitle;

      const sampleQuestions = seedExample
        ? [
            {
              id: "sample-1",
              text: "¿Cuál es el objetivo principal de una Torre de Control Logística?",
              options: [
                "Aumentar el tamaño físico del almacén",
                "Integrar datos dispersos para tomar decisiones en tiempo real",
                "Reemplazar el transporte marítimo",
                "Eliminar los inventarios de seguridad",
              ],
              correctIndex: 1,
              timeLimitSec: 20,
            },
            {
              id: "sample-2",
              text: "¿Qué permite evaluar la visibilidad End-to-End en Supply Chain?",
              options: [
                "Solo la facturación mensual",
                "Únicamente el mantenimiento de montacargas",
                "El flujo completo desde el proveedor hasta la entrega final",
                "Exclusivamente el consumo eléctrico",
              ],
              correctIndex: 2,
              timeLimitSec: 20,
            },
          ]
        : [];

      const res = await fetch("/api/admin/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          conferenceTitle: resolvedConference || null,
          code: code.trim() || undefined,
          questions: sampleQuestions,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo crear la trivia.");
        return;
      }
      setTitle("");
      setCode("");
      await loadSessions();
    } catch {
      setError("Error de conexión al crear la trivia.");
    } finally {
      setCreating(false);
    }
  };

  const handleReset = async (id: number, sessionTitle: string) => {
    if (!confirm(`¿Reiniciar la partida "${sessionTitle}"? Se limpiarán los participantes y puntajes actuales, conservando las preguntas.`)) {
      return;
    }
    await fetch(`/api/admin/trivia/${id}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset" }),
    });
    await loadSessions();
  };

  const handleDelete = async (id: number, sessionTitle: string) => {
    if (!confirm(`¿Eliminar definitivamente la trivia "${sessionTitle}"?`)) {
      return;
    }
    await fetch(`/api/admin/trivia/${id}`, { method: "DELETE" });
    await loadSessions();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
              EXPO LOGÍSTICA · CLN · 2026
            </p>
            <h1 className="font-heading font-extrabold text-3xl text-cln-950">
              Administrador de Preguntas Interactivas
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Crea trivias por conferencia, proyecta el código QR en el salón y controla el ranking y podio Top 3 en vivo.
            </p>
          </div>

          <Link
            href="/admin/registros"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ← Ver Registros del Congreso
          </Link>
        </div>

        {/* Crear nueva trivia */}
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8"
        >
          <h2 className="font-heading font-bold text-lg text-cln-950 mb-4">
            Nueva Trivia / Sesión Interactiva
          </h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Nombre de la Trivia *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Reto Torre de Control"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-cln-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Conferencia asociada
              </label>
              <select
                value={conferenceTitle}
                onChange={(e) => setConferenceTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm bg-white focus:border-cln-600 focus:outline-none"
              >
                {CONFERENCE_OPTIONS.map((conf) => (
                  <option key={conf} value={conf}>
                    {conf}
                  </option>
                ))}
                <option value="__custom__">Otra / Personalizada...</option>
              </select>
              {conferenceTitle === "__custom__" && (
                <input
                  type="text"
                  value={customConference}
                  onChange={(e) => setCustomConference(e.target.value)}
                  placeholder="Nombre de la sesión"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-cln-600 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Código de Sala (opcional)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Auto (ej. CLN4X2)"
                maxLength={12}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm uppercase focus:border-cln-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={seedExample}
                onChange={(e) => setSeedExample(e.target.checked)}
                className="rounded border-gray-300 text-cln-600"
              />
              Incluir 2 preguntas de ejemplo para probar rápido
            </label>

            <button
              type="submit"
              disabled={creating}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {creating ? "Creando..." : "+ Crear Trivia"}
            </button>
          </div>
        </form>

        {/* Lista de trivias */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            Cargando sesiones de trivia...
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="font-heading font-bold text-lg text-cln-950 mb-1">
              Aún no hay trivias creadas
            </p>
            <p className="text-sm text-gray-500">
              Crea tu primera trivia arriba para generar el QR, editar preguntas y probar el ranking en vivo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((s) => {
              const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.lobby;
              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-cln-950 text-white font-mono text-xs font-bold px-2.5 py-1 tracking-wider">
                        SALA: {s.code}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-xl text-cln-950 mb-1">
                      {s.title}
                    </h3>
                    {s.conferenceTitle && (
                      <p className="text-sm text-gray-500 mb-3">{s.conferenceTitle}</p>
                    )}

                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
                      <span>{s.questionCount} preguntas</span>
                      <span>·</span>
                      <span>{s.playerCount} participantes en sala</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                    <Link
                      href={`/admin/trivia/${s.id}`}
                      className="bg-cln-600 hover:bg-cln-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      Control en Vivo / Editar
                    </Link>
                    <Link
                      href={`/live/${s.code}`}
                      target="_blank"
                      className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      Proyector ↗
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleReset(s.id, s.title)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Reiniciar Partida
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id, s.title)}
                      className="ml-auto text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
