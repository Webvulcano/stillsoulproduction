// CMS-szerkeszthető szolgáltatás-aloldalak (Ügyfél Admin → oldalanként külön lap).
// Az alapértékek (default) az aloldalak content.js-éből jönnek ({ hu, en }); a CMS-ben mentett
// érték ezeket írja felül (lib/cms-dict.js → getServiceContent).
// Relative imports only: the admin's sync script loads this file with tsx (no @/ alias).
import { content as weddingVideo, HERO_POSTER_ID as WEDDING_VIDEO_POSTER } from "../app/eskuvoi-videozas/content.js";
import { content as weddingPhoto, HERO_POSTER_ID as WEDDING_PHOTO_POSTER } from "../app/eskuvoi-fotozas/content.js";
import { content as portrait } from "../app/portre-fotozas/content.js";
import { content as event, VIDEOS as eventVideos } from "../app/rendezveny-fotozas-videozas/content.js";
import { content as musicVideo, VIDEOS as musicVideos } from "../app/videoklip-keszites/content.js";
import { content as commercial, VIDEOS as commercialVideos } from "../app/reklamfilm-keszites/content.js";

const t = (key, path, label, extra = {}) => ({ key, path, label, type: "text", ...extra });
const area = (key, path, label, extra = {}) => ({ key, path, label, type: "textarea", ...extra });
const lines = (key, path, label, help) => area(key, path, label, { lines: true, help });
const list = (key, path, label, itemFields, help) => ({
  key,
  path,
  label,
  type: "list",
  itemFields,
  ...(help && { help }),
});
const item = (key, label, type = "text") => ({ key, label, type });

const OPTIONAL = "Üresen hagyva nem jelenik meg.";

// --- Közös szekciók ---------------------------------------------------------------------------

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

// Nyitókép szekció. posterSrc = a mostani (kódbeli) háttérkép — ez látszik az adminban alapként;
// null: nincs fix kép (pl. portré: a portfólió első képe), ilyenkor feltöltésig a kód dönt.
const hero = (posterSrc = null) => ({
  key: "hero",
  label: "Nyitókép (hero)",
  fields: [
    t("eyebrow", "hero.eyebrow", "Kis felirat a cím fölött"),
    t("title", "hero.title", "Főcím", { help: "Az oldal H1 címe (a Google is ezt olvassa) — maradjon benne a szolgáltatás neve." }),
    t("title_sub", "hero.titleSub", "Főcím — második, kisebb sor", { help: "A főcím része (H1): ide jönnek a városok. Üresen hagyva nem jelenik meg." }),
    area("sub", "hero.sub", "Alcím"),
    t("cta", "hero.cta", "Gomb: ajánlatkérés"),
    t("secondary", "hero.packagesLink", "Második gomb"),
    t("poster_alt", "hero.posterAlt", "Háttérkép leírása (felolvasó szoftvernek)"),
  ],
  images: [
    {
      key: "poster",
      label: "Háttérkép",
      help: "Teljes szélességű kép a cím mögött. Fekvő, legalább 1920 px széles kép a legjobb; a közepe mindig látszik, a széleiből mobilon levág.",
      maxWidth: 2400,
      quality: 82,
      aspect: "16/9",
      ...(posterSrc && { src: posterSrc }),
    },
  ],
});

const intro = {
  key: "intro",
  label: "Bevezető",
  fields: [
    t("title", "intro.title", "Cím"),
    lines("paragraphs", "intro.paragraphs", "Bekezdések", "Minden sor egy külön bekezdés."),
  ],
};

const offer = (label = "Mit nyújtunk") => ({
  key: "offer",
  label,
  fields: [
    t("title", "offer.title", "Cím"),
    list("items", "offer.items", "Pontok", [item("title", "Cím"), item("text", "Szöveg", "textarea")]),
  ],
});

const work = {
  key: "work",
  label: "Munkáink",
  // A videók/képek a Portfólió menüből jönnek (kategória szerint); itt csak a szövegek.
  fields: [
    t("title", "work.title", "Cím"),
    area("text", "work.text", "Bevezető mondat", { help: OPTIONAL }),
    t("portfolio", "work.portfolio", "Link a portfólióra"),
  ],
};

const faq = {
  key: "faq",
  label: "Gyakori kérdések",
  fields: [
    t("title", "faq.title", "Cím"),
    list("items", "faq.items", "Kérdések", [item("q", "Kérdés"), item("a", "Válasz", "textarea")], "A Google is ezeket a kérdéseket látja (GYIK-találat)."),
  ],
};

// --- Oldalak ----------------------------------------------------------------------------------

