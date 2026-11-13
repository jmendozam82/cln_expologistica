export type CountryCode = "US" | "NI" | "CA" | "MX" | "CO" | "GT";

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  US: "Estados Unidos",
  NI: "Nicaragua",
  CA: "Canadá",
  MX: "México",
  CO: "Colombia",
  GT: "Guatemala",
};

interface CountryFlagProps {
  code: CountryCode;
  variant?: "circle" | "rect";
  className?: string;
}

function FlagSvg({ code, variant }: { code: CountryCode; variant: "circle" | "rect" }) {
  const viewBox = variant === "circle" ? "0 0 24 24" : "0 0 28 20";

  if (variant === "circle") {
    switch (code) {
      case "US":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="24" height="24" fill="#FFFFFF" />
            <rect y="0" width="24" height="2.4" fill="#B22234" />
            <rect y="4.8" width="24" height="2.4" fill="#B22234" />
            <rect y="9.6" width="24" height="2.4" fill="#B22234" />
            <rect y="14.4" width="24" height="2.4" fill="#B22234" />
            <rect y="19.2" width="24" height="2.4" fill="#B22234" />
            <rect width="12" height="12" fill="#3C3B6E" />
            <circle cx="3.5" cy="3.5" r="0.8" fill="#FFFFFF" />
            <circle cx="7" cy="3.5" r="0.8" fill="#FFFFFF" />
            <circle cx="10" cy="3.5" r="0.8" fill="#FFFFFF" />
            <circle cx="5.2" cy="6" r="0.8" fill="#FFFFFF" />
            <circle cx="8.5" cy="6" r="0.8" fill="#FFFFFF" />
            <circle cx="3.5" cy="8.5" r="0.8" fill="#FFFFFF" />
            <circle cx="7" cy="8.5" r="0.8" fill="#FFFFFF" />
            <circle cx="10" cy="8.5" r="0.8" fill="#FFFFFF" />
          </svg>
        );
      case "NI":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="24" height="8" y="0" fill="#0067C6" />
            <rect width="24" height="8" y="8" fill="#FFFFFF" />
            <rect width="24" height="8" y="16" fill="#0067C6" />
            <polygon points="12,9.2 14.3,13.6 9.7,13.6" fill="#4FA8E8" stroke="#C59B27" strokeWidth="0.6" />
            <circle cx="12" cy="12" r="0.8" fill="#2E8B57" />
          </svg>
        );
      case "CA":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="6" height="24" x="0" fill="#D80621" />
            <rect width="12" height="24" x="6" fill="#FFFFFF" />
            <rect width="6" height="24" x="18" fill="#D80621" />
            <path
              d="M12 6.2l1.1 2.4 2.1-.6-.8 2.2 1.8 1-.9.9.4 1.6-2.8-.4v2.7h-1.8v-2.7l-2.8.4.4-1.6-.9-.9 1.8-1-.8-2.2 2.1.6z"
              fill="#D80621"
            />
          </svg>
        );
      case "MX":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="8" height="24" x="0" fill="#006847" />
            <rect width="8" height="24" x="8" fill="#FFFFFF" />
            <rect width="8" height="24" x="16" fill="#CE1126" />
            <circle cx="12" cy="12" r="2.2" fill="#8B5E3C" />
            <path d="M10.2 13.5c1 .9 2.6.9 3.6 0" stroke="#006847" strokeWidth="0.9" fill="none" />
          </svg>
        );
      case "CO":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="24" height="12" y="0" fill="#FCD116" />
            <rect width="24" height="6" y="12" fill="#003893" />
            <rect width="24" height="6" y="18" fill="#CE1126" />
          </svg>
        );
      case "GT":
        return (
          <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
            <rect width="8" height="24" x="0" fill="#4997D0" />
            <rect width="8" height="24" x="8" fill="#FFFFFF" />
            <rect width="8" height="24" x="16" fill="#4997D0" />
            <circle cx="12" cy="12" r="2.1" fill="#6E8B3D" />
            <circle cx="12" cy="12" r="1.1" fill="#C5A059" />
          </svg>
        );
    }
  }

  // Rectangular 28x20
  switch (code) {
    case "US":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="28" height="20" fill="#FFFFFF" />
          <rect y="0" width="28" height="2.2" fill="#B22234" />
          <rect y="4.4" width="28" height="2.2" fill="#B22234" />
          <rect y="8.8" width="28" height="2.2" fill="#B22234" />
          <rect y="13.2" width="28" height="2.2" fill="#B22234" />
          <rect y="17.6" width="28" height="2.4" fill="#B22234" />
          <rect width="13" height="11" fill="#3C3B6E" />
          <circle cx="3.2" cy="3" r="0.75" fill="#FFFFFF" />
          <circle cx="6.5" cy="3" r="0.75" fill="#FFFFFF" />
          <circle cx="9.8" cy="3" r="0.75" fill="#FFFFFF" />
          <circle cx="4.8" cy="5.5" r="0.75" fill="#FFFFFF" />
          <circle cx="8.2" cy="5.5" r="0.75" fill="#FFFFFF" />
          <circle cx="3.2" cy="8" r="0.75" fill="#FFFFFF" />
          <circle cx="6.5" cy="8" r="0.75" fill="#FFFFFF" />
          <circle cx="9.8" cy="8" r="0.75" fill="#FFFFFF" />
        </svg>
      );
    case "NI":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="28" height="6.7" y="0" fill="#0067C6" />
          <rect width="28" height="6.6" y="6.7" fill="#FFFFFF" />
          <rect width="28" height="6.7" y="13.3" fill="#0067C6" />
          <polygon points="14,7.6 16.2,11.6 11.8,11.6" fill="#4FA8E8" stroke="#C59B27" strokeWidth="0.6" />
          <circle cx="14" cy="10.2" r="0.7" fill="#2E8B57" />
        </svg>
      );
    case "CA":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="7" height="20" x="0" fill="#D80621" />
          <rect width="14" height="20" x="7" fill="#FFFFFF" />
          <rect width="7" height="20" x="21" fill="#D80621" />
          <path
            d="M14 4.8l1 2.1 1.9-.5-.7 2 1.6.9-.8.8.4 1.4-2.5-.3v2.4h-1.8v-2.4l-2.5.3.4-1.4-.8-.8 1.6-.9-.7-2 1.9.5z"
            fill="#D80621"
          />
        </svg>
      );
    case "MX":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="9.3" height="20" x="0" fill="#006847" />
          <rect width="9.4" height="20" x="9.3" fill="#FFFFFF" />
          <rect width="9.3" height="20" x="18.7" fill="#CE1126" />
          <circle cx="14" cy="10" r="2" fill="#8B5E3C" />
          <path d="M12.3 11.4c1 .8 2.4.8 3.4 0" stroke="#006847" strokeWidth="0.8" fill="none" />
        </svg>
      );
    case "CO":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="28" height="10" y="0" fill="#FCD116" />
          <rect width="28" height="5" y="10" fill="#003893" />
          <rect width="28" height="5" y="15" fill="#CE1126" />
        </svg>
      );
    case "GT":
      return (
        <svg viewBox={viewBox} className="w-full h-full block" aria-hidden>
          <rect width="9.3" height="20" x="0" fill="#4997D0" />
          <rect width="9.4" height="20" x="9.3" fill="#FFFFFF" />
          <rect width="9.3" height="20" x="18.7" fill="#4997D0" />
          <circle cx="14" cy="10" r="1.9" fill="#6E8B3D" />
          <circle cx="14" cy="10" r="1" fill="#C5A059" />
        </svg>
      );
  }
}

export default function CountryFlag({ code, variant = "circle", className = "" }: CountryFlagProps) {
  const label = COUNTRY_LABELS[code];
  const shapeCls = variant === "circle" ? "rounded-full" : "rounded-[3px]";

  return (
    <span
      title={label}
      aria-label={label}
      className={`inline-block overflow-hidden flex-shrink-0 ${shapeCls} ${className}`}
    >
      <FlagSvg code={code} variant={variant} />
    </span>
  );
}

