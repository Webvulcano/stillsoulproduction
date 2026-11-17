import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { content } from "./content";

const PATH = "/portre-fotozas";
const TITLE = "Portré fotózás Budapest · üzleti és céges fotó | StillSoul";
const DESCRIPTION =
  "Portré fotózás Budapesten, Győrben és Esztergomban: üzleti portré, céges fotózás, kreatív és analóg portré. Kérj egyedi árajánlatot!";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const ld = serviceLd({ path: PATH, name: "Portré fotózás", serviceType: "Portré fotózás", description: DESCRIPTION, faq: content.hu.faq.items });

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

const QUOTE_CATEGORY = { hu: "Magánszemély fotózás", en: "Personal photography" };

export default async function PortraitPage() {
  const [items, categories, reviews] = await Promise.all([getPortfolioItems(), getCategories(), getReviews()]);
  const rows = referenceRows(items, categories, [{ category: "portre", title: null }]);
  return (
    <>
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Navbar />
      <ServicePage
        content={content}
        rows={rows}
        poster={rows[0]?.items[0]?.image ?? "/logo-og.png"}
        portfolioHref="/portfolio#row-portre"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Portré oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
