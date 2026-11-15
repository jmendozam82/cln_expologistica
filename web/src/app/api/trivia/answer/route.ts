import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  ANSWER_GRACE_MS,
  calculatePoints,
  getSessionByCode,
} from "@/lib/trivia";

export const dynamic = "force-dynamic";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const code = typeof body.code === "string" ? body.code : "";
    const playerId = typeof body.playerId === "string" ? body.playerId.trim() : "";
    const questionIndex = Number(body.questionIndex);
    const optionIndex = Number(body.optionIndex);

    if (!UUID_REGEX.test(playerId)) {
      return NextResponse.json({ error: "Participante inválido. Vuelve a unirte." }, { status: 400 });
    }
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) {
      return NextResponse.json({ error: "Opción inválida." }, { status: 400 });
    }

    const session = await getSessionByCode(code);
    if (!session) {
      return NextResponse.json({ error: "Sala no encontrada." }, { status: 404 });
    }

    if (session.status !== "question") {
      return NextResponse.json(
        { error: "Esta pregunta ya fue cerrada.", closed: true },
        { status: 409 }
      );
    }

    if (session.currentQuestionIndex !== questionIndex) {
      return NextResponse.json(
        { error: "La pregunta actual ya avanzó.", closed: true },
        { status: 409 }
      );
    }

    const question = session.questions[questionIndex];
    if (!question) {
      return NextResponse.json({ error: "Pregunta no válida." }, { status: 400 });
    }

    const playerCheck = await sql`
      SELECT id FROM trivia_players
      WHERE id = ${playerId}::uuid AND session_id = ${session.id}
      LIMIT 1
    `;
    if (playerCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "La partida fue reiniciada. Ingresa tu nombre nuevamente.", reset: true },
        { status: 410 }
      );
    }

    const startedAtMs = session.questionStartedAtMs ?? session.serverNowMs;
    const rawElapsedMs = session.serverNowMs - startedAtMs;

    if (rawElapsedMs < -400) {
      return NextResponse.json(
        { error: "Espera a que termine el conteo inicial." },
        { status: 425 }
      );
    }

    const limitMs = question.timeLimitSec * 1000;
    if (rawElapsedMs > limitMs + ANSWER_GRACE_MS) {
      return NextResponse.json(
        { error: "Tiempo agotado para esta pregunta.", closed: true },
        { status: 409 }
      );
    }

    const clampedElapsedMs = Math.min(limitMs, Math.max(0, Math.round(rawElapsedMs)));
    const isCorrect = optionIndex === question.correctIndex;
    const points = calculatePoints(isCorrect, clampedElapsedMs, question.timeLimitSec);

    const insertRes = await sql`
      INSERT INTO trivia_answers (
        session_id,
        question_index,
        player_id,
        option_index,
        is_correct,
        points,
        elapsed_ms
      )
      VALUES (
        ${session.id},
        ${questionIndex},
        ${playerId}::uuid,
        ${optionIndex},
        ${isCorrect},
        ${points},
        ${clampedElapsedMs}
      )
      ON CONFLICT (session_id, question_index, player_id) DO NOTHING
      RETURNING id
    `;

    const alreadyAnswered = insertRes.rows.length === 0;

    if (!alreadyAnswered && isCorrect) {
      await sql`
        UPDATE trivia_players
        SET
          score = score + ${points},
          correct_count = correct_count + 1,
          total_time_ms = total_time_ms + ${clampedElapsedMs}
        WHERE id = ${playerId}::uuid AND session_id = ${session.id}
      `;
    }

    return NextResponse.json({
      accepted: true,
      alreadyAnswered,
      selectedOption: optionIndex,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json({ error: "Error al registrar tu respuesta." }, { status: 500 });
  }
}

