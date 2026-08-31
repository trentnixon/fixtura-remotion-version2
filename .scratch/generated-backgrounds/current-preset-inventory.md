# Current preset inventory

**Date:** 2026-08-28  
**Status:** Approved discovery baseline  
**Brief:** `.scratch/generated-backgrounds/handoff.md`  
**Decisions baseline:** `.scratch/generated-backgrounds/decisions.md`

## Scope

All **26** supported presets in the first Generated consolidation scope:

| Legacy family | Preset count | Notes                                                     |
| ------------- | -----------: | --------------------------------------------------------- |
| Pattern       |            6 | `useBackground: "Pattern"`                                |
| Particle      |            5 | `useBackground: "Particle"`                               |
| Noise         |           15 | `useBackground: "Noise"` or `"Graphics"` via `noise.type` |

**Graphics** is not a separate preset list. It is a legacy wire into the same Noise-pipeline switch as Noise.

**Animated** is outside this inventory.

## Runtime corrections (review)

These six facts correct common assumptions from types, docs, or export maps. They are authoritative for compatibility planning.

| #    | Correction                                                                                                                                                                                   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RC-1 | `useBackground: "Graphics"` and `"Noise"` share one `NoiseBackground` switch. Only `templateVariation.noise.type` selects the preset. There is no `templateVariation.graphics` block.        |
| RC-2 | Missing or unknown `noise.type` under Graphics/Noise resolves to variant `"default"` and renders `GridNoise` with selector defaults (`noiseOpacity` 0.3, `noiseScale` 0.5).                  |
| RC-3 | `noise.type: "graphics"` is listed in `NOISE_VARIANTS` but has **no** `case` in the selector switch. It falls through to the same default `GridNoise` as RC-2 — **not** `GeometricGraphics`. |
| RC-4 | `BackgroundComponents.Graphics` and `BackgroundComponents.Noise.Graphics` point at `GeometricGraphics`, but `SelectTemplateBackground` does not use those export keys for wire routing.      |
| RC-5 | `templateVariation.pattern.opacity` is accepted in `videoData.ts` and external handoff docs, but `PatternBackground` does **not** read it. Runtime opacity is the wrapper default `0.2`.     |
| RC-6 | When `useBackground` selects one family, sibling `noise` / `pattern` / `particle` objects may remain in the payload but are **not** read by the background renderer.                         |

Additional implementation notes (not counted in the six):

- `ParticleNoise` accepts `baseColor` and `particleColor` on its interface and variant wrappers pass them, but the implementation **does not destructure or use** those props. Background uses `selectedPalette.container.gradientPrimaryToSecondaryVertical`; particle fill uses `selectedPalette.container.main`.
- `GrainNoise` passes `noiseColor="ffffff"` (no `#`). Because the string is nonempty, `GridNoise` does not fall back via `noiseColor \|\| "#ffffff"`; the browser receives an invalid CSS colour. **Implementation defect** — visual result unresolved in this inventory.
- `ParticleBackground` does not read `particleSize`, `particleColor`, or `backgroundColor` from `templateVariation.particle`. The wrapper passes `type`, `particleCount`, `speed`, `direction`, and `animation`, but no renderer reads `animation`.

## Payload field legend

Each entry separates:

- **Accepted** — present in `videoData.ts`, sample JSON, or external handoff docs; may be stored by CMS.
- **Affects rendering** — read by `SelectTemplateBackground` or the active family wrapper at runtime.

Fields marked accepted-but-ignored are compatibility hazards for consolidation.

## Routing summary

| `useBackground`   | Discriminator   | Runtime entry                                               |
| ----------------- | --------------- | ----------------------------------------------------------- |
| `Graphics`        | `noise.type`    | `NoiseBackground` in `src/components/backgrounds/index.tsx` |
| `Noise`           | `noise.type`    | Same as Graphics                                            |
| `Pattern`         | `pattern.type`  | `PatternBackground`                                         |
| `Particle`        | `particle.type` | `ParticleBackground`                                        |
| Missing / unknown | —               | `SolidBackground`                                           |

**Pattern** unknown `pattern.type` → `dots`.  
**Particle** unknown `particle.type` → `dots` renderer.

## Type-model drift (not live presets)

