import { createAdminClient } from "@/lib/supabase-admin";
import type { SignupCohort } from "@/lib/waitlist";

type Supabase = ReturnType<typeof createAdminClient>;

export async function countFoundingSignups(supabase: Supabase): Promise<number> {
  const { count, error, status, statusText } = await supabase
    .from("waitlist_signups")
    .select("id", { count: "exact", head: true })
    .eq("cohort", "founding");

  if (error) {
    // head:true sends HEAD, so there's no body to parse — the error object is
    // empty and the HTTP status is the only signal.
    console.error(`[waitlist] count failed: HTTP ${status} ${statusText}`, error);
    throw new Error("count query failed");
  }
  return count ?? 0;
}

export async function insertSignup(
  supabase: Supabase,
  email: string,
  cohort: SignupCohort,
): Promise<{ ok: true } | { ok: false; reason: "duplicate" | "other" }> {
  const { error } = await supabase
    .from("waitlist_signups")
    .insert({ email, cohort });

  if (!error) return { ok: true };
  // 23505 = unique_violation → already signed up.
  if (error.code === "23505") return { ok: false, reason: "duplicate" };

  console.error("[waitlist] insert failed:", error);
  return { ok: false, reason: "other" };
}
