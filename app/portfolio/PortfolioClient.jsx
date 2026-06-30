"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../i18n/LanguageProvider";
import { PORTFOLIO, titleOf } from "./data";
import { sanitizeSlugs } from "./categories";
import PortfolioFilters from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";
import VideoModal from "./VideoModal";

// Csak azok a kategóriák tartalmaznak referenciát — üres kategóriára nem szűrünk.
const USED_SLUGS = new Set(PORTFOLIO.flatMap((item) => item.categories));

// A portfólió oldal kliens-logikája: szűrő-állapot + URL-szinkron.
// Kívülről hívható: /portfolio?cat=esemenyek (akár több: ?cat=esemenyek,film).
export default function PortfolioClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState(() => new Set());
  const [selected, setSelected] = useState(null);

  // belépéskor a lap tetejére (mobilon a hosszú főoldalról jövet ne lent nyíljon)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // URL ?cat= → aktív kategóriák (kezdeti betöltés + külső/vissza-navigáció)
  const catParam = searchParams.get("cat") || "";
  useEffect(() => {
    const slugs = sanitizeSlugs(
      catParam.split(",").map((s) => s.trim()).filter(Boolean)
    // üres (tartalom nélküli) kategóriát eldobunk → "összes" nézet
    ).filter((s) => USED_SLUGS.has(s));
    setActiveCats(new Set(slugs));
  }, [catParam]);

  // aktív kategóriák → URL (megosztható link, böngésző-vissza)
  const syncUrl = (next) => {
    const arr = [...next];
    const qs = arr.length ? `?cat=${arr.join(",")}` : "";
    router.replace(`/portfolio${qs}`, { scroll: false });
  };

  const toggleCat = (slug) => {
    const next = new Set(activeCats);
    next.has(slug) ? next.delete(slug) : next.add(slug);
    setActiveCats(next);
    syncUrl(next);
  };

  const clearAll = () => {
    setQuery("");
    setActiveCats(new Set());
    syncUrl(new Set());
  };

  // szűrés: (nincs kategória VAGY metszi) ÉS (üres kereső VAGY a cím tartalmazza)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTFOLIO.filter((item) => {
      const catOk =
        activeCats.size === 0 ||
        item.categories.some((c) => activeCats.has(c));
      const textOk = !q || titleOf(item, t).toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [query, activeCats, t]);

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-28 text-white md:px-12">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.portfolio.label}
        </span>
      </div>

      <PortfolioFilters
        query={query}
        setQuery={setQuery}
        activeCats={activeCats}
        toggleCat={toggleCat}
        clearCats={clearAll}
      />

      {/* Találatszám — diszkréten a grid fölött jobbra */}
      <div className="mx-auto mt-12 max-w-6xl text-right text-xs text-white/40">
        {t.portfolio.resultsCount.replace("{n}", filtered.length)}
      </div>

      <PortfolioGrid items={filtered} onSelect={setSelected} />

      {selected && (
        <VideoModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
