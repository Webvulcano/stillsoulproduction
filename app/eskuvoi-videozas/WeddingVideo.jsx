"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useLanguage } from "../i18n/LanguageProvider";
import LazyYouTube from "../components/LazyYouTube";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import ServiceHero from "../components/service/ServiceHero";
import PriceList from "../components/service/PriceList";
import Faq from "../components/service/Faq";
import { h2, h3Label, section, inner, lead, panel, cell, textLink } from "../components/service/ui";
import { content, VIDEOS, ytThumb } from "./content";

// TODO(hero): esküvői klip ide (pl. "/hero/eskuvo.mp4", tömörítve, ~2–3 MB) + saját poster
// ("/hero/eskuvo-poster.webp"). Amíg null, a hero csak a poszterkép (Laura & Csabi film nyitóképe).
const HERO_VIDEO = null;
const HERO_POSTER = ytThumb(VIDEOS.laura.id);

// Az árajánlat-űrlap előválasztott kategóriája. A HU a CMS-listában lévő érték;
// az EN CMS-listában nincs esküvős kategória, ezért ott a lista elejére kerül.
const QUOTE_CATEGORY = { hu: "Esküvő videózás", en: "Wedding videography" };

// Az SSR mindig magyar (LanguageProvider kezdő locale = "hu") → a magyar szöveg a HTML-ben van.
export default function WeddingVideo({ packages = [], reviews = [] }) {
  const { locale } = useLanguage();
  const c = content[locale] ?? content.hu;
  const onQuote = () => track("Esküvői oldal: ajánlatkérés");

  return (
    <main className="bg-black text-white">
      {/* 1. Hero */}
      <ServiceHero h={c.hero} poster={HERO_POSTER} video={HERO_VIDEO} onQuote={onQuote} />

      {/* 2. Bevezető */}
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

      {/* 3. Stílusok */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2}>{c.styles.title}</h2>
          <p className={lead}>{c.styles.lead}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {c.styles.items.map((s) => (
              <div key={s.name}>
                <h3 className="border-l-2 border-white pl-4 text-xl font-semibold uppercase tracking-wider">{s.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mit nyújtunk */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2}>{c.offer.title}</h2>
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

      {/* 5. Referenciák — a videók listája: content.js VIDEOS */}
      <section className={section}>
        <div className={inner}>
          <h2 className={h2}>{c.reference.title}</h2>
          <p className={lead}>{c.reference.text}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {Object.entries(VIDEOS).map(([key, v]) => (
              <figure key={key}>
                <LazyYouTube
                  id={v.id}
                  title={c.reference.videos[key]}
                  playLabel={c.reference.play}
                  thumb={ytThumb(v.id)}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <figcaption className="mt-3 text-xs uppercase tracking-widest text-white/50">{c.reference.videos[key]}</figcaption>
              </figure>
            ))}
          </div>
          <Link href="/portfolio#row-esemenyek" className={`mt-10 inline-block ${textLink}`}>
            {c.reference.portfolio}
          </Link>
        </div>
      </section>

      {/* Értékelések — ugyanaz a komponens és CMS-adat, mint a főoldalon */}
      <div className="border-t border-white/10">
        <Reviews reviews={reviews} />
      </div>

      {/* 6. Csomagok és árak — forrás: content.js teteje (PDF + CMS) */}
      <section id="csomagok" className={`${section} scroll-mt-24`}>
        <div className={inner}>
          <h2 className={h2}>{c.packages.title}</h2>
          <p className={lead}>{c.packages.lead}</p>

          <div className={`mt-12 ${panel} md:grid-cols-3`}>
            {c.packages.items.map((p) => (
              <div key={p.name} className={`flex flex-col ${cell}`}>
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">{p.name}</h3>
                <p className="mt-4 text-3xl font-semibold text-white">{p.price}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  <li>{p.length}</li>
                  <li>+ {c.packages.giftLabel}</li>
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-white/50">{p.text}</p>
              </div>
            ))}
          </div>

          {/* Plusz kérések — felárasak + ingyenes extrák egy rácsban */}
          <div className="mt-16">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className={h3Label}>{c.packages.extras.title}</h3>
              <p className="text-sm text-white/50">{c.packages.extras.lead}</p>
            </div>
            <ul className={`mt-6 ${panel} sm:grid-cols-2 lg:grid-cols-4`}>
              {c.packages.extras.items.map((x) => (
                <li key={x.text} className={cell}>
                  <p className="text-xl font-semibold text-white">{x.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{x.text}</p>
                </li>
              ))}
              {/* Ingyenes extrák: egy cellában, listaként */}
              <li className={cell}>
                <p className="text-xl font-semibold text-white">{c.packages.free.price}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                  {c.packages.free.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/50">{c.packages.extras.note}</p>
          </div>

          {/* Utazás — külön alcím */}
          <div className="mt-16">
            <h3 className={h3Label}>{c.packages.travel.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{c.packages.travel.text}</p>
          </div>

          {/* Fotó is? — átlinkelés az esküvői fotós aloldalra (25% kombó, forrás: fotós PDF) */}
          <div className="mt-16">
            <h3 className={h3Label}>{c.packages.photo.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{c.packages.photo.text}</p>
            <Link href="/eskuvoi-fotozas" className={`mt-4 inline-block ${textLink}`}>
              {c.packages.photo.link}
            </Link>
          </div>

          <PriceList packages={packages} t={c.packages.priceList} />
        </div>
      </section>

      {/* 7. GYIK — a FAQPage JSON-LD ugyanezt a szöveget használja */}
      <Faq title={c.faq.title} items={c.faq.items} />

      {/* 8. Árajánlat — a főoldali űrlap, esküvői kategóriával előválasztva (id="arajanlat") */}
      <div className="border-t border-white/10">
        <Contact defaultCategory={QUOTE_CATEGORY} />
      </div>
    </main>
  );
}
