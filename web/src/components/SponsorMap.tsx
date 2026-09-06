"use client";

import { useState } from 'react';

type Status = 'libre' | 'solicitado' | 'bloqueado';

interface BoothData {
  id: string;
  status: Status;
  company?: string;
}

// Generamos los stands basados en la imagen de referencia
const booths: BoothData[] = [
  { id: 'D401', status: 'libre' }, { id: 'D402', status: 'libre' }, { id: 'D403', status: 'solicitado', company: 'Logística Global' }, { id: 'D404', status: 'solicitado' }, { id: 'D405', status: 'solicitado' }, { id: 'D406', status: 'solicitado' }, { id: 'D407', status: 'bloqueado' }, { id: 'D408', status: 'solicitado' }, { id: 'D409', status: 'bloqueado' },
  
  { id: 'D301', status: 'solicitado' }, { id: 'D303', status: 'solicitado' }, { id: 'D302', status: 'bloqueado' }, { id: 'D304', status: 'bloqueado' },
  
  { id: 'D214', status: 'solicitado' }, { id: 'D215', status: 'solicitado' }, { id: 'D216', status: 'libre' }, { id: 'D217', status: 'libre' }, { id: 'D218', status: 'solicitado' }, { id: 'D219', status: 'solicitado' }, { id: 'D220', status: 'solicitado' }, { id: 'D221', status: 'solicitado' }, { id: 'D222', status: 'solicitado' }, { id: 'D223', status: 'solicitado' },
  { id: 'D213', status: 'bloqueado' }, { id: 'D212', status: 'libre' }, { id: 'D211', status: 'libre' }, { id: 'D210', status: 'libre' }, { id: 'D209', status: 'libre' }, { id: 'D208', status: 'libre' }, { id: 'D207', status: 'libre' }, { id: 'D206', status: 'solicitado' }, { id: 'D205', status: 'libre' },
  
  { id: 'D224', status: 'bloqueado' }, { id: 'D225', status: 'solicitado' }, { id: 'D226', status: 'libre' }, { id: 'D204', status: 'libre' }, { id: 'D203', status: 'libre' }, { id: 'D202', status: 'solicitado' }, { id: 'D201', status: 'bloqueado' },
  
  { id: 'D113', status: 'solicitado' }, { id: 'D112', status: 'libre' }, { id: 'D111', status: 'libre' }, { id: 'D110', status: 'libre' },
  { id: 'D109', status: 'libre' }, { id: 'D108', status: 'libre' }, { id: 'D107', status: 'libre' }, { id: 'D106', status: 'libre' }, { id: 'D105', status: 'libre' }, { id: 'D104', status: 'libre' }, { id: 'D103', status: 'libre' },
  { id: 'D102', status: 'solicitado' }, { id: 'D101', status: 'solicitado' },
];

