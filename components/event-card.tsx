import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EventListing } from "@/lib/types";
import { formatCurrency, formatDateTimeRange } from "@/lib/formatters";

export function EventCard({ event }: Readonly<{ event: EventListing }>) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{event.category}</Badge>
          {event.isFree ? <Badge variant="success">Free</Badge> : null}
        </div>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{formatCurrency(event.ticketPrice, event.currency)}</p>
            <p className="text-xs text-muted-foreground">Ticket from</p>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{formatDateTimeRange(event.startDate, event.endDate)}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{event.venue}</span>
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{event.attendees} / {event.capacity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {event.rating} ({event.reviewsCount} reviews)
          </span>
          <Link href={`/events/${event.slug}`} className="text-sm font-medium text-primary hover:underline">
            View event
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

