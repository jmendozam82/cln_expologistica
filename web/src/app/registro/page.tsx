"use client";

import { useState } from "react";

export default function RegistroPage() {
  const [ticketType, setTicketType] = useState<"congreso" | "vip" | "piso" | null>(null);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Precios base
  const prices = {
    congreso: { member: 100, nonMember: 150 },
    vip: { member: 180, nonMember: 210 },
  };

  const getPrice = () => {
    if (ticketType === "piso") return "Sin costo";
    if (ticketType === "congreso") return `$${isMember ? prices.congreso.member : prices.congreso.nonMember}`;
    if (ticketType === "vip") return `$${isMember ? prices.vip.member : prices.vip.nonMember}`;
    return "-";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí se conectará con el Server Action / Vercel Postgres
    // await submitRegistration(new FormData(e.target as HTMLFormElement));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="bg-green-50 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-4xl font-heading font-bold text-cln-950 mb-4">¡Registro Exitoso!</h1>
        <p className="text-lg text-gray-600 mb-8">Hemos recibido tu solicitud de registro. Un ejecutivo se pondrá en contacto contigo pronto.</p>
        <button onClick={() => window.location.href = '/'} className="bg-cln-600 text-white font-bold py-3 px-8 rounded-md shadow hover:bg-cln-500 transition-colors">
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <span className="bg-cln-100 text-cln-700 font-bold px-4 py-1 rounded-full text-sm mb-4 inline-block">Cupos Limitados: 120 personas</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-cln-950 mb-4">Registro al Evento</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Selecciona tu tipo de acceso y completa el formulario para asegurar tu participación en el Evento de Cierre CLN 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Card Piso */}
        <div 
          onClick={() => setTicketType('piso')}
          className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col transition-all ${ticketType === 'piso' ? 'border-cln-500 shadow-lg bg-cln-50/30' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Piso de Exhibición</h3>
          <p className="text-3xl font-heading font-extrabold text-gray-900 mb-4">Sin Costo</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Acceso al área de patrocinadores</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No incluye conferencias ni alimentación</li>
          </ul>
          <div className={`w-full py-2 rounded text-center font-bold text-sm ${ticketType === 'piso' ? 'bg-cln-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {ticketType === 'piso' ? 'Seleccionado' : 'Elegir Pase'}
          </div>
        </div>

        {/* Card Congreso */}
        <div 
          onClick={() => setTicketType('congreso')}
          className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col transition-all relative ${ticketType === 'congreso' ? 'border-cln-500 shadow-xl bg-cln-50/50' : 'border-cln-200 shadow-md bg-white hover:border-cln-300'}`}
        >
          <div className="absolute top-0 right-0 bg-cln-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">RECOMENDADO</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pase Congreso</h3>
          <p className="text-3xl font-heading font-extrabold text-gray-900 mb-1">Desde $100</p>
          <p className="text-xs text-gray-500 mb-4">+ IVA. Precio varía si es asociado.</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Todas las conferencias magistrales</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Coffee breaks y Almuerzo Ejecutivo</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Piso de exhibición</li>
          </ul>
          <div className={`w-full py-2 rounded text-center font-bold text-sm ${ticketType === 'congreso' ? 'bg-cln-500 text-white' : 'bg-cln-100 text-cln-700'}`}>
            {ticketType === 'congreso' ? 'Seleccionado' : 'Elegir Pase'}
          </div>
        </div>

        {/* Card VIP */}
        <div 
          onClick={() => setTicketType('vip')}
          className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col transition-all ${ticketType === 'vip' ? 'border-cln-900 shadow-xl bg-gray-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pase VIP & Networking</h3>
          <p className="text-3xl font-heading font-extrabold text-gray-900 mb-1">Desde $180</p>
          <p className="text-xs text-gray-500 mb-4">+ IVA. Precio varía si es asociado.</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Todo lo del Pase Congreso</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Acceso a Evento de Cierre Networking</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Bebidas y música en vivo</li>
          </ul>
          <div className={`w-full py-2 rounded text-center font-bold text-sm ${ticketType === 'vip' ? 'bg-cln-900 text-white' : 'bg-gray-800 text-white'}`}>
            {ticketType === 'vip' ? 'Seleccionado' : 'Elegir Pase'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Detalles del Asistente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
              <input type="text" id="nombre" name="nombre" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cln-500 focus:border-cln-500 p-2 border" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
              <input type="email" id="email" name="email" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cln-500 focus:border-cln-500 p-2 border" />
            </div>
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa {ticketType === 'piso' ? '*' : ''}</label>
              <input type="text" id="empresa" name="empresa" required={ticketType === 'piso'} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cln-500 focus:border-cln-500 p-2 border" />
            </div>
            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">Cargo {ticketType === 'piso' ? '*' : ''}</label>
              <input type="text" id="cargo" name="cargo" required={ticketType === 'piso'} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cln-500 focus:border-cln-500 p-2 border" />
            </div>
          </div>

          {(ticketType === 'congreso' || ticketType === 'vip') && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">¿Es tu empresa asociada a CLN?</h4>
                <p className="text-sm text-gray-600">Los asociados reciben una tarifa preferencial.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isMember} onChange={() => setIsMember(!isMember)} />
                  <div className={`block w-14 h-8 rounded-full ${isMember ? 'bg-cln-500' : 'bg-gray-300'} transition-colors`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isMember ? 'transform translate-x-6' : ''}`}></div>
                </div>
              </label>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-500 text-sm">Total a pagar:</span>
              <div className="text-3xl font-heading font-bold text-cln-950">
                {getPrice()}
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!ticketType || isSubmitting}
              className={`w-full md:w-auto px-8 py-3 rounded-md font-bold shadow-lg transition-all flex items-center justify-center ${
                !ticketType 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-cln-600 hover:bg-cln-500 text-white hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                !ticketType ? 'Selecciona tu condición de tarifa' : 
                ticketType === 'piso' ? 'Obtener pase sin costo' : 'Enviar solicitud de acceso'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