// key = CMS page key (a mezőkulcs eleje: `<key>.<szekció>.<mező>`), path = az aloldal URL-je.
export const SERVICE_PAGES = [
  {
    key: "eskuvoi_videozas",
    label: "Esküvői videózás",
    path: "/eskuvoi-videozas",
    content: weddingVideo,
    sections: [
      hero(ytThumb(WEDDING_VIDEO_POSTER)),
      intro,
      {
        key: "styles",
        label: "Stílusok",
        fields: [
          t("title", "styles.title", "Cím"),
          area("lead", "styles.lead", "Bevezető mondat"),
          list("items", "styles.items", "Stílusok", [item("name", "Név"), item("text", "Leírás", "textarea")]),
        ],
      },
      offer("Amit nyújtunk"),
      {
        key: "reference",
        label: "Esküvői filmjeink",
        fields: [
          t("title", "reference.title", "Cím"),
          area("text", "reference.text", "Bevezető mondat"),
          t("portfolio", "reference.portfolio", "Link a portfólióra"),
        ],
      },
      {
        key: "pricing",
        label: "Csomagok és árak",
        fields: [
          t("title", "packages.title", "Cím"),
          area("lead", "packages.lead", "Bevezető mondat"),
          t("gift_label", "packages.giftLabel", "Ajándék sor minden csomagnál"),
          list("items", "packages.items", "Csomagok", [
            item("name", "Név"),
            item("price", "Ár"),
            item("length", "Videó hossza"),
            item("text", "Leírás", "textarea"),
          ], "Ha árat módosítasz, a GYIK válaszaiban is írd át."),
        ],
      },
      {
        key: "extras",
        label: "Plusz kérések",
        fields: [
          t("title", "packages.extras.title", "Cím"),
          area("lead", "packages.extras.lead", "Bevezető mondat"),
          list("items", "packages.extras.items", "Felárak", [item("price", "Ár"), item("text", "Leírás", "textarea")]),
          t("free_price", "packages.free.price", "Ingyenes extrák — felirat"),
          lines("free_items", "packages.free.items", "Ingyenes extrák", "Minden sor egy tétel."),
          area("note", "packages.extras.note", "Megjegyzés alul"),
        ],
      },
      {
        key: "info",
        label: "Utazás, fotó, árlista",
        fields: [
          t("travel_title", "packages.travel.title", "Utazás — cím"),
          area("travel_text", "packages.travel.text", "Utazás — szöveg"),
          t("photo_title", "packages.photo.title", "Fotó is kell? — cím"),
          area("photo_text", "packages.photo.text", "Fotó is kell? — szöveg"),
          t("price_list_title", "packages.priceList.title", "Árlista — cím", { help: "A letölthető PDF-ek a Csomagok menüből jönnek." }),
          t("price_list_download", "packages.priceList.download", "Árlista — letöltés gomb"),
        ],
      },
      faq,
    ],
  },
  {
    key: "eskuvoi_fotozas",
    label: "Esküvői fotózás",
    path: "/eskuvoi-fotozas",
    content: weddingPhoto,
    sections: [
      hero(ytThumb(WEDDING_PHOTO_POSTER)),
      intro,
      {
        key: "pricing",
        label: "Csomagok és árak",
        fields: [
          t("title", "packages.title", "Cím"),
          area("lead", "packages.lead", "Bevezető mondat"),
          list("items", "packages.items", "Csomagok", [item("name", "Név"), item("price", "Ár"), item("photos", "Fotók száma")], "Ha árat módosítasz, a GYIK válaszaiban is írd át."),
          t("price_list_title", "packages.priceList.title", "Árlista — cím", { help: "A letölthető PDF-ek a Csomagok menüből jönnek." }),
          area("price_list_text", "packages.priceList.text", "Árlista — szöveg"),
          t("price_list_download", "packages.priceList.download", "Árlista — letöltés gomb"),
        ],
      },
      {
        key: "creative",
        label: "Kreatív fotózás",
        fields: [
          t("title", "packages.creative.title", "Cím"),
          area("lead", "packages.creative.lead", "Bevezető mondat"),
          list("items", "packages.creative.items", "Felárak", [item("price", "Ár"), item("text", "Leírás")]),
        ],
      },
      {
        key: "video",
        label: "Videó is kell?",
        fields: [t("title", "packages.video.title", "Cím"), area("text", "packages.video.text", "Szöveg")],
      },
      faq,
    ],
  },
  { key: "portre_fotozas", label: "Portré fotózás", path: "/portre-fotozas", content: portrait, sections: [hero(), intro, offer("Mit fotózunk"), work, faq] },
  {
    key: "rendezveny",
    label: "Rendezvényfotózás és -videózás",
    path: "/rendezveny-fotozas-videozas",
    content: event,
    sections: [hero(ytThumb(eventVideos[0].id)), intro, offer("Mit készítünk"), work, faq],
  },
  { key: "videoklip", label: "Videoklip készítés", path: "/videoklip-keszites", content: musicVideo, sections: [hero(ytThumb(musicVideos[0].id)), intro, offer("Mit vállalunk"), work, faq] },
  { key: "reklamfilm", label: "Reklámfilm készítés", path: "/reklamfilm-keszites", content: commercial, sections: [hero(ytThumb(commercialVideos[0].id)), intro, offer("Mit készítünk"), work, faq] },
];

// SECTIONS-formátum (lib/cms-schema.js): { page, key, label, fields, content }.
// A `content` jelzi, hogy a mezők alapértéke az aloldal content.js-éből jön, nem a dict.js-ből.
export const SERVICE_SECTIONS = SERVICE_PAGES.flatMap((p) =>
  p.sections.map((s) => ({ ...s, page: p.key, content: p.content }))
);

export const servicePage = (key) => SERVICE_PAGES.find((p) => p.key === key);
