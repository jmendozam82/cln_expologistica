"use client";

import { useEffect, useState } from "react";

export interface SyncedTimerState {
  /** Milisegundos faltantes antes de que se desbloquee la pregunta (> 0 durante el conteo de preparación). */
  leadRemainingMs: number;
  /** Milisegundos restantes de respuesta mientras la pregunta está activa. */
  remainingMs: number;
  /** true cuando ya terminó la ventana de preparación y aún queda tiempo. */
  isActiveWindow: boolean;
  /** true cuando ya expiró el tiempo de respuesta. */
  isExpired: boolean;
}

export function useSyncedTimer({
  enabled,
  questionStartedAtMs,
  timeLimitSec,
  clockOffsetMs,
}: {
  enabled: boolean;
  questionStartedAtMs: number | null;
  timeLimitSec: number;
  clockOffsetMs: number;
}): SyncedTimerState {
  const [nowSynced, setNowSynced] = useState<number>(() => Date.now() + clockOffsetMs);

  useEffect(() => {
    if (!enabled || !questionStartedAtMs) return;

    const update = () => setNowSynced(Date.now() + clockOffsetMs);
    update();
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, [enabled, questionStartedAtMs, clockOffsetMs]);

  if (!enabled || !questionStartedAtMs) {
    return {
      leadRemainingMs: 0,
      remainingMs: timeLimitSec * 1000,
      isActiveWindow: false,
      isExpired: false,
    };
  }

  const limitMs = timeLimitSec * 1000;
  const leadRemainingMs = Math.max(0, questionStartedAtMs - nowSynced);
  const elapsedMs = Math.max(0, nowSynced - questionStartedAtMs);
  const remainingMs = Math.max(0, limitMs - elapsedMs);

  return {
    leadRemainingMs,
    remainingMs,
    isActiveWindow: leadRemainingMs === 0 && remainingMs > 0,
    isExpired: leadRemainingMs === 0 && remainingMs === 0,
  };
}

