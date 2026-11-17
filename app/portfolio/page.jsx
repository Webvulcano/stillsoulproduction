import Navbar from "../components/Navbar";
import LegalLinks from "../components/LegalLinks";
import PortfolioGallery from "./PortfolioGallery";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";

export const metadata = {
  title: "Portfólió: videók és fotók · StillSoul Production",
  description:
    "StillSoul Production portfóliója: esküvői és rendezvény videók, reklámfilmek, videoklipek, portré- és analóg fotók.",
  alternates: { canonical: "/portfolio" },
};

// ISR: statikusan cache-elt, adminban mentés után revalidatePath frissíti.
export const revalidate = 3600;

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getCategories(),
  ]);
  return (
    <>
      <Navbar />
      <PortfolioGallery items={items} categories={categories} />
      <LegalLinks />
    </>
  );
}
