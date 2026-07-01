import Navbar from "../components/Navbar";
import PortfolioGallery from "./PortfolioGallery";

export const metadata = {
  title: "Portfólió — Stillsoul Production",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <PortfolioGallery />
    </>
  );
}
