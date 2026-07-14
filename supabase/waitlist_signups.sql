-- Kagelin founding-tester waitlist.
-- Written only via the server-side /api/waitlist route (secret key, bypasses RLS).

create table if not exists public.waitlist_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  cohort      text not null default 'founding'
              check (cohort in ('founding', 'general')),
  created_at  timestamptz not null default now()
);

-- The route relies on 23505 (unique_violation) to detect "already signed up".
create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (email);

-- Deny-by-default: RLS on with no policies, and revoke API-role grants.
alter table public.waitlist_signups enable row level security;
revoke all on public.waitlist_signups from anon, authenticated;
