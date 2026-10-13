import { getCms } from "@/lib/cms";

// Portfolio from the Ügyfél Admin gallery module (cms_get_site_content → gallery).
// Same shapes the gallery components used with the old Supabase tables, so they barely
// change. Both languages are sent down: the language is switched client-side.

async function galleries() {
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  const empty = { categories: [], items: [] };
  return { hu: hu.gallery() ?? empty, en: en.gallery() ?? empty };
}

// Categories in admin order: { slug, title_hu, title_en, service_key }.
// service_key = the home-page service tile that links to this category.
export async function getCategories() {
  const { hu, en } = await galleries();
  return hu.categories.map((c, i) => ({
    slug: c.slug,
    title_hu: c.title,
    title_en: en.categories[i]?.title || c.title,
    service_key: c.link,
    sort_order: i,
  }));
}

// { id, kind, categories:[slug], youtubeId, image, thumb, title_hu, title_en, alt_hu, alt_en, year, fit, objectPosition }
export async function getPortfolioItems() {
  const { hu, en } = await galleries();
  const enById = new Map(en.items.map((it) => [it.id, it]));
  return hu.items.map((it) => {
    const e = enById.get(it.id) ?? {};
    return {
      id: it.id,
      kind: it.kind,
      categories: [it.category],
      youtubeId: it.youtubeId ?? undefined,
      image: it.kind === "photo" ? it.src : undefined,
      // Video: own cover image if uploaded, otherwise the YouTube thumbnail (data.js).
      thumb: it.kind === "video" ? it.src ?? undefined : undefined,
      width: it.width,
      height: it.height,
      title_hu: it.title || undefined,
      title_en: e.title || undefined,
      alt_hu: it.alt || undefined,
      alt_en: e.alt || undefined,
      year: it.year ?? undefined,
      // Kártya-megjelenítés az adminból: "cover" (fókuszpont szerint vág) | "contain" (teljes kép).
      fit: it.fit,
      objectPosition: it.objectPosition,
    };
  });
}
