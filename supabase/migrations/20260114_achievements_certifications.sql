-- 0) Achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,                       -- e.g. "Finalist GEMASTIK 2025 – Data Mining"
  event text,                                -- e.g. "GEMASTIK"
  award text,                                -- e.g. "Finalist", "Winner", "1st Place"
  level text,                                -- e.g. "National", "International", "University"
  year int,                                  -- e.g. 2025
  date date,                                 -- optional exact date
  description text,                          -- short paragraph
  proof_url text,                            -- optional link (drive, news, linkedin post)
  status text default 'PUBLISHED',           -- using text instead of enum for simplicity/robustness
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 1) Certifications: add linkedin_url
alter table public.certifications
add column if not exists linkedin_url text;

-- 3) Enable RLS
alter table public.achievements enable row level security;
-- certifications should already have it, but ensuring:
alter table public.certifications enable row level security;

-- 4) Policies for achievements
drop policy if exists "public read published achievements" on public.achievements;
create policy "public read published achievements"
on public.achievements
for select
to anon
using (status = 'PUBLISHED');

drop policy if exists "admin manage achievements" on public.achievements;
create policy "admin manage achievements"
on public.achievements
for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- 5) Policies for certifications
drop policy if exists "public read published certifications" on public.certifications;
create policy "public read published certifications"
on public.certifications
for select
to anon
using (coalesce(status,'PUBLISHED') = 'PUBLISHED');

drop policy if exists "admin manage certifications" on public.certifications;
create policy "admin manage certifications"
on public.certifications
for all
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));