export default function SponsorMap() {
  const [activeBooth, setActiveBooth] = useState<BoothData | null>(null);

  const getStatusColor = (status: Status) => {
    switch(status) {
      case 'solicitado': return 'bg-orange-500 border-orange-600 text-white hover:bg-orange-400 shadow-md';
      case 'bloqueado': return 'bg-cln-400 border-cln-500 text-white hover:bg-cln-300 opacity-80';
      case 'libre': return 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
      default: return 'bg-white';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch(status) {
      case 'solicitado': return 'Solicitado';
      case 'bloqueado': return 'Bloqueado';
      case 'libre': return 'Libre';
    }
  };

  const renderBooth = (id: string, className: string = "") => {
    const booth = booths.find(b => b.id === id) || { id, status: 'libre' };
    return (
      <div 
        key={id}
        className={`relative flex items-center justify-center border text-[10px] font-bold cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:z-20 ${getStatusColor(booth.status)} ${className}`}
        onMouseEnter={() => setActiveBooth(booth)}
        onMouseLeave={() => setActiveBooth(null)}
      >
        <span className="rotate-0 md:-rotate-90 lg:rotate-0 text-center leading-none">{id}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200 overflow-hidden relative">
      {/* Legend */}
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
          <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
          <span className="text-sm font-bold text-gray-700">SOLICITADO</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
          <div className="w-4 h-4 bg-cln-400 rounded-sm"></div>
          <span className="text-sm font-bold text-gray-700">BLOQUEADO</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white">
          <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
          <span className="text-sm font-bold text-gray-700">LIBRE</span>
        </div>
      </div>

      <div className="text-center mb-6 md:mb-10 border-b-2 border-gray-100 pb-4">
        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-cln-950 tracking-wider">SALÓN PRINCIPAL / MAIN HALL</h3>
      </div>

      {/* Map Container - Uses absolute positioning in a responsive container */}
      <div className="relative w-full max-w-5xl mx-auto overflow-x-auto pb-8">
        <div className="relative min-w-[800px] h-[550px] font-sans bg-white mx-auto">
          
          {/* ESCENARIO */}
          <div className="absolute top-4 left-4 w-[280px] h-[80px] bg-gray-100 border-2 border-gray-300 flex items-center justify-center rounded-sm shadow-inner text-center z-0">
            <span className="text-2xl font-bold text-gray-400 tracking-widest">ESCENARIO</span>
          </div>

          {/* Seating Dots (Simulated) */}
          <div className="absolute top-[120px] left-4 grid grid-cols-8 gap-3 opacity-30">
            {Array.from({length: 32}).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-600 rounded-full"></div>
            ))}
          </div>

          {/* D400 Row */}
          <div className="absolute top-4 right-[160px] flex">
            {['D401', 'D402', 'D403', 'D404', 'D405', 'D406', 'D407', 'D408', 'D409'].map(id => renderBooth(id, "w-[40px] h-[45px]"))}
          </div>

          {/* D300 Square */}
          <div className="absolute top-[150px] right-[400px] grid grid-cols-2">
            {['D301', 'D303', 'D302', 'D304'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>

          {/* B2B Area */}
          <div className="absolute top-[120px] right-0 w-[140px] h-[380px] bg-gray-200 border border-gray-300 flex items-center justify-center rounded-sm shadow-inner">
            <span className="text-6xl font-extrabold text-gray-400 tracking-widest -rotate-90 transform origin-center">B2B</span>
          </div>

          {/* Seating near B2B */}
          <div className="absolute top-[80px] right-[10px] grid grid-cols-6 gap-3 opacity-30">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-600 rounded-full"></div>
            ))}
          </div>

          {/* D200 U-Shape & D100 L-Shape */}
          
          {/* D200 Top Row */}
          <div className="absolute top-[280px] left-[140px] flex">
            {['D214', 'D215', 'D216', 'D217', 'D218', 'D219', 'D220', 'D221', 'D222', 'D223'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>
          {/* D200 Bottom Row */}
          <div className="absolute top-[325px] left-[140px] flex">
            {['D213', 'D212', 'D211', 'D210', 'D209', 'D208', 'D207', 'D206', 'D205'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>
          {/* D200 Right Column going down */}
          <div className="absolute top-[280px] left-[590px] flex flex-col">
            {['D224', 'D225', 'D226', 'D204', 'D203', 'D202', 'D201'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>

          {/* D100 Left Column going down */}
          <div className="absolute top-[280px] left-0 flex flex-col">
            {['D113', 'D112', 'D111', 'D110'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>
          {/* D100 Bottom Row */}
          <div className="absolute top-[415px] left-[45px] flex">
            {['D109', 'D108', 'D107', 'D106', 'D105', 'D104', 'D103'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>
          {/* D100 Right little tail */}
          <div className="absolute top-[415px] left-[360px] flex flex-col">
            {['D102', 'D101'].map(id => renderBooth(id, "w-[45px] h-[45px]"))}
          </div>

          {/* Entry / Exit tags */}
          <div className="absolute bottom-0 left-[250px] border-t-8 border-gray-400 pt-2 px-8">
            <span className="font-bold text-lg text-gray-800">ACCESO / ACCESS</span>
          </div>
          <div className="absolute bottom-0 right-[200px] border-t-8 border-gray-400 pt-2 px-8">
            <span className="font-bold text-lg text-gray-800">SALIDA / EXIT</span>
          </div>
        </div>
      </div>

      {/* Tooltip Overlay (Fixed position relative to container) */}
      {activeBooth && (
        <div className="absolute bottom-8 right-8 bg-white border-2 border-cln-200 shadow-2xl rounded-xl p-6 z-50 w-72 md:w-80 animate-fade-in-up transition-all pointer-events-none md:pointer-events-auto">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-3xl font-heading font-black text-cln-950">Stand {activeBooth.id}</h4>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white uppercase ${getStatusColor(activeBooth.status).split(' ')[0]}`}>
              {getStatusLabel(activeBooth.status)}
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100 my-4"></div>
          
          {activeBooth.status === 'solicitado' && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Empresa Patrocinadora</p>
              <p className="text-lg text-cln-600 font-bold">{activeBooth.company || 'Reservado / Confirmado'}</p>
            </div>
          )}
          
          {activeBooth.status === 'libre' && (
            <div>
              <p className="text-gray-600 mb-4 text-sm font-medium">Excelente ubicación comercial. Maximice su visibilidad conectando con líderes del sector.</p>
              <a href="mailto:cln@nilogistic.com" className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                Solicitar Cotización
              </a>
            </div>
          )}
          
          {activeBooth.status === 'bloqueado' && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-cln-800 font-medium">Este espacio se encuentra reservado por la organización para uso logístico.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
