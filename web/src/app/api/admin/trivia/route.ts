import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  ensureTriviaTables,
  generateRoomCode,
  normalizeRoomCode,
  sanitizeQuestions,
  type TriviaSessionMode,
} from "@/lib/trivia";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureTriviaTables();

    const { rows } = await sql`
      SELECT
        s.id,
        s.code,
        s.mode,
        s.title,
        s.conference_title,
        s.status,
        s.current_question_index,
        s.questions_json,
        s.created_at,
        COALESCE(p.player_count, 0)::int AS player_count
      FROM trivia_sessions s
      LEFT JOIN (
        SELECT session_id, COUNT(*)::int AS player_count
        FROM trivia_players
        GROUP BY session_id
      ) p ON p.session_id = s.id
      ORDER BY s.created_at DESC, s.id DESC
    `;

    const sessions = rows.map((r) => {
      const mode: TriviaSessionMode = r.mode === "poll" ? "poll" : "trivia";
      const questions = sanitizeQuestions(r.questions_json, mode);
      return {
        id: Number(r.id),
        code: String(r.code),
        mode,
        title: String(r.title),
        conferenceTitle: r.conference_title ? String(r.conference_title) : null,
        status: String(r.status),
        currentQuestionIndex: Number(r.current_question_index ?? 0),
        questionCount: questions.length,
        playerCount: Number(r.player_count ?? 0),
        createdAt: String(r.created_at ?? ""),
      };
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error listing trivia sessions:", error);
    return NextResponse.json({ error: "No se pudieron cargar las trivias." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureTriviaTables();
    const body = (await req.json()) as Record<string, unknown>;

    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) {
      return NextResponse.json({ error: "El título de la trivia es obligatorio." }, { status: 400 });
    }

    const conferenceTitle =
      typeof body.conferenceTitle === "string" && body.conferenceTitle.trim()
        ? body.conferenceTitle.trim()
        : null;

    const mode: TriviaSessionMode = body.mode === "poll" ? "poll" : "trivia";

    let code = typeof body.code === "string" ? normalizeRoomCode(body.code) : "";
    if (!code) {
      code = generateRoomCode();
    }

    const questions = sanitizeQuestions(body.questions, mode);

    // Si hay colisión en el código autogenerado, reintenta una vez
    let insertedId: number | null = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const res = await sql`
          INSERT INTO trivia_sessions (code, mode, title, conference_title, questions_json)
          VALUES (${code}, ${mode}, ${title}, ${conferenceTitle}, ${JSON.stringify(questions)}::jsonb)
          RETURNING id
        `;
        insertedId = Number(res.rows[0]?.id);
        break;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "";
        if (msg.includes("unique") || msg.includes("duplicate")) {
          if (typeof body.code === "string" && body.code.trim()) {
            return NextResponse.json(
              { error: `El código de sala "${code}" ya está en uso.` },
              { status: 409 }
            );
          }
          code = generateRoomCode();
        } else {
          throw err;
        }
      }
    }

    if (!insertedId) {
      return NextResponse.json({ error: "No se pudo crear la sala." }, { status: 500 });
    }

    return NextResponse.json({ id: insertedId, code }, { status: 201 });
  } catch (error) {
    console.error("Error creating trivia session:", error);
    return NextResponse.json({ error: "No se pudo crear la trivia." }, { status: 500 });
  }
}

