// A beépített (seedelt) képek WebP-ként a Supabase Storage-ban élnek, nem a public/-ban.
// media("/about/01.jpg") → .../site-media/<site_id>/defaults/about/01-img.webp
// (Ügyfél Admin Supabase; 2026-10-16-án ide költöztetve a régi `portfolio` bucketből).
// Fix host: a CMS-manifest Node-ból, env nélkül is importálja.
const BASE =
  "https://fwhgroduenrtixzuwpfv.supabase.co/storage/v1/object/public/site-media/be6b0bc2-1cdd-422a-81e0-dd0745ac5c76/defaults";

export function media(publicPath, role = "img") {
  return `${BASE}${publicPath.replace(/\.(jpe?g|png)$/i, "")}-${role}.webp`;
}
