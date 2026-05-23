/**
 * Portfolio dates are stored as ISO strings (often UTC midnight).
 * Formatting uses UTC calendar fields so "2024-04-22" stays 22 April in every timezone.
 */

function parseIso(iso: string): Date | null {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** ISO 8601 calendar date in UTC: YYYY-MM-DD */
export function formatUtcIsoDate(iso: string): string {
  const d = parseIso(iso);
  if (!d) {
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(iso);
    return m ? m[1] : iso;
  }
  const y = d.getUTCFullYear();
  const mo = `${d.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${d.getUTCDate()}`.padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

/** e.g. Apr 2024 */
export function formatUtcMonthYear(iso: string): string {
  const d = parseIso(iso);
  if (!d) return iso.slice(0, 10);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Employment range, e.g. "Apr 2024 – Jul 2025" or "Apr 2024 – Present".
 */
export function formatExperienceRange(
  startIso: string,
  endIso: string | null | undefined,
  current: boolean,
): string {
  const start = formatUtcMonthYear(startIso);
  if (current) return `${start} – Present`;
  if (!endIso) return `${start} – —`;
  return `${start} – ${formatUtcMonthYear(endIso)}`;
}

/** Issued / valid-from style (month + year). */
export function formatIssuedDisplay(iso: string): string {
  return formatUtcMonthYear(iso);
}

/** @alias {@link formatUtcMonthYear} */
export function formatMonthYear(iso: string): string {
  return formatUtcMonthYear(iso);
}
