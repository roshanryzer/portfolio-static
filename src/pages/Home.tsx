import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioDataContext';
import { ExperienceModal } from '../components/ExperienceModal';
import roshanImage from '../assets/roshan_image.png';
import curtinLogo from '../assets/curtin.png';
import purbanchalLogo from '../assets/purbanchal.png';
import hsebLogo from '../assets/hseb.png';
import matterLogo from '../assets/matter.png';
import nabilLogo from '../assets/nabil.png';
import amnilLogo from '../assets/amnil.png';
import SkillChip from '../components/SkillChip';
import { formatExperienceRange, formatIssuedDisplay } from '../lib/format';
import { experienceListPreview } from '../lib/experiencePreview';

const statCardBaseClass =
  'group relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-white to-slate-50/70 dark:from-navy-light/80 dark:to-navy-light/60 p-5 shadow-sm dark:shadow-card-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-glow';

export default function Home() {
  const { portfolio, content } = usePortfolio();
  const { profile, projects, skills, experience, certifications, education } = portfolio;
  const experienceOrdered = [...experience].sort((a, b) => a.sortOrder - b.sortOrder);
  const certificationsOrdered = [...certifications].sort((a, b) => a.sortOrder - b.sortOrder);
  if (!profile) {
    return (
      <section className="section-padding min-h-[50vh] flex items-center">
        <div className="container-tight text-slate-600 dark:text-ink-muted">Profile is not configured.</div>
      </section>
    );
  }
  const featured = projects.filter((p) => p.featured);
  const introText = content.home.introText;
  const nameText = profile.name;
  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [typedIntro, setTypedIntro] = useState('');
  const [typedName, setTypedName] = useState('');
  const selectedJob = experienceOrdered.find((job) => job.id === selectedId) ?? null;

  const profileHighlights = useMemo(() => {
    const { stats, profileGlance } = content.home;
    const { helpers } = profileGlance;
    return [
      {
        id: 'skills',
        label: stats.skills,
        value: skills.length,
        helper: helpers.skills,
        icon: '⚙',
      },
      {
        id: 'experience',
        label: stats.experience,
        value: experience.length,
        helper: helpers.experience,
        icon: '💼',
      },
      {
        id: 'education',
        label: stats.education,
        value: education.length,
        helper: helpers.education,
        icon: '🎓',
      },
      {
        id: 'certifications',
        label: stats.certifications,
        value: certifications.length,
        helper: helpers.certifications,
        icon: '📜',
      },
    ].filter((h) => h.value > 0);
  }, [
    content.home,
    skills.length,
    experience.length,
    education.length,
    certifications.length,
  ]);
  const resolveEducationLogo = (institution: string, logoUrl?: string | null) => {
    if (logoUrl?.includes('curtin')) return curtinLogo;
    if (logoUrl?.includes('purbanchal')) return purbanchalLogo;
    if (logoUrl?.includes('hseb')) return hsebLogo;
    if (/curtin/i.test(institution)) return curtinLogo;
    if (/purbanchal/i.test(institution)) return purbanchalLogo;
    if (/hseb/i.test(institution)) return hsebLogo;
    return null;
  };
  const resolveExperienceLogo = (company: string, logoUrl?: string | null) => {
    if (logoUrl?.includes('matter')) return matterLogo;
    if (logoUrl?.includes('nabil')) return nabilLogo;
    if (logoUrl?.includes('amnil')) return amnilLogo;
    if (/matter/i.test(company)) return matterLogo;
    if (/nabil/i.test(company)) return nabilLogo;
    if (/amnil/i.test(company)) return amnilLogo;
    return null;
  };

  useEffect(() => {
    if (!selectedJob) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedJob]);

  useEffect(() => {
    let introIndex = 0;
    let nameIndex = 0;
    let nameTimer: number | null = null;

    setTypedIntro('');
    setTypedName('');

    const introTimer = window.setInterval(() => {
      introIndex += 1;
      setTypedIntro(introText.slice(0, introIndex));
      if (introIndex >= introText.length) {
        window.clearInterval(introTimer);
        nameTimer = window.setInterval(() => {
          nameIndex += 1;
          setTypedName(nameText.slice(0, nameIndex));
          if (nameIndex >= nameText.length) {
            if (nameTimer) window.clearInterval(nameTimer);
          }
        }, 70);
      }
    }, 60);

    return () => {
      window.clearInterval(introTimer);
      if (nameTimer) window.clearInterval(nameTimer);
    };
  }, [introText, nameText]);

  useEffect(() => {
    if (!selectedJob) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selectedJob]);

  return (
    <>
      <section className="relative overflow-hidden section-padding min-h-[85vh] flex items-center">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100/60 to-slate-200/40 dark:from-navy dark:via-navy dark:to-navy-light"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 -right-10 h-[420px] w-[420px] rounded-full bg-slate-400/20 dark:bg-accent/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-24 h-[320px] w-[320px] rounded-full bg-slate-300/35 dark:bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="container-tight relative z-10">
          <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 items-center">
            <div className="mx-auto md:mx-0">
              <img
                src={roshanImage}
                alt={`${profile.name} profile`}
                className="w-40 h-40 md:w-44 md:h-44 rounded-2xl object-cover border border-slate-300/80 dark:border-white/10 shadow-md dark:shadow-glow ring-1 ring-slate-300/70 dark:ring-accent/25"
              />
            </div>
            <div>
              <p className="text-slate-600 dark:text-accent font-mono text-sm md:text-base mb-5 min-h-[20px] tracking-wide">
                {typedIntro}
                {typedIntro.length < introText.length && <span className="animate-pulse">|</span>}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-ink-light mb-4 leading-[1.1] tracking-tight">
                {typedName}
                {typedName.length < nameText.length && <span className="animate-pulse">|</span>}
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-slate-700 dark:text-ink-muted mb-8 leading-tight max-w-2xl">
                {profile.tagline}
              </h2>
              <p className="text-slate-600/95 dark:text-ink-muted max-w-lg text-base md:text-lg leading-relaxed mb-12">
                {profile.shortBio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 dark:text-navy dark:bg-accent dark:hover:bg-accent-soft shadow-sm dark:shadow-glow transition-all duration-200 hover:scale-[1.02]"
                >
                  {content.home.primaryCta}
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-slate-700 dark:text-ink-light border border-slate-300/90 dark:border-white/10 hover:border-slate-500 dark:hover:border-accent/50 hover:text-slate-900 dark:hover:text-accent transition-colors"
                >
                  {content.home.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {profileHighlights.length > 0 && (
        <section className="pt-8 pb-10 md:pb-12">
          <div className="container-tight">
            <div className="mb-5 md:mb-6">
              <p className="inline-flex items-center pt-4 rounded-full border border-slate-300/90 dark:border-accent/30 bg-white/90 dark:bg-accent/10 px-3 py-1 text-xs font-mono tracking-wide text-slate-700 dark:text-accent">
                {content.home.profileGlance.kicker}
              </p>
              <p className="mt-3 text-sm text-slate-600/95 dark:text-ink-muted">
                {content.home.profileGlance.subtitle}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {profileHighlights.map((highlight) => (
                <article key={highlight.id} className={statCardBaseClass}>
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-slate-300/45 dark:bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300/80 bg-slate-100 text-base dark:border-accent/25 dark:bg-accent/15">
                      {highlight.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-ink-muted">{highlight.label}</p>
                    <p className="mt-1 text-3xl font-bold leading-none text-slate-900 dark:text-ink-light">
                      {highlight.value}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-ink-soft">
                      {highlight.helper}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section
          id="experience"
          className="py-10 md:py-12 bg-gradient-to-b from-slate-100/60 to-slate-50 dark:from-navy dark:to-navy-light"
        >
          <div className="container-tight">
            <h2 className="section-title mb-6">{content.home.experienceTitle}</h2>
            <div className="space-y-4">
              {experienceOrdered.slice(0, 4).map((job) => (
                <button
                  type="button"
                  key={job.id}
                  onClick={() => setSelectedId(job.id)}
                  className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-navy p-4 hover:border-slate-400 dark:hover:border-accent/60 transition-colors"
                >
                  <div className="flex gap-3">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <p className="font-semibold text-slate-900 dark:text-ink-light">
                          {job.role}{' '}
                          <span className="text-slate-500 dark:text-ink-muted">@ {job.company}</span>
                        </p>
                        <p className="text-xs font-mono text-slate-500 dark:text-ink-muted shrink-0">
                          {formatExperienceRange(job.startDate, job.endDate, job.current ?? false)}
                        </p>
                      </div>
                      {job.description && (
                        <p className="text-sm text-slate-600 dark:text-ink-muted line-clamp-3">
                          {experienceListPreview(job.description, { maxChars: 220 })}
                        </p>
                      )}
                      <p className="mt-2 text-xs font-medium text-accent">{content.home.viewDetailsLabel}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white dark:bg-navy">
        <div className="container-tight">
          {Object.keys(skillsByCategory).length > 0 && (
            <div className="mb-14">
              <h2 className="section-title mb-6">{content.skills.title}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(skillsByCategory).map(([category, list]) => (
                  <article
                    key={category}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy p-4"
                  >
                    <h3 className="text-sm font-semibold mb-3 text-slate-900 dark:text-ink-light">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {list.slice(0, 6).map((name) => (
                        <SkillChip
                          key={name}
                          label={name}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-14">
              <h2 className="section-title mb-6">{content.education.title}</h2>
              <div className="space-y-4">
                {education.slice(0, 3).map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy p-4"
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
                        <p className="font-semibold text-slate-900 dark:text-ink-light">
                          {item.degree}
                          {item.field ? ` in ${item.field}` : ''}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-ink-muted">
                          {item.institution} · {item.startYear} -{' '}
                          {item.endYear ?? content.education.presentLabel}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mb-14">
              <h2 className="section-title mb-6">{content.certifications.title}</h2>
              <div className="space-y-3">
                {certificationsOrdered.map((cert) => (
                  <article
                    key={cert.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy p-4"
                  >
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-sm text-slate-600 dark:text-ink-muted">{cert.issuer}</p>
                    <p className="text-xs text-slate-500 dark:text-ink-muted mt-1">
                      {formatIssuedDisplay(cert.issuedAt)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {featured.length > 0 && (
            <>
              <h2 className="section-title mb-8">{content.home.featuredProjectsTitle}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((project) => {
                  const cardClass =
                    'block p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-navy shadow-card dark:shadow-card-dark hover:border-accent/40 transition-colors';
                  const inner = (
                    <>
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-slate-600 dark:text-ink-muted text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-500 dark:text-ink-muted">
                        {(project.tech ?? []).slice(0, 8).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </>
                  );
                  if (project.url?.startsWith('http')) {
                    return (
                      <a key={project.id} href={project.url} rel="noreferrer" className={cardClass}>
                        {inner}
                      </a>
                    );
                  }
                  const to =
                    project.url?.startsWith('/') ? project.url : `/projects#${project.id}`;
                  return (
                    <Link key={project.id} to={to} className={cardClass}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <ExperienceModal
        experience={
          selectedJob
            ? {
                ...selectedJob,
                current: selectedJob.current ?? false,
                endDate: selectedJob.endDate ?? null,
                description: selectedJob.description ?? null,
                logoUrl: selectedJob.logoUrl ?? null,
              }
            : null
        }
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
