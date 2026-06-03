"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

const listingStatusSchema = z.enum(["draft", "pending_review", "published", "cancelled"]);

const eventSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  description: z.string().min(10, "Description is required."),
  category: z.string().min(2, "Category is required."),
  coverImage: z.string().url().optional().or(z.literal("")),
  venue: z.string().min(2, "Venue is required."),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  capacity: z.coerce.number().int().positive("Capacity must be greater than zero."),
  ticketPrice: z.coerce.number().min(0, "Ticket price cannot be negative."),
  ticketQuantity: z.coerce.number().int().positive("Ticket quantity must be greater than zero."),
  currency: z.string().default("RWF"),
  status: listingStatusSchema.default("pending_review"),
  tags: z.string().optional(),
});

const courseSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),
  description: z.string().min(10, "Description is required."),
  category: z.string().min(2, "Category is required."),
  coverImage: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  duration: z.string().min(2, "Duration is required."),
  enrollmentLimit: z.coerce.number().int().positive("Enrollment limit must be greater than zero."),
  currency: z.string().default("RWF"),
  status: listingStatusSchema.default("pending_review"),
  learningOutcomes: z.string().optional(),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function requireUser() {
  const supabase = await createServerSupabase();
  const { data } = await (supabase.auth as any).getUser();

  if (!data?.user?.id) {
    redirect("/auth/login");
  }

  return { supabase, user: data.user, userId: data.user.id as string };
}

async function findCategoryId(supabase: any, name: string) {
  const slug = slugify(name);
  const { data } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();

  return (data?.id as string | undefined) ?? null;
}

async function ensureCurrentProfile(supabase: any, user: any) {
  const email = user.email ?? `${user.id}@eventhub.local`;
  const fullName = user.user_metadata?.full_name ?? email.split("@")[0] ?? "EventHub User";
  const username = `${slugify(user.user_metadata?.username ?? fullName) || "user"}-${String(user.id).slice(0, 6)}`;

  // Profile is auto-created by auth trigger, just update it if needed
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      username,
      email,
      role: user.user_metadata?.role ?? "organizer",
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function createEventAction(formData: FormData) {
  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    coverImage: formData.get("coverImage"),
    venue: formData.get("venue"),
    googleMapsUrl: formData.get("googleMapsUrl"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    capacity: formData.get("capacity"),
    ticketPrice: formData.get("ticketPrice"),
    ticketQuantity: formData.get("ticketQuantity"),
    currency: formData.get("currency") || "RWF",
    status: formData.get("status") || "pending_review",
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Please complete the event form.");
  }

  const { supabase, user, userId: organizerId } = await requireUser();
  await ensureCurrentProfile(supabase, user);
  const categoryId = await findCategoryId(supabase, parsed.data.category);
  const { data: event, error } = await supabase
    .from("events")
    .insert({
      organizer_id: organizerId,
      category_id: categoryId,
      title: parsed.data.title,
      slug: slugify(parsed.data.slug),
      description: parsed.data.description,
      venue: parsed.data.venue,
      google_maps_url: parsed.data.googleMapsUrl || null,
      cover_image: parsed.data.coverImage || null,
      start_date: new Date(parsed.data.startDate).toISOString(),
      end_date: new Date(parsed.data.endDate).toISOString(),
      capacity: parsed.data.capacity,
      ticket_price: parsed.data.ticketPrice,
      currency: parsed.data.currency,
      status: parsed.data.status,
      is_free: parsed.data.ticketPrice === 0,
    })
    .select("id, slug")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { error: ticketError } = await supabase.from("ticket_types").insert({
    event_id: event.id,
    name: "Regular",
    tier: "regular",
    price: parsed.data.ticketPrice,
    quantity: parsed.data.ticketQuantity,
    currency: parsed.data.currency,
  });

  if (ticketError) {
    throw new Error(ticketError.message);
  }

  const tags = (parsed.data.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (tags.length > 0) {
    const { error: tagsError } = await supabase
      .from("event_tags")
      .insert(tags.map((tag) => ({ event_id: event.id, tag })));

    if (tagsError) {
      throw new Error(tagsError.message);
    }
  }

  redirect(`/events/${event.slug}`);
}

export async function createCourseAction(formData: FormData) {
  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    coverImage: formData.get("coverImage"),
    price: formData.get("price"),
    duration: formData.get("duration"),
    enrollmentLimit: formData.get("enrollmentLimit"),
    currency: formData.get("currency") || "RWF",
    status: formData.get("status") || "pending_review",
    learningOutcomes: formData.get("learningOutcomes"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Please complete the course form.");
  }

  const { supabase, user, userId: organizerId } = await requireUser();
  await ensureCurrentProfile(supabase, user);
  const categoryId = await findCategoryId(supabase, parsed.data.category);
  const { data: course, error } = await supabase
    .from("courses")
    .insert({
      organizer_id: organizerId,
      category_id: categoryId,
      title: parsed.data.title,
      slug: slugify(parsed.data.slug),
      description: parsed.data.description,
      cover_image: parsed.data.coverImage || null,
      price: parsed.data.price,
      currency: parsed.data.currency,
      duration: parsed.data.duration,
      enrollment_limit: parsed.data.enrollmentLimit,
      status: parsed.data.status,
    })
    .select("slug")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/courses/${course.slug}`);
}
