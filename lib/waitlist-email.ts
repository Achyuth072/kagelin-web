import { Resend } from "resend";

const FROM = "Kagelin <noreply@kagelin.app>";
const SUBJECT = "You're on the Kagelin waitlist";
const CONFIRMATION_TEXT = [
  "Kagelin",
  "",
  "You're on the waitlist. Thanks for signing up for early access to Kagelin.",
  "",
  "There's nothing else you need to do right now. We'll email you as soon as your invite is ready.",
  "",
  "In the meantime, guest mode is open and can be used anytime at https://app.kagelin.app.",
  "",
  "Have questions? Reach out to us at support@kagelin.app.",
].join("\n");

const CONFIRMATION_HTML = `
<div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2e2e2e; line-height: 1.5; font-size: 15px;">
  <p style="font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; margin: 0 0 16px;">
    Kagelin
  </p>

  <p style="margin: 0 0 12px;">
    You're on the waitlist. Thanks for signing up for early access to Kagelin.
  </p>

  <p style="margin: 0 0 16px;">
    There's nothing else you need to do right now. We'll email you as soon as your invite is ready.
  </p>

  <p style="font-size: 13px; color: #6e6e6e; margin: 0 0 20px; line-height: 1.5;">
    In the meantime, guest mode is open and can be used anytime at <a href="https://app.kagelin.app" style="color: #4b6cb7; text-decoration: underline;">app.kagelin.app</a>.
  </p>

  <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0 16px;">

  <p style="font-size: 11px; color: #6e6e6e; margin: 0; line-height: 1.5; letter-spacing: 0.02em;">
    Have questions? Reach out to us at <a href="mailto:support@kagelin.app" style="color: #4b6cb7; text-decoration: underline;">support@kagelin.app</a>.
  </p>
</div>
`.trim();

export async function sendWaitlistConfirmationEmail(
  resend: Resend,
  email: string,
): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: SUBJECT,
    text: CONFIRMATION_TEXT,
    html: CONFIRMATION_HTML,
  });
  if (error) {
    throw new Error(`resend send failed: ${error.message}`);
  }
}

let resendClient: Resend | undefined;

export function getResendClient(): Resend {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  resendClient = new Resend(apiKey);
  return resendClient;
}
