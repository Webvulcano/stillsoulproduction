import { FiPlus } from "react-icons/fi";
import { h2, section, inner } from "./ui";

// GYIK — natív <details>, JS nélkül. A FAQPage JSON-LD-nek ugyanezt a szöveget kell használnia.
export default function Faq({ title, items }) {
  return (
    <section className={section}>
      <div className={`${inner} max-w-3xl`}>
        <h2 className={h2}>{title}</h2>
        <div className="mt-10 border-t border-white/10">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold text-white/90 hover:text-white [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <FiPlus aria-hidden="true" className="h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQPage JSON-LD a látható GYIK-ból.
export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
