"use client";

import { useLanguage } from "../i18n/LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="rolunk" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
        <div className="max-w-xl space-y-8">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white">
            {t.about.title}
          </h2>
          <div className="border-l-2 border-white/30 pl-6 space-y-4">
            <p className="text-sm leading-7 text-gray-300">{t.about.p1}</p>
            <p className="text-sm leading-7 text-gray-300">{t.about.p2}</p>
            <p className="text-sm leading-7 text-gray-300">{t.about.p3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
