import { Resend } from "resend";

const FROM = "Kagelin <noreply@kagelin.app>";
const SUBJECT = "You're on the Kagelin waitlist";
const CONFIRMATION_TEXT = [
  "Hey,",
  "",
  "You're in, thanks for signing up for the Kagelin closed beta waitlist.",
  "",
  "There's nothing else to do from here. We'll email you as soon as it's your turn.",
  "",
  "- The Kagelin Team",
].join("\n");

export async function sendWaitlistConfirmationEmail(
  resend: Resend,
  email: string,
): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: SUBJECT,
    text: CONFIRMATION_TEXT,
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
