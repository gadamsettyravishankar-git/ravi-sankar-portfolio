import { Award, BookOpen, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  DEFAULT_CERTIFICATE_SLOTS,
  MILESTONES_DATA,
} from '../data/portfolioData';
import { CertificateSlot } from '../types/portfolio';

const STORAGE_KEY_CERTS = 'ravi_portfolio_certificates_v1';

export default function AchievementsSection() {
  const [certificates, setCertificates] = useState<CertificateSlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTS);
      if (saved) {
        const parsed = JSON.parse(saved) as CertificateSlot[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to defaults if storage unavailable
    }
    return DEFAULT_CERTIFICATE_SLOTS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [issuerInput, setIssuerInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const persistCertificates = (next: CertificateSlot[]) => {
    setCertificates(next);
    try {
      localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newEntry: CertificateSlot = {
      id: `cert-${Date.now()}`,
      title: titleInput.trim(),
      issuer: issuerInput.trim() || 'Issuing Organization',
      date: dateInput.trim() || '2026',
      isPlaceholder: false,
    };

    // Replace the first placeholder if present, or append cleanly
    const placeholderIndex = certificates.findIndex((c) => c.isPlaceholder);
    const updated =
      placeholderIndex >= 0
        ? certificates.map((c, idx) =>
            idx === placeholderIndex ? newEntry : c
          )
        : [...certificates, newEntry];

    persistCertificates(updated);
    setTitleInput('');
    setIssuerInput('');
    setDateInput('');
    setIsAdding(false);
  };

  const handleRemoveEntry = (id: string) => {
    const filtered = certificates.filter((c) => c.id !== id);
    persistCertificates(
      filtered.length > 0 ? filtered : DEFAULT_CERTIFICATE_SLOTS
    );
  };

  const handleResetPlaceholders = () => {
    persistCertificates(DEFAULT_CERTIFICATE_SLOTS);
    setIsAdding(false);
  };

  return (
    <section
      id="achievements"
      className="border-t border-slate-800/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400">
            04. Achievements &amp; Milestones
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Honest learning milestones &amp; upcoming credentials.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Documenting genuine first-year progress without fabricated awards—plus
            dedicated placeholder slots ready for verified certificates as I
            complete them.
          </p>
        </div>

        {/* Learning Milestones Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {MILESTONES_DATA.map((milestone) => (
            <article
              key={milestone.id}
              className="glass-surface rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium text-blue-300">
                <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{milestone.period}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {milestone.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {milestone.description}
              </p>
            </article>
          ))}
        </div>

        {/* Future Certificates Placeholder Area */}
        <div className="mt-12 glass-surface rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Future Certificates &amp; Credentials
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Reserved slots for verified coursework certificates, workshops,
                or hackathon recognitions earned during B.Tech.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleResetPlaceholders}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Slots</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAdding((prev) => !prev)}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white gradient-btn-primary whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isAdding ? 'Close Form' : 'Add Earned Certificate'}</span>
              </button>
            </div>
          </div>

          {isAdding && (
            <form
              onSubmit={handleAddCertificate}
              className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5 sm:grid-cols-3"
            >
              <div>
                <label
                  htmlFor="cert-title"
                  className="block text-xs font-medium text-slate-300"
                >
                  Certificate Title
                </label>
                <input
                  id="cert-title"
                  type="text"
                  required
                  placeholder="e.g., CS50P Python Certificate"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="cert-issuer"
                  className="block text-xs font-medium text-slate-300"
                >
                  Issuing Organization
                </label>
                <input
                  id="cert-issuer"
                  type="text"
                  placeholder="e.g., Coursera / University"
                  value={issuerInput}
                  onChange={(e) => setIssuerInput(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div>
                  <label
                    htmlFor="cert-date"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Completion Date
                  </label>
                  <input
                    id="cert-date"
                    type="text"
                    placeholder="e.g., Dec 2026"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-white gradient-btn-primary"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {certificates.map((slot) => (
              <div
                key={slot.id}
                className={`flex flex-col justify-between rounded-xl border p-5 ${
                  slot.isPlaceholder
                    ? 'border-dashed border-slate-700/90 bg-slate-950/40'
                    : 'border-blue-500/30 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Award
                      className={`h-5 w-5 shrink-0 ${
                        slot.isPlaceholder ? 'text-slate-500' : 'text-blue-400'
                      }`}
                      aria-hidden="true"
                    />
                    {!slot.isPlaceholder && (
                      <button
                        type="button"
                        aria-label={`Remove ${slot.title}`}
                        onClick={() => handleRemoveEntry(slot.id)}
                        className="text-slate-500 hover:text-slate-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <h4 className="mt-3 font-display text-base font-semibold text-white">
                    {slot.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">{slot.issuer}</p>
                </div>

                <p className="mt-4 border-t border-slate-800/80 pt-3 font-mono text-xs text-slate-400">
                  {slot.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
