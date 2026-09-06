import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM registrations 
      ORDER BY created_at DESC
    `;

    // Crear cabeceras del CSV
    const csvHeaders = ['ID,Fecha,Nombre,Email,Empresa,Cargo,Tipo de Pase,Socio CLN'];
    
    // Crear filas del CSV
    const csvRows = rows.map((reg) => {
      // Escapar campos que puedan contener comas para no romper el CSV
      const escape = (text: string | null) => {
        if (!text) return '""';
        return `"${text.replace(/"/g, '""')}"`;
      };

      const date = new Date(reg.created_at).toLocaleDateString('es-NI', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      return [
        reg.id,
        escape(date),
        escape(reg.nombre),
        escape(reg.email),
        escape(reg.empresa),
        escape(reg.cargo),
        escape(reg.ticket_type),
        reg.is_member ? 'Si' : 'No'
      ].join(',');
    });

    const csvContent = csvHeaders.concat(csvRows).join('\n');

    // Retornar el archivo como descarga
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Registros_CLN_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error al exportar registros:', error);
    return new NextResponse('Error al generar el reporte', { status: 500 });
  }
}
