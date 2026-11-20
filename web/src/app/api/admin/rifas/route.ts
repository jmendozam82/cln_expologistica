import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export interface RaffleParticipant {
  id: string;
  nombre: string;
  empresa: string | null;
  cargo: string | null;
  status: string;
}

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, nombre, empresa, cargo, status
      FROM registrations
      ORDER BY nombre ASC, id ASC
    `;

    const participants: RaffleParticipant[] = rows
      .filter((r) => typeof r.nombre === "string" && r.nombre.trim().length > 0)
      .map((r) => ({
        id: `reg-${r.id}`,
        nombre: String(r.nombre).trim(),
        empresa: r.empresa ? String(r.empresa).trim() : null,
        cargo: r.cargo ? String(r.cargo).trim() : null,
        status: r.status ? String(r.status).trim() : "Registrado",
      }));

    return NextResponse.json(
      { participants },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching raffle participants:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los participantes registrados." },
      { status: 500 }
    );
  }
}
