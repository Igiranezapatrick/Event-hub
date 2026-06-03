import { BellRing } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { notifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Notifications"
        title="In-app and email event alerts"
        description="Send reminders for new publications, ticket purchases, enrollment confirmations, and payment success."
      />
      <div className="grid gap-4">
        {notifications.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BellRing className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.when}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

