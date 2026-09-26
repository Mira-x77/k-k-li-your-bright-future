-- Run this in the Supabase SQL editor for project mmpcjtmvnbybkarlbgxo.

create table if not exists public.sign_ins (
  id text primary key,
  student_name text,
  parent_name text,
  parent_phone text,
  series text,
  subjects text[],
  payment_plan text,
  payment_method text,
  registration_fee_paid boolean default false,
  tuition_fee_paid numeric default 0,
  total_amount_due numeric default 0,
  status text,
  saturday_session_included boolean default true,
  photo_url text,
  created_at timestamptz default now(),
  read_by_admin boolean default false,
  notes text
);

create table if not exists public.site_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  path text,
  device text,
  created_at timestamptz default now()
);

alter table public.sign_ins enable row level security;
alter table public.site_visits enable row level security;

drop policy if exists "public sign_ins access" on public.sign_ins;
create policy "public sign_ins access"
  on public.sign_ins
  for all
  using (true)
  with check (true);

drop policy if exists "public site_visits insert" on public.site_visits;
create policy "public site_visits insert"
  on public.site_visits
  for insert
  with check (true);

drop policy if exists "public site_visits read" on public.site_visits;
create policy "public site_visits read"
  on public.site_visits
  for select
  using (true);

alter table public.sign_ins replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.sign_ins;
exception
  when duplicate_object then null;
end $$;
