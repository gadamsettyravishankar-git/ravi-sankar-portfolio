import { ArrowUpRight, Clock, Code2, Play } from 'lucide-react';
import { useState } from 'react';
import { GITHUB_PROFILE_URL, PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="projects"
      className="border-t border-slate-800/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-400">03. Projects</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Learning builds &amp; ongoing practice.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Focused first-year Python projects designed to strengthen core
              logic, input handling, and Generative AI study workflows.
            </p>
          </div>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200 whitespace-nowrap shrink-0"
          >
            <span>View GitHub Profile</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS_DATA.map((project) => {
            const isInProgress = project.status === 'In Progress';
            const imgFailed = failedImages[project.id];

            return (
              <article
                key={project.id}
                className="glass-surface glass-surface-hover flex flex-col overflow-hidden rounded-2xl"
              >
                {/* 16:9 Project Visual */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-slate-800/80 bg-slate-950">
                  {!imgFailed ? (
                    <img
                      src={project.imagePath}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [project.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/60 to-purple-950/40 p-6 text-center">
                      <Code2
                        className="h-10 w-10 text-blue-400/80"
                        aria-hidden="true"
                      />
                      <span className="mt-2 text-sm font-medium text-slate-300">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-slate-400">
                        {project.categoryLabel}
                      </span>

                      {isInProgress && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-purple-300">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-300/90">
                      {project.subtitle}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {project.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 text-sm text-slate-300">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-7 flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white gradient-btn-primary whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {isInProgress
                          ? 'Inspect Progress & Sandbox'
                          : 'Interactive Preview & Code'}
                      </span>
                    </button>

                    <a
                      href={GITHUB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-slate-400"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
