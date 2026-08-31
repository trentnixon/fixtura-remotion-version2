# Generated Remotion preset shortlist

**Date:** 2026-08-28  
**Status:** Approved discovery baseline  
**Depends on:**

- `.scratch/generated-backgrounds/handoff.md`
- `.scratch/generated-backgrounds/decisions.md` (approved)
- `.scratch/generated-backgrounds/current-preset-inventory.md` (approved)
- `.scratch/generated-backgrounds/catalogue-contract.md` (approved)
- `.scratch/generated-backgrounds/compatibility-plan.md` (approved)
- `.research/generated-backgrounds-discovery.md`

**Next:** Step 6 (implementation handoff summary)

## Purpose

Shortlist **new** Remotion-backed Generated presets for after Phase 1 consolidation. Phase 1 ships the **25 existing visuals** through the six current renderer adapters only (`pattern-tiled`, `particle-field`, `grid-noise`, `particle-noise`, `svg-geometric`, `svg-spokes`). Nothing in this document authorizes new preset implementation before the full discovery package is approved.

This file answers handoff open decision **#5**: which new Remotion presets belong in the first post-consolidation implementation wave.

---

## Platform baseline

| Fact                                | Implication                                                                                                                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repo pinned to Remotion **4.0.499** | Effects and `<Solid>` support exist from Remotion **4.0.464/465** onward — before this repo’s baseline.                                                                                                     |
| `@remotion/effects`                 | **Not installed** in this repo. Install **`@remotion/effects@4.0.499`** (matches pinned Remotion). No core Remotion upgrade required for effects adoption in general.                                       |
| Installed and used today            | `@remotion/noise` (GridNoise motion), core Remotion components                                                                                                                                              |
| Installed, unused by backgrounds    | `@remotion/shapes`, `@remotion/paths`, `@remotion/lottie`, `@remotion/rive`                                                                                                                                 |
| Not installed                       | `@remotion/effects`, `@remotion/three`                                                                                                                                                                      |
| API gaps at 4.0.499                 | Some effect exports (notably **`starburst()`**) are absent from `@remotion/effects@4.0.499`. A Remotion upgrade is required **only** for APIs unavailable at 4.0.499 — not for effects adoption as a whole. |
| Effects confirmed at 4.0.499        | `liquidContours()`, `gridlines()`, `scanlines()`, `paper()`, `burlap()`, `flannel()`, `whiteNoise()`, `halftoneLinearGradient()`, `zigzag()`, and related first-party exports used in this shortlist.       |
| Remotion 4.0.518                    | Adds `addElementLibraryToStudio()` and Studio element catalogues. **Outside this program** — must not set the minimum effects version.                                                                      |

**Adoption gate (all new effect-backed presets):**

