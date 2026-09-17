'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { RegistrationEmail } from '@/emails/RegistrationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRegistration(formData: FormData) {
  try {
    // 1. Extraer los datos del formulario
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const empresa = formData.get('empresa') as string;
    const cargo = formData.get('cargo') as string;
    const telefono = formData.get('telefono') as string;

    // Validación básica
    if (!nombre || !email || !telefono) {
      throw new Error('Faltan campos requeridos.');
    }

    // 2. Asegurar que la tabla existe
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        ticket_type VARCHAR(50) DEFAULT 'congreso',
        is_member BOOLEAN DEFAULT false,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        empresa VARCHAR(255),
        cargo VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Asegurar que la columna telefono existe si la tabla ya estaba creada antes
    try {
      await sql`ALTER TABLE registrations ADD COLUMN telefono VARCHAR(50);`;
    } catch (e) {
      // Ignorar si la columna ya existe
    }

    // 3. Insertar el nuevo registro
    await sql`
      INSERT INTO registrations (ticket_type, is_member, nombre, email, empresa, cargo, telefono)
      VALUES ('congreso', false, ${nombre}, ${email}, ${empresa}, ${cargo}, ${telefono})
    `;

    // 4. Enviar correo de confirmación con Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'CLN Eventos <registro@nilogistic.com>',
        to: email,
        subject: 'Solicitud Recibida - EXPO LOGÍSTICA · CLN · 2026',
        react: RegistrationEmail({ nombre }),
      });
    } else {
      console.warn('RESEND_API_KEY no configurada. No se envió el correo.');
    }

    revalidatePath('/registro');

    return { success: true, message: 'Registro exitoso' };
  } catch (error) {
    console.error('Error al registrar asistente:', error);
    return { success: false, message: 'Ocurrió un error al procesar el registro.' };
  }
}
