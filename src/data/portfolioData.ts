import {
  CertificateSlot,
  MilestoneItem,
  ProfilePlaceholders,
  ProjectItem,
  SkillItem,
} from '../types/portfolio';

export const GITHUB_PROFILE_URL = 'https://github.com/gadamsettyravishankar-git';

export const DEFAULT_PROFILE_PLACEHOLDERS: ProfilePlaceholders = {
  collegeName: 'Your College / University Name',
  registrationNumber: 'Your Registration Number',
  email: 'your.email@example.com',
  linkedinUrl: 'https://linkedin.com/in/your-profile',
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    level: 'Beginner',
    category: 'programming',
    progressPercent: 35,
    summary:
      'Building core programming fluency with clean syntax, control structures, and modular functions for console applications.',
    focusAreas: [
      'Variables, data types & type casting',
      'Conditionals & loop control flow',
      'Functions & basic input validation',
    ],
  },
  {
    id: 'html',
    name: 'HTML',
    level: 'Foundational',
    category: 'web',
    progressPercent: 55,
    summary:
      'Structuring semantic, accessible web documents with clean hierarchy, forms, and clear markup standards.',
    focusAreas: [
      'Semantic layout landmarks & headings',
      'Accessible forms & input attributes',
      'Document structure & metadata',
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    level: 'Foundational',
    category: 'web',
    progressPercent: 50,
    summary:
      'Designing responsive interfaces with Flexbox, CSS Grid, typography spacing, and visual hierarchy across screen sizes.',
    focusAreas: [
      'Flexbox & CSS Grid layout systems',
      'Responsive breakpoints & mobile framing',
      'Color contrast, spacing & subtle transitions',
    ],
  },
  {
    id: 'genai',
    name: 'Generative AI',
    level: 'Basic',
    category: 'ai',
    progressPercent: 25,
    summary:
      'Exploring foundational Generative AI concepts, prompt design patterns, and how LLM workflows assist software learning.',
    focusAreas: [
      'Structured prompt engineering basics',
      'Understanding LLM capabilities & limits',
      'AI-assisted problem decomposition',
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'grade-calculator',
    title: 'Student Grade Calculator',
    subtitle: 'Python & Generative AI Learning Project',
    status: 'Completed Learning Build',
    categoryLabel: 'Python · GenAI Study · CLI Logic',
    description:
      'A foundational Python learning project built while practicing conditional branching, arithmetic averaging, and structured prompt-assisted code review with Generative AI.',
    imagePath: '/src/assets/images/project_grade_calculator_1794800372683.jpg',
    imageAlt:
      'Isometric glass cube visualization representing student grade calculation logic',
    highlights: [
      'Accepts multi-subject marks and validates 0–100 score boundaries',
      'Computes total score, percentage average, and letter grade band',
      'Explores Generative AI workflows for test-case edge checking',
    ],
    codeSnippet: `def calculate_grade(scores: list[float]) -> tuple[float, str]:
    if not scores:
        raise ValueError("At least one subject score is required.")
    average = sum(scores) / len(scores)
    if average >= 90:
        grade = "A+"
    elif average >= 80:
        grade = "A"
    elif average >= 70:
        grade = "B"
    elif average >= 60:
        grade = "C"
    elif average >= 50:
        grade = "D"
    else:
        grade = "F"
    return round(average, 2), grade`,
  },
  {
    id: 'python-calculator',
    title: 'Python Basic Calculator',
    subtitle: 'Core Arithmetic & Input Handling',
    status: 'In Progress',
    categoryLabel: 'Python · CLI Application · In Progress',
    description:
      'An ongoing first-year Python practice project focused on modular arithmetic functions, error-safe user input loops, and clean division-by-zero handling.',
    imagePath: '/src/assets/images/project_python_calculator_1794800373768.jpg',
    imageAlt:
      'Translucent geometric glass blocks representing arithmetic operations in Python',
    highlights: [
      'Separating addition, subtraction, multiplication, and division into pure functions',
      'Guarding against zero-division and non-numeric console inputs',
      'Iterating toward a continuous menu-driven CLI session loop',
    ],
    progressChecklist: [
      { label: 'Core arithmetic operator functions', done: true },
      { label: 'Division-by-zero guard & error message', done: true },
      { label: 'Input validation for invalid numbers', done: false },
      { label: 'Continuous multi-calculation loop', done: false },
    ],
    codeSnippet: `def operate(a: float, b: float, op: str) -> float:
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    if op == "/":
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero.")
        return a / b
    raise ValueError(f"Unsupported operator: {op}")`,
  },
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    id: 'btech-start',
    period: 'Year 1 · Academic Foundation',
    title: 'Started B.Tech in Computer Science',
    description:
      'Began undergraduate engineering studies with a focus on computational thinking, problem solving, and core computer science fundamentals.',
  },
  {
    id: 'web-basics',
    period: 'Milestone · Web Foundations',
    title: 'Learned Semantic HTML & Responsive CSS',
    description:
      'Practiced structuring accessible web pages and styling clean responsive layouts using modern CSS Flexbox and Grid.',
  },
  {
    id: 'python-practice',
    period: 'Milestone · Programming Logic',
    title: 'Started Building Python Console Projects',
    description:
      'Applied Python basics—variables, conditionals, loops, and functions—to build the Student Grade Calculator and begin the Basic Calculator.',
  },
  {
    id: 'genai-study',
    period: 'Milestone · AI Exploration',
    title: 'Exploring Generative AI & ML Pathways',
    description:
      'Studying introductory Generative AI concepts and learning how AI tools complement structured software engineering workflows.',
  },
];

export const DEFAULT_CERTIFICATE_SLOTS: CertificateSlot[] = [
  {
    id: 'slot-1',
    title: 'Upcoming Python Foundation Certificate',
    issuer: 'Placeholder — Verified Coursework Credential',
    date: 'Pending Completion',
    isPlaceholder: true,
  },
  {
    id: 'slot-2',
    title: 'Upcoming Generative AI & ML Certificate',
    issuer: 'Placeholder — Future Technical Certification',
    date: 'Planned',
    isPlaceholder: true,
  },
  {
    id: 'slot-3',
    title: 'Future Hackathon or Project Recognition',
    issuer: 'Placeholder — Verified Achievement Slot',
    date: 'To Be Updated',
    isPlaceholder: true,
  },
];
