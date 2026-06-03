import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users, Star, ArrowRight, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { events, getEventBySlug, getReviewsForTarget, getTicketTypesForEvent } from "@/lib/mock-data";
import { formatCurrency, formatDateTimeRange, formatLongDate } from "@/lib/formatters";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const eventReviews = getReviewsForTarget("event", event.id);
  const ticketTypes = getTicketTypesForEvent(event.id);
  const relatedEvents = events.filter((item) => item.id !== event.id && item.category === event.category).slice(0, 2);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/70">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[420px]">
            <Image src={event.coverImage} alt={event.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <Badge>{event.category}</Badge>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">{event.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">{event.description}</p>
            </div>
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket from</p>
                    <p className="text-3xl font-semibold">{formatCurrency(event.ticketPrice, event.currency)}</p>
                  </div>
                  <Badge variant={event.isFree ? "success" : "outline"}>{event.isFree ? "Free event" : event.status}</Badge>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{formatDateTimeRange(event.startDate, event.endDate)}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{event.venue}</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{event.attendees} / {event.capacity} seats reserved</span>
                  <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{event.rating} rating from {event.reviewsCount} reviews</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="#tickets">
                      <Ticket className="h-4 w-4" />
                      Reserve ticket
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={event.googleMapsUrl} target="_blank" rel="noreferrer">
                      Open map
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Organizer</p>
                <p className="mt-2 text-xl font-semibold">{event.organizerName}</p>
                <p className="mt-2 text-sm text-muted-foreground">{event.organizerRole}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Verified creator profile and branding-ready organizer page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <SectionHeading eyebrow="Event details" title="Everything attendees need in one place" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-muted/25 p-4">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="mt-2 font-medium">{formatLongDate(event.startDate)}</p>
              </div>
              <div className="rounded-3xl bg-muted/25 p-4">
                <p className="text-sm text-muted-foreground">Tags</p>
                <p className="mt-2 font-medium">{event.tags.join(", ")}</p>
              </div>
            </div>
            <div id="tickets" className="space-y-4">
              <h3 className="text-xl font-semibold">Ticket types</h3>
              <div className="space-y-3">
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-muted/25 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-sm text-muted-foreground">{ticket.sold}/{ticket.quantity} sold</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{ticket.tier}</Badge>
                      <p className="font-semibold">{formatCurrency(ticket.price, ticket.currency)}</p>
                      <Button size="sm" asChild>
                        <Link href="/dashboard/payments">Buy</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Reviews</h3>
              <div className="mt-4 space-y-3">
                {eventReviews.map((review) => (
                  <div key={review.id} className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{review.authorName}</p>
                      <p className="text-sm text-muted-foreground">{review.rating} / 5</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
                  </div>
                ))}
                {!eventReviews.length ? <p className="text-sm text-muted-foreground">No reviews yet.</p> : null}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Related events</h3>
              <div className="mt-4 space-y-3">
                {relatedEvents.map((related) => (
                  <Link key={related.id} href={`/events/${related.slug}`} className="flex items-center justify-between rounded-3xl border border-border/60 bg-muted/25 p-4 transition hover:bg-muted/40">
                    <div>
                      <p className="font-medium">{related.title}</p>
                      <p className="text-sm text-muted-foreground">{related.venue}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                ))}
                {!relatedEvents.length ? <p className="text-sm text-muted-foreground">No related events found.</p> : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
