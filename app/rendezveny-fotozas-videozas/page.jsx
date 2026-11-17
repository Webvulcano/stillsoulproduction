import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { content, VIDEOS } from "./content";

const PATH = "/rendezveny-fotozas-videozas";
const TITLE = "Rendezvényfotózás és rendezvény videózás | StillSoul";
const DESCRIPTION =
  "Rendezvényfotózás és -videózás Budapesten, Győrben, Esztergomban: fotó, aftermovie, interjú, social videó egy csapattól. Kérj egyedi ajánlatot!";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const ld = serviceLd({
  path: PATH,
  name: "Rendezvényfotózás és rendezvény videózás",
  serviceType: "Rendezvényfotózás és -videózás",
  description: DESCRIPTION,
  faq: content.hu.faq.items,
  videos: VIDEOS,
});

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

const QUOTE_CATEGORY = { hu: "Esemény fotózás", en: "Event photography" };

export default async function EventPage() {
  const [items, categories, reviews] = await Promise.all([getPortfolioItems(), getCategories(), getReviews()]);
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
        rows={rows}
        poster={`https://i.ytimg.com/vi/${VIDEOS[0].id}/maxresdefault.jpg`}
        portfolioHref="/portfolio#row-esemenyek"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Rendezvény oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
