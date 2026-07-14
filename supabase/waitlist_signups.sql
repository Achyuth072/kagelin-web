-- Kagelin founding-tester waitlist.
--
-- Runs against the SAME Supabase project as the app. The marketing site writes
-- here only through the server-side /api/waitlist route using the secret key,
-- which bypasses RLS. RLS is enabled with NO client-facing policy, so the anon
-- key can neither read nor write this table — signups can't be scraped and the
-- email list can't be enumerated from the browser.

create table if not exists public.waitlist_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  cohort      text not null default 'founding'
              check (cohort in ('founding', 'general')),
  created_at  timestamptz not null default now()
);

-- One row per address. The route relies on 23505 (unique_violation) to detect
-- "already signed up". Case-folding happens in the route (email is lowercased
-- before insert), so a plain unique index is sufficient.
create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (email);

-- Deny-by-default. No policies are created on purpose: only the service/secret
-- key (used server-side) may touch this table.
alter table public.waitlist_signups enable row level security;

-- Belt-and-suspenders: revoke the API roles' default grants so even a
-- misconfigured policy can't expose the list.
revoke all on public.waitlist_signups from anon, authenticated;
