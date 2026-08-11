import type { SignupCohort } from "@/lib/waitlist";

export interface WaitlistSignup {
  email: string;
  cohort: SignupCohort;
  createdAt: string;
  invitedAt: string | null;
}

export function selectForInvite(
  signups: WaitlistSignup[],
  options: { limit?: number },
): WaitlistSignup[] {
  const ordered = signups
    .filter((s) => s.cohort === "founding" && s.invitedAt === null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return options.limit === undefined
    ? ordered
    : ordered.slice(0, options.limit);
}

export interface SignupSummaryRow {
  email: string;
  cohort: SignupCohort;
  createdAt: string;
  invitedAt: string | null;
  joined: boolean;
}

export function summarizeSignups(
  signups: WaitlistSignup[],
  joinedEmails: Set<string>,
): SignupSummaryRow[] {
  return signups.map((s) => ({ ...s, joined: joinedEmails.has(s.email) }));
}
