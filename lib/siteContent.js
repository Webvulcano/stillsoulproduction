import { createClient } from "@supabase/supabase-js";
import { CATEGORIES } from "@/app/portfolio/categories";
import { dict } from "@/app/i18n/dict";

// Nyilvános olvasás: sima anon kliens (cookie nélkül) → a page ISR-rel cache-elhető.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Fix képslotok száma a Rólunk szekcióban (a grid 6-os elrendezésre van szabva).
export const ABOUT_PHOTO_SLOTS = 6;

const DEFAULT_TOP = [
  "/about/top-01.jpg",
  "/about/top-02.jpg",
  "/about/top-03.jpg",
  "/about/top-04.jpg",
  "/about/top-05.jpg",
  "/about/top-06.jpg",
];
const DEFAULT_BOTTOM = [
  "/about/01.jpg",
  "/about/02.jpg",
  "/about/03.jpg",
  "/about/04.jpg",
  "/about/05.jpg",
  "/about/06.jpg",
];
const DEFAULT_SERVICE_IMAGES = [
  "/services/1.jpeg",
  "/services/2.jpg",
  "/services/3.jpg",
  "/services/4.jpg",
  "/services/5.jpg",
  "/services/6.jpg",
];

// Fix hosszú kép-tömb: hiányzó/üres slot → a beépített alapkép.
function fixedPhotos(arr, defaults) {
  return defaults.map((d, i) => (Array.isArray(arr) && arr[i] ? arr[i] : d));
}

// A dict csak fallback — a DB az elsődleges forrás.
function aboutDefaults() {
  return {
    title_hu: dict.hu.about.title,
    title_en: dict.en.about.title,
    p1_hu: dict.hu.about.p1,
    p1_en: dict.en.about.p1,
    p2_hu: dict.hu.about.p2 ?? "",
    p2_en: dict.en.about.p2 ?? "",
    p3_hu: dict.hu.about.p3,
    p3_en: dict.en.about.p3,
    top_photos: DEFAULT_TOP,
    bottom_photos: DEFAULT_BOTTOM,
  };
}

function servicesDefaults() {
  return CATEGORIES.map((c, i) => ({
    slug: c.slug,
    title_hu: dict.hu.services.items[i]?.title ?? "",
    title_en: dict.en.services.items[i]?.title ?? "",
    details_hu: dict.hu.services.items[i]?.details ?? "",
    details_en: dict.en.services.items[i]?.details ?? "",
    image_url: DEFAULT_SERVICE_IMAGES[i],
  }));
}

export function mergeAbout(value) {
  const d = aboutDefaults();
  const v = value ?? {};
  return {
    ...d,
    ...Object.fromEntries(
      Object.entries(v).filter(([k]) => !k.endsWith("_photos"))
    ),
    top_photos: fixedPhotos(v.top_photos, DEFAULT_TOP),
    bottom_photos: fixedPhotos(v.bottom_photos, DEFAULT_BOTTOM),
  };
}

// A csempék száma és sorrendje kötött (index → CATEGORIES slug → service_key).
export function mergeServices(value) {
  const defaults = servicesDefaults();
  const saved = Array.isArray(value?.items) ? value.items : [];
  return defaults.map((d, i) => {
    const s = saved.find((x) => x?.slug === d.slug) ?? saved[i] ?? {};
    return {
      slug: d.slug,
      title_hu: s.title_hu ?? d.title_hu,
      title_en: s.title_en ?? d.title_en,
      details_hu: s.details_hu ?? d.details_hu,
      details_en: s.details_en ?? d.details_en,
      image_url: s.image_url || d.image_url,
    };
  });
}

// { about, services } — DB-ből, hiányzó kulcsokra dict/beépített fallbackkel.
export async function getSiteContent() {
  const { data } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", ["about", "services"]);
  const byKey = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return {
    about: mergeAbout(byKey.about),
    services: mergeServices(byKey.services),
  };
}
