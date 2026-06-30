"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageProvider";
import { titleOf } from "./data";

// Lightbox: beágyazott YouTube player. Zárás: X, háttér-kattintás, Esc.
export default function VideoModal({ item, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titleOf(item, t)}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Bezárás"
        className="absolute right-5 top-5 text-2xl text-white/70 transition-colors hover:text-white"
      >
        <FiX />
      </button>

      {/* a belső kattintás ne zárjon */}
      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
            title={titleOf(item, t)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <h3 className="mt-4 text-center text-sm font-semibold uppercase tracking-wider text-white">
          {titleOf(item, t)}
        </h3>
      </div>
    </div>
  );
}
