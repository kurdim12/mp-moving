
# Production Readiness Plan

This plan addresses every gap between the current state and a polished, production-ready website that matches MP's tone: calm, confident, architectural, world-class.

---

## 1. Design System Consistency (High Priority)

**Problem**: Every sub-page (Brand Systems, Product Platforms, AI & Automation, Co-Build, Contact, What We Build) hardcodes `style={{ fontFamily: "'Inter', system-ui, sans-serif" }}`, `bg-white`, `text-black`, and `text-neutral-*` -- completely bypassing the design system. Headlines use `font-bold` (Inter) instead of the Cormorant Garamond display font established on the homepage.

**Fix**:
- Remove all inline `fontFamily` overrides from sub-pages
- Replace all hardcoded colors (`bg-white`, `text-black`, `text-neutral-400/500`) with design tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`)
- Apply `font-display` (Cormorant Garamond) to all `h1`/`h2` headlines across sub-pages
- Update `tailwind.config.ts` font-family `display` to match the CSS variable (`Cormorant Garamond` instead of `Inter`)

**Pages affected**: BrandSystems, ProductPlatforms, AIAutomation, CoBuild, ContactPage, WhatWeBuild

---

## 2. Eliminate Duplicated Code (High Priority)

**Problem**: `useOnScreen`, `useSceneVisibility`, `Reveal`, and `Divider` are copy-pasted into 5 separate page files. Any animation change requires editing all 5 files.

**Fix**:
- Refactor all sub-pages to import from the shared `RevealOnScroll.tsx` component
- Add a `SceneReveal` wrapper variant to `RevealOnScroll.tsx` for the scene-based pattern used in sub-pages
- Remove all local `useOnScreen`, `useSceneVisibility`, `Reveal`, and `Divider` definitions from individual pages

---

## 3. Content & Data Fixes (High Priority)

**Problem**: Several content inconsistencies that would undermine credibility:

| Issue | Current | Correct |
|-------|---------|---------|
| Contact page email (Scene 4) | `hello@movingpeople.studio` | `inmotion@movingp.com` |
| LinkedIn link | `https://linkedin.com` (placeholder) | Actual MP LinkedIn URL or remove |
| Footer copyright | `Moving People. All rights reserved.` | `Moving People. MP Studio. All rights reserved.` |
| OG image | `lovable.dev/opengraph-image-p98pqg.png` | Custom branded OG image |
| Canonical URL | `movingpeople.studio` | Verify this is the correct production domain |

**Fix**: Update all incorrect content to match the brand's official details.

---

## 4. SEO & Meta Tags (Medium Priority)

**Problem**: Only `index.html` has meta tags. Route changes don't update the page title or description. No structured data.

**Fix**:
- Add a `useDocumentTitle` hook that updates `document.title` per route
- Add page-specific titles: "Brand Systems | MP", "Portfolio | MP", "Contact | MP", etc.
- Move `<link rel="icon">` inside `<head>` (currently outside it in index.html)

---

## 5. Scroll-to-Top on Navigation (Medium Priority)

**Problem**: When navigating between routes, the scroll position is preserved from the previous page, causing users to land mid-page.

**Fix**:
- Add a `ScrollToTop` component inside `BrowserRouter` that calls `window.scrollTo(0, 0)` on route changes

---

## 6. 404 Page (Medium Priority)

**Problem**: The NotFound page uses generic styling ("Oops! Page not found") that doesn't match the brand's minimal, architectural tone.

**Fix**:
- Restyle with Cormorant Garamond headline, minimal layout, and a quiet "Return home" link -- matching the brand's voice

---

## 7. Contact Form Functionality (Medium Priority)

**Problem**: The contact form on `/contact` only sets `submitted = true` client-side. No data is actually sent anywhere.

**Fix**:
- Wire the form to send data via `mailto:` link or a Supabase edge function
- At minimum, construct a `mailto:` link with form data so submissions reach `inmotion@movingp.com`

---

## 8. Accessibility Polish (Lower Priority)

**Fix**:
- Add a skip-to-content link in the Header
- Ensure all interactive elements have proper focus states
- Add `aria-label` to the mobile hamburger menu overlay
- Ensure color contrast meets WCAG AA on all text over images (hero section)

---

## 9. Performance (Lower Priority)

**Fix**:
- Add `loading="lazy"` to all off-screen images (some already have it, ensure consistency)
- Preload the hero background image in `index.html` for faster LCP
- Add `font-display: swap` to the Google Fonts import URL

---

## Technical Summary

| Category | Files to modify |
|----------|----------------|
| Design tokens & typography | 6 page files + `tailwind.config.ts` |
| Shared components | `RevealOnScroll.tsx` (extend), 5 page files (refactor) |
| Content fixes | `ContactPage.tsx`, `Footer.tsx`, `index.html` |
| SEO | New `useDocumentTitle` hook, all page files |
| Navigation | New `ScrollToTop` component, `App.tsx` |
| 404 | `NotFound.tsx` |
| Contact form | `ContactPage.tsx` |
| Accessibility | `Header.tsx`, `HeroSection.tsx` |
| Performance | `index.html` |

Estimated scope: ~15 files modified, 2 new utility files created.