| Location                                    | Declared                                                   | Live runtime                                                                   |
| ------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `config/types.ts` `GraphicsBackgroundProps` | `variant`: abstract, geometric, waves, dots, lines, custom | Unused; Graphics uses `noise.type`                                             |
| `config/types.ts` `PatternBackgroundProps`  | `hexagons`, `custom`                                       | Not in `PatternType` union or switch                                           |
| `config/types.ts` `ParticleBackgroundProps` | `custom`                                                   | Not in `ParticleType` union                                                    |
| `config/types.ts` shared noise props        | baseColor, noiseOpacity, noiseScale, … on type             | Not read from `templateVariation`; selector injects palette for Graphics/Noise |

## Discovery surfaces

| Surface                            | Role                    | In-scope exposure today                                                                             |
| ---------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| Fixtura CMS / product UI           | Background operator     | **Unconfirmed** — not in this repo                                                                  |
| `src/templates/registry.tsx`       | Author / dev            | Graphics, Particle, Pattern, Texture, Luminance, … — **not Noise**                                  |
| Remotion Studio / dev compositions | Preset author           | Whatever dataset supplies                                                                           |
| `testData/samples/**`              | Wire-contract evidence  | `Graphics` + `noise.type` in Roster; Pattern/Particle/Noise blocks often present as unused siblings |
| `SelectTemplateBackground`         | Implementation boundary | Graphics, Noise, Pattern, Particle                                                                  |
| `.comms/TEMPLATES.md`, Guide       | External docs           | Registry list narrower than renderer support (Noise supported at runtime, omitted from registry)    |

---

## Pattern family

Shared runtime (`Patterns/index.tsx`):

| Field                                     | Accepted                          | Affects rendering                           |
| ----------------------------------------- | --------------------------------- | ------------------------------------------- |
| `useBackground`                           | `"Pattern"`                       | Yes — selects family                        |
| `pattern.type`                            | Yes                               | Yes — default `dots` if missing             |
| `pattern.scale`                           | Yes                               | Yes — default `1`                           |
| `pattern.rotation`                        | Yes                               | Yes — `null` coerces via `\|\|` to `0`      |
| `pattern.animation`                       | Yes                               | Yes                                         |
| `pattern.animationDuration`               | Yes                               | Yes — passed to pattern component           |
| `pattern.animationSpeed`                  | Yes                               | Yes                                         |
| `pattern.opacity`                         | Yes (`videoData.ts`, Guide §10.6) | **No** — RC-5; wrapper uses `opacity = 0.2` |
| `primaryColor` / `secondaryColor` on type | On shared types only              | **No** — palette only at runtime            |

Palette at runtime: `background.contrast`, `background.gradient.primary` horizontal CSS.  
Readability: none (no scrim/vignette in pattern renderers).

---

### INV-PAT-dots — Pattern / dots

|                   |                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **Inventory key** | `pattern.dots`                                                                                    |
| **Display name**  | Dots (tiled)                                                                                      |
| **Renderer**      | `Patterns/variants/dots.tsx`                                                                      |
| **Defaults**      | type `dots`; scale `1`; rotation `0`; opacity `0.2` (wrapper); animation from config or undefined |
| **Relationships** | **name collision** with Particle `dots` — distinct tiling vs motion                               |
| **Sources**       | `Patterns/index.tsx`, `Patterns/variants/config.ts`, `Patterns/variants/dots.tsx`                 |

### INV-PAT-lines — Pattern / lines

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Inventory key** | `pattern.lines`                          |
| **Renderer**      | `Patterns/variants/lines.tsx`            |
| **Relationships** | **name collision** with Particle `lines` |
| **Sources**       | `Patterns/variants/lines.tsx`            |

### INV-PAT-grid — Pattern / grid

|                   |                                                                    |
| ----------------- | ------------------------------------------------------------------ |
| **Inventory key** | `pattern.grid`                                                     |
| **Renderer**      | `Patterns/variants/grid.tsx`                                       |
| **Relationships** | **related** to Noise `gradientGrid` (grid motif; different engine) |
| **Sources**       | `Patterns/variants/grid.tsx`                                       |

### INV-PAT-crosshatch — Pattern / crosshatch

|                   |                                           |
| ----------------- | ----------------------------------------- |
| **Inventory key** | `pattern.crosshatch`                      |
| **Renderer**      | `Patterns/variants/CrosshatchPattern.tsx` |
| **Relationships** | **distinct**                              |
| **Sources**       | `Patterns/variants/CrosshatchPattern.tsx` |

### INV-PAT-triangles — Pattern / triangles

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Inventory key** | `pattern.triangles`                      |
| **Renderer**      | `Patterns/variants/TrianglesPattern.tsx` |
| **Relationships** | **related** to Noise `triangleSwarm`     |
| **Sources**       | `Patterns/variants/TrianglesPattern.tsx` |

