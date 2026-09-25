'use client';

import { useTransition } from 'react';
import { updateRegistrationStatus } from '../../actions/update-status';

export function StatusSelect({ id, currentStatus }: { id: number, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateRegistrationStatus(id, newStatus);
    });
  };

  const status = currentStatus || 'Registrado';

  return (
    <select 
      value={status}
      onChange={handleStatusChange}
      disabled={isPending}
      className={`text-sm font-medium rounded-full px-3 py-1 border-2 outline-none transition-colors ${
        status === 'Pago Realizado' 
          ? 'bg-green-50 text-green-700 border-green-200 focus:border-green-400' 
          : 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:border-yellow-400'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <option value="Registrado">Registrado</option>
      <option value="Pago Realizado">Pago Realizado</option>
    </select>
  );
}
