# Remotion background options and integrations

**Date:** 2026-08-30  
**Status:** Research reference  
**Scope:** Generated background layers for Fixtura  
**Implementation status:** Research and test-only prototyping. No production
catalogue or CMS promotion is authorized by this document.

An isolated Broadcast Halftone prototype now lives at
`.scratch/remotion-background-effects-prototype/`. It uses the current
Remotion `4.0.499` baseline and does not add a Generated catalogue entry.

The current test selection retains the repeating Wave distortion option and
three Topographic Flow demos. Signal Grid is the current additional test
candidate. Sweep/reveal, Broadcast scan, Noise/grain motion, Radial expansion,
and Macro Terrain were rejected or removed for this prototype.

## Purpose

Document the current Remotion options for creating generated background layers and identify which ones fit Fixtura's background catalogue.

The intended product model remains:

```text
Background
└── Generated
    └── Named visual preset
        └── Renderer adapter
```

An operator chooses a visual result such as "Broadcast Halftone" or "Topographic Flow". The catalogue decides whether the preset uses Remotion Effects, existing SVG, particles, Lottie, Rive, Skia, or Three.js.

## Current Fixtura baseline

The repository already has a Generated catalogue containing 25 existing visuals:

- six tiled pattern presets
- five particle-field presets
- eight GridNoise presets
- four ParticleNoise presets
- one geometric SVG preset
- one radial spokes SVG preset

The existing catalogue and compatibility plan are the sources for those 25 visuals:

- `src/components/backgrounds/variants/Generated/catalogue/catalogue.ts`
- `.scratch/generated-backgrounds/compatibility-plan.md`
- `.scratch/generated-backgrounds/remotion-options.md`
- `.scratch/generated-backgrounds/handoff.md`

The first consolidation keeps the existing `Graphics`, `Pattern`, `Particle`, and `Noise` wire values for compatibility. New Generated work should use catalogue IDs and renderer adapters rather than adding more operator-facing implementation categories.

Installed and relevant today:

- `@remotion/noise`
- `@remotion/effects@4.0.499` (isolated prototype dependency)
- `@remotion/shapes`
- `@remotion/paths`
- `@remotion/lottie`
- `@remotion/rive`
- TailwindCSS

Not currently installed:

- `@remotion/three`
- `@remotion/skia`
- `@remotion/gsap`
- `@remotion/gif`

The project is pinned to Remotion `4.0.499`. The Effects API is documented as available from `4.0.464`, but each chosen effect still needs to be checked against the installed package version.

## Remotion Effects API

`@remotion/effects` applies pixel effects to canvas-based components. Supported targets include:

- `Solid`
- `Img`
- `CanvasImage`
- `Video`
- `AnimatedImage`
- `Gif`
- `RemotionRiveCanvas`
- `HtmlInCanvas`
- Remotion shape components such as `Circle`, `Rect`, `Triangle`, `Star`, `Ellipse`, `Pie`, `Polygon`, `Heart`, and `Arrow`

Effects are passed in an ordered `effects` array. The order affects the result. This makes an effect stack suitable for a background made from a base fill, pattern, motion treatment, colour correction, and readability finish.

The package can be added with:

```bash
npx remotion add @remotion/effects
```

