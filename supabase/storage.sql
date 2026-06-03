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

