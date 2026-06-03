-- Talent Reveal Rwanda (EventHub)
-- Normalized schema for events, tickets, courses, payments, reviews, notifications, and audit logging.

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  username text not null unique,
  email text not null unique,
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
  start_date timestamptz not null,
  end_date timestamptz not null,
  capacity integer not null check (capacity >= 0),
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
  quantity integer not null check (quantity >= 0),
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
  total_amount numeric(12,2) not null,
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
  amount numeric(12,2) not null,
  currency text not null default 'RWF',
  payment_method public.payment_method not null,
  status public.payment_status not null default 'pending',
  provider_reference text,
  payment_payload jsonb,
  verified_at timestamptz,
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

create index if not exists idx_events_status_start on public.events(status, start_date);
create index if not exists idx_events_organizer on public.events(organizer_id);
create index if not exists idx_courses_status on public.courses(status);
create index if not exists idx_ticket_types_event on public.ticket_types(event_id);
create index if not exists idx_orders_event on public.orders(event_id);
create index if not exists idx_tickets_owner on public.tickets(owner_id);
create index if not exists idx_payments_status on public.payments(status);
create index if not exists idx_notifications_user on public.notifications(user_id);

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role::text from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.current_user_role() = 'super_admin';
$$;

create or replace function public.is_organizer_or_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.current_user_role() in ('super_admin', 'organizer');
$$;

create or replace function public.owns_event(event_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.events e where e.id = event_uuid and e.organizer_id = auth.uid()
  ) or public.is_admin();
$$;

create or replace function public.owns_course(course_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.courses c where c.id = course_uuid and c.organizer_id = auth.uid()
  ) or public.is_admin();
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.organizations enable row level security;
alter table public.events enable row level security;
alter table public.event_gallery_images enable row level security;
alter table public.event_tags enable row level security;
alter table public.ticket_types enable row level security;
alter table public.orders enable row level security;
alter table public.tickets enable row level security;
alter table public.reviews enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_lessons enable row level security;
alter table public.lesson_attachments enable row level security;
alter table public.enrollments enable row level security;
alter table public.progress_records enable row level security;
alter table public.payments enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_select_own_or_authenticated"
on public.profiles for select
to authenticated
using (true);

create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "categories_public_read"
on public.categories for select
to anon, authenticated
using (true);

create policy "categories_admin_write"
on public.categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "organizations_public_read"
on public.organizations for select
to anon, authenticated
using (true);

create policy "organizations_owner_write"
on public.organizations for insert
to authenticated
with check (owner_id = auth.uid() or public.is_admin());

create policy "organizations_owner_update"
on public.organizations for update
to authenticated
using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

create policy "events_public_read_published"
on public.events for select
to anon, authenticated
using (status = 'published' or organizer_id = auth.uid() or public.is_admin());

create policy "events_organizer_insert"
on public.events for insert
to authenticated
with check (organizer_id = auth.uid() or public.is_admin());

create policy "events_organizer_update"
on public.events for update
to authenticated
using (organizer_id = auth.uid() or public.is_admin())
with check (organizer_id = auth.uid() or public.is_admin());

create policy "events_organizer_delete"
on public.events for delete
to authenticated
using (organizer_id = auth.uid() or public.is_admin());

create policy "event_gallery_public_read"
on public.event_gallery_images for select
to anon, authenticated
using (exists (
  select 1 from public.events e
  where e.id = event_id and (e.status = 'published' or e.organizer_id = auth.uid() or public.is_admin())
));

create policy "event_gallery_owner_write"
on public.event_gallery_images for all
to authenticated
using (public.owns_event(event_id))
with check (public.owns_event(event_id));

create policy "event_tags_public_read"
on public.event_tags for select
to anon, authenticated
using (exists (
  select 1 from public.events e
  where e.id = event_id and (e.status = 'published' or e.organizer_id = auth.uid() or public.is_admin())
));

create policy "event_tags_owner_write"
on public.event_tags for all
to authenticated
using (public.owns_event(event_id))
with check (public.owns_event(event_id));

create policy "ticket_types_public_read"
on public.ticket_types for select
to anon, authenticated
using (exists (
  select 1 from public.events e
  where e.id = event_id and (e.status = 'published' or e.organizer_id = auth.uid() or public.is_admin())
));

create policy "ticket_types_owner_write"
on public.ticket_types for all
to authenticated
using (public.owns_event(event_id))
with check (public.owns_event(event_id));

create policy "orders_owner_read"
on public.orders for select
to authenticated
using (buyer_id = auth.uid() or public.is_admin() or exists (
  select 1 from public.events e where e.id = event_id and e.organizer_id = auth.uid()
));

