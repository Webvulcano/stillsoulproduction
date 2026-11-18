// /portre-fotozas — az aloldal összes szövege (HU + EN) — alapérték, az Ügyfél Adminban
// szerkeszthető (lib/service-pages-schema.js); a mentett CMS-érték felülírja.
//
// FORRÁS: a főoldal Rólunk-szövege és a szolgáltatás-lista (digitális + analóg fotózás,
// céges fotózás, magánszemély fotózás), a portfólió „Portré” sora.
// ÁR: nincs publikált portré-ár (Rólunk: „az árazásunk mindig személyre szabott”)
// → az oldal egyedi árajánlatot ír, számot NEM. Ha Bencéék adnak „…-tól” árat, ide és a GYIK-ba kerüljön.

export const content = {
  hu: {
    hero: {
      eyebrow: "— Portré fotózás —",
      title: "Portré fotózás Budapesten, Győrben és Esztergomban",
      sub: "Üzleti portré, céges fotózás és kreatív portré, digitálisan vagy analóg filmre.",
      cta: "Ajánlatot kérek",
      packagesLink: "Munkáink",
      posterAlt: "Portré fotózás — StillSoul Production",
    },
    intro: {
      title: "Rólad szóljon a kép",
      paragraphs: [
        "Egy jó portré nem csak azt mutatja meg, hogy nézel ki, hanem azt is, milyen vagy. Ehhez idő kell, nyugodt hangulat és valaki, aki észreveszi, mikor engedsz el egy pillanatra a kamera előtt.",
        "Fördős Bence rendező, operatőr és fotós. Portrét fotózunk magánszemélyeknek, vállalkozóknak és cégeknek: legyen szó LinkedIn-profilról, weboldalról, sajtóanyagról vagy egyszerűen egy olyan képről, amit tényleg szívesen nézel meg.",
        "Digitálisan és analóg filmre is fotózunk. Budapesten, Győrben és Esztergomban dolgozunk, de az ország bármely pontjára és a határon túlra is elmegyünk.",
      ],
    },
    offer: {
      title: "Mit fotózunk",
      items: [
        { title: "Üzleti portré", text: "Természetes, mégis igényes kép rólad weboldalra, LinkedInre, sajtóanyagba vagy előadói profilhoz." },
        { title: "Céges fotózás", text: "A csapat, a vezetők és a munka közbeni pillanatok — hogy a céged arca a képeken is valódi legyen." },
        { title: "Kreatív portré", text: "Hangulatra, történetre épülő portré, ahol a fény, a helyszín és a stílus is a te karakteredet mutatja." },
        { title: "Analóg portré", text: "Filmre fotózott portré a különleges, időtálló hatásért. Kérheted önállóan vagy a digitális fotózás mellé." },
      ],
    },
    work: {
      title: "Portré Fotózásaink",
      portfolio: "A teljes portré-portfólió →",
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        { q: "Mennyibe kerül a portré fotózás?", a: "Minden portré fotózást egyedileg árazunk: az ár a fotózás jellegétől, hosszától, a helyszíntől és a kért képek számától függ. Írd meg az árajánlat-kérőben, mire lenne szükséged, és küldjük az ajánlatot." },
        { q: "Vállaltok üzleti portrét és céges fotózást?", a: "Igen. Fotózunk egyéni üzleti portrét (weboldalra, LinkedInre, sajtóanyagba) és céges fotózást is: csapatot, vezetőket, munka közbeni pillanatokat." },
        { q: "Kérhetek analóg portrét?", a: "Igen, digitálisan és analóg filmre is fotózunk. Az analóg képeket kérheted önállóan vagy a digitális fotózás mellé." },
        { q: "Hol fotóztok?", a: "Budapesten, Győrben és Esztergomban, de az ország bármely pontjára és a határon túlra is elmegyünk." },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Portrait photography —",
      title: "Portrait photographer in Budapest, Győr and Esztergom",
      sub: "Business headshots, corporate shoots and creative portraits — digital or on film.",
      cta: "Request a quote",
      packagesLink: "Our work",
      posterAlt: "Portrait photography — StillSoul Production",
    },
    intro: {
      title: "A picture that's really you",
      paragraphs: [
        "A good portrait shows more than what you look like — it shows who you are. That takes time, a relaxed atmosphere and someone who notices the moment you let your guard down in front of the camera.",
        "Bence Fördős is a director, cinematographer and photographer. We shoot portraits for individuals, entrepreneurs and companies — for LinkedIn, a website, a press kit, or simply a photo you'll actually enjoy looking at.",
        "We shoot both digital and analog film. We're based around Budapest, Győr and Esztergom, and happy to travel anywhere in Hungary or abroad.",
      ],
    },
    offer: {
      title: "What we shoot",
      items: [
        { title: "Business portraits", text: "Natural yet polished photos of you for your website, LinkedIn, press kit or speaker profile." },
        { title: "Corporate shoots", text: "Your team, your leaders and moments from the work itself — so your company looks as real in pictures as it is." },
        { title: "Creative portraits", text: "Portraits built around a mood or a story, where light, location and style all reflect your character." },
        { title: "Analog portraits", text: "Portraits shot on film for a distinctive, timeless look — on their own or alongside a digital shoot." },
      ],
    },
    work: {
      title: "Our portraits",
      text: "Portraits from our portfolio.",
      portfolio: "See all our portraits →",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How much does a portrait shoot cost?", a: "Every portrait shoot is quoted individually: the price depends on the type and length of the shoot, the location and the number of photos you need. Tell us what you have in mind in the quote form and we'll send you an offer." },
        { q: "Do you do business headshots and corporate shoots?", a: "Yes. We shoot individual business portraits (for websites, LinkedIn, press kits) as well as corporate shoots: teams, leaders and people at work." },
        { q: "Can I get analog portraits?", a: "Yes, we shoot both digital and analog film. You can book analog on its own or alongside a digital shoot." },
        { q: "Where do you shoot?", a: "In Budapest, Győr and Esztergom, and we're happy to travel anywhere in Hungary or abroad." },
      ],
    },
  },
};
