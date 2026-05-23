/** Short teaser for experience cards; full copy stays in ExperienceModal. */

const DEFAULT_MAX_CHARS = 260;

export function experienceListPreview(
  description: string | null | undefined,
  options?: { maxChars?: number },
): string {
  if (!description?.trim()) return '';
  const maxChars = options?.maxChars ?? DEFAULT_MAX_CHARS;
  const firstBlock = description.trim().split(/\n\s*\n/)[0] ?? '';
  const normalized = firstBlock.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxChars) return normalized;
  const slice = normalized.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(' ');
  const truncated = lastSpace > maxChars * 0.55 ? slice.slice(0, lastSpace) : slice;
  return `${truncated.trimEnd()}…`;
}
