import { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory } from '../types/portfolio';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'programming', label: 'Programming' },
  { id: 'web', label: 'Web Foundations' },
  { id: 'ai', label: 'AI Exploration' },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="border-t border-slate-800/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-blue-400">02. Skills</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Current technical toolkit.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              An honest snapshot of my first-year foundation across Python,
              front-end web structure, and introductory Generative AI.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/75 p-1 self-start sm:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-400 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredSkills.map((skill) => (
            <article
              key={skill.id}
              className="glass-surface glass-surface-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-white">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-medium text-blue-300 whitespace-nowrap shrink-0">
                    {skill.level}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {skill.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 text-sm text-slate-300">
                  {skill.focusAreas.map((area) => (
                    <li key={area} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400"
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Foundational Progress Indicator */}
              <div className="mt-6 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Current Foundation</span>
                  <span className="font-mono tabular-nums text-slate-200">
                    {skill.progressPercent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${skill.progressPercent}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
