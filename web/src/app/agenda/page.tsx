import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda | CLN Evento de Cierre 2026",
  description: "Programa de actividades del Evento de Cierre 2026 de la Comunidad Logística Nicaragüense.",
};

export default function AgendaPage() {
  const schedule = [
    { time: "7:00 a.m. – 8:00 a.m.", title: "Montaje final / Staff / Sponsors", type: "utility" },
    { time: "8:00 a.m. – 8:30 a.m.", title: "Registro", type: "utility" },
    { time: "8:30 a.m. – 9:00 a.m.", title: "Apertura / Bienvenida", type: "panel" },
    { time: "9:00 a.m. – 9:40 a.m.", title: "Conferencia 1", type: "conference" },
    { time: "9:50 a.m. – 10:30 a.m.", title: "Conferencia 2", type: "conference" },
    { time: "10:30 a.m. – 11:00 a.m.", title: "Coffee Break AM + Sponsors", type: "break" },
    { time: "11:00 a.m. – 12:00 m.", title: "Conferencia Magistral 1", type: "magistral" },
    { time: "12:15 p.m. – 1:30 p.m.", title: "Almuerzo", type: "break" },
    { time: "1:30 p.m. – 2:10 p.m.", title: "Conferencia 3", type: "conference" },
    { time: "2:10 p.m. – 2:40 p.m.", title: "Coffee Break PM + Sponsors", type: "break" },
    { time: "2:40 p.m. – 3:40 p.m.", title: "Conferencia Magistral 2", type: "magistral" },
    { time: "3:40 p.m. – 4:00 p.m.", title: "Actividad Sponsors / CLN", type: "utility" },
    { time: "4:00 p.m. – 5:30 p.m.", title: "Networking de cierre", type: "networking" },
    { time: "5:30 p.m. – 6:00 p.m.", title: "Cierre operativo / desmontaje", type: "utility" }
  ];

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "conference": return "border-cln-400 bg-white";
      case "magistral": return "border-cln-600 bg-cln-50";
      case "panel": return "border-cln-300 bg-white";
      case "break": return "border-gray-300 bg-gray-50";
      case "networking": return "border-cln-900 bg-cln-900 text-white";
      default: return "border-gray-200 bg-white text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-cln-950 mb-4">Agenda del Evento</h1>
        <p className="text-lg text-gray-600">Sábado 21 de Noviembre de 2026 | Hyatt Place Managua</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <ol className="divide-y divide-gray-100">
          {schedule.map((item, index) => (
            <li key={index} className={`flex flex-col sm:flex-row p-6 sm:p-8 border-l-4 transition-all hover:translate-x-1 ${getTypeStyle(item.type)}`}>
              <div className="sm:w-1/3 mb-2 sm:mb-0 flex-shrink-0">
                <time className={`font-semibold ${item.type === 'networking' ? 'text-cln-300' : 'text-cln-700'}`}>
                  {item.time}
                </time>
              </div>
              <div className="sm:w-2/3">
                <h3 className={`text-lg font-bold ${item.type === 'networking' ? 'text-white' : 'text-cln-950'}`}>
                  {item.title}
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>* Este programa es preliminar y podrá experimentar ajustes menores.</p>
      </div>
    </div>
  );
}
