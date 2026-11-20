"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import * as XLSX from "xlsx";
import RaffleWheel, { type WheelParticipant } from "@/components/RaffleWheel";

interface DbParticipant extends WheelParticipant {
  status: string;
}

interface WinnerRecord {
  id: string;
  nombre: string;
  empresa: string | null;
  cargo: string | null;
  prize: string;
  wonAt: string;
}

interface StoredUpload {
  fileName: string;
  participants: WheelParticipant[];
}

type StatusFilter = "all" | "paid" | "pending";
type SourceMode = "upload" | "db";

const WINNERS_STORAGE_KEY = "cln-raffle-winners-2026";
const WINNERS_EVENT = "cln-raffle-winners-change";
const UPLOAD_STORAGE_KEY = "cln-raffle-upload-2026";
const UPLOAD_EVENT = "cln-raffle-upload-change";
const SPIN_DURATION_MS = 6500;
const TWO_PI = Math.PI * 2;

function normalizeHeader(h: string): string {
  return h
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function subscribeWinners(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(WINNERS_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(WINNERS_EVENT, cb);
  };
}

function subscribeUpload(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(UPLOAD_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(UPLOAD_EVENT, cb);
  };
}

function getCryptoRandomUnit(): number {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / 4294967296;
  }
  return Math.random();
}

