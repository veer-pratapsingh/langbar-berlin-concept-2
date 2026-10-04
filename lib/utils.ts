export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Splits text into words or characters for fine-grained typography animations.
 */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}
