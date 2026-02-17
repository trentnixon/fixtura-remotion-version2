# Agent Brief — Components Images

## What This Feature Does

Animated image component system with entry/exit animations, aspect-ratio control, and fallbacks. Wraps Remotion Img; uses config for animation definitions, easing, and spring configs. Supports dual-image flows (e.g. logo swap) via useDualImageAnimation. Exposes 14+ animation categories (fade, zoom, slide, special, rotate, spring, camera, cinematic, effects, perspective, broadcast, composite). Integrates with `../easing` for shared types and `getImageEasingFunction`. Consumed by compositions, templates, layout (logos, thumbnails, etc.).

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/images` — understanding AnimatedImage flow, adding new animation types to config/animations, extending useImageAnimation/useDualImageAnimation dispatch, and keeping animation categories organized and documented.
- **Expected dev level**: Mid engineer familiar with React, TypeScript, Remotion (interpolate, spring, useCurrentFrame). Awareness of CSS properties for animation, easing integration, and dual-image (logo swap) flows.

## Source of Truth

1. Roadmap → `src/components/images/.docs/DevelopmentRoadMap.md`
2. Docs → `src/components/images/.docs/README.md`, `config/.docs/README.md`, `config/animations/.docs/README.md`
3. Skills → `/.skills/architecture/components-images-folder.md`
4. Code reality → `AnimatedImage.tsx`, `config/`, `placeholders.ts`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand AnimatedImage, useImageAnimation vs useDualImageAnimation, and animation dispatch.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks, no animation regressions.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Images root | `src/components/images/.docs/README.md` |
| Roadmap | `src/components/images/.docs/DevelopmentRoadMap.md` |
| Config | `src/components/images/config/.docs/README.md` |
| Config animations | `src/components/images/config/animations/.docs/README.md` |
| Animation options | `src/components/images/.docs/animationOptions.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/images/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks completed work (AnimatedImage, dual animation system, aspect modes, fallbacks, 14+ animation categories, easing integration, spring support, performance optimizations). To Do: lazy loading, new animation types (morphing, AI-powered), advanced features (composition, filters), accessibility, testing. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; images mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-images-folder.md` — AnimatedImage; config/animations; useDualImageAnimation; when to add new animation types
- `/.skills/architecture/components-folder-structure.md` — parent structure, ThemeContext/VideoDataContext integration

Related (for routing, not direct use in images):

- `/.skills/architecture/components-easing-folder.md` — shared easing types; images consumes getImageEasingFunction
- `/.skills/architecture/components-animations-folder.md` — generic presets; images uses domain-specific frame-accurate animations
- `/.skills/architecture/components-containers-folder.md` — frame-accurate container animations; different entry/exit model
- `/.skills/architecture/components-backgrounds-folder.md` — ImageBackground shares animation concepts

## Module Map

| Module | Responsibility | Entry Points |
|--------|-----------------|--------------|
| `AnimatedImage.tsx` | Main component; animation, exitAnimation, exitFrame, aspect ratio; normalizeImageAnimation, useDualImageAnimation; preloadImage(s), getImageDimensions | `AnimatedImage.tsx` |
| `placeholders.ts` | GENERIC_PLACEHOLDER, LOGO_PLACEHOLDER, PLAYER_PLACEHOLDER, SPORT_PLACEHOLDERS | `placeholders.ts` |
| `index.ts` | Barrel export (AnimatedImage, preloadImage, preloadImages, getImageDimensions, placeholders, types) | `index.ts` |
| `config/` | animationUtils (normalizeImageAnimation), useImageAnimation, useDualImageAnimation; springConfigs; imageAnimations dispatcher | `config/index.ts`, `config/useImageAnimation.ts`, `config/animationUtils.ts` |
| `config/animations/` | Per-category functions: fade, zoom, slide, special, rotate, spring, camera, cinematic, effects, perspective, broadcast, composite | `config/animations/*.ts`, `config/animations/index.ts` |

## Implementation Guidelines

- **Use shared easing**: `../easing` for types and getImageEasingFunction; do not duplicate.
- **Animation functions**: Return CSSProperties; use Remotion interpolate/spring.
- **New animation types**: Add to config union, create/extend file in `config/animations/`, wire into useImageAnimation dispatch, add shorthand to normalizeImageAnimation if desired.
- **useDualImageAnimation vs useImageAnimation**: Dual for logo/image swap (two sources, crossfade or sequenced); single for entry + exit on one image.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data in image URLs.

## Verification Checklist

- [ ] New animation type added to config union and `config/animations/`
- [ ] useImageAnimation dispatch updated for new type
- [ ] normalizeImageAnimation shorthand added if applicable
- [ ] Shared easing used; no duplication from easing folder
- [ ] Animation functions return valid CSSProperties
- [ ] No regressions in AnimatedImage or dual-image flows
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Images has comprehensive roadmap and documentation; config and config/animations have child readMes.
- readMe casing varies (README.md vs readMe.md in paths); both refer to the same documentation files.
- Tickets are at `src/components/.docs/Tickets.md`; no dedicated images Tickets.md.
