import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  ensureTriviaTables,
  getSessionById,
  normalizeRoomCode,
  sanitizeQuestions,
} from "@/lib/trivia";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const session = await getSessionById(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Trivia no encontrada." }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error getting trivia session:", error);
    return NextResponse.json({ error: "Error al obtener la trivia." }, { status: 500 });
  }
}

export async function PATCH(
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

    const existing = await getSessionById(sessionId);
    if (!existing) {
      return NextResponse.json({ error: "Trivia no encontrada." }, { status: 404 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const title = typeof body.title === "string" && body.title.trim() ? body.title.trim() : existing.title;
    const conferenceTitle =
      body.conferenceTitle === null
        ? null
        : typeof body.conferenceTitle === "string"
          ? body.conferenceTitle.trim() || null
          : existing.conferenceTitle;

    const code =
      typeof body.code === "string" && normalizeRoomCode(body.code)
        ? normalizeRoomCode(body.code)
        : existing.code;

    const questions =
      body.questions !== undefined ? sanitizeQuestions(body.questions) : existing.questions;

    await sql`
      UPDATE trivia_sessions
      SET
        title = ${title},
        conference_title = ${conferenceTitle},
        code = ${code},
        questions_json = ${JSON.stringify(questions)}::jsonb,
        state_version = state_version + 1
      WHERE id = ${sessionId}
    `;

    const updated = await getSessionById(sessionId);
    return NextResponse.json({ session: updated });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return NextResponse.json({ error: "Ese código de sala ya está en uso." }, { status: 409 });
    }
    console.error("Error updating trivia session:", error);
    return NextResponse.json({ error: "No se pudo actualizar la trivia." }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTriviaTables();
    const { id } = await context.params;
    const sessionId = Number(id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    await sql`DELETE FROM trivia_sessions WHERE id = ${sessionId}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting trivia session:", error);
    return NextResponse.json({ error: "No se pudo eliminar la trivia." }, { status: 500 });
  }
}

