import { Link, useParams } from 'react-router-dom';
import { CaseStudyArticle } from '../components/CaseStudyArticle';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { getCaseStudyExtended } from '../data/caseStudyContent';
import NotFound from './NotFound';
import { usePortfolio } from '../contexts/PortfolioDataContext';
import { findProjectByCaseStudySlug } from '../lib/projectCaseStudy';

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { portfolio } = usePortfolio();

  if (!slug) {
    return <NotFound />;
  }

  const project = findProjectByCaseStudySlug(portfolio.projects, slug);

  if (!project) {
    return <NotFound />;
  }

  const extended = getCaseStudyExtended(slug);

  return (
    <InnerPageLayout>
      <nav className="mb-8">
        <Link to="/projects" className="text-sm text-accent hover:underline">
          ← Back to Work
        </Link>
      </nav>
      <article className="max-w-3xl">
        <CaseStudyArticle project={project} extended={extended} />
      </article>
    </InnerPageLayout>
  );
}
