import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpenCheck, Clock3, LockKeyhole, Layers3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCourseBySlug, getReviewsForTarget } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const courseReviews = getReviewsForTarget("course", course.id);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/70">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[380px]">
            <Image src={course.coverImage} alt={course.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <Badge>{course.category}</Badge>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">{course.description}</p>
            </div>
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-3xl font-semibold">{formatCurrency(course.price, course.currency)}</p>
                  </div>
                  <Badge variant="success">{course.status}</Badge>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />{course.duration}</span>
                  <span className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-primary" />{course.modules.length} modules</span>
                  <span className="flex items-center gap-2"><BookOpenCheck className="h-4 w-4 text-primary" />{course.enrolled}/{course.enrollmentLimit} enrolled</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/dashboard/payments">Enroll now</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/courses">Back to courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Outcomes</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {course.learningOutcomes.map((outcome) => (
                    <li key={outcome}>- {outcome}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold">Modules and lessons</h2>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                  <p className="font-semibold">{module.title}</p>
                  <div className="mt-3 space-y-2">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between rounded-2xl bg-background/60 px-4 py-3 text-sm">
                        <span className="flex items-center gap-2">
                          {lesson.locked ? <LockKeyhole className="h-4 w-4 text-muted-foreground" /> : <BookOpenCheck className="h-4 w-4 text-primary" />}
                          {lesson.title}
                        </span>
                        <span className="text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            {courseReviews.map((review) => (
              <div key={review.id} className="rounded-3xl border border-border/60 bg-muted/25 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.authorName}</p>
                  <p className="text-sm text-muted-foreground">{review.rating} / 5</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
              </div>
            ))}
            {!courseReviews.length ? <p className="text-sm text-muted-foreground">No reviews yet.</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
