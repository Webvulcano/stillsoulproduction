"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { thumbUrl } from "./data";

// Fotó-lightbox soron belüli lapozással.
// Vezérlés: X / Esc / háttér-klikk zár; nyíl gomb + ←/→ billentyű + swipe lapoz (körkörös).
export default function ImageLightbox({ items, index = 0, onClose }) {
  const [current, setCurrent] = useState(index);
  const touchX = useRef(null);

  const count = items.length;
  const go = (delta) => setCurrent((c) => (c + delta + count) % count);
  const prev = () => go(-1);
  const next = () => go(1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const item = items[current];
  if (!item) return null;

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Bezárás"
        className="absolute right-5 top-5 z-10 text-2xl text-white/70 transition-colors hover:text-white"
      >
        <FiX />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Előző"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-3xl text-white/60 transition-colors hover:text-white sm:left-6"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Következő"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-3xl text-white/60 transition-colors hover:text-white sm:right-6"
          >
            <FiChevronRight />
          </button>
        </>
      )}

      {/* a belső kattintás ne zárjon */}
      <div
        className="flex w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-[82vh] w-full overflow-hidden rounded-lg bg-black">
          <Image
            src={thumbUrl(item)}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={85}
            draggable={false}
            className="select-none object-contain"
          />
        </div>
        {count > 1 && (
          <span className="mt-3 text-xs tracking-wider text-white/50">
            {current + 1} / {count}
          </span>
        )}
      </div>
    </div>
  );
}
