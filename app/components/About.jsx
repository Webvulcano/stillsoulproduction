"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";


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
          key={`${i}-${src}`}
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

// A tartalom a DB-ből jön (site_content.about), kétnyelvűen — a nyelv kliens-oldali.
export default function About({ content }) {
  const { t, locale } = useLanguage();
  const suf = locale === "en" ? "_en" : "_hu";
  const pick = (k, fallback) => content?.[k + suf] ?? fallback;

  const title = pick("title", t.about.title);
  const paragraphs = [
    pick("p1", t.about.p1),
    pick("p2", t.about.p2),
    pick("p3", t.about.p3),
  ].filter((p) => p && p.trim());
  const topPhotos = content?.top_photos ?? [];
  const bottomPhotos = content?.bottom_photos ?? [];
  const alt = `${title} — StillSoul Production`;

  return (
    <section id="rolunk" className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="flex min-h-screen flex-col items-center justify-center gap-14 px-8 py-24">
        {/* Kép-csík a cím fölött */}
        <PhotoStrip photos={topPhotos} alt={alt} fromTop />

        {/* Szöveg — marad a fő elem */}
        <div className="max-w-xl space-y-8">
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white">
            {title}
          </h2>
          <div className="border-l-2 border-white/30 pl-6 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-7 text-gray-300">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Kép-csík a szöveg alatt */}
        <PhotoStrip photos={bottomPhotos} alt={alt} />
      </div>
    </section>
  );
}
