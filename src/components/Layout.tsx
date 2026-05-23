import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '../contexts/ThemeContext';

const mainNav = [
  { path: '/about', label: 'About' },
  { path: '/education', label: 'Education' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Work' },
  { path: '/contact', label: 'Contact' },
];

function navLinkActive(path: string, pathname: string): boolean {
  if (path === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/');
  }
  return pathname === path;
}

function NavLink({
  path,
  label,
  onClick,
}: {
  path: string;
  label: string;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  const active = navLinkActive(path, pathname);
  return (
    <Link
      to={path}
      onClick={onClick}
      className={clsx(
        'text-sm font-medium transition-colors',
        active ? 'text-accent' : 'text-slate-600 dark:text-ink-light hover:text-accent',
      )}
    >
      {label}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-navy">
      <header className="app-header fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-navy/90 backdrop-blur border-b border-slate-200 dark:border-white/5">
        <div className="container-tight flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-accent font-semibold text-lg border border-accent/40 hover:bg-accent-dim hover:border-accent/60 transition-all duration-200"
            aria-label="Home"
          >
            R
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {mainNav.map(({ path, label }) => (
              <NavLink key={path} path={path} label={label} />
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded text-slate-600 dark:text-ink-muted hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded text-slate-500 dark:text-ink-muted hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded text-slate-600 dark:text-ink-light hover:text-accent"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-white/5 bg-white dark:bg-navy">
            <div className="container-tight py-4 flex flex-col gap-4">
              {mainNav.map(({ path, label }) => (
                <NavLink key={path} path={path} label={label} onClick={() => setMobileOpen(false)} />
              ))}
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1 pt-16">{children}</main>
      <footer
        id="contact"
        className="app-footer border-t border-slate-200 dark:border-white/5 py-8 text-center text-sm text-slate-500 dark:text-ink-muted bg-slate-50 dark:bg-navy-light"
      >
        <div className="container-tight">
          <p>© {new Date().getFullYear()} — Developed by Roshan Shrestha</p>
        </div>
      </footer>
    </div>
  );
}
