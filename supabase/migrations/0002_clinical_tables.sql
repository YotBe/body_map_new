-- 0002_clinical_tables.sql
-- Clinical data tables: body-map symptoms, red-flag screens, curriculum, logs, PROMs.

-- ============================================================
-- body_map_symptoms — one row per region/episode the user reports
-- ============================================================
create table public.body_map_symptoms (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  region_code      text not null,                       -- e.g. 'neck_left', 'lumbar', 'wrist_right'
  side             text check (side in ('left','right','center')),
  severity_vas     int not null check (severity_vas between 0 and 10),
  duration_weeks   int check (duration_weeks >= 0),
  triggers         text[],
  created_at       timestamptz not null default now()
);
alter table public.body_map_symptoms enable row level security;
create index body_map_symptoms_user_created_idx
  on public.body_map_symptoms(user_id, created_at desc);

-- ============================================================
-- red_flag_screens — versioned, immutable (insert-only)
-- ============================================================
create table public.red_flag_screens (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  version          text not null,                       -- 'v1.0'
  answers          jsonb not null,                      -- { q_cauda_equina: false, q_weight_loss: true, ... }
  any_positive     boolean not null,
  screened_at      timestamptz not null default now()
);
alter table public.red_flag_screens enable row level security;
create index red_flag_screens_user_idx
  on public.red_flag_screens(user_id, screened_at desc);

-- ============================================================
-- programs — curriculum (world-readable to authenticated)
-- ============================================================
create table public.programs (
  id               uuid primary key default gen_random_uuid(),
  code             text unique not null,                -- 'neck_shoulder','lower_back','wrist_forearm','general_posture'
  name             text not null,
  target_regions   text[] not null,
  duration_weeks   int not null default 12,
  description_md   text
);
alter table public.programs enable row level security;

-- ============================================================
-- exercises — library (world-readable to authenticated)
-- ============================================================
create table public.exercises (
  id                   uuid primary key default gen_random_uuid(),
  code                 text unique not null,
  name                 text not null,
  video_path           text,                            -- Supabase Storage object key (signed at read time)
  target_muscles       text[],
  band_tension_default text check (band_tension_default in ('light','medium','heavy')),
  default_reps         int check (default_reps > 0),
  default_sets         int check (default_sets > 0),
  instructions_md      text
);
alter table public.exercises enable row level security;

-- ============================================================
-- program_sessions — curriculum schedule (program × week × day → exercises)
-- ============================================================
create table public.program_sessions (
  id               uuid primary key default gen_random_uuid(),
  program_id       uuid not null references public.programs on delete cascade,
  week_number      int not null check (week_number between 1 and 52),
  day_number       int not null check (day_number between 1 and 7),
  exercise_ids     uuid[] not null,
  unique (program_id, week_number, day_number)
);
alter table public.program_sessions enable row level security;
create index program_sessions_program_idx
  on public.program_sessions(program_id, week_number, day_number);

-- ============================================================
-- user_programs — active enrollment
-- ============================================================
create table public.user_programs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  program_id       uuid not null references public.programs,
  started_at       timestamptz not null default now(),
  current_week     int not null default 1 check (current_week between 1 and 52),
  status           text not null default 'active'
                   check (status in ('active','paused','completed','abandoned')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
alter table public.user_programs enable row level security;
create index user_programs_user_status_idx
  on public.user_programs(user_id, status);

-- ============================================================
-- session_logs — one row per completed daily session (immutable)
-- ============================================================
create table public.session_logs (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users on delete cascade,
  user_program_id       uuid not null references public.user_programs on delete cascade,
  week_number           int not null,
  day_number            int not null,
  completed_at          timestamptz not null default now(),
  -- [{ exercise_id, sets, reps, rpe, band_tension }, ...]
  exercises_completed   jsonb not null
);
alter table public.session_logs enable row level security;
create index session_logs_user_completed_idx
  on public.session_logs(user_id, completed_at desc);
create index session_logs_program_week_idx
  on public.session_logs(user_program_id, week_number);

-- ============================================================
-- proms — Patient-Reported Outcome Measures, immutable
-- ============================================================
create table public.proms (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  instrument       text not null check (instrument in ('RMDQ','NDI','DASH','VAS')),
  score            numeric not null,
  raw_responses    jsonb not null,
  captured_at      timestamptz not null default now(),
  week_number      int not null check (week_number in (0,6,12))
);
alter table public.proms enable row level security;
create index proms_user_instrument_idx
  on public.proms(user_id, instrument, week_number);
