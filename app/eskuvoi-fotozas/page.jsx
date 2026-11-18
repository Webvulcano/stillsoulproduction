import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import { serviceRobots } from "@/lib/features";
import { faqLd } from "../components/service/Faq";
import { getPackages, getReviews, getServiceContent, getServicePoster } from "@/lib/cms-dict";
import { priceNumber } from "../components/service/servicePageLd";
import WeddingPhoto from "./WeddingPhoto";
import { PACKAGES } from "./content";

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

const serviceLdFor = (hu) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Esküvői fotózás",
  serviceType: "Esküvői fotózás",
  description: DESCRIPTION,
  url: PAGE_URL,
  provider: { "@id": `${BASE_URL}/#business` },
  areaServed: ["Budapest", "Győr", "Esztergom"].map((name) => ({ "@type": "City", name })),
  offers: hu.packages.items.map((p, i) => ({
    "@type": "Offer",
    name: `${p.name} csomag`,
    description: p.photos,
    price: priceNumber(p.price, PACKAGES[i]?.price),
    priceCurrency: "HUF",
    url: `${PAGE_URL}#csomagok`,
  })),
});

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
  const [packages, reviews, content] = await Promise.all([getPackages(), getReviews(), getServiceContent("eskuvoi_fotozas")]);
  const poster = await getServicePoster("eskuvoi_fotozas");
  const hu = content.hu;
  return (
    <>
      <JsonLd data={serviceLdFor(hu)} />
      <JsonLd data={faqLd(hu.faq.items)} />
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <WeddingPhoto content={content} poster={poster} packages={packages} reviews={reviews} />
      <ContactInfo />
    </>
  );
}
