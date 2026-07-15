const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= MAX_EMAIL_LENGTH;
}
