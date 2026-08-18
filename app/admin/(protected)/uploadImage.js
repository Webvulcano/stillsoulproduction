import { createClient } from "@/lib/supabase/client";

// Oldal-tartalom képek limitje (a bucket hard limitje 3 MB).
export const MAX_SITE_IMAGE_BYTES = 1024 * 1024; // 1 MB

// Kliens-oldali feltöltés a Storage-ba (nincs server-action méretlimit).
// folder: "about" | "services" → a site/ prefix alatt.
export async function uploadSiteImage(folder, file) {
  if (!file) throw new Error("Nincs kiválasztott fájl.");
  if (!file.type?.startsWith("image/")) throw new Error("Csak képfájl tölthető fel.");
  if (file.size > MAX_SITE_IMAGE_BYTES) {
    throw new Error(
      `Túl nagy fájl: ${(file.size / 1024 / 1024).toFixed(1)} MB. Max 1 MB.`
    );
  }
  const supabase = createClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `site/${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) throw new Error("Feltöltés hiba: " + error.message);
  return supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
}

// Közös admin stílus-osztályok (AdminDrive-ból).
export const inputCls =
  "w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30";
export const btnGhost =
  "rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors";
export const btnPrimary =
  "rounded bg-white px-5 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50";
