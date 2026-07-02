import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";

// Védett admin-terület: csak bejelentkezett + engedélyezett (admins tábla) email.
export default async function ProtectedLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-8 text-center text-white">
        <h1 className="text-xl font-semibold">Nincs jogosultság</h1>
        <p className="text-sm text-white/60">
          A(z) <span className="text-white">{user.email}</span> fiók nem
          jogosult az admin felület használatára.
        </p>
        <form action={signOut}>
          <button className="mt-2 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
            Kijelentkezés
          </button>
        </form>
      </main>
    );
  }

  return children;
}
