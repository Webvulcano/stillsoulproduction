// Portfólió referenciák — valódi adat.
// FONTOS: itt NINCS felirat. A cím a központi dict.js-ben él
// (dict.portfolio.items[titleKey].title), ide csak a titleKey hivatkozik rá.
// youtubeId: Shorts és sima videó is ugyanúgy embedelhető az ID-vel.
export const PORTFOLIO = [
  // — Kreatív tartalomgyártás, social, short video —
  {
    id: "artisans-cine",
    titleKey: "artisans-cine",
    youtubeId: "M-CiAPUvtU4",
    thumb: "/portfolio/7artisans-cine.png",
    categories: ["kreativ"],
  },
  {
    id: "om-tg7",
    titleKey: "om-tg7",
    youtubeId: "G3sUbXLbQC0",
    thumb: "/portfolio/om-tg72.png",
    categories: ["kreativ"],
  },
  {
    id: "joby",
    titleKey: "joby",
    youtubeId: "4A13JX5qJew",
    thumb: "/portfolio/joby2.PNG",
    categories: ["kreativ"],
  },
  {
    id: "om-adventure",
    titleKey: "om-adventure",
    youtubeId: "521LfNF1cHs",
    thumb: "/portfolio/om-adventure-pack2.jpg",
    categories: ["kreativ"],
  },
  {
    id: "trauner-shortmood",
    titleKey: "trauner-shortmood",
    youtubeId: "LUNEzII4Zhc",
    thumb: "/portfolio/Alexander Trauner-Short-mood.jpg",
    categories: ["kreativ"],
  },

  // — Események és rendezvények —
  {
    id: "trauner-aftermovie",
    titleKey: "trauner-aftermovie",
    youtubeId: "puLMxznpAig",
    thumb: "/portfolio/Alexander-Aftermovie.jpg",
    categories: ["esemenyek"],
  },
  {
    id: "trauner-interju",
    titleKey: "trauner-interju",
    youtubeId: "kkxBILFiyH4",
    thumb: "/portfolio/trauner-interju.jpg",
    categories: ["esemenyek"],
  },
  {
    id: "fanni-gabor",
    titleKey: "fanni-gabor",
    youtubeId: "peHf-n1apqU",
    thumb: "/portfolio/fanni-gabor.jpg",
    categories: ["esemenyek"],
  },
  {
    id: "bences-bal",
    titleKey: "bences-bal",
    youtubeId: "TVImxfQdd_E",
    thumb: "/portfolio/bences-bal.jpg",
    categories: ["esemenyek"],
  },

  // — Dokumentumfilm és fikciós játékfilm —
  {
    id: "egy-napra",
    titleKey: "egy-napra",
    youtubeId: "iInSqy4bJjM",
    thumb: "/portfolio/egy-napra.jpg",
    categories: ["film"],
    year: 2024,
  },
  {
    id: "parduc",
    titleKey: "parduc",
    youtubeId: "m_yaUAlgdwM",
    thumb: "/portfolio/parduc.jpg",
    categories: ["film"],
    year: 2025,
  },
  {
    id: "szirenek",
    titleKey: "szirenek",
    youtubeId: "IfzyEXeLyI4",
    thumb: "/portfolio/szirenek.jpg",
    categories: ["film"],
    year: 2025,
  },
  {
    id: "maradekorszag",
    titleKey: "maradekorszag",
    youtubeId: "4fglM0WVneA",
    thumb: "/portfolio/maradekorszag.jpg",
    categories: ["film"],
    year: 2026,
  },

  // ——— FOTÓ-referenciák (kind: "photo") ———
  // Nincs titleKey/felirat; a lightbox soron belül lapoz.
  // — Portréfotózás —
  { id: "portre-01", kind: "photo", image: "/portfolio/photos/portre/01.jpg", categories: ["portre"] },
  { id: "portre-02", kind: "photo", image: "/portfolio/photos/portre/02.jpg", categories: ["portre"] },
  { id: "portre-03", kind: "photo", image: "/portfolio/photos/portre/03.jpg", categories: ["portre"] },
  { id: "portre-04", kind: "photo", image: "/portfolio/photos/portre/04.jpg", categories: ["portre"] },
  { id: "portre-05", kind: "photo", image: "/portfolio/photos/portre/05.jpg", categories: ["portre"] },
  { id: "portre-06", kind: "photo", image: "/portfolio/photos/portre/06.jpg", categories: ["portre"] },
  { id: "portre-07", kind: "photo", image: "/portfolio/photos/portre/07.jpg", categories: ["portre"] },
  { id: "portre-08", kind: "photo", image: "/portfolio/photos/portre/08.jpg", categories: ["portre"] },
  { id: "portre-09", kind: "photo", image: "/portfolio/photos/portre/09.jpg", categories: ["portre"] },
  { id: "portre-10", kind: "photo", image: "/portfolio/photos/portre/10.jpg", categories: ["portre"] },
  { id: "portre-11", kind: "photo", image: "/portfolio/photos/portre/11.jpg", categories: ["portre"] },
  // — Eseményfotózás —
  { id: "esemenyfoto-01", kind: "photo", image: "/portfolio/photos/esemeny/01.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-02", kind: "photo", image: "/portfolio/photos/esemeny/02.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-03", kind: "photo", image: "/portfolio/photos/esemeny/03.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-04", kind: "photo", image: "/portfolio/photos/esemeny/04.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-05", kind: "photo", image: "/portfolio/photos/esemeny/05.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-06", kind: "photo", image: "/portfolio/photos/esemeny/06.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-07", kind: "photo", image: "/portfolio/photos/esemeny/07.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-08", kind: "photo", image: "/portfolio/photos/esemeny/08.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-09", kind: "photo", image: "/portfolio/photos/esemeny/09.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-10", kind: "photo", image: "/portfolio/photos/esemeny/10.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-11", kind: "photo", image: "/portfolio/photos/esemeny/11.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-12", kind: "photo", image: "/portfolio/photos/esemeny/12.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-13", kind: "photo", image: "/portfolio/photos/esemeny/13.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-14", kind: "photo", image: "/portfolio/photos/esemeny/14.jpg", categories: ["esemenyfoto"] },
  { id: "esemenyfoto-15", kind: "photo", image: "/portfolio/photos/esemeny/15.jpg", categories: ["esemenyfoto"] },
  // — Kisállatfotózás —
  { id: "kisallat-01", kind: "photo", image: "/portfolio/photos/kisallat/01.jpg", categories: ["kisallat"] },
  { id: "kisallat-02", kind: "photo", image: "/portfolio/photos/kisallat/02.jpg", categories: ["kisallat"] },
  { id: "kisallat-03", kind: "photo", image: "/portfolio/photos/kisallat/03.jpg", categories: ["kisallat"] },
  { id: "kisallat-04", kind: "photo", image: "/portfolio/photos/kisallat/04.jpg", categories: ["kisallat"] },
  { id: "kisallat-05", kind: "photo", image: "/portfolio/photos/kisallat/05.jpg", categories: ["kisallat"] },
  { id: "kisallat-06", kind: "photo", image: "/portfolio/photos/kisallat/06.jpg", categories: ["kisallat"] },
  { id: "kisallat-07", kind: "photo", image: "/portfolio/photos/kisallat/07.jpg", categories: ["kisallat"] },
  { id: "kisallat-08", kind: "photo", image: "/portfolio/photos/kisallat/08.jpg", categories: ["kisallat"] },
  { id: "kisallat-09", kind: "photo", image: "/portfolio/photos/kisallat/09.jpg", categories: ["kisallat"] },
  { id: "kisallat-10", kind: "photo", image: "/portfolio/photos/kisallat/10.jpg", categories: ["kisallat"] },
  { id: "kisallat-11", kind: "photo", image: "/portfolio/photos/kisallat/11.jpg", categories: ["kisallat"] },
  { id: "kisallat-12", kind: "photo", image: "/portfolio/photos/kisallat/12.jpg", categories: ["kisallat"] },
  { id: "kisallat-13", kind: "photo", image: "/portfolio/photos/kisallat/13.jpg", categories: ["kisallat"] },
  { id: "kisallat-14", kind: "photo", image: "/portfolio/photos/kisallat/14.jpg", categories: ["kisallat"] },
  // — Analóg fotózás —
  { id: "analog-01", kind: "photo", image: "/portfolio/photos/analog/01.jpg", categories: ["analog"] },
  { id: "analog-02", kind: "photo", image: "/portfolio/photos/analog/02.jpg", categories: ["analog"] },
  { id: "analog-03", kind: "photo", image: "/portfolio/photos/analog/03.jpg", categories: ["analog"] },
  { id: "analog-04", kind: "photo", image: "/portfolio/photos/analog/04.jpg", categories: ["analog"] },
  { id: "analog-05", kind: "photo", image: "/portfolio/photos/analog/05.jpg", categories: ["analog"] },
  { id: "analog-06", kind: "photo", image: "/portfolio/photos/analog/06.jpg", categories: ["analog"] },
  { id: "analog-07", kind: "photo", image: "/portfolio/photos/analog/07.jpg", categories: ["analog"] },
  { id: "analog-08", kind: "photo", image: "/portfolio/photos/analog/08.jpg", categories: ["analog"] },
  { id: "analog-09", kind: "photo", image: "/portfolio/photos/analog/09.jpg", categories: ["analog"] },
  { id: "analog-10", kind: "photo", image: "/portfolio/photos/analog/10.jpg", categories: ["analog"] },
  { id: "analog-11", kind: "photo", image: "/portfolio/photos/analog/11.jpg", categories: ["analog"] },
  { id: "analog-12", kind: "photo", image: "/portfolio/photos/analog/12.jpg", categories: ["analog"] },
];

// Thumbnail URL: valódi kép ha megadva, különben YouTube borítókép.
// Fotó-item (kind: "photo") esetén a képfájl a forrás (image → thumb).
export function thumbUrl(item) {
  if (item.kind === "photo") return item.image ?? item.thumb;
  if (item.thumb) return item.thumb;
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

// Cím feloldása a központi szótárból (locale-érzékeny, egyetlen forrás).
// (Régi statikus itemekhez; a DB-s itemek a title_hu/title_en mezőt hozzák.)
export function titleOf(item, t) {
  return t.portfolio?.items?.[item.titleKey]?.title ?? item.titleKey;
}

// DB-s elem kétnyelvű felirata locale szerint (üres ha nincs).
export function itemTitle(item, locale) {
  const t = locale === "en" ? item.title_en : item.title_hu;
  return t ?? item.title_en ?? item.title_hu ?? "";
}
