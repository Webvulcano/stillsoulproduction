// /eskuvoi-fotozas — az aloldal összes szövege (HU + EN) és ára.
// Ez az ALAPÉRTÉK: a szövegek az Ügyfél Adminban szerkeszthetők (lib/service-pages-schema.js),
// a mentett CMS-érték felülírja. Új mezőt a sémába is fel kell venni, különben nem szerkeszthető.
//
// FORRÁS az árakhoz és a csomag-tartalomhoz:
//   PDF „ESKÜVŐ FOTÓZÁS — Árajánlat” (Ügyfél Admin → Csomagok → „Esküvői fotózás”),
//   CMS ár: „200 000 Ft-tól”. Átvéve: 2026-11-17.
//   Alap 200 000 (100–300 db utómunkázott fotó) · Deluxe 250 000 (300–500 db) ·
//   Kreatív fotózás: esküvő napján 25 000, eltérő napon 35 000 ·
//   Fotó + videó: bármelyik videós csomag mellé a fotós csomag árából 25% kedvezmény.
// A PDF-ben NINCS: utazási feltétel, átadási idő, stílus → ezekről az oldal nem állít semmit.
// A PACKAGES ár csak tartalék a JSON-LD-hez: az Offer.price a CMS-ben szerkesztett árból jön (priceNumber).

// Hero alap-háttérképe: a Laura & Csabi trailer nyitóképe (helyőrző, amíg nincs esküvői fotó) —
// az Ügyfél Adminban felülírható (hero.poster képhely).
export const HERO_POSTER_ID = "GTiKqG0dmJo";

export const PACKAGES = [
  { key: "alap", name: "Alap", price: 200000, photos: "100–300" },
  { key: "deluxe", name: "Deluxe", price: 250000, photos: "300–500" },
];

