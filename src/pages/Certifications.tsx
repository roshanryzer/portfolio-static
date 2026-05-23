import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';
import { formatIssuedDisplay } from '../lib/format';

export default function Certifications() {
  const { portfolio, content } = usePortfolio();
  const certifications = [...portfolio.certifications].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <InnerPageLayout>
      <PageHeading title={content.certifications.title} />
      <div className="space-y-3">
        {certifications.map((cert) => (
          <article key={cert.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4">
            <p className="font-semibold">{cert.name}</p>
            <p className="text-sm text-slate-600 dark:text-ink-muted">{cert.issuer}</p>
            <p className="text-xs text-slate-500 dark:text-ink-muted mt-1">{formatIssuedDisplay(cert.issuedAt)}</p>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  );
}
