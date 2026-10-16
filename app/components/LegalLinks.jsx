"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageProvider";

// Lábléc-sor: copyright balra, jogi linkek középen, készítő jobbra (mobilon egymás alatt, középre).
export default function LegalLinks() {
  const { t } = useLanguage();
  const link = "hover:text-white transition-colors underline-offset-4 hover:underline";
  return (
    <div className="bg-black text-white/40 text-xs tracking-widest px-6 md:px-12 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-y-3 text-center">
      <span className="md:text-left">&copy; 2026 StillSoul Production</span>
      <span className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link href="/adatkezeles" className={link}>{t.legal.privacy}</Link>
        <Link href="/impresszum" className={link}>{t.legal.imprint}</Link>
      </span>
      <span className="md:text-right">
        {t.legal.madeBy}{" "}
        <a href="https://webvulcano.hu" target="_blank" rel="noopener" className={link}>WebVulcano.hu</a>
      </span>
    </div>
  );
}
