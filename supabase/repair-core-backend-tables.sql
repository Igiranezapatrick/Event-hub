-- Repair script for a partially-created EventHub database.
-- Run this if Supabase says a relation like public.progress_records or public.payments does not exist.
-- After this succeeds, run run-this-first-complete.sql again from the top.

create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('super_admin', 'organizer', 'attendee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.listing_status as enum ('draft', 'pending_review', 'published', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.ticket_tier as enum ('regular', 'vip', 'early_bird', 'student', 'custom');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_method as enum ('mtn_momo', 'airtel_money', 'card', 'free');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'verified', 'success', 'failed', 'refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_type as enum (
    'new_event_published',
    'ticket_purchased',
    'event_reminder',
    'course_enrollment',
    'payment_success'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.review_target_type as enum ('event', 'course');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  username text not null unique default gen_random_uuid()::text,
  email text not null unique default gen_random_uuid()::text,
  phone_number text,
  bio text,
  country text,
  city text,
  profile_image text,
  role public.user_role not null default 'attendee',
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  kind text not null check (kind in ('event', 'course', 'shared')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  website_url text,
  logo_url text,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  venue text not null,
  google_maps_url text,
  cover_image text,
  start_date timestamptz not null default now(),
  end_date timestamptz not null default now(),
  capacity integer not null default 0 check (capacity >= 0),
  ticket_price numeric(12,2) not null default 0,
  currency text not null default 'RWF',
  status public.listing_status not null default 'draft',
  featured boolean not null default false,
  is_free boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_gallery_images (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.event_tags (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  unique (event_id, tag)
);

create table if not exists public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  tier public.ticket_tier not null default 'regular',
  price numeric(12,2) not null default 0,
  quantity integer not null default 0 check (quantity >= 0),
  sold integer not null default 0 check (sold >= 0),
  sale_start timestamptz,
  sale_end timestamptz,
  currency text not null default 'RWF',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  ticket_type_id uuid references public.ticket_types(id) on delete set null,
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'RWF',
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  ticket_uid text not null unique,
  qr_payload text not null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  checked_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  target_type public.review_target_type not null,
  target_id uuid not null,
  author_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  cover_image text,
  price numeric(12,2) not null default 0,
  currency text not null default 'RWF',
  duration text,
  enrollment_limit integer not null default 0 check (enrollment_limit >= 0),
  status public.listing_status not null default 'draft',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  duration text,
  content_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_attachments (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  title text not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  payment_id uuid,
  status text not null default 'active',
  progress_percent numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, student_id)
);

create table if not exists public.progress_records (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enrollment_id, lesson_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  transaction_id text not null unique,
  order_id uuid references public.orders(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete cascade,
  amount numeric(12,2) not null default 0,
  currency text not null default 'RWF',
  payment_method public.payment_method not null default 'mtn_momo',
  status public.payment_status not null default 'pending',
  provider_reference text,
  payment_payload jsonb,
  verified_at timestamptz,
  platform_fee_rate numeric(5,2) not null default 10.00,
  platform_fee_amount numeric(12,2) not null default 0,
  organizer_net_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  table_name text not null,
  row_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

