"use client";

import { useState } from "react";

const speakers = [
  { id: '1', name: 'Carlos Boshell', role: 'CEO', company: 'Logistics Group', time: '11:00 a.m. - Conferencia Magistral 1' },
  { id: '2', name: 'Jorge Mauricio Pocasangre', role: 'Director Regional', company: 'Supply Chain Latam', time: '9:00 a.m. - Conferencia 1' },
  { id: '3', name: 'Karla Klaus', role: 'Experta en Innovación', company: 'TechLog', time: '1:30 p.m. - Conferencia 3' },
  { id: '4', name: 'Eduardo García Grande', role: 'Consultor Senior', company: 'Global Trade', time: '2:40 p.m. - Conferencia Magistral 2' },
  { id: '5', name: 'Mayerling Cervantes', role: 'Líder Organizadora', company: 'CLN', time: '8:30 a.m. - Apertura' }
];

export default function PonentesPage() {
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  
  const activeSpeaker = speakers.find(s => s.id === activeProfile);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-cln-950 mb-6">Nuestros Conferencistas</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Expertos nacionales e internacionales compartirán su visión sobre el futuro de la logística, supply chain y sectores relacionados en Nicaragua.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group cursor-pointer" onClick={() => setActiveProfile(speaker.id)}>
            <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-cln-900/10 group-hover:bg-transparent transition-colors z-10"></div>
              {/* Avatar placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
            </div>
            <div className="p-6 bg-white flex-grow flex flex-col justify-between relative border-t-4 border-transparent group-hover:border-cln-500 transition-colors">
              <div>
                <h3 className="text-xl font-bold text-cln-950 mb-1">{speaker.name}</h3>
                <p className="text-cln-600 font-medium mb-1">{speaker.role}</p>
                <p className="text-gray-500 text-sm mb-4">{speaker.company}</p>
              </div>
              <button 
                className="text-cln-500 font-bold hover:text-cln-700 flex items-center mt-4 focus:outline-none"
                aria-haspopup="dialog"
                aria-expanded={activeProfile === speaker.id}
              >
                Ver perfil completo
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Speaker Modal */}
      {activeProfile && activeSpeaker && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${activeSpeaker.id}`}
        >
          <div 
            className="fixed inset-0 bg-cln-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProfile(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row transform transition-all">
            <button 
              onClick={() => setActiveProfile(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 md:bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-cln-500"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="w-full md:w-2/5 bg-gray-100 aspect-square md:aspect-auto flex items-center justify-center text-gray-400">
               <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full w-max mb-4">Participación Confirmada</span>
              <h2 id={`modal-title-${activeSpeaker.id}`} className="text-3xl font-heading font-bold text-cln-950 mb-2">{activeSpeaker.name}</h2>
              <p className="text-xl text-cln-600 font-medium mb-6">{activeSpeaker.role}, {activeSpeaker.company}</p>
              
              <div className="prose prose-sm text-gray-600 mb-8">
                <p>Biografía profesional pendiente de actualización para el evento de 2026. Este perfil contará con los detalles de experiencia e hitos en el ecosistema logístico.</p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center text-gray-500 mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium">{activeSpeaker.time}</span>
                </div>
                <a href="/agenda" className="text-cln-600 hover:text-cln-800 font-bold inline-flex items-center mt-2">
                  Ver en la agenda
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
