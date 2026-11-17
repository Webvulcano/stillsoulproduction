"use client";

import Image from "next/image";
import { inner, buttonPrimary, buttonGhost } from "./ui";

// Aloldal-hero: videó (ha van) vagy poszterkép, rajta a látható H1 és két gomb.
// h = { eyebrow, title, sub, cta, packagesLink, posterAlt }
export default function ServiceHero({ h, poster, video = null, onQuote }) {
  return (
    <section className="relative flex min-h-[70vh] w-full items-end overflow-hidden md:min-h-screen">
      {video ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <Image src={poster} alt={h.posterAlt} fill priority sizes="100vw" className="object-cover object-center" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="relative w-full px-8 pb-12 pt-32 md:px-16 md:pb-20">
        <div className={inner}>
          <span className="block text-xs uppercase tracking-[0.3em] text-white/60">{h.eyebrow}</span>
          <h1 className="mt-4 max-w-4xl text-2xl font-semibold uppercase tracking-widest sm:text-4xl md:text-5xl">{h.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{h.sub}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#arajanlat" onClick={onQuote} className={buttonPrimary}>
              {h.cta}
            </a>
            <a href="#csomagok" className={buttonGhost}>
              {h.packagesLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
