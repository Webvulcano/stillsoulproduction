// Snapshot of the live site's own admin content (site_content table, 2026-10-09).
// Used only as CMS defaults in cms.manifest.js, so the CMS copy starts out
// identical to the live site. Not read at runtime.

import { media } from "./media.js";

export const LIVE_ABOUT = {
  title_hu: "Rólunk",
  title_en: "About us",
  p1_hu:
    "A StillSoul Production egy kreatív tartalmakat gyártó csapat. Legyen szó márka megkeresésről, reklámfilmről, videoklippről, social média tartalom gyártásáról, kreatív fotózásról vagy céges eseményről, fordulj hozzánk bizalommal. Az ország bármely pontjára, illetve határon kívülre is elmegyünk. Nálunk a vevői igények az elsők, ezért az árazásunk is mindig személyre szabott.",
  p1_en:
    "StillSoul Production is a creative content production team. Whether you’re looking for brand content, commercials, music videos, social media content, creative photography, or corporate events, feel free to get in touch with us. Our clients’ needs always come first, which is why our pricing is tailored to each project.",
  p2_hu: "",
  p2_en: "",
  p3_hu: "Minden munkánk alapja az alkotás szeretete, az őszinte kapcsolódás és a maradandó vizuális élmények létrehozása.",
  p3_en: "All our work is rooted in the love of creating, honest connection, and crafting lasting visual experiences.",
  top_photos: [
    media("/about/top-01.jpg"),
    media("/about/top-02.jpg"),
    media("/about/top-03.jpg"),
    media("/about/top-04.jpg"),
    media("/about/top-05.jpg"),
    media("/about/top-06.jpg"),
  ],
  bottom_photos: [
    media("/about/01.jpg"),
    media("/about/02.jpg"),
    media("/about/03.jpg"),
    media("/about/04.jpg"),
    media("/about/05.jpg"),
    media("/about/06.jpg"),
  ],
};

export const LIVE_SERVICES = [
  {
    slug: "foto",
    title_hu: "Digitális és analóg fotózás",
    title_en: "Digital & analog photography",
    details_hu: "",
    details_en: "",
    image_url: media("/services/1.jpeg"),
  },
  {
    slug: "brand",
    title_hu: "Videóklippek & reklámanyagok",
    title_en: "Video clips & promotional materials",
    details_hu: "",
    details_en: "",
    image_url: media("/services/2.jpg"),
  },
  {
    slug: "kreativ",
    title_hu: "Kreatív tartalomgyártás & short videók",
    title_en: "Creative content production & short videos",
    details_hu: "",
    details_en: "",
    image_url: media("/services/3.jpg"),
  },
  {
    slug: "esemenyek",
    title_hu: "Esküvők és rendezvények",
    title_en: "Weddings & Events",
    details_hu: "",
    details_en: "",
    image_url: media("/services/4.jpg"),
  },
  {
    slug: "filmes",
    title_hu: "Eseti megkeresések filmes munkákban",
    title_en: "Film crew support",
    details_hu: "(vágó, rendezőasszisztens, gyártásvezető, világosító, látványtervező, art director, berendező)",
    details_en: "(editor, assistant director, line producer, gaffer, set designer, art director, set dresser)",
    image_url: media("/services/5.jpg"),
  },
  {
    slug: "film",
    title_hu: "Dokumentumfilm és fikciós játékfilmek",
    title_en: "Documentary & fiction filmmaking",
    details_hu: "",
    details_en: "",
    image_url: media("/services/6.jpg"),
  },
];
