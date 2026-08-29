-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  capacity text,           -- e.g. "5 Seater"
  battery_capacity text,   -- e.g. "71.7 kWh"
  features text,           -- comma-separated, e.g. "Panoramic sunroof, 360 camera, ADAS"
  price numeric,
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.models enable row level security;

-- Anyone (including anonymous site visitors) can READ models
create policy "Public can view models"
  on public.models
  for select
  using (true);

-- Only logged-in users (your admin) can INSERT
create policy "Authenticated users can insert models"
  on public.models
  for insert
  to authenticated
  with check (true);

-- Only logged-in users (your admin) can UPDATE
create policy "Authenticated users can update models"
  on public.models
  for update
  to authenticated
  using (true);

-- Only logged-in users (your admin) can DELETE
create policy "Authenticated users can delete models"
  on public.models
  for delete
  to authenticated
  using (true);
