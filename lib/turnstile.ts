const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

/**
 * Server-side Cloudflare Turnstile verification.
 *
 * The app renders the widget client-side (src/components/auth/Turnstile.tsx)
 * but never had a server verify — Supabase Auth did it. Here the waitlist route
 * owns the check itself, so we implement the siteverify call.
 *
 * Returns true only on a confirmed-human token. If TURNSTILE_SECRET_KEY is
 * unset (e.g. local dev before keys are provisioned), verification is skipped
 * and returns true so the form stays testable — production must set the key.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // No key configured — skip (dev convenience). Guard against this in prod.
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as SiteverifyResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
