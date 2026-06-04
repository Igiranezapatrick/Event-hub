import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";

const nav = [
  { href: "/#platform", label: "Platform" },
  { href: "/events/kigali-innovation-forum-2026", label: "Events" },
  { href: "/courses/founder-marketing-system", label: "Courses" },
  { href: "/dashboard", label: "" },
];

type SiteHeaderProps = {
  isLoggedIn: boolean;
};

export function SiteHeader({ isLoggedIn }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-sm font-black text-primary-foreground shadow-lg shadow-primary/25">
            TRR
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Talent Reveal Rwanda
            </p>
            <p className="text-base font-semibold">EventHub</p>
          </div>
        </Link>
        {!isLoggedIn ? (
          <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? <LogoutButton /> : null}
          {!isLoggedIn ? (
            <div className="hidden items-center gap-3 md:flex">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Rwanda SaaS
              </Badge>
              <Button asChild variant="outline">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Get started</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

