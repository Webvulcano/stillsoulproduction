import { cache } from "react";
import { dict } from "@/app/i18n/dict";
import { getCms } from "@/lib/cms";
import { SECTIONS, cmsKey, getPath, setPath } from "@/lib/cms-schema";

// The i18n dictionary with every CMS-editable text replaced by its CMS value.
// The language stays client-side (LanguageProvider), so both languages are sent down.
function buildDict(locale, cms) {
  const out = structuredClone(dict[locale]);
  for (const section of SECTIONS) {
    for (const field of section.fields) {
      const key = cmsKey(section, field);
      if (field.type === "list") {
        const base = getPath(out, field.path) ?? [];
        setPath(out, field.path, cms.list(key).map((item, i) => ({ ...base[i], ...item })));
      } else if (field.lines) {
        setPath(out, field.path, cms.lines(key));
      } else {
        setPath(out, field.path, cms.text(key));
      }
    }
  }
  return out;
}

export const getCmsDicts = cache(async () => {
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  return { hu: buildDict("hu", hu), en: buildDict("en", en) };
});

// Image slots of a section, in manifest order: [{ key, src, width, height, alt }]
export async function getSectionImages(sectionKey) {
  const cms = await getCms("hu");
  const section = SECTIONS.find((s) => s.key === sectionKey);
  return (section?.images ?? []).map((img) => {
    const key = `${section.page}.${section.key}.${img.key}`;
    return { key, ...cms.image(key) };
  });
}


// Gallery image slot (e.g. client logos) in admin order, alt text in both languages:
// [{ src, width, height, alt: { hu, en } }]
export async function getSlotGallery(sectionKey, imageKey) {
  const section = SECTIONS.find((s) => s.key === sectionKey);
  const key = `${section.page}.${section.key}.${imageKey}`;
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  const huItems = hu.images(key);
  const enItems = en.images(key);
  return huItems.map((img, i) => ({ src: img.src, width: img.width, height: img.height, alt: { hu: img.alt, en: enItems[i]?.alt || img.alt } }));
}

// Reviews from the Ügyfél Admin reviews module, both languages (switched client-side):
// [{ id, author, rating, subtitle: { hu, en }, body: { hu, en } }]; en falls back to the original text.
export async function getReviews() {
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  const enById = new Map((en.reviews() ?? []).map((r) => [r.id, r]));
  // Local dev only: show sample reviews when the admin module is empty.
  if (process.env.NODE_ENV === "development" && !(hu.reviews() ?? []).length) {
    const { MOCK_REVIEWS } = await import("./mock-reviews");
    return MOCK_REVIEWS;
  }
  return (hu.reviews() ?? []).map((r) => {
    const e = enById.get(r.id);
    return {
      id: r.id,
      author: r.author,
      rating: r.rating,
      subtitle: { hu: r.subtitle, en: e?.subtitle || r.subtitle },
      body: { hu: r.body, en: e?.body || r.body },
    };
  });
}

// "Esküvői fotózás" → "eskuvoi-fotozas" (download file name)
const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Packages from the Ügyfél Admin packages module, both languages (switched client-side):
// [{ id, title: { hu, en }, tiers: { hu, en }, price: { hu, en }, file: { hu, en }, fileLocale: { hu, en } }]
// file = PDF URL that downloads (?download=<name>.pdf); en falls back to the original text / PDF.
export async function getPackages() {
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  const enById = new Map((en.packages() ?? []).map((p) => [p.id, p]));
  const dl = (p) => (p.file ? `${p.file}?download=${encodeURIComponent(`stillsoul-${slugify(p.title) || "csomag"}.pdf`)}` : null);
  return (hu.packages() ?? [])
    .map((p) => {
      const e = enById.get(p.id) ?? p;
      return {
        id: p.id,
        title: { hu: p.title, en: e.title },
        tiers: { hu: p.tiers, en: e.tiers },
        price: { hu: p.price, en: e.price },
        file: { hu: dl(p), en: dl(e) },
        fileLocale: { hu: p.fileLocale, en: e.fileLocale },
      };
    })
    .filter((p) => p.file.hu);
}
