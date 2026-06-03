import Link from "next/link";
import { Download, Search, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { orders } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatters";

export default function DashboardTicketsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Tickets"
        title="Reservations, purchases, and downloadable passes"
        description="Each ticket keeps a unique ID, QR payload, event details, owner information, and payment status."
      />
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search by ticket ID, attendee, event, or payment status" />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="space-y-5 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant={order.paymentStatus === "success" ? "success" : "outline"}>{order.paymentStatus}</Badge>
                  <h3 className="mt-3 text-2xl font-semibold">{order.eventTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{order.attendeeName}</p>
                </div>
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-background">
                  <QRCodeSVG value={order.qrPayload} size={84} />
                </div>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <span>Ticket ID: {order.ticketId}</span>
                <span>Payment: {order.paymentMethod}</span>
                <span>Amount: {formatCurrency(order.amount, order.currency)}</span>
                <span>Created: {new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href={`/api/tickets/${order.ticketId}`}>
                    <Download className="h-4 w-4" />
                    Download ticket
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/dashboard/payments">
                    <QrCode className="h-4 w-4" />
                    Payment details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

