"use client";

import { useEffect, useRef } from "react";

export interface WheelParticipant {
  id: string;
  nombre: string;
  empresa?: string | null;
  cargo?: string | null;
}

interface RaffleWheelProps {
  participants: WheelParticipant[];
  spinning: boolean;
  targetRotation: number | null;
  startRotation: number;
  spinDurationMs: number;
  onHighlightChange?: (participant: WheelParticipant | null) => void;
  onTick?: () => void;
  onSpinEnd?: () => void;
  size?: number;
}

const SLICE_COLORS = [
  "#003b6b", // cln-800
  "#f97316", // cln-orange
  "#0284c7", // sky-600
  "#00223d", // cln-950
  "#059669", // emerald-600
  "#4f46e5", // indigo-600
];

function pickSliceColor(index: number, total: number): string {
  const color = SLICE_COLORS[index % SLICE_COLORS.length];
  // Evita que la última rebanada repita el mismo color de la primera
  if (index === total - 1 && total > 1 && color === SLICE_COLORS[0]) {
    return SLICE_COLORS[2];
  }
  return color;
}

function truncateLabel(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trimEnd()}…`;
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/** Calcula qué índice apunta al borde derecho (ángulo 0 rad en el canvas) */
export function getParticipantIndexAtRotation(
  rotationRad: number,
  count: number
): number {
  if (count <= 0) return -1;
  const sliceAngle = (Math.PI * 2) / count;
  const normalized =
    ((-rotationRad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(normalized / sliceAngle) % count;
}

export default function RaffleWheel({
  participants,
  spinning,
  targetRotation,
  startRotation,
  spinDurationMs,
  onHighlightChange,
  onTick,
  onSpinEnd,
  size = 560,
}: RaffleWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotationRef = useRef<number>(startRotation);
  const lastIndexRef = useRef<number>(-1);
  const participantsRef = useRef<WheelParticipant[]>(participants);

  const onHighlightRef = useRef(onHighlightChange);
  const onTickRef = useRef(onTick);
  const onSpinEndRef = useRef(onSpinEnd);

  useEffect(() => {
    participantsRef.current = participants;
    onHighlightRef.current = onHighlightChange;
    onTickRef.current = onTick;
    onSpinEndRef.current = onSpinEnd;
  }, [participants, onHighlightChange, onTick, onSpinEnd]);

  const drawWheel = (rotation: number, list: WheelParticipant[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetPx = Math.round(size * dpr);
    if (canvas.width !== targetPx || canvas.height !== targetPx) {
      canvas.width = targetPx;
      canvas.height = targetPx;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const outerRadius = size / 2 - 14;
    const count = list.length;

    // Aro exterior metálico/dorado
    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius + 8, 0, Math.PI * 2);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#f59e0b";
    ctx.stroke();

    if (count === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#00223d";
      ctx.fill();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Sin participantes disponibles", cx, cy);
      ctx.restore();
      return;
    }

    const sliceAngle = (Math.PI * 2) / count;
    const fontSize =
      count > 140
        ? 8.5
        : count > 100
          ? 9.5
          : count > 70
            ? 10.5
            : count > 45
              ? 12
              : count > 20
                ? 14
                : 16;
    const maxChars = count > 90 ? 19 : count > 40 ? 22 : 26;

    for (let i = 0; i < count; i += 1) {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerRadius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = pickSliceColor(i, count);
      ctx.fill();
      ctx.lineWidth = count > 80 ? 0.7 : 1.3;
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.stroke();

      // Etiqueta radial (legible horizontalmente al alinearse con la flecha derecha a 0 rad)
      const midAngle = startAngle + sliceAngle / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(midAngle);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillText(
        truncateLabel(list[i].nombre, maxChars),
        outerRadius - 12,
        0
      );
      ctx.restore();
    }

    // Luces decorativas en el borde exterior
    const bulbCount = 24;
    for (let b = 0; b < bulbCount; b += 1) {
      const a = (b / bulbCount) * Math.PI * 2 + rotation * 0.25;
      const bx = cx + Math.cos(a) * (outerRadius + 4);
      const by = cy + Math.sin(a) * (outerRadius + 4);
      ctx.beginPath();
      ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = b % 2 === 0 ? "#fde68a" : "#fb923c";
      ctx.fill();
    }

    // Centro de la ruleta
    const hubRadius = Math.max(30, size * 0.085);
    ctx.beginPath();
    ctx.arc(cx, cy, hubRadius + 5, 0, Math.PI * 2);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#001b30";
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 13px Manrope, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CLN", cx, cy);

    ctx.restore();
  };

  useEffect(() => {
    if (!spinning) {
      currentRotationRef.current = startRotation;
      drawWheel(startRotation, participants);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, startRotation, participants, size]);

  useEffect(() => {
    if (!spinning || targetRotation === null) return;

    const snapshotList = [...participantsRef.current];
    if (snapshotList.length === 0) return;

    let rafId = 0;
    const startTime = performance.now();
    const delta = targetRotation - startRotation;
    lastIndexRef.current = getParticipantIndexAtRotation(
      startRotation,
      snapshotList.length
    );

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / spinDurationMs);
      const eased = easeOutQuint(t);
      const nextRot = startRotation + delta * eased;
      currentRotationRef.current = nextRot;
      drawWheel(nextRot, snapshotList);

      const idx = getParticipantIndexAtRotation(nextRot, snapshotList.length);
      if (idx !== lastIndexRef.current && idx >= 0) {
        lastIndexRef.current = idx;
        onHighlightRef.current?.(snapshotList[idx] ?? null);
        onTickRef.current?.();
      }

      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        currentRotationRef.current = targetRotation;
        drawWheel(targetRotation, snapshotList);
        onSpinEndRef.current?.();
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, targetRotation, startRotation, spinDurationMs]);

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, maxWidth: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="max-w-full h-auto drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
      />

      {/* Puntero fijo dorado en el lado derecho (0 rad) apuntando al centro */}
      <div
        className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center"
        aria-hidden="true"
      >
        <svg
          width="48"
          height="42"
          viewBox="0 0 48 42"
          className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]"
        >
          <polygon
            points="0,21 44,4 44,38"
            fill="#f97316"
            stroke="#fef3c7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="38" cy="21" r="4" fill="#fffbeb" />
        </svg>
      </div>
    </div>
  );
}
