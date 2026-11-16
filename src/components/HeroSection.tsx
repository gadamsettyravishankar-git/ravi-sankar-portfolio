import { ArrowDownRight, ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GITHUB_PROFILE_URL } from '../data/portfolioData';
import { ProfilePlaceholders } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfilePlaceholders;
  onEditProfileRequest: () => void;
}

export default function HeroSection({
  profile,
  onEditProfileRequest,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="text-sm font-medium tracking-wide text-blue-300/90">
              <span>First-Year B.Tech Computer Science</span>
              <span className="mx-2 text-slate-600" aria-hidden="true">
                ·
              </span>
              <span className="text-purple-300/90">Aspiring AI Engineer</span>
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Building strong foundations in{' '}
              <span className="gradient-text-accent">
                Python, Web &amp; AI
              </span>
              .
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              I&apos;m <strong className="font-semibold text-white">Ravi Sankar</strong>, a
              first-year B.Tech Computer Science student focused on mastering
              programming fundamentals, clean web architecture, and foundational
              Generative AI workflows.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white gradient-btn-primary whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-blue-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Matching Height Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-surface relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_ai_neural_architecture_1794800372735.jpg"
                  alt="Abstract dark navy glass neural architecture illuminated by electric blue and purple light"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full flex-1 object-cover lg:min-h-[360px]"
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/50 to-purple-950/40 p-8 text-center lg:min-h-[360px]">
                  <Cpu className="h-12 w-12 text-blue-400/80" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium text-slate-300">
                    Ravi Sankar · AI &amp; CS Portfolio
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 bg-slate-950/75 px-5 py-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-medium text-slate-200">
                    B.Tech Computer Science · Year 1
                  </span>
                  <span className="font-mono text-blue-300">
                    Python · HTML/CSS · GenAI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Academic Summary Strip */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-surface rounded-xl p-5">
            <p className="text-xs font-medium text-slate-400">Academic Status</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              First-Year B.Tech CS
            </p>
          </div>

          <div className="glass-surface rounded-xl p-5">
            <p className="text-xs font-medium text-slate-400">Career Track</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              Aspiring AI Engineer
            </p>
          </div>

          <div className="glass-surface rounded-xl p-5">
            <p className="text-xs font-medium text-slate-400">Active Projects</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white tabular-nums">
              2 Python Learning Builds
            </p>
          </div>

          <button
            type="button"
            onClick={onEditProfileRequest}
            className="glass-surface glass-surface-hover rounded-xl p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-400">Institution</p>
              <span className="text-xs font-medium text-blue-400">Edit</span>
            </div>
            <p className="mt-1.5 truncate font-display text-base font-semibold text-slate-100">
              {profile.collegeName}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
