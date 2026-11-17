import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { content, VIDEOS } from "./content";

const PATH = "/reklamfilm-keszites";
const TITLE = "Reklámfilm készítés · imázsfilm, céges videó | StillSoul";
const DESCRIPTION =
  "Reklámfilm készítés márkáknak és vállalkozásoknak: imázsfilm, céges videó, social és short videó, termékfotó. Budapest, Győr, Esztergom.";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const ld = serviceLd({
  path: PATH,
  name: "Reklámfilm készítés",
  serviceType: "Reklámfilm készítés",
  description: DESCRIPTION,
  faq: content.hu.faq.items,
  videos: VIDEOS,
});

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

const QUOTE_CATEGORY = { hu: "Reklámfilm készítés", en: "Commercial production" };

export default async function CommercialPage() {
  const [items, categories, reviews] = await Promise.all([getPortfolioItems(), getCategories(), getReviews()]);
  const rows = referenceRows(items, categories, [{ category: "kreativ" }, { category: "termekfotozas" }]);
  return (
    <>
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Navbar />
      <ServicePage
        content={content}
        rows={rows}
        poster={`https://i.ytimg.com/vi/${VIDEOS[0].id}/maxresdefault.jpg`}
        portfolioHref="/portfolio#row-kreativ"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Reklámfilm oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
