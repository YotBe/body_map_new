-- 0005_seed_curriculum.sql
-- Production-safe seed: programs + exercises + program_sessions curriculum.
-- This is intentionally in a migration (not seed.sql) so it ships to every env.

-- ============================================================
-- PROGRAMS  (4 starting tracks)
-- ============================================================
insert into public.programs (code, name, target_regions, duration_weeks, description_md) values
  ('neck_shoulder', 'Neck & Shoulder Reset',
   array['neck_center','neck_left','neck_right','shoulder_left','shoulder_right','upper_trap'],
   12,
   '12-week resistance-band program targeting cervical and upper-trapezius pain typical of desk workers. Evidence base: Andersen et al. 2013 (40% pain reduction with 2-min/day band training).'),

  ('lower_back', 'Lower-Back Stability',
   array['lumbar','sacrum','glute_left','glute_right'],
   12,
   '12-week program for non-specific low-back pain. Combines anti-rotation, hip hinging, and posterior-chain band work. Screen with RMDQ at weeks 0/6/12.'),

  ('wrist_forearm', 'Wrist & Forearm Care',
   array['wrist_left','wrist_right','forearm_left','forearm_right','elbow_left','elbow_right'],
   12,
   'Targets cumulative-trauma microinjuries to wrist/forearm/elbow common in heavy keyboard/mouse use. Bituach Leumi-recognized condition category for Israeli employer programs.'),

  ('general_posture', 'Whole-Body Posture',
   array['general'],
   12,
   'No reported symptoms — preventive whole-body program emphasizing posterior chain. Default fallback when body-map shows VAS <= 3 across all regions.');

-- ============================================================
-- EXERCISES  (representative MVP set; expand to full ~40 in a content-only migration later)
-- ============================================================
insert into public.exercises (code, name, target_muscles, band_tension_default, default_reps, default_sets, instructions_md) values
  ('band_pull_apart',         'Band Pull-Apart',
   array['mid_trap','rear_delt','rhomboid'], 'light', 15, 3,
   'Hold band at shoulder height with arms extended. Pull band apart by squeezing shoulder blades. Slow, controlled return.'),

  ('band_face_pull',          'Band Face Pull',
   array['rear_delt','mid_trap','rotator_cuff'], 'medium', 12, 3,
   'Anchor band at face height. Pull handles toward forehead, leading with elbows.'),

  ('band_external_rotation',  'Band External Rotation',
   array['rotator_cuff','infraspinatus'], 'light', 12, 3,
   'Elbow tucked, 90° bend. Rotate forearm away from body while keeping elbow pinned. Both sides.'),

  ('band_chin_tuck',          'Chin Tuck Hold',
   array['deep_cervical_flexors'], 'light', 10, 3,
   'No band. Gently tuck chin (double-chin), hold 5 seconds. Restores cervical alignment.'),

  ('band_glute_bridge',       'Banded Glute Bridge',
   array['glutes','hamstrings'], 'medium', 12, 3,
   'Band above knees. Lying supine, drive hips up while pushing knees out against band.'),

  ('band_pallof_press',       'Pallof Press',
   array['obliques','transverse_abdominis'], 'medium', 10, 3,
   'Band anchored at chest height to one side. Press band straight out, resisting rotation. Both sides.'),

  ('band_deadbug',            'Dead Bug (banded)',
   array['transverse_abdominis','hip_flexor'], 'light', 8, 3,
   'Supine, band overhead in hands. Lower opposite arm/leg without ribs flaring.'),

  ('band_wrist_extension',    'Band Wrist Extension',
   array['wrist_extensors','forearm'], 'light', 15, 3,
   'Band under foot, palm down. Curl wrist upward against resistance. Both sides.'),

  ('band_wrist_flexion',      'Band Wrist Flexion',
   array['wrist_flexors','forearm'], 'light', 15, 3,
   'Band under foot, palm up. Curl wrist upward against resistance. Both sides.'),

  ('band_pronation_supination','Band Pronation/Supination',
   array['pronator_teres','supinator','forearm'], 'light', 12, 3,
   'Elbow tucked, grip band. Rotate palm up then down against band tension.'),

  ('band_row',                'Seated Band Row',
   array['lats','rhomboid','biceps'], 'medium', 12, 3,
   'Band anchored at waist height. Row handles to ribs, squeezing shoulder blades.'),

  ('band_thoracic_extension', 'Thoracic Extension',
   array['thoracic_spine','erector_spinae'], 'light', 10, 3,
   'Foam roller or rolled towel at mid-back. Arms overhead. Gentle extension. No load.');

-- ============================================================
-- PROGRAM_SESSIONS  (skeleton: week 1 of each program — extend to all 12 weeks via content migration)
-- ============================================================
-- Neck & Shoulder, week 1, day 1
insert into public.program_sessions (program_id, week_number, day_number, exercise_ids)
select
  (select id from public.programs where code = 'neck_shoulder'),
  1, 1,
  array[
    (select id from public.exercises where code = 'band_chin_tuck'),
    (select id from public.exercises where code = 'band_pull_apart'),
    (select id from public.exercises where code = 'band_face_pull'),
    (select id from public.exercises where code = 'band_external_rotation'),
    (select id from public.exercises where code = 'band_thoracic_extension')
  ];

-- Lower-Back, week 1, day 1
insert into public.program_sessions (program_id, week_number, day_number, exercise_ids)
select
  (select id from public.programs where code = 'lower_back'),
  1, 1,
  array[
    (select id from public.exercises where code = 'band_glute_bridge'),
    (select id from public.exercises where code = 'band_pallof_press'),
    (select id from public.exercises where code = 'band_deadbug'),
    (select id from public.exercises where code = 'band_row')
  ];

-- Wrist & Forearm, week 1, day 1
insert into public.program_sessions (program_id, week_number, day_number, exercise_ids)
select
  (select id from public.programs where code = 'wrist_forearm'),
  1, 1,
  array[
    (select id from public.exercises where code = 'band_wrist_extension'),
    (select id from public.exercises where code = 'band_wrist_flexion'),
    (select id from public.exercises where code = 'band_pronation_supination'),
    (select id from public.exercises where code = 'band_external_rotation')
  ];

-- General Posture, week 1, day 1
insert into public.program_sessions (program_id, week_number, day_number, exercise_ids)
select
  (select id from public.programs where code = 'general_posture'),
  1, 1,
  array[
    (select id from public.exercises where code = 'band_pull_apart'),
    (select id from public.exercises where code = 'band_glute_bridge'),
    (select id from public.exercises where code = 'band_pallof_press'),
    (select id from public.exercises where code = 'band_row'),
    (select id from public.exercises where code = 'band_chin_tuck')
  ];
