import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Napi ping (Vercel Cron) → a Supabase free projekt nem "pause"-ol.
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { error } = await supabase
    .from("portfolio_items")
    .select("id", { count: "exact", head: true });
  return NextResponse.json({ ok: !error, at: new Date().toISOString() });
}
