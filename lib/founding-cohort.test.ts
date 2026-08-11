import { describe, expect, it } from "vitest";
import { selectForInvite, summarizeSignups, type WaitlistSignup } from "./founding-cohort";

function signup(overrides: Partial<WaitlistSignup>): WaitlistSignup {
  return {
    email: "a@example.com",
    cohort: "founding",
    createdAt: "2026-08-01T00:00:00Z",
    invitedAt: null,
    ...overrides,
  };
}

describe("selectForInvite", () => {
  it("returns nothing when there are no signups", () => {
    expect(selectForInvite([], {})).toEqual([]);
  });

  it("excludes general-cohort and already-invited signups", () => {
    const uninvitedFounding = signup({ email: "a@example.com" });
    const generalCohort = signup({ email: "b@example.com", cohort: "general" });
    const alreadyInvited = signup({
      email: "c@example.com",
      invitedAt: "2026-08-05T00:00:00Z",
    });

    const result = selectForInvite(
      [uninvitedFounding, generalCohort, alreadyInvited],
      {},
    );

    expect(result).toEqual([uninvitedFounding]);
  });

  it("orders by createdAt ascending — oldest signup first", () => {
    const newer = signup({
      email: "newer@example.com",
      createdAt: "2026-08-03T00:00:00Z",
    });
    const older = signup({
      email: "older@example.com",
      createdAt: "2026-08-01T00:00:00Z",
    });

    const result = selectForInvite([newer, older], {});

    expect(result.map((s) => s.email)).toEqual([
      "older@example.com",
      "newer@example.com",
    ]);
  });

  it("caps the result to the given limit, keeping the oldest", () => {
    const a = signup({ email: "a@example.com", createdAt: "2026-08-01T00:00:00Z" });
    const b = signup({ email: "b@example.com", createdAt: "2026-08-02T00:00:00Z" });
    const c = signup({ email: "c@example.com", createdAt: "2026-08-03T00:00:00Z" });

    const result = selectForInvite([c, a, b], { limit: 2 });

    expect(result.map((s) => s.email)).toEqual([
      "a@example.com",
      "b@example.com",
    ]);
  });
});

describe("summarizeSignups", () => {
  it("returns nothing when there are no signups", () => {
    expect(summarizeSignups([], new Set())).toEqual([]);
  });

  it("marks each signup joined or not based on the joined-email set", () => {
    const joined = signup({ email: "joined@example.com" });
    const notJoined = signup({ email: "not-joined@example.com" });

    const result = summarizeSignups(
      [joined, notJoined],
      new Set(["joined@example.com"]),
    );

    expect(result).toEqual([
      { ...joined, joined: true },
      { ...notJoined, joined: false },
    ]);
  });
});
