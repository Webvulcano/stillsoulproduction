"use client";

import Image from "next/image";
import { isCmsUpload } from "@/lib/cms-image";
import { inner, buttonPrimary, buttonGhost, cmsAttr } from "./ui";

// Aloldal-hero: videó (ha van) vagy poszterkép, rajta a látható H1 és két gomb.
// Mobilon a kis felirat és az alcím rejtve (túl sűrű volt) — a HTML-ben benne marad (SEO).
// h = { eyebrow, title, titleSub, sub, cta, packagesLink, posterAlt }; cms = CMS page key (data-cms jelölőkhöz)
export default function ServiceHero({ h, poster, video = null, onQuote, secondaryHref = "#csomagok", cms }) {
  const a = (field) => cmsAttr(cms, "hero", field);
  return (
    <section className="relative flex min-h-svh w-full items-end overflow-hidden md:min-h-screen" {...a("poster")}>
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
        <Image src={poster} alt={h.posterAlt} unoptimized={isCmsUpload(poster)} fill priority sizes="100vw" className="object-cover object-center" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="relative w-full px-8 pb-12 pt-32 md:px-16 md:pb-20">
        <div className={inner}>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-white/60 md:block" {...a("eyebrow")}>{h.eyebrow}</span>
          <h1 className="max-w-4xl md:mt-4">
            <span className="block text-3xl font-semibold uppercase tracking-widest sm:text-4xl md:text-5xl" {...a("title")}>
              {h.title}
            </span>
            {/* Második sor: a H1 része (városok → SEO), vizuálisan kicsi. A szóköz kell: enélkül a H1 szövege „videósBudapest”. */}
            {h.titleSub && " "}
            {h.titleSub && (
              <span className="mt-3 block text-sm font-normal tracking-wide text-white/70 md:text-base" {...a("title_sub")}>
                {h.titleSub}
              </span>
            )}
          </h1>
          <p className="mt-4 hidden max-w-2xl text-sm text-white/70 md:block md:text-base" {...a("sub")}>{h.sub}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#arajanlat" onClick={onQuote} className={buttonPrimary} {...a("cta")}>
              {h.cta}
            </a>
            <a href={secondaryHref} className={buttonGhost} {...a("secondary")}>
              {h.packagesLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
