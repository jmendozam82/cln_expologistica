"use client";

import { useState } from "react";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Video a ancho completo: cubre todo el contenedor Hero */}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        src="/videoheroinicio.mp4"
        poster="/hero_logistics.png"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
      />
    </div>
  );
}