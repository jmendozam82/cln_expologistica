"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

export default function TriviaQrCode({
  url,
  size = 240,
  className = "",
}: {
  url: string;
  size?: number;
  className?: string;
}) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    if (!url) return;
    QRCode.toDataURL(url, {
      width: size * 2,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#00223d",
        light: "#ffffff",
      },
    })
      .then((res) => {
        if (active) setDataUrl(res);
      })
      .catch((err) => {
        console.error("QR generation failed:", err);
      });
    return () => {
      active = false;
    };
  }, [url, size]);

  if (!dataUrl) {
    return (
      <div
        className={`bg-white rounded-2xl flex items-center justify-center text-xs text-gray-400 ${className}`}
        style={{ width: size, height: size }}
      >
        Generando QR...
      </div>
    );
  }

  return (
    <Image
      src={dataUrl}
      alt={`Código QR para unirse: ${url}`}
      width={size}
      height={size}
      unoptimized
      className={`rounded-2xl bg-white p-2 shadow-lg block ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
