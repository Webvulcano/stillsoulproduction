"use client";

import { track } from "@vercel/analytics";
import { useLanguage } from "../i18n/LanguageProvider";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import ServiceHero from "../components/service/ServiceHero";
import PriceList from "../components/service/PriceList";
import Faq from "../components/service/Faq";
import { h2, h3Label, section, inner, lead, panel, cell } from "../components/service/ui";
import { ytThumb } from "../eskuvoi-videozas/content";
import { content } from "./content";

// TODO(hero): esküvői FOTÓ ide (a portfólióban még nincs esküvői fotó). Addig helyőrző:
// a Laura & Csabi trailer nyitóképe.
const HERO_POSTER = ytThumb("GTiKqG0dmJo");

// Az árajánlat-űrlap előválasztott kategóriája (egyik nyelv CMS-listájában sincs → a lista elejére kerül).
const QUOTE_CATEGORY = { hu: "Esküvő fotózás", en: "Wedding photography" };

// TODO(galéria): esküvői fotó-galéria, ha Bencéék adnak képeket (a portfólió „Eseményfotózás” sora nem esküvő).

// Az SSR mindig magyar (LanguageProvider kezdő locale = "hu") → a magyar szöveg a HTML-ben van.
export default function WeddingPhoto({ packages = [], reviews = [] }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const onQuote = () => track("Esküvői fotós oldal: ajánlatkérés");
  const p = c.packages;

  return (
    <main className="bg-black text-white">
      {/* 1. Hero */}
      <ServiceHero h={c.hero} poster={HERO_POSTER} onQuote={onQuote} />

      {/* 2. Bevezető */}
      <section className={section}>
        <div className={`${inner} max-w-3xl`}>
          <h2 className={h2}>{c.intro.title}</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70">
            {c.intro.paragraphs.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Értékelések — ugyanaz a komponens és CMS-adat, mint a főoldalon */}
      <div className="border-t border-white/10">
        <Reviews reviews={reviews} />
      </div>

      {/* 3. Csomagok és árak — forrás: content.js teteje (PDF + CMS) */}
      <section id="csomagok" className={`${section} scroll-mt-24`}>
        <div className={inner}>
          <h2 className={h2}>{p.title}</h2>
          <p className={lead}>{p.lead}</p>

          <div className={`mt-12 ${panel} md:grid-cols-2`}>
            {p.items.map((x) => (
              <div key={x.name} className={`flex flex-col ${cell}`}>
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">{x.name}</h3>
                <p className="mt-4 text-3xl font-semibold text-white">{x.price}</p>
                <p className="mt-6 text-sm text-white/80">{x.photos}</p>
              </div>
            ))}
          </div>

          {/* Kreatív fotózás — felárak */}
          <div className="mt-16">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className={h3Label}>{p.creative.title}</h3>
              <p className="text-sm text-white/50">{p.creative.lead}</p>
            </div>
            <ul className={`mt-6 ${panel} sm:grid-cols-2`}>
              {p.creative.items.map((x) => (
                <li key={x.text} className={cell}>
                  <p className="text-xl font-semibold text-white">{x.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{x.text}</p>
                </li>
              ))}
            </ul>
          </div>


          <PriceList packages={packages} t={p.priceList} />
        </div>
      </section>

      {/* 4. GYIK — a FAQPage JSON-LD ugyanezt a szöveget használja */}
      <Faq title={c.faq.title} items={c.faq.items} />

      {/* 5. Árajánlat — a főoldali űrlap, esküvői fotós kategóriával előválasztva (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={QUOTE_CATEGORY} />
      </div>
    </main>
  );
}
