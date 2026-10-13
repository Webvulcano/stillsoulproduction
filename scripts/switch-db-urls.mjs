// Egyszeri: a DB képhivatkozásait a feltöltött WebP-kre írja át (scripts/image-mapping.json alapján).
// portfolio_items.image_url: fotó → full, videó → thumb. site_content: minden képes string → img.
// Futtatás: node --env-file=.env.local scripts/switch-db-urls.mjs [--live]
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const LIVE = process.argv.includes("--live");
const map = JSON.parse(fs.readFileSync("scripts/image-mapping.json", "utf8"));
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: items, error } = await supabase.from("portfolio_items").select("id, kind, image_url, thumb_url");
if (error) throw error;
let n = 0;
for (const it of items) {
  const m = map[it.image_url];
  if (!m) continue;
  const next = it.kind === "photo" ? m.full : m.thumb;
  if (!next || next === it.image_url) continue;
  n++;
  if (LIVE) {
    const { error: e } = await supabase.from("portfolio_items").update({ image_url: next }).eq("id", it.id);
    if (e) throw e;
  }
}
console.log(`portfolio_items.image_url: ${n} sor ${LIVE ? "átírva" : "írandó"}`);

const { data: rows, error: e2 } = await supabase.from("site_content").select("key, value");
if (e2) throw e2;
for (const r of rows) {
  let c = 0;
  const swap = (v) => {
    if (typeof v === "string") {
      const m = map[v];
      if (m?.img) { c++; return m.img; }
      return v;
    }
    if (Array.isArray(v)) return v.map(swap);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, swap(x)]));
    return v;
  };
  const value = swap(r.value);
  console.log(`site_content.${r.key}: ${c} kép ${LIVE ? "átírva" : "írandó"}`);
  if (LIVE && c) {
    const { error: e3 } = await supabase.from("site_content").update({ value }).eq("key", r.key);
    if (e3) throw e3;
  }
}
