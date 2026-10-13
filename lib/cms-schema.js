// What the CMS can edit on this site, and where each text lives in the i18n dictionary.
// One source for cms.manifest.js (sync) and lib/cms-dict.js (runtime).
// Relative imports only: the admin's sync script loads this file with tsx (no @/ alias).
import { dict } from "../app/i18n/dict.js";
import { LIVE_ABOUT, LIVE_SERVICES } from "./cms-live-snapshot.js";

export function getPath(obj, path) {
  return path.split(".").reduce((o, k) => o?.[k], obj);
}

export function setPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const parent = keys.reduce((o, k) => (o[k] ??= {}), obj);
  parent[last] = value;
}

const t = (key, path, label, extra = {}) => ({ key, path, label, type: "text", ...extra });
const area = (key, path, label, extra = {}) => ({ key, path, label, type: "textarea", ...extra });

export const SECTIONS = [
  {
    page: "home",
    key: "nav",
    label: "Menü",
    fields: [
      t("rolunk", "nav.rolunk", "Menü: Rólunk"),
      t("portfolio", "nav.portfolio", "Menü: Portfólió"),
      t("szolgaltatasok", "nav.szolgaltatasok", "Menü: Szolgáltatások"),
      t("arajanlat", "nav.arajanlat", "Menü: Árajánlat"),
      t("kapcsolat", "nav.kapcsolat", "Menü: Kapcsolat"),
    ],
  },
  {
    page: "home",
    key: "clients",
    label: "Akikkel dolgoztunk",
    fields: [t("title", "clients.title", "Cím")],
    // Logo strip under the hero: gallery slot, managed in the admin (empty → the strip is hidden).
    images: [
      {
        key: "logos",
        label: "Logók",
        kind: "gallery",
        maxWidth: 480,
        maxHeight: 200,
        quality: 90,
        maxItems: 30,
        help: "Átlátszó hátterű PNG a legjobb. A logók eredeti színben, egyforma magasságban futnak a videó alatt.",
      },
    ],
  },
  {
    page: "home",
    key: "about",
    label: "Rólunk",
    fields: [
      t("title", "about.title", "Cím"),
      area("p1", "about.p1", "1. bekezdés"),
      area("p2", "about.p2", "2. bekezdés", { help: "Üresen hagyva nem jelenik meg." }),
      area("p3", "about.p3", "3. bekezdés"),
    ],
    images: [
      ...LIVE_ABOUT.top_photos.map((src, i) => ({
        key: `top_${i + 1}`,
        label: `Felső képsor — ${i + 1}. kép`,
        src,
      })),
      ...LIVE_ABOUT.bottom_photos.map((src, i) => ({
        key: `bottom_${i + 1}`,
        label: `Alsó képsor — ${i + 1}. kép`,
        src,
      })),
    ].map((img) => ({ ...img, maxWidth: 900, aspect: "3/2", alt: "StillSoul Production — Rólunk" })),
  },
  {
    page: "home",
    key: "services",
    label: "Szolgáltatások",
    fields: [
      t("label", "services.label", "Szekció felirat"),
      {
        key: "items",
        path: "services.items",
        label: "Szolgáltatás-csempék",
        type: "list",
        itemFields: [
          { key: "title", label: "Cím", type: "text" },
          { key: "details", label: "Részletek (kisbetűs sor)", type: "textarea" },
        ],
      },
    ],
    images: LIVE_SERVICES.map((s, i) => ({
      key: `kep_${i + 1}`,
      label: `${i + 1}. csempe képe — ${s.title_hu}`,
      src: s.image_url,
      maxWidth: 1600,
      alt: s.title_hu,
    })),
  },
  {
    page: "home",
    key: "contact",
    label: "Árajánlat űrlap",
    fields: [
      t("label", "contact.label", "Szekció felirat"),
      t("category_label", "contact.categoryLabel", "Kategória — címke"),
      t("category_placeholder", "contact.categoryPlaceholder", "Kategória — üres választás"),
      area("categories", "contact.categories", "Kategóriák (legördülő lista)", { lines: true }),
      t("email_label", "contact.emailLabel", "E-mail — címke"),
      t("email_placeholder", "contact.emailPlaceholder", "E-mail — minta szöveg"),
      t("message_label", "contact.messageLabel", "Üzenet — címke"),
      area("message_placeholder", "contact.messagePlaceholder", "Üzenet — minta szöveg"),
      t("submit", "contact.submit", "Küldés gomb"),
      t("sending", "contact.sending", "Küldés közben"),
      area("success", "contact.success", "Sikeres küldés üzenet"),
      t("error", "contact.error", "Hibaüzenet"),
    ],
  },
  {
    page: "home",
    key: "contact_info",
    label: "Kapcsolat",
    fields: [t("label", "contactInfo.label", "Szekció felirat")],
  },
  {
    page: "portfolio",
    key: "portfolio",
    label: "Portfólió oldal",
    fields: [
      t("label", "portfolio.label", "Felirat"),
      t("gallery_title", "portfolio.galleryTitle", "Cím"),
      t("search_placeholder", "portfolio.searchPlaceholder", "Keresés — minta szöveg"),
      t("all_categories", "portfolio.allCategories", "Összes kategória"),
      t("clear", "portfolio.clear", "Szűrők törlése"),
      t("no_results", "portfolio.noResults", "Nincs találat"),
      t("results_count", "portfolio.resultsCount", "Találatok száma", { help: "{n} helyére kerül a szám." }),
    ],
  },
];

// The live admin's content overrides the dictionary defaults (about texts, service tiles).
const LIVE_OVERRIDES = {
  hu: {
    "about.title": LIVE_ABOUT.title_hu,
    "about.p1": LIVE_ABOUT.p1_hu,
    "about.p2": LIVE_ABOUT.p2_hu,
    "about.p3": LIVE_ABOUT.p3_hu,
    "services.items": LIVE_SERVICES.map((s) => ({ title: s.title_hu, details: s.details_hu })),
  },
  en: {
    "about.title": LIVE_ABOUT.title_en,
    "about.p1": LIVE_ABOUT.p1_en,
    "about.p2": LIVE_ABOUT.p2_en,
    "about.p3": LIVE_ABOUT.p3_en,
    "services.items": LIVE_SERVICES.map((s) => ({ title: s.title_en, details: s.details_en })),
  },
};

export function defaultFor(locale, field) {
  const value = LIVE_OVERRIDES[locale]?.[field.path] ?? getPath(dict[locale], field.path);
  if (field.type === "list") return value.map((item) => ({ title: item.title ?? "", details: item.details ?? "" }));
  return value ?? "";
}

export const cmsKey = (section, field) => `${section.page}.${section.key}.${field.key}`;
