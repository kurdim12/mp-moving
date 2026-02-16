

# Full Design Overhaul: GSAP + Framer Motion + Updated Brand Tone

This plan transforms the MP website from its current static state into a cinematic, animation-driven experience that matches the refined brand tone you shared. Every section gets GSAP scroll-triggered animations, Framer Motion page transitions, and the copy is updated to match your exact brand language.

---

## Phase 1: Install Dependencies

Add two animation libraries:
- **GSAP** (with ScrollTrigger plugin) for scroll-driven animations, parallax, and pinned sections
- **Framer Motion** for component-level enter/exit animations and page transitions

---

## Phase 2: Homepage -- Cinematic Scroll Engine

### 2A. Hero Section (Full Rewrite)

Replace the current static hero with a **dark, full-screen cinematic hero** pinned for ~200vh of scroll:

- Background: `#0B0B0D` with subtle grain overlay
- GSAP ScrollTrigger pins the section while text reveals in sequence
- Typography anchored bottom-left, revealing in staggered clusters:
  1. "Moving People." (large display type)
  2. "We exist to move people forward."
  3. "People create possibilities."
  4. "We exist to align people around what truly matters."
  5. "When alignment is clear, momentum becomes natural."
- MP logo fades in at top-left
- Vignette overlay for cinematic depth
- Uses the existing dark visual assets (visual-flow images) as subtle background layers with parallax

### 2B. Visual Break Images -- Parallax

Update `VisualBreakFull` component:
- GSAP ScrollTrigger parallax effect (image translates Y at 0.3x scroll speed)
- Slow scale-up on scroll (1.0 to 1.05)
- Uses existing flow images already in `/src/assets/`

### 2C. "What MP Is" Section -- Scroll Reveal

- Intersection Observer triggers Framer Motion `variants` for staggered text reveal
- Each paragraph line fades up with 100ms stagger
- Updated copy from your brand doc:
  - "MP is a partnership driven build group."
  - "We work with people and teams to create clarity, structure, and momentum that compounds."

### 2D. "How We Work" Section -- Animated Dividers

- Each constraint row reveals with GSAP-powered horizontal line wipe (left to right)
- Text fades up after line completes
- Constraints remain as-is (already match brand doc)
- Closing line stays: "These aren't values we market. They're constraints we operate under."

### 2E. "What We Build" (Services) Section -- Staggered Grid

- 2x2 grid cards reveal with Framer Motion stagger (scale from 0.95 + fade)
- Updated copy to match your exact brand doc:
  - **Brand and Positioning**: "Clarity before aesthetics. We define what matters. We remove what does not. We shape language teams can build with. A brand is not a logo. It is shared understanding. It is direction made visible. When positioning is precise, trust compounds."
  - **Products, Platforms and Systems**: "Architecture before interface. We design and build digital products, internal tools, and workflows as connected systems. Everything we build is structured to scale decision making, not just traffic. Speed without structure creates fragility. Systems create stability. Stability creates growth."
  - **AI and Automation**: "Applied selectively. We use AI where it removes friction, increases leverage, or fundamentally changes how work gets done. No experimentation for the sake of trend. No automation without direction. Technology is only powerful when aligned with judgment."
  - **Partnership and Co-Building**: "Ownership over output. We do not operate as a transactional vendor. We operate as a long term partner. Some collaborations remain build engagements. The right ones evolve into ventures. Momentum requires shared responsibility. Alignment requires trust."
- Add `inmotion@movingp.com` mailto link below each card

### 2F. About Section -- New Copy

Replace AboutMPSection copy with your brand doc text:
- "Moving People is a globally connected, remote first build group."
- "We were founded on a simple belief: Partnership drives lasting impact."
- "Our team operates across disciplines and geographies, but is united by one ethos."
- Three pillars: "Clarity before scale. Structure before speed. Ownership before optics."
- "We work with founders who think long term. We build with people who value alignment. We move deliberately."
- Closing: "The name is literal. We move people. And people move possibilities."

### 2G. Ventures Section -- Scroll Reveal

- GSAP-powered reveal with the two cards (MP Build / MP Co-Build) sliding up from below
- Copy stays aligned with current version

### 2H. Contact Section -- Dark Full-Height CTA