1. Install `@remotion/effects@4.0.499` (or upgrade Remotion only when a chosen preset needs an effect API not exported at 4.0.499).
2. **Render spike:** local + Lambda parity, deterministic frame output, memory ceiling on 1080p compositions.
3. **WebGL effects:** test **ANGLE** locally and Lambda’s **software-backed** path (`swangle` per Remotion guidance for no-GPU / Lambda WebGL rendering). [HTML-in-canvas rendering guidance](https://www.remotion.dev/docs/html-in-canvas) documents ANGLE for WebGL and `swangle` as the no-GPU/Lambda path.
4. One catalogue entry + one renderer adapter per new preset (same contract as Phase 1).
5. Palette and readability policy resolved before `operatorVisibility: resolved-visible`.

Official references: [Effects](https://www.remotion.dev/docs/effects), [shaders as backgrounds](https://www.remotion.dev/docs/shaders), [createEffect](https://www.remotion.dev/docs/create-effect).

---

## Renderer strategy for new presets

New presets extend the catalogue with additional adapter keys. They do not replace Phase 1 adapters until product approves retirement.

| Proposed adapter | Engine                                         | When to use                                                                                         |
| ---------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `effects-solid`  | `<Solid>` + stacked `@remotion/effects`        | Default for new 2D procedural looks. Palette-driven, deterministic, Studio-editable parameters.     |
| `effects-custom` | `createEffect()` (Canvas 2D / WebGL2 / WebGPU) | Fixtura-specific looks not covered by first-party effects (e.g. club-colour field mapping).         |
| `shapes-paths`   | `@remotion/shapes` + `@remotion/paths`         | Vector fields, animated brand geometry, path-driven motion. May accept effects on shape components. |
| `motion-asset`   | `@remotion/lottie` or `@remotion/rive`         | Art-directed reusable motion; designer-authored, parameterized per club.                            |
| `three-scene`    | `<ThreeCanvas>`                                | Depth, lighting, or camera motion that 2D effects cannot approximate.                               |

Phase 1 adapters (`pattern-tiled`, `particle-field`, `grid-noise`, `particle-noise`, `svg-geometric`, `svg-spokes`) remain the render path for all 25 inventory visuals until a explicit replace/retire decision.

---

## Tier summary

| Tier                     | Count | Meaning                                                                  |
| ------------------------ | ----: | ------------------------------------------------------------------------ |
| **Phase 1**              |    25 | Existing inventory only — no new Remotion presets                        |
| **First implementation** |     5 | Recommended first post-Phase 1 wave after effects install + render spike |
| **Later prototype**      |     4 | Valuable but needs more design, overlap resolution, or asset pipeline    |
| **Experimental**         |     2 | Research lane only — no catalogue commitment                             |
| **Rejected**             |     9 | Out of scope, superseded API, or wrong fit for Generated                 |

---

## Phase 1 — existing presets (not new Remotion work)

All rows below are **retained through legacy adapters**, not reimplemented on `@remotion/effects` in Phase 1.

| Adapter          | Preset IDs (25 total)                                                                                                       | Notes                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `pattern-tiled`  | `dot-field`, `line-field`, `tile-grid`, `crosshatch-field`, `triangle-tile`, `chevron-field`                                | Tiled DOM/SVG pattern renderer |
| `particle-field` | `floating-dots`, `streak-lines`, `bubble-field`, `snow-field`, `confetti-field`                                             | Particle family                |
| `grid-noise`     | `balanced-noise`, `subtle-noise`, `grain-field`, `wave-noise`, `fog-field`, `tv-static`, `gradient-grid`, `pulsing-circles` | GridNoise pipeline (8)         |
| `particle-noise` | `floating-particles`, `dynamic-particles`, `triangle-swarm`, `digital-rain`                                                 | ParticleNoise pipeline (4)     |
| `svg-geometric`  | `geometric-field`                                                                                                           | GeometricGraphics              |
| `svg-spokes`     | `spokes-field`                                                                                                              | SpokesGraphics                 |

`noise.graphics` ingress maps to `balanced-noise` (OVR-01). No separate visual.

---

## First implementation — recommended post-Phase 1 wave

Ship only after platform gate passes. Ordered by proof-of-pipeline value (simplest first).

### 1. `broadcast-halftone`

| Field                          | Value                                                                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**             | Broadcast-style halftone gradient field for scoreboard and sports graphics. High contrast, readable at a distance.                                                                                                                                |
| **Likely renderer**            | `effects-solid` — `halftoneLinearGradient()` on `<Solid>`                                                                                                                                                                                         |
| **Expected operator controls** | Preset only (Phase 1 pattern for new presets). Optional later: density, angle                                                                                                                                                                     |
| **Expected author controls**   | Effect stack order, halftone cell size, gradient stops mapped from palette roles                                                                                                                                                                  |
| **Reason for inclusion**       | Cleanest proof that the effects pipeline can add presets without a new top-level background family. Closest Remotion-native replacement path for several hand-tuned noise/grain looks **without** retiring inventory presets in the same release. |
| **Overlap with inventory**     | Related to `grain-field`, `tv-static`, `balanced-noise` — **distinct** catalogue entry; no Phase 1 retirement                                                                                                                                     |

### 2. `topographic-flow`

| Field                          | Value                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**             | Slow animated contour or liquid-flow lines using two club colours. Premium, abstract sports broadcast look.   |
| **Likely renderer**            | `effects-solid` — `liquidContours()` on `<Solid>`                                                             |
| **Expected operator controls** | Preset only; optional later: motion speed cap                                                                 |
| **Expected author controls**   | Contour density, line weight, colour roles, animation phase tied to `useCurrentFrame()`                       |
| **Reason for inclusion**       | Fills a gap not covered well by current Pattern or GridNoise modes. Strong differentiation for club branding. |
| **Overlap with inventory**     | None direct; visually adjacent to `wave-noise`, `geometric-field` — keep distinct IDs                         |

### 3. `signal-grid`

| Field                          | Value                                                                                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**             | Tech/scoreboard grid with scanlines, mild vignette, or glow. Structured, not organic noise.                                                                            |
| **Likely renderer**            | `effects-solid` — stacked `gridlines()` + `scanlines()` / `vignette()` / `glow()`                                                                                      |
| **Expected operator controls** | Preset only                                                                                                                                                            |
| **Expected author controls**   | Grid pitch, line opacity, treatment stack, palette roles for grid vs background                                                                                        |
| **Reason for inclusion**       | Composes multiple stable effects — validates **stacking** and readability policy in one preset. Adjacent to `gradient-grid` and Pattern `tile-grid` but effect-native. |
| **Overlap with inventory**     | `gradient-grid`, `tile-grid` — keep all until product compares visually                                                                                                |

### 4. `energy-burst`

| Field                          | Value                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Visual purpose**             | Radial starburst for hype, results, or transition moments. Controlled ray count and centre offset.                                                                                         |
| **Likely renderer**            | `effects-solid` — `starburst()` from `@remotion/effects` when available (absent from 4.0.499 exports — likely requires Remotion upgrade; not the deprecated `@remotion/starburst` package) |
| **Expected operator controls** | Preset only; optional later: intensity                                                                                                                                                     |
| **Expected author controls**   | Ray count, rotation, centre position, palette-driven ray colour                                                                                                                            |
| **Reason for inclusion**       | Single-effect preset with clear visual identity. Uses deprecated-package successor API — documents correct dependency path.                                                                |
| **Overlap with inventory**     | `spokes-field` is SVG-based; starburst is procedural — **keep both** unless product merges after visual review                                                                             |

### 5. `paper-club`

| Field                          | Value                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**             | Textured club surface: paper, fabric, or subtle grain on a solid or soft gradient base. Absorbs some Texture-adjacent use cases while staying in Generated. |
| **Likely renderer**            | `effects-solid` — `paper()` / `burlap()` / `flannel()` / `whiteNoise()` on `<Solid>` or gradient base                                                       |
| **Expected operator controls** | Preset only                                                                                                                                                 |
| **Expected author controls**   | Base colour roles, texture strength, treatment selection                                                                                                    |
| **Reason for inclusion**       | Palette-driven texture without media upload. Potential long-term complement to `grain-field` (inventory) without replacing it in wave one.                  |
| **Overlap with inventory**     | `grain-field`, Texture family (separate product group) — Generated entry must not conflate with `useBackground: "Texture"`                                  |

---

## Later prototype

Worth a targeted spike after the first five prove the adapter and publish pipeline. Not recommended for the first new-preset release.

### 6. `wave-field`

| Field                   | Value                                                                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**      | Large-scale rings, waves, or zigzag fields with slow frame-driven motion.                                                                       |
| **Likely renderer**     | `effects-solid` — `rings()`, `waves()`, `zigzag()`, or `noiseDisplacement()`                                                                    |
| **Expected controls**   | Author-heavy: wavelength, amplitude, direction; operator preset-only                                                                            |
| **Reason for deferral** | Overlaps `wave-noise`, `pulsing-circles`, and Pattern line variants — needs overlap workshop (OVR-02–OVR-06 style) before catalogue ID is fixed |
| **Overlap**             | `wave-noise`, `pulsing-circles`, Pattern `line-field`                                                                                           |

### 7. `brand-geometry-field`

| Field                   | Value                                                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual purpose**      | Coherent animated SVG shape/path field (triangles, sparks, brand marks) rather than one static geometric layout.                                                             |
| **Likely renderer**     | `shapes-paths` — `@remotion/shapes` + `@remotion/paths`, optionally with effects on shapes                                                                                   |
| **Expected controls**   | Author: shape set, density, path evolution; operator: preset-only                                                                                                            |
| **Reason for deferral** | Overlaps `geometric-field`, `triangle-swarm`, `triangle-tile`, `spokes-field`. Consolidation of existing SVG and GridNoise modes is a product decision, not a Remotion spike |
| **Overlap**             | Multiple inventory SVG and GridNoise modes                                                                                                                                   |

### 8. `motion-motif`

| Field                   | Value                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| **Visual purpose**      | Designer-authored Lottie or Rive loop recoloured per club.                                        |
| **Likely renderer**     | `motion-asset` — new adapter; `@remotion/lottie` or `@remotion/rive`                              |
| **Expected controls**   | Author: asset URI, speed, colour remap; operator: preset-only until asset catalogue exists        |
| **Reason for deferral** | Requires asset ingest, versioning, and CMS preview contract — outside Phase 1 consolidation scope |
| **Overlap**             | None with current procedural inventory; adjacent to Animated (passthrough, separate decision)     |

### 9. `reactive-path-system`

| Field                   | Value                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| **Visual purpose**      | Fixture routes, orbit lines, or energy marks built from evolving SVG paths.                  |
| **Likely renderer**     | `shapes-paths` — `@remotion/paths` evolve / interpolate / warp                               |
| **Expected controls**   | Author: path data, warp strength, stroke palette roles                                       |
| **Reason for deferral** | Needs domain content (fixtures, routes) wired into background contract; not a generic preset |
| **Overlap**             | Particle `streak-lines`, Noise `digital-rain` (superficial)                                  |

---

## Experimental

Do not add to the operator catalogue until render parity and product approval.

| ID                    | Visual purpose                                               | Likely renderer                                    | Blocker                                                                          |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `stadium-field-3d`    | Lightweight stadium or pitch depth with particles or ribbons | `three-scene` — `<ThreeCanvas>`                    | Memory, Lambda GPU/software render, determinism                                  |
| `webgpu-material-lab` | TSL / WebGPU procedural materials                            | `three-scene` — experimental `<ThreeWebGPUCanvas>` | Remotion marks experimental; ANGLE/software render config; no production default |

---

## Rejected for this catalogue

| Candidate                                                           | Reason                                                                           |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| HTML-in-canvas post-processed DOM backgrounds                       | Browser API experimental; Chrome flag for Studio — unsuitable as shared contract |
| `@remotion/browser-studio` / `@remotion/canvas`                     | Remotion release notes mark internal/experimental — not a foundation             |
| Standalone `@remotion/light-leaks` / `@remotion/starburst` packages | Deprecated; use `@remotion/effects` equivalents                                  |
| GSAP as primary background clock                                    | Adds animation vocabulary; frame-derived motion is sufficient for backgrounds    |
| Reimplementing all 25 inventory presets on effects in Phase 1       | Violates Phase 1 scope and compatibility plan; adapters must remain              |
| Moving Texture or Luminance presets into Generated                  | Handoff guardrail — separate product groups                                      |
| Moving Animated modes into Generated without product decision       | Animated remains passthrough per `decisions.md`                                  |
| WebGPU `createEffect` as default 2D path                            | Use Canvas 2D / WebGL2 first; WebGPU only after parity spike                     |
| Operator-exposed raw effect parameter dumps                         | Violates small operator control set; author controls only                        |

---

## Relationship to existing inventory (no Phase 1 retirement)

New presets **add** catalogue rows. They do not replace inventory visuals in Phase 1 or in the recommended first wave.

| Provisional long-term relationship | Inventory preset(s)                 | New shortlist ID                   | Product action required                 |
| ---------------------------------- | ----------------------------------- | ---------------------------------- | --------------------------------------- |
| Possible future merge              | `grain-field`, `tv-static`          | `broadcast-halftone`, `paper-club` | Visual audit + OVR-style recommendation |
| Keep distinct                      | `spokes-field`                      | `energy-burst`                     | SVG vs procedural starburst             |
| Keep distinct                      | `gradient-grid`, `tile-grid`        | `signal-grid`                      | Effect stack vs DOM pattern             |
| Overlap workshop needed            | `wave-noise`, `pulsing-circles`     | `wave-field`                       | Defer until prototype                   |
| Overlap workshop needed            | `geometric-field`, `triangle-swarm` | `brand-geometry-field`             | Defer until prototype                   |

Retirement of any inventory preset requires evidence and explicit product approval (OVR-09).

---

## Recommended implementation order (post-Phase 1)

```text
1. Install @remotion/effects@4.0.499 (upgrade Remotion only if a preset needs APIs absent at 4.0.499, e.g. starburst())
2. Render spike (local ANGLE + Lambda swangle) on Solid + single effect
3. `effects-solid` adapter + catalogue publish path
4. Ship `broadcast-halftone` (pipeline proof)
5. Ship `topographic-flow`, `signal-grid`, `energy-burst`, `paper-club` (batch or serial — energy-burst may block on upgrade)
6. Revisit later-prototype tier after operator feedback
```

---

## Open product decision

Handoff item **#5** — user selects from the **first implementation** tier (five presets above) for the first new-preset release, or defers all new presets until after Phase 1 consolidation ships.

| Option                                               | Recommendation                                                                                                  |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **A** — Phase 1 only, defer all new presets          | Aligns with `decisions.md` Phase 1 success criteria                                                             |
| **B** — Phase 1 + `broadcast-halftone` only          | Minimal effects proof on **4.0.499** after `@remotion/effects` install — no core upgrade required               |
| **C** — Phase 1 + full first implementation tier (5) | After effects install and render spike; **likely requires Remotion upgrade** for `starburst()` (`energy-burst`) |

Default engineering stance: **Option A** unless product explicitly chooses B or C.

---

## References

- Research: `.research/generated-backgrounds-discovery.md`
- Catalogue adapters: `.scratch/generated-backgrounds/catalogue-contract.md`
- Inventory: `.scratch/generated-backgrounds/current-preset-inventory.md`
- [Remotion effects](https://www.remotion.dev/docs/effects)
- [Shaders as backgrounds](https://www.remotion.dev/docs/shaders)
- [createEffect](https://www.remotion.dev/docs/create-effect)
- [Motion Design Systems](https://www.remotion.dev/docs/design-systems)
- [HTML-in-canvas rendering guidance (ANGLE / swangle)](https://www.remotion.dev/docs/html-in-canvas)
