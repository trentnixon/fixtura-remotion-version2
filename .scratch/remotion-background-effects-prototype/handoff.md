# Broadcast Halftone Prototype

## Question

Can a palette-driven `@remotion/effects` stack produce a readable Fixtura
broadcast background without changing production catalogue code?

## Run

```bash
npm run prototype:halftone
```

Studio port: `3012`

Compositions: `BroadcastHalftoneWavePrototype`, `TopographicFlowPrototype`,
`TopographicFineMapPrototype`, `TopographicSmoothAmbientPrototype`,
`SignalGridPerspectiveFloorPrototype`,
`SignalGridPerspectiveFloorInvertedPrototype`, `EnergyBurstPrototype`,
`WaveFieldPrototype`, `WaveFieldWideRowsPrototype`,
`WaveFieldVerticalBandsPrototype`, `NeonSweepWideBeamsPrototype`,
`NeonSweepHeavyGlowPrototype`, `ReactivePathSystemPrototype`,
`ReactivePathHitsPrototype`, `MotionMotifPrototype`,
`MotionMotifTiledFieldPrototype`, `StadiumFieldLowSweepPrototype`,
`HtmlInCanvasBroadcastPrototype`, `HtmlInCanvasOrbitRingsPrototype`,
`HtmlInCanvasScoreboardGridPrototype`, `HtmlInCanvasNeonBeamsPrototype`,
`WebGPUMetalWavePrototype`, `WebGPUContourMapPrototype`,
`WebGPUSheenSweepPrototype`, `RiveMotifTiledFieldPrototype`,
`LightLeakWarmFlarePrototype`, `LightLeakCoolFlarePrototype`,
`LightLeakSlowBreathePrototype`, `LightLeakDualFlarePrototype`,
`LightLeakVerticalWashPrototype`, `LightLeakSoftBloomPrototype`

## Animation Option Test Queue

- [ ] Sweep/reveal — rejected; one-shot transition and removed
- [x] Wave distortion — `BroadcastHalftoneWavePrototype`
- [ ] Broadcast scan — rejected; visually unsuitable and removed
- [ ] Noise/grain motion — rejected; visually unsuitable and removed
- [ ] Radial expansion — rejected; visually unsuitable and removed
- [x] Topographic Flow — `TopographicFlowPrototype`, pending visual review
- [ ] Macro Terrain — too similar to the other Topographic variants and removed
- [x] Signal Grid — perspective floor and inverted-grid variants, pending visual review
- [x] Energy Burst — `EnergyBurstPrototype`, fallback stack pending visual review
- [ ] Paper Club — rejected after visual review; all variants removed
- [x] Wave field — baseline, wide-rows, and vertical-band variants, pending visual review
- [ ] Brand geometry field — rejected; incompatible with asset model, removed
- [x] Neon sweep — wide-beams and heavy-glow variants, pending visual review
- [ ] Pixel matrix — rejected; incompatible with asset model, removed
- [x] Reactive path system — orbits and hits variants retained, pending visual review
- [x] Motion motif — baseline and tiled variants retained for future Lottie exploration
- [ ] Animated texture tile — rejected after visual review; too busy for Fixtura backgrounds, removed
- [x] Stadium field 3D — `StadiumFieldLowSweepPrototype` retained as cricket pitch example
- [x] HTML-in-canvas background — broadcast, orbit-rings, scoreboard-grid, and neon-beams retained; soft-blur, halftone-drift, and chevron-scroll removed after review
- [x] WebGPU material lab — metal-wave, contour-map, and sheen-sweep retained; fractal-club-field, radial-pulse, scanline-field, worley-cells, and twist-vortex removed after review
- [x] Rive motif — `RiveMotifTiledFieldPrototype` retained; dense-grid, brick-stagger, mirror, and drift removed after review
- [ ] Light trail — rejected after visual review; beam-sweep and radial-streak removed
- [x] Light leak — all six dual-tone variants retained after visual review

## Loop Requirement

Every accepted animation option must be repeatable as a background loop. Its
frame-driven parameters must return to their starting phase at the loop
boundary. One-shot transitions such as the removed sweep/reveal are excluded.

Wave distortion uses a six-second periodic phase with horizontal displacement.
Frames 0 and 180 rendered identically, confirming the loop boundary.

Topographic Flow uses `liquidContours()` with a twelve-second periodic phase and
passed deterministic frame checks. It remains a test candidate until visual
approval.

## Retained Topographic Flow Demos

- [x] Topographic Flow — baseline
- [x] Fine Map Lines — dense contour detail
- [x] Smooth Ambient Flow — soft, low-detail movement

All three retained demos use the twelve-second loop and rendered as 90-frame
H.264 sequences. Repeated frame-0 renders matched for all three.

## Signal Grid Demo

Signal Grid combines a perspective `gridlines()` layer with restrained
`scanlines()` over the palette gradient. It uses a twelve-second repeating
phase and passed a 90-frame H.264 render with deterministic repeated frame-0
output.

## Signal Grid Variations

