"use client";

import { FiDownload } from "react-icons/fi";
import { useLanguage } from "../../i18n/LanguageProvider";
import { h3Label, panel, cmsAttr } from "./ui";

// „Teljes árlistánk” — letölthető PDF-ek az Ügyfél Admin Csomagok moduljából (getPackages).
// t = { title, text, download }. Nincs csomag → nem jelenik meg.
// cms = { page, section } — data-cms jelölők (price_list_* mezők)
export default function PriceList({ packages = [], t, cms }) {
  const a = (field) => cmsAttr(cms?.page, cms?.section, field);
  const { locale } = useLanguage();
  if (!packages.length) return null;
  return (
    <div className="mt-16">
      <h3 className={h3Label} {...a("price_list_title")}>
        {t.title}
      </h3>
      {t.text && (
        <p className="mt-4 text-sm leading-relaxed text-white/70" {...a("price_list_text")}>
          {t.text}
        </p>
      )}
      <ul className={`mt-6 ${panel} sm:grid-cols-2`}>
        {packages.map((p) => (
          <li key={p.id} className="bg-black">
            <a
              href={p.file[locale] ?? p.file.hu}
              className="group flex h-full items-center justify-between gap-6 p-6 transition-colors duration-300 hover:bg-white/[0.03] md:p-8"
            >
              <span>
                <span className="block text-sm uppercase tracking-widest text-white">{p.title[locale]}</span>
                {p.price[locale] && <span className="mt-2 block text-sm text-white/50">{p.price[locale]}</span>}
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-widest text-white/60 underline-offset-4 group-hover:text-white group-hover:underline">
                <FiDownload aria-hidden="true" className="h-4 w-4" />
                {t.download}
                {p.fileLocale[locale] && p.fileLocale[locale] !== locale && ` (${p.fileLocale[locale].toUpperCase()})`}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
