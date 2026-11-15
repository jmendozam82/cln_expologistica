import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getSessionByCode, type TriviaPublicQuestion } from "@/lib/trivia";

export const dynamic = "force-dynamic";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") ?? "";
    const playerId = (searchParams.get("playerId") ?? "").trim();
    const isPresenter = searchParams.get("presenter") === "1";

    const session = await getSessionByCode(code);
    if (!session) {
      return NextResponse.json(
        { error: "Sala no encontrada." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const q = session.questions[session.currentQuestionIndex] ?? null;
    const question: TriviaPublicQuestion | null = q
      ? {
          index: session.currentQuestionIndex,
          text: q.text,
          options: q.options,
          timeLimitSec: q.timeLimitSec,
        }
      : null;

    let presenterData: {
      playerCount: number;
      answerCount: number;
      recentPlayers: string[];
    } | null = null;

    if (isPresenter) {
      const [playersCountRes, recentPlayersRes, answerCountRes] = await Promise.all([
        sql`
          SELECT COUNT(*)::int AS total
          FROM trivia_players
          WHERE session_id = ${session.id}
        `,
        sql`
          SELECT name
          FROM trivia_players
          WHERE session_id = ${session.id}
          ORDER BY joined_at DESC
          LIMIT 60
        `,
        sql`
          SELECT COUNT(*)::int AS total
          FROM trivia_answers
          WHERE session_id = ${session.id} AND question_index = ${session.currentQuestionIndex}
        `,
      ]);

      presenterData = {
        playerCount: Number(playersCountRes.rows[0]?.total ?? 0),
        answerCount: Number(answerCountRes.rows[0]?.total ?? 0),
        recentPlayers: recentPlayersRes.rows.map((r) => String(r.name)),
      };
    }

    let playerExists = false;
    let mySelectedOption: number | null = null;
    let me: {
      name: string;
      score: number;
      correctCount: number;
      rank: number;
      lastAnswer: {
        optionIndex: number;
        isCorrect: boolean;
        points: number;
        elapsedMs: number;
      } | null;
    } | null = null;

    if (playerId && UUID_REGEX.test(playerId)) {
      const playerRes = await sql`
        SELECT id, name, score, correct_count, total_time_ms, joined_at
        FROM trivia_players
        WHERE id = ${playerId}::uuid AND session_id = ${session.id}
        LIMIT 1
      `;

      if (playerRes.rows.length > 0) {
        playerExists = true;
        const p = playerRes.rows[0];

        if (session.status === "question") {
          const ansRes = await sql`
            SELECT option_index
            FROM trivia_answers
            WHERE session_id = ${session.id}
              AND question_index = ${session.currentQuestionIndex}
              AND player_id = ${playerId}::uuid
            LIMIT 1
          `;
          if (ansRes.rows.length > 0) {
            mySelectedOption = Number(ansRes.rows[0].option_index);
          }
        } else if (session.status !== "lobby") {
          const score = Number(p.score ?? 0);
          const totalTimeMs = Number(p.total_time_ms ?? 0);

          const [rankRes, ansRes] = await Promise.all([
            sql`
              SELECT (COUNT(*) + 1)::int AS rank
              FROM trivia_players
              WHERE session_id = ${session.id}
                AND (
                  score > ${score}
                  OR (score = ${score} AND total_time_ms < ${totalTimeMs})
                  OR (score = ${score} AND total_time_ms = ${totalTimeMs} AND joined_at < ${p.joined_at})
                )
            `,
            sql`
              SELECT option_index, is_correct, points, elapsed_ms
              FROM trivia_answers
              WHERE session_id = ${session.id}
                AND question_index = ${session.currentQuestionIndex}
                AND player_id = ${playerId}::uuid
              LIMIT 1
            `,
          ]);

          me = {
            name: String(p.name),
            score,
            correctCount: Number(p.correct_count ?? 0),
            rank: Number(rankRes.rows[0]?.rank ?? 1),
            lastAnswer:
              ansRes.rows.length > 0
                ? {
                    optionIndex: Number(ansRes.rows[0].option_index),
                    isCorrect: Boolean(ansRes.rows[0].is_correct),
                    points: Number(ansRes.rows[0].points ?? 0),
                    elapsedMs: Number(ansRes.rows[0].elapsed_ms ?? 0),
                  }
                : null,
          };
        }
      }
    }

    return NextResponse.json(
      {
        id: session.id,
        code: session.code,
        title: session.title,
        conferenceTitle: session.conferenceTitle,
        status: session.status,
        stateVersion: session.stateVersion,
        currentQuestionIndex: session.currentQuestionIndex,
        totalQuestions: session.questions.length,
        questionStartedAtMs: session.questionStartedAtMs,
        serverNowMs: session.serverNowMs,
        question,
        reveal: session.status !== "lobby" && session.status !== "question" ? session.reveal : null,
        presenter: presenterData,
        playerExists,
        mySelectedOption,
        me,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching trivia state:", error);
    return NextResponse.json(
      { error: "Error al obtener estado de la trivia." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

