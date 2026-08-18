import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import ContactInfo from "./components/ContactInfo";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { getSiteContent } from "@/lib/siteContent";

// ISR: statikusan cache-elt, adminban mentés után revalidatePath frissíti.
export const revalidate = 3600;

export default async function Home() {
  const [items, categories, content] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
    getSiteContent(),
  ]);
  // Mely kategóriákban van tartalom.
  const filledSlugs = new Set(items.map((it) => it.categories[0]));
  // service_key → cél-mappa slug, csak ha a mappában van elem (különben tetejére).
  const serviceTargets = {};
  for (const c of categories) {
    if (c.service_key && filledSlugs.has(c.slug)) {
      serviceTargets[c.service_key] = c.slug;
    }
  }

  return (
    <>
      <IntroOverlay />
      <Navbar />
      <div className="relative z-10 bg-black">
        <Hero />
        <About content={content.about} />
        <Services serviceTargets={serviceTargets} tiles={content.services} />
        {/* <Team /> */}
        <Contact />
        <ContactInfo />
        <div id="kapcsolat" />
      </div>
    </>
  );
}
