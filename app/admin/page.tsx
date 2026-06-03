import { ShieldCheck, Users, CalendarClock, GraduationCap, Ticket, CreditCard, MessageSquareMore, Tags, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { analytics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

const adminItems = [
  "Manage users",
  "Manage events",
  "Manage courses",
  "Manage tickets",
  "Manage payments",
  "Manage reviews",
  "Manage categories",
  "Manage reports",
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Admin"
        title="Super admin control center"
        description="A secure command layer for moderation, reporting, oversight, and operational cleanup."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: formatCurrency(analytics.totalRevenue, "RWF"), icon: CreditCard },
          { label: "Platform profit", value: formatCurrency(analytics.platformRevenue, "RWF"), icon: ShieldCheck },
          { label: "Users", value: analytics.totalUsers.toLocaleString(), icon: Users },
          { label: "Events", value: analytics.totalEvents.toString(), icon: CalendarClock },
          { label: "Courses", value: analytics.totalCourses.toString(), icon: GraduationCap },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-5">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-4 text-3xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Administrative modules</h3>
            <Badge variant="success">RLS + audit logs</Badge>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminItems.map((item) => (
              <div key={item} className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                <p className="font-medium">{item}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Control operations, verify content, and export reports with permission checks.
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-5"><BarChart3 className="h-5 w-5 text-primary" /><p className="mt-4 font-semibold">Monthly growth</p><p className="text-sm text-muted-foreground">18.4% MoM</p></CardContent></Card>
        <Card><CardContent className="p-5"><CreditCard className="h-5 w-5 text-primary" /><p className="mt-4 font-semibold">Commission rate</p><p className="text-sm text-muted-foreground">{analytics.platformFeeRate}% platform fee on paid orders.</p></CardContent></Card>
        <Card><CardContent className="p-5"><MessageSquareMore className="h-5 w-5 text-primary" /><p className="mt-4 font-semibold">Fraud detection</p><p className="text-sm text-muted-foreground">Flag unusual payment or booking behavior.</p></CardContent></Card>
        <Card><CardContent className="p-5"><Tags className="h-5 w-5 text-primary" /><p className="mt-4 font-semibold">Category governance</p><p className="text-sm text-muted-foreground">Keep events and courses discoverable and organized.</p></CardContent></Card>
      </div>
    </div>
  );
}
