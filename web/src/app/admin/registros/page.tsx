import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

interface Registro {
  id: number;
  ticket_type: string;
  is_member: boolean;
  nombre: string;
  email: string;
  empresa: string | null;
  cargo: string | null;
  created_at: string;
}

export default async function AdminRegistros() {
  let registrations: Registro[] = [];
  try {
    const { rows } = await sql`
      SELECT * FROM registrations 
      ORDER BY created_at DESC
    `;
    registrations = rows as Registro[];
  } catch (error) {
    console.error('Error fetching registrations:', error);
  }

  const total = registrations.length;
  const vipCount = registrations.filter(r => r.ticket_type === 'vip').length;
  const congresoCount = registrations.filter(r => r.ticket_type === 'congreso').length;
  const pisoCount = registrations.filter(r => r.ticket_type === 'piso').length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-sm text-gray-500 mt-1">EXPO LOGÍSTICA 2026 · CLN — 20 de noviembre, DoubleTree by Hilton Managua</p>
          </div>
          <a 
            href="/admin/export"
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar a Excel
          </a>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Registrados</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pases VIP</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{vipCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pases Congreso</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{congresoCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Piso Exhibición</h3>
            <p className="text-3xl font-bold text-gray-600 mt-2">{pisoCount}</p>
          </div>
        </div>

        {/* Tabla de Registros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Contacto</th>
                  <th className="px-6 py-4 font-medium">Empresa / Cargo</th>
                  <th className="px-6 py-4 font-medium">Pase</th>
                  <th className="px-6 py-4 font-medium">Socio CLN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No hay registros todavía.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(reg.created_at).toLocaleDateString('es-NI', {
                          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{reg.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reg.empresa || '-'}<br/>
                        <span className="text-gray-400 text-xs">{reg.cargo || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          reg.ticket_type === 'vip' ? 'bg-orange-100 text-orange-700' :
                          reg.ticket_type === 'congreso' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {reg.ticket_type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reg.is_member ? '✅ Sí' : '❌ No'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
