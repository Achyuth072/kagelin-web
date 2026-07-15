import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyTurnstile } from "@/lib/turnstile";
import { joinWaitlist } from "@/lib/waitlist";
import { countFoundingSignups, insertSignup } from "@/lib/waitlist-db";

const FOUNDING_CAP = Number(process.env.WAITLIST_FOUNDING_CAP ?? "25");

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

  const email = typeof body.email === "string" ? body.email : "";
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const remoteIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  // Deferred so a missing-env-var throw can't preempt validation/Turnstile's 400/403.
  let supabase: ReturnType<typeof createAdminClient> | undefined;
  const getSupabase = () => (supabase ??= createAdminClient());

  try {
    const result = await joinWaitlist(email, turnstileToken, remoteIp, {
      verifyTurnstile,
      foundingCap: FOUNDING_CAP,
      countFoundingSignups: () => countFoundingSignups(getSupabase()),
      insertSignup: (email, cohort) => insertSignup(getSupabase(), email, cohort),
    });

    switch (result.status) {
      case "invalid_email":
        return NextResponse.json({ error: "invalid_email" }, { status: 400 });
      case "failed_challenge":
        return NextResponse.json(
          { error: "failed_challenge" },
          { status: 403 },
        );
      case "server_error":
        return NextResponse.json({ error: "server_error" }, { status: 503 });
      case "already":
        return NextResponse.json({ status: "already" });
      case "ok":
        return NextResponse.json({ status: "ok", cohort: result.cohort });
    }
  } catch (err) {
    console.error("[waitlist] unexpected:", err);
    return NextResponse.json({ error: "server_error" }, { status: 503 });
  }
}
