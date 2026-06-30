"use client";

import { FiSearch, FiX } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageProvider";
import { CATEGORIES, slugToTitle } from "./categories";
import { PORTFOLIO } from "./data";

// Csak azok a kategóriák jelennek meg, amikhez van legalább 1 referencia.
const USED_SLUGS = new Set(PORTFOLIO.flatMap((item) => item.categories));
const VISIBLE_CATEGORIES = CATEGORIES.filter((c) => USED_SLUGS.has(c.slug));

// Chipek viszik a főszerepet, a kereső visszafogott. A törlés magán a chipen (×).
export default function PortfolioFilters({
  query,
  setQuery,
  activeCats,
  toggleCat,
  clearCats,
}) {
  const { t } = useLanguage();
  const hasFilter = activeCats.size > 0 || query.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Chipek — mobil 1 oszlop, tablet 2, asztal max 3 */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {VISIBLE_CATEGORIES.map(({ slug }) => {
          const active = activeCats.has(slug);
          return (
            <button
              key={slug}
              type="button"
              onClick={() => toggleCat(slug)}
              aria-pressed={active}
              className={`relative inline-flex w-full items-center justify-center rounded-full border px-7 py-2 text-center text-xs uppercase leading-tight tracking-wider transition-colors duration-200 ${
                active
                  ? "border-white bg-white text-black"
                  : "border-white/25 text-white/65 hover:border-white/60 hover:text-white"
              }`}
            >
              {/* px-7 fix hely az ×-nek → a felirat nem ugrik aktiváláskor */}
              <span>{slugToTitle(slug, t)}</span>
              {active && (
                <FiX
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-70"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Kereső — kompakt; mellette (mobilon alatta) a szűrő-törlés ha van aktív szűrő */}
      <div className="mx-auto flex max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/35" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.portfolio.searchPlaceholder}
            className="w-full rounded-full border border-white/15 bg-transparent py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40"
            aria-label={t.portfolio.searchPlaceholder}
          />
        </div>
        {hasFilter && (
          <button
            type="button"
            onClick={clearCats}
            className="inline-flex shrink-0 items-center gap-1 self-end whitespace-nowrap text-xs uppercase tracking-wider text-white/45 transition-colors hover:text-white sm:self-auto"
          >
            <FiX />
            {t.portfolio.clear}
          </button>
        )}
      </div>
    </div>
  );
}