- `SignalGridPerspectiveFloorPrototype` — deep floor-plane perspective with
  one-direction vertical movement.
- `SignalGridPerspectiveFloorInvertedPrototype` — the same colours and
  one-direction movement with the floor perspective inverted so larger cells
  sit at the bottom.

Both compositions share the same colours, motion direction, and twelve-second
loop. Only the perspective direction changes between them.

The inverted floor variation keeps the same colours and motion as
`SignalGridPerspectiveFloorPrototype`; it reverses the perspective direction
so the grid converges toward the top instead of the bottom.

## Energy Burst Demo

`EnergyBurstPrototype` is a test-only fallback for the next documented
candidate. It uses `linearGradient()`, `rings()`, `glow()`, and `vignette()` to
test a palette-driven radial energy treatment with a twelve-second loop.

The pinned `@remotion/effects@4.0.499` package does not expose `starburst()` or
`lightLeak()`, so this demo does not claim to validate the full Energy Burst
stack. Those effects remain upgrade-dependent follow-up work.

## Wave Field Demo

`WaveFieldPrototype` uses `linearGradient()`, `zigzag()`, chained `wave()`,
`glow()`, and `vignette()` to test slow ambient wave-field motion. Zigzag band
offset advances in one direction over a twelve-second loop; dual-axis `wave()`
phases use periodic frame-driven values for repeatable displacement.

## Wave Field Variations

- `WaveFieldPrototype` — baseline horizontal zigzag bands
- `WaveFieldWideRowsPrototype` — extra-wide row heights (`thickness: 104`, `gap: 26`)
- `WaveFieldVerticalBandsPrototype` — extra-wide vertical columns (`thickness: 104`, `gap: 26`)

`WaveFieldSoftDriftPrototype` was rejected and removed.

## Neon Sweep Demo

Neon Sweep uses animated `lines()` with `blur()`, `glow()`, and
`chromaticAberration()` over a palette gradient with a twelve-second loop.

## Neon Sweep Variations

- `NeonSweepWideBeamsPrototype` — extra-wide diagonal beams (`thickness: 36`, `gap: 72`)
- `NeonSweepHeavyGlowPrototype` — dense lines with stronger blur, glow, and chroma

Baseline and vertical-rail Neon Sweep variants were rejected and removed.

## Reactive Path System Demo

`ReactivePathSystemPrototype` uses a palette `linearGradient()`, `glow()`,
and `vignette()` base with SVG route marks animated over a twelve-second loop.
Mock paths stand in for future composition-driven fixture routes.

## Reactive Path Variations

- `ReactivePathSystemPrototype` — concentric orbit rings with travelling dashes
- `ReactivePathHitsPrototype` — pulsing hit marks on fixed route paths

`ReactivePathLinesPrototype`, `ReactivePathShapesPrototype`, and
`ReactivePathNumbersPrototype` were rejected and removed.

## Motion Motif Demo

`MotionMotifPrototype` uses `@remotion/lottie` with a designer-style broadcast
motif loop recoloured from the Fixtura base theme. The mock Lottie asset uses
palette-injected stroke and fill colours over a twelve-second loop.

Retained after visual review for follow-up work on the `motion-asset` lane:
ingested designer Lottie/Rive files, asset-ingest contract, and
`linearGradientTint()` recolour paths.

## Motion Motif Variations

- [x] `MotionMotifPrototype` — single centred motif over the palette field
- [x] `MotionMotifTiledFieldPrototype` — repeated motif tiles with staggered playback

## Stadium Field 3D Demo

`StadiumFieldLowSweepPrototype` uses `@remotion/three` with a lightweight cricket
ground, wicket strip markings, and frame-driven low-sweep camera over a
twelve-second loop. Retained as the experimental `three-scene` lane example.

`StadiumFieldOrbitPrototype` was removed after visual review.

## HTML-in-Canvas Background Demo

`HtmlInCanvasBroadcastPrototype` captures live DOM stripe motion into a canvas
via `HtmlInCanvas`, then applies `glow()` and `vignette()` post-processing over
a twelve-second loop. Requires Chrome 149+ with the HTML-in-Canvas flag enabled.
When unsupported, Studio falls back to the same DOM motion with CSS-only finishing.

## HTML-in-Canvas Variations (retained)

- `HtmlInCanvasBroadcastPrototype` — baseline DOM stripe field with glow and vignette
- `HtmlInCanvasOrbitRingsPrototype` — SVG concentric dashed rings orbiting focal point
- `HtmlInCanvasScoreboardGridPrototype` — fixture matrix cells pulsing in staggered waves
- `HtmlInCanvasNeonBeamsPrototype` — wide diagonal beams with chromatic aberration

Removed after review: `HtmlInCanvasSoftBlurPrototype`, `HtmlInCanvasHalftoneDriftPrototype`,
`HtmlInCanvasChevronScrollPrototype`.

Each retained graphic is a pure DOM/SVG layer captured through `HtmlInCanvas`, then finished
with variant-specific `@remotion/effects` post-processing. Chrome 149+ and the
canvas-draw-element flag required for the real path; CSS fallback when unsupported.

