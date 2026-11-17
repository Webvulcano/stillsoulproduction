import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import WeddingVideo from "./WeddingVideo";
import { faqLd } from "../components/service/Faq";
import { content, PACKAGES, VIDEOS, ytThumb } from "./content";
import { getPackages, getReviews } from "@/lib/cms-dict";

const BASE_URL = "https://stillsoulproduction.hu";
const PAGE_URL = `${BASE_URL}/eskuvoi-videozas`;
const TITLE = "Esküvői videós Budapest · árak 225 000 Ft-tól | StillSoul";
const DESCRIPTION =
  "Esküvői videós Budapesten, Győrben és Esztergomban. 4K esküvői film ajándék teaser-trailerrel, három stílusban. Csomagok és árak 225 000 Ft-tól.";

// A page-szintű openGraph/twitter teljesen felülírja a layoutét → minden mezőt újra megadunk.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/eskuvoi-videozas" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Stillsoul Production",
    locale: "hu_HU",
    alternateLocale: "en_US",
    type: "website",
    images: [{ url: "/logo-og.png", width: 1200, height: 630, alt: "Stillsoul Production" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo-og.png"],
  },
};

// Strukturált adat — csak magyarul (az SSR nyelve).
const hu = content.hu;
const CITIES = ["Budapest", "Győr", "Esztergom"].map((name) => ({ "@type": "City", name }));

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Esküvői videózás",
  serviceType: "Esküvői videózás",
  description: DESCRIPTION,
  url: PAGE_URL,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: CITIES,
  offers: PACKAGES.map((p, i) => ({
    "@type": "Offer",
    name: `${p.name} csomag`,
    description: `${hu.packages.items[i].length} + ${hu.packages.giftLabel.toLowerCase()}`,
    price: p.price,
    priceCurrency: "HUF",
    url: `${PAGE_URL}#csomagok`,
  })),
};

const faqData = faqLd(hu.faq.items);

// Minden referencia-videó (content.js VIDEOS) külön VideoObject.
const videoLd = Object.values(VIDEOS).map((v) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.name,
  description: `${v.name}. StillSoul Production esküvői videózás.`,
  thumbnailUrl: ytThumb(v.id),
  uploadDate: v.uploadDate,
  duration: v.duration,
  embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
}));

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Főoldal", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Esküvői videózás", item: PAGE_URL },
  ],
};

// ISR: a letölthető PDF-ek (árlista) az Ügyfél Admin Csomagok moduljából jönnek.
export const revalidate = 3600;

export default async function WeddingVideoPage() {
  const [packages, reviews] = await Promise.all([getPackages(), getReviews()]);
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqData} />
      <JsonLd data={videoLd} />
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <WeddingVideo packages={packages} reviews={reviews} />
      <ContactInfo />
    </>
  );
}
