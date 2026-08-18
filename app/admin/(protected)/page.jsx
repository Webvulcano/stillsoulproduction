import { createClient } from "@/lib/supabase/server";
import { mergeAbout, mergeServices } from "@/lib/siteContent";
import { signOut } from "../actions";
import AdminDrive from "./AdminDrive";
import AdminAbout from "./AdminAbout";
import AdminServices from "./AdminServices";

export const metadata = { title: "Admin — Stillsoul Production" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [{ data: categories }, { data: items }, { data: content }] =
    await Promise.all([
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("portfolio_items")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true }),
      supabase.from("site_content").select("key, value"),
    ]);

  const byKey = Object.fromEntries((content ?? []).map((r) => [r.key, r.value]));
  const about = mergeAbout(byKey.about);
  const services = mergeServices(byKey.services);

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-black px-5 py-8 text-white">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold uppercase tracking-widest">
            StillSoul — Admin
          </h1>
          <p className="text-xs text-white/40">{user?.email}</p>
        </div>
        <form action={signOut}>
          <button className="rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors">
            Kijelentkezés
          </button>
        </form>
      </header>

      {/* key = szerver-állapot → mentés után a piszkozat frissül */}
      <AdminAbout key={JSON.stringify(about)} about={about} />
      <AdminServices services={services} />
      <AdminDrive categories={categories ?? []} items={items ?? []} />
    </main>
  );
}
