import { createClient } from "@/lib/supabase/client";

// Bemeneti limit (nyers kamera-JPG is mehet): feltöltés előtt a böngésző WebP-re
// méretezi, így a bucketbe kerülő fájl jóval a 3 MB-os hard limit alatt marad.
export const MAX_SITE_IMAGE_BYTES = 40 * 1024 * 1024; // 40 MB
export const MAX_SITE_IMAGE_LABEL = "40 MB";

// Méretek (hosszabbik oldal, px) — egyezik a scripts/migrate-images.mjs-sel.
export const SIZES = { thumb: 800, full: 3840, img: 1600 };
const QUALITY = 0.8;

// Fájl → átméretezett WebP Blob (canvas). Ha a böngésző nem tud WebP-t kódolni
// (régi Safari), JPEG-re esik vissza.
export async function toWebp(file, maxPx) {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxPx / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  const blob = await new Promise((res) => canvas.toBlob(res, "image/webp", QUALITY));
  if (blob?.type === "image/webp") return blob;
  return new Promise((res) => canvas.toBlob(res, "image/jpeg", QUALITY));
}

// Blob → Storage, publikus URL-lel vissza.
export async function uploadBlob(path, blob) {
  const supabase = createClient();
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const fullPath = `${path}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio")
    .upload(fullPath, blob, { contentType: blob.type, cacheControl: "31536000", upsert: false });
  if (error) throw new Error("Feltöltés hiba: " + error.message);
  return supabase.storage.from("portfolio").getPublicUrl(fullPath).data.publicUrl;
}

export function checkInputFile(file) {
  if (!file?.type?.startsWith("image/")) throw new Error("Csak képfájl tölthető fel.");
  if (file.size > MAX_SITE_IMAGE_BYTES) {
    throw new Error(
      `Túl nagy fájl: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB). Max ${MAX_SITE_IMAGE_LABEL}.`
    );
  }
}

// Oldal-tartalom kép (Rólunk / szolgáltatás-csempe): egy méret, 1600 px.
// folder: "about" | "services" → a site/ prefix alatt.
export async function uploadSiteImage(folder, file) {
  if (!file) throw new Error("Nincs kiválasztott fájl.");
  checkInputFile(file);
  const blob = await toWebp(file, SIZES.img);
  return uploadBlob(`site/${folder}/${crypto.randomUUID()}`, blob);
}

// Közös admin stílus-osztályok (AdminDrive-ból).
export const inputCls =
  "w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30";
export const btnGhost =
  "rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors";
export const btnPrimary =
  "rounded bg-white px-5 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50";