export default function AdminRifasPage() {
  const [sourceMode, setSourceMode] = useState<SourceMode>("upload");
  const [dbParticipants, setDbParticipants] = useState<DbParticipant[]>([]);
  const [manualParticipants, setManualParticipants] = useState<WheelParticipant[]>([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [excludeWinners, setExcludeWinners] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [prizeTitle, setPrizeTitle] = useState("Rifa en Vivo");
  const [manualInput, setManualInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadNotice, setUploadNotice] = useState("");

  // Estado de ruleta y audio
  const [spinning, setSpinning] = useState(false);
  const [startRotation, setStartRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<WheelParticipant | null>(null);
  const [pendingWinner, setPendingWinner] = useState<WheelParticipant | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const chosenWinnerRef = useRef<WheelParticipant | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastTickAtRef = useRef<number>(0);

  const rawWinners = useSyncExternalStore(
    subscribeWinners,
    () => window.localStorage.getItem(WINNERS_STORAGE_KEY),
    () => null
  );

  const winners = useMemo<WinnerRecord[]>(() => {
    if (!rawWinners) return [];
    try {
      const parsed = JSON.parse(rawWinners);
      return Array.isArray(parsed) ? (parsed as WinnerRecord[]) : [];
    } catch {
      return [];
    }
  }, [rawWinners]);

  const rawUpload = useSyncExternalStore(
    subscribeUpload,
    () => window.localStorage.getItem(UPLOAD_STORAGE_KEY),
    () => null
  );

  const uploadedData = useMemo<StoredUpload | null>(() => {
    if (!rawUpload) return null;
    try {
      const parsed = JSON.parse(rawUpload) as StoredUpload;
      return parsed && Array.isArray(parsed.participants) ? parsed : null;
    } catch {
      return null;
    }
  }, [rawUpload]);

  const saveUpload = useCallback((next: StoredUpload | null) => {
    if (next) {
      window.localStorage.setItem(UPLOAD_STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(UPLOAD_STORAGE_KEY);
    }
    window.dispatchEvent(new Event(UPLOAD_EVENT));
  }, []);

  const saveWinners = useCallback((next: WinnerRecord[]) => {
    window.localStorage.setItem(WINNERS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(WINNERS_EVENT));
  }, []);

  const handleFileUpload = async (file: File) => {
    setError("");
    setUploadNotice("");
    try {
      const buf = await file.arrayBuffer();
      const workbook = XLSX.read(buf, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        setError("El archivo está vacío o no contiene hojas.");
        return;
      }

      const sheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
        defval: "",
      });

      if (rows.length === 0) {
        setError("El archivo no contiene filas con datos.");
        return;
      }

      const headers = Object.keys(rows[0]);
      const participanteKey = headers.find((h) => {
        const norm = normalizeHeader(h);
        return norm === "participante" || norm === "participantes";
      });

      if (!participanteKey) {
        setError(
          `No se encontró la columna "Participante" en el archivo. Columnas detectadas: ${headers.join(", ")}`
        );
        return;
      }

      const empresaKey = headers.find((h) => normalizeHeader(h) === "empresa");
      const cargoKey = headers.find((h) => {
        const norm = normalizeHeader(h);
        return norm === "cargo" || norm === "puesto";
      });

      const parsed: WheelParticipant[] = [];
      for (let i = 0; i < rows.length; i += 1) {
        const r = rows[i];
        const nombre = String(r[participanteKey] ?? "").trim();
        if (!nombre) continue;

        const empresa = empresaKey ? String(r[empresaKey] ?? "").trim() || null : null;
        const cargo = cargoKey ? String(r[cargoKey] ?? "").trim() || null : null;
        parsed.push({
          id: `file-${i}-${nombre.toLowerCase()}`,
          nombre,
          empresa,
          cargo,
        });
      }

      if (parsed.length === 0) {
        setError('La columna "Participante" no contiene nombres válidos.');
        return;
      }

      saveUpload({ fileName: file.name, participants: parsed });
      setSourceMode("upload");
      setExcludedIds([]);
      setHighlighted(null);
      setPendingWinner(null);
      setUploadNotice(
        `Se cargaron ${parsed.length} participantes desde "${file.name}" (columna "${participanteKey}").`
      );
    } catch {
      setError("No se pudo leer el archivo. Asegúrate de subir un .xlsx, .xls o .csv válido.");
    }
  };

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Participante: "María González", Empresa: "Empresa Ejemplo", Cargo: "Gerente de Logística" },
      { Participante: "Carlos Mendoza", Empresa: "Distribuidora CLN", Cargo: "Jefe de Operaciones" },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participantes");
    XLSX.writeFile(wb, "Plantilla_Participantes_Rifa_CLN.xlsx");
  };

  const loadParticipants = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/rifas", { cache: "no-store" });
      if (!res.ok) throw new Error("Error cargando registrados");
      const data = await res.json();
      setDbParticipants(data.participants ?? []);
    } catch {
      setError("No se pudieron cargar los participantes desde la base de datos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void loadParticipants();
    }, 0);
    return () => window.clearTimeout(id);
  }, [loadParticipants]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  const ensureAudioReady = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return null;
      audioCtxRef.current = new AudioCtor();
    }
    if (audioCtxRef.current.state === "suspended") {
      void audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playTickSound = useCallback(() => {
    if (!soundEnabled) return;
    const nowMs = performance.now();
    if (nowMs - lastTickAtRef.current < 32) return;
    lastTickAtRef.current = nowMs;

    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(920, t);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.025);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.035);
  }, [soundEnabled]);

  const playFanfare = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
    const t0 = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const start = t0 + idx * 0.095;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.58);
    });
  }, [soundEnabled]);

  const winnerIdsSet = useMemo(() => new Set(winners.map((w) => w.id)), [winners]);
  const excludedSet = useMemo(() => new Set(excludedIds), [excludedIds]);

  const filteredByStatus = useMemo(() => {
    if (sourceMode === "upload") {
      return [...(uploadedData?.participants ?? []), ...manualParticipants];
    }
    const base = dbParticipants.filter((p) => {
      if (statusFilter === "paid") return p.status === "Pago Realizado";
      if (statusFilter === "pending") return p.status !== "Pago Realizado";
      return true;
    });
    return [...base, ...manualParticipants];
  }, [sourceMode, uploadedData, dbParticipants, manualParticipants, statusFilter]);

  const eligibleParticipants = useMemo(() => {
    return filteredByStatus.filter((p) => {
      if (excludedSet.has(p.id)) return false;
      if (excludeWinners && winnerIdsSet.has(p.id)) return false;
      return true;
    });
  }, [filteredByStatus, excludedSet, excludeWinners, winnerIdsSet]);

  const searchableList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredByStatus;
    return filteredByStatus.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        (p.empresa ?? "").toLowerCase().includes(q)
    );
  }, [filteredByStatus, searchQuery]);

  const paidCount = useMemo(
    () => dbParticipants.filter((p) => p.status === "Pago Realizado").length,
    [dbParticipants]
  );

  const handleSpin = useCallback(() => {
    if (spinning || eligibleParticipants.length === 0) return;

    ensureAudioReady();
    setPendingWinner(null);

    const count = eligibleParticipants.length;
    const winnerIdx = Math.floor(getCryptoRandomUnit() * count);
    const chosen = eligibleParticipants[winnerIdx];
    chosenWinnerRef.current = chosen;

    const sliceAngle = TWO_PI / count;
    const sliceOffset = 0.2 + getCryptoRandomUnit() * 0.6;
    const desiredAngle = -(winnerIdx + sliceOffset) * sliceAngle;
    const desiredMod = ((desiredAngle % TWO_PI) + TWO_PI) % TWO_PI;
    const currentMod = ((startRotation % TWO_PI) + TWO_PI) % TWO_PI;
    const forwardDelta = ((desiredMod - currentMod) + TWO_PI) % TWO_PI;
    const extraTurns = (8 + Math.floor(getCryptoRandomUnit() * 3)) * TWO_PI;
    const nextTarget = startRotation + extraTurns + forwardDelta;

    setHighlighted(eligibleParticipants[0] ?? null);
    setTargetRotation(nextTarget);
    setSpinning(true);
  }, [spinning, eligibleParticipants, ensureAudioReady, startRotation]);

  const handleSpinEnd = useCallback(() => {
    setSpinning(false);
    if (targetRotation !== null) {
      setStartRotation(targetRotation);
    }
    const winner = chosenWinnerRef.current;
    if (winner) {
      setHighlighted(winner);
      setPendingWinner(winner);
      playFanfare();
    }
  }, [targetRotation, playFanfare]);

  const handleConfirmWinner = () => {
    if (!pendingWinner) return;
    const record: WinnerRecord = {
      id: pendingWinner.id,
      nombre: pendingWinner.nombre,
      empresa: pendingWinner.empresa ?? null,
      cargo: pendingWinner.cargo ?? null,
      prize: prizeTitle.trim() || `Premio #${winners.length + 1}`,
      wonAt: new Date().toLocaleTimeString("es-NI", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveWinners([record, ...winners]);
    setPendingWinner(null);
  };

  const handleAddManualNames = () => {
    const lines = manualInput
      .split(/\r?\n|,/)
      .map((l) => l.trim())
      .filter((l) => l.length >= 2);
    if (lines.length === 0) return;

    const added: WheelParticipant[] = lines.map((nombre, idx) => ({
      id: `manual-${Date.now()}-${idx}`,
      nombre,
      empresa: "Invitado adicional",
      cargo: null,
    }));
    setManualParticipants((prev) => [...prev, ...added]);
    setManualInput("");
  };

  const toggleExcludeParticipant = (id: string) => {
    setExcludedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  async function toggleFullscreen() {
    ensureAudioReady();
    try {
      if (!document.fullscreenElement) {
        await (stageRef.current ?? document.documentElement).requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // noop
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado Admin */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
              EXPO LOGÍSTICA · CLN · 2026
            </p>
            <h1 className="font-heading font-extrabold text-3xl text-cln-950">
              Rifa en Vivo · Ruleta de Participantes
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sortea premios en tiempo real con todos los asistentes registrados y proyecta la ruleta en pantalla completa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/registros"
              className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              ← Registros
            </Link>
            <Link
              href="/admin/trivia"
              className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Trivia y Encuestas
            </Link>
            <button
              type="button"
              onClick={() => void loadParticipants()}
              disabled={loading || spinning}
              className="px-4 py-2.5 rounded-lg bg-cln-950 hover:bg-cln-900 disabled:opacity-50 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              {loading ? "Actualizando..." : "↻ Recargar Nombres"}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}
        {uploadNotice && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium px-4 py-3">
            ✓ {uploadNotice}
          </div>
        )}

        {/* Escenario Proyectable de Ruleta (soporta Pantalla Completa directa) */}
        <div
          ref={stageRef}
          className={`relative overflow-hidden bg-cln-950 text-white shadow-2xl ${
            isFullscreen
              ? "flex min-h-dvh w-screen flex-col justify-between p-6 sm:p-10"
              : "rounded-3xl border border-cln-900 p-6 sm:p-8"
          }`}
        >
          {/* Luces decorativas */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cln-blue/25 blur-3xl" />
            <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-cln-orange/20 blur-3xl" />
          </div>

          {/* Barra superior del escenario */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-32 overflow-hidden rounded-lg bg-white px-2 py-1 shadow">
                <Image
                  src="/logo-horizontal.jpg"
                  alt="CLN Expo Logístico"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-cln-orange">
                  Rifa Oficial en Vivo
                </span>
                <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
                  {prizeTitle || "Rifa en Vivo"}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100">
                <strong className="font-heading text-lg text-emerald-400 tabular-nums">
                  {eligibleParticipants.length}
                </strong>{" "}
                participantes en ruleta
              </span>

              <button
                type="button"
                onClick={() => {
                  ensureAudioReady();
                  setSoundEnabled((prev) => !prev);
                }}
                className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  soundEnabled
                    ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
                    : "border-white/15 bg-white/5 text-slate-400"
                }`}
              >
                {soundEnabled ? "🔊 Sonido Activo" : "🔇 Silenciado"}
              </button>

              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="rounded-xl border border-cln-orange/50 bg-cln-orange px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-orange-600 transition cursor-pointer"
              >
                {isFullscreen ? "Salir Pantalla Completa" : "🖥️ Modo Proyector"}
              </button>
            </div>
          </div>

          {/* Zona Central: Ruleta + Panel de Acción */}
          <div className="relative z-10 my-auto grid items-center gap-8 py-6 lg:grid-cols-12">
            <div className="flex justify-center lg:col-span-7">
              <RaffleWheel
                participants={eligibleParticipants}
                spinning={spinning}
                targetRotation={targetRotation}
                startRotation={startRotation}
                spinDurationMs={SPIN_DURATION_MS}
                onHighlightChange={setHighlighted}
                onTick={playTickSound}
                onSpinEnd={handleSpinEnd}
                size={isFullscreen ? 590 : 500}
              />
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {spinning ? "Pasando por el puntero..." : "Seleccionado actual"}
                </p>
                <p className="mt-2 min-h-[2.25rem] break-words font-heading text-2xl font-black text-cln-orange sm:text-3xl">
                  {highlighted
                    ? highlighted.nombre
                    : eligibleParticipants.length > 0
                      ? "¡Listos para girar!"
                      : sourceMode === "upload" && !uploadedData
                        ? "Sube tu Excel o CSV"
                        : "Agrega participantes"}
                </p>
                {highlighted?.empresa && (
                  <p className="mt-1 text-sm text-slate-300">{highlighted.empresa}</p>
                )}
                {sourceMode === "upload" && eligibleParticipants.length === 0 && (
                  <label className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-bold text-white transition cursor-pointer">
                    <span>📄 Subir archivo con columna &ldquo;Participante&rdquo;</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,.tsv,.txt"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleFileUpload(file);
                        e.currentTarget.value = "";
                      }}
                    />
                  </label>
                )}
              </div>

              <button
                type="button"
                disabled={spinning || eligibleParticipants.length === 0}
                onClick={handleSpin}
                className="w-full rounded-2xl bg-gradient-to-r from-cln-orange to-amber-500 px-6 py-5 font-heading text-2xl font-black uppercase tracking-wider text-white shadow-xl transition hover:brightness-110 active:scale-[0.99] disabled:opacity-45 cursor-pointer"
              >
                {spinning ? "Girando Ruleta..." : "🎡 ¡Girar Ruleta!"}
              </button>

              {winners.length > 0 && (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    Últimos ganadores ({winners.length})
                  </p>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {winners.slice(0, 5).map((w, i) => (
                      <div
                        key={`${w.id}-${i}`}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className="font-bold text-white truncate">
                          🏆 {w.nombre}
                        </span>
                        <span className="text-xs text-amber-200 shrink-0">
                          {w.prize}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal de Celebración del Ganador */}
          {pendingWinner && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-cln-950/85 p-6 backdrop-blur-md">
              <div className="relative w-full max-w-2xl rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-cln-900 via-cln-950 to-slate-950 p-8 text-center shadow-[0_0_80px_rgba(245,158,11,0.35)] sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-300">
                  🎉 ¡Tenemos Ganador! · {prizeTitle || "Rifa en Vivo"}
                </div>

                <h3 className="mt-5 break-words font-heading text-4xl font-black text-white sm:text-5xl">
                  {pendingWinner.nombre}
                </h3>

                {(pendingWinner.empresa || pendingWinner.cargo) && (
                  <p className="mt-3 text-lg font-semibold text-cln-orange">
                    {[pendingWinner.cargo, pendingWinner.empresa]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmWinner}
                    className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 font-heading text-base font-extrabold text-slate-950 shadow-lg transition cursor-pointer"
                  >
                    ✓ Confirmar Ganador
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPendingWinner(null);
                      handleSpin();
                    }}
                    className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-3.5 font-heading text-sm font-bold text-white transition cursor-pointer"
                  >
                    ↻ Volver a Girar (No presente)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel de Configuración y Lista (Admin) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuración rápida */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h3 className="font-heading font-bold text-lg text-cln-950">
              Configuración de la Rifa
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Nombre del Premio / Rifa
              </label>
              <input
                type="text"
                value={prizeTitle}
                onChange={(e) => setPrizeTitle(e.target.value)}
                placeholder="Ej. Premio #1 · Tarjeta de Regalo"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-cln-600 focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Origen de Participantes
              </span>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setSourceMode("upload")}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border cursor-pointer ${
                    sourceMode === "upload"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  📄 Subir Archivo
                </button>
                <button
                  type="button"
                  onClick={() => setSourceMode("db")}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border cursor-pointer ${
                    sourceMode === "db"
                      ? "bg-cln-950 text-white border-cln-950"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  🗄️ Base de Datos
                </button>
              </div>

              {sourceMode === "upload" ? (
                <div className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/40 p-4 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-cln-950">
                      Sube tu Excel (.xlsx / .xls) o CSV
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      Debe incluir la columna <strong className="text-cln-950">&ldquo;Participante&rdquo;</strong> (opcional: Empresa, Cargo).
                    </p>
                  </div>

                  <label className="flex items-center justify-center w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 px-3 transition-colors cursor-pointer">
                    <span>
                      {uploadedData ? "Cambiar archivo de participantes" : "Seleccionar archivo (.xlsx / .csv)"}
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,.tsv,.txt"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleFileUpload(file);
                        e.currentTarget.value = "";
                      }}
                    />
                  </label>

                  {uploadedData && (
                    <div className="flex items-center justify-between gap-2 rounded-lg bg-white border border-orange-200 px-3 py-2 text-xs">
                      <span className="truncate font-semibold text-gray-800">
                        📄 {uploadedData.fileName} ({uploadedData.participants.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          saveUpload(null);
                          setUploadNotice("");
                        }}
                        className="text-red-600 font-bold hover:underline shrink-0 cursor-pointer"
                      >
                        Quitar
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="w-full text-center text-[11px] font-bold text-cln-700 hover:underline cursor-pointer"
                  >
                    ⬇ Descargar plantilla Excel (.xlsx)
                  </button>
                </div>
              ) : (
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Filtrar registros en BD
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setStatusFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                        statusFilter === "all"
                          ? "bg-cln-950 text-white border-cln-950"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      Todos ({dbParticipants.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter("paid")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                        statusFilter === "paid"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      Pago Realizado ({paidCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter("pending")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                        statusFilter === "pending"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      Pendientes ({dbParticipants.length - paidCount})
                    </button>
                  </div>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={excludeWinners}
                onChange={(e) => setExcludeWinners(e.target.checked)}
                className="rounded border-gray-300"
              />
              Excluir automáticamente a ganadores anteriores
            </label>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Agregar participantes extra (uno por línea)
              </label>
              <textarea
                rows={3}
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Ej.&#10;Carlos Mendoza&#10;Ana Sofía López"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cln-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddManualNames}
                disabled={!manualInput.trim()}
                className="mt-2 w-full rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-800 text-xs font-bold py-2 transition-colors cursor-pointer"
              >
                + Añadir a la Ruleta
              </button>
            </div>
          </div>

          {/* Lista de participantes */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="font-heading font-bold text-lg text-cln-950">
                Lista en Ruleta ({eligibleParticipants.length})
              </h3>
              {excludedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setExcludedIds([])}
                  className="text-xs font-bold text-cln-600 hover:underline cursor-pointer"
                >
                  Restaurar excluidos
                </button>
              )}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar nombre o empresa..."
              className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-cln-600 focus:outline-none"
            />

            <div className="flex-1 max-h-80 overflow-y-auto divide-y divide-gray-100 pr-1">
              {searchableList.length === 0 ? (
                <p className="py-8 text-center text-xs text-gray-400">
                  No hay participantes que coincidan.
                </p>
              ) : (
                searchableList.map((p) => {
                  const isExcluded = excludedSet.has(p.id);
                  const alreadyWon = excludeWinners && winnerIdsSet.has(p.id);
                  const active = !isExcluded && !alreadyWon;
                  return (
                    <label
                      key={p.id}
                      className="flex items-center justify-between gap-2 py-2 text-sm cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={active}
                          disabled={alreadyWon}
                          onChange={() => toggleExcludeParticipant(p.id)}
                          className="rounded border-gray-300"
                        />
                        <div className="min-w-0">
                          <p
                            className={`font-semibold truncate ${
                              active ? "text-gray-900" : "text-gray-400 line-through"
                            }`}
                          >
                            {p.nombre}
                          </p>
                          {p.empresa && (
                            <p className="text-[11px] text-gray-400 truncate">
                              {p.empresa}
                            </p>
                          )}
                        </div>
                      </div>
                      {alreadyWon && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
                          Ganó
                        </span>
                      )}
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Historial de ganadores */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="font-heading font-bold text-lg text-cln-950">
                  Ganadores ({winners.length})
                </h3>
                {winners.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("¿Limpiar el historial de ganadores de esta sesión?")) {
                        saveWinners([]);
                      }
                    }}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Reiniciar ganadores
                  </button>
                )}
              </div>

              {winners.length === 0 ? (
                <p className="py-10 text-center text-xs text-gray-400">
                  Aún no se ha realizado ningún sorteo. Haz clic en &ldquo;¡Girar Ruleta!&rdquo; arriba.
                </p>
              ) : (
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {winners.map((w, idx) => (
                    <div
                      key={`${w.id}-${idx}`}
                      className="rounded-xl border border-amber-200 bg-amber-50/60 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading font-extrabold text-sm text-cln-950">
                          🏆 {w.nombre}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {w.wonAt}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-orange-700 mt-0.5">
                        {w.prize}
                      </p>
                      {(w.cargo || w.empresa) && (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {[w.cargo, w.empresa].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
