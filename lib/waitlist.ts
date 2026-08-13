import { isValidEmail } from "@/lib/email";

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
}

export type JoinWaitlistResult =
  | { status: "invalid_email" }
  | { status: "failed_challenge" }
  | { status: "already" }
  | { status: "ok"; cohort: SignupCohort }
  | { status: "server_error" };

export async function joinWaitlist(
  rawEmail: string,
  turnstileToken: string,
  remoteIp: string | undefined,
  deps: JoinWaitlistDeps,
): Promise<JoinWaitlistResult> {
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
