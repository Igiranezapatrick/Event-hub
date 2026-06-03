import Link from "next/link";
import { LayoutDashboard, Ticket, CalendarClock, GraduationCap, BellRing, Settings, ShieldCheck, Users, CreditCard, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/events", label: "Events", icon: CalendarClock },
  { href: "/dashboard/courses", label: "Courses", icon: GraduationCap },
  { href: "/dashboard/tickets", label: "Tickets", icon: Ticket },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/notifications", label: "Notifications", icon: BellRing },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-border/60 bg-background/50 px-4 py-6 backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card/70 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Organizer Console</p>
              <p className="mt-1 text-lg font-semibold">EventHub</p>
            </div>
            <Badge variant="success">Live</Badge>
          </div>
          <nav className="mt-6 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    item.href === "/dashboard" ? "bg-muted text-foreground" : "",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Separator className="my-6" />
          <div className="rounded-3xl border border-border/60 bg-primary/10 p-4">
            <p className="text-sm font-semibold text-primary">Role aware access</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Organizer, attendee, and super admin experiences share one secure schema and policy layer.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full border-primary/40 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/admin">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin view
              </Link>
            </Button>
          </div>
        </aside>
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

