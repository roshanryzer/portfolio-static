/**
 * Long-form case study copy keyed by URL slug (`/projects/case-study/:slug`).
 * Complements short `Project.description` used on cards and listings.
 */

export type CaseStudyBlock = {
  title: string;
  body: string;
};

export type CaseStudyExtended = {
  kicker: string;
  lede: string;
  blocks: CaseStudyBlock[];
  outcomes?: string[];
};

const MATTER_IOT: CaseStudyExtended = {
  kicker: 'IoT · AWS · Real-time',
  lede:
    'An end-to-end look at how sensor data, GraphQL at the edge, and event-driven processing come together for smart waste and water operations—where latency, reliability, and operability matter as much as the UI.',
  blocks: [
    {
      title: 'Context',
      body:
        'Field teams and planners needed a single place to see device health, fill levels, and alerts—not a spreadsheet of raw readings. The platform had to scale with more bins and water assets, support intermittent connectivity, and stay auditable for operations reviews.',
    },
    {
      title: 'Architecture',
      body:
        'The stack centered on a typed Node.js (TypeScript) service layer, AWS AppSync (GraphQL) for device- and client-facing APIs, and an event-driven backbone on AWS for ingesting telemetry, fan-out, and downstream analytics. React powered operational dashboards; infrastructure was expressed in Terraform so environments stayed reproducible from dev through production.',
    },
    {
      title: 'What I focused on',
      body:
        'I worked across ingestion patterns, real-time read paths, and failure behavior: making sure sensor streams were handled predictably, that dashboards stayed useful under load, and that deployments were boring—CI/CD, environment parity, and clear ownership of changes across services.',
    },
    {
      title: 'Trade-offs that actually showed up in production',
      body:
        'Pushing more logic to the edge (GraphQL + subscriptions) reduced chatty clients but required crisp schema design and monitoring. Event pipelines gave flexibility for new consumers but needed idempotency and dead-letter discipline. The goal was always the same: operators trust the screen when it is green, and get a clear story when it is not.',
    },
  ],
  outcomes: [
    'Faster feedback loop for field and planning teams on device and fill-level state',
    'Reproducible AWS environments via Terraform; safer multi-env releases with CI/CD',
    'A path to add new consumers to the same telemetry without fork-lifting the core',
  ],
};

const NABIL_BPM: CaseStudyExtended = {
  kicker: 'Banking · BPM · Core integration',
  lede:
    'How a large set of ProcessMaker workflows, Laravel services, and core-banking APIs were used to replace manual handoffs with auditable, repeatable processes—without pretending that “automation” removes the need for domain care.',
  blocks: [
    {
      title: 'Why BPM here',
      body:
        'Core banking work is as much about policy and controls as it is about code. The goal was to encode business steps with the right approval points, data capture, and traceability—so operations could run faster without losing the evidence chain regulators and internal risk teams expect.',
    },
    {
      title: 'What shipped',
      body:
        'I designed and delivered many end-to-end workflows (loan lifecycle, card issuance, fixed deposit and demat journeys, and more) with clear handoffs to core systems. Each flow had to handle exceptions: not every application is clean, and the system had to make the next best action obvious for staff.',
    },
    {
      title: 'Integration reality',
      body:
        'Laravel and MariaDB anchored the application layer, with REST integration into core banking. The hard parts were rarely the happy path—they were reconciling state, handling timeouts, and making sure idempotent retries did not create duplicate financial impact. That is where tests, logging, and operational playbooks mattered as much as the BPMN diagram.',
    },
    {
      title: 'What I would look at next in a similar program',
      body:
        'Measuring cycle time and defect rates per workflow, tightening observability on integration edges, and keeping workflow definitions owned jointly by business and engineering so changes do not sprawl across email and spreadsheets.',
    },
  ],
  outcomes: [
    'Reduced manual handling on high-volume operational journeys',
    'Consistent audit trail from BPM instances through to core posting where applicable',
    'A platform mindset: new operational ideas could start as workflow iterations, not greenfield apps',
  ],
};

const BY_SLUG: Record<string, CaseStudyExtended> = {
  'matter-iot': MATTER_IOT,
  'nabil-bpm': NABIL_BPM,
};

export function getCaseStudyExtended(slug: string): CaseStudyExtended | undefined {
  return BY_SLUG[slug.trim()];
}
