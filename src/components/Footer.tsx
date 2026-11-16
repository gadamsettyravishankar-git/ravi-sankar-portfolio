import { GITHUB_PROFILE_URL } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#050915] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            Ravi Sankar
          </p>
          <p className="mt-1 text-xs text-slate-400">
            First-Year B.Tech Computer Science · Aspiring AI Engineer · {year}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400"
        >
          <a href="#home" className="hover:text-slate-100 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-slate-100 transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-slate-100 transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-slate-100 transition-colors">
            Projects
          </a>
          <a
            href="#achievements"
            className="hover:text-slate-100 transition-colors"
          >
            Achievements
          </a>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
