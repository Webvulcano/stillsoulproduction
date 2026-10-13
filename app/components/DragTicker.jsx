"use client";

import { useEffect, useRef } from "react";

// Végtelenített, megfogható (drag) sor — a Hallásgondozó TestiTicker mintájára.
// dir: "left" | "right". A hívó a tartalmat kétszer adja (második fele aria-hidden),
// a sor a felénél loopol. Egérrel fölé állva megáll; érintésnél húzás alatt áll.
// Reduced motion: nem mozog magától, de kézzel húzható marad.
export default function DragTicker({ dir = "left", speed = 28, className = "", children }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;

    const s = { offset: 0, half: 0, dragging: false, hovered: false, startX: 0, startOffset: 0, last: 0, raf: 0 };
    const sign = dir === "left" ? -1 : 1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      s.half = track.scrollWidth / 2;
    };
    const wrap = () => {
      if (s.half <= 0) return;
      while (s.offset <= -s.half) s.offset += s.half;
      while (s.offset > 0) s.offset -= s.half;
    };
    const apply = () => {
      track.style.transform = `translate3d(${s.offset}px,0,0)`;
    };

    measure();
    s.offset = dir === "right" ? -s.half : 0;
    apply();

    // Időalapú lépés (px/s), hogy 60 és 120 Hz-en is ugyanolyan gyors legyen.
    const tick = (now) => {
      const dt = s.last ? Math.min(now - s.last, 64) : 0;
      s.last = now;
      if (!s.dragging && !s.hovered && !reduce) {
        s.offset += (speed * dt * sign) / 1000;
        wrap();
        apply();
      }
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);

    const onEnter = (e) => {
      if (e.pointerType === "mouse") s.hovered = true;
    };
    const onLeave = (e) => {
      if (e.pointerType === "mouse") s.hovered = false;
    };
    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.dragging = true;
      s.startX = e.clientX;
      s.startOffset = s.offset;
      track.setPointerCapture?.(e.pointerId);
      track.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!s.dragging) return;
      s.offset = s.startOffset + (e.clientX - s.startX);
      wrap();
      apply();
    };
    const onUp = (e) => {
      if (!s.dragging) return;
      s.dragging = false;
      track.releasePointerCapture?.(e.pointerId);
      track.style.cursor = "grab";
    };

    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointerleave", onLeave);
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    return () => {
      cancelAnimationFrame(s.raf);
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [dir, speed]);

  return (
    <div ref={rowRef} className={`overflow-hidden ${className}`}>
      {/* touch-action: pan-y → függőlegesen görgethető marad az oldal, vízszintesen húzható a sor */}
      <div ref={trackRef} className="flex w-max cursor-grab select-none [touch-action:pan-y]">
        {children}
      </div>
    </div>
  );
}
