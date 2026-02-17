# Agent Brief — Components Backgrounds

## What This Feature Does

Centralized background rendering for compositions. Provides Solid, Gradient, Image, Video, Patterns, Particles, Noise, Animated, and Texture background variants. Integrates with ThemeContext and VideoDataContext via `video.templateVariation`. Templates use `SelectTemplateBackground()` to render the chosen background; the registry pattern supports extensible variants. Includes effect system (zoom, pan, Ken Burns, breathing, focus blur), overlay system (solid, gradient, vignette, duotone, pattern, color filter), and TemplateVariationAdapter for flexible data input.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/backgrounds` — understanding SelectTemplateBackground flow, adding new variants or overlays, extending config/animations, and keeping the registry and documentation aligned.
- **Expected dev level**: Mid–senior engineer familiar with React, TypeScript, Remotion (interpolate, useCurrentFrame), SVG/CSS animations. Awareness of ThemeContext, VideoDataContext, and video.templateVariation contracts.

## Source of Truth

1. Roadmap → `src/components/backgrounds/.docs/DevelopmentRoadMap.md`
2. Docs → `src/components/backgrounds/.docs/README.md` and child readMe files in config, hooks, variants
3. Skills → `/.skills/architecture/components-backgrounds-folder.md`
4. Code reality → `index.tsx`, `config/`, `variants/`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand SelectTemplateBackground and variant dispatch.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks, no template-variation regressions.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Backgrounds root | `src/components/backgrounds/.docs/README.md` |
| Roadmap | `src/components/backgrounds/.docs/DevelopmentRoadMap.md` |
| Config | `src/components/backgrounds/config/.docs/README.md` |
| Hooks | `src/components/backgrounds/hooks/.docs/README.md` |
| Variants root | `src/components/backgrounds/variants/.docs/README.md` |
| Image (incl. overlays/variants) | `variants/Image/.docs/readMe.md`, `variants/Image/overlays/.docs/readMe.md`, `variants/Image/variants/.docs/README.md` |
| NoiseBackground | `variants/NoiseBackground/.docs/README.md`, `variants/NoiseBackground/variants/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/backgrounds/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks completed work (registry, Solid, Gradient, Image, Video, Noise, Particles, Patterns, Textures, Animated, overlays, TemplateVariationAdapter, animation system). To Do: performance optimizations, new variants (3D, video texture), advanced effects (blur, LUT), accessibility, testing. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; backgrounds mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-backgrounds-folder.md` — BackgroundComponents, SelectTemplateBackground; variants; config; TemplateVariationAdapter; overlay system; adding variants/overlays/noise types
- `/.skills/architecture/components-folder-structure.md` — parent structure, ThemeContext/VideoDataContext integration

Related (for routing, not direct use in backgrounds):

- `/.skills/architecture/components-images-folder.md` — image animation patterns (backgrounds/Image shares concepts)
- `/.skills/architecture/components-containers-folder.md` — frame-accurate container animations
- `/.skills/architecture/core-context-folder.md` — ThemeContext, VideoDataContext
- `/.skills/architecture/core-types-folder.md` — VideoTemplateVariation, videoData

## Module Map

| Module | Responsibility | Entry Points |
|--------|-----------------|--------------|
| `index.tsx` | BackgroundComponents registry; SelectTemplateBackground(); re-exports config | `BackgroundComponents`, `SelectTemplateBackground`, `NoiseVariants` |
| `config/` | constants, types, animations | `types.ts`, `constants.ts`; `getBackgroundAnimation()` for fade/zoom/pan/kenBurns/parallax/slide |
| `hooks/` | Placeholder for future shared hooks | (none yet) |
| `variants/Solid/` | SolidBackground — theme palette fill | `SolidBackground.tsx` |
| `variants/Gradient/` | GradientBackground — palette gradients | `GradientBackground.tsx` |
| `variants/Image/` | ImageBackground — effects, overlays, presets, TemplateVariationAdapter | `index.tsx`; `overlays/`, `variants/` |
| `variants/Video/` | VideoBackground — video with overlay support | `VideoBackground.tsx` |
| `variants/Patterns/` | PatternBackground — SVG patterns | `index.tsx`; `variants/` (dots, lines, grid, crosshatch, triangles, chevron) |
| `variants/Particles/` | ParticleBackground — particle fields | `index.tsx`; `variants/` (dots, lines, bubbles, snow, confetti) |
| `variants/NoiseBackground/` | Procedural noise and graphics | `config.ts`, `NOISE_VARIANTS`; sub-variants (GridNoise, SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise, FloatingParticles, etc.) |
| `variants/AnimatedBackground.tsx` | Pure CSS/SVG animated backgrounds | `AnimatedBackground.tsx` |
| `variants/Textures/` | TextureBackground — tiled image with overlay | `TextureBackground.tsx` |

## Implementation Guidelines

- **Registry pattern**: Add new variants to BackgroundComponents and SelectTemplateBackground; extend VideoTemplateVariation if new `useBackground` value.
- **ThemeContext/VideoDataContext**: Drive palette and config; do not bypass.
- **config/animations**: Use `getBackgroundAnimation()` for shared frame-based effects; avoid duplicating.
- **Image overlays**: Use themeIntegration for palette-derived colors when omitted.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data in backgrounds.

## Verification Checklist

- [ ] New variant added to BackgroundComponents and SelectTemplateBackground switch
- [ ] VideoTemplateVariation type updated if new useBackground value
- [ ] Config/animations used for shared effects where applicable
- [ ] ThemeContext/VideoDataContext correctly consumed
- [ ] No regressions in template variation flow
- [ ] readMe updated if structure or exports change
- [ ] New overlay type wired into OverlayRenderer and themeIntegration (Image backgrounds)

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- No dedicated root-level Roadmap.md; component-level roadmaps in `.docs/DevelopmentRoadMap.md` per folder.
- Backgrounds has comprehensive roadmap and documentation coverage; child variants (Gradient, Textures) have optional child roadmaps.
- readMe casing varies (README.md vs readMe.md in paths); both refer to the same documentation files.
