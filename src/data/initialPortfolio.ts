import type { Certification, Education, Experience, PortfolioAll, Profile, Project, Skill } from '../types/api';
import { EXPERIENCE_AMNIL, EXPERIENCE_MATTER, EXPERIENCE_NABIL } from './experienceCopy';

const SKILL_ROWS: { category: string; name: string }[] = [
  { category: 'Frontend', name: 'React' },
  { category: 'Frontend', name: 'TypeScript' },
  { category: 'Frontend', name: 'Vue.js' },
  { category: 'Frontend', name: 'Tailwind CSS' },
  { category: 'Frontend', name: 'Framer Motion' },
  { category: 'Frontend', name: 'Vite' },
  { category: 'Frontend', name: 'HTML5' },
  { category: 'Frontend', name: 'CSS3' },
  { category: 'Backend', name: 'NestJS' },
  { category: 'Backend', name: 'Node.js' },
  { category: 'Backend', name: 'Laravel' },
  { category: 'Backend', name: 'PHP' },
  { category: 'Backend', name: 'Python' },
  { category: 'Backend', name: 'GraphQL' },
  { category: 'Backend', name: 'REST APIs' },
  { category: 'Cloud & DevOps', name: 'AWS' },
  { category: 'Cloud & DevOps', name: 'Terraform' },
  { category: 'Cloud & DevOps', name: 'Docker' },
  { category: 'Cloud & DevOps', name: 'CI/CD' },
  { category: 'Cloud & DevOps', name: 'ECS' },
  { category: 'Cloud & DevOps', name: 'RDS' },
  { category: 'Cloud & DevOps', name: 'S3' },
  { category: 'Cloud & DevOps', name: 'CloudFront' },
  { category: 'Data & APIs', name: 'SQLite' },
  { category: 'Data & APIs', name: 'Prisma' },
  { category: 'Data & APIs', name: 'Redis' },
  { category: 'Data & APIs', name: 'MySQL' },
  { category: 'Data & APIs', name: 'DynamoDB' },
  { category: 'Data & APIs', name: 'JWT' },
  { category: 'Data & APIs', name: 'OAuth2' },
  { category: 'Architecture', name: 'Event-driven architecture' },
  { category: 'Architecture', name: 'CQRS' },
  { category: 'Architecture', name: 'Domain-driven design (DDD)' },
  { category: 'Architecture', name: 'Design patterns' },
  { category: 'Cloud & DevOps', name: 'Lambda' },
  { category: 'Cloud & DevOps', name: 'CloudWatch' },
  { category: 'Cloud & DevOps', name: 'Route53' },
  { category: 'Cloud & DevOps', name: 'IAM' },
  { category: 'Cloud & DevOps', name: 'Cognito' },
  { category: 'Cloud & DevOps', name: 'CodePipeline' },
  { category: 'Cloud & DevOps', name: 'ECR' },
  { category: 'Cloud & DevOps', name: 'SQS' },
  { category: 'Cloud & DevOps', name: 'SNS' },
  { category: 'Cloud & DevOps', name: 'Kubernetes' },
  { category: 'Cloud & DevOps', name: 'Docker Compose' },
  { category: 'Cloud & DevOps', name: 'Nginx reverse proxy hardening' },
  { category: 'Security', name: 'OWASP Top 10' },
  { category: 'Security', name: 'Secure SDLC' },
  { category: 'Security', name: 'Threat modeling' },
  { category: 'Security', name: 'Secrets management' },
  { category: 'Security', name: 'SAST/DAST' },
  { category: 'Data & APIs', name: 'PostgreSQL' },
  { category: 'Data & APIs', name: 'Redis patterns' },
  { category: 'Data & APIs', name: 'Data modeling' },
];

const skills: Skill[] = SKILL_ROWS.map((row, i) => ({
  id: `skill-${i}`,
  category: row.category,
  name: row.name,
  sortOrder: i,
  iconUrl: null,
}));

const profile: Profile = {
  id: 'profile-1',
  name: 'Roshan Shrestha',
  headline: 'Software Engineer',
  tagline: 'Building scalable web applications, APIs, and cloud solutions.',
  shortBio:
    'Experienced Software Engineer with 7+ years delivering banking workflows, remittance platforms, IoT systems, and enterprise web applications, including 15+ BPM automations and 10+ internal-tool consolidations.',
  longBio:
    'Experienced Software Engineer with 7+ years building and scaling mission-critical digital products across fintech, IoT, and SaaS domains. Delivered end-to-end banking solutions including ProcessMaker BPM workflows, cross-border remittance integrations, reconciliation and RPA automation, and enterprise dashboards with secure core-banking API integrations. Built IoT platforms with real-time telemetry pipelines and interactive monitoring dashboards using Node.js (TypeScript), React, AWS AppSync, event-driven architecture, and Terraform-based infrastructure. Strong full-stack background in Laravel, React, Vue.js, Python, and cloud-native engineering, focused on reliability, maintainability, performance, and business impact.',
  avatarUrl: null,
  email: 'roshanshresthapnk@gmail.com',
  linkedInUrl: 'https://linkedin.com/in/roshan-shrestha/',
  githubUrl: 'https://github.com/roshanryzer',
  websiteUrl: 'https://roshan-shrestha.com',
  location: 'Nollamara, WA, Australia',
  yearsExperience: 7,
  projectsCount: 30,
};

