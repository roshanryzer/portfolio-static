export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="mt-2 text-slate-600 dark:text-ink-muted">{subtitle}</p>}
    </div>
  );
}
