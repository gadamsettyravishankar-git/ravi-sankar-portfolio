import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#060b19]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 rounded-sm"
        >
          Ravi Sankar
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 rounded-sm ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Action (Desktop) + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden md:inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-white gradient-btn-primary whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Contact
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-200 hover:border-slate-700 hover:text-white md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-b border-slate-800 bg-[#080f23]/95 backdrop-blur-xl md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          >
            {[...NAV_LINKS, { id: 'contact', label: 'Contact' }].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-500/15 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-blue-400">Active</span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
