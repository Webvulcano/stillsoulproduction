import Link from "next/link";
import { Fragment } from "react";
import { parseInline } from "@/lib/legal";

// A lib/legal.js blokkjainak renderelése (szerver komponens).

function Inline({ text }) {
  return parseInline(text).map((n, i) => {
    if (n.t === "bold") return <strong key={i} className="font-semibold text-white">{n.text}</strong>;
    if (n.t === "link") {
      const cls = "underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors";
      return n.href.startsWith("/") ? (
        <Link key={i} href={n.href} className={cls}>{n.text}</Link>
      ) : (
        <a key={i} href={n.href} target="_blank" rel="noopener noreferrer" className={cls}>{n.text}</a>
      );
    }
    return <Fragment key={i}>{n.text}</Fragment>;
  });
}

function Block({ block }) {
  switch (block.type) {
    case "heading":
      if (block.level === 1)
        return <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">{block.text}</h1>;
      if (block.level === 2)
        return <h2 className="text-xl font-semibold text-white mt-12 mb-4">{block.text}</h2>;
      return <h3 className="text-lg font-semibold text-white mt-8 mb-3">{block.text}</h3>;
    case "list":
      return (
        <ul className="list-disc pl-5 space-y-2 mb-5">
          {block.items.map((it, i) => (
            <li key={i}><Inline text={it} /></li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((c, i) => (
                    <th key={i} className="text-left font-semibold text-white border-b border-white/30 py-2 pr-4 align-bottom">
                      <Inline text={c} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-white/10">
                  {row.map((c, i) => (
                    <td key={i} className="py-2 pr-4 align-top">
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p className="mb-5">
          {block.lines.map((l, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <Inline text={l} />
            </Fragment>
          ))}
        </p>
      );
  }
}

export default function LegalDoc({ blocks }) {
  return (
    <article className="text-base leading-relaxed text-white/75">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </article>
  );
}
