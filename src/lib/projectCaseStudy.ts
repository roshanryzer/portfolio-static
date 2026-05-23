/** Resolve `/projects/case-study/:slug` from project list (matches seeded `url` field). */
export function findProjectByCaseStudySlug<T extends { url: string | null }>(
  projects: T[],
  slug: string,
): T | undefined {
  const normalized = slug.trim();
  if (!normalized) return undefined;
  const exactPath = `/projects/case-study/${normalized}`;
  return projects.find((p) => {
    const u = p.url;
    if (!u) return false;
    return u === exactPath || u.endsWith(`/case-study/${normalized}`);
  });
}
