import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews, getServiceContent, getServicePoster } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { VIDEOS } from "./content";

const PATH = "/rendezveny-fotozas-videozas";
const TITLE = "Rendezvényfotózás és rendezvény videózás | StillSoul";
const DESCRIPTION =
  "Rendezvényfotózás és -videózás Budapesten, Győrben, Esztergomban: fotó, aftermovie, interjú, social videó egy csapattól. Kérj egyedi ajánlatot!";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

// JSON-LD: a GYIK a CMS-ben szerkesztett (magyar) szövegből.
const ldFor = (faq) =>
  serviceLd({
    path: PATH,
    name: "Rendezvényfotózás és rendezvény videózás",
    serviceType: "Rendezvényfotózás és -videózás",
    description: DESCRIPTION,
    faq,
    videos: VIDEOS,
  });

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

// CMS page key (lib/service-pages-schema.js)
const CMS_PAGE = "rendezveny";

const QUOTE_CATEGORY = { hu: "Esemény fotózás", en: "Event photography" };

export default async function EventPage() {
  const [items, categories, reviews, content] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
    getReviews(),
    getServiceContent(CMS_PAGE),
  ]);
  const cmsPoster = await getServicePoster(CMS_PAGE);
  const ld = ldFor(content.hu.faq.items);
  const rows = referenceRows(items, categories, [
    { category: "esemenyek", youtubeIds: VIDEOS.map((v) => v.id), title: { hu: "Rendezvényfilmek", en: "Event films" } },
    { category: "esemenyfoto" },
  ]);
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
        portfolioHref="/portfolio#row-esemenyek"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Rendezvény oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
