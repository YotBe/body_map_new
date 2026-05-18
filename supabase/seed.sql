-- seed.sql — LOCAL DEVELOPMENT ONLY. Loaded by `supabase db reset`.
-- Creates a demo employer ("Demo Tech Ltd") with 6 members (above k-anonymity floor)
-- + 1 admin so the dashboard renders real numbers.

-- ============================================================
-- Demo employer
-- ============================================================
insert into public.employers (id, slug, name, seat_cap, billing_status)
values ('00000000-0000-0000-0000-00000000e001', 'demo-tech', 'Demo Tech Ltd', 100, 'active');

-- ============================================================
-- Demo users (created in auth.users — local dev only)
-- ============================================================
-- Supabase local provides a `auth.users` insert path. In production we never seed here.
-- These users use the password 'password' for local sign-in.
do $$
declare
  v_admin_id uuid := '00000000-0000-0000-0000-00000000a001';
  v_user_ids uuid[] := array[
    '00000000-0000-0000-0000-00000000u001',
    '00000000-0000-0000-0000-00000000u002',
    '00000000-0000-0000-0000-00000000u003',
    '00000000-0000-0000-0000-00000000u004',
    '00000000-0000-0000-0000-00000000u005',
    '00000000-0000-0000-0000-00000000u006'
  ];
  v_id uuid;
  v_email text;
  v_employer_id uuid := '00000000-0000-0000-0000-00000000e001';
begin
  -- Admin
  insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, aud, role)
  values (
    v_admin_id, 'admin@demo.test',
    crypt('password', gen_salt('bf')),
    now(), '{"display_name":"Demo Admin"}'::jsonb,
    'authenticated', 'authenticated'
  ) on conflict (id) do nothing;

  insert into public.employer_admins (user_id, employer_id, role)
  values (v_admin_id, v_employer_id, 'admin')
  on conflict do nothing;

  -- Members
  for i in 1..array_length(v_user_ids, 1) loop
    v_id := v_user_ids[i];
    v_email := format('seed_user_%s@demo.test', i);
    insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, aud, role)
    values (
      v_id, v_email,
      crypt('password', gen_salt('bf')),
      now(),
      format('{"display_name":"Seed User %s"}', i)::jsonb,
      'authenticated', 'authenticated'
    ) on conflict (id) do nothing;

    insert into public.employer_memberships (user_id, employer_id, status, joined_at)
    values (v_id, v_employer_id, 'active', now() - interval '4 weeks')
    on conflict do nothing;
  end loop;

  -- Seed body-map symptoms with realistic VAS-decay over 2 weeks
  for i in 1..array_length(v_user_ids, 1) loop
    v_id := v_user_ids[i];
    insert into public.body_map_symptoms (user_id, region_code, side, severity_vas, duration_weeks, triggers, created_at)
    values
      (v_id, 'neck_left', 'left', 7, 8, array['prolonged_sitting','poor_screen_height'], now() - interval '14 days'),
      (v_id, 'neck_left', 'left', 4, 8, array['prolonged_sitting'], now() - interval '1 day');
  end loop;

  -- Enroll all in neck_shoulder program
  for i in 1..array_length(v_user_ids, 1) loop
    v_id := v_user_ids[i];
    insert into public.user_programs (user_id, program_id, started_at, current_week, status)
    values (v_id,
            (select id from public.programs where code = 'neck_shoulder'),
            now() - interval '2 weeks',
            3, 'active')
    on conflict do nothing;
  end loop;
end $$;
