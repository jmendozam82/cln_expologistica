import { sql } from "@vercel/postgres";

export type TriviaStatus = "lobby" | "question" | "reveal" | "leaderboard" | "podium";

export interface TriviaQuestion {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  timeLimitSec: number;
}

export interface TriviaPublicQuestion {
  index: number;
  text: string;
  options: [string, string, string, string];
  timeLimitSec: number;
}

export interface TriviaRankingRow {
  playerId: string;
  name: string;
  score: number;
  correctCount: number;
  totalTimeMs: number;
  rank: number;
}

export interface TriviaRevealSnapshot {
  questionIndex: number;
  correctIndex: number;
  counts: [number, number, number, number];
  totalAnswers: number;
  totalPlayers: number;
  leaderboard: TriviaRankingRow[];
}

export interface TriviaSessionRecord {
  id: number;
  code: string;
  title: string;
  conferenceTitle: string | null;
  status: TriviaStatus;
  currentQuestionIndex: number;
  questionStartedAtMs: number | null;
  serverNowMs: number;
  stateVersion: number;
  questions: TriviaQuestion[];
  reveal: TriviaRevealSnapshot | null;
  createdAt: string;
}

export const SYNC_LEAD_MS = 2000;
export const ANSWER_GRACE_MS = 1800;

export const OPTION_THEMES = [
  {
    letter: "A",
    shape: "▲",
    bg: "bg-sky-600 hover:bg-sky-500",
    solid: "bg-sky-600",
    bar: "bg-sky-500",
    ring: "ring-sky-300",
  },
  {
    letter: "B",
    shape: "◆",
    bg: "bg-orange-500 hover:bg-orange-400",
    solid: "bg-orange-500",
    bar: "bg-orange-500",
    ring: "ring-orange-300",
  },
  {
    letter: "C",
    shape: "●",
    bg: "bg-emerald-600 hover:bg-emerald-500",
    solid: "bg-emerald-600",
    bar: "bg-emerald-500",
    ring: "ring-emerald-300",
  },
  {
    letter: "D",
    shape: "■",
    bg: "bg-indigo-600 hover:bg-indigo-500",
    solid: "bg-indigo-600",
    bar: "bg-indigo-500",
    ring: "ring-indigo-300",
  },
] as const;

let tablesReadyPromise: Promise<void> | null = null;

