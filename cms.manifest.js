// CMS manifest for StillSoul Production (Ügyfél Admin). Structure comes from
// lib/cms-schema.js; defaults = current live content. Sync from the admin repo:
//   npx tsx scripts/sync-manifest.mjs <this repo>/cms.manifest.js --print-payload
import { SECTIONS, defaultFor } from "./lib/cms-schema.js";
import { LIVE_SERVICES } from "./lib/cms-live-snapshot.js";

const PAGES = [
  { key: "home", label: "Főoldal", path: "/" },
  { key: "portfolio", label: "Portfólió", path: "/portfolio" },
];

export default {
  site: {
    slug: "stillsoulproduction",
    name: "StillSoul Production",
    url: "https://stillsoulproduction.hu",
    previewUrl: "https://stillsoulproduction.hu",
  },
  // Portfólió = Ügyfél Admin galéria modul. A kategóriákat a főoldali szolgáltatás-csempékhez
  // lehet kötni (link key = a csempe slugja, ld. app/portfolio/categories.js CATEGORIES).
  gallery: {
    label: "Portfólió",
    maxWidth: 2000,
    aspect: "16/9", // a kártyák aránya (CategoryRow / PortfolioGrid aspect-video) → admin előnézet
    links: LIVE_SERVICES.map((s, i) => ({ key: s.slug, label: `${i + 1}. csempe — ${s.title_hu}` })),
  },
  // Értékelések = Ügyfél Admin értékelés-modul (Értékelések menü) → szekció a Szolgáltatások és az Árajánlat között.
  reviews: { label: "Értékelések" },
  locales: [
    { code: "hu", label: "Magyar" },
    { code: "en", label: "English" },
  ],
  pages: PAGES.map((page) => ({
    ...page,
    sections: SECTIONS.filter((s) => s.page === page.key).map((section) => ({
      key: section.key,
      label: section.label,
      fields: section.fields.map((f) => ({
        key: f.key,
        label: f.label,
        type: f.type,
        ...(f.help && { help: f.help }),
        ...(f.lines && { lines: true }),
        ...(f.itemFields && { itemFields: f.itemFields }),
        default: defaultFor("hu", f),
        translations: { en: defaultFor("en", f) },
      })),
      images: (section.images ?? []).map((img) => ({
        key: img.key,
        label: img.label,
        ...(img.kind && { kind: img.kind }),
        ...(img.help && { help: img.help }),
        maxWidth: img.maxWidth,
        ...(img.maxHeight && { maxHeight: img.maxHeight }),
        ...(img.quality && { quality: img.quality }),
        ...(img.maxItems && { maxItems: img.maxItems }),
        aspect: img.aspect,
        ...(img.src && { default: { src: img.src, alt: img.alt } }),
      })),
    })),
  })),
};
