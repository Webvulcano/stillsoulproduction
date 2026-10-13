import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import ContactInfo from "./components/ContactInfo";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";
import { getSectionImages } from "@/lib/cms-dict";

// ISR: statikusan cache-elt; az Ügyfél Admin mentés után a cms:<slug> taget frissíti.
export const revalidate = 3600;

export default async function Home() {
  const [items, categories, aboutImages, serviceImages] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
    getSectionImages("about"),
    getSectionImages("services"),
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
        <About photos={aboutImages} />
        <Services serviceTargets={serviceTargets} images={serviceImages} />
        {/* <Team /> */}
        <Contact />
        <ContactInfo />
        <div id="kapcsolat" />
      </div>
    </>
  );
}
