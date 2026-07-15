import { describe, expect, it } from "vitest";
import { joinWaitlist, type JoinWaitlistDeps, type SignupCohort } from "./waitlist";

function createFakeDb(seed: { email: string; cohort: SignupCohort }[] = []) {
  const signups = [...seed];
  return {
    signups,
    countFoundingSignups: async () =>
      signups.filter((s) => s.cohort === "founding").length,
    insertSignup: async (email: string, cohort: SignupCohort) => {
      if (signups.some((s) => s.email === email)) {
        return { ok: false as const, reason: "duplicate" as const };
      }
      signups.push({ email, cohort });
      return { ok: true as const };
    },
  };
}

function makeDeps(
  seed: { email: string; cohort: SignupCohort }[] = [],
  overrides: Partial<JoinWaitlistDeps> = {},
): JoinWaitlistDeps {
  const db = createFakeDb(seed);
  return {
    foundingCap: 25,
    verifyTurnstile: async () => true,
    countFoundingSignups: db.countFoundingSignups,
    insertSignup: db.insertSignup,
    ...overrides,
  };
}

describe("joinWaitlist", () => {
  it("rejects a malformed email without touching the database", async () => {
    const insertSignup = async () => {
      throw new Error("should not be called");
    };
    const result = await joinWaitlist(
      "not-an-email",
      "token",
      undefined,
      makeDeps([], { insertSignup }),
    );
    expect(result).toEqual({ status: "invalid_email" });
  });

  it("rejects a failed Turnstile challenge", async () => {
    const result = await joinWaitlist(
      "person@example.com",
      "bad-token",
      undefined,
      makeDeps([], { verifyTurnstile: async () => false }),
    );
    expect(result).toEqual({ status: "failed_challenge" });
  });

  it("assigns the founding cohort while under the cap", async () => {
    const result = await joinWaitlist(
      "b@example.com",
      "token",
      undefined,
      makeDeps([{ email: "a@example.com", cohort: "founding" }], {
        foundingCap: 5,
      }),
    );
    expect(result).toEqual({ status: "ok", cohort: "founding" });
  });

  it("counts only founding rows toward the cap, ignoring general signups mixed in", async () => {
    const result = await joinWaitlist(
      "next@example.com",
      "token",
      undefined,
      makeDeps(
        [
          { email: "f1@example.com", cohort: "founding" },
          { email: "f2@example.com", cohort: "founding" },
          { email: "g1@example.com", cohort: "general" },
          { email: "g2@example.com", cohort: "general" },
          { email: "g3@example.com", cohort: "general" },
          { email: "g4@example.com", cohort: "general" },
          { email: "g5@example.com", cohort: "general" },
          { email: "g6@example.com", cohort: "general" },
          { email: "g7@example.com", cohort: "general" },
          { email: "g8@example.com", cohort: "general" },
        ],
        { foundingCap: 5 },
      ),
    );
    expect(result).toEqual({ status: "ok", cohort: "founding" });
  });

  it("assigns the general cohort once N founding signups exist, even with M general signups also landed", async () => {
    const result = await joinWaitlist(
      "next@example.com",
      "token",
      undefined,
      makeDeps(
        [
          { email: "f1@example.com", cohort: "founding" },
          { email: "f2@example.com", cohort: "founding" },
          { email: "g1@example.com", cohort: "general" },
          { email: "g2@example.com", cohort: "general" },
          { email: "g3@example.com", cohort: "general" },
        ],
        { foundingCap: 2 },
      ),
    );
    expect(result).toEqual({ status: "ok", cohort: "general" });
  });

  it("maps a duplicate signup (Postgres 23505) to already", async () => {
    const result = await joinWaitlist(
      "dup@example.com",
      "token",
      undefined,
      makeDeps([{ email: "dup@example.com", cohort: "founding" }]),
    );
    expect(result).toEqual({ status: "already" });
  });

  it("returns server_error when the founding count lookup fails", async () => {
    const result = await joinWaitlist(
      "person@example.com",
      "token",
      undefined,
      makeDeps([], {
        countFoundingSignups: async () => {
          throw new Error("db unreachable");
        },
      }),
    );
    expect(result).toEqual({ status: "server_error" });
  });

  it("returns server_error on an unexpected insert failure", async () => {
    const result = await joinWaitlist(
      "person@example.com",
      "token",
      undefined,
      makeDeps([], {
        insertSignup: async () => ({ ok: false, reason: "other" }),
      }),
    );
    expect(result).toEqual({ status: "server_error" });
  });
});
