import { NextRequest, NextResponse } from "next/server";
import { courses, events } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";
  const category = request.nextUrl.searchParams.get("category")?.toLowerCase() ?? "";
  const location = request.nextUrl.searchParams.get("location")?.toLowerCase() ?? "";
  const date = request.nextUrl.searchParams.get("date")?.toLowerCase() ?? "";

  const matchedEvents = events.filter((event) => {
    const haystack = `${event.title} ${event.organizerName} ${event.category} ${event.venue} ${event.tags.join(" ")}`.toLowerCase();
    return (
      haystack.includes(query) &&
      (!category || event.category.toLowerCase().includes(category)) &&
      (!location || event.venue.toLowerCase().includes(location)) &&
      (!date || event.startDate.toLowerCase().includes(date) || event.endDate.toLowerCase().includes(date))
    );
  });

  const matchedCourses = courses.filter((course) => {
    const haystack = `${course.title} ${course.category} ${course.description}`.toLowerCase();
    return haystack.includes(query) && (!category || course.category.toLowerCase().includes(category));
  });

  return NextResponse.json({ events: matchedEvents, courses: matchedCourses });
}
