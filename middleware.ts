import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
