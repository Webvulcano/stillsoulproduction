// Egyszeri migráció: a használt képeket WebP-be konvertálja és a Supabase `portfolio`
// bucketbe tölti (webp/ prefix alá). Az élő oldalt nem érinti: semmit nem ír felül,
// a DB-ben csak a thumb_url-t tölti ki (az image_url átírása a kódváltozással együtt jön).
//
// Futtatás:
//   node --env-file=.env.local scripts/migrate-images.mjs <backup-mappa>          → dry-run
//   node --env-file=.env.local scripts/migrate-images.mjs <backup-mappa> --live   → éles
//
// <backup-mappa> = forras/public-eredeti (benne _supabase/ a bucket mentése).
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const BACKUP = process.argv[2];
const LIVE = process.argv.includes("--live");
if (!BACKUP) throw new Error("Hiányzik a backup-mappa.");

const BUCKET = "portfolio";
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_PREFIX = `${SUPA_URL}/storage/v1/object/public/${BUCKET}/`;
const supabase = createClient(SUPA_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Méret-szerepek. thumb: rács, full: lightbox, img: minden egyéb (Rólunk, szolgáltatás, csapat…).
const ROLES = { thumb: 800, full: 3840, img: 1600 };
const QUALITY = 80;
// Ezek maradnak a public/-ban (kicsik, fixek, vagy OG/favicon-ként abszolút útvonal kell).
const KEEP_PUBLIC = /^\/(logo\.png|logo-og\.png|favicon\.png|tiny_icon\d\.png|[^/]+\.svg|hero\/.*)$/;
const IMG_EXT = /\.(jpe?g|png)$/i;

// --- 1) Hivatkozások összegyűjtése: kód + DB ---------------------------------
const refs = new Map(); // ref (eredeti string) → Set(role)
const addRef = (ref, role) => {
  if (!refs.has(ref)) refs.set(ref, new Set());
  refs.get(ref).add(role);
};

function walkCode(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walkCode(p);
    else if (/\.(jsx?|mjs)$/.test(f)) {
      const src = fs.readFileSync(p, "utf8");
      for (const m of src.matchAll(/"(\/[^"]+\.(?:jpe?g|png))"/gi)) {
        // A portfolio/data.js fallback ugyanazt a szerepet kapja, mint a DB-s párja (lent felülíródik).
        if (!KEEP_PUBLIC.test(m[1])) addRef(m[1], "img");
      }
    }
  }
}
walkCode("app");
walkCode("lib");

const { data: items, error: itemsErr } = await supabase
  .from("portfolio_items")
  .select("id, kind, image_url");
if (itemsErr) throw itemsErr;
for (const it of items) {
  if (!it.image_url) continue;
  if (it.kind === "photo") {
    refs.delete(it.image_url); // a kódbeli "img" szerep helyett thumb+full
    addRef(it.image_url, "thumb");
    addRef(it.image_url, "full");
  } else {
    refs.delete(it.image_url);
    addRef(it.image_url, "thumb"); // videó-borító: csak rácsban jelenik meg
  }
}
// Fotó-elemeknél a kódban talált "img" szerep ne maradjon meg a thumb/full mellett.
for (const roles of refs.values()) if (roles.has("full")) roles.delete("img");

const { data: content, error: contentErr } = await supabase.from("site_content").select("key, value");
if (contentErr) throw contentErr;
(function scan(v) {
  if (typeof v === "string") {
    if ((v.startsWith("/") || v.startsWith(PUBLIC_PREFIX)) && IMG_EXT.test(v) && !KEEP_PUBLIC.test(v) && !refs.has(v))
      addRef(v, "img");
  } else if (Array.isArray(v)) v.forEach(scan);
  else if (v && typeof v === "object") Object.values(v).forEach(scan);
})(content.map((r) => r.value));

// --- 2) Forrásfájl + célútvonal feloldása -------------------------------------
function resolve(ref) {
  if (ref.startsWith(PUBLIC_PREFIX)) {
    const rel = decodeURIComponent(ref.slice(PUBLIC_PREFIX.length));
    return { src: path.join(BACKUP, "_supabase", rel), base: `webp/bucket/${rel}` };
  }
  return { src: path.join(BACKUP, ref), base: `webp/public${ref}` };
}
const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9/_.-]+/g, "-");

const jobs = [];
const missing = [];
for (const [ref, roles] of refs) {
  const { src, base } = resolve(ref);
  if (!fs.existsSync(src)) {
    missing.push(ref);
    continue;
  }
  for (const role of roles) {
    const dest = slug(base.replace(IMG_EXT, "")) + `-${role}.webp`;
    jobs.push({ ref, role, src, dest });
  }
}

// --- 3) Konvertálás (dry-run-ban is, hogy lássuk a méreteket) -----------------
const mapping = {}; // ref → { thumb?, full?, img? } publikus URL-ek
let total = 0;
let biggest = { size: 0 };
const perRole = { thumb: 0, full: 0, img: 0 };
for (const j of jobs) {
  const buf = await sharp(j.src)
    .rotate()
    .resize({ width: ROLES[j.role], height: ROLES[j.role], fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  j.size = buf.length;
  total += buf.length;
  perRole[j.role] += buf.length;
  if (buf.length > biggest.size) biggest = { size: buf.length, dest: j.dest };

  if (LIVE) {
    const { error } = await supabase.storage.from(BUCKET).upload(j.dest, buf, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw new Error(`${j.dest}: ${error.message}`);
  }
  (mapping[j.ref] ??= {})[j.role] = PUBLIC_PREFIX + j.dest;
}

const mb = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
console.log(LIVE ? "=== ÉLES FUTÁS ===" : "=== DRY-RUN (semmi nem töltődött fel) ===");
console.log(`Hivatkozott képek: ${refs.size}, generált fájlok: ${jobs.length - 0}`);
console.log(`Szerepek: thumb ${jobs.filter((j) => j.role === "thumb").length} db (${mb(perRole.thumb)}), ` +
  `full ${jobs.filter((j) => j.role === "full").length} db (${mb(perRole.full)}), ` +
  `img ${jobs.filter((j) => j.role === "img").length} db (${mb(perRole.img)})`);
console.log(`Összesen: ${mb(total)}, legnagyobb: ${mb(biggest.size)} (${biggest.dest})`);
if (missing.length) console.log(`HIÁNYZÓ forrás (${missing.length}):\n  ` + missing.join("\n  "));

fs.writeFileSync("scripts/image-mapping.json", JSON.stringify(mapping, null, 2));
console.log("Mapping → scripts/image-mapping.json");

// --- 4) Éles: thumb_url kitöltése (image_url-t NEM írja át) -------------------
if (LIVE) {
  let n = 0;
  for (const it of items) {
    const t = mapping[it.image_url]?.thumb;
    if (!t) continue;
    const { error } = await supabase.from("portfolio_items").update({ thumb_url: t }).eq("id", it.id);
    if (error) throw error;
    n++;
  }
  console.log(`portfolio_items.thumb_url kitöltve: ${n} sor`);
}
