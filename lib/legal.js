import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

// Jogi oldalak (adatkezelés, impresszum) szövege: content/legal/<name>.<locale>.md.
// Szándékosan kódban, nem a CMS-ben — az ügyfél ne írja át véletlenül.
// Mini markdown parser, csak amit ezek a szövegek használnak:
// # / ## / ### címsor, bekezdés (egymás alatti sorok → sortörés), "- " lista, | táblázat |, **félkövér**, [link](url).

export const getLegalDoc = cache(async (name, locale) => {
  const file = path.join(process.cwd(), "content", "legal", `${name}.${locale}.md`);
  return parseMarkdown(await readFile(file, "utf8"));
});

const splitRow = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

export function parseMarkdown(src) {
  const lines = src.split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim() === "---") {
      i++;
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      blocks.push({ type: "heading", level: h[1].length, text: h[2] });
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(splitRow(lines[i++]));
      // 2. sor a |---| elválasztó; üres fejléc → kulcs-érték tábla fejléc nélkül
      const head = rows[0];
      const body = rows.slice(2);
      blocks.push({ type: "table", head: head.some(Boolean) ? head : null, rows: body });
      continue;
    }
    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push({ type: "list", items });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||- |---)/.test(lines[i])) para.push(lines[i++]);
    blocks.push({ type: "paragraph", lines: para });
  }
  return blocks;
}

// Inline: **félkövér** és [szöveg](url) → [{ t: "text"|"bold"|"link", text, href? }]
export function parseInline(text) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ t: "text", text: text.slice(last, m.index) });
    if (m[1] != null) out.push({ t: "bold", text: m[1] });
    else out.push({ t: "link", text: m[2], href: m[3] });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ t: "text", text: text.slice(last) });
  return out;
}
