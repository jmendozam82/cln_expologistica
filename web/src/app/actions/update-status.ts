'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function updateRegistrationStatus(id: number, newStatus: string) {
  try {
    // Ensure the status column exists just in case
    try {
      await sql`ALTER TABLE registrations ADD COLUMN status VARCHAR(50) DEFAULT 'Registrado';`;
    } catch (e) {
      // Ignore if already exists
    }

    await sql`
      UPDATE registrations 
      SET status = ${newStatus}
      WHERE id = ${id}
    `;

    // Revalidate the admin path to refresh data
    revalidatePath('/admin/registros');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false, error: 'Error al actualizar el estado' };
  }
}
