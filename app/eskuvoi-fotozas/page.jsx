import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import { faqLd } from "../components/service/Faq";
import { getPackages, getReviews } from "@/lib/cms-dict";
import WeddingPhoto from "./WeddingPhoto";
import { content, PACKAGES } from "./content";

const BASE_URL = "https://stillsoulproduction.hu";
const PAGE_URL = `${BASE_URL}/eskuvoi-fotozas`;
const TITLE = "Esküvői fotózás árak 200 000 Ft-tól · Budapest | StillSoul";
const DESCRIPTION =
  "Esküvői fotós Budapesten, Győrben és Esztergomban. 100–500 utómunkázott fotó, kreatív fotózás, fotó + videó kedvezmény. Csomagok és árak 200 000 Ft-tól.";

// A page-szintű openGraph/twitter teljesen felülírja a layoutét → minden mezőt újra megadunk.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/eskuvoi-fotozas" },
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

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Esküvői fotózás",
  serviceType: "Esküvői fotózás",
  description: DESCRIPTION,
  url: PAGE_URL,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: ["Budapest", "Győr", "Esztergom"].map((name) => ({ "@type": "City", name })),
  offers: PACKAGES.map((p) => ({
    "@type": "Offer",
    name: `${p.name} csomag`,
    description: `${p.photos} db utómunkázott fotó`,
    price: p.price,
    priceCurrency: "HUF",
    url: `${PAGE_URL}#csomagok`,
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Főoldal", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Esküvői fotózás", item: PAGE_URL },
  ],
};

// ISR: a letölthető PDF-ek és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

export default async function WeddingPhotoPage() {
  const [packages, reviews] = await Promise.all([getPackages(), getReviews()]);
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd(hu.faq.items)} />
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <WeddingPhoto packages={packages} reviews={reviews} />
      <ContactInfo />
    </>
  );
}
