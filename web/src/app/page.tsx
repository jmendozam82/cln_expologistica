import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_logistics.png" 
            alt="Logistics Port at Sunset" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-cln-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cln-950 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-cln-500/20 text-cln-300 border border-cln-500/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            COMUNIDAD LOGÍSTICA NICARAGÜENSE
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-tight">
            Evento de Cierre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cln-300 to-cln-500">2026</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
            Conectando Profesionales, Potenciando la Logística. El encuentro B2B más importante de la cadena de suministro en Nicaragua.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/registro" className="w-full sm:w-auto bg-cln-500 hover:bg-cln-400 text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg shadow-cln-500/30 transition-all hover:-translate-y-1">
              Regístrate Ahora
            </Link>
            <Link href="/agenda" className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-md font-bold text-lg transition-all backdrop-blur-sm">
              Ver Programa
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Sábado 21 de Noviembre</h3>
              <p className="text-gray-600">Jornada completa de 7:00 a.m. a 6:00 p.m. con actividades continuas.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Hyatt Place Managua</h3>
              <p className="text-gray-600">Un ambiente ejecutivo de alto nivel para conferencias y networking.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-cln-500 flex flex-col items-center text-center">
              <div className="bg-cln-50 text-cln-600 p-4 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-cln-900 mb-2">Exclusivo para 120 Líderes</h3>
              <p className="text-gray-600">Cupo limitado para garantizar interacciones de alto valor comercial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Networking Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/networking_event.png" 
                  alt="Ejecutivos haciendo networking" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-cln-950 mb-6">Conexiones de Alto Valor</h2>
              <p className="text-lg text-gray-600 mb-6">
                El evento integra en una misma jornada conocimiento, empresas, líderes, innovación y conexiones estratégicas para el ecosistema logístico Nicaragüense.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Conferencias magistrales y especializadas.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Piso de exhibición con 10 empresas patrocinadoras.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Área Lounge para reuniones ejecutivas B2B.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-cln-100 text-cln-600 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">Evento de cierre "Conexión & Networking" con música en vivo.</span>
                </li>
              </ul>
              <Link href="/patrocinadores" className="text-cln-600 font-bold hover:text-cln-800 flex items-center transition-colors">
                Conoce a los patrocinadores
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
