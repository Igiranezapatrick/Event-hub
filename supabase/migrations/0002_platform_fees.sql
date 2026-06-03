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
