type ClassValue = string | number | null | false | undefined;

/**
 * Minimal className joiner. The marketing site doesn't pull in clsx/twMerge —
 * there are no conflicting-utility merges to resolve here, just conditional
 * joins, so a tiny local helper keeps the dependency surface small.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
