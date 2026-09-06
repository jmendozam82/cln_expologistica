'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function submitRegistration(formData: FormData) {
  try {
    // 1. Extraer los datos del formulario
    const ticketType = formData.get('ticketType') as string;
    const isMember = formData.get('isMember') === 'true';
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const empresa = formData.get('empresa') as string;
    const cargo = formData.get('cargo') as string;

    // Validación básica
    if (!ticketType || !nombre || !email) {
      throw new Error('Faltan campos requeridos.');
    }

    // 2. Asegurar que la tabla existe (Create Table if Not Exists)
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        ticket_type VARCHAR(50) NOT NULL,
        is_member BOOLEAN NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        empresa VARCHAR(255),
        cargo VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Insertar el nuevo registro
    await sql`
      INSERT INTO registrations (ticket_type, is_member, nombre, email, empresa, cargo)
      VALUES (${ticketType}, ${isMember}, ${nombre}, ${email}, ${empresa}, ${cargo})
    `;

    revalidatePath('/registro');

    return { success: true, message: 'Registro exitoso' };
  } catch (error) {
    console.error('Error al registrar asistente:', error);
    return { success: false, message: 'Ocurrió un error al procesar el registro.' };
  }
}
