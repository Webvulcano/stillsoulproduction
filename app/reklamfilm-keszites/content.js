// /reklamfilm-keszites — az aloldal összes szövege (HU + EN). Nem CMS-ből jön.
//
// FORRÁS: főoldal (szolgáltatások: brand-építés & reklámanyag, kreatív tartalomgyártás — social,
// short video; árajánlat-kategóriák: reklámfilm készítés, social média tartalomgyártás, márka
// megkeresés), portfólió „Kreatív” sora (OM-5 Mark II, NobelBiocare, ÉRTED Hallásgondozó …) és
// „Termékfotózás” sora.
// ÁR: nincs publikált reklámfilm-ár → egyedi árajánlat, számot NEM írunk.
// VIDEÓK: uploadDate + hossz a YouTube-oldalról (2026-11-17).

export const VIDEOS = [
  { key: "om5", id: "521LfNF1cHs", name: "OM-5 Mark II Adventure Pack", uploadDate: "2026-06-18T13:29:47-07:00", duration: "PT17S" },
  { key: "nobel", id: "UD3eBhcmtB0", name: "NobelBiocare — short", uploadDate: "2026-08-16T00:15:22-07:00", duration: "PT36S" },
  { key: "erted", id: "BWlLNcjHauE", name: "ÉRTED Hallásgondozó — short", uploadDate: "2026-09-28T05:03:33-07:00", duration: "PT1M23S" },
];

export const content = {
  hu: {
    hero: {
      eyebrow: "— Reklámfilm készítés —",
      title: "Reklámfilm és céges videó készítés",
      sub: "Reklámfilm, imázsfilm, social és short videó, termékfotó — márkáknak és vállalkozásoknak.",
      cta: "Ajánlatot kérek",
      packagesLink: "Munkáink",
      posterAlt: "OM-5 Mark II Adventure Pack reklámvideó",
    },
    intro: {
      title: "A márkád története, filmen",
      paragraphs: [
        "Egy jó reklámfilm nem csak elmondja, mit csinálsz, hanem megmutatja, miért érdemes téged választani. Mi ehhez képi történetet építünk: a márkád hangulatából, a termékből és az emberekből, akik mögötte állnak.",
        "Fördős Bence rendező, operatőr és fotós, Dudás Hédi vágó és forgatókönyvíró. Filmes háttérrel dolgozunk, így a reklámfilm készítés minden lépése egy csapatnál marad: az ötlet, a forgatókönyv, a forgatás és a vágás.",
        "Dolgoztunk már fotós és optikai márkáknak, egészségügyi szolgáltatóknak és helyi vállalkozásoknak is. Budapesten, Győrben és Esztergomban forgatunk, de az ország bármely pontjára és a határon túlra is elmegyünk.",
      ],
    },
    offer: {
      title: "Mit készítünk",
      items: [
        { title: "Reklámfilm", text: "Rövid, ütős film egy termékről, szolgáltatásról vagy kampányról — weboldalra, hirdetésbe, social mediára." },
        { title: "Imázsfilm és céges videó", text: "Bemutatja a céget, a csapatot és azt, ahogy dolgoztok — hogy a megrendelőid már az első találkozás előtt ismerjenek." },
        { title: "Social és short videó", text: "Álló formátumú rövid videók Reelsre, TikTokra és Shortsra, rendszeres tartalomgyártásra is." },
        { title: "Termékfotó", text: "Fotók a termékeidről webshopba, katalógusba és hirdetésbe, a videókkal egységes képi világban." },
      ],
    },
    work: {
      title: "Munkáink",
      portfolio: "Az összes kreatív munkánk a portfólióban →",
    },
    faq: {
      title: "Gyakori kérdések",
      items: [
        { q: "Mennyibe kerül egy reklámfilm?", a: "Minden reklámfilmet egyedileg árazunk: az ár a film hosszától és céljától, a forgatási napok számától és a helyszínektől függ. Írd meg az árajánlat-kérőben, mit szeretnél bemutatni, és küldjük az ajánlatot." },
        { q: "Mi a különbség a reklámfilm és az imázsfilm között?", a: "A reklámfilm általában egy terméket, szolgáltatást vagy kampányt népszerűsít, az imázsfilm magát a céget mutatja be: a csapatot, az értékeket és azt, ahogy dolgoztok. Mindkettőt vállaljuk." },
        { q: "Készítetek rövid videókat social mediára?", a: "Igen, álló formátumú rövid videókat is készítünk Reelsre, TikTokra és Shortsra, egyszeri kampányhoz és rendszeres tartalomgyártáshoz is." },
        { q: "Vállaltok termékfotózást is?", a: "Igen. A termékfotók a videókkal együtt is kérhetők, így a márkád képi világa egységes marad." },
        { q: "Hol forgattok?", a: "Budapesten, Győrben és Esztergomban, de az ország bármely pontjára és a határon túlra is elmegyünk." },
      ],
    },
  },

  en: {
    hero: {
      eyebrow: "— Commercial production —",
      title: "Commercials and corporate video production",
      sub: "Commercials, brand films, social and short-form video, product photography — for brands and businesses.",
      cta: "Request a quote",
      packagesLink: "Our work",
      posterAlt: "OM-5 Mark II Adventure Pack promo video",
    },
    intro: {
      title: "Your brand's story, on film",
      paragraphs: [
        "A good commercial doesn't just say what you do — it shows why people should choose you. We build a visual story for that: from the feel of your brand, your product and the people behind it.",
        "Bence Fördős is a director, cinematographer and photographer; Hédi Dudás is an editor and screenwriter. We come from film, so every step stays with one team: the idea, the script, the shoot and the edit.",
        "We've worked with photo and optics brands, healthcare providers and local businesses. We shoot around Budapest, Győr and Esztergom, and we're happy to travel anywhere in Hungary or abroad.",
      ],
    },
    offer: {
      title: "What we make",
      items: [
        { title: "Commercials", text: "Short, punchy films about a product, service or campaign — for your website, ads and social media." },
        { title: "Brand & corporate films", text: "Showing your company, your team and the way you work — so clients know you before you've even met." },
        { title: "Social & short-form", text: "Vertical short videos for Reels, TikTok and Shorts, including ongoing content production." },
        { title: "Product photography", text: "Photos of your products for your webshop, catalogue and ads, in the same visual style as your videos." },
      ],
    },
    work: {
      title: "Our work",
      text: "Commercial and social videos and product photos for brands we've worked with.",
      portfolio: "See all our creative work in the portfolio →",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How much does a commercial cost?", a: "Every commercial is quoted individually: the price depends on the length and purpose of the film, the number of shooting days and the locations. Tell us what you'd like to show in the quote form and we'll send you an offer." },
        { q: "What's the difference between a commercial and a brand film?", a: "A commercial usually promotes a product, service or campaign; a brand film introduces the company itself — the team, the values and the way you work. We make both." },
        { q: "Do you make short videos for social media?", a: "Yes, we make vertical short videos for Reels, TikTok and Shorts, for one-off campaigns and ongoing content alike." },
        { q: "Do you also do product photography?", a: "Yes. Product photos can be booked together with video, so your brand's visual style stays consistent." },
        { q: "Where do you shoot?", a: "In Budapest, Győr and Esztergom, and we're happy to travel anywhere in Hungary or abroad." },
      ],
    },
  },
};
