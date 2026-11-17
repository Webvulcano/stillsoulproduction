"use client";

import { useState } from "react";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";

// Lusta YouTube-beágyazás: előbb csak a bélyegkép, kattintásra jön az iframe
// (youtube-nocookie = fokozott adatvédelmi mód, lásd adatkezelési tájékoztató).
// Így a YouTube-player nem lassítja az oldalbetöltést.
export default function LazyYouTube({ id, title, playLabel = "Lejátszás", thumb, sizes = "100vw" }) {
  const [playing, setPlaying] = useState(false);
  const src = thumb ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white transition-transform duration-300 group-hover:scale-110">
            <FiPlay aria-hidden="true" className="ml-1 h-6 w-6" />
          </span>
        </button>
      )}
    </div>
  );
}