export async function ensureTriviaTables(): Promise<void> {
  if (!tablesReadyPromise) {
    tablesReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS trivia_sessions (
          id SERIAL PRIMARY KEY,
          code VARCHAR(16) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          conference_title VARCHAR(255),
          status VARCHAR(32) NOT NULL DEFAULT 'lobby',
          current_question_index INTEGER NOT NULL DEFAULT 0,
          question_started_at TIMESTAMP WITH TIME ZONE,
          state_version INTEGER NOT NULL DEFAULT 1,
          questions_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          reveal_json JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS trivia_players (
          id UUID PRIMARY KEY,
          session_id INTEGER NOT NULL REFERENCES trivia_sessions(id) ON DELETE CASCADE,
          name VARCHAR(120) NOT NULL,
          score INTEGER NOT NULL DEFAULT 0,
          correct_count INTEGER NOT NULL DEFAULT 0,
          total_time_ms INTEGER NOT NULL DEFAULT 0,
          joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_trivia_players_session_rank
        ON trivia_players (session_id, score DESC, total_time_ms ASC, joined_at ASC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS trivia_answers (
          id SERIAL PRIMARY KEY,
          session_id INTEGER NOT NULL REFERENCES trivia_sessions(id) ON DELETE CASCADE,
          question_index INTEGER NOT NULL,
          player_id UUID NOT NULL REFERENCES trivia_players(id) ON DELETE CASCADE,
          option_index INTEGER NOT NULL,
          is_correct BOOLEAN NOT NULL,
          points INTEGER NOT NULL DEFAULT 0,
          elapsed_ms INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (session_id, question_index, player_id)
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_trivia_answers_session_q
        ON trivia_answers (session_id, question_index);
      `;
    })().catch((err) => {
      tablesReadyPromise = null;
      throw err;
    });
  }
  return tablesReadyPromise;
}

export function normalizeRoomCode(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 12);
}

export function generateRoomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CLN";
  for (let i = 0; i < 3; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export function calculatePoints(isCorrect: boolean, elapsedMs: number, timeLimitSec: number): number {
  if (!isCorrect) return 0;
  const limitMs = Math.max(1000, timeLimitSec * 1000);
  const clamped = Math.min(limitMs, Math.max(0, elapsedMs));
  // 1000 pts al instante (0ms), 500 pts justo al expirar el tiempo
  return Math.round(1000 * (1 - clamped / (2 * limitMs)));
}

export function sanitizeQuestions(input: unknown): TriviaQuestion[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((raw, idx): TriviaQuestion | null => {
      if (!raw || typeof raw !== "object") return null;
      const item = raw as Record<string, unknown>;
      const text = typeof item.text === "string" ? item.text.trim() : "";
      if (!text) return null;

      const rawOptions = Array.isArray(item.options) ? item.options : [];
      const opts: [string, string, string, string] = [
        typeof rawOptions[0] === "string" ? rawOptions[0].trim() : "",
        typeof rawOptions[1] === "string" ? rawOptions[1].trim() : "",
        typeof rawOptions[2] === "string" ? rawOptions[2].trim() : "",
        typeof rawOptions[3] === "string" ? rawOptions[3].trim() : "",
      ];

      if (opts.some((o) => !o)) return null;

      const ci = Number(item.correctIndex);
      const correctIndex = (ci >= 0 && ci <= 3 ? ci : 0) as 0 | 1 | 2 | 3;

      const tl = Number(item.timeLimitSec);
      const timeLimitSec = Number.isFinite(tl) ? Math.min(120, Math.max(5, Math.round(tl))) : 20;

      const id =
        typeof item.id === "string" && item.id.trim()
          ? item.id.trim()
          : `q-${idx + 1}-${Math.random().toString(36).slice(2, 7)}`;

      return { id, text, options: opts, correctIndex, timeLimitSec };
    })
    .filter((q): q is TriviaQuestion => q !== null);
}

export async function getSessionByCode(code: string): Promise<TriviaSessionRecord | null> {
  await ensureTriviaTables();
  const normalized = normalizeRoomCode(code);
  if (!normalized) return null;

  const { rows } = await sql`
    SELECT
      id,
      code,
      title,
      conference_title,
      status,
      current_question_index,
      EXTRACT(EPOCH FROM question_started_at) * 1000 AS question_started_at_ms,
      EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000 AS server_now_ms,
      state_version,
      questions_json,
      reveal_json,
      created_at
    FROM trivia_sessions
    WHERE code = ${normalized}
    LIMIT 1
  `;

  if (rows.length === 0) return null;
  const row = rows[0];
  return mapSessionRow(row);
}

export async function getSessionById(id: number): Promise<TriviaSessionRecord | null> {
  await ensureTriviaTables();
  const { rows } = await sql`
    SELECT
      id,
      code,
      title,
      conference_title,
      status,
      current_question_index,
      EXTRACT(EPOCH FROM question_started_at) * 1000 AS question_started_at_ms,
      EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000 AS server_now_ms,
      state_version,
      questions_json,
      reveal_json,
      created_at
    FROM trivia_sessions
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) return null;
  return mapSessionRow(rows[0]);
}

function mapSessionRow(row: Record<string, unknown>): TriviaSessionRecord {
  const startedMs = row.question_started_at_ms !== null && row.question_started_at_ms !== undefined
    ? Number(row.question_started_at_ms)
    : null;

  return {
    id: Number(row.id),
    code: String(row.code),
    title: String(row.title),
    conferenceTitle: row.conference_title ? String(row.conference_title) : null,
    status: (String(row.status) as TriviaStatus) || "lobby",
    currentQuestionIndex: Number(row.current_question_index ?? 0),
    questionStartedAtMs: startedMs !== null && Number.isFinite(startedMs) ? Math.round(startedMs) : null,
    serverNowMs: Math.round(Number(row.server_now_ms ?? Date.now())),
    stateVersion: Number(row.state_version ?? 1),
    questions: sanitizeQuestions(row.questions_json),
    reveal: (row.reveal_json as TriviaRevealSnapshot | null) ?? null,
    createdAt: String(row.created_at ?? ""),
  };
}

export async function buildRevealSnapshot(
  sessionId: number,
  questionIndex: number,
  correctIndex: number
): Promise<TriviaRevealSnapshot> {
  const [distRes, countRes, rankRes] = await Promise.all([
    sql`
      SELECT option_index, COUNT(*)::int AS total
      FROM trivia_answers
      WHERE session_id = ${sessionId} AND question_index = ${questionIndex}
      GROUP BY option_index
    `,
    sql`
      SELECT COUNT(*)::int AS total_players
      FROM trivia_players
      WHERE session_id = ${sessionId}
    `,
    sql`
      SELECT id, name, score, correct_count, total_time_ms
      FROM trivia_players
      WHERE session_id = ${sessionId}
      ORDER BY score DESC, total_time_ms ASC, joined_at ASC
      LIMIT 25
    `,
  ]);

  const counts: [number, number, number, number] = [0, 0, 0, 0];
  let totalAnswers = 0;
  for (const r of distRes.rows) {
    const idx = Number(r.option_index);
    const total = Number(r.total ?? 0);
    if (idx >= 0 && idx <= 3) {
      counts[idx] = total;
      totalAnswers += total;
    }
  }

  const totalPlayers = Number(countRes.rows[0]?.total_players ?? 0);
  const leaderboard: TriviaRankingRow[] = rankRes.rows.map((r, i) => ({
    playerId: String(r.id),
    name: String(r.name),
    score: Number(r.score ?? 0),
    correctCount: Number(r.correct_count ?? 0),
    totalTimeMs: Number(r.total_time_ms ?? 0),
    rank: i + 1,
  }));

  return {
    questionIndex,
    correctIndex,
    counts,
    totalAnswers,
    totalPlayers,
    leaderboard,
  };
}

