"use client";

import { FaPlay } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageProvider";
import { thumbUrl, titleOf } from "./data";
import { slugToTitle } from "./categories";
import CoverImage from "./CoverImage";

// Reszponzív kártya-grid (a Services.jsx reszponzív mintáját követi).
export default function PortfolioGrid({ items, onSelect }) {
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <p className="mt-16 text-center text-sm text-white/50" data-cms="portfolio.portfolio.no_results">
        {t.portfolio.noResults}
      </p>
    );
  }

  return (
    <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const title = titleOf(item, t);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className="group text-left"
            aria-label={title}
          >
            {/* Thumbnail + play overlay */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
              <CoverImage
                src={thumbUrl(item)}
                alt={title}
                fit={item.fit}
                objectPosition={item.objectPosition}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                  <FaPlay className="ml-0.5" />
                </span>
              </span>
            </div>

            {/* Cím + kategória-badge-ek */}
            <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
              {title}
            </h3>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {item.categories.map((slug) => (
                <span
                  key={slug}
                  className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/45"
                >
                  {slugToTitle(slug, t)}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
