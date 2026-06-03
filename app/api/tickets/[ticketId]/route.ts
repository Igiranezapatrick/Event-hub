import { NextRequest, NextResponse } from "next/server";
import { orders } from "@/lib/mock-data";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId } = await params;
  const ticket = orders.find((item) => item.ticketId === ticketId);

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const body = [
    "Talent Reveal Rwanda Ticket",
    `Ticket ID: ${ticket.ticketId}`,
    `Order ID: ${ticket.id}`,
    `Event: ${ticket.eventTitle}`,
    `Owner: ${ticket.attendeeName}`,
    `Amount: ${ticket.amount} ${ticket.currency}`,
    `Payment Method: ${ticket.paymentMethod}`,
    `QR Payload: ${ticket.qrPayload}`,
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${ticket.ticketId}.txt"`,
    },
  });
}