const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Australian Computer Society Membership',
    issuer: 'Australian Computer Society (ACS)',
    issuedAt: '2024-01-01',
    url: null,
    credentialId: '261313, 261399, 261312',
    sortOrder: 0,
    logoUrl: null,
  },
];

const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'Curtin University, Bentley Campus – Perth, Western Australia',
    degree: 'Master of Computing (Computer Science)',
    field: 'Computer Science',
    startYear: 2024,
    endYear: 2025,
    description: null,
    sortOrder: 0,
    logoUrl: null,
  },
  {
    id: 'edu-2',
    institution: 'Kantipur City College, Putalisadak – Purbanchal University, Nepal',
    degree: 'Bachelor of Information Technology (BIT)',
    field: null,
    startYear: 2012,
    endYear: 2017,
    description: null,
    sortOrder: 1,
    logoUrl: null,
  },
  {
    id: 'edu-3',
    institution: 'Aishwarya Vidya Niketan, Dhangadhi Kailali – HSEB, Nepal',
    degree: 'Intermediate in Management (+2)',
    field: null,
    startYear: 2010,
    endYear: 2012,
    description: null,
    sortOrder: 2,
    logoUrl: null,
  },
];

const experience: Experience[] = [
  {
    id: 'exp-1',
    company: 'Matter IO Pty Ltd',
    role: 'Software Engineer',
    startDate: '2024-04-22',
    endDate: '2025-07-12',
    current: false,
    description: EXPERIENCE_MATTER,
    sortOrder: 0,
    logoUrl: null,
  },
  {
    id: 'exp-2',
    company: 'Nabil Bank Limited',
    role: 'Senior Web Developer',
    startDate: '2022-02-07',
    endDate: '2024-02-06',
    current: false,
    description: EXPERIENCE_NABIL,
    sortOrder: 1,
    logoUrl: null,
  },
  {
    id: 'exp-3',
    company: 'Amnil Technologies',
    role: 'Senior Web Application Developer',
    startDate: '2017-03-01',
    endDate: '2022-02-28',
    current: false,
    description: EXPERIENCE_AMNIL,
    sortOrder: 2,
    logoUrl: null,
  },
];

type ProjectSeed = {
  title: string;
  description: string;
  url?: string;
  tech: string[];
  featured: boolean;
  sortOrder: number;
};

