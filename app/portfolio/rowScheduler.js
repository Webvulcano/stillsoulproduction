// Portfólió-sorok animáció-ütemezője: egyszerre CSAK EGY sor léptet —
// az, amelyiknek a közepe a legközelebb van a képernyő közepéhez.
// A többi sor áll (a képernyőn kívüliek is), így kíméljük a CPU-t / GPU-t.
// Görgetésnél / átméretezésnél (rAF-fel ritkítva) újraszámoljuk az aktív sort.

const rows = new Map(); // el -> setActive(bool)
let activeEl = null;
let raf = 0;
let listening = false;

const recompute = () => {
  raf = 0;
  const vh = window.innerHeight;
  const mid = vh / 2;
  let best = null;
  let bestDist = Infinity;
  for (const el of rows.keys()) {
    const r = el.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= vh) continue; // nem látszik
    const dist = Math.abs((r.top + r.bottom) / 2 - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = el;
    }
  }
  if (best === activeEl) return;
  activeEl = best;
  for (const [el, setActive] of rows) setActive(el === best);
};

const schedule = () => {
  if (!raf) raf = requestAnimationFrame(recompute);
};

const startListening = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
};

const stopListening = () => {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  cancelAnimationFrame(raf);
  raf = 0;
};

// Regisztrál egy sort; setActive(bool) jelzi, léptethet-e. Visszaad egy leiratkozó függvényt.
export function registerRow(el, setActive) {
  rows.set(el, setActive);
  setActive(false);
  activeEl = null; // új sor → kényszerített újraszámolás
  startListening();
  schedule();
  return () => {
    rows.delete(el);
    if (activeEl === el) activeEl = null;
    if (rows.size === 0) stopListening();
    else schedule();
  };
}
