-- StarterCulture: initial schema for Client Login, Company/admin area, and the About page team section.
--
-- Design note on auth split (see docs/PRODUCT.md items 10-11):
--   - Company Login uses real Supabase Auth (magic link). Only staff ever hold
--     an authenticated Supabase session, so RLS policies below simply check
--     `to authenticated` to mean "is a staff member" -- matching the decision
--     that Supabase's own auth.users table is the staff allowlist, with no
--     separate hand-rolled table needed.
--   - Client Login is deliberately NOT Supabase Auth. Clients authenticate via
--     Client ID + a one-time passcode verified by a server-side Edge Function
--     (using the service_role key), which then issues its own short-lived
--     session token for reading that one client's content through a
--     SECURITY DEFINER function. This keeps `clients`/`client_otp_codes`
--     fully unreadable to anon/authenticated roles -- there's no RLS policy
--     that would let a client (or anyone unauthenticated) query these tables
--     directly, which is what avoids exposing other clients' emails.

create extension if not exists pgcrypto;

-- clients: one row per StarterCulture client.
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  client_id text not null unique,
  name text not null,
  email text not null,
  phone text,
  project_name text not null,
  content text not null default 'This is where we''ll post information about your project.',
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

-- Staff (real Supabase Auth sessions) can view/manage the client list from
-- the Company/admin area. Deliberately no anon policy: a client's own portal
-- view is served through a SECURITY DEFINER function gated by a verified
-- OTP session (added in a later migration alongside the Edge Function), not
-- direct table access.
create policy "Staff can view clients"
  on public.clients for select
  to authenticated
  using (true);

create policy "Staff can insert clients"
  on public.clients for insert
  to authenticated
  with check (true);

create policy "Staff can update clients"
  on public.clients for update
  to authenticated
  using (true)
  with check (true);

-- client_otp_codes: short-lived passcodes for the Client Login flow.
-- Intentionally has RLS enabled with NO policies at all -- only ever
-- touched by an Edge Function using the service_role key (which bypasses
-- RLS), never directly from the browser under any identity.
create table public.client_otp_codes (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references public.clients (client_id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.client_otp_codes enable row level security;

-- personnel: About page Builders/Advisors -- publicly readable, staff-managed.
create table public.personnel (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  section text not null check (section in ('builder', 'advisor')),
  bio text not null,
  linkedin_url text,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.personnel enable row level security;

create policy "Anyone can view personnel"
  on public.personnel for select
  to anon, authenticated
  using (true);

create policy "Staff can insert personnel"
  on public.personnel for insert
  to authenticated
  with check (true);

create policy "Staff can update personnel"
  on public.personnel for update
  to authenticated
  using (true)
  with check (true);

create policy "Staff can delete personnel"
  on public.personnel for delete
  to authenticated
  using (true);
