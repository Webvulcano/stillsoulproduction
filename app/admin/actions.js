"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function parseYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  return null;
}

function revalidateAll() {
  revalidatePath("/portfolio");
  revalidatePath("/");
  revalidatePath("/admin");
}

async function nextSortOrder(supabase, category) {
  const { data } = await supabase
    .from("portfolio_items")
    .select("sort_order")
    .eq("category", category)
    .order("sort_order", { ascending: false })
    .limit(1);
  return (data?.[0]?.sort_order ?? 0) + 1;
}

// A képek a KLIENSBŐL töltődnek a Storage-ba (nincs 1/4.5 MB server-action limit);
// ide már csak a kész publikus URL(-ek) érkeznek.
export async function createItems(payload) {
  const supabase = await createClient();
  const { kind, category } = payload;
  const title_hu = payload.title_hu?.trim() || null;
  const title_en = payload.title_en?.trim() || null;
  const year = payload.year ? parseInt(payload.year, 10) || null : null;
  const imageUrls = Array.isArray(payload.imageUrls)
    ? payload.imageUrls.filter(Boolean)
    : [];

  let sort_order = await nextSortOrder(supabase, category);

  if (kind === "photo") {
    if (imageUrls.length === 0) throw new Error("Fotóhoz legalább egy kép kell.");
    const rows = imageUrls.map((url) => ({
      kind: "photo",
      category,
      image_url: url,
      title_hu,
      title_en,
      year,
      sort_order: sort_order++,
    }));
    const { error } = await supabase.from("portfolio_items").insert(rows);
    if (error) throw new Error(error.message);
  } else {
    const youtube_id = parseYouTubeId(payload.youtube);
    if (!youtube_id) throw new Error("Érvényes YouTube link/ID kell.");
    const { error } = await supabase.from("portfolio_items").insert({
      kind: "video",
      category,
      youtube_id,
      image_url: imageUrls[0] ?? null,
      title_hu,
      title_en,
      year,
      sort_order,
    });
    if (error) throw new Error(error.message);
  }
  revalidateAll();
}

export async function updateItemFields(payload) {
  const supabase = await createClient();
  const patch = {
    category: payload.category,
    title_hu: payload.title_hu?.trim() || null,
    title_en: payload.title_en?.trim() || null,
    year: payload.year ? parseInt(payload.year, 10) || null : null,
  };
  if (payload.youtube) {
    const yid = parseYouTubeId(payload.youtube);
    if (yid) patch.youtube_id = yid;
  }
  if (payload.image_url) patch.image_url = payload.image_url;

  const { error } = await supabase
    .from("portfolio_items")
    .update(patch)
    .eq("id", payload.id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function deleteItem(formData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

// Átrendezés: sort_order csere a szomszéddal ('up' | 'down') a kategórián belül.
export async function moveItem(formData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const dir = formData.get("dir");

  const { data: cur } = await supabase
    .from("portfolio_items")
    .select("id, category, sort_order")
    .eq("id", id)
    .single();
  if (!cur) return;

  const asc = dir === "up";
  const { data: neighbor } = await supabase
    .from("portfolio_items")
    .select("id, sort_order")
    .eq("category", cur.category)
    [asc ? "lt" : "gt"]("sort_order", cur.sort_order)
    .order("sort_order", { ascending: !asc })
    .limit(1)
    .maybeSingle();
  if (!neighbor) return;

  await supabase
    .from("portfolio_items")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", cur.id);
  await supabase
    .from("portfolio_items")
    .update({ sort_order: cur.sort_order })
    .eq("id", neighbor.id);
  revalidateAll();
}

// — Kategóriák (mappák) —

const ACCENTS = { á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u" };
function slugify(name) {
  const base = String(name || "")
    .toLowerCase()
    .replace(/[áéíóöőúüű]/g, (c) => ACCENTS[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || "mappa";
}

export async function createCategory(formData) {
  const supabase = await createClient();
  const title_hu = formData.get("title_hu")?.trim();
  const title_en = formData.get("title_en")?.trim();
  const service_key = formData.get("service_key")?.trim() || null;
  if (!title_hu || !title_en) throw new Error("Név (HU és EN) kötelező.");

  // egyedi slug
  let slug = slugify(title_hu);
  const { data: existing } = await supabase
    .from("categories")
    .select("slug")
    .like("slug", `${slug}%`);
  const taken = new Set((existing ?? []).map((r) => r.slug));
  if (taken.has(slug)) {
    let n = 2;
    while (taken.has(`${slug}-${n}`)) n++;
    slug = `${slug}-${n}`;
  }

  const { data: last } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = (last?.[0]?.sort_order ?? 0) + 1;

  if (service_key) {
    await supabase
      .from("categories")
      .update({ service_key: null })
      .eq("service_key", service_key);
  }

  const { error } = await supabase
    .from("categories")
    .insert({ slug, title_hu, title_en, service_key, sort_order });
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function updateCategory(formData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const title_hu = formData.get("title_hu")?.trim();
  const title_en = formData.get("title_en")?.trim();
  const service_key = formData.get("service_key")?.trim() || null;
  if (!title_hu || !title_en) throw new Error("Név (HU és EN) kötelező.");

  // egy szolgáltatás egy mappára mutat → máshol kiürítjük
  if (service_key) {
    await supabase
      .from("categories")
      .update({ service_key: null })
      .eq("service_key", service_key)
      .neq("id", id);
  }

  const { error } = await supabase
    .from("categories")
    .update({ title_hu, title_en, service_key })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function deleteCategory(formData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const slug = formData.get("slug");
  const { count } = await supabase
    .from("portfolio_items")
    .select("id", { count: "exact", head: true })
    .eq("category", slug);
  if ((count ?? 0) > 0)
    throw new Error("A mappa nem üres — előbb töröld/mozgasd az elemeit.");
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

// Átrendezés: az ID-k sorrendje adja az új sort_order-t (1-től).
export async function reorderCategories(orderedIds) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("categories").update({ sort_order: i + 1 }).eq("id", id)
    )
  );
  revalidateAll();
}

// Tömeges törlés.
export async function deleteItems(ids) {
  if (!ids?.length) return;
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
}

// Tömeges áthelyezés másik mappába (a cél-mappa végére).
export async function moveItems(ids, category) {
  if (!ids?.length || !category) return;
  const supabase = await createClient();
  let so = await nextSortOrder(supabase, category);
  await Promise.all(
    ids.map((id, i) =>
      supabase
        .from("portfolio_items")
        .update({ category, sort_order: so + i })
        .eq("id", id)
    )
  );
  revalidateAll();
}

export async function reorderItems(orderedIds) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("portfolio_items").update({ sort_order: i + 1 }).eq("id", id)
    )
  );
  revalidateAll();
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/admin");
}
