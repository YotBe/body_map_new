-- 0003_rls_policies.sql
-- RLS policies. Every policy uses `(select auth.uid())` to stay cached per-statement.
-- Plan §"Implementation Traps" #9 — uncached auth.uid() = seq scan per row.

-- ============================================================
-- profiles  (self read/write)
-- ============================================================
create policy "profiles: self select"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "profiles: self insert"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "profiles: self update"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ============================================================
-- employers  (admins of own employer read; no public listing)
-- ============================================================
create policy "employers: admin select own"
  on public.employers for select to authenticated
  using (
    exists (
      select 1 from public.employer_admins ea
      where ea.employer_id = employers.id
        and ea.user_id = (select auth.uid())
    )
  );

-- Members can read just the employer row(s) they belong to (for branding/name).
create policy "employers: member select own"
  on public.employers for select to authenticated
  using (
    exists (
      select 1 from public.employer_memberships em
      where em.employer_id = employers.id
        and em.user_id = (select auth.uid())
        and em.status = 'active'
    )
  );

-- ============================================================
-- employer_memberships
-- ============================================================
-- Users see only their own membership rows.
-- NOTE: deliberately no admin SELECT here — admins read aggregates only via the
-- SECURITY DEFINER function in 0004_dashboard_fn.sql. This is the privacy keystone.
create policy "memberships: self select"
  on public.employer_memberships for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "memberships: self insert"
  on public.employer_memberships for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "memberships: self update"
  on public.employer_memberships for update to authenticated
  using ((select auth.uid()) = user_id);

-- ============================================================
-- employer_admins  (self read)
-- ============================================================
create policy "admins: self select"
  on public.employer_admins for select to authenticated
  using ((select auth.uid()) = user_id);

-- ============================================================
-- Clinical tables  (self read + insert; many are immutable)
-- ============================================================
-- body_map_symptoms
create policy "body_map: self select"
  on public.body_map_symptoms for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "body_map: self insert"
  on public.body_map_symptoms for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "body_map: self update"
  on public.body_map_symptoms for update to authenticated
  using ((select auth.uid()) = user_id);

-- red_flag_screens — IMMUTABLE (no UPDATE policy)
create policy "red_flag: self select"
  on public.red_flag_screens for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "red_flag: self insert"
  on public.red_flag_screens for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- user_programs
create policy "user_programs: self select"
  on public.user_programs for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "user_programs: self insert"
  on public.user_programs for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "user_programs: self update"
  on public.user_programs for update to authenticated
  using ((select auth.uid()) = user_id);

-- session_logs — IMMUTABLE
create policy "session_logs: self select"
  on public.session_logs for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "session_logs: self insert"
  on public.session_logs for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- proms — IMMUTABLE
create policy "proms: self select"
  on public.proms for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "proms: self insert"
  on public.proms for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- ============================================================
-- Curriculum tables (programs / exercises / program_sessions) — world-readable to authenticated
-- ============================================================
create policy "programs: read"
  on public.programs for select to authenticated using (true);

create policy "exercises: read"
  on public.exercises for select to authenticated using (true);

create policy "program_sessions: read"
  on public.program_sessions for select to authenticated using (true);
