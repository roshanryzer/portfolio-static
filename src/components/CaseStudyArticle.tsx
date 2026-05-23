import type { CaseStudyExtended } from '../data/caseStudyContent';
import type { Project } from '../types/api';

type Props = {
  project: Project;
  extended: CaseStudyExtended | undefined;
};

export function CaseStudyArticle({ project, extended }: Props) {
  const tech = project.tech ?? [];
  const externalUrl =
    project.url?.startsWith('http') ? project.url : project.repoUrl?.startsWith('http') ? project.repoUrl : null;

  return (
    <>
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt=""
          className="w-full max-h-96 object-cover rounded-xl mb-8 border border-slate-200 dark:border-slate-700 shadow-sm"
        />
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-ink-light mb-3 tracking-tight">
        {project.title}
      </h1>

      {extended ? (
        <>
          <p className="text-accent font-mono text-sm mb-4">{extended.kicker}</p>
          <p className="text-lg md:text-xl text-slate-700 dark:text-ink-muted leading-relaxed mb-10 border-l-4 border-accent/50 pl-4">
            {extended.lede}
          </p>

          <aside className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-light/80 p-4 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-ink-muted mb-2">
              At a glance
            </p>
            <p className="text-sm text-slate-700 dark:text-ink-light leading-relaxed">{project.description}</p>
          </aside>

          <div className="space-y-12 mb-12">
            {extended.blocks.map((block) => (
              <section key={block.title}>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-ink-light mb-3">{block.title}</h2>
                <div className="text-slate-600 dark:text-ink-muted leading-relaxed space-y-4 whitespace-pre-line">
                  {block.body.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {extended.outcomes && extended.outcomes.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-ink-light mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {extended.outcomes.map((line) => (
                  <li key={line} className="flex gap-3 text-slate-600 dark:text-ink-muted">
                    <span className="text-accent shrink-0" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <p className="text-slate-600 dark:text-ink-muted leading-relaxed whitespace-pre-line mb-10">{project.description}</p>
      )}

      {tech.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-ink-muted mb-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-2">
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-accent font-medium hover:underline"
          >
            Visit external link →
          </a>
        ) : (
          <p className="text-sm text-slate-500 dark:text-ink-muted">No external URL for this write-up.</p>
        )}
      </div>
    </>
  );
}
