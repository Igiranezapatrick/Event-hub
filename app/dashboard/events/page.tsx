import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { events } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { Input } from "@/components/ui/input";

export default function DashboardEventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Events"
          title="Create and manage all event listings"
          description="Draft, pending review, published, and cancelled states are ready for large-scale event operations."
        />
        <Button asChild>
          <Link href="/dashboard/events/new">
            <Plus className="h-4 w-4" />
            New event
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search by event name, organizer, category, or location" />
            </div>
            <div className="flex gap-2">
              {["Free", "Paid", "Upcoming", "Trending"].map((filter) => (
                <Badge key={filter} variant="outline" className="px-4 py-2">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

