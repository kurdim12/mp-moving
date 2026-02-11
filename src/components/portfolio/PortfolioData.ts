export interface ModuleItem {
  name: string;
  description: string;
  deliverable: string;
}

export interface PortfolioItem {
  name: string;
  category: string;
  year: string;
  tagline: string;
  descriptor: string;
  microSignal?: string;
  initials: string;
  // Page 1 — Overview
  context: string;
  tags: string[];
  // Page 2 — What We Built
  modules: ModuleItem[];
  // Page 3 — Outcome
  impactStatements: string[];
  deliverables: string[];
  founderQuote?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: "Baseform",
    category: "Partnership & Co-Building",
    year: "2023",
    tagline: "From concept to company in 14 months.",
    descriptor: "Co-Build · Construction Tech",
    microSignal: "Revenue in 11mo",
    initials: "BF",
    context:
      "The construction industry ran on fragmented tools — spreadsheets, WhatsApp, phone calls. We co-founded Baseform to build a single source of truth for project teams, scheduling, and real-time field data.",
    tags: ["Co-Founded", "Equity Partnership", "Product & Engineering"],
    modules: [
      { name: "Product Platform", description: "End-to-end project management for construction teams with real-time field visibility.", deliverable: "Full-stack platform" },
      { name: "Operational Workflows", description: "Automated scheduling, subcontractor coordination, and progress tracking.", deliverable: "Workflow engine" },
      { name: "Architecture & Infra", description: "Scalable multi-tenant system supporting 40+ firms and growing.", deliverable: "Cloud infrastructure" },
    ],
    impactStatements: ["40+ construction firms onboarded", "12-person team built from zero", "Revenue-positive within 11 months"],
    deliverables: ["Full-stack platform", "Mobile field app", "Admin dashboard", "Reporting engine", "Hiring & team build"],
    founderQuote: "They didn't just build the product — they built the company with us.",
  },
  {
    name: "Meridian",
    category: "Brand & Digital Identity",
    year: "2024",
    tagline: "Giving climate tech a voice that closes rounds.",
    descriptor: "Brand System · Climate Tech",
    microSignal: "Series B in 6mo",
    initials: "ME",
    context:
      "Deep technology, no clear brand voice. Meridian needed to speak credibly to both institutional investors and enterprise procurement teams preparing for their Series B.",
    tags: ["Brand System", "Website", "Messaging Framework"],
    modules: [
      { name: "Brand System", description: "Complete visual identity translating complex technology into investor-grade clarity.", deliverable: "Design system" },
      { name: "Messaging Framework", description: "Positioning architecture for investor, enterprise, and public audiences.", deliverable: "Messaging playbook" },
      { name: "Digital Platform", description: "High-conversion website built for fundraise and enterprise pipeline.", deliverable: "Marketing site" },
    ],
    impactStatements: ["Series B closed within 6 months of launch", "24 brand touchpoints delivered", "Enterprise pipeline activated"],
    deliverables: ["Visual identity", "Brand guidelines", "Website", "Pitch deck system", "Messaging framework"],
  },
  {
    name: "Arcline",
    category: "Products & Platforms",
    year: "2023",
    tagline: "Replacing spreadsheets with real-time ops.",
    descriptor: "Product Platform · Operations",
    microSignal: "−70% reporting time",
    initials: "AR",
    context:
      "200+ field workers reporting through spreadsheets and phone calls. Zero visibility for management, constant data lag, missed deadlines across distributed locations.",
    tags: ["Platform Build", "UX Design", "System Integration"],
    modules: [
      { name: "Product Platform", description: "Custom operations platform connecting field teams, logistics, and real-time reporting.", deliverable: "Ops platform" },
      { name: "UX Design", description: "Interface designed around actual field workflows, not management assumptions.", deliverable: "Design system" },
      { name: "System Integration", description: "Connected existing ERP, logistics, and communication tools into one flow.", deliverable: "API layer" },
    ],
    impactStatements: ["Adopted by 200+ field workers", "Reporting time reduced by 70%", "Manual data reconciliation eliminated"],
    deliverables: ["Web platform", "Mobile app", "API integrations", "Training program", "Rollout strategy"],
    founderQuote: "They built for how our people actually work, not how we assumed they did.",
  },
  {
    name: "Nørd Studio",
    category: "Strategy & Positioning",
    year: "2024",
    tagline: "Repositioned. Repriced. Respected.",
    descriptor: "Strategy · Design Collective",
    microSignal: "3× project value",
    initials: "NØ",
    context:
      "Talented Nordic design collective winning projects through network alone. Inconsistent positioning, underpriced, competing against juniors despite doing premium work.",
    tags: ["Strategy", "GTM", "Positioning"],
    modules: [
      { name: "Positioning Framework", description: "Identified their strongest niche from 20 past projects and named it.", deliverable: "Positioning doc" },
      { name: "Pricing Architecture", description: "New value-based pricing model replacing hourly rates.", deliverable: "Pricing model" },
      { name: "Go-to-Market", description: "Rewrote every client-facing asset and rebuilt pipeline strategy.", deliverable: "GTM playbook" },
    ],
    impactStatements: ["Average project value increased 3×", "Pipeline shifted from outbound to inbound", "Positioned as premium product design studio"],
    deliverables: ["Positioning framework", "Pricing model", "Website copy", "Case study templates", "Outreach playbook"],
  },
  {
    name: "Verra Health",
    category: "AI & Automation",
    year: "2024",
    tagline: "AI that actually reduces wait times.",
    descriptor: "AI Automation · Healthcare",
    microSignal: "−40% wait times",
    initials: "VH",
    context:
      "Manual patient intake created bottlenecks and misrouted cases across 12 clinics. Staff frustrated, patients waiting, and no systematic way to triage at scale.",
    tags: ["AI Integration", "Healthcare", "Workflow Automation"],
    modules: [
      { name: "AI Triage Layer", description: "Intelligent intake system handling routine decisions, escalating exceptions.", deliverable: "ML pipeline" },
      { name: "Workflow Automation", description: "Automated patient routing based on symptom patterns and urgency scoring.", deliverable: "Automation engine" },
      { name: "Operational Dashboard", description: "Real-time visibility into triage performance and staff allocation.", deliverable: "Admin dashboard" },
    ],
    impactStatements: ["2,000+ patients processed monthly", "Wait times reduced by 40%", "Staff redirected to higher-value care"],
    deliverables: ["AI triage system", "Patient intake flow", "Admin dashboard", "Integration layer", "Training docs"],
    founderQuote: "First AI project that actually made our staff's lives easier.",
  },
  {
    name: "Halcyon Capital",
    category: "Brand & Digital Identity",
    year: "2023",
    tagline: "Institutional credibility from day one.",
    descriptor: "Brand · Private Equity",
    microSignal: "$40M first close",
    initials: "HC",
    context:
      "A new PE fund needed to project institutional credibility while standing apart from legacy firms — before having a track record to point to.",
    tags: ["Visual Identity", "Investor Portal", "Finance"],
    modules: [
      { name: "Brand System", description: "Visual identity that feels established without being derivative of legacy firms.", deliverable: "Brand guidelines" },
      { name: "Investor Portal", description: "Secure platform with real-time fund reporting and LP communications.", deliverable: "Web application" },
    ],
    impactStatements: ["$40M attracted in first-close commitments", "Institutional LPs converted through brand credibility"],
    deliverables: ["Visual identity", "Brand guidelines", "Investor portal", "Fund reporting dashboard", "LP communications"],
  },
  {
    name: "Kindra",
    category: "Products & Platforms",
    year: "2024",
    tagline: "Owned community, owned data.",
    descriptor: "Platform · Wellness",
    microSignal: "8K+ members",
    initials: "KI",
    context:
      "Growing wellness brand with a fragmented community across Instagram and Facebook groups. No owned platform, no data, no retention strategy — just rented audiences.",
    tags: ["Platform", "Community", "Membership"],
    modules: [
      { name: "Membership Platform", description: "Custom community platform replacing fragmented social media groups.", deliverable: "Web platform" },
      { name: "Community Tools", description: "Discussion, content, and event features designed for retention.", deliverable: "Feature suite" },
      { name: "Migration Strategy", description: "Moved 3,000 members in the first week with a structured onboarding flow.", deliverable: "Migration plan" },
    ],
    impactStatements: ["8,000+ active members within 6 months", "Churn cut in half", "First-party data ownership established"],
    deliverables: ["Membership platform", "Community features", "Mobile experience", "Analytics dashboard", "Migration playbook"],
  },
  {
    name: "Terrace",
    category: "Strategy & Positioning",
    year: "2023",
    tagline: "Validated before built.",
    descriptor: "Strategy · PropTech",
    microSignal: "Pre-seed raised",
    initials: "TE",
    context:
      "Pre-seed proptech with a strong thesis but untested assumptions. Investors wanted validation, founders wanted to build. We bridged both before a line of code was written.",
    tags: ["PMF Validation", "User Research", "Launch Strategy"],
    modules: [
      { name: "User Research", description: "60+ interviews across four customer segments to test core assumptions.", deliverable: "Research report" },
      { name: "Market Validation", description: "Landing page experiments testing willingness to pay and positioning.", deliverable: "Validation data" },
      { name: "Product Roadmap", description: "V1 roadmap backed by data, not instinct — ready for investor review.", deliverable: "Product spec" },
    ],
    impactStatements: ["Core hypothesis validated through 60+ interviews", "Pre-seed raise completed successfully", "Clear v1 roadmap delivered"],
    deliverables: ["Research findings", "Competitive analysis", "Positioning framework", "Product roadmap", "Investor materials"],
  },
  {
    name: "Caspian",
    category: "AI & Automation",
    year: "2024",
    tagline: "Compliance on autopilot.",
    descriptor: "AI · Fintech Compliance",
    microSignal: "80% automated",
    initials: "CA",
    context:
      "Compliance team spending 30+ hours weekly on manual document review, regulatory cross-checks, and audit preparation. Reactive instead of strategic.",
    tags: ["AI", "Compliance", "Knowledge Management"],
    modules: [
      { name: "Knowledge Engine", description: "Ingests regulatory updates, cross-references policies, and flags gaps automatically.", deliverable: "AI engine" },
      { name: "Compliance Automation", description: "Routine checks handled by the system, exceptions escalated to humans.", deliverable: "Automation pipeline" },
      { name: "Audit Preparation", description: "Automated audit trail and documentation generation.", deliverable: "Reporting layer" },
    ],
    impactStatements: ["80% of routine compliance checks automated", "30+ hours saved per week", "Team redirected to strategic risk assessment"],
    deliverables: ["Knowledge engine", "Compliance automation", "Audit tools", "Admin dashboard", "Integration layer"],
    founderQuote: "Our compliance team went from firefighting to actually thinking strategically.",
  },
  {
    name: "Outline Labs",
    category: "Partnership & Co-Building",
    year: "2024",
    tagline: "Built together. Growing independently.",
    descriptor: "Co-Build · Developer Tools",
    microSignal: "500+ users",
    initials: "OL",
    context:
      "Technical founders with a strong product vision but no go-to-market muscle, brand presence, or distribution strategy. Great product, zero traction.",
    tags: ["Co-Founded", "DevTools", "GTM"],
    modules: [
      { name: "Brand & Identity", description: "Defined the brand from scratch — name, visual system, voice.", deliverable: "Brand system" },
      { name: "Go-to-Market Engine", description: "Built the marketing site, onboarding flow, and first acquisition experiments.", deliverable: "GTM infrastructure" },
      { name: "Growth Playbook", description: "Documented the acquisition strategy and handed over a repeatable playbook.", deliverable: "Growth playbook" },
    ],
    impactStatements: ["500+ users acquired in first phase", "Equity partnership with shared ownership", "Now growing independently with clear momentum"],
    deliverables: ["Brand system", "Marketing site", "Onboarding flow", "Acquisition experiments", "Growth playbook"],
    founderQuote: "They built the go-to-market we couldn't build ourselves — then taught us how to run it.",
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
