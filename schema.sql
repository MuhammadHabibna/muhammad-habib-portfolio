-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  headline text,
  bio_short text,
  bio_long text,
  location text,
  profile_photo text,
  banner_image text,
  cv_url text,
  contact_email text,
  updated_at timestamp with time zone,
  constraint username_length check (char_length(full_name) >= 3)
);

create table public.admins (
  user_id uuid references auth.users not null primary key,
  created_at timestamp with time zone default now()
);

create type project_type as enum ('PERSONAL', 'TEAM');
create type content_status as enum ('DRAFT', 'PUBLISHED');

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  type project_type default 'PERSONAL',
  status content_status default 'DRAFT',
  start_date date,
  end_date date,
  role text,
  summary text,
  description text, -- Markdown
  highlights text[], -- Array of strings
  tech_stack text[], -- Array of strings
  tags text[], -- Array of strings
  metrics jsonb, -- Key-value pairs
  github_url text,
  demo_url text,
  article_url text,
  thumbnail_image text,
  gallery_images text[], -- Array of URLs
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table public.certifications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  issuer text not null,
  issue_date date,
  expiry_date date,
  credential_id text,
  verify_url text,
  certificate_image text,
  status content_status default 'DRAFT',
  created_at timestamp with time zone default now()
);

create table public.organizations (
  id uuid default uuid_generate_v4() primary key,
  org_name text not null,
  role_title text not null,
  start_date date,
  end_date date,
  description text,
  achievements text[],
  logo text,
  link_url text,
  status content_status default 'DRAFT',
  created_at timestamp with time zone default now()
);

create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  category text not null, -- AI/ML, Web, Tools, Other
  skill_name text not null,
  level integer check (level >= 0 and level <= 100),
  status content_status default 'PUBLISHED',
  created_at timestamp with time zone default now()
);

create table public.social_links (
  id uuid default uuid_generate_v4() primary key,
  platform text not null,
  url text not null,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.organizations enable row level security;
alter table public.skills enable row level security;
alter table public.social_links enable row level security;
alter table public.admins enable row level security;

-- Helper function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$ language sql security definer;

-- Public Access Policies (Read Only)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Public published projects are viewable by everyone"
  on public.projects for select
  using (status = 'PUBLISHED');

create policy "Public published certifications are viewable by everyone"
  on public.certifications for select
  using (status = 'PUBLISHED');

create policy "Public published organizations are viewable by everyone"
  on public.organizations for select
  using (status = 'PUBLISHED');

create policy "Public published skills are viewable by everyone"
  on public.skills for select
  using (status = 'PUBLISHED');

create policy "Public social links are viewable by everyone"
  on public.social_links for select
  using (true);

-- Admin Access Policies (Full Create/Update/Delete)
-- Pro tip: Admin check should be robust. Alternatively, check against admins table directly.

create policy "Admins can do everything on profiles"
  on public.profiles for all
  using (is_admin());

create policy "Admins can do everything on projects"
  on public.projects for all
  using (is_admin());

create policy "Admins can do everything on certifications"
  on public.certifications for all
  using (is_admin());

create policy "Admins can do everything on organizations"
  on public.organizations for all
  using (is_admin());

create policy "Admins can do everything on skills"
  on public.skills for all
  using (is_admin());

create policy "Admins can do everything on social_links"
  on public.social_links for all
  using (is_admin());

create policy "Admins can view and manage admins list"
  on public.admins for select
  using (is_admin());

-- Storage Policies (You need to create 'portfolio' bucket in the dashboard)
-- These are hypothetical as Storage RLS is handled in Storage menu often, but can be done via SQL too.
-- insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'portfolio' );
-- create policy "Admin Upload" on storage.objects for insert using ( bucket_id = 'portfolio' and is_admin() );
-- create policy "Admin Delete" on storage.objects for delete using ( bucket_id = 'portfolio' and is_admin() );

-- Seed Data (Optional - add your own user ID to admins manually first!)
-- insert into public.admins (user_id) values ('your-user-id');
