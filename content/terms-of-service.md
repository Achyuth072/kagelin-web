# Kagelin — Terms of Service

*Last updated: 2026-07-20.* **Not legal advice.** A plain-language description of the terms
governing your use of Kagelin.

---

## 1. Acceptance of terms

By using Kagelin (the "**Service**"), you agree to these Terms of Service and the
[Privacy Policy](/privacy). If you don't agree, don't use the Service.
These terms apply equally to Guest Mode and registered-account use.

## 2. What Kagelin is

Kagelin is a task, habit, and focus-management application, currently in **invite-only beta**.
Beta means: features may change or break, data-loss risk is higher than a stable release (see
Section 6), and we're actively soliciting feedback through
[GitHub Discussions](https://github.com/Achyuth072/kagelin/discussions). This is not a finished
product; treat it accordingly.

## 3. Eligibility

You must be at least **18 years old** to create an account. This single age threshold satisfies
the varying legal ages of digital consent across jurisdictions, including India's DPDP Act, the
US COPPA (under 13), and the EU/UK GDPR (13 to 16 depending on the member state), since Kagelin
doesn't currently have the infrastructure (age verification, parental-consent flows) to support
a lower age with additional safeguards. Guest Mode has no age gate since no personal data is
collected, but the same 18+ expectation applies. Kagelin is not directed at children.

## 4. Accounts and Guest Mode

- **Guest Mode:** no account, no server-side data. Your data lives in your browser only. We
  can't recover it if you clear your browser storage or switch devices; that is the trade-off
  for not collecting anything. We're aware of this limitation: native apps for most platforms
  are planned to keep Guest Mode data reliably on-device rather than relying solely on browser
  storage.
- **Registered accounts:** sign in via email magic-link. You're responsible for keeping access to
  your email, since that's the sole authentication factor. Notify us if you suspect unauthorized
  account access.
- You may connect optional third-party integrations (Google Calendar, Outlook Calendar, a
  self-hosted WebDAV server for backup). Connecting them is your choice and revocable at any time
  in Settings.

## 5. Acceptable use

Don't: use the Service to violate any law; attempt to bypass rate limits, authentication, or the
WebDAV proxy's abuse protections; scrape or bulk-extract other users' data; reverse-engineer the
Service beyond what's already permitted by its open-source license (Section 9); use the Service
to store or transmit content that's illegal, infringing, or malicious (including via the WebDAV
proxy, which forwards to servers you specify; you are responsible for what you point it at).

## 6. Beta disclaimers — no warranty

THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, DURING BETA.
We do not guarantee uptime, data durability, or that features will remain unchanged.
**Back up your data.** Guest Mode via the export feature; registered accounts via the same
export or by requesting a copy (Privacy Policy, Section 7). We run backups on our production
database, but you should not treat that as a substitute for your own export, especially during
beta.

## 7. Third-party services

Google Calendar, Outlook Calendar, and any WebDAV server you connect are operated by third
parties, governed by their own terms. We're not responsible for their availability, data
handling, or changes to their APIs that might affect sync. If you connect a self-hosted WebDAV
server, you're solely responsible for that server's security and configuration; our proxy
forwards your request, it doesn't vouch for the destination.

## 8. Payments

Kagelin does not currently charge for any feature. If a paid ("Premium") tier launches in the
future, these Terms will be updated with billing-specific provisions (pricing, refunds, and the
payment processor used) before that tier goes live, and you'll be notified.

## 9. Intellectual property & open source

Kagelin's source code is licensed under the **GNU Affero General Public License v3.0
(AGPL-3.0-only)**. See the repository's `LICENSE` file. That license governs your rights to the
code itself (use, modify, redistribute, subject to AGPL's copyleft and network-use disclosure
terms). These Terms of Service separately govern your use of **our hosted instance** of Kagelin
at [app.kagelin.app](https://app.kagelin.app). Running your own instance from the source code
is covered by the AGPL, not by these Terms.

Being open source under AGPL doesn't require the hosted Service itself to be free of charge: the
license governs source-code availability, not price. AGPL-3.0 Section 13 requires that anyone
running a modified version of this code as a network service publish that exact modified source
to users, free, on request; it says nothing about what we may charge for access to the running
Service. A paid Premium tier alongside a free tier is fully compatible with the license.

You retain ownership of the content you create (tasks, habits, notes). By using the Service, you
grant us the limited license needed to store, sync, and display that content back to you; we
don't use your content for any other purpose (see Privacy Policy, Section 4).

**AGPL source-availability note (a disclosure of our own obligation, not a term you agree to):**
we commit to keeping the code actually deployed at app.kagelin.app in sync with the public
repository; if a deployment-specific fork or private patch is ever running instead, we'll
publish it. Verify this holds before each deploy; it's a license compliance obligation
independent of privacy law.

The Kagelin name and branding are currently **unregistered** (no trademark filed). Formal
registration is deferred until there's revenue or press exposure worth protecting.

## 10. Termination

You can stop using the Service and request account deletion any time (Privacy Policy, Section
7). We may suspend or terminate access for violations of Section 5, or discontinue the beta
program with reasonable notice where practical; beta programs can end, and we'll aim to give you
a window to export your data first.

## 11. Limitation of liability

To the maximum extent permitted by law, we are not liable for indirect, incidental, or
consequential damages arising from use of the Service, including data loss during beta. Our
total liability for any claim is limited to the amount you paid us in the past 12 months,
currently ₹0, since Kagelin charges nothing during the no-billing beta. This limit will be
revisited alongside the Terms once billing exists.

## 12. Governing law & disputes

These Terms are governed by the laws of India. Courts in Kerala, India have exclusive
jurisdiction over any dispute. Before any formal dispute, we ask that you contact us
first (Section 14) so we can try to resolve it informally.

## 13. Changes to these terms

We'll update the date at the top and, for material changes, notify registered users by email.
Continued use after a change means you accept the updated terms.

## 14. Contact

[legal@kagelin.app](mailto:legal@kagelin.app), for terms questions or disputes.
