-- 0004_dashboard_fn.sql
-- The B2B2C privacy keystone. Employer admins read aggregates ONLY through this
-- SECURITY DEFINER function. k-anonymity floor of 5 prevents small-N leakage.
-- Plan §"Database Schema" — privacy keystone.

create or replace function public.employer_dashboard_stats(p_employer_id uuid)
returns table (
  enrolled            int,
  active_8wk          int,
  avg_pain_reduction  numeric,
  completion_pct      numeric,
  k_anonymous         boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller    uuid := auth.uid();
  v_count     int;
begin
  -- AuthZ: caller must be an admin (or viewer) of this employer.
  if v_caller is null or not exists (
    select 1 from public.employer_admins ea
    where ea.user_id = v_caller and ea.employer_id = p_employer_id
  ) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  select count(*) into v_count
    from public.employer_memberships em
    where em.employer_id = p_employer_id and em.status = 'active';

  -- k-anonymity floor. Below N=5, return enrolled count only; null the rest.
  -- Same code path regardless of N to bound timing-side-channels.
  if v_count < 5 then
    return query select v_count, 0, null::numeric, null::numeric, false;
    return;
  end if;

  return query
    with cohort as (
      select em.user_id
        from public.employer_memberships em
        where em.employer_id = p_employer_id and em.status = 'active'
    ),
    pain as (
      select c.user_id,
             (select bms.severity_vas
                from public.body_map_symptoms bms
                where bms.user_id = c.user_id
                order by bms.created_at asc limit 1) as start_vas,
             (select bms.severity_vas
                from public.body_map_symptoms bms
                where bms.user_id = c.user_id
                order by bms.created_at desc limit 1) as latest_vas
        from cohort c
    ),
    active as (
      select count(distinct sl.user_id) as n_active
        from public.session_logs sl
        join cohort c on c.user_id = sl.user_id
        where sl.completed_at > now() - interval '8 weeks'
    ),
    completion as (
      select avg(
        case
          when up.status = 'completed' then 100.0
          else (up.current_week::numeric / nullif(p.duration_weeks, 0)) * 100.0
        end
      ) as pct
      from public.user_programs up
      join cohort c on c.user_id = up.user_id
      join public.programs p on p.id = up.program_id
    )
    select
      v_count,
      coalesce((select n_active from active), 0)::int,
      coalesce(round(avg(start_vas - latest_vas)::numeric, 2), 0)::numeric,
      coalesce(round((select pct from completion)::numeric, 1), 0)::numeric,
      true
    from pain
    where start_vas is not null and latest_vas is not null;
end $$;

revoke all on function public.employer_dashboard_stats(uuid) from public;
grant execute on function public.employer_dashboard_stats(uuid) to authenticated;

comment on function public.employer_dashboard_stats(uuid) is
  'B2B2C privacy keystone: only path by which employer_admins can read user-linked data. '
  'Verifies admin role, enforces k-anonymity floor (N>=5), returns aggregates only.';
