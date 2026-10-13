"use client";

import { useEffect, useRef } from "react";

// Végtelenített, megfogható (drag) sor — a Hallásgondozó TestiTicker mintájára.
// dir: "left" | "right". A hívó a tartalmat kétszer adja (második fele aria-hidden),
// a sor a felénél loopol. Egérrel fölé állva megáll; érintésnél húzás alatt áll,
// elengedve lendülettel gurul tovább, majd lágyan visszaáll az automata mozgás.
// Reduced motion: nem mozog magától, de kézzel húzható marad.
export default function DragTicker({ dir = "left", speed = 28, className = "", children }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;

    const s = {
      offset: 0, half: 0, dragging: false, hovered: false,
      startX: 0, startOffset: 0, pointerX: 0,
      vel: 0, // px/ms — elengedés utáni lendület
      samples: [], // utolsó húzás-pontok a sebességméréshez
      auto: 1, // automata mozgás aránya (0..1), elengedés után lágyan áll vissza
      last: 0, raf: 0,
    };
    const sign = dir === "left" ? -1 : 1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FRICTION = 0.95; // lendület-csillapítás / 16.7 ms
    const MAX_VEL = 4; // px/ms
    const AUTO_RAMP = 600; // ms — automata mozgás visszagyorsulása

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

    // Minden mozgás itt, képkockánként egyszer; időalapú (px/ms), hogy 60 és 120 Hz-en is egyforma legyen.
    const tick = (now) => {
      const dt = s.last ? Math.min(now - s.last, 64) : 0;
      s.last = now;
      if (s.dragging) {
        s.offset = s.startOffset + (s.pointerX - s.startX);
      } else if (Math.abs(s.vel) > 0.02) {
        s.offset += s.vel * dt;
        s.vel *= Math.pow(FRICTION, dt / 16.67);
      } else {
        s.vel = 0;
        if (!s.hovered && !reduce) {
          s.auto = Math.min(1, s.auto + dt / AUTO_RAMP);
          const eased = s.auto * s.auto * (3 - 2 * s.auto);
          s.offset += (speed * dt * sign * eased) / 1000;
        }
      }
      wrap();
      apply();
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);

    const sample = (x, t) => {
      s.samples.push({ x, t });
      while (s.samples.length > 2 && t - s.samples[0].t > 100) s.samples.shift();
    };

    const onEnter = (e) => {
      if (e.pointerType === "mouse") s.hovered = true;
    };
    const onLeave = (e) => {
      if (e.pointerType === "mouse") s.hovered = false;
    };
    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.dragging = true;
      s.vel = 0;
      s.auto = 0;
      s.startX = s.pointerX = e.clientX;
      s.startOffset = s.offset;
      s.samples = [];
      sample(e.clientX, e.timeStamp);
      track.setPointerCapture?.(e.pointerId);
      track.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!s.dragging) return;
      s.pointerX = e.clientX;
      sample(e.clientX, e.timeStamp);
    };
    const onUp = (e) => {
      if (!s.dragging) return;
      s.dragging = false;
      s.offset = s.startOffset + (s.pointerX - s.startX);
      // Sebesség az utolsó ~100 ms húzásából; ha az ujj megállt elengedés előtt, nincs lendület.
      const first = s.samples[0];
      const lastS = s.samples[s.samples.length - 1];
      const span = lastS && first ? lastS.t - first.t : 0;
      const idle = lastS ? e.timeStamp - lastS.t : Infinity;
      s.vel = span > 0 && idle < 60 ? Math.max(-MAX_VEL, Math.min(MAX_VEL, (lastS.x - first.x) / span)) : 0;
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
      <div ref={trackRef} className="flex w-max cursor-grab select-none will-change-transform [touch-action:pan-y]">
        {children}
      </div>
    </div>
  );
}
