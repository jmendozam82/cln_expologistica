"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseLiveAudioOptions {
  /** Debe sonar la música de votación/pregunta en este momento */
  isActive: boolean;
  /** Conteo acumulado de votos/respuestas para disparar pulso sutil al crecer */
  voteCount: number;
  /** Clave de pregunta actual para reiniciar el umbral de delta */
  questionKey: string;
}

// Progresión corporativa cálida (112 BPM): Cmaj9 -> Am9 -> Fmaj9 -> G6
const PROGRESSION = [
  { bass: 130.81, notes: [261.63, 329.63, 392.0, 587.33] }, // Cmaj9
  { bass: 110.0, notes: [220.0, 329.63, 392.0, 493.88] },  // Am9
  { bass: 174.61, notes: [349.23, 261.63, 329.63, 392.0] }, // Fmaj9
  { bass: 196.0, notes: [392.0, 293.66, 493.88, 659.25] },  // G6
] as const;

const STEP_DURATION_SEC = 60 / 112 / 4; // semicorchea a 112 BPM (~0.1339 s)
const ARP_PATTERN = [0, -1, 1, -1, 2, -1, 3, -1, 1, -1, 2, 3, -1, -1, 2, -1];

function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function useLiveAudio({
  isActive,
  voteCount,
  questionKey,
}: UseLiveAudioOptions) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);

  const schedulerIdRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const stepRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  const prevActiveRef = useRef<boolean>(false);
  const prevVoteRef = useRef<{ key: string; count: number }>({
    key: questionKey,
    count: voteCount,
  });
  const lastVoteChimeMsRef = useRef<number>(0);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return null;

      const ctx = new AudioCtor();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);

      ctx.addEventListener("statechange", () => {
        setAudioUnlocked(ctx.state === "running");
      });

      ctxRef.current = ctx;
      masterRef.current = master;
      noiseRef.current = createNoiseBuffer(ctx);
      if (ctx.state === "running") {
        setAudioUnlocked(true);
      }
    }
    return ctxRef.current;
  }, []);

  const unlockAudio = useCallback(async () => {
    const ctx = ensureContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    const running = ctx.state === "running";
    setAudioUnlocked(running);
    return running;
  }, [ensureContext]);

  const scheduleStep = useCallback((stepIndex: number, when: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    const bar = Math.floor(stepIndex / 16) % PROGRESSION.length;
    const stepInBar = stepIndex % 16;
    const chord = PROGRESSION[bar];

    // 1. Bombo suave en pulsos 1, 2, 3, 4
    if (stepInBar % 4 === 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(108, when);
      osc.frequency.exponentialRampToValueAtTime(46, when + 0.11);
      gain.gain.setValueAtTime(0.001, when);
      gain.gain.linearRampToValueAtTime(0.18, when + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, when + 0.14);
      osc.connect(gain);
      gain.connect(master);
      osc.start(when);
      osc.stop(when + 0.16);
    }

    // 2. Charles / shaker suave en contratiempos
    if (stepInBar % 4 === 2 && noiseRef.current) {
      const src = ctx.createBufferSource();
      src.buffer = noiseRef.current;
      const hpf = ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.setValueAtTime(6800, when);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.018, when);
      gain.gain.exponentialRampToValueAtTime(0.0008, when + 0.045);
      src.connect(hpf);
      hpf.connect(gain);
      gain.connect(master);
      src.start(when);
      src.stop(when + 0.05);
    }

    // 3. Bajo cálido filtrado en groove moderno
    if (stepInBar === 0 || stepInBar === 6 || stepInBar === 8 || stepInBar === 14) {
      const osc = ctx.createOscillator();
      const lpf = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(chord.bass, when);
      lpf.type = "lowpass";
      lpf.frequency.setValueAtTime(340, when);
      gain.gain.setValueAtTime(0.001, when);
      gain.gain.linearRampToValueAtTime(0.16, when + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, when + 0.25);
      osc.connect(lpf);
      lpf.connect(gain);
      gain.connect(master);
      osc.start(when);
      osc.stop(when + 0.27);
    }

    // 4. Arpegio marimba corporativo suave
    const noteSlot = ARP_PATTERN[stepInBar];
    if (noteSlot >= 0) {
      const freq = chord.notes[noteSlot];
      const osc = ctx.createOscillator();
      const lpf = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, when);
      lpf.type = "lowpass";
      lpf.frequency.setValueAtTime(1900, when);
      gain.gain.setValueAtTime(0.001, when);
      gain.gain.linearRampToValueAtTime(0.065, when + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, when + 0.22);
      osc.connect(lpf);
      lpf.connect(gain);
      gain.connect(master);
      osc.start(when);
      osc.stop(when + 0.24);
    }
  }, []);

  const playChime = useCallback(
    (freqs: number[], gainLevel: number, durationSec: number) => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state !== "running" || !soundEnabled) return;
      const now = ctx.currentTime;
      for (let i = 0; i < freqs.length; i += 1) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.035;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freqs[i], start);
        gain.gain.setValueAtTime(0.0008, start);
        gain.gain.linearRampToValueAtTime(gainLevel, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0005, start + durationSec);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + durationSec + 0.02);
      }
    },
    [soundEnabled]
  );

  // Auto-desbloqueo al primer clic o tecla en la ventana del proyector
  useEffect(() => {
    if (!soundEnabled || audioUnlocked) return;
    const onGesture = () => {
      void unlockAudio();
    };
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("keydown", onGesture, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [soundEnabled, audioUnlocked, unlockAudio]);

  // Arranque y detención automática de la pista según estado de votación
  useEffect(() => {
    const shouldPlay = soundEnabled && audioUnlocked && isActive;
    const ctx = ctxRef.current;
    const master = masterRef.current;

    if (shouldPlay && ctx && master) {
      if (!isPlayingRef.current) {
        isPlayingRef.current = true;
        stepRef.current = 0;
        nextNoteTimeRef.current = ctx.currentTime + 0.05;

        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 0.25);

        schedulerIdRef.current = window.setInterval(() => {
          const activeCtx = ctxRef.current;
          if (!activeCtx || !isPlayingRef.current) return;
          while (nextNoteTimeRef.current < activeCtx.currentTime + 0.14) {
            scheduleStep(stepRef.current, nextNoteTimeRef.current);
            stepRef.current = (stepRef.current + 1) % 64;
            nextNoteTimeRef.current += STEP_DURATION_SEC;
          }
        }, 50);
      }
    } else if (isPlayingRef.current) {
      isPlayingRef.current = false;
      if (schedulerIdRef.current !== null) {
        window.clearInterval(schedulerIdRef.current);
        schedulerIdRef.current = null;
      }
      if (ctx && master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
      }
      // Acorde suave de cierre cuando termina una votación activa (no al mutear manual)
      if (soundEnabled && audioUnlocked && prevActiveRef.current && !isActive) {
        playChime([523.25, 659.25, 783.99], 0.045, 0.45);
      }
    }

    prevActiveRef.current = isActive;
  }, [soundEnabled, audioUnlocked, isActive, scheduleStep, playChime]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (schedulerIdRef.current !== null) {
        window.clearInterval(schedulerIdRef.current);
      }
      if (ctxRef.current) {
        void ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, []);

  // Pulso sutil cuando entran nuevos votos durante la votación abierta
  useEffect(() => {
    if (prevVoteRef.current.key !== questionKey) {
      prevVoteRef.current = { key: questionKey, count: voteCount };
      return;
    }
    if (isActive && soundEnabled && audioUnlocked && voteCount > prevVoteRef.current.count) {
      const nowMs = Date.now();
      if (nowMs - lastVoteChimeMsRef.current >= 240) {
        lastVoteChimeMsRef.current = nowMs;
        playChime([880, 1174.66], 0.03, 0.14);
      }
    }
    prevVoteRef.current.count = voteCount;
  }, [isActive, soundEnabled, audioUnlocked, voteCount, questionKey, playChime]);

  const toggleSound = useCallback(async () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      await unlockAudio();
      return;
    }
    if (!audioUnlocked) {
      await unlockAudio();
      return;
    }
    setSoundEnabled(false);
  }, [soundEnabled, audioUnlocked, unlockAudio]);

  return {
    soundEnabled,
    audioUnlocked,
    isPlaying: soundEnabled && audioUnlocked && isActive,
    unlockAudio,
    toggleSound,
  };
}
