"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DONE_EVENT = "ssp:introdone";

export default function IntroOverlay() {
  const [render, setRender] = useState(true);
  // init -> enter -> reveal -> fly -> gone
  const [phase, setPhase] = useState("init");

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finish = () => {
      // tickkel halasztva, hogy a Navbar listenere biztosan csatlakozzon
      setTimeout(() => window.dispatchEvent(new Event(DONE_EVENT)), 0);
    };

    // reduced-motion → intro kihagyva
    if (reduce) {
      finish();
      setRender(false);
      return;
    }

    const timers = [];
    // következő frame-ben indul a fade/scale-in (init -> enter)
    const raf = requestAnimationFrame(() => setPhase("enter"));
    timers.push(setTimeout(() => setPhase("reveal"), 800));
    timers.push(setTimeout(() => setPhase("fly"), 1500));
    timers.push(
      setTimeout(() => {
        setPhase("gone");
        finish();
      }, 2200)
    );
    timers.push(setTimeout(() => setRender(false), 2550));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!render) return null;

  const centered =
    phase === "init" || phase === "enter" || phase === "reveal";

  const logoStyle = centered
    ? {
        top: "50%",
        left: "50%",
        width: "11rem",
        height: "11rem",
        transform: `translate(-50%, -50%) scale(${phase === "init" ? 0.85 : 1})`,
        opacity: phase === "init" ? 0 : 1,
      }
    : {
        top: "24px",
        left: "32px",
        width: "40px",
        height: "40px",
        transform: "translate(0, 0) scale(1)",
        opacity: phase === "gone" ? 0 : 1,
      };

  const bgOpaque = phase === "init" || phase === "enter";

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        phase === "gone" ? "pointer-events-none" : ""
      }`}
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-black transition-opacity duration-700 ease-in-out"
        style={{ opacity: bgOpaque ? 1 : 0 }}
      />
      <div
        className="fixed transition-all duration-700 ease-in-out"
        style={logoStyle}
      >
        <Image
          src="/logo.png"
          alt="StillSoul Production logó"
          fill
          sizes="176px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
