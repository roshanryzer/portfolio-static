import { useEffect, useRef } from 'react';
import type { Experience } from '../types/api';
import { formatExperienceRange } from '../lib/format';
import matterLogo from '../assets/matter.png';
import nabilLogo from '../assets/nabil.png';
import amnilLogo from '../assets/amnil.png';

type Props = {
  experience: Experience | null;
  onClose: () => void;
};

function resolveExperienceLogo(company: string, logoUrl: string | null): string | null {
  if (logoUrl) return logoUrl;
  if (/matter/i.test(company)) return matterLogo;
  if (/nabil/i.test(company)) return nabilLogo;
  if (/amnil/i.test(company)) return amnilLogo;
  return null;
}

export function ExperienceModal({ experience, onClose }: Props) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!experience) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [experience]);

  if (!experience) return null;

  const logoSrc = resolveExperienceLogo(experience.company, experience.logoUrl);

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 min-w-0 flex-1">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={`${experience.company} logo`}
                className="h-14 w-14 shrink-0 rounded-xl object-contain border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 p-1.5"
              />
            ) : (
              <div
                className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl"
                aria-hidden
              >
                🏢
              </div>
            )}
            <div className="min-w-0">
              <h2 id="experience-modal-title" className="text-xl font-semibold text-slate-900 dark:text-ink-light">
                {experience.role}
              </h2>
              <p className="text-slate-600 dark:text-ink-muted">{experience.company}</p>
              <p className="text-xs font-mono text-slate-500 dark:text-ink-muted mt-1">
                {formatExperienceRange(experience.startDate, experience.endDate, experience.current)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 shrink-0 rounded border border-slate-300 dark:border-slate-600 text-sm"
          >
            Close
          </button>
        </div>
        {experience.description && (
          <p className="mt-5 leading-relaxed text-slate-700 dark:text-ink-light whitespace-pre-line">
            {experience.description}
          </p>
        )}
      </div>
    </div>
  );
}
