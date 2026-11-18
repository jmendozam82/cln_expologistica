import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  buildRevealSnapshot,
  ensureTriviaTables,
  getSessionById,
} from "@/lib/trivia";

export const dynamic = "force-dynamic";

type ControlAction = "start" | "reveal" | "leaderboard" | "next" | "podium" | "reset";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTriviaTables();
    const { id } = await context.params;
    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const session = await getSessionById(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Trivia no encontrada." }, { status: 404 });
    }

    const body = (await req.json()) as { action?: ControlAction; questionIndex?: number };
    const action = body.action;

    if (!action) {
      return NextResponse.json({ error: "Acción requerida." }, { status: 400 });
    }

    if (action === "reset") {
      await sql`DELETE FROM trivia_answers WHERE session_id = ${sessionId}`;
      await sql`DELETE FROM trivia_players WHERE session_id = ${sessionId}`;
      await sql`
        UPDATE trivia_sessions
        SET
          status = 'lobby',
          current_question_index = 0,
          question_started_at = NULL,
          reveal_json = NULL,
          state_version = state_version + 1
        WHERE id = ${sessionId}
      `;
      const updated = await getSessionById(sessionId);
      return NextResponse.json({ session: updated });
    }

    if (session.questions.length === 0) {
      return NextResponse.json(
        { error: "Agrega al menos una pregunta antes de iniciar la partida." },
        { status: 400 }
      );
    }

    if (action === "start") {
      const targetIndex =
        typeof body.questionIndex === "number" &&
        body.questionIndex >= 0 &&
        body.questionIndex < session.questions.length
          ? body.questionIndex
          : 0;

      if (session.mode === "poll") {
        // Las encuestas de opinión abren votación de inmediato sin conteo regresivo
        await sql`
          UPDATE trivia_sessions
          SET
            status = 'question',
            current_question_index = ${targetIndex},
            question_started_at = CURRENT_TIMESTAMP,
            reveal_json = NULL,
            state_version = state_version + 1
          WHERE id = ${sessionId}
        `;
      } else {
        // 2 segundos de anticipación para sincronizar los 120 móviles antes de t=0
        await sql`
          UPDATE trivia_sessions
          SET
            status = 'question',
            current_question_index = ${targetIndex},
            question_started_at = CURRENT_TIMESTAMP + INTERVAL '2 seconds',
            reveal_json = NULL,
            state_version = state_version + 1
          WHERE id = ${sessionId}
        `;
      }
    } else if (action === "next") {
      const nextIndex = session.currentQuestionIndex + 1;
      if (nextIndex >= session.questions.length) {
        const snapshot = await buildRevealSnapshot(
          sessionId,
          session.currentQuestionIndex,
          session.questions[session.currentQuestionIndex]
        );
        await sql`
          UPDATE trivia_sessions
          SET
            status = 'podium',
            reveal_json = ${JSON.stringify(snapshot)}::jsonb,
            state_version = state_version + 1
          WHERE id = ${sessionId}
        `;
      } else if (session.mode === "poll") {
        await sql`
          UPDATE trivia_sessions
          SET
            status = 'question',
            current_question_index = ${nextIndex},
            question_started_at = CURRENT_TIMESTAMP,
            reveal_json = NULL,
            state_version = state_version + 1
          WHERE id = ${sessionId}
        `;
      } else {
        await sql`
          UPDATE trivia_sessions
          SET
            status = 'question',
            current_question_index = ${nextIndex},
            question_started_at = CURRENT_TIMESTAMP + INTERVAL '2 seconds',
            reveal_json = NULL,
            state_version = state_version + 1
          WHERE id = ${sessionId}
        `;
      }
    } else if (action === "reveal") {
      const q = session.questions[session.currentQuestionIndex];
      const snapshot = await buildRevealSnapshot(
        sessionId,
        session.currentQuestionIndex,
        q
      );
      await sql`
        UPDATE trivia_sessions
        SET
          status = 'reveal',
          reveal_json = ${JSON.stringify(snapshot)}::jsonb,
          state_version = state_version + 1
        WHERE id = ${sessionId}
      `;
    } else if (action === "leaderboard" || action === "podium") {
      const q = session.questions[session.currentQuestionIndex];
      const snapshot = await buildRevealSnapshot(
        sessionId,
        session.currentQuestionIndex,
        q
      );
      await sql`
        UPDATE trivia_sessions
        SET
          status = ${action},
          reveal_json = ${JSON.stringify(snapshot)}::jsonb,
          state_version = state_version + 1
        WHERE id = ${sessionId}
      `;
    } else {
      return NextResponse.json({ error: "Acción no válida." }, { status: 400 });
    }

    const updated = await getSessionById(sessionId);
    return NextResponse.json({ session: updated });
  } catch (error) {
    console.error("Error controlling trivia session:", error);
    return NextResponse.json({ error: "No se pudo cambiar el estado de la trivia." }, { status: 500 });
  }
}

