// CMS manifest for the StillSoul CMS copy (Ügyfél Admin). Structure comes from
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
    slug: "stillsoul-demo",
    name: "StillSoul Production (CMS másolat)",
    url: "http://localhost:3010",
  },
  // Portfólió = Ügyfél Admin galéria modul. A kategóriákat a főoldali szolgáltatás-csempékhez
  // lehet kötni (link key = a csempe slugja, ld. app/portfolio/categories.js CATEGORIES).
  gallery: {
    label: "Portfólió",
    maxWidth: 2000,
    links: LIVE_SERVICES.map((s, i) => ({ key: s.slug, label: `${i + 1}. csempe — ${s.title_hu}` })),
  },
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
        maxWidth: img.maxWidth,
        aspect: img.aspect,
        default: { src: img.src, alt: img.alt },
      })),
    })),
  })),
};
