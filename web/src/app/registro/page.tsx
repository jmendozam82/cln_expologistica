"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitRegistration } from "../actions/register";
import { EVENT_DATE_LONG, EVENT_TIME, EVENT_LOCATION } from "@/lib/event";

function Check() {
  return (
    <svg className="w-5 h-5 inline-block text-cln-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Dash() {
  return <span className="text-gray-300 font-semibold">—</span>;
}

const COMPARE_ROWS: { label: string; piso: "yes" | "no"; congreso: "yes" | "no"; vip: "yes" | "no" }[] = [
  { label: "Piso de exhibición", piso: "yes", congreso: "yes", vip: "yes" },
  { label: "Networking con proveedores", piso: "yes", congreso: "yes", vip: "yes" },
  { label: "Conferencias magistrales", piso: "no", congreso: "yes", vip: "yes" },
  { label: "Almuerzo ejecutivo", piso: "no", congreso: "yes", vip: "yes" },
  { label: "2 coffee breaks", piso: "no", congreso: "yes", vip: "yes" },
  { label: "Cóctel de cierre", piso: "no", congreso: "no", vip: "yes" },
];

export default function RegistroPage() {
  const router = useRouter();
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
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Agregar valores controlados por estado al FormData
      if (ticketType) formData.append('ticketType', ticketType);
      formData.append('isMember', isMember.toString());
      
      const result = await submitRegistration(formData);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.message || "Ocurrió un error");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="bg-green-50 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-4xl font-heading font-bold text-cln-950 mb-4">¡Registro Exitoso!</h1>
        <p className="text-lg text-gray-600 mb-8">Hemos recibido tu solicitud de registro. Un ejecutivo se pondrá en contacto contigo pronto.</p>
        <button onClick={() => router.push('/')} className="bg-cln-600 text-white font-bold py-3 px-8 rounded-md shadow hover:bg-cln-500 transition-colors">
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative bg-cln-950 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://nilogistic.com/wp-content/uploads/2026/09/Hero-Registro-scaled.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cln-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-cln-950 via-transparent to-transparent" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.045,
          }}
          aria-hidden
        />
        <div className="relative z-10 text-left max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <span className="inline-block py-1 px-3 rounded-full bg-cln-500/20 text-cln-300 border border-cln-500/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            REGISTRO · CUPOS LIMITADOS
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Reserva tu lugar en la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">
              cita logística del año
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-6">
            Selecciona tu tipo de acceso y completa el formulario para asegurar tu participación en el
            gran encuentro anual de la Comunidad Logística Nicaragüense.
          </p>
          <p className="text-sm md:text-base text-cln-300 font-medium mb-10">
            {EVENT_DATE_LONG} · {EVENT_TIME} · {EVENT_LOCATION}
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <a
              href="#registro"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              Reservar mi acceso
            </a>
            <a
              href="/agenda"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Ver programa
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ BANDA DE TARIFAS ════════════════════════════════ */}
      <section aria-label="Vigencia de tarifas" className="bg-cln-900 border-y border-cln-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-400 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" aria-hidden />
              Tarifas vigentes
            </p>
            <h2 className="font-heading font-extrabold text-white text-2xl md:text-3xl mb-2">
              Congreso y VIP con cupo limitado
            </h2>
            <p className="text-cln-200 font-light md:text-lg">
              Selecciona tu acceso y confirma la condición de tarifa que te corresponde.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 lg:text-right shrink-0">
            <div>
              <p className="text-2xl font-heading font-extrabold text-white">Congreso desde $100</p>
              <p className="text-sm text-cln-300">+ IVA · por persona</p>
            </div>
            <div className="sm:border-l sm:border-cln-800 sm:pl-6">
              <p className="text-2xl font-heading font-extrabold text-white">VIP desde $180</p>
              <p className="text-sm text-cln-300">+ IVA · por persona</p>
            </div>
            <div className="sm:border-l sm:border-cln-800 sm:pl-6">
              <p className="text-2xl font-heading font-extrabold text-orange-400">Cupo limitado</p>
              <p className="text-sm text-cln-300">300 accesos · Congreso + VIP</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ REGISTRO ════════════════════════════════ */}
      <section id="registro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              Acceso y tarifas
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cln-950 leading-tight">
              Elige tu tipo de acceso
            </h2>
          </div>
          <div>
            <p className="text-xl font-medium text-gray-600 leading-relaxed lg:text-right mb-2">
              Los asociados a CLN reciben una tarifa preferencial. Selecciona el pase que mejor
              se ajuste a tu participación.
            </p>
            <p className="text-sm text-gray-500 lg:text-right">
              Precios por persona. Las tarifas de Congreso y VIP no incluyen IVA.
            </p>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Card Piso */}
        <div 
          onClick={() => setTicketType('piso')}
          className={`cursor-pointer rounded-xl border-2 p-6 flex flex-col transition-all ${ticketType === 'piso' ? 'border-cln-500 shadow-lg bg-cln-50/30' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Piso de Exhibición</h3>
          <p className="text-3xl font-heading font-extrabold text-gray-900 mb-1">Sin costo</p>
          <p className="text-xs text-gray-500 mb-4">Pase individual · con registro</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Acceso a stands y área de patrocinadores</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Networking con proveedores y líderes del sector</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Pase con código QR para ingreso ágil</li>
            <li className="flex items-start text-gray-400"><svg className="w-5 h-5 text-gray-300 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>No incluye conferencias del Congreso</li>
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
          <p className="text-xs text-gray-500 mb-3">+ IVA · por persona</p>
          <div className="rounded-lg bg-cln-50 border border-cln-100 divide-y divide-cln-100 text-sm mb-4">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-600">Asociado CLN</span>
              <strong className="text-cln-900">$100</strong>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-600">No Asociado</span>
              <strong className="text-cln-900">$150</strong>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Todas las conferencias magistrales</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Coffee breaks y Almuerzo Ejecutivo</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Piso de exhibición incluido</li>
            <li className="flex items-start text-gray-400"><svg className="w-5 h-5 text-gray-300 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>No incluye cócteles VIP</li>
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
          <p className="text-xs text-gray-500 mb-3">+ IVA · por persona</p>
          <div className="rounded-lg bg-gray-50 border border-gray-200 divide-y divide-gray-200 text-sm mb-4">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-600">Asociado CLN</span>
              <strong className="text-cln-900">$180</strong>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-600">No Asociado</span>
              <strong className="text-cln-900">$210</strong>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-grow">
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Todo lo del Pase Congreso</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Acceso al cóctel de cierre y networking</li>
            <li className="flex items-start"><svg className="w-5 h-5 text-cln-900 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Bebidas y música en vivo</li>
          </ul>
          <div className={`w-full py-2 rounded text-center font-bold text-sm ${ticketType === 'vip' ? 'bg-cln-900 text-white' : 'bg-gray-800 text-white'}`}>
            {ticketType === 'vip' ? 'Seleccionado' : 'Elegir Pase'}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-10 mx-auto max-w-3xl text-center leading-relaxed">
        <strong className="text-gray-700">Piso de exhibición:</strong> acceso sin costo a stands,
        proveedores y networking.{" "}
        <strong className="text-gray-700">Congreso y VIP:</strong> 300 accesos disponibles para la
        agenda ejecutiva. La condición de Asociado CLN será validada por el equipo organizador.
      </p>

      <details className="group max-w-4xl mx-auto mb-12 rounded-xl border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none">
          <span className="font-bold text-cln-950">Ver tarifas completas e inclusiones por tipo de acceso</span>
          <svg className="w-5 h-5 text-orange-500 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
        </summary>
        <div className="px-6 pb-6 space-y-8">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-cln-950 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Participación</th>
                  <th className="px-4 py-3 text-left font-semibold" colSpan={2}>Congreso</th>
                  <th className="px-4 py-3 text-left font-semibold" colSpan={2}>VIP</th>
                </tr>
                <tr className="bg-cln-50">
                  <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-cln-700">Tarifas</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-cln-700">Asociado CLN</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-cln-700">No Asociado</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-cln-700">Asociado CLN</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-cln-700">No Asociado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50/50">
                  <td className="px-4 py-3 font-bold text-cln-950">Tarifas vigentes</td>
                  <td className="px-4 py-3 font-semibold">$100 + IVA</td>
                  <td className="px-4 py-3 font-semibold">$150 + IVA</td>
                  <td className="px-4 py-3 font-semibold">$180 + IVA</td>
                  <td className="px-4 py-3 font-semibold">$210 + IVA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-cln-950 mb-1">Alcance de cada acceso</h3>
            <p className="text-sm text-gray-500 mb-4">
              El piso de exhibición está diseñado para explorar soluciones y generar contacto
              comercial. Congreso y VIP agregan contenido ejecutivo, alimentación y espacios de
              networking con cupo limitado.
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-cln-950 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Inclusión</th>
                    <th className="px-4 py-3 font-semibold">Piso</th>
                    <th className="px-4 py-3 font-semibold">Congreso</th>
                    <th className="px-4 py-3 font-semibold">VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3 text-center">{row.piso === "yes" ? <Check /> : <Dash />}</td>
                      <td className="px-4 py-3 text-center">{row.congreso === "yes" ? <Check /> : <Dash />}</td>
                      <td className="px-4 py-3 text-center">{row.vip === "yes" ? <Check /> : <Dash />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </details>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-4">Completa tu registro</h2>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Pase inmediato para el piso de exhibición</li>
          <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Perfil de visita para orientar mejor la experiencia comercial</li>
          <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Tarifa de asociados sujeta a validación de CLN</li>
          <li className="flex items-start"><svg className="w-5 h-5 text-cln-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Reservas Congreso/VIP sujetas a cupo y confirmación administrativa</li>
        </ul>
        
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

        <div className="border-t border-gray-100 mt-8 pt-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">
            Qué pasa después de enviar
          </h4>
          {ticketType === "piso" ? (
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cln-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">1</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Registras tus datos</p>
                  <p className="text-xs text-gray-500">Proceso rápido y sin costo</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cln-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">2</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Generamos tu pase QR</p>
                  <p className="text-xs text-gray-500">Disponible al instante y por correo</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-cln-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">3</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Ingresas al piso de exhibición</p>
                  <p className="text-xs text-gray-500">Desde tu teléfono o impreso</p>
                </div>
              </li>
            </ol>
          ) : (
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">1</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Envías tu solicitud</p>
                  <p className="text-xs text-gray-500">Sin cobro automático</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">2</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Validamos cupo y tarifa</p>
                  <p className="text-xs text-gray-500">El equipo organizador te contacta</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">3</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Coordinamos pago y factura</p>
                  <p className="text-xs text-gray-500">Con IVA según corresponda</p>
                </div>
              </li>
            </ol>
          )}
          {ticketType && ticketType !== "piso" && (
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              <strong className="text-gray-700">Pago pendiente:</strong> generaremos tu QR al enviar
              la solicitud, pero el ingreso se habilitará cuando el equipo organizador confirme el pago.
            </p>
          )}
        </div>
      </div>
      </section>

      {/* ════════════════════════════════ CTA FINAL ════════════════════════════════ */}
      <section className="bg-cln-950 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Asegura tu acceso hoy
          </h2>
          <p className="text-lg text-cln-200 font-light mb-8 leading-relaxed">
            Los cupos son limitados. Reserva tu participación y únete al encuentro que reúne a la
            Comunidad Logística Nicaragüense.
          </p>
          <a
            href="#registro"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            Reservar mi acceso
          </a>
        </div>
      </section>
    </div>
  );
}
