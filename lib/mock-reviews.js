// Csak helyi fejlesztéshez (npm run dev): példa értékelések, ha az Ügyfél Admin Értékelések modulja üres.
// Production buildben (NODE_ENV=production) nem használódik — lásd getReviews() a cms-dict.js-ben.
export const MOCK_REVIEWS = [
  {
    id: "mock-1",
    author: "Kovács Anna & Tamás",
    rating: 5,
    subtitle: { hu: "Esküvő · Esztergom", en: "Wedding · Esztergom" },
    body: {
      hu: "Bence és Hédi végig láthatatlanok voltak, mégis minden fontos pillanatot elkaptak. A kisfilmet azóta is többször megnéztük — sírtunk, nevettünk. Köszönjük!",
      en: "Bence and Hédi were invisible all day, yet they caught every important moment. We've rewatched the film many times since — we cried, we laughed. Thank you!",
    },
  },
  {
    id: "mock-2",
    author: "Nagy Réka",
    rating: 5,
    subtitle: { hu: "Marketingvezető, Győri Pékműhely", en: "Marketing lead, Győri Pékműhely" },
    body: {
      hu: "A reklámfilmünk forgatása gördülékeny volt, a végeredmény pedig felülmúlta az elvárásainkat. Az Instagram-elérésünk a kampány alatt megduplázódott.",
      en: "Shooting our ad film was smooth, and the result exceeded our expectations. Our Instagram reach doubled during the campaign.",
    },
  },
  {
    id: "mock-3",
    author: "Szabó Márton",
    rating: 4,
    subtitle: { hu: "Céges rendezvény · Budapest", en: "Corporate event · Budapest" },
    body: {
      hu: "Profi csapat, rugalmasan alkalmazkodtak a változó programhoz. Az aftermovie két nappal az esemény után már a kezünkben volt.",
      en: "A professional team that adapted flexibly to the changing schedule. We had the aftermovie two days after the event.",
    },
  },
  {
    id: "mock-4",
    author: "Tóth Lili",
    rating: 5,
    subtitle: { hu: "Portréfotózás (analóg)", en: "Portrait session (analog)" },
    body: {
      hu: "Imádom az analóg képeket! Különleges hangulatuk van, és a fotózás közben is teljesen fel tudtam oldódni.",
      en: "I love the analog photos! They have a special atmosphere, and I felt completely at ease during the shoot.",
    },
  },
  {
    id: "mock-5",
    author: "Horváth Dániel",
    rating: 5,
    subtitle: { hu: "Producer, rövidfilm", en: "Producer, short film" },
    body: {
      hu: "Eseti besegítésre kértük fel őket világosítóként és vágóként. Megbízhatóak, gyorsak, és kreatív ötletekkel is hozzátettek a filmhez.",
      en: "We brought them in as gaffer and editor. Reliable, fast, and they added creative ideas to the film too.",
    },
  },
  {
    id: "mock-6",
    author: "Fekete Zsófi",
    rating: 5,
    subtitle: { hu: "Kisállat-fotózás", en: "Pet photography" },
    body: {
      hu: "A kutyánk nem egy nyugis modell, de Bence türelmével olyan képek születtek, amiket azóta is mutogatunk mindenkinek.",
      en: "Our dog isn't exactly a calm model, but thanks to Bence's patience we got photos we keep showing everyone.",
    },
  },
  {
    id: "mock-7",
    author: "Varga Péter",
    rating: 4,
    subtitle: { hu: "Social media tartalom", en: "Social media content" },
    body: {
      hu: "Havi rendszerességgel készítenek nekünk rövid videókat. Mindig időben szállítanak, és értik, mi működik a közösségi médiában.",
      en: "They make short videos for us every month. Always on time, and they understand what works on social media.",
    },
  },
];