## WebGPU Material Lab Demo (retained)

`WebGPUMetalWavePrototype`, `WebGPUContourMapPrototype`, and `WebGPUSheenSweepPrototype`
use `ThreeCanvas` with Three.js `WebGPURenderer` and TSL node materials driven by
`useCurrentFrame()` loop progress. Experimental only — render with `--gl=angle`.
WebGPURenderer falls back to WebGL2 when native WebGPU is unavailable.

Removed after review: `WebGPUFractalClubFieldPrototype`, `WebGPURadialPulsePrototype`,
`WebGPUScanlineFieldPrototype`, `WebGPUWorleyCellsPrototype`, `WebGPUTwistVortexPrototype`.

- `WebGPUMetalWavePrototype` — animated metalness and roughness waves with rim lighting
- `WebGPUContourMapPrototype` — fractal noise banded into topographic contour lines
- `WebGPUSheenSweepPrototype` — horizontal sheen sweep with metallic specular roll

## Rive Motif Demo (retained)

`RiveMotifTiledFieldPrototype` uses `@remotion/rive` over the palette gradient
stack. Mock CDN `.riv` until designer asset ingest is wired.

Removed after review: dense-grid, brick-stagger, mirror, drift, and single-centre baseline.

## Light Leak Demo (retained)

All six compositions use `lightLeak()` from `@remotion/light-leaks` on a
two-colour palette gradient (primary → secondary). Leak hue is derived from
palette roles; `progress` uses a cosine loop for a twelve-second
reveal/retract cycle. Requires WebGL2 — render with `--gl=angle`.

Retained after visual review:
- [x] `LightLeakWarmFlarePrototype` — warm leak keyed to secondary colour
- [x] `LightLeakCoolFlarePrototype` — cool leak keyed to primary colour
- [x] `LightLeakSlowBreathePrototype` — one swell per twelve-second loop
- [x] `LightLeakDualFlarePrototype` — warm and cool leaks offset by half a cycle
- [x] `LightLeakVerticalWashPrototype` — top-to-bottom two-colour wash
- [x] `LightLeakSoftBloomPrototype` — horizontal wash with lighter vignette

## Implementation

- `linearGradient()` creates the Fixtura base-theme colour field.
- `halftoneLinearGradient()` creates the broadcast dot treatment.
- `wave()` creates the repeating horizontal distortion.
- `gridlines()` and `scanlines()` create the Signal Grid test treatment.
- `rings()` and `glow()` create the Energy Burst fallback treatment.
- `zigzag()` and chained `wave()` create the Wave Field test treatment.
- `lines()`, `blur()`, `glow()`, and `chromaticAberration()` create the Neon
  Sweep test treatment.
- SVG orbit paths create the Reactive Path System test treatment.
- `@remotion/lottie` creates the Motion Motif test treatment.
- `@remotion/rive` creates the Rive Motif test treatment.
- `lightLeak()` from `@remotion/light-leaks` creates the Light Leak test treatment.
- `@remotion/three` creates the Stadium Field 3D experimental treatment.
- `HtmlInCanvas` creates the HTML-in-canvas background experimental treatment.
- `WebGPURenderer` and TSL node materials create the WebGPU material lab treatment.
- `vignette()` protects the edges and foreground.
- `useCurrentFrame()` drives slow, deterministic motion parameters.
- The prototype uses the Fixtura base theme colours as an isolated palette fixture.

## Verification

- TypeScript check: passed with `npm run lint`.
- Still render: passed at `1080x1350` with `--gl=angle`.
- Animated render: passed for frames `0-89` as H.264.
- Determinism: repeated frame-0 renders produced identical SHA-256 hashes for
  all retained Topographic demos and the two Signal Grid floor variations.
- Energy Burst: still and 90-frame H.264 fallback renders passed; repeated
  frame-0 renders matched for the retained baseline.
- Wave Field: still and 90-frame H.264 renders passed for retained variants.
- Neon Sweep: still and 90-frame H.264 renders passed for retained variants.
- Reactive Path System: still and 90-frame H.264 renders passed for retained variants.
- Motion Motif: still renders passed for baseline and tiled variants.
- Stadium Field 3D: still render passed for retained low-sweep cricket example.
- HTML-in-Canvas: still renders passed for retained broadcast variants.
- Readability: title, copy, accent label, and panel remain legible in the rendered still.
- Lambda/server render: not run; target credentials and deployment environment were not part of this isolated prototype.
- Memory benchmarking: not measured yet.

## Promotion Gate

Do not add this to the Generated catalogue yet. First verify the same composition
through the target server/Lambda render path, then decide whether to promote it
through an `effects-solid` renderer adapter.

**Production rule:** promoted presets must take background colours from the data
object (`video.appearance.theme` → `selectedPalette` via `ThemeContext`). Prototype
compositions use `baseTheme` as an isolated fixture only.

**Promotion plan:** `.scratch/generated-backgrounds/remotion-prototype-promotion-plan.md`
— preset families, light-leak spec (one operator preset, six internal variants,
stable random selection), phases, and tickets.
