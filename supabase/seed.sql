insert into public.categories (name, slug, kind) values
('Conference', 'conference', 'event'),
('Workshop', 'workshop', 'event'),
('Bootcamp', 'bootcamp', 'event'),
('Course', 'course', 'course'),
('Training Program', 'training-program', 'shared')
on conflict do nothing;

