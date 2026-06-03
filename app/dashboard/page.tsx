import Link from "next/link";
import { BarChart3, CalendarClock, CreditCard, Ticket, Users, FileText, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/metric-card";
import { SectionHeading } from "@/components/section-heading";
import { analytics, events, courses, notifications, orders, organizers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Overview"
          title="Organizer command center"
          description="Track revenue, content, bookings, learning, and trusted payment activity in one place."
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard/events/new">Create listing</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/reports">Export reports</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total revenue" value={formatCurrency(analytics.totalRevenue, "RWF")} delta="+12.4% MoM" />
        <MetricCard label="Active users" value={analytics.totalUsers.toLocaleString()} delta="+8.2% MoM" />
        <MetricCard label="Published events" value={analytics.totalEvents.toString()} delta="+24 this month" />
        <MetricCard label="Course enrollments" value={analytics.ticketSales.toLocaleString()} delta="+18.4% MoM" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-label">Publishing health</p>
                <h3 className="mt-2 text-2xl font-semibold">Live marketplace signals</h3>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-muted/40 p-4">
                <CalendarClock className="h-5 w-5 text-primary" />
                <p className="mt-4 text-2xl font-semibold">{events.length}</p>
                <p className="text-sm text-muted-foreground">Featured events</p>
              </div>
              <div className="rounded-3xl bg-muted/40 p-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="mt-4 text-2xl font-semibold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Active courses</p>
              </div>
              <div className="rounded-3xl bg-muted/40 p-4">
                <FileText className="h-5 w-5 text-primary" />
                <p className="mt-4 text-2xl font-semibold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Recent orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="section-label">Organizer spotlight</p>
            <div className="mt-4 space-y-4">
              {organizers.map((organizer) => (
                <div key={organizer.id} className="flex items-center justify-between rounded-3xl border border-border/60 bg-muted/25 p-4">
                  <div>
                    <p className="font-semibold">{organizer.fullName}</p>
                    <p className="text-sm text-muted-foreground">{organizer.organizationName}</p>
                  </div>
                  <Badge variant={organizer.verified ? "success" : "outline"}>{organizer.verified ? "Verified" : "Review"}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recent orders</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/tickets">View all</Link>
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-col gap-2 rounded-3xl border border-border/60 bg-muted/25 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{order.eventTitle}</p>
                    <p className="text-sm text-muted-foreground">{order.attendeeName} • {order.ticketId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={order.paymentStatus === "success" ? "success" : "outline"}>{order.paymentStatus}</Badge>
                    <p className="font-semibold">{formatCurrency(order.amount, order.currency)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">System notifications</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/notifications">Open inbox</Link>
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.map((item) => (
                <div key={item.id} className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.when}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

