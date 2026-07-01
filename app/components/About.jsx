"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

const TOP_PHOTOS = [
  "/about/top-01.jpg",
  "/about/top-02.jpg",
  "/about/top-03.jpg",
  "/about/top-04.jpg",
  "/about/top-05.jpg",
  "/about/top-06.jpg",
];
const BOTTOM_PHOTOS = [
  "/about/01.jpg",
  "/about/02.jpg",
  "/about/03.jpg",
  "/about/04.jpg",
  "/about/05.jpg",
  "/about/06.jpg",
];

// Kép-csík belépő animációval (fade + slide). fromTop: felülről csúszik be.
function PhotoStrip({ photos, alt, fromTop = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = fromTop ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0";

  return (
    <div
      ref={ref}
      className="grid w-full max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
    >
      {photos.map((src, i) => (
        <div
          key={src}
          className={`group relative aspect-[3/2] overflow-hidden rounded-lg bg-white/5 transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : hidden
          }`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <Image
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const alt = `${t.about.title} — StillSoul Production`;

  return (
    <section id="rolunk" className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="flex min-h-screen flex-col items-center justify-center gap-14 px-8 py-24">
        {/* Kép-csík a cím fölött */}
        <PhotoStrip photos={TOP_PHOTOS} alt={alt} fromTop />

        {/* Szöveg — marad a fő elem */}
        <div className="max-w-xl space-y-8">
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white">
            {t.about.title}
          </h2>
          <div className="border-l-2 border-white/30 pl-6 space-y-4">
            <p className="text-sm leading-7 text-gray-300">{t.about.p1}</p>
            <p className="text-sm leading-7 text-gray-300">{t.about.p2}</p>
            <p className="text-sm leading-7 text-gray-300">{t.about.p3}</p>
          </div>
        </div>

        {/* Kép-csík a szöveg alatt */}
        <PhotoStrip photos={BOTTOM_PHOTOS} alt={alt} />
      </div>
    </section>
  );
}
