// JSON-LD a közös szolgáltatás-aloldalakhoz (ServicePage). Csak magyarul — az SSR nyelve.
// Ár nincs: ezekre a szolgáltatásokra egyedi árajánlat van, kitalált számot nem teszünk be.
import { faqLd } from "./Faq";
import { serviceRobots } from "@/lib/features";

export const BASE_URL = "https://stillsoulproduction.hu";

// page-szintű metadata — az openGraph/twitter teljesen felülírja a layoutét, ezért minden mező újra.
export function serviceMetadata({ path, title, description }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: serviceRobots, // nem nyilvános aloldal → noindex (lib/features.js)
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: "Stillsoul Production",
      locale: "hu_HU",
      alternateLocale: "en_US",
      type: "website",
      images: [{ url: "/logo-og.png", width: 1200, height: 630, alt: "Stillsoul Production" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/logo-og.png"] },
  };
}

// videos: [{ id, name, uploadDate, duration }]
export function serviceLd({ path, name, serviceType, description, faq, videos = [] }) {
  const url = `${BASE_URL}${path}`;
  const out = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      serviceType,
      description,
      url,
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: ["Budapest", "Győr", "Esztergom"].map((n) => ({ "@type": "City", name: n })),
    },
    faqLd(faq),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Főoldal", item: BASE_URL },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];
  if (videos.length) {
    out.push(
      videos.map((v) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: v.name,
        description: v.name,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
        uploadDate: v.uploadDate,
        duration: v.duration,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
      }))
    );
  }
  return out;
}

// Referencia-sorok a portfólióból (CMS, ISR) a ReferenceRows komponenshez.
// specs: [{ category, youtubeIds?, title? }]
//   youtubeIds — csak ezek a videók, ebben a sorrendben (pl. a vegyes „Események” sorból)
//   title — { hu, en }; ha nincs megadva: a portfólió-kategória neve; null: nincs sorcím
export function referenceRows(items, categories, specs) {
  return specs
    .map((s) => {
      let list = items.filter((it) => it.categories.includes(s.category));
      if (s.youtubeIds) list = s.youtubeIds.map((id) => list.find((it) => it.youtubeId === id)).filter(Boolean);
      const cat = categories.find((c) => c.slug === s.category);
      const title = s.title !== undefined ? s.title : cat ? { hu: cat.title_hu, en: cat.title_en } : null;
      return { id: `${s.category}${s.youtubeIds ? "-valogatas" : ""}`, title, items: list };
    })
    .filter((r) => r.items.length > 0);
}

// "225 000 Ft" → 225000 (JSON-LD Offer.price). Ha nincs benne szám (pl. CMS-ben átírták "egyedi"-re): fallback.
export function priceNumber(text, fallback) {
  const n = Number(String(text ?? "").replace(/\D/g, ""));
  return n > 0 ? n : fallback;
}
