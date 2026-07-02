import { createClient } from "@supabase/supabase-js";

// Nyilvános olvasás: sima anon kliens (cookie nélkül) → a page ISR-rel cache-elhető.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// A galéria-komponens által várt alak (kcompatibilis a régi item-mezőkkel):
// { id, kind, categories:[category], youtubeId, image, title_hu, title_en, year }
function toItem(row) {
  return {
    id: row.id,
    kind: row.kind,
    categories: [row.category],
    youtubeId: row.youtube_id ?? undefined,
    image: row.image_url ?? undefined,
    thumb: row.kind === "video" ? row.image_url ?? undefined : undefined,
    title_hu: row.title_hu ?? undefined,
    title_en: row.title_en ?? undefined,
    year: row.year ?? undefined,
  };
}

// Kategóriák (mappák) sort_order szerint: { slug, title_hu, title_en, service_key }.
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data;
}

// Összes portfólió-elem, kategória + sort_order szerint rendezve.
export async function getPortfolioItems() {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(toItem);
}
