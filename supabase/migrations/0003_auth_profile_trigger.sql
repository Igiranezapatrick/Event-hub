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