- Full viewport height, dark background (`#0B0B0D`)
- Centered minimal layout:
  - "Start with alignment." headline
  - "Selectively." as a standalone word below
  - `inmotion@movingp.com` as the primary CTA (replacing `hello@movingpeople.studio`)
- Framer Motion fade-in on scroll entry

### 2I. Footer Update

- Update email to `inmotion@movingp.com`
- Keep "Globally connected" and copyright

---

## Phase 3: Global Animation Infrastructure

### 3A. Create `src/hooks/useScrollReveal.ts`

A reusable hook wrapping GSAP ScrollTrigger:
- Accepts ref, animation config (fade direction, distance, duration, delay)
- Returns trigger state
- Used across all sections for consistency

### 3B. Create `src/components/AnimatedReveal.tsx`

A wrapper component using Framer Motion:
- `whileInView` with `viewport={{ once: true }}`
- Configurable variants: fadeUp, fadeIn, scaleIn, slideLeft
- Stagger children support

### 3C. Update `SmoothScroll.tsx`

- Integrate GSAP ScrollTrigger with Lenis for smooth scroll sync
- Add `ScrollTrigger.scrollerProxy` for Lenis compatibility

### 3D. Grain and Vignette Overlays

Create `src/components/CinematicOverlay.tsx`:
- CSS-based film grain using a noise SVG filter
- Radial gradient vignette overlay
- Used on hero and dark sections

---

## Phase 4: Micro-Interactions

### 4A. Magnetic Hover on Buttons and Links

Create `src/components/MagneticHover.tsx`:
- Tracks mouse position relative to element center
- Applies subtle translateX/Y (max 4px) via Framer Motion `useMotionValue`
- Wrap nav links, CTA buttons, and email links

### 4B. Cursor Enhancement

- Custom cursor dot that scales on interactive elements
- Implemented via a global `CursorFollower` component using Framer Motion

---

## Phase 5: Sub-Pages Polish

### 5A. What We Build (`/what-we-build`)

- Grid blocks get GSAP stagger reveal on page load
- Slow zoom on images already exists -- keep it

### 5B. Brand Systems, Product Platforms, AI, Co-Build

- Already use scene-based Intersection Observer pattern -- enhance with GSAP for smoother timing
- Add parallax to decorative elements

### 5C. Contact Page

- Update email references from `hello@movingpeople.studio` to `inmotion@movingp.com`

---

## Summary of Files

| Action | File |
|--------|------|
| Install | `gsap`, `framer-motion` |
| Create | `src/hooks/useScrollReveal.ts` |
| Create | `src/components/AnimatedReveal.tsx` |
| Create | `src/components/CinematicOverlay.tsx` |
| Create | `src/components/MagneticHover.tsx` |
| Create | `src/components/CursorFollower.tsx` |
| Rewrite | `src/components/HeroSection.tsx` (cinematic pinned hero) |
| Update | `src/components/VisualBreak.tsx` (parallax) |
| Update | `src/components/WhatMPIsSection.tsx` (new copy + reveal) |
| Update | `src/components/HowWeWorkSection.tsx` (animated dividers) |
| Update | `src/components/ServicesSection.tsx` (new copy + stagger) |
| Update | `src/components/AboutMPSection.tsx` (new copy + reveal) |
| Update | `src/components/VenturesSection.tsx` (scroll reveal) |
| Update | `src/components/ContactSection.tsx` (dark full-height CTA) |
| Update | `src/components/Footer.tsx` (new email) |
| Update | `src/components/SmoothScroll.tsx` (GSAP + Lenis sync) |
| Update | `src/pages/Index.tsx` (integrate new components) |
| Update | `src/pages/ContactPage.tsx` (email update) |
| Update | `src/App.tsx` (add CursorFollower) |
| Update | `src/index.css` (grain, vignette, dark section styles) |

---

## Result

The website transforms from a clean but static editorial site into a **cinematic, scroll-driven experience** with:
- Pinned hero with sequential text reveals
- Parallax imagery throughout
- GSAP-powered line wipes and staggered content reveals
- Magnetic hover micro-interactions
- Custom cursor
- Dark cinematic sections for contrast
- All copy aligned exactly to your brand document
- Email updated to `inmotion@movingp.com` globally