Primary reference: [@remotion/effects](https://www.remotion.dev/docs/effects/api)

### Base and gradient effects

`linearGradient()` creates a gradient layer from two colours. It is suitable for a new palette-driven base.

Useful controls:

- start position
- end position
- start colour
- end colour

`linearGradientTint()` applies a gradient tint to existing pixels while preserving their source detail and alpha. It is suitable for image, texture, and motion-asset recolouring.

These are different operations:

- use `linearGradient()` to create a gradient
- use `linearGradientTint()` to recolour an existing layer

The current Effects API does not expose a native `radialGradient()` function. Radial looks can use `rings()`, an existing CSS/SVG gradient, or a custom effect.

References:

- [linearGradient()](https://www.remotion.dev/docs/effects/linear-gradient)
- [linearGradientTint()](https://www.remotion.dev/docs/effects/linear-gradient-tint)

### Pattern effects

The Effects package can create pattern layers without manually rendering a large DOM grid.

`halftone()`:

- maps source luminance into circles, squares, or lines
- supports spacing, shape, rotation, offsets, inversion, and source or solid colour
- suits printed, retro, and broadcast looks

`halftoneLinearGradient()`:

- changes dot size across a linear gradient
- supports dot sizes, gradient positions, grid size, colour mode, dot colour, and alpha masking
- suits a palette-driven Broadcast Halftone preset

`dotGrid()`:

- creates evenly spaced source-colour dots
- can reveal the source through dots or invert the dot mask

`lines()`:

- creates alternating directional stripes
- supports colours, direction, thickness, gap, angle, offset, and source-alpha masking

`gridlines()`:

- creates a rectangular grid
- supports grid size, line width, line colour, background colour, rotation, X/Y plane rotation, perspective, X/Y offsets, and source-alpha masking
- supports flat grids and perspective-floor treatments

Other useful pattern generators include:

- `checkerboard()`
- `rings()`
- `zigzag()`
- `starburst()`

References:

- [halftone()](https://www.remotion.dev/docs/effects/halftone)
- [halftoneLinearGradient()](https://www.remotion.dev/docs/effects/halftone-linear-gradient)
- [dotGrid()](https://www.remotion.dev/docs/effects/dot-grid)
- [lines()](https://www.remotion.dev/docs/effects/lines)
- [gridlines()](https://www.remotion.dev/docs/effects/gridlines)
- [rings()](https://www.remotion.dev/docs/effects/rings)
- [starburst()](https://www.remotion.dev/docs/effects/starburst)

### Organic and animated effects

`liquidContours()` creates broad, warped, alternating colour bands. Its `phase` can be advanced from `useCurrentFrame()` to create a slow topographic flow.

`wave()` displaces the source with a travelling wave. It supports phase, direction, amplitude, and wavelength. Two calls can be chained for movement on both axes.

`noise()` adds deterministic procedural noise. It supports amount, seed, and premultiplication. Animating the seed or another frame-derived value changes the noise over time.

`lightLeak()` creates a WebGL2 light-leak overlay. It supports:

- `seed` for the leak shape
- `hueShift` for colour
- `progress` for reveal and retract
- `disabled`

The effect does not animate by itself. `progress` must come from `useCurrentFrame()`, `interpolate()`, or input props. The older standalone light-leaks package is not the preferred path for new work.

`evolve()` reveals a layer from the left, right, top, or bottom with an optional feathered edge. It is useful for intros, wipes, and background entrances.

References:

- [liquidContours()](https://www.remotion.dev/docs/effects/liquid-contours)
- [wave()](https://www.remotion.dev/docs/effects/wave)
- [noise()](https://www.remotion.dev/docs/effects/noise)
- [lightLeak()](https://www.remotion.dev/docs/effects/light-leak)
- [evolve()](https://www.remotion.dev/docs/effects/evolve)

### Transform and texture effects

These effects change how a generated or asset-backed layer is arranged:

- `scale()` expands or contracts a layer
- `tile()` repeats a transparent source, with optional mirroring
- `blur()` softens a layer
- `linearProgressiveBlur()` creates directional focus
- `radialProgressiveBlur()` creates centre-to-edge focus
- `fisheye()` creates a lens treatment
- `barrelDistortion()` curves the image
- `pixelate()` creates a block or mosaic look

`scale()` followed by `tile()` is useful for repeating a texture or motion asset across the full composition.

### Lighting, finishing, and colour effects

The package also provides finishing passes:

- `brightness()`
- `contrast()`
- `saturation()`
- `hue()`
- `grayscale()`
- `invert()`
- `tint()`
- `vignette()`
- `glow()`
- `shine()`
- `scanlines()`
- `chromaticAberration()`
- `speckle()`
- `outline()`

For predictable colour correction, the documented order is:

```text
brightness → contrast → saturation → hue
```

These effects can be used to create controlled variations of one background without creating a new renderer for every colour or texture treatment.

### Custom effects

`createEffect()` is the extension point for Fixtura-specific rendering. It supports:

- Canvas 2D
- WebGL2
- WebGPU

A custom effect could implement:

- a Fixtura palette map
- club-colour contour fields
- a protected readability treatment
- a brand-specific particle or line field
- a custom radial or multi-stop gradient

Custom effects can define an `InteractivitySchema`, allowing their parameters to appear in Remotion Studio.

Reference: [`createEffect()`](https://www.remotion.dev/docs/create-effect)

## Third-party integration options

The Remotion integration rule is that animation must remain synchronized with `useCurrentFrame()`. An external library is suitable when its state can be derived from the Remotion frame or baked into frame-addressable data.

### Three.js through `@remotion/three`

Best for:

- low-poly stadium fields
- camera flyovers
- 3D particle tunnels
- depth-based light beams
- floating club shapes
- ribbons and meshes

Use `ThreeCanvas` and drive scene changes declaratively from `useCurrentFrame()`. Do not rely on an uncontrolled React Three Fiber render loop.

`ThreeCanvas` is a later-stage option because it needs render, memory, and software-GPU testing.

References:

- [ThreeCanvas](https://www.remotion.dev/docs/three-canvas)
- [Remotion third-party integrations](https://www.remotion.dev/docs/third-party)

### React Native Skia through `@remotion/skia`

Best for:

- custom 2D drawing
- painted textures
- high-volume particles
- masks and compositing
- 2D effects that are awkward in SVG or DOM

Skia is a possible replacement for some current DOM-heavy noise and particle renderers, but it should earn that role through a targeted prototype and render benchmark.

### Lottie through `@remotion/lottie`

Best for designer-authored motion:

- animated club marks
- reusable broadcast packages
- sponsor-safe loops
- art-directed light streaks
- branded background motifs

This package is already installed. It is an asset-backed lane, not a replacement for procedural backgrounds.

### Rive through `@remotion/rive`

Best for:

- vector animations
- stateful motion
- reusable club assets
- parameterized branded illustrations

This package is already installed. It is useful when the design needs authored vector behaviour or a state machine.

### GSAP through `@remotion/gsap`

Best for complex sequencing:

- multi-stage reveals
- coordinated background transitions
- complex easing
- timelines shared with an existing GSAP design system

GSAP is an animation orchestration layer. It does not provide the background visual by itself. Fixtura should prefer native frame-derived motion unless a sequence is genuinely difficult to express with `interpolate()`, `spring()`, and `Easing`.

### GIF through `@remotion/gif`

Best for:

- simple pre-rendered loops
- existing animated textures
- rapid visual experiments

GIFs are less suitable for palette-aware Fixtura presets because their pixels are already authored and their controls are limited. Remote GIFs also need CORS support.

### Anime.js

Remotion links to a community example rather than a dedicated official integration package. It may be useful when an existing design already uses Anime.js, but it should not become Fixtura's default animation clock.

### CSS animations and TailwindCSS

Tailwind is suitable for styling and layout. It does not replace frame-based animation.

Remotion documents a way to synchronize CSS animation playback, but ordinary CSS keyframes, transitions, and timers can produce incorrect or flickering output because Remotion renders frames independently. Generated background motion should generally derive from `useCurrentFrame()` and apply values through styles or effect parameters.

### Vidstack

Vidstack has a Remotion provider for playback. It may be useful for a media preview surface, but it is not a generated graphics renderer and does not add a new background-generation capability.

### Integrations without direct support

The current Remotion integration page does not list direct integrations for:

- Framer Motion
- Matter.js
- `react-spring`
- Reanimated

Remotion provides `interpolate()`, `spring()`, and `Easing` for common animation needs. A physics library such as Matter.js could be used through a custom baked simulation, but that would need a separate design and determinism check.

## Candidate Fixtura backgrounds

### Candidate options

#### Broadcast Halftone

Suggested stack:

```text
linearGradient → halftoneLinearGradient → vignette
```

Use for broadcast scorecards, retro sports graphics, and strong club-colour identity.

Why first:

- small implementation surface
- clear visual result
- palette-aware
- close to existing dot and grid concepts
- proves the Effects adapter and WebGL render path

### Current prototype result

The retained test compositions are:

```text
linearGradient → halftoneLinearGradient → wave → vignette
liquidContours → glow → vignette
```

`BroadcastHalftoneWavePrototype` uses a six-second periodic phase and was
verified with still and short animation renders. Frames 0 and 180 matched,
confirming repeatable loop behaviour.

`TopographicFlowPrototype`, `TopographicFineMapPrototype`, and
`TopographicSmoothAmbientPrototype` use twelve-second periodic phases. Each
passed still and short animation rendering with deterministic repeated frames.
`TopographicMacroTerrainPrototype` was removed because it was too similar to
the other Topographic demos.

The Signal Grid test now keeps two test-only compositions using
`linearGradient → gridlines → scanlines → vignette` with a twelve-second
periodic phase: a deep perspective floor and the same floor perspective
inverted so larger grid areas sit at the bottom. Both use the same palette and
one-direction movement and remain pending visual review.

`EnergyBurstPrototype` is retained as the sole Energy Burst demo for now. It
uses the available `linearGradient → rings → glow → vignette` fallback stack
with a twelve-second radial loop. It is a visual spike only; the pinned
baseline does not expose `starburst()` or `lightLeak()`, so the full Energy
Burst proposal remains upgrade-dependent.

`WaveFieldPrototype` is retained with three test compositions pending visual
review: baseline, extra-wide horizontal rows, and extra-wide vertical bands.
The soft-drift variant was rejected and removed.

`NeonSweepWideBeamsPrototype` and `NeonSweepHeavyGlowPrototype` are retained
pending visual review. Baseline and vertical-rail Neon Sweep variants were
rejected and removed.

`PixelMatrixPrototype` was rejected and removed. `ReactivePathSystemPrototype`
is the current active prototype candidate.

The following options were rejected and removed from the prototype:

- Sweep/reveal — one-shot transition; not a repeatable background loop.
- Broadcast scan — visually unsuitable for this treatment.
- Noise/grain motion — visually unsuitable for this treatment.
- Radial expansion — visually unsuitable for this treatment.
- Macro Terrain — too similar to the retained Topographic demos.
- Paper Club — visually unsuitable after prototype review; static, grain-drift,
  heritage-shine, and soft-warp variants removed.
- Wave Field soft drift — visually unsuitable; finer-band variant removed.
- Brand geometry field — incompatible with the asset model after prototype review;
  removed.
- Neon Sweep baseline and vertical rails — rejected after visual review; removed.
- Pixel matrix — incompatible with the asset model after prototype review;
  removed.
- Animated texture tile — too busy for Fixtura backgrounds after prototype review;
  removed.
- Light trail — rejected after visual review; beam-sweep and radial-streak removed.

#### Topographic Flow

Suggested stack:

```text
liquidContours → glow or vignette
```

Use for premium ambient backgrounds and intro sequences. Animate contour phase from the frame.

#### Signal Grid

Suggested stack:

```text
linearGradient → gridlines → scanlines → vignette
```

Use for scoreboard, technology, and live-broadcast treatments. Keep the grid and scanlines restrained so text remains readable.

The isolated prototype currently retains two directions:

- `SignalGridPerspectiveFloorPrototype` — deep floor-plane perspective with
  one-direction vertical movement.
- `SignalGridPerspectiveFloorInvertedPrototype` — the same colours and
  one-direction movement with the floor perspective inverted so larger cells
  sit at the bottom.

#### Energy Burst

Suggested stack:

```text
starburst → rings or glow → lightLeak
```

Use for wins, highlights, transitions, and high-energy intros.

The `starburst()` export must be checked against the project's pinned Remotion version before this preset is selected for implementation.

The local `@remotion/effects@4.0.499` package does not export `starburst()` or
`lightLeak()`. Treat both as upgrade-dependent candidates rather than
available effects for the current prototype baseline. The isolated
`EnergyBurstPrototype` uses `rings()` and `glow()` to test the visual direction
without changing the pinned dependency.

#### Paper Club

Suggested stack:

```text
linearGradient → paper or noise texture → speckle → vignette
```

Use for traditional, heritage, and less digital club styles. Keep this separate from uploaded Texture backgrounds in the product model.

Prototype review rejected this direction. Static and animated Paper Club test
compositions did not produce a usable heritage background in the isolated Studio
demos, so they were removed from the prototype registry. The concept may still
be worth revisiting through uploaded Texture backgrounds rather than procedural
`paper()` stacks.

#### Wave Field

Suggested stack:

```text
linearGradient → zigzag or rings → wave → glow → vignette
```

Use for ambient motion backgrounds with slow, layered wave drift. Animate
`zigzag()` offset and `wave()` phase from `useCurrentFrame()` for repeatable
loops. Two chained `wave()` calls can add dual-axis displacement.

`WaveFieldPrototype` has now been added as the next isolated test composition.
It uses `linearGradient → zigzag → wave → wave → glow → vignette` with a
twelve-second loop and Fixtura base-theme colours. It remains a prototype and
does not alter the Generated catalogue.

Retained Wave Field compositions:

- `WaveFieldPrototype` — baseline horizontal bands
- `WaveFieldWideRowsPrototype` — extra-wide horizontal rows
- `WaveFieldVerticalBandsPrototype` — extra-wide vertical columns

#### Brand Geometry Field

Suggested stack:

```text
linearGradient → vignette → @remotion/shapes field (circles, stars, polygons)
```

Use for club-brand geometry motifs, badge-like marks, and structured shape
fields. Animate grid offset and per-shape rotation from `useCurrentFrame()` for
repeatable loops.

Prototype review rejected this direction for Fixtura because procedural shape
fields do not align with the club asset model. The demo was removed from the
isolated prototype registry.

#### Neon Sweep

Suggested stack:

```text
linearGradient → lines → blur → glow → chromaticAberration → vignette
```

Use for high-energy neon and broadcast sweep treatments. Animate `lines()`
offset and optionally `chromaticAberration()` angle from `useCurrentFrame()` for
repeatable loops.

`NeonSweepPrototype` has now been added as the next isolated test composition.
It uses diagonal palette-driven lines with blur, glow, and chromatic drift over
a twelve-second loop. It remains a prototype and does not alter the Generated
catalogue.

Retained Neon Sweep compositions:

- `NeonSweepWideBeamsPrototype` — extra-wide diagonal beams
- `NeonSweepHeavyGlowPrototype` — dense lines with heavy glow and chroma

#### Pixel Matrix

Suggested stack:

```text
linearGradient → gridlines → pixelate → noise → saturation/contrast → vignette
```

Use for retro scoreboard, digital matrix, and pixel-art broadcast treatments.
Animate `gridlines()` offset and `noise()` seed from `useCurrentFrame()` for
repeatable loops.

`PixelMatrixPrototype` has now been added as the next isolated test composition.
It uses a flat grid with pixelation, animated noise drift, and colour
correction over a twelve-second loop. It remains a prototype and does not alter
the Generated catalogue.

Prototype review rejected this direction for Fixtura because the pixel-matrix
treatment does not align with the club asset model. The demo was removed from
the isolated prototype registry.

#### Reactive Path System

Suggested stack:

```text
linearGradient → glow → vignette → SVG orbit/path marks
```

Use for fixture routes, orbit lines, and energy marks driven by composition
data. Animate stroke dash offset and slow field rotation from `useCurrentFrame()`
for repeatable loops.

`ReactivePathSystemPrototype` has now been added as the next isolated test
composition. It uses mock orbit arcs with palette-driven stroke marks over a
twelve-second loop. Production integration would bind paths to composition
data later. It remains a prototype and does not alter the Generated catalogue.

Retained Reactive Path compositions:

- `ReactivePathSystemPrototype` — concentric orbit rings with travelling dashes
- `ReactivePathHitsPrototype` — pulsing hit marks on fixture routes

Prototype review rejected `ReactivePathLinesPrototype`,
`ReactivePathShapesPrototype`, and `ReactivePathNumbersPrototype`. Those demos
were removed from the isolated prototype registry.

#### Motion Motif

Suggested stack:

```text
linearGradient → glow → vignette → @remotion/lottie motif (palette recolour)
```

Use for designer-authored club marks, broadcast packages, and branded background
motifs recoloured per club palette. Production integration would bind to ingested
Lottie or Rive assets later.

`MotionMotifPrototype` has now been added as the next isolated test composition.
It uses a mock twelve-second Lottie loop with palette-injected colours over the
Fixtura base theme. It remains a prototype and does not alter the Generated
catalogue.

Retained Motion Motif compositions:

- `MotionMotifPrototype` — single centred motif
- `MotionMotifTiledFieldPrototype` — repeated motif tile field

Visual review approved both demos for retention. Follow-up exploration should
cover ingested designer assets, Rive as an alternate lane, and production
recolour/tint behaviour before catalogue promotion.

#### Rive Motif

Suggested stack:

```text
linearGradient → glow → vignette → RemotionRiveCanvas (designer .riv asset)
```

Use for vector motion assets with state machines or authored club marks. Production
integration would bind to ingested `.riv` files and palette remapping through
`onLoad` rather than mock CDN assets.

`RiveMotifTiledFieldPrototype` uses `RemotionRiveCanvas` with a placeholder CDN
animation over a twelve-second loop. Retained after review.

Removed after review: dense-grid, brick-stagger, mirror, drift, and single-centre baseline.

#### Light Leak

Suggested stack:

```text
linearGradient (two palette colours) → lightLeak → vignette
```

Use for cinematic flare overlays on club two-colour fields. `lightLeak()` ships
via `@remotion/light-leaks` on the pinned 4.0.499 baseline. Drive `progress`
from `useCurrentFrame()` for repeatable loops. Requires WebGL2.

Retained after visual review — all six variants:

- `LightLeakWarmFlarePrototype` — warm leak keyed to secondary colour
- `LightLeakCoolFlarePrototype` — cool leak keyed to primary colour
- `LightLeakSlowBreathePrototype` — one swell per twelve-second loop
- `LightLeakDualFlarePrototype` — warm and cool leaks offset by half a cycle
- `LightLeakVerticalWashPrototype` — top-to-bottom two-colour wash
- `LightLeakSoftBloomPrototype` — horizontal wash with lighter vignette

#### Stadium Field 3D

Suggested stack:

```text
ThreeCanvas → pitch mesh → markings → palette lighting → frame-driven camera
```

Use for low-poly stadium fields, camera flyovers, and sports-energy backgrounds.
Animation must be driven from `useCurrentFrame()` only. This lane needs render,
memory, and software-GPU testing before catalogue promotion.

`StadiumFieldLowSweepPrototype` has now been added as the next isolated experimental
composition. It uses a lightweight cricket ground with low-sweep camera variants
over a twelve-second loop. It remains a prototype and does not alter the Generated
catalogue.

Retained Stadium Field 3D composition:

- `StadiumFieldLowSweepPrototype` — low-angle cricket pitch sweep (retained example)

`StadiumFieldOrbitPrototype` was removed after visual review.

#### HTML-in-Canvas Background

Suggested stack:

```text
HtmlInCanvas → live DOM motion → glow / blur / vignette
```

Use for broadcast DOM treatments that need canvas post-processing while keeping
HTML/CSS authoring. Animate DOM transforms from `useCurrentFrame()` for
repeatable loops. Requires Chrome 149+ and the HTML-in-Canvas browser flag.

`HtmlInCanvasBroadcastPrototype` has now been added as the next isolated
experimental composition. It captures palette-driven DOM stripes with canvas
finishing over a twelve-second loop. It remains a prototype and does not alter
the Generated catalogue.

HTML-in-Canvas compositions registered for visual review:

- `HtmlInCanvasBroadcastPrototype` — baseline glow and vignette
- `HtmlInCanvasOrbitRingsPrototype` — SVG concentric dashed rings
- `HtmlInCanvasScoreboardGridPrototype` — fixture matrix cell pulse waves
- `HtmlInCanvasNeonBeamsPrototype` — diagonal beams + chromatic aberration

Removed after review: soft-blur, halftone-drift, chevron-scroll.

#### WebGPU Material Lab

`WebGPUMetalWavePrototype`, `WebGPUContourMapPrototype`, and `WebGPUSheenSweepPrototype`
use `ThreeCanvas` with
Three.js `WebGPURenderer` and TSL node materials over a twelve-second loop. Experimental
only — requires `--gl=angle` for headless render; WebGPURenderer may fall back to WebGL2.

- `WebGPUMetalWavePrototype` — animated metalness/roughness waves
- `WebGPUContourMapPrototype` — topographic contour banding
- `WebGPUSheenSweepPrototype` — sheen sweep with specular roll

Removed after review: fractal-club-field, radial-pulse, scanline-field, worley-cells, twist-vortex.

### Later prototypes

- **Wave field:** rings, waves, zigzags, or noise displacement with slow frame-driven motion. *(retained variants added; see Wave Field above)*
- **Brand geometry field:** Remotion shapes and paths forming a coherent animated field. *(rejected in prototype review)*
- **Motion motif:** a designer-authored Lottie or Rive loop recoloured per club. *(Lottie retained; Rive baseline and tiled demos added — see Rive Motif above)*
- **Reactive path system:** fixture routes, orbit lines, or energy marks driven by composition data. *(orbits and hits retained; see Reactive Path System above)*
- **Perspective floor:** gridlines with X rotation and perspective. *(partially covered by Signal Grid perspective floor variants)*
- **Animated texture tile:** CanvasImage or Gif processed through scale, tile, wave, and tint. *(rejected in prototype review — too busy)*
- **Neon sweep:** lines, blur, glow, and chromatic aberration. *(retained variants added; see Neon Sweep above)*
- **Pixel matrix:** pixelate, gridlines, noise, and colour correction. *(rejected in prototype review)*

### Experimental options

- **Stadium field 3D:** `ThreeCanvas` with a lightweight pitch, stadium lighting, ribbons, or particles. *(low-sweep cricket example retained; see Stadium Field 3D above)*
- **HTML-in-canvas background:** post-processing of live DOM content. *(broadcast, orbit-rings, scoreboard-grid, and neon-beams retained; see HTML-in-Canvas Background above)*
- **WebGPU material lab:** custom WebGPU effects or `ThreeWebGPUCanvas`. *(metal-wave, contour-map, and sheen-sweep retained via ThreeCanvas + WebGPURenderer; see WebGPU Material Lab above)*

HTML-in-canvas and WebGPU should remain research options until render parity and Studio behaviour are proven.

## Recommended adapter model

New effects-backed presets should fit the existing catalogue through additional adapters:

- `effects-solid`: `Solid` plus an ordered `@remotion/effects` stack
- `effects-custom`: Fixtura `createEffect()` implementation
- `shapes-paths`: `@remotion/shapes` and `@remotion/paths`
- `motion-asset`: Lottie or Rive
- `three-scene`: `ThreeCanvas`

The existing adapters remain responsible for the 25 current visuals:

- `pattern-tiled`
- `particle-field`
- `grid-noise`
- `particle-noise`
- `svg-geometric`
- `svg-spokes`

New effects should add catalogue entries. They should not create a new operator-facing category for every library or rendering technique.

## Controls

Keep the background operator controls small:

- preset selection

Preset-author controls may include:

- palette roles
- gradient direction
- pattern density
- grid size
- contour spacing
- effect intensity
- light-leak seed
- light-leak hue
- motion speed
- transition progress
- vignette or safe-region strength

Do not expose every renderer parameter to the operator. A parameter belongs in the operator UI only when it has a stable visual meaning and a clear readability outcome.

## Rendering and determinism constraints

All generated motion should be derived from:

- `useCurrentFrame()`
- `useVideoConfig()`
- `interpolate()`
- `spring()`
- deterministic seeds

Effects that use WebGL2 need a render spike. Remotion documents using an ANGLE-backed Chromium renderer for WebGL rendering. The existing project research also identifies the software-backed `swangle` path as relevant for no-GPU and Lambda environments.

The adoption gate for a new effects-backed preset is:

1. Confirm the effect exists in the installed Remotion version.
2. Render a still and a short sequence locally.
3. Test the local WebGL path.
4. Test Lambda or the target server render path.
5. Compare deterministic frames at 1080×1350.
6. Measure render time and memory.
7. Check foreground readability with representative Fixtura content.
8. Add one catalogue entry and one adapter route only after explicit promotion approval.

For the current test-only workstream, stop before catalogue or adapter
promotion. Production render-path verification and memory benchmarking remain
future gates.

References:

- [Shaders as backgrounds](https://www.remotion.dev/docs/shaders)
- [Remotion effects](https://www.remotion.dev/docs/effects)
- [Remotion third-party integrations](https://www.remotion.dev/docs/third-party)
- [Remotion WebGL guidance](https://www.remotion.dev/docs/webgl)

## Relationship to Luminance

Luminance remains a separate background option. It is suited to recolouring a grayscale master, including protected black and white linework, endpoint transition bands, foreground protection, and supersampling.

Effects-backed Generated presets should not absorb the Luminance pipeline. They solve different problems:

- Generated Effects creates procedural visual layers.
- Luminance recolours an asset while preserving its tonal structure.

## Current test-only decision

- Keep only `BroadcastHalftoneWavePrototype` in the isolated animation test.
- Require all accepted background motion to be deterministic and repeatable.
- Keep all tested options outside the production Generated catalogue and CMS.

## Future decisions

The following choices remain outside the current test-only scope:

1. Whether the Broadcast Halftone prototype should be promoted into the Generated catalogue after production render-path verification.
2. Which additional effects-backed presets should follow Broadcast Halftone.
3. Whether `starburst()` is required early enough to justify a Remotion upgrade.
4. Whether Skia is needed after the Effects prototype or remains a later option.
5. Whether Lottie and Rive assets need a separate asset-ingest contract.
6. Whether Three.js belongs in the Generated catalogue or remains a premium experimental lane.
7. What readability policy each new preset must declare before CMS visibility is resolved.

## References

Repository references:

- `CONTEXT.md`
- `src/components/backgrounds/.docs/README.md`
- `src/components/backgrounds/variants/Generated/catalogue/catalogue.ts`
- `.scratch/generated-backgrounds/handoff.md`
- `.scratch/generated-backgrounds/remotion-options.md`
- `docs/adr/0002-generated-background-wire-deferred.md`

Remotion references:

- [Effects API](https://www.remotion.dev/docs/effects/api)
- [Effects overview](https://www.remotion.dev/docs/effects)
- [Shaders](https://www.remotion.dev/docs/shaders)
- [`createEffect()`](https://www.remotion.dev/docs/create-effect)
- [Third-party integrations](https://www.remotion.dev/docs/third-party)
- [ThreeCanvas](https://www.remotion.dev/docs/three-canvas)
- [Schemas](https://www.remotion.dev/docs/schemas)
- [Studio interactivity](https://www.remotion.dev/docs/studio/make-component-interactive)
