"use client";

import Navbar from "./Navbar";
import LegalLinks from "./LegalLinks";
import { useLanguage } from "../i18n/LanguageProvider";

// Jogi oldal váz: a szerver mindkét nyelvet lerendereli, itt a kliens-oldali nyelv választ.
export default function LegalPage({ hu, en }) {
  const { locale } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen px-6 md:px-12 pt-32 pb-16">
        <div className="mx-auto max-w-3xl">{locale === "en" ? en : hu}</div>
      </main>
      <LegalLinks />
    </>
  );
}
