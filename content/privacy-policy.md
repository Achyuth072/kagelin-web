# Kagelin — Privacy Policy

*Last updated: 2026-07-20.* **Not legal advice.** A plain-language description of how Kagelin
handles your data.

---

## 1. Who we are

Kagelin ("**we**," "**us**," "**our**") is a task, habit, and focus-management application,
operated by Achyuth S, operating as **Kagelin**, based in India, reachable at
[privacy@kagelin.app](mailto:privacy@kagelin.app). This policy explains what personal data
Kagelin collects, why, and what rights you have over it, whether you're in India, the EU,
California, or anywhere else.

Kagelin is currently in **invite-only beta**. This policy will be updated as features (billing,
native apps, encrypted-at-rest content) ship; check the "last updated" date above.

## 2. Guest Mode: the default is zero collection

If you use Kagelin without creating an account, **we never receive your data.** Tasks, habits,
focus sessions, and settings are stored only in your browser's local storage, on your device.
Nothing described in this policy applies to Guest Mode use, because nothing leaves your device.
Switching to an account moves your local data to our servers, at which point the rest of this
policy applies.

## 3. What we collect (registered accounts)

| Category | What | Why | Optional? |
|---|---|---|---|
| Account | Email address (magic-link sign-in via Supabase Auth); display name, timezone, notification preferences | Sign-in, personalization | Email required; the rest optional |
| App content | Tasks, projects, habits, focus session logs, calendar events you create | Core functionality | N/A (this is the product) |
| Calendar sync | Google/Outlook OAuth refresh tokens (encrypted at rest, AES-GCM, accessible only to backend service-role code, never the client or database viewer), calendar IDs, sync metadata | Two-way calendar sync | Optional; only if you connect a calendar |
| Cloud backup | WebDAV server URL, username, password: **held in memory only for your session; never written to a database or browser storage; cleared on page reload** | One-time backup upload/download to a server you control (e.g. Nextcloud) | Optional |
| Push notifications | Push subscription endpoint and encryption keys | Reminder delivery | Optional |
| Technical | IP address (transient, used for rate-limiting and error diagnostics), browser/device type, error reports | Abuse prevention, reliability | Automatic, minimal |

We do not collect: phone number, physical address, government ID, payment/financial information
(no billing exists yet), or social-media profile data (no "Sign in with Facebook/Twitter").

## 4. Who we share data with

We do not sell personal data, and we do not use it for advertising or remarketing. Kagelin has
no ads and no ad-tech integrations. We use these processors to operate the service:

- **Supabase**: database hosting and authentication.
- **Resend**: transactional email (magic-link sign-in, notifications), sent from a
  verified `kagelin.app` domain.
- **Sentry**: error monitoring. May capture technical diagnostic data (IP address, browser
  info, stack traces) at the moment an error occurs.
- **Upstash**: rate limiting. Sees only an IP address or user ID and the fact of a request,
  never your task/account content.
- **Cloudflare (Turnstile)**: bot-prevention challenge on the sign-in form.
- **Google / Microsoft**: only if you connect a calendar, governed by your existing
  relationship with those providers as well as this policy.

Each processor is bound by its own terms; we don't share data with anyone beyond what's needed
to run the listed feature.

## 5. Cookies and local storage

We use browser local storage / IndexedDB to keep the app responsive offline (this is core to how
the PWA works, not a tracking mechanism) and a session cookie for authentication. We do not use
third-party advertising or analytics cookies (no Google Analytics or similar is integrated).

## 6. Your rights

### If you're in the EU/UK (GDPR)

You have the right to access, correct, delete, restrict, or port your personal data, and to
object to processing. Our legal basis for processing is **contract performance** (running the
account you signed up for) and **legitimate interest** (security, abuse prevention). We don't
currently have a formal EU representative under GDPR Article 27. **This is a known open gap, not
a claimed exemption.** Article 27's "occasional processing" exemption is narrowly interpreted
and generally doesn't cover an ongoing account-based SaaS, so it likely doesn't apply here once
EU users are real. We intend to appoint a representative (a low-cost annual service, not a law
firm) before actively recruiting EU users at scale. You can lodge a complaint with your local
data protection authority regardless.

### If you're in California (CCPA/CPRA)

You have the right to know what personal information we collect, to request deletion, to correct
inaccurate information, and to opt out of "sale" or "sharing" of personal information, which is
moot here since **we do not sell or share personal information** for cross-context behavioral
advertising. We do not discriminate against users who exercise these rights.

### If you're in India (DPDP Act, 2023)

See the dedicated section below. DPDP grants similar access/correction/erasure/grievance rights
and additionally requires a named grievance contact.

### CalOPPA (California)

This policy is posted at kagelin.app/privacy and describes the categories of information collected,
third parties we share with (Section 4), and how to request changes (contact us, Section 12).
We do not currently respond differently to browser "Do Not Track" signals, since we don't run
tracking scripts that would be affected by it.

### Regardless of jurisdiction

Every user, anywhere, can request account and data deletion by contacting us; see Section 7.

## 7. Data retention & deletion

We keep your data as long as your account is active. The in-app "Clear Cloud Data" feature
deletes your tasks, projects, habits, focus logs, and calendar events immediately. **Full account
deletion (profile, push subscription, connected-calendar records, stored OAuth tokens, and the
underlying account itself) is currently handled manually during beta.** Email
[privacy@kagelin.app](mailto:privacy@kagelin.app) and we will delete all remaining personal data
within **30 days**. *(A self-serve "Delete my account" flow is planned before the app exits
beta.)*

## 8. India DPDP Act notice & Grievance Officer

Under India's Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025, we act as a
**Data Fiduciary** and you as a **Data Principal**, regardless of your location. This section
applies in addition to, not instead of, the rest of this policy.

**Grievance Officer:** Achyuth S, [privacy@kagelin.app](mailto:privacy@kagelin.app). Per the
DPDP Rules, 2025, we will resolve grievances within **7 days** of receipt; this is a mandated
timeline for every data fiduciary, not a target we've chosen.

**Cross-border transfer:** your data may be processed on servers outside India (our processors'
infrastructure). The DPDP Act permits this except to countries specifically restricted by the
Indian government; none currently apply to our processors.

**Consent withdrawal:** disconnect optional features (calendar sync, push notifications, WebDAV)
any time in Settings; email us to withdraw consent to processing entirely (equivalent to account
deletion, Section 7).

## 9. Children's privacy

Kagelin requires users to be at least 18 years old (see Terms of Service, Section 3). This
single threshold covers DPDP's definition of a child (under 18, requiring verifiable parental
consent, a flow Kagelin doesn't support), COPPA's under-13 threshold, and GDPR's 13-to-16
age-of-digital-consent range. There is no age-verification step beyond the account-creation
acknowledgment. If you believe someone under 18 has an account, contact us and we'll delete it.

## 10. Security

- Calendar OAuth refresh tokens: encrypted at rest (AES-GCM), service-role-only access.
- WebDAV credentials: never persisted, in-memory for the session only.
- Database access: row-level security scoped to your account.
- Task/habit content itself is not yet encrypted at rest; planned as post-beta
  storage-security work.

No system is perfectly secure; we can't guarantee absolute security, but we design for it.

## 11. Changes to this policy

We'll update the date at the top and, for material changes, notify registered users by email.

## 12. Contact

For privacy questions, data requests, or grievances under any jurisdiction above, contact
[privacy@kagelin.app](mailto:privacy@kagelin.app).
