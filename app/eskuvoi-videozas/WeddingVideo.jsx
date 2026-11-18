"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useLanguage } from "../i18n/LanguageProvider";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import ServiceHero from "../components/service/ServiceHero";
import PriceList from "../components/service/PriceList";
import Faq from "../components/service/Faq";
import ReferenceRows from "../components/service/ReferenceRows";
import { h2, h3Label, section, inner, lead, panel, cell, textLink, cmsAttr } from "../components/service/ui";
import { VIDEOS, ytThumb } from "./content";

// CMS page key (lib/service-pages-schema.js)
const CMS = "eskuvoi_videozas";
const a = (sec, field, i, f) => cmsAttr(CMS, sec, field, i, f);

// TODO(hero): esküvői klip ide (pl. "/hero/eskuvo.mp4", tömörítve, ~2–3 MB) + saját poster
// ("/hero/eskuvo-poster.webp"). Amíg null, a hero csak a poszterkép (Laura & Csabi film nyitóképe).
const HERO_VIDEO = null;
const HERO_POSTER = ytThumb(VIDEOS.laura.id);

// Az árajánlat-űrlap előválasztott kategóriája. A HU a CMS-listában lévő érték;
// az EN CMS-listában nincs esküvős kategória, ezért ott a lista elejére kerül.
const QUOTE_CATEGORY = { hu: "Esküvő videózás", en: "Wedding videography" };

// Az SSR mindig magyar (LanguageProvider kezdő locale = "hu") → a magyar szöveg a HTML-ben van.
// content = { hu, en } — content.js + CMS-értékek (getServiceContent, szerveren)
export default function WeddingVideo({ content, packages = [], reviews = [], rows = [] }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const onQuote = () => track("Esküvői oldal: ajánlatkérés");

  return (
    <main className="bg-black text-white">
      {/* 1. Hero */}
      <ServiceHero h={c.hero} poster={HERO_POSTER} video={HERO_VIDEO} onQuote={onQuote} cms={CMS} />

      {/* 2. Bevezető */}
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

      {/* 3. Stílusok */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2} {...a("styles", "title")}>
            {c.styles.title}
          </h2>
          <p className={lead} {...a("styles", "lead")}>
            {c.styles.lead}
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {c.styles.items.map((s, i) => (
              <div key={i}>
                <h3 className="border-l-2 border-white pl-4 text-xl font-semibold uppercase tracking-wider" {...a("styles", "items", i, "name")}>
                  {s.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70" {...a("styles", "items", i, "text")}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mit nyújtunk */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2} {...a("offer", "title")}>
            {c.offer.title}
          </h2>
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

      {/* 5. Referenciák — ugyanaz a lapozós sor, mint a portfólión; a videók: content.js VIDEOS */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2} {...a("reference", "title")}>
            {c.reference.title}
          </h2>
          <p className={lead} {...a("reference", "text")}>
            {c.reference.text}
          </p>
          <ReferenceRows rows={rows} />
          <Link href="/portfolio#row-esemenyek" className={`mt-10 inline-block ${textLink}`} {...a("reference", "portfolio")}>
            {c.reference.portfolio}
          </Link>
        </div>
      </section>

      {/* Értékelések — ugyanaz a komponens és CMS-adat, mint a főoldalon */}
      <div className="border-t border-white/10">
        <Reviews reviews={reviews} />
      </div>

      {/* 6. Csomagok és árak — content.js + CMS (Ügyfél Admin → Esküvői videózás) */}
      <section id="csomagok" className={`${section} scroll-mt-24`}>
        <div className={inner}>
          <h2 className={h2} {...a("pricing", "title")}>
            {c.packages.title}
          </h2>
          <p className={lead} {...a("pricing", "lead")}>
            {c.packages.lead}
          </p>

          <div className={`mt-12 ${panel} md:grid-cols-3`}>
            {c.packages.items.map((p, i) => (
              <div key={i} className={`flex flex-col ${cell}`}>
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60" {...a("pricing", "items", i, "name")}>
                  {p.name}
                </h3>
                <p className="mt-4 text-3xl font-semibold text-white" {...a("pricing", "items", i, "price")}>
                  {p.price}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  <li {...a("pricing", "items", i, "length")}>{p.length}</li>
                  <li>+ {c.packages.giftLabel}</li>
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-white/50" {...a("pricing", "items", i, "text")}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Plusz kérések — felárasak + ingyenes extrák egy rácsban */}
          <div className="mt-16">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className={h3Label} {...a("extras", "title")}>
                {c.packages.extras.title}
              </h3>
              <p className="text-sm text-white/50" {...a("extras", "lead")}>
                {c.packages.extras.lead}
              </p>
            </div>
            <ul className={`mt-6 ${panel} sm:grid-cols-2 lg:grid-cols-4`}>
              {c.packages.extras.items.map((x, i) => (
                <li key={i} className={cell}>
                  <p className="text-xl font-semibold text-white" {...a("extras", "items", i, "price")}>
                    {x.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70" {...a("extras", "items", i, "text")}>
                    {x.text}
                  </p>
                </li>
              ))}
              {/* Ingyenes extrák: egy cellában, listaként */}
              <li className={cell}>
                <p className="text-xl font-semibold text-white" {...a("extras", "free_price")}>
                  {c.packages.free.price}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70" {...a("extras", "free_items")}>
                  {c.packages.free.items.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/50" {...a("extras", "note")}>
              {c.packages.extras.note}
            </p>
          </div>

          {/* Utazás — külön alcím */}
          <div className="mt-16">
            <h3 className={h3Label} {...a("info", "travel_title")}>
              {c.packages.travel.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70" {...a("info", "travel_text")}>
              {c.packages.travel.text}
            </p>
          </div>

          {/* Fotó is? — átlinkelés az esküvői fotós aloldalra (25% kombó, forrás: fotós PDF) */}
          <div className="mt-16">
            <h3 className={h3Label} {...a("info", "photo_title")}>
              {c.packages.photo.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70" {...a("info", "photo_text")}>
              {c.packages.photo.text}
            </p>
            <Link href="/eskuvoi-fotozas" className={`mt-4 inline-block ${textLink}`} {...a("info", "photo_link")}>
              {c.packages.photo.link}
            </Link>
          </div>

          <PriceList packages={packages} t={c.packages.priceList} cms={{ page: CMS, section: "info" }} />
        </div>
      </section>

      {/* 7. GYIK — a FAQPage JSON-LD ugyanezt a szöveget használja */}
      <Faq title={c.faq.title} items={c.faq.items} cms={CMS} />

      {/* 8. Árajánlat — a főoldali űrlap, esküvői kategóriával előválasztva (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={QUOTE_CATEGORY} />
      </div>
    </main>
  );
}
