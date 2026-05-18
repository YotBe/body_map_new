-- 0001_init_core.sql
-- Core tables: profiles, employers, employer_memberships, employer_admins.
-- RLS is enabled here; full policies live in 0003_rls_policies.sql.

-- ============================================================
-- profiles (1:1 with auth.users)
-- ============================================================
create table public.profiles (
  user_id          uuid primary key references auth.users on delete cascade,
  display_name     text,
  locale           text not null default 'en' check (locale in ('en','he')),
  date_of_birth    date,
  sex              text check (sex in ('male','female','other','prefer_not_to_say')),
  height_cm        int check (height_cm between 50 and 250),
  weight_kg        numeric(5,2) check (weight_kg between 20 and 300),
  occupation       text,
  onboarded_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Auto-create profile row on auth signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name, locale)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'locale', 'en')
  )
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- employers
-- ============================================================
create table public.employers (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null check (slug ~ '^[a-z0-9]([a-z0-9-]{0,38}[a-z0-9])?$'),
  name             text not null,
  seat_cap         int not null default 0 check (seat_cap >= 0),
  billing_status   text not null default 'trial'
                   check (billing_status in ('trial','active','past_due','cancelled')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
alter table public.employers enable row level security;

-- ============================================================
-- employer_memberships  (one row per (user, employer) link)
-- ============================================================
create table public.employer_memberships (
  user_id          uuid not null references auth.users on delete cascade,
  employer_id      uuid not null references public.employers on delete cascade,
  status           text not null default 'pending'
                   check (status in ('pending','active','revoked')),
  invited_email    text,
  joined_at        timestamptz,
  created_at       timestamptz not null default now(),
  primary key (user_id, employer_id)
);
alter table public.employer_memberships enable row level security;
create index employer_memberships_employer_id_idx
  on public.employer_memberships(employer_id);
create index employer_memberships_status_idx
  on public.employer_memberships(employer_id, status);

-- ============================================================
-- employer_admins  (HR/wellness staff with dashboard access)
-- ============================================================
create table public.employer_admins (
  user_id          uuid not null references auth.users on delete cascade,
  employer_id      uuid not null references public.employers on delete cascade,
  role             text not null default 'admin' check (role in ('admin','viewer')),
  created_at       timestamptz not null default now(),
  primary key (user_id, employer_id)
);
alter table public.employer_admins enable row level security;
create index employer_admins_employer_id_idx
  on public.employer_admins(employer_id);
