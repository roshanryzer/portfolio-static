import clsx from 'clsx';

export function StaggeredListItem({
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="article"
      className={clsx(
        'p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50',
        className,
      )}
    >
      {children}
    </div>
  );
}

const logoWrap =
  'flex-shrink-0 bg-slate-100 dark:bg-navy flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700';

export function LogoThumb({
  src,
  alt,
  size = 'md',
}: {
  src: string;
  alt: string;
  size?: 'sm' | 'md';
}) {
  if (size === 'sm') {
    return (
      <div className={clsx('w-10 h-10 rounded-lg', logoWrap)}>
        <img src={src} alt={alt} className="w-8 h-8 object-contain" loading="lazy" />
      </div>
    );
  }
  return (
    <div className={clsx('w-12 h-12 rounded-xl', logoWrap)}>
      <img src={src} alt={alt} className="w-10 h-10 object-contain" loading="lazy" />
    </div>
  );
}

export function EmptyState({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={clsx('text-slate-500 dark:text-slate-400', className)}>{children}</p>;
}
