import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "json";

  if (format === "csv") {
    const csv = [
      "metric,value",
      `totalRevenue,${analytics.totalRevenue}`,
      `totalUsers,${analytics.totalUsers}`,
      `totalEvents,${analytics.totalEvents}`,
      `totalCourses,${analytics.totalCourses}`,
      `activeOrganizers,${analytics.activeOrganizers}`,
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="eventhub-report.csv"',
      },
    });
  }

  return NextResponse.json(analytics);
}

