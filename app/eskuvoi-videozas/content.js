// /eskuvoi-videozas — az aloldal összes szövege (HU + EN) és ára.
// Nem CMS-ből jön: az aloldalt nem kell adminból szerkeszteni.
//
// FORRÁS az árakhoz és a csomag-tartalomhoz:
//   PDF „ESKÜVŐ VIDEÓZÁS — Árajánlat” (Ügyfél Admin → Csomagok → „Esküvői videózás”),
//   CMS ár: „225 000 Ft-tól” / „from 225 000 HUF”, szintek: Alap · Deluxe · Ultra. Átvéve: 2026-11-17.
// Ha a PDF vagy a CMS ára változik, itt is át kell írni (a PACKAGES tömböt és a szövegeket is).

// Csomagok számmal — a JSON-LD (Service → offers) is ezt használja.
export const PACKAGES = [
  { key: "alap", name: "Alap", price: 225000 },
  { key: "deluxe", name: "Deluxe", price: 250000 },
  { key: "ultra", name: "Ultra", price: 400000 },
];

// Referencia-videók (portfólió CMS, kategória: esemenyek). Dátum és hossz a YouTube-oldalról.
// A sorrend a megjelenítés sorrendje; a látható címek a portfólióból (CMS) jönnek.
export const VIDEOS = {
  laura: {
    id: "RoptYKcX0MM",
    name: "Laura & Csabi esküvője — esküvői film",
    uploadDate: "2026-08-29T09:21:39-07:00",
    duration: "PT12M4S",
  },
  fanni: {
    id: "peHf-n1apqU",
    name: "Fanni & Gábor esküvője — esküvői film",
    uploadDate: "2026-06-18T12:35:46-07:00",
    duration: "PT6M27S",
  },
  trailer: {
    id: "GTiKqG0dmJo",
    name: "Laura & Csabi esküvője — trailer",
    uploadDate: "2026-09-08T06:10:02-07:00",
    duration: "PT40S",
  },
};

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const content = {
  hu: {
    hero: {
      eyebrow: "— Esküvői videózás —",
      title: "Esküvői videós Budapesten, Győrben és Esztergomban",
      sub: "4K esküvői film ajándék teaser-trailerrel, 225 000 Ft-tól.",
      cta: "Ajánlatot kérek",
      packagesLink: "Csomagok és árak",
      posterAlt: "Laura és Csabi esküvői filmjének nyitóképe",
    },
    intro: {
      title: "A nap, ahogy ti éltétek meg",
      paragraphs: [
        "Az esküvő egyetlen nap, de rengeteg apró pillanatból áll: az izgalom a készülődésnél, a kimondott igen, a pohárköszöntők, az első tánc és a késő esti nevetések. Esküvői videósként ezeket keressük, és olyan esküvői filmet vágunk belőlük, amit évek múlva is szívesen elővesztek.",
        "Ketten vagyunk: Fördős Bence rendező, operatőr és fotós, Dudás Hédi vágó és forgatókönyvíró. Budapest, Győr és Esztergom környékén utazási díj nélkül vállalunk esküvői videózást, de az ország más részeire és a határon túlra is szívesen megyünk.",
        "Minden esküvői videó 4K felbontásban készül, és minden csomaghoz jár egy rövid teaser-trailer ajándékba, amit könnyű megosztani a családdal és a barátokkal.",
      ],
    },
    packages: {
      title: "Csomagok és árak",
      lead: "Három csomag közül választhattok. A különbség a kész film hossza: minél hosszabb, annál több fér bele a napotokból. Mindegyikhez jár ajándék teaser-trailer.",
      giftLabel: "Ajándék teaser-trailer (30–60 mp)",
      items: [
        {
          name: "Alap",
          price: "225 000 Ft",
          length: "0–5 perces esküvői videó",
          text: "Tömör, lendületes összefoglaló a nap legfontosabb pillanataiból.",
        },
        {
          name: "Deluxe",
          price: "250 000 Ft",
          length: "5–15 perces esküvői videó",
          text: "Bővebb film, több tér a hangulatoknak és a részleteknek.",
        },
        {
          name: "Ultra",
          price: "400 000 Ft",
          length: "30–60 perces esküvői film",
          text: "Hosszú, részletes film, ami végigköveti a napotokat.",
        },
      ],
      extras: {
        title: "Plusz kérések",
        lead: "Bármelyik csomag mellé kérhetők, a csomagot nem változtatják meg.",
        items: [
          { text: "Első tánc egyben, egy kameraállásból, statikusan felvéve", price: "+5 000 Ft" },
          { text: "Szertartás egyben, egy kameraállásból, statikusan felvéve", price: "+10 000 Ft" },
          { text: "Beszéd egyben, egy kameraállásból, statikusan felvéve", price: "+5 000 Ft" },
        ],
        note: "Minden eseményről készülnek vágóképek a filmhez. Az egyben rögzített változatot akkor érdemes kérni, ha a teljes jelenetet is meg szeretnétek őrizni.",
      },
      photo: {
        title: "Fotó is kell?",
        text: "Ha az esküvői fotózást is ránk bíznátok, bármelyik videós csomag mellé a fotós csomag árából 25%-ot elengedünk.",
        link: "Esküvői fotózás — csomagok és árak →",
      },
      priceList: {
        title: "Teljes árlistánk",
        download: "PDF letöltése",
      },
      travel: {
        title: "Utazás",
        text: "Budapest, Győr és Esztergom vonzáskörzetében ingyenes. Máshová 5–10 000 Ft felárral megyünk, ezt előre megbeszéljük.",
      },
      free: {
        title: "Ingyenes extrák",
        price: "Ingyenes",
        items: [
          "Üzenet az örömszülőktől, a testvérektől vagy a násznéptől",
          "A menyasszony vagy a vőlegény üzenete",
        ],
      },
    },
    styles: {
      title: "Választható stílusok",
      lead: "A film hangulatát közösen választjuk ki. Három irányból indulhattok:",
      items: [
        {
          name: "Standard",
          text: "Dokumentarista film, általában lineáris: a nap úgy bontakozik ki, ahogy megtörtént.",
        },
        {
          name: "Cinematic",
          text: "Filmszerűbb megközelítés: a valódi pillanatok mellett megrendezett snittek is helyet kapnak.",
        },
        {
          name: "Office",
          text: "Dokumentarista, de játékosabb: az Office sorozatot idéző kameramozgások, humor és interjúk a násznéppel.",
        },
      ],
    },
    offer: {
      title: "Amit nyújtunk",
      items: [
        { title: "4K minőség", text: "Minden esküvői videó 4K felbontásban készül." },
        { title: "Letisztult képvilág", text: "Időtálló képek, amelyek évek múlva is jól mutatnak." },
        { title: "Határidők betartása", text: "A megbeszélt átadási időt tartjuk." },
        { title: "Kétszeri visszajelzés", text: "A vágás után kétszer jelezhettek vissza, és a kéréseitek alapján javítunk a filmen." },
      ],
    },
    reference: {
      title: "Esküvői filmjeink",
      text: "Két teljes esküvői film és egy trailer — így néz ki egy StillSoul esküvői videó.",
      portfolio: "További videók a portfólióban →",
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        {
          q: "Mennyibe kerül egy esküvői videó?",
          a: "Az esküvői videózás 225 000 Ft-tól indul. Az Alap csomag (0–5 perces videó) 225 000 Ft, a Deluxe (5–15 perc) 250 000 Ft, az Ultra (30–60 perc) 400 000 Ft. Mindegyikhez ajándék teaser-trailer jár.",
        },
        {
          q: "Mi a különbség az Alap, a Deluxe és az Ultra csomag között?",
          a: "A kész film hossza: az Alap 0–5, a Deluxe 5–15, az Ultra 30–60 perces. Mindhárom 4K-ban készül, és mindhárom mellé jár egy 30–60 másodperces teaser-trailer.",
        },
        {
          q: "Kérhetjük egyben az első táncot, a szertartást vagy a beszédeket?",
          a: "Igen, felárért. Az első tánc és a beszéd egyben +5 000 Ft, a szertartás egyben +10 000 Ft. Ezeket egy kameraállásból, statikusan rögzítjük, a választott csomag nem változik.",
        },
        {
          q: "Mennyibe kerül a kiszállás?",
          a: "Budapest, Győr és Esztergom vonzáskörzetében nincs utazási díj. Máshová 5–10 000 Ft felárral megyünk, ezt előre megbeszéljük.",
        },
        {
          q: "Milyen stílusban készül a film?",
          a: "Három közül választhattok: Standard (dokumentarista, lineáris), Cinematic (megrendezett snittekkel) és Office (az Office sorozatot idéző kameramozgások, humor, interjúk a násznéppel).",
        },
        {
          q: "Kérhetünk módosítást a kész filmen?",
          a: "Igen. A vágás után kétszer jelezhettek vissza, és a kéréseitek alapján javítunk a filmen.",
        },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Wedding videography —",
      title: "Wedding videographer in Budapest, Győr and Esztergom",
      sub: "A 4K wedding film with a free teaser trailer, from 225 000 HUF.",
      cta: "Request a quote",
      packagesLink: "Packages & prices",
      posterAlt: "Opening frame of Laura and Csabi's wedding film",
    },
    intro: {
      title: "Your day, the way you lived it",
      paragraphs: [
        "A wedding is a single day made of countless small moments: the nerves while getting ready, the “yes”, the toasts, the first dance and the laughter late into the night. As wedding videographers, these are the moments we look for, and we cut them into a wedding film you'll want to come back to years from now.",
        "There are two of us: Bence Fördős, director, cinematographer and photographer, and Hédi Dudás, editor and screenwriter. Around Budapest, Győr and Esztergom there's no travel fee, and we're happy to travel anywhere else in Hungary or abroad.",
        "Every wedding video is shot in 4K, and every package comes with a short teaser trailer as a gift — easy to share with family and friends.",
      ],
    },
    packages: {
      title: "Packages & prices",
      lead: "Choose from three packages. The difference is the length of the finished film: the longer it is, the more of your day it holds. Each one comes with a free teaser trailer.",
      giftLabel: "Free teaser trailer (30–60 sec)",
      items: [
        {
          name: "Alap",
          price: "225 000 HUF",
          length: "0–5 minute wedding video",
          text: "A tight, energetic summary of the day's key moments.",
        },
        {
          name: "Deluxe",
          price: "250 000 HUF",
          length: "5–15 minute wedding video",
          text: "A fuller film with more room for moods and details.",
        },
        {
          name: "Ultra",
          price: "400 000 HUF",
          length: "30–60 minute wedding film",
          text: "A long, detailed film that follows your whole day.",
        },
      ],
      extras: {
        title: "Add-ons",
        lead: "Available with any package; they don't change it.",
        items: [
          { text: "First dance in full, from one static camera position", price: "+5 000 HUF" },
          { text: "Ceremony in full, from one static camera position", price: "+10 000 HUF" },
          { text: "Speech in full, from one static camera position", price: "+5 000 HUF" },
        ],
        note: "We film cutaways of every part of the day for the edit. Ask for the full-length recording if you'd like to keep the whole scene as well.",
      },
      photo: {
        title: "Need photos too?",
        text: "If you'd like us to photograph your wedding as well, we take 25% off the photography package with any video package.",
        link: "Wedding photography — packages & prices →",
      },
      priceList: {
        title: "Full price list",
        text: "Our full price list is also available as a PDF. Download our wedding photography and videography offers here.",
        download: "Download PDF",
      },
      travel: {
        title: "Travel",
        text: "Free around Budapest, Győr and Esztergom. Elsewhere we charge 5–10 000 HUF extra, agreed in advance.",
      },
      free: {
        title: "Free extras",
        price: "Free",
        items: [
          "A message from your parents, siblings or guests",
          "A message from the bride or the groom",
        ],
      },
    },
    styles: {
      title: "Film styles",
      lead: "We pick the mood of the film together. There are three directions to start from:",
      items: [
        {
          name: "Standard",
          text: "Documentary, usually linear: the day unfolds the way it happened.",
        },
        {
          name: "Cinematic",
          text: "A more filmic take: staged shots alongside the real moments.",
        },
        {
          name: "Office",
          text: "Documentary, but playful: camera moves and humour inspired by The Office, with interviews with your guests.",
        },
      ],
    },
    offer: {
      title: "What you get",
      items: [
        { title: "4K quality", text: "Every wedding video is shot in 4K." },
        { title: "Clean visual style", text: "Timeless images that still look good years later." },
        { title: "On-time delivery", text: "We keep the delivery date we agree on." },
        { title: "Two rounds of feedback", text: "After the edit you can send feedback twice, and we revise the film based on it." },
      ],
    },
    reference: {
      title: "Our wedding films",
      text: "Two full wedding films and a trailer — this is what a StillSoul wedding video looks like.",
      portfolio: "More videos in the portfolio →",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "How much does a wedding video cost?",
          a: "Wedding videography starts at 225 000 HUF. The Alap package (0–5 minute video) is 225 000 HUF, Deluxe (5–15 minutes) is 250 000 HUF and Ultra (30–60 minutes) is 400 000 HUF. Each comes with a free teaser trailer.",
        },
        {
          q: "What's the difference between Alap, Deluxe and Ultra?",
          a: "The length of the finished film: Alap is 0–5, Deluxe 5–15 and Ultra 30–60 minutes. All three are shot in 4K and come with a 30–60 second teaser trailer.",
        },
        {
          q: "Can we get the first dance, the ceremony or the speeches in full?",
          a: "Yes, for an extra fee. The first dance or a speech in full is +5 000 HUF, the ceremony in full is +10 000 HUF. We record them from one static camera position; your package stays the same.",
        },
        {
          q: "Do you charge for travel?",
          a: "There's no travel fee around Budapest, Győr and Esztergom. Elsewhere it's 5–10 000 HUF extra, agreed in advance.",
        },
        {
          q: "What style will our film be?",
          a: "You can choose from three: Standard (documentary, linear), Cinematic (with staged shots) and Office (camera moves and humour inspired by The Office, with guest interviews).",
        },
        {
          q: "Can we ask for changes to the finished film?",
          a: "Yes. After the edit you can send feedback twice, and we revise the film based on it.",
        },
      ],
    },
  },
};
