import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  error?: string | null;
  loading?: boolean;
  skeleton?: ReactNode;
};

/** Shared shell: optional API-style error/loading, or plain section content. */
export function InnerPageLayout({ error, loading, skeleton, children }: Props) {
  if (error) {
    return (
      <div className="section-padding container-tight">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }
  if (loading && skeleton) {
    return (
      <div className="section-padding">
        <div className="container-tight">{skeleton}</div>
      </div>
    );
  }
  return (
    <div className="section-padding">
      <div className="container-tight">{children}</div>
    </div>
  );
}

/** Simple section wrapper for pages that do not use loading states */
export function SimpleSection({ children }: { children: ReactNode }) {
  return (
    <section className="section-padding">
      <div className="container-tight">{children}</div>
    </section>
  );
}
