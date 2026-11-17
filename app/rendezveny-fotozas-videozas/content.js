// /rendezveny-fotozas-videozas — az aloldal összes szövege (HU + EN). Nem CMS-ből jön.
//
// FORRÁS: főoldal (szolgáltatások: események/rendezvények; árajánlat-kategóriák: esemény fotózás,
// esemény videózás), portfólió „Események” sora (X. Bencés Bál 2023, Alexander Trauner Art/Film
// Festival aftermovie + interjú) és „Eseményfotózás” sora.
// ÁR: nincs publikált rendezvény-ár → egyedi árajánlat, számot NEM írunk.
// VIDEÓK: uploadDate + hossz a YouTube-oldalról (2026-11-17).

export const VIDEOS = [
  { key: "trauner", id: "puLMxznpAig", name: "Alexander Trauner Art/Film Festival — Aftermovie", uploadDate: "2026-06-18T13:30:46-07:00", duration: "PT2M9S" },
  { key: "bal", id: "TVImxfQdd_E", name: "X. Bencés Bál, 2023", uploadDate: "2023-10-10T12:22:20-07:00", duration: "PT2M59S" },
  { key: "interju", id: "kkxBILFiyH4", name: "Alexander Trauner Art/Film Festival — Interjú", uploadDate: "2026-06-18T13:34:16-07:00", duration: "PT1M19S" },
];

export const content = {
  hu: {
    hero: {
      eyebrow: "— Rendezvényfotózás és -videózás —",
      title: "Rendezvényfotózás és rendezvény videózás",
      sub: "Fesztivál, bál, céges esemény: fotó, aftermovie és interjú egy csapattól.",
      cta: "Ajánlatot kérek",
      packagesLink: "Munkáink",
      posterAlt: "Alexander Trauner Art/Film Festival aftermovie",
    },
    intro: {
      title: "Az esemény, ahogy megélték",
      paragraphs: [
        "Egy rendezvény néhány óra alatt lezajlik, a hangulata viszont képekben és filmben megmaradhat. Mi azt keressük, amitől az estétek a sajátotok: az arcokat, a gesztusokat, a színpadot és a közönséget, a nagy pillanatokat és a csendeseket is.",
        "Fotózunk és videózunk is, így egy csapattal kapjátok meg mindkettőt. Fördős Bence rendező, operatőr és fotós, Dudás Hédi vágó és forgatókönyvíró — ezért nem csak felvesszük az eseményt, hanem történetet is vágunk belőle.",
        "Budapesten, Győrben és Esztergomban dolgozunk, de az ország bármely pontjára és a határon túlra is elmegyünk.",
      ],
    },
    offer: {
      title: "Mit készítünk",
      items: [
        { title: "Rendezvényfotózás", text: "Riportfotók az egész eseményről: a vendégek, a fellépők, a részletek és a hangulat." },
        { title: "Aftermovie", text: "Rövid, hangulatos összefoglaló film, amit a rendezvény után megoszthattok a közösségi médiában és a weboldalatokon." },
        { title: "Interjúk", text: "Beszélgetés a szervezőkkel, fellépőkkel vagy vendégekkel — hogy az esemény mögötti gondolat is hallható legyen." },
        { title: "Social tartalom", text: "Rövid, álló formátumú videók Reelsre, TikTokra és Shortsra, az esemény előtt és után is." },
      ],
    },
    work: {
      title: "Rendezvényeink",
      portfolio: "Az összes rendezvény a portfólióban →",
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        { q: "Mennyibe kerül a rendezvényfotózás vagy -videózás?", a: "Minden rendezvényt egyedileg árazunk: az ár az esemény hosszától, a helyszíntől és attól függ, hogy fotót, videót vagy mindkettőt kértek. Írd meg az árajánlat-kérőben az esemény részleteit, és küldjük az ajánlatot." },
        { q: "Kérhetünk fotót és videót is egyszerre?", a: "Igen, fotózunk és videózunk is, így egy csapattól kapjátok meg mindkettőt." },
        { q: "Milyen rendezvényeken dolgoztatok már?", a: "Például az Alexander Trauner Art/Film Festivalon (aftermovie és interjú) és a X. Bencés Bálon. A többit a portfóliónkban találod." },
        { q: "Készítetek rövid videót social mediára is?", a: "Igen, álló formátumú rövid videókat is készítünk Reelsre, TikTokra és Shortsra." },
        { q: "Hol vállaltok rendezvényt?", a: "Budapesten, Győrben és Esztergomban, de az ország bármely pontjára és a határon túlra is elmegyünk." },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Event photography & videography —",
      title: "Event photography and videography",
      sub: "Festivals, balls, corporate events: photos, aftermovie and interviews from one team.",
      cta: "Request a quote",
      packagesLink: "Our work",
      posterAlt: "Alexander Trauner Art/Film Festival aftermovie",
    },
    intro: {
      title: "The event, as it was lived",
      paragraphs: [
        "An event is over in a few hours, but its atmosphere can live on in photos and film. We look for what makes your night your own: the faces and gestures, the stage and the crowd, the big moments and the quiet ones.",
        "We do both photo and video, so you get both from one team. Bence Fördős is a director, cinematographer and photographer; Hédi Dudás is an editor and screenwriter — so we don't just record your event, we cut a story out of it.",
        "We're based around Budapest, Győr and Esztergom, and happy to travel anywhere in Hungary or abroad.",
      ],
    },
    offer: {
      title: "What we make",
      items: [
        { title: "Event photography", text: "Documentary-style photos of the whole event: guests, performers, details and atmosphere." },
        { title: "Aftermovie", text: "A short, atmospheric recap film to share on social media and your website after the event." },
        { title: "Interviews", text: "Conversations with organisers, performers or guests — so the idea behind the event is heard too." },
        { title: "Social content", text: "Short vertical videos for Reels, TikTok and Shorts, before and after the event." },
      ],
    },
    work: {
      title: "Our events",
      text: "Festivals, balls and other events we've worked on.",
      portfolio: "See all events in our portfolio →",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How much does event photography or videography cost?", a: "Every event is quoted individually: the price depends on the length of the event, the location and whether you need photo, video or both. Send us the details in the quote form and we'll get back to you with an offer." },
        { q: "Can we book photo and video together?", a: "Yes, we do both, so you get photos and video from one team." },
        { q: "What events have you worked on?", a: "For example the Alexander Trauner Art/Film Festival (aftermovie and interviews) and the X. Bencés Bál (Benedictine Ball). You'll find more in our portfolio." },
        { q: "Do you make short videos for social media?", a: "Yes, we also make short vertical videos for Reels, TikTok and Shorts." },
        { q: "Where do you cover events?", a: "In Budapest, Győr and Esztergom, and we're happy to travel anywhere in Hungary or abroad." },
      ],
    },
  },
};
