-- Session tokens issued by client-otp-verify after a successful OTP check.
-- Same pattern as client_otp_codes: RLS enabled with zero policies, and
-- deliberately left un-exposed in Data API settings -- only ever touched by
-- Edge Functions over a direct Postgres connection (SUPABASE_DB_URL), never
-- through the public REST surface.
create table public.client_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references public.clients (client_id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.client_sessions enable row level security;
