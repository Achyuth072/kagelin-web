import { isValidEmail } from "@/lib/email";

// 11:00 AM IST, 2026-08-25. Shared by the route and the form.
export const WAITLIST_OPENS_AT = new Date("2026-08-25T05:30:00.000Z");

export type SignupCohort = "founding" | "general";

export interface JoinWaitlistDeps {
  verifyTurnstile: (token: string, remoteIp?: string) => Promise<boolean>;
  countFoundingSignups: () => Promise<number>;
  insertSignup: (
    email: string,
    cohort: SignupCohort,
  ) => Promise<{ ok: true } | { ok: false; reason: "duplicate" | "other" }>;
  sendConfirmationEmail: (email: string) => Promise<void>;
  foundingCap: number;
  opensAt: Date;
  now: () => Date;
}

export type JoinWaitlistResult =
  | { status: "invalid_email" }
  | { status: "failed_challenge" }
  | { status: "already" }
  | { status: "ok"; cohort: SignupCohort }
  | { status: "server_error" }
  | { status: "not_open_yet" };

export async function joinWaitlist(
  rawEmail: string,
  turnstileToken: string,
  remoteIp: string | undefined,
  deps: JoinWaitlistDeps,
): Promise<JoinWaitlistResult> {
  if (deps.now() < deps.opensAt) {
    return { status: "not_open_yet" };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { status: "invalid_email" };
  }

  const human = await deps.verifyTurnstile(turnstileToken, remoteIp);
  if (!human) {
    return { status: "failed_challenge" };
  }

  try {
    const count = await deps.countFoundingSignups();
    const cohort: SignupCohort =
      count >= deps.foundingCap ? "general" : "founding";

    const insertResult = await deps.insertSignup(email, cohort);
    if (!insertResult.ok) {
      if (insertResult.reason === "duplicate") {
        return { status: "already" };
      }
      return { status: "server_error" };
    }

    // Best-effort: the row is already committed, so a failed send must not
    // turn a successful signup into an error response.
    try {
      await deps.sendConfirmationEmail(email);
    } catch (err) {
      console.error("[waitlist] confirmation email failed:", err);
    }

    return { status: "ok", cohort };
  } catch (err) {
    console.error("[waitlist] unexpected:", err);
    return { status: "server_error" };
  }
}
