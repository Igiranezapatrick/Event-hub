import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";

export default function DashboardCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Courses"
          title="Manage courses, modules, lessons, and paid training"
          description="Teachers and trainers can publish structured learning with modules, attachments, and progress tracking."
        />
        <Button asChild>
          <Link href="/dashboard/events/new">
            <Plus className="h-4 w-4" />
            New course
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search courses by name, category, or outcome" />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["Enroll", "Pay", "Track progress"].map((step, index) => (
          <Card key={step}>
            <CardContent className="p-5">
              <Badge variant="outline">0{index + 1}</Badge>
              <p className="mt-4 text-lg font-semibold">{step}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {index === 0 ? "Students can join with a free or paid enrollment flow." : index === 1 ? "Payment verification is stored against an order and transaction ID." : "Lessons and attachments unlock based on enrollment and status."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

