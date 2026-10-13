"use client";
import { useEffect, useRef, useState } from "react";
import { FiDownload, FiFileText, FiX } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageProvider";

// Kész árajánlatok — gomb + popup (native <dialog>) a letölthető PDF-ekkel.
// A csomagok az Ügyfél Admin Csomagok menüjéből jönnek (getPackages), a szövegek a CMS-ből (t.packages).
export default function QuotePackages({ packages = [] }) {
  const { t, locale } = useLanguage();
  const p = t.packages;
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    // háttér görgetés tiltása nyitott popup alatt
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!p || !packages.length) return null;

  function goToForm() {
    setOpen(false);
    // a dialog bezáráskor visszaadja a fókuszt a nyitó gombnak → utána fókuszálunk
    setTimeout(() => document.getElementById("category")?.focus(), 50);
  }

  return (
    <>
      <div className="mb-12 flex flex-col items-center gap-3" data-cms="@packages">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 px-8 py-3 text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          <FiFileText aria-hidden="true" className="w-4 h-4" />
          <span data-cms="home.packages.button">{p.button}</span>
        </button>
        {p.teaser && <span className="text-xs tracking-widest text-white/40" data-cms="home.packages.teaser">{p.teaser}</span>}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // kattintás a háttérre (magára a dialog elemre) → bezár
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-labelledby="packages-title"
        className="m-auto w-[calc(100%-2rem)] max-w-3xl max-h-[85vh] bg-black text-white border border-white/20 p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative px-6 md:px-12 py-12 md:py-14">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={p.close}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer outline-none focus-visible:text-white focus-visible:ring-1 focus-visible:ring-white/40"
          >
            <FiX aria-hidden="true" className="w-5 h-5" />
          </button>

          <div className="mb-10 text-center">
            <h2 id="packages-title" className="text-xs uppercase tracking-[0.3em] text-white/40 font-normal" data-cms="home.packages.label">
              {p.label}
            </h2>
          </div>

          <ul className="border-t border-white/20">
            {packages.map((item, i) => (
              <li key={item.id} className="border-b border-white/20">
                <a
                  href={item.file[locale] ?? item.file.hu}
                  className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[2.5rem_1.4fr_1.2fr_1fr_auto] items-baseline gap-x-5 gap-y-2 py-6 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <span className="text-xs tracking-widest text-white/40 md:pl-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm uppercase tracking-widest text-white/90 group-hover:text-white">
                    {item.title[locale]}
                  </span>
                  <span className="col-start-2 row-start-2 md:col-auto md:row-auto text-xs tracking-widest text-white/50">
                    {item.tiers[locale]}
                  </span>
                  <span className="col-start-2 row-start-3 md:col-auto md:row-auto text-sm tracking-wide text-white/80">
                    {item.price[locale]}
                  </span>
                  <span className="col-start-3 row-start-1 md:col-auto md:row-auto justify-self-end text-xs uppercase tracking-widest text-white/60 group-hover:text-white underline-offset-4 group-hover:underline md:pr-2 whitespace-nowrap inline-flex items-center gap-2">
                    <FiDownload aria-hidden="true" className="w-3.5 h-3.5" />
                    {p.download}
                    {item.fileLocale[locale] && item.fileLocale[locale] !== locale && ` (${item.fileLocale[locale].toUpperCase()})`}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {p.note && (
            <p className="mt-8 text-xs tracking-widest text-white/50 text-center" data-cms="home.packages.note">{p.note}</p>
          )}

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={goToForm}
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              <span data-cms="home.packages.custom">{p.custom}</span> →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
