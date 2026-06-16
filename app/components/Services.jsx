"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageProvider";

// nyelvfüggetlen: sorszám + kép (a címek a szótárból, index szerint)
const media = [
  { num: "01", img: "/services/1.jpeg" },
  { num: "02", img: "/services/2.jpg" },
  { num: "03", img: "/services/3.jpg" },
  { num: "04", img: "/services/4.jpg" },
  { num: "05", img: "/services/5.jpg" },
  { num: "06", img: "/services/6.jpg" },
];

export default function Services() {
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
        const textBlock = (
          <div className="flex flex-col justify-center space-y-3 px-8 md:px-16">
            <span className="text-xs font-mono text-white/40">
              {service.num}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider border-l-2 border-white pl-4">
              {service.title}
              {service.details && (
                <span className="block text-xs font-normal normal-case tracking-normal text-white/60 mt-1">
                  {service.details}
                </span>
              )}
            </h3>
          </div>
        );
        const imgBlock = (
          <div className="relative w-full overflow-hidden">
            <Image
              src={service.img}
              alt={service.title}
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>
        );
        return (
          <div
            key={service.num}
            className="grid grid-cols-1 md:grid-cols-2  h-[280px]"
          >
            {isEven ? (
              <>
                {imgBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {imgBlock}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