create policy "orders_owner_insert"
on public.orders for insert
to authenticated
with check (buyer_id = auth.uid() or public.is_admin());

create policy "tickets_owner_read"
on public.tickets for select
to authenticated
using (owner_id = auth.uid() or public.is_admin() or exists (
  select 1 from public.events e where e.id = event_id and e.organizer_id = auth.uid()
));

create policy "tickets_admin_insert"
on public.tickets for insert
to authenticated
with check (owner_id = auth.uid() or public.is_admin());

create policy "reviews_public_read"
on public.reviews for select
to anon, authenticated
using (true);

create policy "reviews_owner_write"
on public.reviews for insert
to authenticated
with check (author_id = auth.uid() or public.is_admin());

create policy "reviews_owner_update"
on public.reviews for update
to authenticated
using (author_id = auth.uid() or public.is_admin())
with check (author_id = auth.uid() or public.is_admin());

create policy "reviews_owner_delete"
on public.reviews for delete
to authenticated
using (author_id = auth.uid() or public.is_admin());

create policy "courses_public_read"
on public.courses for select
to anon, authenticated
using (status = 'published' or organizer_id = auth.uid() or public.is_admin());

create policy "courses_organizer_insert"
on public.courses for insert
to authenticated
with check (organizer_id = auth.uid() or public.is_admin());

create policy "courses_organizer_update"
on public.courses for update
to authenticated
using (organizer_id = auth.uid() or public.is_admin())
with check (organizer_id = auth.uid() or public.is_admin());

create policy "courses_organizer_delete"
on public.courses for delete
to authenticated
using (organizer_id = auth.uid() or public.is_admin());

create policy "course_modules_public_read"
on public.course_modules for select
to anon, authenticated
using (public.owns_course(course_id) or exists (
  select 1 from public.courses c where c.id = course_id and c.status = 'published'
));

create policy "course_modules_owner_write"
on public.course_modules for all
to authenticated
using (public.owns_course(course_id))
with check (public.owns_course(course_id));

create policy "course_lessons_public_read"
on public.course_lessons for select
to anon, authenticated
using (exists (
  select 1 from public.course_modules m
  join public.courses c on c.id = m.course_id
  where m.id = module_id and (c.status = 'published' or c.organizer_id = auth.uid() or public.is_admin())
));

create policy "course_lessons_owner_write"
on public.course_lessons for all
to authenticated
using (exists (
  select 1 from public.course_modules m
  where m.id = module_id and public.owns_course(m.course_id)
))
with check (exists (
  select 1 from public.course_modules m
  where m.id = module_id and public.owns_course(m.course_id)
));

create policy "lesson_attachments_public_read"
on public.lesson_attachments for select
to anon, authenticated
using (exists (
  select 1 from public.course_lessons l
  join public.course_modules m on m.id = l.module_id
  join public.courses c on c.id = m.course_id
  where l.id = lesson_id and (c.status = 'published' or c.organizer_id = auth.uid() or public.is_admin())
));

create policy "lesson_attachments_owner_write"
on public.lesson_attachments for all
to authenticated
using (exists (
  select 1 from public.course_lessons l
  join public.course_modules m on m.id = l.module_id
  where l.id = lesson_id and public.owns_course(m.course_id)
))
with check (exists (
  select 1 from public.course_lessons l
  join public.course_modules m on m.id = l.module_id
  where l.id = lesson_id and public.owns_course(m.course_id)
));

create policy "enrollments_owner_read"
on public.enrollments for select
to authenticated
using (student_id = auth.uid() or public.is_admin() or public.owns_course(course_id));

create policy "enrollments_owner_insert"
on public.enrollments for insert
to authenticated
with check (student_id = auth.uid() or public.is_admin());

create policy "progress_owner_read"
on public.progress_records for select
to authenticated
using (public.is_admin() or exists (
  select 1 from public.enrollments e where e.id = enrollment_id and (e.student_id = auth.uid() or public.owns_course(e.course_id))
));

create policy "progress_owner_write"
on public.progress_records for all
to authenticated
using (public.is_admin() or exists (
  select 1 from public.enrollments e where e.id = enrollment_id and (e.student_id = auth.uid() or public.owns_course(e.course_id))
))
with check (public.is_admin() or exists (
  select 1 from public.enrollments e where e.id = enrollment_id and (e.student_id = auth.uid() or public.owns_course(e.course_id))
));

create policy "payments_owner_read"
on public.payments for select
to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.orders o where o.id = order_id and (o.buyer_id = auth.uid() or public.owns_event(o.event_id)))
  or exists (select 1 from public.enrollments e where e.id = enrollment_id and (e.student_id = auth.uid() or public.owns_course(e.course_id)))
);

