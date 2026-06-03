import Image from "next/image";
import Link from "next/link";
import { Clock3, Layers3, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CourseListing } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";

export function CourseCard({ course }: Readonly<{ course: CourseListing }>) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image src={course.coverImage} alt={course.title} fill className="object-cover" />
        <div className="absolute left-4 top-4">
          <Badge>{course.category}</Badge>
        </div>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
          </div>
          <p className="text-lg font-semibold">{formatCurrency(course.price, course.currency)}</p>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />{course.duration}</span>
          <span className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-primary" />{course.modules.length} modules</span>
          <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />{course.enrolled}/{course.enrollmentLimit} enrolled</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{course.rating} / 5 rating</span>
          <Link href={`/courses/${course.slug}`} className="text-sm font-medium text-primary hover:underline">
            View course
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

