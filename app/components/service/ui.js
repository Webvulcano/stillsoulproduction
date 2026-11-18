// Közös stílus-tokenek a szolgáltatás-aloldalakhoz (/eskuvoi-videozas, /eskuvoi-fotozas, …).
// Csak Tailwind text-* skála; text-[..] és clamp() tilos.

export const h2 = "text-2xl md:text-3xl font-semibold uppercase tracking-widest text-white";
export const h3Label = "text-sm font-semibold uppercase tracking-widest";
export const section = "border-t border-white/10 px-8 py-16 md:px-16 md:py-24";
export const inner = "mx-auto w-full max-w-[1200px]";
export const lead = "mt-6 max-w-3xl text-base leading-relaxed text-white/70";
// Rács: 1px-es elválasztó vonalak csak a cellák között, külső keret nélkül.
export const panel = "grid gap-px bg-white/10";
export const cell = "bg-black p-6 md:p-8";
export const button =
  "inline-flex items-center justify-center px-8 py-3 text-xs uppercase tracking-widest border transition-colors duration-300";
export const buttonPrimary = `${button} border-white bg-white text-black hover:bg-transparent hover:text-white`;
export const buttonGhost = `${button} border-white/40 text-white hover:bg-white hover:text-black`;
export const textLink = "text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline";

// data-cms jelölő (Ügyfél Admin élő előnézet): cmsAttr("portre_fotozas", "hero", "title")
// → { "data-cms": "portre_fotozas.hero.title" }; lista-elemnél i + f is. page nélkül üres.
export function cmsAttr(page, section, field, i, f) {
  if (!page) return {};
  return {
    "data-cms": `${page}.${section}.${field}`,
    ...(i != null && { "data-cms-i": i }),
    ...(f && { "data-cms-f": f }),
  };
}
