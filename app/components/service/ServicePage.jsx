"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useLanguage } from "../../i18n/LanguageProvider";
import Contact from "../Contact";
import Reviews from "../Reviews";
import ServiceHero from "./ServiceHero";
import Faq from "./Faq";
import ReferenceRows from "./ReferenceRows";
import { h2, h3Label, section, inner, lead, textLink } from "./ui";

// Közös szolgáltatás-aloldal (portré, rendezvény, videoklip, reklámfilm).
// Szöveg: az aloldal content.js-e ({ hu, en }). Referenciák: a portfólióból (CMS), szerveren szűrve.
// Sorrend: hero → bevezető → mit nyújtunk → munkáink (lapozós referencia-sorok) → értékelések → GYIK → árajánlat.
//
// props:
//   content       { hu, en } — hero, intro, offer, work, faq
//   rows          referencia-sorok — referenceRows() a servicePageLd.js-ből
//   poster        hero-kép URL
//   portfolioHref link a teljes portfólió megfelelő sorára
//   quoteCategory { hu, en } — az árajánlat-űrlap előválasztott kategóriája
//   trackLabel    Vercel Analytics esemény neve a hero CTA-ra
export default function ServicePage({ content, rows = [], poster, portfolioHref = "/portfolio", quoteCategory, reviews = [], trackLabel }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const onQuote = () => track(trackLabel);

  return (
    <main className="bg-black text-white">
      <ServiceHero h={c.hero} poster={poster} onQuote={onQuote} secondaryHref="#munkaink" />

      {/* Bevezető */}
      <section className={section}>
        <div className={`${inner} max-w-3xl`}>
          <h2 className={h2}>{c.intro.title}</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70">
            {c.intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mit nyújtunk */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2}>{c.offer.title}</h2>
          {c.offer.lead && <p className={lead}>{c.offer.lead}</p>}
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.offer.items.map((o) => (
              <div key={o.title}>
                <h3 className={h3Label}>{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Munkáink — ugyanaz a lapozós sor, mint a portfólión (CMS-ből) */}
      {rows.length > 0 && (
        <section id="munkaink" className={`${section} scroll-mt-24`}>
          <div className={inner}>
            <h2 className={h2}>{c.work.title}</h2>
            {c.work.text && <p className={lead}>{c.work.text}</p>}

            <ReferenceRows rows={rows} />

            <Link href={portfolioHref} className={`mt-10 inline-block ${textLink}`}>
              {c.work.portfolio}
            </Link>
          </div>
        </section>
      )}

      {/* Értékelések — ugyanaz a komponens és CMS-adat, mint a főoldalon */}
      <div className="border-t border-white/10">
        <Reviews reviews={reviews} />
      </div>

      {/* GYIK — a FAQPage JSON-LD ugyanezt a szöveget használja */}
      <Faq title={c.faq.title} items={c.faq.items} />

      {/* Árajánlat — a főoldali űrlap, előválasztott kategóriával (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={quoteCategory} />
      </div>
    </main>
  );
}
