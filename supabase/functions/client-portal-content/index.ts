import postgres from "npm:postgres@3.4.5";
import { corsHeaders } from "../_shared/cors.ts";
import { hashValue } from "../_shared/hash.ts";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { ssl: "require" });

Deno.serve(async (req) => {
  const headers = { ...corsHeaders(req.headers.get("origin")), "content-type": "application/json" };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // Authorization carries the Supabase publishable key (required by JWT
  // verification on this function) -- the client's own OTP session token
  // travels in a separate header so the two don't collide.
  const token = req.headers.get("x-client-session") ?? "";
  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: "missing_token" }), { status: 401, headers });
  }

  const tokenHash = await hashValue(token);

  const sessions = await sql`
    select * from client_sessions where token_hash = ${tokenHash} limit 1
  `;

  if (sessions.length === 0 || new Date(sessions[0].expires_at).getTime() < Date.now()) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_session" }), { status: 401, headers });
  }

  const clients = await sql`
    select client_id, name, project_name, content
    from clients
    where client_id = ${sessions[0].client_id}
    limit 1
  `;

  if (clients.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "not_found" }), { status: 404, headers });
  }

  return new Response(JSON.stringify({ ok: true, client: clients[0] }), { headers });
});
