#!/usr/bin/env node
// Founding-tester waitlist admin tool. Talks directly to Supabase with the
// secret key from .env.local — no web UI, no auth surface added anywhere.
// Lives here (not in kagelin) because it administers the waitlist feature
// this repo owns; the table itself and the Premium-grant trigger live in
// kagelin's Postgres because the trigger fires on kagelin's auth.users.
//
// Usage:
//   node --env-file=.env.local scripts/waitlist.cjs list
//   node --env-file=.env.local scripts/waitlist.cjs export > signups.csv
//   node --env-file=.env.local scripts/waitlist.cjs invite --limit 5

async function fetchSignups(supabase) {
  const { data, error } = await supabase
    .from("waitlist_signups")
    .select("email, cohort, created_at, invited_at");
  if (error)
    throw new Error(`fetching waitlist_signups failed: ${error.message}`);
  return data.map((row) => ({
    email: row.email,
    cohort: row.cohort,
    createdAt: row.created_at,
    invitedAt: row.invited_at,
  }));
}

// listUsers() paginates; the founding cohort is capped in the tens, but this
// loops rather than assuming one page holds every app user.
async function fetchJoinedEmails(supabase) {
  const emails = new Set();
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 200,
    });
    if (error) throw new Error(`listing auth users failed: ${error.message}`);
    for (const user of data.users) {
      if (user.email) emails.add(user.email);
    }
    if (data.users.length < 200) break;
  }
  return emails;
}

function parseLimit(args) {
  const flag = args.find((a) => a === "--limit" || a.startsWith("--limit="));
  if (!flag) return undefined;
  const value = flag.includes("=")
    ? flag.split("=")[1]
    : args[args.indexOf(flag) + 1];
  const limit = Number(value);
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error(`--limit must be a positive integer, got ${value}`);
  }
  return limit;
}

function toCsv(rows) {
  const header = "email,cohort,created_at,invited_at,joined";
  const lines = rows.map((r) =>
    [r.email, r.cohort, r.createdAt, r.invitedAt ?? "", r.joined].join(","),
  );
  return [header, ...lines].join("\n");
}

async function runList(supabase, { summarizeSignups }) {
  const [signups, joinedEmails] = await Promise.all([
    fetchSignups(supabase),
    fetchJoinedEmails(supabase),
  ]);
  console.table(summarizeSignups(signups, joinedEmails));
}

async function runExport(supabase, { summarizeSignups }) {
  const [signups, joinedEmails] = await Promise.all([
    fetchSignups(supabase),
    fetchJoinedEmails(supabase),
  ]);
  console.log(toCsv(summarizeSignups(signups, joinedEmails)));
}

async function runInvite(supabase, { selectForInvite }, args) {
  const limit = parseLimit(args);
  const signups = await fetchSignups(supabase);
  const targets = selectForInvite(signups, { limit });
  if (targets.length === 0) {
    console.error("Nobody left to invite.");
    return;
  }
  console.log(targets.map((s) => s.email).join("\n"));
  const { error } = await supabase
    .from("waitlist_signups")
    .update({ invited_at: new Date().toISOString() })
    .in(
      "email",
      targets.map((s) => s.email),
    );
  if (error) throw new Error(`stamping invited_at failed: ${error.message}`);
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const [{ createAdminClient }, lib] = await Promise.all([
    import("../lib/supabase-admin.ts"),
    import("../lib/founding-cohort.ts"),
  ]);
  const supabase = createAdminClient();

  switch (command) {
    case "list":
      return runList(supabase, lib);
    case "export":
      return runExport(supabase, lib);
    case "invite":
      return runInvite(supabase, lib, args);
    default:
      console.error("Usage: waitlist.cjs <list|export|invite [--limit N]>");
      process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
