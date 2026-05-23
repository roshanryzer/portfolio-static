import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { PortfolioAll } from '../types/api';
import { initialPortfolioAll } from '../data/initialPortfolio';
import { siteContent } from '../data/siteContent';

type PortfolioContextValue = {
  portfolio: PortfolioAll;
  content: typeof siteContent;
};

const PortfolioDataContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const portfolio = useMemo(() => structuredClone(initialPortfolioAll), []);
  const value = useMemo<PortfolioContextValue>(
    () => ({ portfolio, content: siteContent }),
    [portfolio],
  );
  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioDataProvider');
  return ctx;
}