### INV-PAT-chevron — Pattern / chevron

|                   |                                        |
| ----------------- | -------------------------------------- |
| **Inventory key** | `pattern.chevron`                      |
| **Renderer**      | `Patterns/variants/ChevronPattern.tsx` |
| **Relationships** | **distinct**                           |
| **Sources**       | `Patterns/variants/ChevronPattern.tsx` |

**Pattern animations (all six):** `none`, `panUp`, `panDown`, `panLeft`, `panRight`, `rotate`, `pulse` (`ANIMATION_TYPES`).

| Preset              | Readability policy                       | Palette behavior                                                                                     |
| ------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| All Pattern entries | `{ status: "resolved", policy: "none" }` | `{ status: "resolved", mode: "active-palette" }` — background contrast + primary horizontal gradient |

---

## Particle family

Shared runtime (`Particles/index.tsx`):

| Field                      | Accepted             | Affects rendering                                                 |
| -------------------------- | -------------------- | ----------------------------------------------------------------- |
| `useBackground`            | `"Particle"`         | Yes                                                               |
| `particle.type`            | Yes                  | Yes — default `dots`                                              |
| `particle.particleCount`   | Yes                  | Yes — default `300`; string values in samples coerce in loops     |
| `particle.speed`           | Yes                  | Yes — default `1`                                                 |
| `particle.direction`       | Yes                  | Yes — default `random`                                            |
| `particle.animation`       | Yes                  | **No, accepted but ignored** — passed to renderers; none reads it |
| `particle.particleSize`    | On types / component | **No** — not read from templateVariation                          |
| `particle.particleColor`   | On types / component | **No** — palette `background.contrast`                            |
| `particle.backgroundColor` | On types             | **No** — palette `background.gradient.primaryRadial`              |

Readability: none.

---

### INV-PAR-dots — Particle / dots

|                   |                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `particle.dots`                                                                                                             |
| **Renderer**      | `Particles/variants/DotsRenderer.tsx`                                                                                       |
| **Defaults**      | count `300`, speed `1`, direction `random`, animation `fade`; component-level default count `100` if called without wrapper |
| **Relationships** | **name collision** with Pattern `dots`; **related** to Noise `floatingParticles` / `dynamicParticles`                       |
| **Sources**       | `Particles/index.tsx`, `Particles/config.ts`, `DotsRenderer.tsx`                                                            |

### INV-PAR-lines — Particle / lines

|                   |                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Inventory key** | `particle.lines`                                                                                                                           |
| **Renderer**      | `LinesRenderer.tsx`                                                                                                                        |
| **Palette note**  | Wrapper supplies `particleColor` from `background.contrast`, but the renderer ignores it and uses `selectedPalette.text.onContainer.light` |
| **Relationships** | **name collision** with Pattern `lines`                                                                                                    |
| **Sources**       | `LinesRenderer.tsx`                                                                                                                        |

### INV-PAR-bubbles — Particle / bubbles

|                   |                       |
| ----------------- | --------------------- |
| **Inventory key** | `particle.bubbles`    |
| **Renderer**      | `BubblesRenderer.tsx` |
| **Relationships** | **distinct**          |
| **Sources**       | `BubblesRenderer.tsx` |

### INV-PAR-snow — Particle / snow

|                   |                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `particle.snow`                                                                                                                         |
| **Renderer**      | `SnowRenderer.tsx`                                                                                                                      |
| **Palette note**  | Particle fill is hardcoded `white` in the DOM (`backgroundColor` and box shadow), regardless of `particleColor` supplied by the wrapper |
| **Relationships** | **distinct**                                                                                                                            |
| **Sources**       | `SnowRenderer.tsx`                                                                                                                      |

### INV-PAR-confetti — Particle / confetti

|                   |                        |
| ----------------- | ---------------------- |
| **Inventory key** | `particle.confetti`    |
| **Renderer**      | `ConfettiRenderer.tsx` |
| **Relationships** | **distinct**           |
| **Sources**       | `ConfettiRenderer.tsx` |

