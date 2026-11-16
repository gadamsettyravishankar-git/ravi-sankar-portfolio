export type SkillCategory = 'all' | 'programming' | 'web' | 'ai';

export interface ProfilePlaceholders {
  collegeName: string;
  registrationNumber: string;
  email: string;
  linkedinUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  category: Exclude<SkillCategory, 'all'>;
  progressPercent: number;
  summary: string;
  focusAreas: string[];
}

export interface ProjectItem {
  id: 'grade-calculator' | 'python-calculator';
  title: string;
  subtitle: string;
  status: 'Completed Learning Build' | 'In Progress';
  categoryLabel: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  highlights: string[];
  codeSnippet: string;
  progressChecklist?: { label: string; done: boolean }[];
}

export interface MilestoneItem {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface CertificateSlot {
  id: string;
  title: string;
  issuer: string;
  date: string;
  isPlaceholder: boolean;
}
