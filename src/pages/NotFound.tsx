import { Link } from 'react-router-dom';
import { InnerPageLayout } from '../components/InnerPageLayout';

export default function NotFound() {
  return (
    <InnerPageLayout>
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-light p-8 text-center">
        <p className="text-sm font-mono text-accent mb-2">404</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-ink-light">
          Page not found
        </h1>
        <p className="text-slate-600 dark:text-ink-muted mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex px-5 py-2.5 rounded-full text-sm font-medium text-white bg-accent"
        >
          Back to Home
        </Link>
      </div>
    </InnerPageLayout>
  );
}
