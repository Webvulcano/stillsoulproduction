"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageProvider";
import { isCmsUpload } from "@/lib/cms-image";

// „Akikkel dolgoztunk” logó-szalag a hero videó alatt. Logók az Ügyfél Adminból (képhely:
// home.clients.logos), eredeti színben, egyforma magasságban; végtelenített lassú futás,
// hoverre megáll, reduced-motion esetén áll (középre rendezve). Üres lista → nem jelenik meg.
export default function LogoTicker({ logos }) {
  const { t, locale } = useLanguage();
  if (!logos?.length) return null;

  // Elég hosszú sor, hogy széles képernyőn se legyen hézag, majd kétszer egymás után a loophoz.
  const reps = Math.max(1, Math.ceil(12 / logos.length));
  const row = Array.from({ length: reps }, () => logos).flat();
  const duration = `${Math.max(20, row.length * 3)}s`;

  // Ismétlések: képernyőolvasónak rejtve, reduced-motion (álló, tördelt sor) esetén nem látszanak.
  const logo = (l, key, hidden) => (
    <li
      key={key}
      className={`flex h-10 shrink-0 items-center px-8 md:h-12 md:px-12 ${hidden ? "motion-reduce:hidden" : ""}`}
      aria-hidden={hidden || undefined}
    >
      <Image
        src={l.src}
        alt={hidden ? "" : l.alt?.[locale] || l.alt?.hu || ""}
        width={l.width ?? 240}
        height={l.height ?? 100}
        unoptimized={isCmsUpload(l.src)}
        draggable={false}
        className="h-full w-auto max-w-[180px] select-none object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </li>
  );

  return (
    <section className="logo-ticker bg-black py-10 text-white md:py-14" aria-labelledby="clients-title">
      <h2 id="clients-title" className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-white/40" data-cms="home.clients.title">
        {t.clients.title}
      </h2>
      <div
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        data-cms="home.clients.logos"
      >
        <ul className="logo-ticker-track flex w-max motion-reduce:mx-auto motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center" style={{ "--ticker-duration": duration }}>
          {row.map((l, i) => logo(l, i, i >= logos.length))}
          {row.map((l, i) => logo(l, `d${i}`, true))}
        </ul>
      </div>
    </section>
  );
}
