"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

const navItems = [
  { key: "rolunk", href: "#rolunk" },
  { key: "portfolio", href: "#portfolio" },
  { key: "szolgaltatasok", href: "#szolgaltatasok" },
  { key: "arajanlat", href: "#arajanlat" },
  { key: "kapcsolat", href: "#kapcsolat" },
];

const DONE_EVENT = "ssp:introdone";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [active, setActive] = useState("");
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // intro-handoff: a logó csak akkor jelenik meg, ha az intro lefutott
  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener(DONE_EVENT, onDone);
    return () => window.removeEventListener(DONE_EVENT, onDone);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // hero = h-screen (100vh); fekete amint elhagyjuk a herot
      setScrolled(y > window.innerHeight - 80);
      // tetőn csak a logó; menü egy kis görgetésre jön elő
      setAtTop(y < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // scroll-spy: melyik szekció van épp nézetben
    const ids = navItems.map((i) => i.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive("#" + visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // body scroll-lock + Esc a nyitott mobil menühöz
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const linkClass = (href) =>
    `group relative text-white text-sm uppercase tracking-wider transition-opacity duration-200 ${
      active === href ? "opacity-100" : "opacity-80 hover:opacity-100"
    }`;

  const underlineClass = (href) =>
    `pointer-events-none absolute -bottom-1.5 left-0 h-px w-full bg-white origin-left transition-transform duration-300 ease-out ${
      active === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  const flagClass = (lang) =>
    `leading-none transition-all duration-200 hover:scale-110 cursor-pointer ${
      locale === lang ? "opacity-100 scale-110" : "opacity-50 hover:opacity-100"
    }`;

  // mobil overlay stagger: nyitáskor egyenként, záráskor azonnal
  const staggerStyle = (i) => ({
    transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms",
  });
  const itemClass = `transition-all duration-300 ease-out ${
    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-300 ${
          scrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center gap-3 transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/logo.png"
            alt="StillSoul Production logó"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-white text-base sm:text-lg font-semibold uppercase tracking-widest">
            Stillsoul Production
          </span>
        </div>

        {/* Desktop menü */}
        <nav
          className={`hidden sm:flex items-center gap-8 transition-all duration-300 ${
            atTop
              ? "opacity-0 -translate-y-2 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={linkClass(item.href)}>
              {t.nav[item.key]}
              <span className={underlineClass(item.href)} />
            </a>
          ))}

          <span className="mx-1 h-4 w-px bg-white/30" aria-hidden />

          <button
            type="button"
            onClick={() => setLocale("hu")}
            className={`text-base ${flagClass("hu")}`}
            aria-label="Magyar"
            aria-pressed={locale === "hu"}
          >
            🇭🇺
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`text-base ${flagClass("en")}`}
            aria-label="English"
            aria-pressed={locale === "en"}
          >
            🇬🇧
          </button>
        </nav>
      </header>

      {/* Mobil morpholó toggle (hamburger ↔ X, helyben) */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={`sm:hidden fixed top-6 right-8 z-[70] flex h-6 w-7 flex-col items-center justify-center gap-[5px] transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
        aria-expanded={menuOpen}
      >
        <span
          className={`block h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobil overlay menü */}
      <div
        className={`sm:hidden fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-7">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={staggerStyle(i)}
              className={`${itemClass} text-lg uppercase tracking-widest ${
                active === item.href ? "text-white" : "text-white/70"
              }`}
            >
              {t.nav[item.key]}
            </a>
          ))}

          <div
            style={staggerStyle(navItems.length)}
            className={`${itemClass} mt-6 flex items-center gap-6 text-xl`}
          >
            <button
              type="button"
              onClick={() => setLocale("hu")}
              className={flagClass("hu")}
              aria-label="Magyar"
              aria-pressed={locale === "hu"}
            >
              🇭🇺
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={flagClass("en")}
              aria-label="English"
              aria-pressed={locale === "en"}
            >
              🇬🇧
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
