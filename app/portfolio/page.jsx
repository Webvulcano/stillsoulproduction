import { Suspense } from "react";
import Navbar from "../components/Navbar";
import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfólió — Stillsoul Production",
};

// useSearchParams miatt a kliens egy Suspense-boundary alá kerül (Next követelmény).
export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <PortfolioClient />
      </Suspense>
    </>
  );
}