| Preset                  | Readability policy                       | Palette behavior                                                                                                                                             |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dots, bubbles, confetti | `{ status: "resolved", policy: "none" }` | `{ status: "resolved", mode: "active-palette" }` — `background.contrast` particles + `background.gradient.primaryRadial` background                          |
| lines                   | resolved `none`                          | `{ status: "resolved", mode: "active-palette" }` — background from primaryRadial; particle stroke uses `text.onContainer.light`, not wrapper `particleColor` |
| snow                    | resolved `none`                          | `{ status: "resolved", mode: "active-palette" }` for background (primaryRadial); particle fill is **fixed white** in the renderer, not palette-driven        |

---

## Noise family (includes Graphics wire)

Shared ingress: `useBackground: "Noise" | "Graphics"` + `noise: { type: "<NoiseVariant>" }`.

| Field                                                | Accepted                  | Affects rendering                                                                                |
| ---------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `useBackground`                                      | `"Noise"` or `"Graphics"` | Yes — same switch (RC-1)                                                                         |
| `noise.type`                                         | Yes                       | Yes — default `"default"` if missing (RC-2)                                                      |
| `noise.baseColor`, `noiseOpacity`, … on shared types | On `NoiseBackgroundProps` | **No** from payload — selector injects `background.main` / `background.accent` for most variants |
| Sibling `pattern` / `particle` blocks                | Often in samples          | **No** when Graphics/Noise active (RC-6)                                                         |

Selector-injected props for most GridNoise variants: `baseColor = palette.background.main`, `noiseColor = palette.background.accent`.

---

### INV-NOI-default — Noise / default

|                        |                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Inventory key**      | `noise.default`                                                                                                                      |
| **Display name**       | Default Noise                                                                                                                        |
| **Legacy payloads**    | `noise.type: "default"`; implicit when `noise.type` missing under Graphics/Noise (RC-2)                                              |
| **Renderer**           | `GridNoise.tsx` — selector default branch: opacity `0.3`, scale `0.5`                                                                |
| **Author-tuned props** | GridNoise: gridSize, cellShape, noiseSpeed, noiseDimension, blur, gradient overrides                                                 |
| **Relationships**      | **alias target** of accidental `graphics` type (RC-3); **related** to subtle/grain/wave/fog/static/pulsingCircles (GridNoise family) |
| **Sources**            | `index.tsx` default case, `GridNoise.tsx`, `config.ts`                                                                               |

### INV-NOI-subtle — Noise / subtle

|                   |                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Inventory key** | `noise.subtle`                                                                       |
| **Renderer**      | `SubtleNoise` → GridNoise (opacity `0.05`, scale `0.5`, speed `0.02`, 3d, grid `10`) |
| **Relationships** | **related** — GridNoise family                                                       |
| **Sources**       | `SubtleNoise.tsx`                                                                    |

### INV-NOI-grain — Noise / grain

|                   |                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `noise.grain`                                                                                                                                                                                                              |
| **Renderer**      | `GrainNoise` → GridNoise (opacity `0.02`, scale `1`, speed `0.001`, 2d, grid `100`, `noiseColor="ffffff"`)                                                                                                                 |
| **Note**          | **Implementation defect:** `noiseColor="ffffff"` (no `#`) is nonempty, so `GridNoise` does not apply the `\|\| "#ffffff"` fallback. Browser receives an invalid CSS colour; visual result **unresolved** in this inventory |
| **Sources**       | `GrainNoise.tsx`                                                                                                                                                                                                           |

### INV-NOI-wave — Noise / wave

|                   |                                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| **Inventory key** | `noise.wave`                                                                    |
| **Renderer**      | `WaveNoise` → GridNoise (opacity `0.2`, scale `2`, speed `0.03`, 2d, grid `15`) |
| **Sources**       | `WaveNoise.tsx`                                                                 |

### INV-NOI-fog — Noise / fog

|                   |                                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| **Inventory key** | `noise.fog`                                                                       |
| **Renderer**      | `FogNoise` → GridNoise (opacity `0.15`, scale `0.7`, speed `0.01`, 3d, grid `10`) |
| **Sources**       | `FogNoise.tsx`                                                                    |

### INV-NOI-static — Noise / static

|                   |                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Inventory key** | `noise.static`                                                                     |
| **Renderer**      | `StaticNoise` → GridNoise (opacity `0.3`, scale `10`, speed `0.05`, 2d, grid `15`) |
| **Sources**       | `StaticNoise.tsx`                                                                  |

### INV-NOI-floatingParticles — Noise / floatingParticles

