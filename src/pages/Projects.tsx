import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageHeading } from '../components/PageHeading';
import { usePortfolio } from '../contexts/PortfolioDataContext';

export default function Projects() {
  const { portfolio, content } = usePortfolio();
  const projects = [...portfolio.projects].sort((a, b) => a.sortOrder - b.sortOrder);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <InnerPageLayout>
        <PageHeading title={content.projects.title} subtitle={content.projects.subtitle} />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedId(project.id)}
              className="text-left w-full p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light hover:border-accent/60 transition-colors"
            >
              {project.imageUrl && (
                <img src={project.imageUrl} alt="" className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-ink-light">{project.title}</h2>
              <p className="text-sm text-slate-600 dark:text-ink-muted mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(project.tech ?? []).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-medium text-accent">{content.projects.viewDetailsLabel}</p>
            </button>
          ))}
        </div>
      </InnerPageLayout>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-ink-light">
                  {selectedProject.title}
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-ink-muted mt-1">
                  {content.projects.stackLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600 text-sm"
              >
                {content.projects.closeLabel}
              </button>
            </div>

            <p className="mt-5 leading-relaxed text-slate-700 dark:text-ink-light whitespace-pre-line">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {(selectedProject.tech ?? []).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5">
              {(() => {
                const visit = selectedProject.url ?? selectedProject.repoUrl;
                if (!visit) {
                  return <p className="text-sm text-slate-500 dark:text-ink-muted">{content.projects.noLinkLabel}</p>;
                }
                if (visit.startsWith('http')) {
                  return (
                    <a href={visit} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                      {content.projects.visitProjectLabel}
                    </a>
                  );
                }
                if (visit.startsWith('/')) {
                  return (
                    <Link
                      to={visit}
                      className="text-sm text-accent hover:underline"
                      onClick={() => setSelectedId(null)}
                    >
                      Open full page
                    </Link>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
