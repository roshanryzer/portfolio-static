import { Link } from 'react-router-dom';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';
import curtinLogo from '../assets/curtin.png';
import purbanchalLogo from '../assets/purbanchal.png';
import hsebLogo from '../assets/hseb.png';
import matterLogo from '../assets/matter.png';
import nabilLogo from '../assets/nabil.png';
import amnilLogo from '../assets/amnil.png';
import SkillChip from '../components/SkillChip';
import { formatExperienceRange } from '../lib/format';

export default function About() {
  const { portfolio, content } = usePortfolio();
  const { profile, certifications, experience, education, skills } = portfolio;
  if (!profile) {
    return (
      <InnerPageLayout>
        <p className="text-slate-600 dark:text-ink-muted">Profile is not configured.</p>
      </InnerPageLayout>
    );
  }
  const resolveEducationLogo = (institution: string, logoUrl: string | null | undefined) => {
    if (logoUrl?.includes('curtin')) return curtinLogo;
    if (logoUrl?.includes('purbanchal')) return purbanchalLogo;
    if (logoUrl?.includes('hseb')) return hsebLogo;
    if (/curtin/i.test(institution)) return curtinLogo;
    if (/purbanchal/i.test(institution)) return purbanchalLogo;
    if (/hseb/i.test(institution)) return hsebLogo;
    return null;
  };
  const experienceOrdered = [...experience].sort((a, b) => a.sortOrder - b.sortOrder);
  const educationOrdered = [...education].sort((a, b) => a.sortOrder - b.sortOrder);

  const resolveExperienceLogo = (company: string, logoUrl: string | null | undefined) => {
    if (logoUrl?.includes('matter')) return matterLogo;
    if (logoUrl?.includes('nabil')) return nabilLogo;
    if (logoUrl?.includes('amnil')) return amnilLogo;
    if (/matter/i.test(company)) return matterLogo;
    if (/nabil/i.test(company)) return nabilLogo;
    if (/amnil/i.test(company)) return amnilLogo;
    return null;
  };

  return (
    <InnerPageLayout>
      <PageHeading title={content.about.title} />
      <p className="text-slate-600 dark:text-ink-muted mb-8 leading-relaxed max-w-3xl">{profile.longBio}</p>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="text-center p-5 rounded-2xl bg-slate-100/80 dark:bg-navy-light border border-slate-200/80 dark:border-white/10">
          <div className="text-2xl font-bold text-accent">{profile.yearsExperience}+</div>
          <div className="text-sm text-slate-600 dark:text-ink-muted">
            {content.about.stats.yearsExperience}
          </div>
        </div>
        <div className="text-center p-5 rounded-2xl bg-slate-100/80 dark:bg-navy-light border border-slate-200/80 dark:border-white/10">
          <div className="text-2xl font-bold text-accent">{profile.projectsCount}+</div>
          <div className="text-sm text-slate-600 dark:text-ink-muted">
            {content.about.stats.projectsDelivered}
          </div>
        </div>
        <div className="text-center p-5 rounded-2xl bg-slate-100/80 dark:bg-navy-light border border-slate-200/80 dark:border-white/10">
          <div className="text-2xl font-bold text-accent">{certifications.length}</div>
          <div className="text-sm text-slate-600 dark:text-ink-muted">
            {content.about.stats.certifications}
          </div>
        </div>
      </div>
      {experience.length > 0 && (
        <div className="mb-10">
          <h2 className="section-title mb-6">Experience</h2>
          <div className="space-y-4">
            {experienceOrdered.map((job) => (
              <article
                key={job.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4"
              >
                <div className="flex items-start gap-3">
                  {resolveExperienceLogo(job.company, job.logoUrl) ? (
                    <img
                      src={resolveExperienceLogo(job.company, job.logoUrl)!}
                      alt={job.company}
                      className="h-10 w-10 rounded-lg object-contain border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm"
                      aria-hidden="true"
                    >
                      🏢
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{job.role}</p>
                    <p className="text-sm text-slate-600 dark:text-ink-muted">
                      {job.company} · {formatExperienceRange(job.startDate, job.endDate, job.current)}
                    </p>
                    {job.description && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-ink-muted">{job.description}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-10">
          <h2 className="section-title mb-6">{content.education.title}</h2>
          <div className="space-y-4">
            {educationOrdered.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4"
              >
                <div className="flex items-start gap-3">
                  {resolveEducationLogo(item.institution, item.logoUrl) ? (
                    <img
                      src={resolveEducationLogo(item.institution, item.logoUrl)!}
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
              </article>
            ))}
          </div>
        </div>
      )}
      {skills.length > 0 && (
        <div className="mb-10">
          <h2 className="section-title mb-6">{content.skills.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(
              skills.reduce<Record<string, string[]>>((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {}),
            ).map(([category, list]) => (
              <article
                key={category}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-4"
              >
                <h3 className="text-sm font-semibold mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {list.slice(0, 8).map((item) => (
                    <SkillChip key={item} label={item} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        <Link to="/skills" className="px-5 py-2.5 rounded-full border border-accent/60 text-accent font-medium">
          {content.about.viewSkillsLabel}
        </Link>
        <Link to="/projects" className="px-5 py-2.5 rounded border border-slate-300 dark:border-white/20">
          {content.about.viewProjectsLabel}
        </Link>
      </div>
    </InnerPageLayout>
  );
}