|                   |                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Inventory key** | `noise.floatingParticles`                                                                                          |
| **Renderer**      | `FloatingParticles` → `ParticleNoise` (speed `0.015`, radius `10`, maxOffset `60`, grid `30×30`, shape `circle`)   |
| **Payload**       | Only `noise.type` affects rendering; wrapper passes `baseColor`/`particleColor` but **ParticleNoise ignores them** |
| **Sample**        | `Cricket_Roster.json`: `useBackground: "Graphics"`, `noise.type: "floatingParticles"`                              |
| **Relationships** | **related** to Particle family and `dynamicParticles`                                                              |
| **Sources**       | `FloatingParticles.tsx`, `ParticleNoise.tsx`                                                                       |

### INV-NOI-dynamicParticles — Noise / dynamicParticles

|                   |                                                                                |
| ----------------- | ------------------------------------------------------------------------------ |
| **Inventory key** | `noise.dynamicParticles`                                                       |
| **Renderer**      | `DynamicParticles` → `ParticleNoise` (speed `0.015`, radius `4`, grid `10×15`) |
| **Payload**       | Same ParticleNoise color behavior as floatingParticles                         |
| **Sources**       | `DynamicParticles.tsx`                                                         |

### INV-NOI-triangleSwarm — Noise / triangleSwarm

|                   |                                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| **Inventory key** | `noise.triangleSwarm`                                                            |
| **Renderer**      | `TriangleSwarm` → `ParticleNoise` (triangle shape, speed `0.007`, grid `30×30`)  |
| **Payload**       | Passes `particleColor: background.light` but ParticleNoise uses `container.main` |
| **Relationships** | **related** to Pattern `triangles`                                               |
| **Sources**       | `TriangleSwarm.tsx`                                                              |

### INV-NOI-pulsingCircles — Noise / pulsingCircles

|                   |                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `noise.pulsingCircles`                                                                                      |
| **Renderer**      | `PulsingCircles` → GridNoise (`cellShape: circle`, opacity `0.2`, scale `1.5`, speed `0.01`, 3d, grid `15`) |
| **Relationships** | **related** to dot motifs in Pattern/Particle                                                               |
| **Sources**       | `PulsingCircles.tsx`                                                                                        |

### INV-NOI-digitalRain — Noise / digitalRain

|                   |                                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| **Inventory key** | `noise.digitalRain`                                                       |
| **Renderer**      | `DigitalRain` → `ParticleNoise` (line shape, speed `0.005`, grid `25×25`) |
| **Sources**       | `DigitalRain.tsx`                                                         |

### INV-NOI-gradientGrid — Noise / gradientGrid

|                   |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `noise.gradientGrid`                                                                                                       |
| **Renderer**      | `GradientGrid` → GridNoise with `startColor`/`endColor` from `background.accent` / `background.main`, blur `50`, grid `25` |
| **Relationships** | **related** to Pattern `grid`                                                                                              |
| **Sources**       | `GradientGrid.tsx`                                                                                                         |

### INV-NOI-graphics — Noise / graphics ⚠️

|                    |                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Inventory key**  | `noise.graphics`                                                                                                       |
| **Display name**   | Animated Graphics (registry label)                                                                                     |
| **Listed in**      | `NOISE_VARIANTS`                                                                                                       |
| **Actual runtime** | **RC-3** — no switch case; renders **default `GridNoise`**, not `GeometricGraphics`                                    |
| **Export drift**   | **RC-4** — `BackgroundComponents.Noise.Graphics = GeometricGraphics` unused for this wire value                        |
| **Relationships**  | **alias** (unintended) to `noise.default`; **name collision** with product term “Graphics” and with `geometric` intent |
| **Sources**        | `config.ts`, `index.tsx`, `BackgroundComponents` map                                                                   |

### INV-NOI-geometric — Noise / geometric

|                   |                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| **Inventory key** | `noise.geometric`                                                                                            |
| **Display name**  | Geometric Graphics                                                                                           |
| **Legacy**        | Graphics or Noise + `noise.type: "geometric"`                                                                |
| **Renderer**      | `GeometricGraphics` → `GraphicsBackground` (density `medium`, speed `0.3`, opacity `0.7`)                    |
| **Palette**       | Selector passes `background.main`, `background.accent`, `container.secondary`, `container.accent`            |
| **Relationships** | **alias** across Graphics/Noise wires; **distinct** from broken `graphics` type and from Pattern `triangles` |
| **Sources**       | `GeometricGraphics.tsx`, `GraphicsBackground.tsx`, `index.tsx` case `geometric`                              |

### INV-NOI-spokes — Noise / spokes

