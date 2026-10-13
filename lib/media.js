// A beépített (seedelt) képek WebP-ként a Supabase Storage-ban élnek, nem a public/-ban.
// media("/about/01.jpg") → .../portfolio/webp/public/about/01-img.webp
// (a scripts/migrate-images.mjs ezt az útvonal-sémát töltötte fel).
const BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio/webp/public`;

export function media(publicPath, role = "img") {
  return `${BASE}${publicPath.replace(/\.(jpe?g|png)$/i, "")}-${role}.webp`;
}
