import Navbar from "../components/Navbar";
import ContactInfo from "../components/ContactInfo";
import JsonLd from "@/components/cms/JsonLd";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata, serviceLd, referenceRows } from "../components/service/servicePageLd";
import { getReviews, getServiceContent, getServicePoster } from "@/lib/cms-dict";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { VIDEOS } from "./content";

const PATH = "/videoklip-keszites";
const TITLE = "Videoklip készítés · klipforgatás Budapest | StillSoul";
const DESCRIPTION =
  "Videoklip készítés zenekaroknak és előadóknak: koncepció, forgatókönyv, rendezés, klipforgatás és vágás egy csapattól. Kérj egyedi ajánlatot!";

export const metadata = serviceMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

// JSON-LD: a GYIK a CMS-ben szerkesztett (magyar) szövegből.
const ldFor = (faq) =>
  serviceLd({
    path: PATH,
    name: "Videoklip készítés",
    serviceType: "Videoklip készítés",
    description: DESCRIPTION,
    faq,
    videos: VIDEOS,
  });

// ISR: a referenciák (portfólió) és az értékelések az Ügyfél Adminból jönnek.
export const revalidate = 3600;

// Egyik nyelv CMS-listájában sincs → a lista elejére kerül.
// CMS page key (lib/service-pages-schema.js)
const CMS_PAGE = "videoklip";

const QUOTE_CATEGORY = { hu: "Videoklip készítés", en: "Music video" };

export default async function MusicVideoPage() {
  const [items, categories, reviews, content] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
    getReviews(),
    getServiceContent(CMS_PAGE),
  ]);
  const cmsPoster = await getServicePoster(CMS_PAGE);
  const ld = ldFor(content.hu.faq.items);
  const rows = referenceRows(items, categories, [{ category: "videoklippek-reklamanyagok", youtubeIds: VIDEOS.map((v) => v.id), title: null }]);
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
        portfolioHref="/portfolio#row-videoklippek-reklamanyagok"
        quoteCategory={QUOTE_CATEGORY}
        reviews={reviews}
        trackLabel="Videoklip oldal: ajánlatkérés"
      />
      <ContactInfo />
    </>
  );
}