|                   |                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Inventory key** | `noise.spokes`                                                                                                              |
| **Display name**  | Spokes Graphics                                                                                                             |
| **Legacy**        | Graphics or Noise + `noise.type: "spokes"`                                                                                  |
| **Renderer**      | `SpokesGraphics` + SVG intro/content                                                                                        |
| **Payload**       | `noise.type` plus **effective** reads of `templateVariation.gradient.type` and `gradient.direction` for background gradient |
| **Palette**       | `selectedPalette.background.gradient` with hardcoded fallback gradient if missing                                           |
| **Relationships** | **alias** across Graphics/Noise wires                                                                                       |
| **Sources**       | `SpokesGraphics.tsx`, `variants/svg/spokes/*`                                                                               |

| Preset group                                                                                               | Readability policy                       | Palette behavior                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GridNoise family excluding grain (default, subtle, wave, fog, static, pulsingCircles, graphics accidental) | `{ status: "resolved", policy: "none" }` | `{ status: "resolved", mode: "active-palette" }` — `background.main` + `background.accent`                                                                         |
| grain                                                                                                      | `{ status: "resolved", policy: "none" }` | `{ status: "unresolved", note: "Invalid noiseColor implementation defect" }`                                                                                       |
| ParticleNoise family (floating, dynamic, triangleSwarm, digitalRain)                                       | `{ status: "resolved", policy: "none" }` | `{ status: "resolved", mode: "active-palette" }` — `container.gradientPrimaryToSecondaryVertical` + `container.main` (selector-injected background colors ignored) |
| gradientGrid                                                                                               | resolved `none`                          | resolved `active-palette` — accent/main gradient                                                                                                                   |
| geometric                                                                                                  | resolved `none`                          | resolved `active-palette` — background + container roles                                                                                                           |
| spokes                                                                                                     | resolved `none`                          | resolved `active-palette` — palette gradient + templateVariation gradient                                                                                          |

---

## Overlap index (factual)

| A                                | B                             | Relationship           | Evidence                         |
| -------------------------------- | ----------------------------- | ---------------------- | -------------------------------- |
| Graphics wire + any `noise.type` | Noise wire + same type        | **alias**              | RC-1; same switch                |
| `noise.graphics`                 | `noise.default`               | **alias** (unintended) | RC-3                             |
| Pattern `dots`                   | Particle `dots`               | **name collision**     | Tiled SVG vs moving particles    |
| Pattern `lines`                  | Particle `lines`              | **name collision**     | Distinct renderers               |
| Pattern `triangles`              | `triangleSwarm`               | **related**            | Motif only                       |
| Pattern `grid`                   | `gradientGrid`                | **related**            | Motif only                       |
| Noise particle modes             | Particle family               | **related**            | ParticleNoise vs `Particles/*`   |
| `noise.geometric`                | types.ts Graphics `geometric` | **related** / drift    | Live path uses `noise.type` only |
| `Noise.Graphics` export          | `noise.graphics` wire         | **mismatch**           | RC-4 vs RC-3                     |

## Count confirmation

| Family    | Entries | Keys                                                                                                                                                                  |
| --------- | ------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern   |       6 | dots, lines, grid, crosshatch, triangles, chevron                                                                                                                     |
| Particle  |       5 | dots, lines, bubbles, snow, confetti                                                                                                                                  |
| Noise     |      15 | default, subtle, grain, wave, fog, static, floatingParticles, dynamicParticles, triangleSwarm, pulsingCircles, digitalRain, gradientGrid, graphics, geometric, spokes |
| **Total** |  **26** | Each listed exactly once                                                                                                                                              |

Graphics legacy wire is covered by Noise-pipeline entries (dual ingress on `geometric`, `spokes`, and all Noise modes).

## Unknowns and gaps

1. **CMS visibility** — which presets and legacy categories are operator-selectable today: **unconfirmed** (parallel task in `decisions.md`).
2. Production frequency of `noise.type: "graphics"` and whether operators expect GeometricGraphics.
3. No `testData/samples` file uses `useBackground: "Pattern"`, `"Particle"`, or `"Noise"` alone; Pattern/Particle/Noise blocks appear as siblings under other `useBackground` values (RC-6 evidence).
4. External Guide documents `pattern.opacity` as configurable; runtime ignores it (RC-5).
5. Template registry omits Noise while renderer and Guide support it — author discovery gap.

## Consolidation scope statement

All 26 entries above are in scope for the Generated catalogue. Noise modes are first-class presets, not an appendix. Animated remains outside this inventory.
