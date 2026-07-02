"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../i18n/LanguageProvider";
import { CATEGORIES } from "../portfolio/categories";

// Csempe → cél URL: a serviceTargets (DB: service_key→mappa-slug) alapján.
// Ha van hozzárendelt, feltöltött mappa → oda görget (#row-<slug>); különben tetejére.
function hrefForSlug(slug, serviceTargets) {
  const target = serviceTargets[slug];
  return target ? `/portfolio#row-${target}` : "/portfolio";
}

// nyelvfüggetlen: sorszám + kép (a címek a szótárból, index szerint)
const media = [
  { num: "01", img: "/services/1.jpeg" },
  { num: "02", img: "/services/2.jpg" },
  { num: "03", img: "/services/3.jpg" },
  { num: "04", img: "/services/4.jpg" },
  { num: "05", img: "/services/5.jpg" },
  { num: "06", img: "/services/6.jpg" },
];

export default function Services({ serviceTargets = {} }) {
  const { t } = useLanguage();
  const services = media.map((m, i) => ({ ...m, ...t.services.items[i] }));

  return (
    <section id="szolgaltatasok" className="bg-black text-white">
      <div className="px-8 md:px-16 py-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.services.label}
        </span>
      </div>
      {services.map((service, i) => {
        const isEven = i % 2 === 1;
        // index → kategória-slug → szűrt portfólió oldal
        const slug = CATEGORIES[i]?.slug;
        return (
          <Link
            key={service.num}
            href={hrefForSlug(slug, serviceTargets)}
            className="group flex flex-col md:grid md:grid-cols-2 md:h-[280px]"
          >
            {/* Szöveg — mobilon mindig elöl; asztalon páros sornál jobbra (order-2) */}
            <div
              className={`flex flex-col justify-center space-y-3 px-8 md:px-16 py-8 md:py-0 ${
                isEven ? "md:order-2" : ""
              }`}
            >
              <span className="text-xs font-mono text-white/40">
                {service.num}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider border-l-2 border-white pl-4 text-white/70 transition-colors group-hover:text-white">
                {service.title}
                {service.details && (
                  <span className="block text-xs font-normal normal-case tracking-normal text-white/60 mt-1">
                    {service.details}
                  </span>
                )}
              </h3>
            </div>

            {/* Kép — mobilon a szöveg alatt; asztalon páros sornál balra (order-1) */}
            <div
              className={`relative w-full h-56 md:h-full overflow-hidden ${
                isEven ? "md:order-1" : ""
              }`}
            >
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
