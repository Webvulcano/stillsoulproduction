"use client";

import { track } from "@vercel/analytics";
import { useLanguage } from "../i18n/LanguageProvider";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import ServiceHero from "../components/service/ServiceHero";
import PriceList from "../components/service/PriceList";
import Faq from "../components/service/Faq";
import { h2, h3Label, section, inner, lead, panel, cell, cmsAttr } from "../components/service/ui";
import { ytThumb } from "../eskuvoi-videozas/content";
import { HERO_POSTER_ID } from "./content";

// CMS page key (lib/service-pages-schema.js)
const CMS = "eskuvoi_fotozas";
const a = (sec, field, i, f) => cmsAttr(CMS, sec, field, i, f);

// TODO(hero): esküvői FOTÓ ide (a portfólióban még nincs esküvői fotó). Addig helyőrző:
// a Laura & Csabi trailer nyitóképe.
const HERO_POSTER = ytThumb(HERO_POSTER_ID); // tartalék, ha a CMS-ben nincs kép

// Az árajánlat-űrlap előválasztott kategóriája (egyik nyelv CMS-listájában sincs → a lista elejére kerül).
const QUOTE_CATEGORY = { hu: "Esküvő fotózás", en: "Wedding photography" };

// TODO(galéria): esküvői fotó-galéria, ha Bencéék adnak képeket (a portfólió „Eseményfotózás” sora nem esküvő).

// Az SSR mindig magyar (LanguageProvider kezdő locale = "hu") → a magyar szöveg a HTML-ben van.
// content = { hu, en } — content.js + CMS-értékek (getServiceContent, szerveren)
export default function WeddingPhoto({ content, poster, packages = [], reviews = [] }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const onQuote = () => track("Esküvői fotós oldal: ajánlatkérés");
  const p = c.packages;

  return (
    <main className="bg-black text-white">
      {/* 1. Hero */}
      <ServiceHero h={c.hero} poster={poster ?? HERO_POSTER} onQuote={onQuote} cms={CMS} />

      {/* 2. Bevezető */}
      <section className={section}>
        <div className={`${inner} max-w-3xl`}>
          <h2 className={h2} {...a("intro", "title")}>
            {c.intro.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70" {...a("intro", "paragraphs")}>
            {c.intro.paragraphs.map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Értékelések — ugyanaz a komponens és CMS-adat, mint a főoldalon */}
      <div className="border-t border-white/10">
        <Reviews reviews={reviews} />
      </div>

      {/* 3. Csomagok és árak — content.js + CMS (Ügyfél Admin → Esküvői fotózás) */}
      <section id="csomagok" className={`${section} scroll-mt-24`}>
        <div className={inner}>
          <h2 className={h2} {...a("pricing", "title")}>
            {p.title}
          </h2>
          <p className={lead} {...a("pricing", "lead")}>
            {p.lead}
          </p>

          <div className={`mt-12 ${panel} md:grid-cols-2`}>
            {p.items.map((x, i) => (
              <div key={i} className={`flex flex-col ${cell}`}>
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60" {...a("pricing", "items", i, "name")}>
                  {x.name}
                </h3>
                <p className="mt-4 text-3xl font-semibold text-white" {...a("pricing", "items", i, "price")}>
                  {x.price}
                </p>
                <p className="mt-6 text-sm text-white/80" {...a("pricing", "items", i, "photos")}>
                  {x.photos}
                </p>
              </div>
            ))}
          </div>

          {/* Kreatív fotózás — felárak */}
          <div className="mt-16">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className={h3Label} {...a("creative", "title")}>
                {p.creative.title}
              </h3>
              <p className="text-sm text-white/50" {...a("creative", "lead")}>
                {p.creative.lead}
              </p>
            </div>
            <ul className={`mt-6 ${panel} sm:grid-cols-2`}>
              {p.creative.items.map((x, i) => (
                <li key={i} className={cell}>
                  <p className="text-xl font-semibold text-white" {...a("creative", "items", i, "price")}>
                    {x.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70" {...a("creative", "items", i, "text")}>
                    {x.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>


          {/* Videó is? — 25% kombó (forrás: fotós PDF); ugyanaz a blokk, mint a videós oldal „Fotó is kell?”-je */}
          <div className="mt-16">
            <h3 className={h3Label} {...a("video", "title")}>
              {p.video.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70" {...a("video", "text")}>
              {p.video.text}
            </p>
          </div>

          <PriceList packages={packages} t={p.priceList} cms={{ page: CMS, section: "pricing" }} />
        </div>
      </section>

      {/* 4. GYIK — a FAQPage JSON-LD ugyanezt a szöveget használja */}
      <Faq title={c.faq.title} items={c.faq.items} cms={CMS} />

      {/* 5. Árajánlat — a főoldali űrlap, esküvői fotós kategóriával előválasztva (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={QUOTE_CATEGORY} />
      </div>
    </main>
  );
}
