// A 6 szolgáltatás-kategória kanonikus listája.
// slug = stabil URL-kulcs (?cat=...), idx = a dict.services.items[] indexe.
// A megjelenített címeket NEM duplikáljuk: a kétnyelvű cím a dict-ből jön (idx szerint).
export const CATEGORIES = [
  { slug: "foto", idx: 0 }, // Digitális és analóg fotózás
  { slug: "brand", idx: 1 }, // Brand építés & reklámanyagok
  { slug: "kreativ", idx: 2 }, // Kreatív tartalomgyártás, social, short video
  { slug: "esemenyek", idx: 3 }, // Események és rendezvények
  { slug: "filmes", idx: 4 }, // Eseti megkeresések, besegítés filmes munkákban
  { slug: "film", idx: 5 }, // Dokumentum- és játékfilm
];

export const SLUGS = CATEGORIES.map((c) => c.slug);

const IDX_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.idx]));

// slug → kétnyelvű cím a dict.services.items[]-ből (t = aktuális nyelv szótára)
export function slugToTitle(slug, t) {
  const idx = IDX_BY_SLUG[slug];
  return t.services.items[idx]?.title ?? slug;
}

// csak a valós slug-okat tartja meg (URL-paramok szűréséhez)
export function sanitizeSlugs(slugs) {
  return slugs.filter((s) => SLUGS.includes(s));
}

// — Fotó-kategóriák (a galéria-oldalhoz) —
// Ezeknek a címe NEM a services-ből jön, hanem a dict.portfolio.rowTitles-ból.
export const PHOTO_SLUGS = ["portre", "esemenyfoto", "kisallat", "analog"];

// A galéria sorainak megjelenési sorrendje: előbb a 4 fotó-sor, utána a videó-sorok.
export const ROW_ORDER = [
  "portre",
  "esemenyfoto",
  "kisallat",
  "analog",
  "kreativ",
  "esemenyek",
  "film",
];

// Sor-cím feloldása: fotó-slug → dict.portfolio.rowTitles; egyébként a services-cím.
export function rowTitle(slug, t) {
  return t.portfolio?.rowTitles?.[slug] ?? slugToTitle(slug, t);
}

// Szolgáltatás-csempe (service-slug) → galéria-sor (row-slug).
// Ami itt nincs (brand, filmes) → nincs sor → a portfólió tetejére ugrik.
export const SERVICE_TO_ROW = {
  foto: "portre",
  kreativ: "kreativ",
  esemenyek: "esemenyfoto",
  film: "film",
};
