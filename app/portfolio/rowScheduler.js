// Portfólió-sorok animáció-ütemezője: egyszerre legfeljebb MAX_ACTIVE sor léptet.
// Csak a képernyőn látható sorok jöhetnek szóba; közülük a leginkább látható
// (azonos láthatóságnál a feljebb lévő) sorok kapnak "aktív" jelet.
// A képernyőn kívüli sorok egyáltalán nem animálnak (CPU / GPU kímélés).
const MAX_ACTIVE = 2;

const rows = new Map(); // el -> { ratio, setActive }
let observer = null;

const recompute = () => {
  const ranked = [...rows.entries()]
    .filter(([, r]) => r.ratio > 0)
    .sort(
      ([elA, a], [elB, b]) =>
        b.ratio - a.ratio ||
        elA.getBoundingClientRect().top - elB.getBoundingClientRect().top
    );
  const active = new Set(ranked.slice(0, MAX_ACTIVE).map(([el]) => el));
  for (const [el, r] of rows) r.setActive(active.has(el));
};

const getObserver = () => {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const r = rows.get(e.target);
        if (r) r.ratio = e.isIntersecting ? e.intersectionRatio : 0;
      }
      recompute();
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  return observer;
};

// Regisztrál egy sort; setActive(bool) jelzi, léptethet-e. Visszaad egy leiratkozó függvényt.
export function registerRow(el, setActive) {
  const obs = getObserver();
  if (!obs) {
    // IntersectionObserver nélkül (nagyon régi böngésző): régi viselkedés.
    setActive(true);
    return () => {};
  }
  rows.set(el, { ratio: 0, setActive });
  obs.observe(el);
  return () => {
    obs.unobserve(el);
    rows.delete(el);
    recompute();
  };
}
