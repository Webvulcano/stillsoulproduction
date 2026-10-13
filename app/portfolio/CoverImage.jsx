"use client";

import Image from "next/image";
import { useState } from "react";
import { isCmsUpload } from "@/lib/cms-image";

// Kártya-kép az adminban beállított megjelenítéssel (a szülő: relative + overflow-hidden + arány).
// - fit "cover": kitölti a kártyát, a fókuszpont (objectPosition) szerint vág
// - fit "contain": a teljes kép látszik, mögötte ugyanaz elmosva tölti ki a maradék helyet
// Skeleton (pulzáló placeholder) amíg a kép be nem tölt; hoverre enyhe nagyítás.
export default function CoverImage({ src, alt, fit, objectPosition, sizes }) {
  const [loaded, setLoaded] = useState(false);
  const contain = fit === "contain";
  const common = { src, fill: true, sizes, unoptimized: isCmsUpload(src), draggable: false };
  const fade = loaded ? "opacity-100" : "opacity-0";

  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}
      {contain && (
        <Image {...common} alt="" aria-hidden className={`select-none scale-110 object-cover opacity-60 blur-xl`} />
      )}
      <Image
        {...common}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={contain ? undefined : { objectPosition }}
        className={`select-none transition-all duration-500 group-hover:scale-105 ${
          contain ? "object-contain" : "object-cover"
        } ${fade}`}
      />
    </>
  );
}
