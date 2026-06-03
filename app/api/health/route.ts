import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "Talent Reveal Rwanda EventHub",
    timestamp: new Date().toISOString(),
  });
}

