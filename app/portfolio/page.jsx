import Navbar from "../components/Navbar";
import PortfolioGallery from "./PortfolioGallery";
import { getPortfolioItems, getCategories } from "@/lib/portfolio";

export const metadata = {
  title: "Portfólió — Stillsoul Production",
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
    </>
  );
}
