# Talent Reveal Rwanda (EventHub)

Modern SaaS platform for creators, trainers, institutions, teachers, coaches, and businesses to publish, monetize, and manage events, bootcamps, workshops, courses, training programs, and conferences.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn-style UI primitives
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Vercel-ready deployment

## What is included

- Complete folder structure for a scalable app-router project
- Normalized PostgreSQL schema
- Supabase RLS policies
- Auth flow screens
- Organizer dashboard
- Super admin dashboard
- Event and course detail pages
- Ticket ordering and download flow
- Mobile money payment architecture scaffolding
- Search and reporting API routes

## Key routes

- `/` marketing homepage
- `/auth/login`
- `/auth/register`
- `/auth/reset-password`
- `/auth/profile`
- `/dashboard`
- `/dashboard/events`
- `/dashboard/events/new`
- `/dashboard/courses`
- `/dashboard/courses/new`
- `/dashboard/tickets`
- `/dashboard/payments`
- `/dashboard/reviews`
- `/dashboard/notifications`
- `/dashboard/reports`
- `/dashboard/settings`
- `/admin`
- `/events/[slug]`
- `/courses/[slug]`

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in your Supabase URL, anon key, and service role key.
3. Install dependencies:

```bash
cmd /c npm install
```

4. Run the app:

```bash
cmd /c npm run dev
```

## Supabase

Apply `supabase/migrations/0001_initial.sql` first, then `supabase/seed.sql` if you want starter categories.

## Payment architecture

The platform is scaffolded to support MTN MoMo and Airtel Money verification flows:

- user selects a ticket or course
- app records a pending payment row
- provider verification webhook confirms the transaction
- backend marks the payment verified/successful
- the ticket QR or enrollment receipt becomes available

## Production notes

- Use Vercel for deployment
- Store secrets in environment variables only
- Keep Supabase RLS enabled in every environment
- Replace mock arrays with live Supabase queries and server actions

