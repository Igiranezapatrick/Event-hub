import { Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { reviews } from "@/lib/mock-data";

export default function DashboardReviewsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Reviews"
        title="Ratings and testimonials"
        description="Events and courses support 1-5 star ratings with structured feedback for trust and quality control."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className={`h-4 w-4 ${index < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-500"}`} />
                ))}
              </div>
              <p className="text-lg font-medium">{review.body}</p>
              <p className="text-sm text-muted-foreground">By {review.authorName}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

