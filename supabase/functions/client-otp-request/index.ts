import postgres from "npm:postgres@3.4.5";
import { corsHeaders } from "../_shared/cors.ts";
import { hashValue } from "../_shared/hash.ts";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { ssl: "require" });
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const OTP_TTL_MINUTES = 10;

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Deno.serve(async (req) => {
  const headers = { ...corsHeaders(req.headers.get("origin")), "content-type": "application/json" };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), { status: 405, headers });
  }

  const { client_id } = await req.json().catch(() => ({}));

  // Always return the same generic response, whether or not the ID existed,
  // so this endpoint can't be used to enumerate valid Client IDs.
  const genericResponse = () => new Response(JSON.stringify({ ok: true }), { headers });

  if (typeof client_id !== "string" || !/^[A-Za-z0-9]{6}$/.test(client_id)) {
    return genericResponse();
  }

  const normalizedId = client_id.toUpperCase();

  const clients = await sql`
    select client_id, email from clients where upper(client_id) = ${normalizedId} limit 1
  `;

  if (clients.length > 0) {
    const client = clients[0];
    const code = generateOtp();
    const codeHash = await hashValue(code);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString();

    await sql`delete from client_otp_codes where client_id = ${client.client_id}`;
    await sql`
      insert into client_otp_codes (client_id, code_hash, expires_at)
      values (${client.client_id}, ${codeHash}, ${expiresAt})
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "StarterCulture <otp@mail.starterculturestudio.com>",
        to: client.email,
        subject: "Your StarterCulture client login code",
        text: `Your one-time passcode is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
      }),
    });
  }

  return genericResponse();
});
