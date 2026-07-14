import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyTurnstile } from "@/lib/turnstile";

// Simple, permissive email shape check — real validation is "can we email it",
// which only the confirmation attempt proves. This just rejects obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOUNDING_CAP = Number(process.env.WAITLIST_FOUNDING_CAP ?? "25");

type SignupCohort = "founding" | "general";

interface WaitlistBody {
  email?: unknown;
  turnstileToken?: unknown;
}

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Abuse guard: Cloudflare Turnstile. The unique constraint below stops
  // duplicate spam; Turnstile stops bot volume.
  const remoteIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  const human = await verifyTurnstile(turnstileToken, remoteIp);
  if (!human) {
    return NextResponse.json({ error: "failed_challenge" }, { status: 403 });
  }

  try {
    const supabase = createAdminClient();

    // Auto-close the founding cohort at the cap. Past it we still capture the
    // email — for the general launch list — just without the founding promise.
    const { count, error: countError } = await supabase
      .from("waitlist_signups")
      .select("id", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json({ error: "server_error" }, { status: 503 });
    }

    const cohort: SignupCohort =
      (count ?? 0) >= FOUNDING_CAP ? "general" : "founding";

    const { error: insertError } = await supabase
      .from("waitlist_signups")
      .insert({ email, cohort });

    if (insertError) {
      // 23505 = unique_violation → already signed up. Report it as a friendly,
      // non-error state so we never leak whether an address exists via status
      // code differences beyond this intentional, benign message.
      if (insertError.code === "23505") {
        return NextResponse.json({ status: "already" });
      }
      return NextResponse.json({ error: "server_error" }, { status: 503 });
    }

    return NextResponse.json({ status: "ok", cohort });
  } catch {
    // Misconfiguration (e.g. missing SUPABASE_SECRET_KEY) or an unexpected
    // client error — return a clean 503 instead of a bare 500 stack page.
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
