

# MP Website Alignment Plan

This plan brings the current website copy and structure into alignment with the refined PDF document. The PDF represents a more decisive, streamlined version of the messaging.

---

## Overview

The PDF establishes a cleaner narrative structure:
1. **Hero** - "MP exists to move people forward"
2. **What MP Is** - Partnership-led build studio definition
3. **How We Work** - Three constraints (Partnership, Ownership, Momentum)
4. **What We Build** - Four service categories with refined descriptions
5. **Ventures** - Co-ownership statement
6. **Selectivity/Contact** - "Start with alignment"
7. **Footer** - Email, location, copyright

---

## Changes Required

### 1. Hero Section Update
**File:** `src/components/HeroSection.tsx`

Current:
- Headline: "Ideas become momentum."
- Subtext: "MP partners with founders and teams to build what matters..."

Updated to match PDF:
- **New tagline:** "Moving People"
- **New headline:** "MP exists to move people forward."
- **New subtext:** "We partner with people to build products, systems, and companies that create momentum."

### 2. New "What MP Is" Section
**File:** Create `src/components/WhatMPIsSection.tsx`

Add a new section after the hero with:
- Headline: "What MP Is"
- Text: "MP is a partnership-led build studio. We work alongside founders and teams — thinking, building, and deciding together. Through shared responsibility, clear thinking, and disciplined execution. When we commit, we commit as owners."

### 3. How We Work Section Update
**File:** `src/components/HowWeWorkSection.tsx`

Restructure with the three constraints from PDF:
- "Partnership over services"
- "Ownership over output"  
- "Momentum over noise"
- Add: "These aren't values we market. They're constraints we operate under."

### 4. Services Section Update
**File:** `src/components/ServicesSection.tsx`

Rename from "Systems, not services" to "What We Build" and update the four categories with PDF copy:

| Service | Updated Description |
|---------|-------------------|
| Brand & Positioning | "Clarity before aesthetics. We define what matters, remove what doesn't, and give teams language they can build with." |
| Products, Platforms & Systems | "We design and build digital products, internal tools, and workflows as connected systems. Everything we build is meant to scale with decision-making, not just traffic." |
| AI & Automation | "Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done. No experiments for the sake of trend." |
| Partnership & Co-Building | "Long-term collaborations with shared ownership and responsibility. Some partnerships start as build work. The right ones evolve into ventures." |

### 5. Ventures Section Update
**File:** `src/components/VenturesSection.tsx`

Update copy to PDF version:
- "Beyond partnerships, MP builds and co-owns ventures we believe in. We put our time, capital, and reputation behind ideas we're willing to own."
- Headline: "We build and co-own what we believe in."

### 6. Contact Section Update
**File:** `src/components/ContactSection.tsx`

Update to match PDF's selectivity messaging:
- Headline: "Start with alignment."
- Subtext: "MP works selectively. If alignment exists, conversations start naturally. We'll know quickly if it makes sense."
- Add email: `hello@movingpeople.studio`

### 7. Footer Update
**File:** `src/components/Footer.tsx`

Update to include:
- "Globally connected" text
- Email: `hello@movingpeople.studio`
- Copyright: "Moving People © 2026 MP Studio. All rights reserved."

### 8. Sections to Remove or Simplify
The following sections can be removed or consolidated as they're not in the PDF:
- **ProblemSection** - Remove (content now implied in "What MP Is")
- **AgitationSection** - Remove
- **SolutionSection** - Remove (replaced by "What MP Is")
- **WhoWeWorkWithSection** - Remove (selectivity is now in contact section)
- **DigitalPresenceSection** - Remove (not in PDF)
- **EngagementSection** - Remove (process is simplified)
- **FAQSection** - Remove (not in PDF)

### 9. Page Structure Update
**File:** `src/pages/Index.tsx`

New simplified structure:
```text
Header
└── Hero Section
    └── Visual Break
        └── What MP Is Section (new)
            └── How We Work Section
                └── Visual Break
                    └── What We Build (Services)
                        └── Ventures Section
                            └── Contact Section
                                └── Footer
```

---

## Technical Details

### New Component: WhatMPIsSection.tsx
```tsx
// Partnership-led build studio definition
// Clean two-paragraph layout
// Max-width constraint for readability
```

### Updated Services Layout
The PDF shows a table layout. Consider:
- 2x2 grid on desktop
- Stacked cards on mobile
- Each card has title + two-line description

### Footer Enhancements
- Add email as a clickable mailto link
- Add "Globally connected" location text
- Update copyright format

---

## Summary of Files to Modify

| File | Action |
|------|--------|
| `src/components/HeroSection.tsx` | Update copy |
| `src/components/HowWeWorkSection.tsx` | Complete rewrite |
| `src/components/ServicesSection.tsx` | Update headline, descriptions, layout |
| `src/components/VenturesSection.tsx` | Update copy |
| `src/components/ContactSection.tsx` | Update copy, add email |
| `src/components/Footer.tsx` | Add email, location, update copyright |
| `src/pages/Index.tsx` | Remove 6 sections, add 1 new section |
| `src/components/WhatMPIsSection.tsx` | **Create new** |

### Files to Delete
- `src/components/ProblemSection.tsx`
- `src/components/AgitationSection.tsx`
- `src/components/SolutionSection.tsx`
- `src/components/WhoWeWorkWithSection.tsx`
- `src/components/DigitalPresenceSection.tsx`
- `src/components/EngagementSection.tsx`
- `src/components/FAQSection.tsx`

---

## Result

The website will be significantly streamlined:
- **Before:** 13 content sections
- **After:** 6 content sections + 2 visual breaks

This creates a tighter, more decisive narrative that matches the PDF's intent — calm, selective, and founder-level.