create policy "payments_owner_write"
on public.payments for insert
to authenticated
with check (public.is_admin() or exists (select 1 from public.orders o where o.id = order_id and o.buyer_id = auth.uid()));

create policy "notifications_owner_read"
on public.notifications for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "notifications_owner_update"
on public.notifications for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "audit_logs_admin_read"
on public.audit_logs for select
to authenticated
using (public.is_admin());

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger categories_updated_at before update on public.categories
for each row execute function public.set_updated_at();
create trigger organizations_updated_at before update on public.organizations
for each row execute function public.set_updated_at();
create trigger events_updated_at before update on public.events
for each row execute function public.set_updated_at();
create trigger ticket_types_updated_at before update on public.ticket_types
for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();
create trigger tickets_updated_at before update on public.tickets
for each row execute function public.set_updated_at();
create trigger reviews_updated_at before update on public.reviews
for each row execute function public.set_updated_at();
create trigger courses_updated_at before update on public.courses
for each row execute function public.set_updated_at();
create trigger course_modules_updated_at before update on public.course_modules
for each row execute function public.set_updated_at();
create trigger course_lessons_updated_at before update on public.course_lessons
for each row execute function public.set_updated_at();
create trigger enrollments_updated_at before update on public.enrollments
for each row execute function public.set_updated_at();
create trigger progress_records_updated_at before update on public.progress_records
for each row execute function public.set_updated_at();
create trigger payments_updated_at before update on public.payments
for each row execute function public.set_updated_at();
create trigger notifications_updated_at before update on public.notifications
for each row execute function public.set_updated_at();



-- === Platform fee extension ===
-- Platform commission tracking for Talent Reveal Rwanda (EventHub).
-- Run this after 0001_initial.sql if your database already exists.

do $$
begin
  if to_regclass('public.payments') is null then
    raise exception 'public.payments does not exist. Run supabase/migrations/0001_initial.sql before 0002_platform_fees.sql.';
  end if;
end $$;

alter table public.payments
  add column if not exists platform_fee_rate numeric(5,2) not null default 10.00,
  add column if not exists platform_fee_amount numeric(12,2) not null default 0,
  add column if not exists organizer_net_amount numeric(12,2) not null default 0;

create or replace function public.set_payment_fee_breakdown()
returns trigger
language plpgsql
as $$
begin
  new.platform_fee_amount = round((new.amount * new.platform_fee_rate / 100.0), 2);
  new.organizer_net_amount = new.amount - new.platform_fee_amount;
  return new;
end;
$$;

drop trigger if exists payments_fee_breakdown on public.payments;
create trigger payments_fee_breakdown
before insert or update of amount, platform_fee_rate
on public.payments
for each row execute function public.set_payment_fee_breakdown();

create or replace view public.admin_revenue_overview as
select
  coalesce(sum(amount), 0) as total_revenue,
  coalesce(sum(platform_fee_amount), 0) as platform_revenue,
  coalesce(sum(organizer_net_amount), 0) as organizer_revenue,
  count(*) filter (where status in ('verified', 'success')) as successful_payments,
  count(*) filter (where status = 'pending') as pending_payments
from public.payments;


-- === Auth profile trigger ===
-- Automatically create a public profile when a Supabase Auth user signs up.
-- This removes the need for the app to use the service-role key during normal registration.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  generated_username text;
begin
  generated_username := lower(
    regexp_replace(
      coalesce(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'user'),
      '[^a-zA-Z0-9]+',
      '-',
      'g'
    )
  ) || '-' || left(new.id::text, 6);

  insert into public.profiles (
    id,
    full_name,
    username,
    email,
    phone_number,
    bio,
    country,
    city,
    role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    generated_username,
    coalesce(new.email, ''),
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'bio',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'city',
    coalesce(new.raw_user_meta_data->>'role', 'attendee')::public.user_role
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    role = excluded.role,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();



-- === Storage buckets and policies ===
-- Supabase Storage buckets and policies for EventHub

insert into storage.buckets (id, name, public)
values
  ('profile-images', 'profile-images', true),
  ('event-media', 'event-media', true),
  ('course-media', 'course-media', true)
on conflict (id) do nothing;

create policy "profile_images_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'profile-images');

create policy "profile_images_owner_upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'profile-images');

create policy "profile_images_owner_update"
on storage.objects for update
to authenticated
using (bucket_id = 'profile-images')
with check (bucket_id = 'profile-images');

create policy "event_media_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'event-media');

create policy "event_media_owner_write"
on storage.objects for all
to authenticated
using (bucket_id = 'event-media')
with check (bucket_id = 'event-media');

create policy "course_media_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'course-media');

create policy "course_media_owner_write"
on storage.objects for all
to authenticated
using (bucket_id = 'course-media')
with check (bucket_id = 'course-media');


