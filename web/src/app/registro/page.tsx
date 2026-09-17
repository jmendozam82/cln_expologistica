"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitRegistration } from "../actions/register";
import { EVENT_DATE_LONG, EVENT_TIME, EVENT_LOCATION } from "@/lib/event";

function Check() {
  return (
    <svg className="w-5 h-5 inline-block text-orange-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function RegistroPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [telefono, setTelefono] = useState("+505 ");

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+505 ")) {
      val = "+505 " + val.replace(/^\+?505\s*/, "");
    }
    // Allow only numbers and spaces after the prefix
    const rest = val.slice(5).replace(/[^\d\s]/g, "");
    setTelefono("+505 " + rest);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      formData.append('telefono', telefono);
      
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
        <p className="text-lg text-gray-600 mb-8">Hemos recibido tu solicitud de registro. Un ejecutivo se pondrá en contacto contigo pronto para coordinar el proceso de pago y confirmación de tu acceso.</p>
        <button onClick={() => router.push('/')} className="bg-cln-600 text-white font-bold py-3 px-8 rounded-md shadow hover:bg-cln-500 transition-colors">
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative bg-cln-950 overflow-hidden min-h-[600px] flex items-center">
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
            ACCESO CONGRESO · CUPO LIMITADO
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
            VIVE LA <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">EXPERIENCIA COMPLETA</span>
          </h1>
          <p className="text-2xl md:text-3xl text-cln-200 font-light mb-8 max-w-3xl">
            Todo el contenido. Toda la experiencia.
          </p>
          <p className="text-lg md:text-xl text-cln-200 font-light max-w-3xl mb-10 leading-relaxed">
            Un acceso para vivir Expo Logística CLN 2026 de principio a fin: conocimiento, conexiones, soluciones y experiencias que reúnen a la Comunidad Logística Nicaragüense.
          </p>
          
          <a
            href="#registro"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 mb-6"
          >
            ASEGURAR MI LUGAR &rarr;
          </a>
        </div>
      </section>

      {/* ════════════════════════════════ ACCESO CONGRESO (TARJETA ÚNICA) ════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-3/5 p-8 md:p-12">
              <h2 className="text-3xl font-heading font-extrabold text-cln-950 mb-2">ACCESO CONGRESO</h2>
              <p className="text-lg text-gray-500 mb-8">Todo el contenido. Toda la experiencia.</p>
              
              <h3 className="font-bold text-gray-900 mb-4">Tu acceso incluye:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><Check /> Ponencias de alto nivel</li>
                <li className="flex items-center"><Check /> Conferencias magistrales</li>
                <li className="flex items-center"><Check /> Almuerzo ejecutivo</li>
                <li className="flex items-center"><Check /> Coffee Break AM</li>
                <li className="flex items-center"><Check /> Coffee Break PM</li>
                <li className="flex items-center"><Check /> Networking</li>
                <li className="flex items-center"><Check /> Piso de exhibición</li>
                <li className="flex items-center"><Check /> Actividades de sponsors</li>
                <li className="flex items-center"><Check /> Cóctel de Cierre 2026</li>
              </ul>
            </div>
            <div className="md:w-2/5 bg-cln-950 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center">
              <p className="text-orange-400 font-bold tracking-widest uppercase mb-4 text-sm">UNA SOLA EXPERIENCIA</p>
              <p className="text-gray-300 text-sm mb-2">Tarifa única por persona</p>
              <p className="text-5xl font-heading font-bold text-white mb-2">US$ XXX</p>
              <p className="text-cln-300 text-sm mb-8">+ IVA</p>
              
              <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-cln-200 mb-8">
                Cupos limitados
              </div>
              
              <a
                href="#registro"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all hover:-translate-y-1 text-center"
              >
                ASEGURAR MI LUGAR &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ APRENDER · CONECTAR · COMPARTIR ════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-cln-950 mb-6">
              APRENDER · CONECTAR · COMPARTIR
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Una jornada completa diseñada para pasar del conocimiento a la conversación y de la conversación a nuevas oportunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-cln-100 text-cln-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-cln-950 mb-2">APRENDER</h3>
              <p className="text-orange-500 font-medium text-sm mb-4">Contenido que aporta valor</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-gray-900">Ponencias de alto nivel</h4>
                <p className="text-sm text-gray-600">Ideas, experiencias y perspectivas para comprender los desafíos actuales de Supply Chain.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Conferencias magistrales</h4>
                <p className="text-sm text-gray-600">Voces nacionales e internacionales compartiendo conocimiento y visión estratégica.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-cln-100 text-cln-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-cln-950 mb-2">CONECTAR</h3>
              <p className="text-orange-500 font-medium text-sm mb-4">Personas, empresas y soluciones</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-gray-900">Networking</h4>
                <p className="text-sm text-gray-600">Conecta con profesionales, líderes y empresas de diferentes eslabones de la cadena.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-gray-900">Piso de exhibición</h4>
                <p className="text-sm text-gray-600">Descubre tecnología, servicios y soluciones para la operación logística.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Actividades de sponsors</h4>
                <p className="text-sm text-gray-600">Conoce de cerca las empresas y propuestas que están moviendo la industria.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-cln-100 text-cln-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-cln-950 mb-2">COMPARTIR</h3>
              <p className="text-orange-500 font-medium text-sm mb-4">Momentos para vivir la experiencia</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-gray-900">Almuerzo ejecutivo</h4>
                <p className="text-sm text-gray-600">Un espacio para continuar conversaciones y generar nuevas conexiones.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-gray-900">Coffee Break AM + PM</h4>
                <p className="text-sm text-gray-600">Pausas diseñadas para compartir, conversar y conectar.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Cóctel de Cierre 2026</h4>
                <p className="text-sm text-gray-600">Cerramos la jornada celebrando lo construido y conectando con lo que viene.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ TIMELINE DE LA JORNADA ════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cln-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              Tu día empieza aquí
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
              Una jornada para vivirla completa
            </h2>
            <p className="text-xl text-cln-200 leading-relaxed">
              Desde las primeras ideas de la mañana hasta las conexiones del cierre, cada momento forma parte de una misma experiencia.
            </p>
          </div>

          <div className="relative border-l-2 border-orange-500/30 ml-4 md:ml-0 md:border-l-0 md:flex md:flex-col md:items-center space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-8 md:pl-0 md:w-full md:flex md:items-center md:justify-between">
              <div className="absolute left-[-9px] top-1 md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-orange-500 ring-4 ring-cln-950"></div>
              <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right">
                <span className="text-orange-400 font-bold tracking-widest text-sm">08:00</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <span className="md:hidden text-orange-400 font-bold tracking-widest text-sm block mb-1">08:00</span>
                <h3 className="text-xl font-bold mb-1">Llegada & registro</h3>
                <p className="text-cln-300">El inicio de la experiencia Expo Logística.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8 md:pl-0 md:w-full md:flex md:items-center md:justify-between">
              <div className="absolute left-[-9px] top-1 md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-orange-500 ring-4 ring-cln-950"></div>
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <span className="md:hidden text-orange-400 font-bold tracking-widest text-sm block mb-1">MAÑANA</span>
                <h3 className="text-xl font-bold mb-1">Ideas que inspiran</h3>
                <p className="text-cln-300">Ponencias, conferencias magistrales y primeras conexiones.</p>
              </div>
              <div className="hidden md:block md:w-1/2 md:pl-12 text-left">
                <span className="text-orange-400 font-bold tracking-widest text-sm">MAÑANA</span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8 md:pl-0 md:w-full md:flex md:items-center md:justify-between">
              <div className="absolute left-[-9px] top-1 md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-orange-500 ring-4 ring-cln-950"></div>
              <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right">
                <span className="text-orange-400 font-bold tracking-widest text-sm">MEDIODÍA</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <span className="md:hidden text-orange-400 font-bold tracking-widest text-sm block mb-1">MEDIODÍA</span>
                <h3 className="text-xl font-bold mb-1">Conexiones que continúan</h3>
                <p className="text-cln-300">Almuerzo ejecutivo y networking.</p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative pl-8 md:pl-0 md:w-full md:flex md:items-center md:justify-between">
              <div className="absolute left-[-9px] top-1 md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-orange-500 ring-4 ring-cln-950"></div>
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <span className="md:hidden text-orange-400 font-bold tracking-widest text-sm block mb-1">TARDE</span>
                <h3 className="text-xl font-bold mb-1">Soluciones que transforman</h3>
                <p className="text-cln-300">Piso de exhibición, sponsors y nuevas perspectivas.</p>
              </div>
              <div className="hidden md:block md:w-1/2 md:pl-12 text-left">
                <span className="text-orange-400 font-bold tracking-widest text-sm">TARDE</span>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="relative pl-8 md:pl-0 md:w-full md:flex md:items-center md:justify-between">
              <div className="absolute left-[-9px] top-1 md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-orange-500 ring-4 ring-cln-950"></div>
              <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right">
                <span className="text-orange-400 font-bold tracking-widest text-sm">CIERRE</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <span className="md:hidden text-orange-400 font-bold tracking-widest text-sm block mb-1">CIERRE</span>
                <h3 className="text-xl font-bold mb-1">Conexiones que perduran</h3>
                <p className="text-cln-300">Cóctel de Cierre 2026.</p>
              </div>
            </div>

            {/* Decoración de línea vertical para desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-500/30 -translate-x-1/2 z-[-1]"></div>

          </div>

          <div className="mt-16 text-center text-cln-300 font-bold text-sm tracking-widest">
            CONOCIMIENTO &rarr; CONEXIÓN &rarr; SOLUCIONES &rarr; NETWORKING &rarr; CIERRE
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PARA QUIÉN ES ════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              PARA QUIÉN ES
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-cln-950 mb-4">
              Una experiencia para toda la cadena
            </h2>
            <p className="text-xl text-gray-600">
              Distintos roles. Una misma cadena. Una misma comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Líderes y ejecutivos</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Supply Chain · Operaciones · Logística · Distribución · Dirección</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Profesionales</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Compras · Planificación · Almacenes · Transporte · Comercio Exterior · Tecnología</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Empresas y proveedores</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Tecnología · Servicios · Infraestructura · Soluciones</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Futuros profesionales</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Estudiantes y jóvenes interesados en desarrollar su carrera en el sector.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FORMULARIO Y CONFIANZA ════════════════════════════════ */}
      <section id="registro" className="py-16 md:py-24 bg-white scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
              REGISTRO
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-cln-950 mb-4">
              Asegura tu lugar
            </h2>
            <p className="text-xl text-gray-600">
              Completa tus datos para solicitar tu acceso a Expo Logística CLN 2026.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Columna Izquierda: Formulario */}
            <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-bold text-gray-700 mb-2">Nombre completo *</label>
                    <input type="text" id="nombre" name="nombre" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 border" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Correo electrónico *</label>
                    <input type="email" id="email" name="email" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 border" />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-bold text-gray-700 mb-2">Empresa *</label>
                    <input type="text" id="empresa" name="empresa" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 border" />
                  </div>
                  <div>
                    <label htmlFor="cargo" className="block text-sm font-bold text-gray-700 mb-2">Cargo *</label>
                    <input type="text" id="cargo" name="cargo" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 border" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="telefono" className="block text-sm font-bold text-gray-700 mb-2">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      name="telefono_input"
                      value={telefono}
                      onChange={handleTelefonoChange}
                      required 
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 p-3 border font-mono text-lg" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Ingresa tu número (el código de área +505 está por defecto)</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="font-bold text-cln-950 text-lg uppercase tracking-wider mb-1">ACCESO CONGRESO</p>
                    <p className="text-gray-600">Tarifa: US$ XXX + IVA</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      'ASEGURAR MI LUGAR \u2192'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Columna Derecha: Confianza / Información */}
            <div className="w-full lg:w-2/5 space-y-8">
              <div className="bg-cln-50 border border-cln-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-cln-950 mb-6 border-b border-cln-200 pb-4">Tu acceso incluye</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-cln-300 font-heading font-bold text-2xl mr-4 leading-none">01</span>
                    <div>
                      <p className="font-bold text-gray-900">Contenido de alto nivel</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cln-300 font-heading font-bold text-2xl mr-4 leading-none">02</span>
                    <div>
                      <p className="font-bold text-gray-900">Experiencias y conexiones</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cln-300 font-heading font-bold text-2xl mr-4 leading-none">03</span>
                    <div>
                      <p className="font-bold text-gray-900">Alimentación durante la jornada</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cln-300 font-heading font-bold text-2xl mr-4 leading-none">04</span>
                    <div>
                      <p className="font-bold text-gray-900">Acceso al cierre del evento</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="font-bold text-gray-900">Confirmación de pago</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tu solicitud será recibida por el equipo organizador, quien te contactará para coordinar el proceso de pago y confirmación de tu acceso.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CTA FINAL ════════════════════════════════ */}
      <section className="bg-cln-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://nilogistic.com/wp-content/uploads/2026/09/Hero-Registro-scaled.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-5xl mb-6">
            TODO EL CONTENIDO. TODA LA EXPERIENCIA.
          </h2>
          <p className="text-lg md:text-xl text-cln-200 font-light mb-10 leading-relaxed">
            Un día para aprender, conectar y compartir con quienes están construyendo el futuro de la logística.
          </p>
          <a
            href="#registro"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 mb-6"
          >
            ASEGURAR MI LUGAR &rarr;
          </a>
          <p className="text-sm text-cln-400 font-medium">
            Expo Logística CLN 2026 · Managua · 20 de noviembre
          </p>
        </div>
      </section>
    </div>
  );
}
