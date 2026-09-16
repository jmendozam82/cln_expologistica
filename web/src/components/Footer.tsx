import Image from "next/image";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cln-950 text-gray-300 py-12 border-t border-cln-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
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
            <h3 className="text-white font-heading font-bold text-xl mb-4">Aprender</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agenda" className="hover:text-cln-300 transition-colors">Programa del Evento</Link></li>
              <li><Link href="/ponentes" className="hover:text-cln-300 transition-colors">Conferencistas</Link></li>
              <li><Link href="/patrocinadores" className="hover:text-cln-300 transition-colors">Sponsors</Link></li>
              <li><Link href="/registro" className="hover:text-cln-300 transition-colors">Registro y Tarifas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-xl mb-4">Conectar</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="mailto:cln@nilogistic.com" className="hover:text-cln-300 transition-colors" title="Email" aria-label="Email">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://nilogistic.com" target="_blank" rel="noopener noreferrer" className="hover:text-cln-300 transition-colors" title="Sitio Web" aria-label="Sitio Web">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-xl mb-4">Compartir</h3>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <a href="https://www.linkedin.com/groups/12048071" target="_blank" rel="noopener noreferrer" className="hover:text-cln-300 transition-colors" title="LinkedIn" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/F1FDUR0fnvcKwQRzXuvByx" target="_blank" rel="noopener noreferrer" className="hover:text-cln-300 transition-colors" title="Grupo WhatsApp" aria-label="Grupo WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993l-1.341 4.898 5.01-1.315a9.957 9.957 0 004.987 1.336c5.503 0 9.987-4.477 9.989-9.984 0-5.506-4.484-9.985-9.988-9.985v.003zm5.798 14.195c-.244.693-1.42 1.328-1.97 1.392-.489.057-1.111.139-3.559-.876-2.946-1.222-4.832-4.22-4.978-4.417-.145-.198-1.189-1.583-1.189-3.02 0-1.436.75-2.146 1.017-2.434.266-.289.578-.362.771-.362.193 0 .386 0 .559.008.182.008.427-.067.669.516.248.599.854 2.083.927 2.233.072.148.121.323.024.516-.096.194-.145.313-.289.483-.146.168-.311.36-.444.492-.146.146-.302.308-.135.597.168.289.747 1.233 1.606 2.002 1.111.996 2.04 1.3 2.33 1.448.289.148.459.123.633-.075.174-.197.747-.866.945-1.164.198-.298.396-.248.664-.148.267.098 1.692.798 1.982.943.29.144.484.218.555.337.07.121.07.694-.174 1.387z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com/channel/0029VaGLFek1dAw50TdnNu1e" target="_blank" rel="noopener noreferrer" className="hover:text-cln-300 transition-colors" title="Canal WhatsApp" aria-label="Canal WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993l-1.341 4.898 5.01-1.315a9.957 9.957 0 004.987 1.336c5.503 0 9.987-4.477 9.989-9.984 0-5.506-4.484-9.985-9.988-9.985v.003zm5.798 14.195c-.244.693-1.42 1.328-1.97 1.392-.489.057-1.111.139-3.559-.876-2.946-1.222-4.832-4.22-4.978-4.417-.145-.198-1.189-1.583-1.189-3.02 0-1.436.75-2.146 1.017-2.434.266-.289.578-.362.771-.362.193 0 .386 0 .559.008.182.008.427-.067.669.516.248.599.854 2.083.927 2.233.072.148.121.323.024.516-.096.194-.145.313-.289.483-.146.168-.311.36-.444.492-.146.146-.302.308-.135.597.168.289.747 1.233 1.606 2.002 1.111.996 2.04 1.3 2.33 1.448.289.148.459.123.633-.075.174-.197.747-.866.945-1.164.198-.298.396-.248.664-.148.267.098 1.692.798 1.982.943.29.144.484.218.555.337.07.121.07.694-.174 1.387z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ComunidadLog%C3%ADsticaNicarag%C3%BCense" target="_blank" rel="noopener noreferrer" className="hover:text-cln-300 transition-colors" title="YouTube" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.075 0 12 0 12s0 3.925.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.925 24 12 24 12s0-3.925-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EXPO LOGÍSTICA · CLN · 2026. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