const PROJECT_SEEDS: ProjectSeed[] = [
  {
    title: 'Capture Smart Bin / Water',
    description:
      'IoT smart waste and water utility platform with sensor ingestion, real-time device monitoring, fill-level analytics, and operational dashboards for planning and field execution. Built on an event-driven AWS stack with Node.js (TypeScript), AppSync GraphQL, React, Terraform, and CI/CD for reliable multi-environment releases.',
    url: '/projects/case-study/matter-iot',
    tech: ['React', 'Node.js', 'TypeScript', 'AWS AppSync', 'GraphQL', 'Terraform', 'AWS', 'MQTT'],
    featured: true,
    sortOrder: 0,
  },
  {
    title: 'IoT platform — real-time APIs & event pipelines',
    description:
      'Scalable backend and event-driven processing for IoT telemetry: AppSync GraphQL APIs for low-latency device data, asynchronous handling of sensor events, alerts, and analytics pipelines on AWS, following API-first and microservice-friendly patterns.',
    tech: ['Node.js', 'TypeScript', 'AWS AppSync', 'GraphQL', 'AWS', 'Event-driven'],
    featured: false,
    sortOrder: 1,
  },
  {
    title: 'Nabil Bank — ProcessMaker BPM & core operations',
    description:
      'Designed and implemented 15+ end-to-end ProcessMaker workflows automating loan lifecycle, debit/credit card issuance, fixed deposit opening, and demat onboarding. The rollout reduced manual handling and improved turnaround time across multiple core banking operations.',
    url: '/projects/case-study/nabil-bpm',
    tech: ['ProcessMaker', 'Laravel', 'MariaDB', 'REST APIs', 'BPMN'],
    featured: true,
    sortOrder: 2,
  },
  {
    title: 'Nabil Bank — NREMIT & cross-border remittance',
    description:
      'Built a Laravel-based cross-border remittance platform so users worldwide can fund Nabil Bank accounts through Visa and Mastercard rails. Integrated secure core-banking APIs for real-time posting, settlement hooks, and reconciliation support.',
    url: 'https://nabilbank.com/',
    tech: ['Laravel', 'React', 'MariaDB', 'REST APIs', 'OAuth2', 'Visa/Mastercard'],
    featured: true,
    sortOrder: 3,
  },
  {
    title: 'Nabil Bank — LAFD & secured lending',
    description:
      'Implemented loan-against-fixed-deposit (LAFD) functionality integrated with core banking services. Enabled real-time eligibility checks, collateral locking, controlled disbursement flows, and auditable lifecycle states aligned with compliance controls.',
    url: 'https://nabilbank.com/',
    tech: ['Laravel', 'MariaDB', 'REST APIs', 'Core banking'],
    featured: false,
    sortOrder: 4,
  },
  {
    title: 'Nabil Bank — reconciliation & RPA automation',
    description:
      'Built Python reconciliation tooling to match internal ledger activity with external gateways including eSewa and Khalti. Implemented Selenium-based RPA for blacklist reports, compliance extracts, and repetitive back-office tasks to reduce manual effort and errors.',
    url: 'https://nabilbank.com/',
    tech: ['Python', 'Selenium', 'MariaDB', 'REST APIs', 'eSewa', 'Khalti'],
    featured: false,
    sortOrder: 5,
  },
  {
    title: 'Nabil Bank — unified operations dashboard',
    description:
      'Led migration of 10+ internal utilities into a unified Laravel + React enterprise dashboard with role-based access control. Consolidation improved operational UX and centralized letter generation, event assets, and internal admin workflows in a single platform.',
    url: 'https://nabilbank.com/',
    tech: ['Laravel', 'React', 'MariaDB', 'RBAC', 'REST APIs'],
    featured: true,
    sortOrder: 6,
  },
  {
    title: 'Machhapuchhre Bank — digital banking portal',
    description:
      'Enterprise digital banking portal and internal tooling: customer-facing channels, workflow-backed operations, and core integrations via Laravel, Vue.js/React, normalized schemas, and secure REST APIs.',
    url: 'https://www.machbank.com/',
    tech: ['Laravel', 'Vue.js', 'React', 'MySQL', 'REST APIs', 'JWT'],
    featured: true,
    sortOrder: 7,
  },
  {
    title: 'Sunrise Bank — corporate & digital services',
    description:
      'Corporate site and digital banking-related services with modular Laravel services, decoupled front ends, and API-first patterns aligned with internal standards and high availability.',
    tech: ['Laravel', 'React', 'MySQL', 'REST APIs', 'Bootstrap'],
    featured: true,
    sortOrder: 8,
  },
  {
    title: 'Ncell — cross-functional workflow automation',
    description:
      "Business process automation for Nepal's leading telecom: workflow-driven backends covering finance, HR, customer service, and technical operations with auditable, cross-functional orchestration.",
    tech: ['Laravel', 'MySQL', 'REST APIs', 'Workflow', 'BPM'],
    featured: false,
    sortOrder: 9,
  },
  {
    title: 'Nagarik News',
    description:
      'National high-traffic news portal with multilingual publishing, journalist CMS, SEO, and AMP—one of 10+ CMS/CRM/SaaS products delivered in the same engineering ecosystem. Built for heavy read load with Laravel stack, caching, query tuning, and decoupled front-end patterns.',
    url: 'https://nagariknews.nagariknetwork.com/',
    tech: ['Laravel', 'MySQL', 'Redis', 'jQuery', 'SEO'],
    featured: true,
    sortOrder: 10,
  },
  {
    title: 'PVN Books',
    description:
      'Multi-vendor eCommerce for books: vendor portals, inventory, orders, and Nepal payment gateways (eSewa, Khalti). Laravel and Vue.js with Firebase-assisted notifications.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'E-Sewa', 'Khalti', 'Firebase'],
    featured: false,
    sortOrder: 11,
  },
  {
    title: 'Kantipur Management HRMS',
    description:
      'HRMS with attendance, payroll, employee lifecycle, and analytics dashboards—Laravel-based internal software with reporting for operations teams.',
    tech: ['Laravel', 'Bootstrap', 'MySQL', 'Chart.js'],
    featured: false,
    sortOrder: 12,
  },
  {
    title: 'South Asia Monitor',
    description:
      'Geopolitical news platform with multilingual content, editorial tools, regional feeds, and scheduling—Laravel and Vue.js with distribution integrations.',
    url: 'https://www.southasiamonitor.org/',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'i18n', 'Mailchimp API'],
    featured: false,
    sortOrder: 13,
  },
];

const projects: Project[] = PROJECT_SEEDS.map((p) => ({
  id: `proj-${p.sortOrder}`,
  title: p.title,
  description: p.description,
  imageUrl: null,
  url: p.url ?? null,
  repoUrl: null,
  tech: p.tech,
  featured: p.featured,
  sortOrder: p.sortOrder,
}));

export const initialPortfolioAll: PortfolioAll = {
  profile,
  skills,
  certifications,
  education,
  experience,
  projects,
};
