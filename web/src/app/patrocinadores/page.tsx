import type { Metadata } from "next";
import SponsorMap from "@/components/SponsorMap";

export const metadata: Metadata = {
  title: "Patrocinadores | CLN Evento de Cierre 2026",
  description: "Conozca a los patrocinadores del Evento de Cierre 2026 de la Comunidad Logística Nicaragüense.",
};

export default function PatrocinadoresPage() {
  const sponsors = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Sponsor ${i + 1}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-cln-950 mb-6">Nuestros Patrocinadores</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          El evento cuenta con el respaldo de empresas líderes que apuestan por la innovación y el desarrollo del sector logístico en Nicaragua. Interactúe con el plano a continuación para conocer la ubicación de nuestros aliados estratégicos y reservar su espacio comercial.
        </p>
      </div>

      <div className="mb-20">
        <SponsorMap />
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-bold text-cln-950">Marcas Confirmadas</h2>
        <p className="text-gray-600 mt-2">Próximamente estaremos revelando las empresas que nos acompañan este año.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white rounded-xl shadow-md p-8 border border-gray-100 flex items-center justify-center aspect-[3/2] hover:shadow-lg hover:border-cln-300 transition-all cursor-pointer group">
            <div className="text-gray-400 font-bold text-xl group-hover:text-cln-500 transition-colors">
              Logo {sponsor.name}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-cln-50 rounded-2xl p-8 md:p-12 text-center border border-cln-100 shadow-inner">
        <h3 className="text-3xl font-bold text-cln-900 mb-4">¿Desea ser patrocinador?</h3>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
          Posicione su marca ante 120 ejecutivos y líderes de la cadena de suministro. Contamos con espacios estratégicos en el área principal de circulación, como lo puede visualizar en el mapa superior.
        </p>
        <a href="mailto:cln@nilogistic.com" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105">
          Solicitar Información
        </a>
      </div>
    </div>
  );
}
