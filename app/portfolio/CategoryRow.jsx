"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageProvider";
import { thumbUrl, itemTitle } from "./data";

// Thumbnail skeletonnal: pulzáló placeholder amíg a kép be nem tölt.
function ThumbImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 78vw, 360px"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`select-none object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

// Egy kategória-szekció: cím + vízszintesen léptető kártya-sor.
// - léptet pontosan 1 kártyányit (sima ~0.4s glide), majd 1s szünet, ismét
// - a képek jobbra vándorolnak (scrollLeft csökken); balról jönnek be az újak
// - VÉGTELENÍTETT: a kártyák többszörözve (REPS) → seamless loop, egy referencia többször látszik
// - hover / fókusz / húzás alatt megáll, utána folytatódik
// - swipe / drag-to-scroll pointer-eseményekkel; a húzás nem süti el a klikket
const REPS = 4; // hányszor ismételjük a listát a seamless loophoz
const GLIDE_MS = 800; // egy lépés hossza
const PAUSE_MS = 1500; // szünet két lépés között
const GAP_PX = 16; // gap-4
const DRAG_THRESHOLD = 6; // px — efölött húzásnak számít, klikk elnyomva

const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function CategoryRow({ title, items, onSelect, reverse = false, id }) {
  const { locale } = useLanguage();
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const stepRef = useRef(320); // egy kártya + gap (mérve)
  const wrapRef = useRef(0); // egy teljes kör szélessége = items.length * step
  const touchTimerRef = useRef(0); // érintés utáni resume késleltetés
  const touchingRef = useRef(false); // ujj a képernyőn (natív görgetés aktív)

  // Léptető vezérlő: glide egy kártyát → 1s várakozás → ismét, végtelenítve.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let cancelled = false;
    let raf = 0;
    let timer = 0;

    const measure = () => {
      const first = el.querySelector("[data-card]");
      const cardW = first ? first.getBoundingClientRect().width : 320;
      stepRef.current = cardW + GAP_PX;
      wrapRef.current = items.length * stepRef.current;
    };

    // scrollLeft a [wrap, 2*wrap] sávban marad; ott a tartalom azonos → seamless.
    const normalize = () => {
      const wrap = wrapRef.current;
      if (wrap <= 0) return;
      while (el.scrollLeft < wrap) el.scrollLeft += wrap;
      while (el.scrollLeft >= 2 * wrap) el.scrollLeft -= wrap;
    };

    const glide = (dist) =>
      new Promise((res) => {
        const start = el.scrollLeft;
        let t0 = null;
        let last = null;
        const frame = (ts) => {
          // érintésnél a natív görgetés viszi → szakítsuk meg a lépést
          if (cancelled || dragRef.current.active || touchingRef.current)
            return res();
          if (t0 == null) {
            t0 = ts;
            last = ts;
          }
          // Érintés/hover alatt fagyasszuk be a lépést: az eltelt időt ne számítsuk.
          if (pausedRef.current) {
            t0 += ts - last;
            last = ts;
            raf = requestAnimationFrame(frame);
            return;
          }
          last = ts;
          const p = Math.min(1, (ts - t0) / GLIDE_MS);
          el.scrollLeft = start + dist * easeInOut(p);
          if (p < 1) raf = requestAnimationFrame(frame);
          else res();
        };
        raf = requestAnimationFrame(frame);
      });

    const sleep = (ms) =>
      new Promise((res) => {
        timer = setTimeout(res, ms);
      });

    const waitWhileBlocked = async () => {
      while (!cancelled && (pausedRef.current || dragRef.current.active)) {
        await sleep(120);
      }
    };

    const run = async () => {
      // várjunk a layoutra / képek méretére
      await sleep(60);
      measure();
      el.scrollLeft = wrapRef.current; // induló pozíció a sáv alján

      while (!cancelled) {
        await waitWhileBlocked();
        if (cancelled) break;
        // reverse=false → scrollLeft csökken (képek jobbra); reverse=true → ellentétes
        await glide(reverse ? stepRef.current : -stepRef.current);
        if (cancelled) break;
        normalize();
        await sleep(PAUSE_MS);
      }
    };

    run();

    const onResize = () => {
      measure();
      normalize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(touchTimerRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [items, reverse]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const normalizeBand = () => {
    const el = scrollerRef.current;
    const wrap = wrapRef.current;
    if (!el || wrap <= 0) return;
    while (el.scrollLeft < wrap) el.scrollLeft += wrap;
    while (el.scrollLeft >= 2 * wrap) el.scrollLeft -= wrap;
  };

  // Egér-drag (csak egérre; érintésnél a natív görgetés viszi — lásd touch-action: pan-x).
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
    pause();
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const el = scrollerRef.current;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    normalizeBand(); // húzás után vissza a seamless sávba
    resume();
  };

  // Érintés: natív vízszintes görgetés (pan-x). Az auto-step szünetel érintés
  // alatt, és a momentum lecsengése után (kis késleltetés) folytatódik.
  const onTouchStart = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchingRef.current = true; // azonnal állítsa le az animációt
    pause();
  };
  const onTouchEnd = () => {
    touchingRef.current = false;
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    // momentum lecsengése után folytatjuk, friss pozícióból
    touchTimerRef.current = setTimeout(() => {
      normalizeBand();
      resume();
    }, 900);
  };

  // Kártya-klikk: ha épp húztunk, ne nyíljon modal. A sor listáját + indexet
  // is átadjuk (fotó-lightbox soron belüli lapozásához).
  const handleClick = (item) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    onSelect(item, items, items.indexOf(item));
  };

  // Végtelenített lista: az itemeket REPS-szer ismételjük.
  const loop = [];
  for (let r = 0; r < REPS; r++) {
    for (const it of items) loop.push({ it, rep: r });
  }

  return (
    <section id={id} className="mb-14 scroll-mt-28">
      <h2 className="mb-4 px-8 text-lg font-medium tracking-wide text-white/90 sm:text-xl">
        {title}
      </h2>

      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={() => {
          endDrag();
          resume();
        }}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        className="flex items-start gap-4 overflow-x-auto px-8 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x", cursor: "grab", scrollBehavior: "auto" }}
      >
        {loop.map(({ it, rep }) => {
          const isVideo = it.kind !== "photo";
          const isPhoto = !isVideo;
          // Videónál a felirat a DB kétnyelvű mezőjéből; fotónál nincs, az alt a sor címe.
          const label = isPhoto ? title : itemTitle(it, locale);
          const isClone = rep > 0;
          return (
            <button
              key={`${it.id}-${rep}`}
              type="button"
              data-card
              onClick={() => handleClick(it)}
              className="group shrink-0 text-left"
              style={{ width: "clamp(260px, 78vw, 360px)" }}
              aria-label={label}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
                <ThumbImage src={thumbUrl(it)} alt={label} />
                {isVideo && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                      <FaPlay className="ml-0.5" />
                    </span>
                  </span>
                )}
              </div>
              {/* Fotónál nincs felirat; videónál fix 2 soros hely (a thumbnail nem csúszik) */}
              {isVideo && (
                <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold uppercase leading-5 tracking-wider text-white">
                  {label}
                </h3>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
