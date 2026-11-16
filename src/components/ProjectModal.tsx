import { CheckCircle2, Circle, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_PROFILE_URL } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

interface SubjectRow {
  id: number;
  name: string;
  score: string;
}

function getLetterGrade(avg: number): string {
  if (avg >= 90) return 'A+';
  if (avg >= 80) return 'A';
  if (avg >= 70) return 'B';
  if (avg >= 60) return 'C';
  if (avg >= 50) return 'D';
  return 'F';
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Grade Calculator Interactive Preview State
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { id: 1, name: 'Programming in Python', score: '86' },
    { id: 2, name: 'Mathematics I', score: '82' },
    { id: 3, name: 'Web Foundations', score: '90' },
  ]);

  // Basic Calculator Interactive Preview State
  const [numA, setNumA] = useState('24');
  const [numB, setNumB] = useState('6');
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+');

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const validScores = subjects
    .map((s) => Number(s.score))
    .filter((n) => !Number.isNaN(n) && n >= 0 && n <= 100);

  const averageScore =
    validScores.length > 0
      ? validScores.reduce((acc, val) => acc + val, 0) / validScores.length
      : 0;
  const letterGrade =
    validScores.length > 0 ? getLetterGrade(averageScore) : '—';

  const computeCalcResult = (): string => {
    const a = Number(numA);
    const b = Number(numB);
    if (Number.isNaN(a) || Number.isNaN(b)) return 'Enter valid numbers';
    if (operator === '+') return `${a + b}`;
    if (operator === '-') return `${a - b}`;
    if (operator === '*') return `${a * b}`;
    if (operator === '/') {
      if (b === 0) return 'ZeroDivisionError: Cannot divide by zero';
      return `${Number((a / b).toFixed(4))}`;
    }
    return '';
  };

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Subject ${prev.length + 1}`,
        score: '75',
      },
    ]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <p className="text-xs font-medium text-blue-300">
              {project.categoryLabel}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 font-display text-2xl font-bold text-white"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
          </div>

          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            {project.description}
          </p>

          {/* Progress Checklist if In Progress */}
          {project.progressChecklist && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="font-display text-sm font-semibold text-white">
                Current Build Milestones
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm">
                {project.progressChecklist.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    {item.done ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-blue-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="h-4 w-4 shrink-0 text-slate-500"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        item.done ? 'text-slate-200' : 'text-slate-400'
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Logic Playground */}
          {project.id === 'grade-calculator' ? (
            <div className="rounded-xl border border-blue-500/25 bg-slate-950/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">
                    Interactive Logic Preview
                  </h4>
                  <p className="text-xs text-slate-400">
                    Test the grade calculation rules directly in the browser
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSubject}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add Subject</span>
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center gap-2.5"
                  >
                    <input
                      type="text"
                      aria-label="Subject name"
                      value={subject.name}
                      onChange={(e) =>
                        setSubjects((prev) =>
                          prev.map((row) =>
                            row.id === subject.id
                              ? { ...row, name: e.target.value }
                              : row
                          )
                        )
                      }
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 focus:border-blue-400 focus:outline-none"
                    />
                    <input
                      type="number"
                      aria-label="Score out of 100"
                      min={0}
                      max={100}
                      value={subject.score}
                      onChange={(e) =>
                        setSubjects((prev) =>
                          prev.map((row) =>
                            row.id === subject.id
                              ? { ...row, score: e.target.value }
                              : row
                          )
                        )
                      }
                      className="w-24 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-2 font-mono text-sm tabular-nums text-white focus:border-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${subject.name}`}
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length <= 1}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Subjects</p>
                  <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">
                    {validScores.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Average</p>
                  <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-blue-300">
                    {averageScore.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Letter Grade</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-purple-300">
                    {letterGrade}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-purple-500/25 bg-slate-950/70 p-5">
              <h4 className="font-display text-sm font-semibold text-white">
                Arithmetic Logic Sandbox
              </h4>
              <p className="mt-0.5 text-xs text-slate-400">
                Preview the current Python operator &amp; zero-division guard
                behavior
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  aria-label="First operand"
                  value={numA}
                  onChange={(e) => setNumA(e.target.value)}
                  className="w-28 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-sm tabular-nums text-white focus:border-blue-400 focus:outline-none"
                />

                <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 p-1">
                  {(['+', '-', '*', '/'] as const).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setOperator(op)}
                      className={`h-8 w-8 rounded-md font-mono text-sm font-semibold transition-colors ${
                        operator === op
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  aria-label="Second operand"
                  value={numB}
                  onChange={(e) => setNumB(e.target.value)}
                  className="w-28 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-sm tabular-nums text-white focus:border-blue-400 focus:outline-none"
                />

                <span className="font-mono text-slate-400">=</span>

                <div className="rounded-lg border border-slate-800 bg-slate-900/90 px-3.5 py-2 font-mono text-sm tabular-nums text-blue-300">
                  {computeCalcResult()}
                </div>
              </div>
            </div>
          )}

          {/* Python Code Structure */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Python Core Function Structure
            </h4>
            <pre className="mt-2.5 overflow-x-auto rounded-xl border border-slate-800 bg-[#040712] p-4 font-mono text-xs leading-relaxed text-slate-200">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-800 pt-5">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:text-white"
            >
              Visit GitHub Profile
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[42px] items-center rounded-lg px-4 py-2 text-xs font-semibold text-white gradient-btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
