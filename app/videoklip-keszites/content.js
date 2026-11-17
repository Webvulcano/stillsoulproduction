// /videoklip-keszites — az aloldal összes szövege (HU + EN). Nem CMS-ből jön.
//
// FORRÁS: főoldal (Rólunk: videoklip; csapat: Fördős Bence rendező-operatőr, Dudás Hédi vágó-
// forgatókönyvíró; eseti filmes besegítés: világosító, látványtervező, art director), portfólió
// „Videoklippek, reklámanyagok” sora (ADDIKTÍV, MESSZIRE VELE).
// ÁR: nincs publikált klip-ár → egyedi árajánlat, számot NEM írunk.
// VIDEÓK: uploadDate + hossz a YouTube-oldalról (2026-11-17).

export const VIDEOS = [
  { key: "addiktiv", id: "0PaDX78NPkw", name: "ADDIKTÍV — videoklip", uploadDate: "2026-09-12T09:00:06-07:00", duration: "PT4M8S" },
  { key: "messzire", id: "kIAj_FlHhOM", name: "MESSZIRE VELE — videoklip", uploadDate: "2026-09-30T09:00:08-07:00", duration: "PT4M40S" },
];

export const content = {
  hu: {
    hero: {
      eyebrow: "— Videoklip készítés —",
      title: "Videoklip készítés zenekaroknak és előadóknak",
      sub: "Ötlettől a kész klipig: koncepció, forgatás, vágás egy csapattól.",
      cta: "Ajánlatot kérek",
      packagesLink: "Klipjeink",
      posterAlt: "ADDIKTÍV videoklip",
    },
    intro: {
      title: "A dalod, képekben",
      paragraphs: [
        "Egy jó videoklip nem illusztrálja a dalt, hanem továbbviszi: saját világot ad neki, amit a hallgató a zenéhez köt. Ezt a világot közösen találjuk ki veled, a dal hangulatából indulva.",
        "Fördős Bence rendező és operatőr, Dudás Hédi vágó és forgatókönyvíró. Filmes háttérrel dolgozunk, így a klipforgatás minden része egy kézben marad: a koncepció, a forgatókönyv, a rendezés, a képi világ és a vágás.",
        "Budapesten, Győrben és Esztergomban dolgozunk, de az ország bármely pontjára és a határon túlra is elmegyünk forgatni.",
      ],
    },
    offer: {
      title: "Mit vállalunk",
      items: [
        { title: "Koncepció és forgatókönyv", text: "A dalból indulunk: közösen kitaláljuk a klip történetét, hangulatát és képi világát." },
        { title: "Rendezés és operatőri munka", text: "A forgatáson a rendező és az operatőr egy ember, így a kép pontosan azt mutatja, amit elterveztünk." },
        { title: "Látvány és fény", text: "Helyszín, berendezés, világítás — filmes szemlélettel, hogy a klip egységes világot kapjon." },
        { title: "Vágás és utómunka", text: "A vágásnál a zene ritmusa vezet: a felvételekből így áll össze a kész videoklip." },
      ],
    },
    work: {
      title: "Klipjeink",
      portfolio: "Klipek és reklámanyagok a portfólióban →",
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        { q: "Mennyibe kerül egy videoklip?", a: "Minden klipet egyedileg árazunk: az ár a koncepciótól, a forgatási napok számától, a helyszínektől és a szereplőktől függ. Írd meg az árajánlat-kérőben a dalt és az elképzelésedet, és küldjük az ajánlatot." },
        { q: "Segítetek kitalálni a klip ötletét?", a: "Igen. A koncepciót és a forgatókönyvet közösen dolgozzuk ki veled, a dal hangulatából indulva — de ha már van kész elképzelésed, abból is dolgozunk." },
        { q: "Mit tartalmaz a klipforgatás?", a: "A koncepciót, a forgatókönyvet, a rendezést és az operatőri munkát, a forgatást és a vágást. A pontos tartalmat az ajánlatban rögzítjük." },
        { q: "Hol forgattok?", a: "Budapesten, Győrben és Esztergomban, de az ország bármely pontjára és a határon túlra is elmegyünk." },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Music video production —",
      title: "Music video production for bands and artists",
      sub: "From idea to final cut: concept, shoot and edit from one team.",
      cta: "Request a quote",
      packagesLink: "Our videos",
      posterAlt: "ADDIKTÍV music video",
    },
    intro: {
      title: "Your song, in pictures",
      paragraphs: [
        "A good music video doesn't just illustrate a song — it takes it further, giving it a world of its own that listeners connect with the music. We build that world together with you, starting from the mood of the track.",
        "Bence Fördős is a director and cinematographer; Hédi Dudás is an editor and screenwriter. We come from film, so every part of the shoot stays in one pair of hands: concept, script, direction, visual style and edit.",
        "We're based around Budapest, Győr and Esztergom, and happy to travel anywhere in Hungary or abroad to shoot.",
      ],
    },
    offer: {
      title: "What we do",
      items: [
        { title: "Concept & script", text: "We start from the song and work out the story, mood and look of the video together." },
        { title: "Direction & cinematography", text: "Director and cinematographer are the same person on set, so the image shows exactly what we planned." },
        { title: "Art direction & lighting", text: "Location, set dressing and lighting — with a filmmaker's eye, so the video has one coherent world." },
        { title: "Editing & post", text: "The rhythm of the music leads the edit — that's how the footage becomes the finished video." },
      ],
    },
    work: {
      title: "Our music videos",
      text: "Music videos we've made.",
      portfolio: "Music videos and commercials in our portfolio →",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How much does a music video cost?", a: "Every music video is quoted individually: the price depends on the concept, the number of shooting days, locations and cast. Send us the song and your idea in the quote form and we'll get back to you with an offer." },
        { q: "Can you help come up with the idea?", a: "Yes. We develop the concept and script together with you, starting from the mood of the song — or we can work from an idea you already have." },
        { q: "What does a music video shoot include?", a: "Concept, script, direction and cinematography, the shoot itself and the edit. The exact scope is set out in the offer." },
        { q: "Where do you shoot?", a: "In Budapest, Győr and Esztergom, and we're happy to travel anywhere in Hungary or abroad." },
      ],
    },
  },
};
