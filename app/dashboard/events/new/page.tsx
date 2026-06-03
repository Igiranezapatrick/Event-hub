import { createEventAction } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewEventPage() {
  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="section-label">Create listing</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Publish an event, workshop, bootcamp, or conference</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Add the public details, ticket price, seats, dates, and review status before publishing.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Listing details</CardTitle>
          <CardDescription>Creators can save drafts, submit for review, or publish directly when approved.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createEventAction} className="grid gap-4 md:grid-cols-2">
            <Input name="title" placeholder="Title" required />
            <Input name="slug" placeholder="Slug, for example kigali-tech-summit" required />
            <Input name="category" placeholder="Category, for example Conference" required />
            <Input name="coverImage" placeholder="Cover image URL" />
            <Input name="venue" placeholder="Venue / Location" required />
            <Input name="googleMapsUrl" placeholder="Google Maps URL" />
            <Input name="startDate" type="datetime-local" required />
            <Input name="endDate" type="datetime-local" required />
            <Input name="capacity" type="number" min="1" placeholder="Available seats / capacity" required />
            <Input name="ticketQuantity" type="number" min="1" placeholder="Regular ticket quantity" required />
            <Input name="ticketPrice" type="number" min="0" placeholder="Ticket price" required />
            <Input name="currency" placeholder="Currency" defaultValue="RWF" />
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
            <Input name="tags" placeholder="Tags separated by commas, for example tech, startups, kigali" className="md:col-span-2" />
            <div className="md:col-span-2 space-y-2">
              <Textarea name="description" placeholder="Description (minimum 10 characters)" minLength={10} required />
              <p className="text-xs text-muted-foreground">Provide a detailed description of your event (at least 10 characters)</p>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Publish listing</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

