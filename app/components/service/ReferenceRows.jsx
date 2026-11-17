"use client";

import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageProvider";
import CategoryRow from "../../portfolio/CategoryRow";
import VideoModal from "../../portfolio/VideoModal";
import ImageLightbox from "../../portfolio/ImageLightbox";

// Referenciák az aloldalakon — ugyanaz a lapozós sor + videó-modal + fotó-lightbox, mint a portfólión.
// rows: [{ id, title: { hu, en } | null, items }] — az itemek a portfólióból (getPortfolioItems), lásd referenceRows().
export default function ReferenceRows({ rows = [] }) {
  const { locale } = useLanguage();
  // selected: { item, list, index } — fotónál a list a soron belüli lapozáshoz kell.
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* -mx-8: a CategoryRow saját px-8-a így a szekció tartalmához igazodik */}
      <div className="-mx-8 mt-12">
        {rows.map((r, i) => (
          <CategoryRow
            key={r.id}
            title={r.title ? r.title[locale] ?? r.title.hu : null}
            titleAs="h3"
            items={r.items}
            onSelect={(item, list, index) => setSelected({ item, list, index })}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      {selected &&
        (selected.item.kind === "photo" ? (
          <ImageLightbox items={selected.list} index={selected.index} onClose={() => setSelected(null)} />
        ) : (
          <VideoModal item={selected.item} onClose={() => setSelected(null)} />
        ))}
    </>
  );
}
