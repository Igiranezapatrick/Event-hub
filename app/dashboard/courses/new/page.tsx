import { createCourseAction } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewCoursePage() {
  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="section-label">Create training</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Publish a course, camp, class, or paid training</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Teachers and trainers can set pricing, duration, enrollment limits, and the outcomes students should expect.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Training basics</CardTitle>
          <CardDescription>These fields map directly to the normalized courses table in Supabase.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCourseAction} className="grid gap-4 md:grid-cols-2">
            <Input name="title" placeholder="Title" required />
            <Input name="slug" placeholder="Slug, for example digital-skills-camp" required />
            <Input name="category" placeholder="Category, for example Bootcamp" required />
            <Input name="coverImage" placeholder="Cover image URL" />
            <Input name="price" type="number" min="0" placeholder="Training price" required />
            <Input name="currency" placeholder="Currency" defaultValue="RWF" />
            <Input name="duration" placeholder="Duration, for example 6 weeks" required />
            <Input name="enrollmentLimit" type="number" min="1" placeholder="Enrollment limit / seats" required />
            <select
              name="status"
              defaultValue="pending_review"
              className="h-11 rounded-2xl border border-border/70 bg-background/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2"
            >
              <option value="draft">Draft</option>
              <option value="pending_review">Pending Review</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Textarea name="learningOutcomes" placeholder="Learning outcomes, one per line" className="md:col-span-2" />
            <Textarea name="description" placeholder="Description" className="md:col-span-2" required />
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Publish training</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

