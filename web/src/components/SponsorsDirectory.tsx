"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type SponsorTier = "elite" | "oro" | "plata" | "aliado";

export type SponsorSocial = {
  label: string;
  url: string;
};

export type SponsorContact = {
  manager?: string;
  email?: string;
  phones?: string[];
};

export type SponsorProfile = {
  headline: string;
  description: string;
  services: string[];
  website?: string;
  websiteLabel?: string;
  socials?: SponsorSocial[];
  contact?: SponsorContact;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  logo?: string;
  profile?: SponsorProfile;
};

const FLEX_LAYOUT = "flex flex-wrap justify-center gap-6 lg:gap-8";

const TIERS: {
  key: SponsorTier; label: string; role: string; desc: string;
  color: string; text: string; card: string; logo: string; layout: string; logoPad: string;
}[] = [
  { key: "elite", label: "Sponsors Elite", role: "Patrocinador Elite", desc: "Máxima visibilidad y exclusividad", color: "#B8860B", text: "#FFFBEB", card: "w-full sm:w-[380px] p-8", logo: "text-xl", layout: FLEX_LAYOUT, logoPad: "p-4" },
  { key: "oro", label: "Sponsors Oro", role: "Patrocinador Oro", desc: "Alta presencia corporativa", color: "#1B3A6B", text: "#EFF6FF", card: "w-full sm:w-[260px] p-5", logo: "text-base", layout: "grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-6 lg:gap-8", logoPad: "p-4" },
  { key: "plata", label: "Sponsors Plata", role: "Patrocinador Plata", desc: "Presencia profesional estratégica", color: "#2E6B8F", text: "#F0F9FF", card: "w-full sm:w-[200px] p-4", logo: "text-sm", layout: FLEX_LAYOUT, logoPad: "p-1" },
  { key: "aliado", label: "Aliados CLN", role: "Aliado CLN", desc: "Organizaciones aliadas de la comunidad", color: "#0F8BE7", text: "#F0F9FF", card: "w-full sm:w-[170px] p-3", logo: "text-xs", layout: FLEX_LAYOUT, logoPad: "p-4" },
];

export default function SponsorsDirectory({ sponsors }: { sponsors: Sponsor[] }) {
  const [active, setActive] = useState<Sponsor | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (active && !dlg.open) dlg.showModal();
    if (!active && dlg.open) dlg.close();
  }, [active]);

  const activeTier = active ? TIERS.find((t) => t.key === active.tier) ?? null : null;

  return (
    <div className="space-y-14">
      {TIERS.map((tier) => {
        const groupSponsors = sponsors.filter((s) => s.tier === tier.key);
        return (
          <div key={tier.key}>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider"
                style={{ background: tier.color, color: tier.text }}
              >
                {tier.label}
              </span>
              <span className="text-sm text-gray-500">{tier.desc}</span>
              <span className="text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-full px-3 py-1">
                {groupSponsors.length} {groupSponsors.length === 1 ? "posición" : "posiciones"}
              </span>
            </div>

            <div className={tier.layout}>
              {groupSponsors.map((sponsor) => {
                const inner = (
                  <>
                    {sponsor.logo ? (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 260px"
                        className={`object-contain ${tier.logoPad} group-hover:scale-105 transition-transform`}
                      />
                    ) : (
                      <div
                        className={`${tier.logo} font-bold transition-colors`}
                        style={{ color: "#9CA3AF" }}
                      >
                        Logo {sponsor.name}
                      </div>
                    )}
                    {sponsor.profile && (
                      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cln-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Ver perfil
                      </span>
                    )}
                  </>
                );

                const cardCls = `relative bg-white rounded-xl shadow-md ${tier.card} border-t-4 flex items-center justify-center aspect-[3/2] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group`;
                const cardStyle = { borderTopColor: tier.color, borderColor: tier.color };

                return sponsor.profile ? (
                  <button
                    key={sponsor.id}
                    type="button"
                    onClick={() => setActive(sponsor)}
                    aria-haspopup="dialog"
                    className={cardCls}
                    style={cardStyle}
                  >
                    {inner}
                  </button>
                ) : (
                  <div key={sponsor.id} className={cardCls} style={cardStyle}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        aria-labelledby="sponsor-profile-title"
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border-0 bg-transparent p-0 backdrop:bg-cln-950/70 backdrop:backdrop-blur-sm"
      >
        {active && activeTier && (
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="h-2 w-full" style={{ background: activeTier.color }} />

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar perfil"
              className="absolute right-4 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="flex items-center gap-4 px-6 pt-6 sm:px-8">
              <div className="relative h-16 w-40 shrink-0 rounded-xl border border-gray-200 bg-white p-2">
                {active.logo ? (
                  <Image src={active.logo} alt={active.name} fill sizes="160px" className="object-contain p-2" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                    {active.name}
                  </span>
                )}
              </div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                style={{ background: activeTier.color, color: activeTier.text }}
              >
                {activeTier.role}
              </span>
            </div>

            <div className="px-6 pb-8 pt-6 sm:px-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500">
                Conoce al sponsor
              </p>
              <h3 id="sponsor-profile-title" className="font-heading mb-3 text-2xl font-extrabold text-cln-950 sm:text-3xl">
                {active.name}
              </h3>
              <p className="mb-3 text-lg font-medium leading-snug text-cln-900">
                {active.profile!.headline}
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                {active.profile!.description}
              </p>

              <h4 className="mb-3 font-bold text-cln-950">Áreas de servicio</h4>
              <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {active.profile!.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                  >
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>

              {active.profile!.website && (
                <a
                  href={active.profile!.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {active.profile!.websiteLabel ?? "Visitar sitio web"}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}

              {active.profile!.socials && active.profile!.socials.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 font-bold text-cln-950">Enlaces oficiales</h4>
                  <div className="flex flex-wrap gap-2">
                    {active.profile!.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-cln-900 transition-colors hover:border-orange-300 hover:text-orange-600"
                      >
                        {social.label}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {active.profile!.contact && (
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <h4 className="mb-2 font-bold text-cln-950">Contacto comercial</h4>
                  {active.profile!.contact.manager && (
                    <p className="mb-1 font-medium text-cln-900">{active.profile!.contact.manager}</p>
                  )}
                  {active.profile!.contact.email && (
                    <p className="mb-1">
                      Correo:{" "}
                      <a href={`mailto:${active.profile!.contact.email}`} className="font-semibold text-orange-600 hover:underline">
                        {active.profile!.contact.email}
                      </a>
                    </p>
                  )}
                  {active.profile!.contact.phones && active.profile!.contact.phones.length > 0 && (
                    <p>
                      WhatsApp:{" "}
                      {active.profile!.contact.phones.map((phone, i) => {
                        const digits = `505${phone.replace(/\D/g, "")}`;
                        return (
                          <span key={phone}>
                            {i > 0 && " / "}
                            <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:underline">
                              {phone}
                            </a>
                          </span>
                        );
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
