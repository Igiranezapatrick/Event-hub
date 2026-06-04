import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createServerSupabase() {
  const cookieStore = (await cookies()) as any;

  function safeCookieSet(name: string, value: string, options: any) {
    try {
      cookieStore.set({ name, value, ...options });
    } catch {
      // Ignore cookie writes outside allowed Server Actions / Route Handlers.
    }
  }

  function safeCookieRemove(name: string, options: any) {
    try {
      cookieStore.set({ name, value: "", ...options, maxAge: 0 });
    } catch {
      // Ignore cookie writes outside allowed Server Actions / Route Handlers.
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set: safeCookieSet,
        remove: safeCookieRemove,
      },
    },
  );
}
