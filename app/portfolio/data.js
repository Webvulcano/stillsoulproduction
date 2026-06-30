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
    thumb: "/portfolio/7artisans-cine.jpg",
    categories: ["kreativ"],
  },
  {
    id: "om-tg7",
    titleKey: "om-tg7",
    youtubeId: "G3sUbXLbQC0",
    thumb: "/portfolio/om-tg7.jpg",
    categories: ["kreativ"],
  },
  {
    id: "joby",
    titleKey: "joby",
    youtubeId: "4A13JX5qJew",
    thumb: "/portfolio/joby.jpg",
    categories: ["kreativ"],
  },
  {
    id: "om-adventure",
    titleKey: "om-adventure",
    youtubeId: "521LfNF1cHs",
    thumb: "/portfolio/om-adventure-pack.jpg",
    categories: ["kreativ"],
  },
  {
    id: "trauner-shortmood",
    titleKey: "trauner-shortmood",
    youtubeId: "LUNEzII4Zhc",
    thumb: "/portfolio/trauner-shortmood.jpg",
    categories: ["kreativ"],
  },

  // — Események és rendezvények —
  {
    id: "trauner-aftermovie",
    titleKey: "trauner-aftermovie",
    youtubeId: "puLMxznpAig",
    thumb: "/portfolio/trauner-aftermovie.jpg",
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
];

// Thumbnail URL: valódi kép ha megadva, különben YouTube borítókép.
export function thumbUrl(item) {
  if (item.thumb) return item.thumb;
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

// Cím feloldása a központi szótárból (locale-érzékeny, egyetlen forrás).
export function titleOf(item, t) {
  return t.portfolio?.items?.[item.titleKey]?.title ?? item.titleKey;
}