export const content = {
  hu: {
    hero: {
      eyebrow: "— Esküvői fotózás —",
      title: "Esküvői fotós",
      // H1 második (kisebb) sora — a városok a H1-ben maradnak (SEO), de a főcím rövid.
      titleSub: "Budapest · Győr · Esztergom — országos kiszállással",
      sub: "100–500 utómunkázott fotó, 200 000 Ft-tól.",
      cta: "Ajánlatot kérek",
      packagesLink: "Csomagok és árak",
      posterAlt: "Laura és Csabi esküvője",
    },
    intro: {
      title: "Az esküvő napja, képekben",
      paragraphs: [
        "Egy jó esküvői fotó nemcsak megmutatja, ki volt ott, hanem visszahozza a hangulatot is: az izgatott készülődést, a kimondott igent, a nevetéseket és azokat a csendes, apró pillanatokat, amelyeket a nap sodrásában észre sem vesztek.",
        "Fördős Bence rendező, operatőr és fotós, Dudás Hédi vágó és forgatókönyvíró. Esküvői fotózást és videózást is vállalunk Budapesten, Győrben és Esztergomban, de az ország más részeire és a határon túlra is szívesen megyünk.",
        "Minden csomagban utómunkázott fotókat kaptok. Ha a videót is ránk bíznátok, a fotós csomag árából 25%-ot elengedünk.",
      ],
    },
    packages: {
      title: "Csomagok és árak",
      lead: "Két csomag közül választhattok. A különbség az utómunkázott fotók száma.",
      items: [
        { name: "Alap", price: "200 000 Ft", photos: "100–300 db utómunkázott fotó" },
        { name: "Deluxe", price: "250 000 Ft", photos: "300–500 db utómunkázott fotó" },
      ],
      creative: {
        title: "Kreatív fotózás",
        lead: "Bármelyik csomag mellé kérhető, felárért.",
        items: [
          { price: "+25 000 Ft", text: "Az esküvő napján" },
          { price: "+35 000 Ft", text: "Az esküvőtől eltérő napon" },
        ],
      },
      priceList: {
        title: "Teljes árlistánk",
        text: "A teljes árlistánk PDF-ben is elérhető. Itt letöltheted az esküvői fotós és videós árajánlatunkat.",
        download: "PDF letöltése",
      },
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        {
          q: "Mennyibe kerül az esküvői fotózás?",
          a: "Az esküvői fotózás 200 000 Ft-tól indul. Az Alap csomag (100–300 utómunkázott fotó) 200 000 Ft, a Deluxe (300–500 utómunkázott fotó) 250 000 Ft.",
        },
        {
          q: "Hány fotót kapunk?",
          a: "Az Alap csomagban 100–300, a Deluxe csomagban 300–500 utómunkázott fotót kaptok.",
        },
        {
          q: "Mennyibe kerül a kreatív fotózás?",
          a: "Felárért kérhető bármelyik csomag mellé: az esküvő napján +25 000 Ft, az esküvőtől eltérő napon +35 000 Ft.",
        },
        {
          q: "Kérhetünk fotót és videót együtt?",
          a: "Igen. Bármelyik videós csomag mellé kért esküvői fotózásnál a fotós csomag árából 25%-ot elengedünk, így az Alap 150 000 Ft, a Deluxe 187 500 Ft.",
        },
        {
          q: "Hol vállaltok esküvői fotózást?",
          a: "Budapesten, Győrben és Esztergomban, de az ország más részeire és a határon túlra is szívesen megyünk.",
        },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Wedding photography —",
      title: "Wedding photographer",
      // H1 második (kisebb) sora — a városok a H1-ben maradnak (SEO), de a főcím rövid.
      titleSub: "Budapest · Győr · Esztergom — travelling nationwide",
      sub: "100–500 edited photos, from 200 000 HUF.",
      cta: "Request a quote",
      packagesLink: "Packages & prices",
      posterAlt: "Laura and Csabi's wedding",
    },
    intro: {
      title: "Your wedding day, in pictures",
      paragraphs: [
        "A good wedding photo doesn't just show who was there — it brings back the feeling: the nerves while getting ready, the “yes”, the laughter, and the quiet little moments you didn't even notice in the rush of the day.",
        "Bence Fördős is a director, cinematographer and photographer; Hédi Dudás is an editor and screenwriter. We photograph and film weddings in Budapest, Győr and Esztergom, and we're happy to travel anywhere else in Hungary or abroad.",
        "Every package comes with edited photos. If you'd like us to film your wedding too, we take 25% off the photography package.",
      ],
    },
    packages: {
      title: "Packages & prices",
      lead: "Choose from two packages. The difference is the number of edited photos.",
      items: [
        { name: "Alap", price: "200 000 HUF", photos: "100–300 edited photos" },
        { name: "Deluxe", price: "250 000 HUF", photos: "300–500 edited photos" },
      ],
      creative: {
        title: "Creative shoot",
        lead: "Available with either package, for an extra fee.",
        items: [
          { price: "+25 000 HUF", text: "On the wedding day" },
          { price: "+35 000 HUF", text: "On a different day" },
        ],
      },
      priceList: {
        title: "Full price list",
        text: "Our full price list is also available as a PDF. Download our wedding photography and videography offers here.",
        download: "Download PDF",
      },
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "How much does wedding photography cost?",
          a: "Wedding photography starts at 200 000 HUF. The Alap package (100–300 edited photos) is 200 000 HUF, Deluxe (300–500 edited photos) is 250 000 HUF.",
        },
        {
          q: "How many photos do we get?",
          a: "100–300 edited photos with Alap and 300–500 with Deluxe.",
        },
        {
          q: "How much is the creative shoot?",
          a: "It's an add-on to either package: +25 000 HUF on the wedding day, +35 000 HUF on a different day.",
        },
        {
          q: "Can we book photo and video together?",
          a: "Yes. With any video package we take 25% off the photography package, so Alap is 150 000 HUF and Deluxe 187 500 HUF.",
        },
        {
          q: "Where do you photograph weddings?",
          a: "In Budapest, Győr and Esztergom, and we're happy to travel anywhere else in Hungary or abroad.",
        },
      ],
    },
  },
};
