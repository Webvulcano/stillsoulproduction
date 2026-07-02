"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import CategoryRow from "./CategoryRow";
import VideoModal from "./VideoModal";
import ImageLightbox from "./ImageLightbox";

// Portfólió-galéria: kategóriánként tagolt, oldalra lapozós referencia-sorok.
// A sorok a DB-kategóriák sort_order sorrendjét követik; üres sorok kimaradnak.
export default function PortfolioGallery({ items = [], categories = [] }) {
  const { t, locale } = useLanguage();
  // selected: { item, list, index } — fotónál a list a soron belüli lapozáshoz kell.
  const [selected, setSelected] = useState(null);

  const sections = categories
    .map((c) => ({
      slug: c.slug,
      title: locale === "en" ? c.title_en : c.title_hu,
      items: items.filter((it) => it.categories.includes(c.slug)),
    }))
    .filter((s) => s.items.length > 0);

  const handleSelect = (item, list, index) => setSelected({ item, list, index });

  // Szolgáltatás-csempéről érkezve: görgetés a sorra (#row-<slug>).
  // Kis késleltetés a layout/kép-betöltés miatt; a scroll-mt-28 adja a navbar-offsetet.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const timer = setTimeout(scroll, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black pt-28 pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="mb-10 px-8 text-3xl font-semibold uppercase tracking-widest text-white sm:mb-14 sm:text-4xl">
          {t.portfolio.galleryTitle}
        </h1>

        {sections.map((s, i) => (
          <CategoryRow
            key={s.slug}
            id={`row-${s.slug}`}
            title={s.title}
            items={s.items}
            onSelect={handleSelect}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      {selected &&
        (selected.item.kind === "photo" ? (
          <ImageLightbox
            items={selected.list}
            index={selected.index}
            onClose={() => setSelected(null)}
          />
        ) : (
          <VideoModal item={selected.item} onClose={() => setSelected(null)} />
        ))}
    </main>
  );
}
