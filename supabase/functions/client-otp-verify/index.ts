import postgres from "npm:postgres@3.4.5";
import { corsHeaders } from "../_shared/cors.ts";
import { hashValue } from "../_shared/hash.ts";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { ssl: "require" });
const MAX_ATTEMPTS = 5;
const SESSION_TTL_DAYS = 7;

function generateToken(): string {
  return crypto.randomUUID() + crypto.randomUUID();
}

Deno.serve(async (req) => {
  const headers = { ...corsHeaders(req.headers.get("origin")), "content-type": "application/json" };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), { status: 405, headers });
  }

  const { client_id, code } = await req.json().catch(() => ({}));
  if (typeof client_id !== "string" || typeof code !== "string") {
    return new Response(JSON.stringify({ ok: false, error: "invalid_request" }), { status: 400, headers });
  }

  const normalizedId = client_id.toUpperCase();
  const codeHash = await hashValue(code);

  const rows = await sql`
    select * from client_otp_codes where client_id = ${normalizedId} order by created_at desc limit 1
  `;

  if (rows.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "not_found" }), { status: 400, headers });
  }

  const otp = rows[0];

  if (new Date(otp.expires_at).getTime() < Date.now()) {
    await sql`delete from client_otp_codes where id = ${otp.id}`;
    return new Response(JSON.stringify({ ok: false, error: "expired" }), { status: 400, headers });
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    await sql`delete from client_otp_codes where id = ${otp.id}`;
    return new Response(JSON.stringify({ ok: false, error: "too_many_attempts" }), { status: 400, headers });
  }

  if (otp.code_hash !== codeHash) {
    await sql`update client_otp_codes set attempts = attempts + 1 where id = ${otp.id}`;
    return new Response(JSON.stringify({ ok: false, error: "incorrect_code" }), { status: 400, headers });
  }

  // Success: consume the OTP, issue a session token.
  await sql`delete from client_otp_codes where id = ${otp.id}`;

  const token = generateToken();
  const tokenHash = await hashValue(token);
  const sessionExpiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60_000).toISOString();

  await sql`
    insert into client_sessions (client_id, token_hash, expires_at)
    values (${normalizedId}, ${tokenHash}, ${sessionExpiresAt})
  `;

  return new Response(JSON.stringify({ ok: true, token }), { headers });
});
