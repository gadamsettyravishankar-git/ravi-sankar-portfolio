import { Check, Pencil, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProfilePlaceholders } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfilePlaceholders;
  onUpdateProfile: (updated: ProfilePlaceholders) => void;
  onResetProfile: () => void;
  isEditingExternal: boolean;
  onSetEditingExternal: (editing: boolean) => void;
}

export default function AboutSection({
  profile,
  onUpdateProfile,
  onResetProfile,
  isEditingExternal,
  onSetEditingExternal,
}: AboutSectionProps) {
  const [draft, setDraft] = useState<ProfilePlaceholders>(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      collegeName: draft.collegeName.trim() || 'Your College / University Name',
      registrationNumber:
        draft.registrationNumber.trim() || 'Your Registration Number',
      email: draft.email.trim() || 'your.email@example.com',
      linkedinUrl:
        draft.linkedinUrl.trim() || 'https://linkedin.com/in/your-profile',
    });
    onSetEditingExternal(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    onSetEditingExternal(false);
  };

  return (
    <section
      id="about"
      className="border-t border-slate-800/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400">01. About Me</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            First-year curiosity, engineered into daily practice.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Education, Interests & Career Goals */}
          <div className="space-y-6 lg:col-span-7">
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">
                Education &amp; Technical Interests
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                I am currently in my first year of a{' '}
                <span className="font-medium text-white">
                  B.Tech in Computer Science
                </span>
                . My academic journey is centered on building a dependable
                engineering foundation—starting with structured problem solving,
                clean Python logic, and semantic web interfaces.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                I am deeply interested in{' '}
                <span className="font-medium text-blue-300">Python</span>,{' '}
                <span className="font-medium text-purple-300">
                  Artificial Intelligence
                </span>
                ,{' '}
                <span className="font-medium text-purple-300">
                  Machine Learning
                </span>
                , and{' '}
                <span className="font-medium text-blue-300">
                  Web Development
                </span>
                . Rather than rushing past fundamentals, I focus on understanding
                how code works under the hood through small, complete learning
                builds.
              </p>
            </div>

            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">
                Career Goals
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                My long-term goal is to grow into an{' '}
                <span className="font-medium text-white">AI Engineer</span> who
                can bridge machine learning models with reliable, user-friendly
                software products. Over the coming semesters, I plan to deepen my
                data structures knowledge, explore applied ML libraries in Python,
                and contribute consistent open-source projects on GitHub.
              </p>
            </div>
          </div>

          {/* Right Column: Editable Academic & Profile Placeholders */}
          <div className="lg:col-span-5">
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Academic Details
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Editable placeholders for missing personal info
                  </p>
                </div>

                {!isEditingExternal && (
                  <button
                    type="button"
                    onClick={() => onSetEditingExternal(true)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit Placeholders</span>
                  </button>
                )}
              </div>

              {isEditingExternal ? (
                <form onSubmit={handleSave} className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="college-input"
                      className="block text-xs font-medium text-slate-300"
                    >
                      College / University Name
                    </label>
                    <input
                      id="college-input"
                      type="text"
                      value={draft.collegeName}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          collegeName: e.target.value,
                        }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reg-input"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Registration / Roll Number
                    </label>
                    <input
                      id="reg-input"
                      type="text"
                      value={draft.registrationNumber}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          registrationNumber: e.target.value,
                        }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-input"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Contact Email Placeholder
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={draft.email}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="linkedin-input"
                      className="block text-xs font-medium text-slate-300"
                    >
                      LinkedIn Profile URL
                    </label>
                    <input
                      id="linkedin-input"
                      type="text"
                      value={draft.linkedinUrl}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          linkedinUrl: e.target.value,
                        }))
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onResetProfile();
                        onSetEditingExternal(false);
                      }}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Reset</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Cancel</span>
                      </button>
                      <button
                        type="submit"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white gradient-btn-primary"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <dl className="mt-5 divide-y divide-slate-800/70 text-sm">
                  <div className="py-3 first:pt-0">
                    <dt className="text-xs text-slate-400">Student Name</dt>
                    <dd className="mt-1 font-medium text-white">Ravi Sankar</dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-xs text-slate-400">Degree &amp; Year</dt>
                    <dd className="mt-1 font-medium text-white">
                      B.Tech Computer Science · 1st Year
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-xs text-slate-400">
                      College / University
                    </dt>
                    <dd className="mt-1 font-medium text-slate-200">
                      {profile.collegeName}
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-xs text-slate-400">
                      Registration Number
                    </dt>
                    <dd className="mt-1 font-mono text-slate-200">
                      {profile.registrationNumber}
                    </dd>
                  </div>
                  <div className="py-3 last:pb-0">
                    <dt className="text-xs text-slate-400">Primary Interests</dt>
                    <dd className="mt-1 text-slate-300">
                      Python · AI &amp; ML · Web Development
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
