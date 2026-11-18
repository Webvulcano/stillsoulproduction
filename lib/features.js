// Kapcsolók (Vercel env, build-időben beégetve → átállítás után redeploy kell).

// Szolgáltatás-aloldalak (esküvői videó/fotó, portré, rendezvény, videoklip, reklámfilm) nyilvánosak-e.
//   kikapcsolva (alap): a főoldalon nincs rájuk link, nincsenek a sitemapben, noindex — de URL-ről
//     és az Ügyfél Admin előnézetéből elérhetők és szerkeszthetők.
//   bekapcsolva: NEXT_PUBLIC_SERVICE_PAGES_PUBLIC=1 → linkek, sitemap, indexelhető.
export const SERVICE_PAGES_PUBLIC = process.env.NEXT_PUBLIC_SERVICE_PAGES_PUBLIC === "1";

// Az aloldalak metadata.robots értéke (undefined → a layout alapja, indexelhető).
export const serviceRobots = SERVICE_PAGES_PUBLIC ? undefined : { index: false, follow: false };

// Az aloldalak útvonalai (sitemap). Sorrend = a sitemap sorrendje.
export const SERVICE_PATHS = [
  "/eskuvoi-videozas",
  "/eskuvoi-fotozas",
  "/portre-fotozas",
  "/rendezveny-fotozas-videozas",
  "/videoklip-keszites",
  "/reklamfilm-keszites",
];
