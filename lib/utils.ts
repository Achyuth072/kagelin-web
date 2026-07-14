type ClassValue = string | number | null | false | undefined;

// Minimal className joiner — no clsx/twMerge needed for conditional joins.
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
