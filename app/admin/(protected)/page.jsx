import { createClient } from "@/lib/supabase/server";
import AdminDrive from "./AdminDrive";

export const metadata = { title: "Admin — Stillsoul Production" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("portfolio_items")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <AdminDrive
      categories={categories ?? []}
      items={items ?? []}
      email={user?.email}
    />
  );
}
