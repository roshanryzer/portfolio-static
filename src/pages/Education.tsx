import curtinLogo from '../assets/curtin.png';
import purbanchalLogo from '../assets/purbanchal.png';
import hsebLogo from '../assets/hseb.png';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';

function resolveEducationLogo(institution: string, logoUrl: string | null | undefined): string | null {
  if (logoUrl?.startsWith('http') || logoUrl?.startsWith('/')) return logoUrl;
  if (logoUrl?.includes('curtin')) return curtinLogo;
  if (logoUrl?.includes('purbanchal')) return purbanchalLogo;
  if (logoUrl?.includes('hseb')) return hsebLogo;
  if (/curtin/i.test(institution)) return curtinLogo;
  if (/purbanchal/i.test(institution)) return purbanchalLogo;
  if (/hseb/i.test(institution)) return hsebLogo;
  return null;
}

export default function Education() {
  const { portfolio, content } = usePortfolio();
  const education = [...portfolio.education].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <InnerPageLayout>
      <PageHeading title={content.education.title} />
      <div className="space-y-4">
        {education.map((item) => {
          const logoSrc = resolveEducationLogo(item.institution, item.logoUrl);
          return (
          <article key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4">
            <div className="flex items-start gap-3">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={item.institution}
                  className="h-10 w-10 rounded-lg object-contain border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1"
                  loading="lazy"
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base"
                  aria-hidden="true"
                >
                  🎓
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold">{item.degree}{item.field ? ` in ${item.field}` : ''}</p>
                <p className="text-sm text-slate-600 dark:text-ink-muted">
                  {item.institution} · {item.startYear} - {item.endYear ?? content.education.presentLabel}
                </p>
              </div>
            </div>
            {item.description && <p className="mt-2 text-sm text-slate-600 dark:text-ink-muted">{item.description}</p>}
          </article>
          );
        })}
      </div>
    </InnerPageLayout>
  );
}
