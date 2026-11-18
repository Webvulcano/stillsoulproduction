import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import { serviceRobots } from "@/lib/features";
import WeddingVideo from "./WeddingVideo";
import { faqLd } from "../components/service/Faq";
import { PACKAGES, VIDEOS, ytThumb } from "./content";
import { getPackages, getReviews, getServiceContent } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { referenceRows, priceNumber } from "../components/service/servicePageLd";

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
  robots: serviceRobots, // nem nyilvános aloldal → noindex (lib/features.js)
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

// Strukturált adat — csak magyarul (az SSR nyelve), a CMS-ben szerkesztett szövegből.
const CITIES = ["Budapest", "Győr", "Esztergom"].map((name) => ({ "@type": "City", name }));

const serviceLdFor = (hu) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Esküvői videózás",
  serviceType: "Esküvői videózás",
  description: DESCRIPTION,
  url: PAGE_URL,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: CITIES,
  offers: hu.packages.items.map((p, i) => ({
    "@type": "Offer",
    name: `${p.name} csomag`,
    description: `${p.length} + ${hu.packages.giftLabel.toLowerCase()}`,
    price: priceNumber(p.price, PACKAGES[i]?.price),
    priceCurrency: "HUF",
    url: `${PAGE_URL}#csomagok`,
  })),
});

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
  const [packages, reviews, items, categories, content] = await Promise.all([
    getPackages(),
    getReviews(),
    getPortfolioItems(),
    getCategories(),
    getServiceContent("eskuvoi_videozas"),
  ]);
  const hu = content.hu;
  // Referenciák: az esküvői filmek a portfólió „Események” sorából, a VIDEOS sorrendjében.
  const rows = referenceRows(items, categories, [
    { category: "esemenyek", youtubeIds: Object.values(VIDEOS).map((v) => v.id), title: null },
  ]);
  return (
    <>
      <JsonLd data={serviceLdFor(hu)} />
      <JsonLd data={faqLd(hu.faq.items)} />
      <JsonLd data={videoLd} />
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <WeddingVideo content={content} packages={packages} reviews={reviews} rows={rows} />
      <ContactInfo />
    </>
  );
}
