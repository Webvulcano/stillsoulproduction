"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useLanguage } from "../../i18n/LanguageProvider";
import Contact from "../Contact";
import Reviews from "../Reviews";
import ServiceHero from "./ServiceHero";
import Faq from "./Faq";
import ReferenceRows from "./ReferenceRows";
import { h2, h3Label, section, inner, lead, textLink, cmsAttr } from "./ui";

// Közös szolgáltatás-aloldal (portré, rendezvény, videoklip, reklámfilm).
// Szöveg: az aloldal content.js-e ({ hu, en }) a CMS-értékekkel (getServiceContent, szerveren). Referenciák: a portfólióból (CMS), szerveren szűrve.
// Sorrend: hero → bevezető → mit nyújtunk → munkáink (lapozós referencia-sorok) → értékelések → GYIK → árajánlat.
//
// props:
//   content       { hu, en } — hero, intro, offer, work, faq (getServiceContent)
//   cms           CMS page key (lib/service-pages-schema.js) — data-cms jelölők az admin előnézetéhez
//   rows          referencia-sorok — referenceRows() a servicePageLd.js-ből
//   poster        hero-kép URL
//   portfolioHref link a teljes portfólió megfelelő sorára
//   quoteCategory { hu, en } — az árajánlat-űrlap előválasztott kategóriája
//   trackLabel    Vercel Analytics esemény neve a hero CTA-ra
export default function ServicePage({ content, cms, rows = [], poster, portfolioHref = "/portfolio", quoteCategory, reviews = [], trackLabel }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const a = (sec, field, i, f) => cmsAttr(cms, sec, field, i, f);
  const onQuote = () => track(trackLabel);

  return (
    <main className="bg-black text-white">
      <ServiceHero h={c.hero} poster={poster} onQuote={onQuote} secondaryHref="#munkaink" cms={cms} />

      {/* Bevezető */}
      <section className={section}>
        <div className={`${inner} max-w-3xl`}>
          <h2 className={h2} {...a("intro", "title")}>
            {c.intro.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70" {...a("intro", "paragraphs")}>
            {c.intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mit nyújtunk */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2} {...a("offer", "title")}>
            {c.offer.title}
          </h2>
          {c.offer.lead && <p className={lead}>{c.offer.lead}</p>}
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.offer.items.map((o, i) => (
              <div key={i}>
                <h3 className={h3Label} {...a("offer", "items", i, "title")}>
                  {o.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70" {...a("offer", "items", i, "text")}>
                  {o.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Munkáink — ugyanaz a lapozós sor, mint a portfólión (CMS-ből) */}
      {rows.length > 0 && (
        <section id="munkaink" className={`${section} scroll-mt-24`}>
          <div className={inner}>
            <h2 className={h2} {...a("work", "title")}>
              {c.work.title}
            </h2>
            {c.work.text && (
              <p className={lead} {...a("work", "text")}>
                {c.work.text}
              </p>
            )}

            <ReferenceRows rows={rows} />

            <Link href={portfolioHref} className={`mt-10 inline-block ${textLink}`} {...a("work", "portfolio")}>
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
      <Faq title={c.faq.title} items={c.faq.items} cms={cms} />

      {/* Árajánlat — a főoldali űrlap, előválasztott kategóriával (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={quoteCategory} />
      </div>
    </main>
  );
}
