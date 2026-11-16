import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Pencil,
} from 'lucide-react';
import { useState } from 'react';
import {
  DEFAULT_PROFILE_PLACEHOLDERS,
  GITHUB_PROFILE_URL,
} from '../data/portfolioData';
import { ProfilePlaceholders } from '../types/portfolio';

interface ContactSectionProps {
  profile: ProfilePlaceholders;
  onEditPlaceholders: () => void;
}

export default function ContactSection({
  profile,
  onEditPlaceholders,
}: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [composerFeedback, setComposerFeedback] = useState<string | null>(null);

  const isEmailPlaceholder =
    profile.email === DEFAULT_PROFILE_PLACEHOLDERS.email;
  const isLinkedinPlaceholder =
    profile.linkedinUrl === DEFAULT_PROFILE_PLACEHOLDERS.linkedinUrl;

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => {
        setCopiedField((prev) => (prev === key ? null : prev));
      }, 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleCopyFormattedMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = [
      `To: Ravi Sankar (${profile.email})`,
      `From: ${senderName.trim() || 'Portfolio Visitor'}`,
      `Subject: ${subject.trim() || 'Connecting from your portfolio'}`,
      '',
      message.trim() || 'Hello Ravi, I visited your portfolio and would like to connect.',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setComposerFeedback(
        'Message formatted and copied to clipboard. Ready to paste into your email client.'
      );
      setTimeout(() => setComposerFeedback(null), 4000);
    } catch {
      setComposerFeedback(
        'Unable to access clipboard automatically. Please copy your message manually.'
      );
    }
  };

  const mailtoHref = !isEmailPlaceholder
    ? `mailto:${encodeURIComponent(profile.email)}?subject=${encodeURIComponent(
        subject.trim() || 'Connecting via Portfolio'
      )}&body=${encodeURIComponent(
        `Hi Ravi,\n\n${message.trim()}\n\n— ${senderName.trim() || 'Visitor'}`
      )}`
    : undefined;

  return (
    <section
      id="contact"
      className="border-t border-slate-800/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400">05. Contact</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Connect &amp; collaborate.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Open to connecting with fellow B.Tech Computer Science students,
            mentors, and developers building in Python and Artificial
            Intelligence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Links & Editable Placeholders */}
          <div className="space-y-4 lg:col-span-5">
            {/* Verified GitHub Profile */}
            <div className="glass-surface rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      GitHub
                    </h3>
                    <p className="text-xs text-slate-400">Verified Profile</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('github', GITHUB_PROFILE_URL)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/50 hover:text-white"
                >
                  {copiedField === 'github' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-blue-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm font-mono text-blue-300 transition-colors hover:border-blue-400/40 hover:text-blue-200"
              >
                <span className="truncate">
                  github.com/gadamsettyravishankar-git
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Email Placeholder */}
            <div className="glass-surface rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      Email
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isEmailPlaceholder
                        ? 'Editable Placeholder'
                        : 'Configured Address'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onEditPlaceholders}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/50 hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', profile.email)}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/50 hover:text-white"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-3.5 w-3.5 text-blue-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 truncate rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 font-mono text-sm text-slate-200">
                {profile.email}
              </p>
            </div>

            {/* LinkedIn Placeholder */}
            <div className="glass-surface rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      LinkedIn
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isLinkedinPlaceholder
                        ? 'Editable Placeholder'
                        : 'Configured Profile'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onEditPlaceholders}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/50 hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('linkedin', profile.linkedinUrl)}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/50 hover:text-white"
                  >
                    {copiedField === 'linkedin' ? (
                      <Check className="h-3.5 w-3.5 text-blue-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === 'linkedin' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 truncate rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 font-mono text-sm text-slate-200">
                {profile.linkedinUrl}
              </p>
            </div>
          </div>

          {/* Right Column: Functional Message Draft Composer */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleCopyFormattedMessage}
              className="glass-surface flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Draft a Message
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Compose an inquiry to copy directly to your clipboard or launch
                  your email client once an email address is added.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Alex Verma"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Python / AI Study Collaboration"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full resize-y rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {composerFeedback && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-medium text-blue-200"
                  >
                    {composerFeedback}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-800/80 pt-5">
                {mailtoHref && (
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-200 hover:border-blue-400/50 hover:text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Open Email App</span>
                  </a>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold text-white gradient-btn-primary"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>Copy Formatted Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
