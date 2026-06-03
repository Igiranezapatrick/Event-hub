import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold">Talent Reveal Rwanda (EventHub)</p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A multi-role platform for events, bootcamps, conferences, workshops, and paid learning products.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard">Organizer dashboard</Link>
          <Link href="/admin">Admin dashboard</Link>
          <Link href="/events/kigali-innovation-forum-2026">Event page</Link>
          <Link href="/courses/founder-marketing-system">Course page</Link>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>Supabase Auth</p>
          <p>PostgreSQL + RLS</p>
          <p>MTN MoMo + Airtel Money</p>
          <p>Vercel deployment ready</p>
        </div>
      </div>
    </footer>
  );
}

