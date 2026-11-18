import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sql } from "@vercel/postgres";
import { getSessionByCode } from "@/lib/trivia";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const code = typeof body.code === "string" ? body.code : "";
    const rawName = typeof body.name === "string" ? body.name : "";
    const name = rawName.trim().replace(/\s+/g, " ").slice(0, 60);

    if (!code.trim()) {
      return NextResponse.json({ error: "Código de sala requerido." }, { status: 400 });
    }

    const session = await getSessionByCode(code);
    if (!session) {
      return NextResponse.json(
        { error: "No encontramos una sala con ese código." },
        { status: 404 }
      );
    }

    if (session.mode !== "poll" && name.length < 2) {
      return NextResponse.json(
        { error: "Ingresa tu nombre (mínimo 2 caracteres)." },
        { status: 400 }
      );
    }

    const effectiveName = session.mode === "poll" ? name || "Anónimo" : name;

    const playerId = randomUUID();
    await sql`
      INSERT INTO trivia_players (id, session_id, name)
      VALUES (${playerId}::uuid, ${session.id}, ${effectiveName})
    `;

    return NextResponse.json({
      playerId,
      name: effectiveName,
      code: session.code,
      mode: session.mode,
      title: session.title,
    });
  } catch (error) {
    console.error("Error joining trivia:", error);
    return NextResponse.json({ error: "No se pudo unir a la sala." }, { status: 500 });
  }
}

