import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';
import SkillChip from '../components/SkillChip';

export default function Skills() {
  const { portfolio, content } = usePortfolio();
  const skillsOrdered = [...portfolio.skills].sort((a, b) => a.sortOrder - b.sortOrder);
  const grouped = skillsOrdered.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  return (
    <InnerPageLayout>
      <PageHeading title={content.skills.title} subtitle={content.skills.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(grouped).map(([category, list]) => (
          <article key={category} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4">
            <h2 className="text-sm font-semibold mb-3">{category}</h2>
            <div className="flex flex-wrap gap-2">
              {list.map((item) => (
                <SkillChip key={item} label={item} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  );
}
