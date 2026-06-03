import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Globe2, QrCode, ShieldCheck, Ticket, WalletCards, CalendarClock, Building2, Users, Star, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseCard } from "@/components/course-card";
import { EventCard } from "@/components/event-card";
import { analytics, courses, events, organizers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

const features = [
  {
    icon: Sparkles,
    title: "Monetize everything",
    description: "Create paid and free events, bootcamps, workshops, courses, and conferences with ticket tiers and payment verification.",
  },
  {
    icon: Ticket,
    title: "Ticketing built in",
    description: "Multiple ticket types, QR-based check-in, downloadable passes, and order history for attendees and admins.",
  },
  {
    icon: WalletCards,
    title: "Mobile money ready",
    description: "MTN MoMo and Airtel Money flow support with verification states, transaction logs, and refund tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description: "Supabase Auth, row-level security policies, audit logs, and role-based dashboards for every actor.",
  },
];

const roleCards = [
  {
    title: "Super Admin",
    copy: "Manage users, reports, categories, payments, reviews, fraud signals, and analytics from one command center.",
  },
  {
    title: "Organizer / Creator",
    copy: "Publish events and courses, control ticket inventory, message attendees, and track monetization.",
  },
  {
    title: "Attendee / Student",
    copy: "Discover listings, reserve or buy tickets, enroll in courses, download tickets, and track progress.",
  },
];

export default function HomePage() {
  return (
    <div className="app-shell">
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-aurora opacity-80" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <div className="relative z-10 flex flex-col justify-center">
              <Badge className="w-fit bg-primary/10 text-primary">Built for Rwanda&apos;s creator economy</Badge>
              <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Talent Reveal Rwanda
                <span className="block text-muted-foreground">EventHub</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A modern SaaS platform for events, bootcamps, workshops, courses, training programs, and conferences.
                Organizers publish faster, attendees pay smoothly, and admins keep the marketplace trustworthy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/auth/register">
                    Create organizer account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/events/kigali-innovation-forum-2026">Explore events</Link>
                </Button>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                <Card className="bg-card/70">
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold">{analytics.totalEvents.toLocaleString()}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Events</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/70">
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold">{analytics.totalCourses.toLocaleString()}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Courses</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/70">
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold">{analytics.totalUsers.toLocaleString()}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Users</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/70">
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold">{analytics.monthlyGrowth}%</p>
                    <p className="mt-1 text-sm text-muted-foreground">Growth</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative z-10">
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={events[0].coverImage}
                    alt={events[0].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-3 p-6">
                    <Badge variant="success">Featured conference</Badge>
                    <h2 className="max-w-lg font-serif text-3xl font-semibold">{events[0].title}</h2>
                    <p className="max-w-lg text-sm text-foreground/90">{events[0].description}</p>
                    <div className="grid gap-3 rounded-3xl border border-border/60 bg-surface/50 p-4 text-sm backdrop-blur-md sm:grid-cols-2">
                      <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" />{events[0].startDate.slice(0, 10)}</span>
                      <span className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" />{events[0].venue}</span>
                      <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" />{events[0].organizerName}</span>
                      <span className="flex items-center gap-2"><QrCode className="h-4 w-4 text-primary" />Ticket QR delivery</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Platform"
            title="One platform for publishing, payments, tickets, learning, and reporting."
            description="Every role gets its own surface. Organizers create, attendees buy, admins govern, and the database stays normalized behind Supabase RLS."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent className="p-6">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Live inventory"
            title="Events and courses that already feel like a marketplace."
            description="A polished browsing experience for discovery, search, and booking with clean cards and rich detail pages."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Roles"
            title="Designed around how the platform will actually be used."
            description="The admin side stays sharp and the attendee side stays simple, while organizers get tools that support growth without clutter."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {roleCards.map((role) => (
              <Card key={role.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{role.title}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{role.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-border/60 bg-card/75 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="section-label">Payments</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">Mobile money first, with verified ticket delivery.</h2>
              <p className="mt-4 text-muted-foreground">
                The payment layer is structured for MTN MoMo and Airtel Money with transaction IDs, payment status, and receiptable ticket records.
              </p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/payments">View payment architecture</Link>
              </Button>
            </div>
            <Card className="bg-background/50">
              <CardContent className="grid gap-4 p-6">
                <div className="rounded-3xl border border-border/60 bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Initiation flow</p>
                  <p className="mt-2 text-lg font-semibold">Click to start the payment verification call.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Example: the attendee taps a payment button, dials the mobile money USSD flow, and the backend verifies the transaction before issuing the QR ticket.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" asChild>
                    <a href="tel:*182*1*1*25000%23">Start MTN MoMo call</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:*182*1*1*25000%23">Start Airtel Money call</a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The amount is derived from the ticket price and then matched against the payment confirmation record.
                </p>
                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <span>Total revenue: {formatCurrency(analytics.totalRevenue, "RWF")}</span>
                  <span>Ticket sales: {analytics.ticketSales.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[2rem] border border-border/60 bg-card/75 p-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-background/50 p-5">
              <Users className="h-5 w-5 text-primary" />
              <p className="mt-3 text-3xl font-semibold">{analytics.activeOrganizers}</p>
              <p className="text-sm text-muted-foreground">Active organizers</p>
            </div>
            <div className="rounded-3xl bg-background/50 p-5">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="mt-3 text-3xl font-semibold">RLS</p>
              <p className="text-sm text-muted-foreground">Supabase policy enforcement</p>
            </div>
            <div className="rounded-3xl bg-background/50 p-5">
              <Star className="h-5 w-5 text-primary" />
              <p className="mt-3 text-3xl font-semibold">4.8/5</p>
              <p className="text-sm text-muted-foreground">Average organizer rating</p>
            </div>
            <div className="rounded-3xl bg-background/50 p-5">
              <Ticket className="h-5 w-5 text-primary" />
              <p className="mt-3 text-3xl font-semibold">{formatCurrency(events[0].ticketPrice, events[0].currency)}</p>
              <p className="text-sm text-muted-foreground">Featured ticket price</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
