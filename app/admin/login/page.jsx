"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-8 text-white">
      <h1 className="mb-2 text-2xl font-semibold uppercase tracking-widest">
        StillSoul Admin
      </h1>
      <p className="mb-8 text-sm text-white/50">
        Belépés a tartalomkezeléshez
      </p>
      <button
        type="button"
        onClick={signIn}
        disabled={loading}
        className="flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <FcGoogle className="text-xl" />
        {loading ? "Átirányítás…" : "Belépés Google-fiókkal"}
      </button>
    </main>
  );
}
