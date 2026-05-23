import { useState } from 'react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { StaggeredListItem, LogoThumb, EmptyState } from '../components/ContentList';
import { ExperienceModal } from '../components/ExperienceModal';
import { formatExperienceRange } from '../lib/format';
import { experienceListPreview } from '../lib/experiencePreview';
import matterLogo from '../assets/matter.png';
import nabilLogo from '../assets/nabil.png';
import amnilLogo from '../assets/amnil.png';
import { usePortfolio } from '../contexts/PortfolioDataContext';

export default function Experience() {
  const { portfolio } = usePortfolio();
  const items = [...portfolio.experience].sort((a, b) => a.sortOrder - b.sortOrder);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  const resolveExperienceLogo = (company: string, logoUrl: string | null) => {
    if (logoUrl) return logoUrl;
    if (/matter/i.test(company)) return matterLogo;
    if (/nabil/i.test(company)) return nabilLogo;
    if (/amnil/i.test(company)) return amnilLogo;
    return null;
  };

  const selectedExperience =
    items.find((exp) => exp.id === selectedExperienceId) ?? null;

  return (
    <InnerPageLayout>
      <PageHeading title="Experience" />
      <div className="space-y-6">
        {items.length === 0 ? (
          <EmptyState>No experience entries yet.</EmptyState>
        ) : (
          items.map((exp, i) => (
            <StaggeredListItem
              key={exp.id}
              index={i}
              className="relative flex gap-4 cursor-pointer hover:border-accent/40 transition-colors"
            >
              <button
                type="button"
                className="absolute inset-0 z-10 rounded-xl"
                aria-label={`View details: ${exp.role} at ${exp.company}`}
                onClick={() => setSelectedExperienceId(exp.id)}
              />
              {resolveExperienceLogo(exp.company, exp.logoUrl) && (
                <div className="relative z-20 pointer-events-none shrink-0">
                  <LogoThumb src={resolveExperienceLogo(exp.company, exp.logoUrl)!} alt={exp.company} />
                </div>
              )}
              <div className="flex-1 relative z-20 pointer-events-none">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-ink-light">{exp.role}</h2>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {formatExperienceRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-slate-800 dark:text-ink-light font-medium">{exp.company}</p>
                {exp.description && (
                  <>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {experienceListPreview(exp.description)}
                    </p>
                    <p className="mt-2 text-xs font-medium text-accent">View details</p>
                  </>
                )}
              </div>
            </StaggeredListItem>
          ))
        )}
      </div>
      <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperienceId(null)} />
    </InnerPageLayout>
  );
}
