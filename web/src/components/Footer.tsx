import Image from "next/image";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cln-950 text-gray-300 py-12 border-t border-cln-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/logo-vertical.png"
              alt="Comunidad Logística Nicaragüense"
              width={217}
              height={256}
              className="h-20 w-auto object-contain mb-4"
              sizes="217px"
            />
            <p className="text-sm text-gray-400 mb-4">
              Conectando Profesionales, Potenciando la Logística. El gran encuentro anual de la Comunidad
              Logística Nicaragüense, en su edición 2026.
            </p>
            <p className="text-sm text-cln-300 font-bold">#SoyCLN</p>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-xl mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agenda" className="hover:text-cln-300 transition-colors">Programa del Evento</Link></li>
              <li><Link href="/ponentes" className="hover:text-cln-300 transition-colors">Conferencistas</Link></li>
              <li><Link href="/patrocinadores" className="hover:text-cln-300 transition-colors">Sponsors</Link></li>
              <li><Link href="/registro" className="hover:text-cln-300 transition-colors">Registro y Tarifas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-xl mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mayerling Cervantes</li>
              <li>Líder Organizadora</li>
              <li><a href="mailto:cln@nilogistic.com" className="hover:text-cln-300 transition-colors">cln@nilogistic.com</a></li>
              <li><a href="tel:+50584936257" className="hover:text-cln-300 transition-colors">+505 8493 6257</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EXPO LOGÍSTICA 2026 · CLN. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
