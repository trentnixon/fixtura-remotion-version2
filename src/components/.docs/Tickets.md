# Completed Tickets Index

- TKT-2025-013

---

## Active Tickets

---

## TKT-2025-014: Components Skill Tree — .skills/architecture

---
ID: TKT-2025-014
Status: Draft
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: TKT-2025-013, Skills System, cricket-compositions-feature pattern
---

### Overview

Create a skill tree in `.skills/architecture/` for the components folder and its subdirectories. Skills provide LLM-first guidance for navigating, extending, and debugging component logic. Follow patterns from cricket-compositions-feature (feature root + per-folder) and color-system-folder (single skill covering subfolders).

### Proposed Skill Tree Structure

**Tier 1 — Feature root (1 skill)**

- `components-folder-structure.md` — Overview of components directory; ThemeContext/VideoDataContext integration; cross-cutting concerns (theme, data, animation); how parts compose; links to all child skills

**Tier 2 — Top-level folders (9 skills)**

- `components-animations-folder.md` — Generic animation configs; getAnimationConfig; when to use vs domain-specific (containers/images/typography)
- `components-backgrounds-folder.md` — BackgroundComponents, SelectTemplateBackground; config, variants (Solid, Gradient, Image, Video, Patterns, Particles, Noise, Animated, Textures); TemplateVariationAdapter; overlay system
- `components-containers-folder.md` — AnimatedContainer; animations, styles, modules, examples; entry/exit flow; when to use modules vs raw AnimatedContainer
- `components-easing-folder.md` — getImageEasingFunction; types shared by images/containers/typography
- `components-images-folder.md` — AnimatedImage; config/animations; useDualImageAnimation; when to add new animation types
- `components-layout-folder.md` — screen (OneColumn), main/header, titleScreen, sponsors; RouteToComposition; slot composition pattern
- `components-transitions-folder.md` — TransitionWrapper, TransitionSeriesWrapper; @remotion/transitions; when to use linear vs spring timing
- `components-typography-folder.md` — AnimatedText; config (animations, styles, variants); letter/word splitting; when to add types or variants
- `components-ui-folder.md` — Placeholder; guidelines for future UI primitives

**Tier 3 — Optional deep-dive (if needed)**

- `components-backgrounds-image-folder.md` — ImageBackground effect system, overlays, TemplateVariationAdapter (only if backgrounds-folder becomes too large)
- `components-backgrounds-noise-folder.md` — Noise variants, SpokesGraphics, NOISE_VARIANTS (only if needed)

### Phases & Tasks

#### Phase 1: Feature root + lightweight folders

##### Tasks

- [x] Create `components-folder-structure.md` (references all Tier 2 skills)
- [x] Create `components-easing-folder.md`
- [x] Create `components-animations-folder.md`
- [x] Create `components-transitions-folder.md`
- [x] Create `components-ui-folder.md`
- [x] Add Skill section to each folder readMe (animations, easing, transitions, ui)

#### Phase 2: Core composition folders

##### Tasks

- [x] Create `components-containers-folder.md`
- [x] Create `components-images-folder.md`
- [x] Create `components-typography-folder.md`
- [x] Add Skill section to containers, images, typography readMe

#### Phase 3: Complex folders

##### Tasks

- [x] Create `components-backgrounds-folder.md`
- [x] Create `components-layout-folder.md`
- [x] Add Skill section to backgrounds, layout readMe

#### Phase 4: Cross-link and verify

##### Tasks

- [x] Add References section to components-folder-structure listing all child skills
- [x] Ensure each child skill References back to parent
- [x] Verify skill-ref pattern in readMe matches cricket/colorSystem

### Naming Convention

- `components-{folder}-folder.md` (kebab-case)
- Keeps skills in `.skills/architecture/` (no subfolders for components, unlike cricket which could have compositions subfolder — we follow flat architecture)

### Constraints, Risks, Assumptions

- Skills must NOT invent conventions; extract from readMe and code
- Backgrounds may need splitting (Image, Noise) if single skill exceeds ~100 lines of guidance
- Start with Tier 1 + Tier 2; Tier 3 only if user requests or backgrounds skill is unwieldy

---

## TKT-2025-013: [Completed] Component readMe Updates — Standard Format Migration

---
ID: TKT-2025-013
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-02-16
Updated: 2025-02-16
Related: Roadmap-Components-Docs, Feature Documentation System
---

### Overview

Migrate component folder readMe files to the standard folder contract format (Folder Overview, Files, Child Modules, Relations, Dependencies). Ensures consistency and LLM-first discoverability across the components directory.

### What We Need to Do

Update remaining parent and child readMe files to the standard format. Reference completed folders for structure.

### Completed (Updated to Standard Format)

**Core (outside components):**

- [x] `src/core/types` (root, data, sport, cricket)
- [x] `src/core/context`

**Components:**

- [x] `components/animations` (root, config)
- [x] `components/backgrounds` (root + config, hooks, variants, Solid, Gradient, Video, Patterns, Particles, NoiseBackground, Textures, Image + overlays/variants)
- [x] `components/containers` (root)
- [x] `components/easing` (root)
- [x] `components/images` (root)
- [x] `components/layout` (root)
- [x] `components/transitions` (root)
- [x] `components/typography` (root; created readMe from README.txt)
- [x] `components/ui` (root)

### Completion Summary

All component folder readMe files migrated to standard format (Folder Overview, Files, Child Modules, Relations, Dependencies). Phase 1: 7 top-level parents (containers, easing, images, layout, transitions, typography, ui). Phase 2: child folders (containers/animations, styles, modules, examples; images/config; layout/main, header, screen, sponsors, titleScreen; typography/config, utils). Phase 3: components root — readMe.md (contract) + DirectoryMap.md (reference). Typography README.txt removed; content in typography/.docs/readMe.md.
