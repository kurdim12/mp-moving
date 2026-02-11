export interface PortfolioItem {
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  initials: string;
  challenge: string;
  process: string;
  outcome: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  accentColor: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: "Baseform",
    category: "Partnership & Co-Building",
    year: "2023",
    tagline: "From concept to company in 14 months.",
    description: "Co-founded construction tech platform connecting project teams, scheduling, and real-time field data into one system.",
    initials: "BF",
    challenge: "The construction industry ran on fragmented tools — spreadsheets, WhatsApp, phone calls. No single source of truth across teams, subcontractors, and clients.",
    process: "Started with 6 weeks of field research across 12 construction sites. Built an MVP focused on the single biggest pain point: real-time project visibility. Iterated weekly with site managers. Hired the first 4 engineers together.",
    outcome: "Built and co-own the platform from zero. Now serving 40+ construction firms with a 12-person team. Revenue-positive within the first year.",
    stats: [
      { label: "Firms onboarded", value: "40+" },
      { label: "Team size", value: "12" },
      { label: "Time to revenue", value: "11mo" },
    ],
    tags: ["Co-Founded", "Equity Partnership", "Product & Engineering"],
    accentColor: "from-stone-800 to-stone-600",
  },
  {
    name: "Meridian",
    category: "Brand & Digital Identity",
    year: "2024",
    tagline: "Giving climate tech a voice that closes rounds.",
    description: "End-to-end brand system and digital presence for a climate infrastructure company preparing for Series B.",
    initials: "ME",
    challenge: "Deep technology, no clear brand voice. Needed to speak credibly to both institutional investors and enterprise procurement teams.",
    process: "Ran stakeholder interviews with the founding team, investors, and three target customers. Distilled the brand into a clear positioning framework. Built the visual system and website simultaneously — shipping the full identity in 10 weeks.",
    outcome: "Complete brand identity, messaging framework, and digital platform. Contributed to closing their Series B within 6 months of launch.",
    stats: [
      { label: "Series B closed", value: "6mo" },
      { label: "Brand touchpoints", value: "24" },
    ],
    tags: ["Brand System", "Website", "Messaging Framework"],
    accentColor: "from-emerald-900 to-emerald-700",
  },
  {
    name: "Arcline",
    category: "Products & Platforms",
    year: "2023",
    tagline: "Replacing spreadsheets with real-time ops.",
    description: "Custom operations platform connecting field teams, logistics, and real-time reporting across distributed locations.",
    initials: "AR",
    challenge: "200+ field workers reporting through spreadsheets and phone calls. Zero visibility for management, constant data lag, missed deadlines.",
    process: "Shadowed field teams for two weeks to map real workflows. Designed the system around how people actually work — not how management assumed they did. Rolled out in phases, one region at a time, with on-site training.",
    outcome: "Designed and built a custom ops platform adopted by 200+ field workers. Reduced reporting time by 70% and eliminated manual data reconciliation.",
    stats: [
      { label: "Field workers", value: "200+" },
      { label: "Reporting time", value: "−70%" },
    ],
    tags: ["Platform Build", "UX Design", "System Integration"],
    accentColor: "from-slate-800 to-slate-600",
  },
  {
    name: "Nørd Studio",
    category: "Strategy & Positioning",
    year: "2024",
    tagline: "Repositioned. Repriced. Respected.",
    description: "Strategic repositioning and go-to-market framework for a Nordic design collective punching below their weight.",
    initials: "NØ",
    challenge: "Talented collective winning projects through network alone, not strategy. Inconsistent positioning, underpriced, competing against juniors.",
    process: "Audited their last 20 projects for patterns. Found that their strongest work came from a specific niche they'd never named. Built a positioning framework around it, restructured their pricing, and rewrote every client-facing asset.",
    outcome: "Repositioned as a premium product design studio. New pricing model increased average project value by 3x. Pipeline shifted to inbound.",
    stats: [
      { label: "Avg. project value", value: "3×" },
      { label: "Pipeline shift", value: "Inbound" },
    ],
    tags: ["Strategy", "GTM", "Positioning"],
    accentColor: "from-blue-900 to-blue-700",
  },
  {
    name: "Verra Health",
    category: "AI & Automation",
    year: "2024",
    tagline: "AI that actually reduces wait times.",
    description: "Intelligent intake and triage system processing thousands of patients monthly across 12 clinics.",
    initials: "VH",
    challenge: "Manual patient intake created bottlenecks, misrouted cases, and frustrated both patients and staff across 12 clinics.",
    process: "Mapped the entire intake flow across three clinics. Identified that 60% of triage decisions followed predictable patterns. Built an AI layer that handles the routine, escalates the exceptions, and learns from corrections.",
    outcome: "AI-powered triage system now processing 2,000+ patients monthly. Wait times cut by 40%, staff redirected to higher-value care.",
    stats: [
      { label: "Patients/month", value: "2K+" },
      { label: "Wait time reduction", value: "40%" },
      { label: "Clinics", value: "12" },
    ],
    tags: ["AI Integration", "Healthcare", "Workflow Automation"],
    accentColor: "from-teal-900 to-teal-700",
  },
  {
    name: "Halcyon Capital",
    category: "Brand & Digital Identity",
    year: "2023",
    tagline: "Institutional credibility from day one.",
    description: "Visual identity and secure investor portal for an emerging markets private equity fund entering its first close.",
    initials: "HC",
    challenge: "A new PE fund needed to project institutional credibility while standing apart from legacy firms — before having a track record.",
    process: "Studied the visual language of top-tier PE firms. Designed a brand that felt established without being derivative. Built a secure portal with real-time fund reporting — the kind of infrastructure that signals seriousness to LPs.",
    outcome: "Premium brand identity and secure investor portal. Helped attract $40M in first-close commitments from institutional LPs.",
    stats: [
      { label: "First close", value: "$40M" },
    ],
    tags: ["Visual Identity", "Investor Portal", "Finance"],
    accentColor: "from-amber-900 to-amber-700",
  },
  {
    name: "Kindra",
    category: "Products & Platforms",
    year: "2024",
    tagline: "Owned community, owned data.",
    description: "Membership platform and community tools for a wellness brand scaling across Europe.",
    initials: "KI",
    challenge: "Growing wellness brand with fragmented community across Instagram and Facebook groups. No owned platform, no data, no retention strategy.",
    process: "Interviewed 40 community members to understand what kept them engaged. Built a platform that replicated the best parts of social — without the algorithm. Launched with a migration plan that moved 3,000 members in the first week.",
    outcome: "Built membership platform with integrated community tools. 8,000+ active members within 6 months. Churn cut in half.",
    stats: [
      { label: "Active members", value: "8K+" },
      { label: "Time to scale", value: "6mo" },
    ],
    tags: ["Platform", "Community", "Membership"],
    accentColor: "from-rose-900 to-rose-700",
  },
  {
    name: "Terrace",
    category: "Strategy & Positioning",
    year: "2023",
    tagline: "Validated before built.",
    description: "Product-market fit validation and launch strategy for a proptech startup before writing a single line of code.",
    initials: "TE",
    challenge: "Pre-seed proptech with a strong thesis but untested assumptions. Investors wanted validation, founders wanted to build. We bridged both.",
    process: "Ran 60+ user interviews across four customer segments. Tested willingness to pay through landing page experiments. Mapped competitive positioning and identified a gap no one was serving. Delivered a v1 roadmap backed by data, not instinct.",
    outcome: "Validated core hypothesis through 60+ user interviews. Refined positioning led to successful pre-seed raise and a clear v1 roadmap.",
    stats: [
      { label: "User interviews", value: "60+" },
      { label: "Pre-seed", value: "Raised" },
    ],
    tags: ["PMF Validation", "User Research", "Launch Strategy"],
    accentColor: "from-violet-900 to-violet-700",
  },
  {
    name: "Caspian",
    category: "AI & Automation",
    year: "2024",
    tagline: "Compliance on autopilot.",
    description: "Internal knowledge engine automating compliance workflows for a regulated fintech firm.",
    initials: "CA",
    challenge: "Compliance team spending 30+ hours weekly on manual document review, regulatory cross-checks, and audit preparation.",
    process: "Embedded with the compliance team for three weeks. Catalogued every recurring task. Built a knowledge engine that ingests regulatory updates, cross-references existing policies, and flags gaps — turning a reactive team into a proactive one.",
    outcome: "Knowledge engine handles 80% of routine compliance checks. Team redirected from data entry to strategic risk assessment.",
    stats: [
      { label: "Automated checks", value: "80%" },
      { label: "Hours saved/week", value: "30+" },
    ],
    tags: ["AI", "Compliance", "Knowledge Management"],
    accentColor: "from-cyan-900 to-cyan-700",
  },
  {
    name: "Outline Labs",
    category: "Partnership & Co-Building",
    year: "2024",
    tagline: "Built together. Growing independently.",
    description: "Joint venture building developer tools. Equity partnership with shared roadmap and go-to-market.",
    initials: "OL",
    challenge: "Technical founders with a strong product vision but no go-to-market muscle, brand presence, or distribution strategy.",
    process: "Joined as co-builders with equity. Defined the brand, built the marketing site, designed the onboarding flow, and ran the first acquisition experiments. Stayed involved through the first 500 users, then handed over a playbook.",
    outcome: "Joint venture with shared equity. Built brand, GTM engine, and acquired first 500 users. Now growing independently with clear momentum.",
    stats: [
      { label: "Users acquired", value: "500+" },
      { label: "Partnership", value: "Equity" },
    ],
    tags: ["Co-Founded", "DevTools", "GTM"],
    accentColor: "from-indigo-900 to-indigo-700",
  },
];

export const categories = [
  "All",
  "Strategy & Positioning",
  "Brand & Digital Identity",
  "Products & Platforms",
  "AI & Automation",
  "Partnership & Co-Building",
];
