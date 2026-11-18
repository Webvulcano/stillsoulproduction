import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews, getServiceContent, getServicePoster } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { VIDEOS } from "./content";

const PATH = "/reklamfilm-keszites";
const TITLE = "Reklámfilm készítés · imázsfilm, céges videó | StillSoul";
const DESCRIPTION =
  "Reklámfilm készítés márkáknak és vállalkozásoknak: imázsfilm, céges videó, social és short videó, termékfotó. Budapest, Győr, Esztergom.";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

// JSON-LD: a GYIK a CMS-ben szerkesztett (magyar) szövegből.
const ldFor = (faq) =>
  serviceLd({
    path: PATH,
    name: "Reklámfilm készítés",
    serviceType: "Reklámfilm készítés",
    description: DESCRIPTION,
    faq,
    videos: VIDEOS,
  });

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

// CMS page key (lib/service-pages-schema.js)
const CMS_PAGE = "reklamfilm";

const QUOTE_CATEGORY = { hu: "Reklámfilm készítés", en: "Commercial production" };

export default async function CommercialPage() {
  const [items, categories, reviews, content] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
    getReviews(),
    getServiceContent(CMS_PAGE),
  ]);
  const cmsPoster = await getServicePoster(CMS_PAGE);
  const ld = ldFor(content.hu.faq.items);
  const rows = referenceRows(items, categories, [{ category: "kreativ" }, { category: "termekfotozas" }]);
  return (
    <>
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Navbar />
      <ServicePage
        content={content}
        cms={CMS_PAGE}
        rows={rows}
        poster={cmsPoster ?? `https://i.ytimg.com/vi/${VIDEOS[0].id}/maxresdefault.jpg`}
        portfolioHref="/portfolio#row-kreativ"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Reklámfilm oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
