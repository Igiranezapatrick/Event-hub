import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.warn("Logout error suppressed:", error.message);
  }

  return NextResponse.json({ ok: true });
}
