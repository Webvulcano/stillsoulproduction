"use client";

import { useLanguage } from "../i18n/LanguageProvider";
import DragTicker from "./DragTicker";

// „Rólunk mondták” — értékelések az Ügyfél Admin Értékelések moduljából, 2 ellentétes irányú
// ticker-sorban (4 alatt 1 sor). Minden nézetben ticker; hoverre megáll, húzható.
// Nincs látható értékelés → a szekció nem jelenik meg.
const MIN_PER_ROW = 6; // ennyi kártya kell egy sor egyik felébe, hogy széles képernyőn se legyen hézag

function initials(name) {
  return name
    .split(/[\s&,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function Card({ review, locale, hidden }) {
  const subtitle = review.subtitle?.[locale];
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="mx-2.5 flex w-[340px] shrink-0 flex-col rounded-lg border border-white/10 bg-neutral-900 p-6 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.8)] md:mx-3 md:w-[420px] md:p-7"
    >
      <figcaption className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-neutral-800 text-sm font-semibold tracking-wider text-white">
          {initials(review.author)}
        </span>
        <span className="min-w-0 flex-1 pt-0.5">
          <span className="flex items-start justify-between gap-2">
            <span className="min-w-0 text-base font-bold leading-snug text-white">{review.author}</span>
            <span
              className="shrink-0 rounded bg-neutral-800 px-2.5 py-1.5 text-xs leading-none tracking-[0.12em] text-amber-400"
              aria-label={hidden ? undefined : `${review.rating} / 5`}
            >
              {"★".repeat(review.rating)}
              <span className="text-white/20">{"★".repeat(5 - review.rating)}</span>
            </span>
          </span>
          {subtitle && <span className="block text-sm text-white/50">{subtitle}</span>}
        </span>
      </figcaption>
      {/* Nincs flex-1: a nyújtott doboz a clamp utáni 6. sort félig mutatná; max-h = pontosan 5 sor (leading-7). */}
      <blockquote className="mt-5 line-clamp-5 max-h-[8.75rem] overflow-hidden whitespace-pre-line text-[15px] leading-7 text-white/80">
        {review.body?.[locale]}
      </blockquote>
    </figure>
  );
}

// Egy sor tartalma: elég ismétlés, hogy kitöltse a képernyőt, majd kétszer (loop-varrat).
function rowCards(list, locale, keyPrefix) {
  const reps = Math.max(1, Math.ceil(MIN_PER_ROW / list.length));
  const half = Array.from({ length: reps }, () => list).flat();
  return [...half, ...half].map((r, i) => (
    <Card key={`${keyPrefix}-${i}`} review={r} locale={locale} hidden={i >= list.length} />
  ));
}

export default function Reviews({ reviews }) {
  const { t, locale } = useLanguage();
  if (!reviews?.length) return null;

  // Felváltva a két sorba; 4 alatt egy sor.
  const twoRows = reviews.length >= 4;
  const top = twoRows ? reviews.filter((_, i) => i % 2 === 0) : reviews;
  const bottom = twoRows ? reviews.filter((_, i) => i % 2 === 1) : [];

  return (
    <section id="ertekelesek" className="bg-black py-20 text-white md:py-28" aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="mb-10 text-center text-xs uppercase tracking-[0.3em] text-white/40" data-cms="home.reviews.title">
        {t.reviews.title}
      </h2>
      <div className="space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" data-cms="@reviews">
        <DragTicker dir="left">{rowCards(top, locale, "t")}</DragTicker>
        {bottom.length > 0 && <DragTicker dir="right">{rowCards(bottom, locale, "b")}</DragTicker>}
      </div>
    </section>
  );
}
