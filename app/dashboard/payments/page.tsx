import { CreditCard, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { analytics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

export default function DashboardPaymentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Payments"
        title="Payment architecture for MTN MoMo and Airtel Money"
        description="The backend stores transaction IDs, amount, method, status, and timestamps before issuing a QR ticket or enrollment receipt."
      />
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">Verification-first</Badge>
              <Badge variant="success">RLS protected</Badge>
            </div>
            <h3 className="text-2xl font-semibold">Mobile money flow</h3>
            <p className="text-sm leading-7 text-muted-foreground">
              1. User taps pay on the ticket or enrollment page.
              <br />
              2. The system builds a USSD payment instruction from the ticket price.
              <br />
              3. The payment webhook marks the transaction verified after provider confirmation.
              <br />
              4. A QR ticket or course enrollment receipt becomes available instantly.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                <Smartphone className="h-5 w-5 text-primary" />
                <p className="mt-3 font-medium">MTN MoMo / Airtel Money</p>
                <p className="mt-2 text-sm text-muted-foreground">Initiate a mobile money call flow with verification status tracking.</p>
              </div>
              <div className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <p className="mt-3 font-medium">Stored transaction record</p>
                <p className="mt-2 text-sm text-muted-foreground">Transaction ID, amount, status, method, and timestamp are normalized.</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/dashboard/tickets">
                View tickets
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="text-2xl font-semibold">{formatCurrency(analytics.totalRevenue, "RWF")}</p>
            <p className="text-sm text-muted-foreground">Tracked revenue across orders, payments, and verified tickets.</p>
            <div className="rounded-3xl border border-border/60 bg-muted/25 p-4 text-sm text-muted-foreground">
              Platform share: {formatCurrency(analytics.platformRevenue, "RWF")}
              <br />
              Organizer net: {formatCurrency(analytics.organizerRevenue, "RWF")}
              <br />
              Commission: {analytics.platformFeeRate}%
            </div>
            <div className="rounded-3xl border border-border/60 bg-muted/25 p-4 text-sm text-muted-foreground">
              Example flow:
              <br />
              `tel:*182*1*1*ticketFee#` is displayed as a verification step and then reconciled with the payment provider webhook.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
