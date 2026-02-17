

# Interactive Background: "Alignment Field"

A full-page, fixed canvas background showing flowing particles (nodes) that drift, connect, and align — representing the brand's core idea: *people finding alignment creates momentum*.

## What It Will Look and Feel Like

- **Persistent canvas** fixed behind all content, visible on every section as you scroll
- **~80 small dots** (particles) floating slowly across the screen in gentle, organic motion
- **Connection lines** appear between nearby particles — faint, architectural, representing alignment
- **Mouse interaction**: particles near the cursor gently attract toward it, creating a subtle "magnetic pull" (people aligning around a point)
- **Scroll interaction**: as the user scrolls deeper, particles gradually move from scattered/random positions toward more ordered, aligned formations — mirroring the brand journey from chaos to clarity
- **Color**: particles and lines use the existing foreground color at low opacity (black dots/lines on the warm gray background), keeping the minimal Mantis-like aesthetic

## Technical Approach

### 1. New Component: `ParticleField.tsx`
- Pure HTML Canvas (no extra libraries needed)
- Uses `requestAnimationFrame` for smooth 60fps rendering
- Tracks mouse position for interactive attraction
- Integrates with GSAP ScrollTrigger to shift particle behavior on scroll progress (0-1)
- Renders behind all content using `fixed inset-0 z-0` positioning

### 2. Particle Behavior
- Each particle has position, velocity, and a "home" position (for alignment on scroll)
- At scroll 0%: particles drift freely, loosely connected
- At scroll 100%: particles settle into a subtle grid/convergence pattern
- Mouse proximity (within ~150px) creates gentle pull — particles ease toward cursor then drift back
- Lines drawn between particles within ~120px distance, opacity fading with distance

### 3. Integration
- Added to `Index.tsx` as the first child, behind all sections
- All existing sections get `relative z-10` to layer above the canvas
- Existing GSAP animations remain untouched

### 4. Performance
- Canvas-based (not DOM elements), extremely lightweight
- ~80 particles with simple math — no GPU strain
- `will-change: transform` not needed since it's a single canvas element
- Automatically pauses when tab is not visible

## Files Changed

| File | Change |
|------|--------|
| `src/components/ParticleField.tsx` | **New** -- full canvas particle system |
| `src/pages/Index.tsx` | Add ParticleField behind content, adjust z-index layering |

No new dependencies required.

