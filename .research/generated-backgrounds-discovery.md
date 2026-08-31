# Generated backgrounds discovery

Date: 2026-08-27  
Scope: Research only. No implementation decisions are locked by this note.

Planning correction, 2026-08-28: use `.scratch/generated-backgrounds/handoff.md` for the active task. The earlier visual-audit recommendation is superseded. The active goal is one Generated option containing Graphics, Pattern, Particle, and Noise presets.

## Short answer

Put the computer-generated backgrounds under one catalogue named **Generated backgrounds**. Do not force them through one rendering component.

The strongest current Remotion direction is a shared catalogue of named presets backed by a small number of engines. Most new 2D work can use Remotion's stable effects system on a solid canvas. Existing SVG, noise, particle, Lottie, Rive, and 3D renderers can sit behind the same catalogue contract when they are the better tool.

This is a better fit than promoting every technique to a top-level background type. A user should choose a look such as "Topographic flow" or "Broadcast halftone", not choose between implementation terms such as Noise, Graphics, Pattern, Particle, and Animated.

## What exists in this repository

The repo already has a central selector, but the generated choices have grown into overlapping categories.

- `SelectTemplateBackground` routes Solid, Gradient, Image, Video, Texture, Luminance, Graphics, Noise, Pattern, Particle, and Animated. Graphics is routed through the Noise implementation. Layered is present in the type model but its route is commented out. See [the background selector](../src/components/backgrounds/index.tsx).
- The Noise family contains actual noise, fog, grain, particles, a triangle swarm, pulsing circles, digital rain, a grid, and two graphics treatments. See [the Noise variant registry](../src/components/backgrounds/variants/NoiseBackground/config.ts).
- A separate Particle family contains dots, lines, bubbles, snow, and confetti. See [the Particle configuration](../src/components/backgrounds/variants/Particles/config.ts).
- A separate Pattern family contains dots, lines, grid, crosshatch, triangles, and chevrons. See [the Pattern configuration](../src/components/backgrounds/variants/Patterns/variants/config.ts).
- Animated defines four modes, but the central selector always requests `pulsingGradient`. See [AnimatedBackground](../src/components/backgrounds/variants/AnimatedBackground.tsx) and [the selector](../src/components/backgrounds/index.tsx).
- The shared type file and the live selector do not fully agree. For example, Luminance is a `BackgroundType` but has no member in the `BackgroundProps` union; Graphics lists options that are not the options exposed by the live Noise registry. See [background types](../src/components/backgrounds/config/types.ts).
- The project is pinned to Remotion 4.0.499. It already installs `@remotion/noise`, `@remotion/shapes`, `@remotion/paths`, `@remotion/lottie`, and `@remotion/rive`, but only `@remotion/noise` is used by the background implementation. It does not install `@remotion/effects`, `@remotion/three`, or `@remotion/skia`. See [package.json](../package.json).

The problem is therefore not a lack of a central entry point. It is a catalogue and vocabulary problem. The current categories describe how a background was built, overlap with one another, and expose very different levels of control.

## Current stable Remotion features worth using

### Effects and shader-generated backgrounds

This is the most important discovery.

Remotion now has a first-party effects system for canvas-backed components. It works with Solid, Img, CanvasImage, Video, AnimatedImage, GIF, Rive, and Remotion shapes. Effects stack in a defined order and their parameters can be edited in Studio. The official docs explicitly recommend applying an effect to Solid to make a shader background. [Effects overview](https://www.remotion.dev/docs/effects), [shaders as backgrounds](https://www.remotion.dev/docs/shaders).

The current generator set covers much of what Fixtura currently builds by hand:

- liquid contours and contour lines
- halftone gradients and dot grids
- gridlines, lines, checkerboards, rings, waves, and zigzags
- white noise and TV-signal treatments
- starbursts and light leaks
- paper, burlap, flannel, scanlines, glow, vignette, shine, chromatic aberration, wave distortion, and noise displacement as treatments on a base

These are documented as current APIs, not experiments. Individual effects use Canvas 2D or WebGL2 internally, so Lambda and local render parity still needs a render spike before adoption. [Effects overview](https://www.remotion.dev/docs/effects).

`createEffect()` is the extension point for Fixtura-specific looks. It can create reusable effects backed by Canvas 2D, WebGL2, or WebGPU, and those effects join the same stack and Studio controls as first-party effects. This means a custom club-colour field or palette-mapping treatment would not need a separate top-level background system. [createEffect API](https://www.remotion.dev/docs/create-effect).

### Existing stable building blocks

- `@remotion/noise` supplies deterministic 2D, 3D, and 4D noise. This remains useful for motion fields and particle movement, even if "Noise" stops being a catalogue category. [Noise API](https://www.remotion.dev/docs/noise).
- `@remotion/shapes` supplies SVG shape components and path generators for arrows, rectangles, callouts, circles, triangles, stars, polygons, sparks, and other primitives. Shape components also accept effects. [Shapes API](https://www.remotion.dev/docs/shapes), [effects overview](https://www.remotion.dev/docs/effects).
- `@remotion/paths` can evolve, interpolate, warp, scale, translate, measure, and sample SVG paths. This is useful for line fields, route-like motion, contour reveals, and animated brand geometry. [Paths API](https://www.remotion.dev/docs/paths).
- Lottie and Rive are stable asset-backed animation lanes. The project already carries both Remotion packages. They suit art-directed reusable motion pieces better than procedural fields. Lottie supports speed, reverse playback, remote files, and metadata. Rive renders interactive `.riv` animations and can also receive Remotion effects. [Lottie](https://www.remotion.dev/docs/lottie), [Rive](https://www.remotion.dev/docs/rive), [effects overview](https://www.remotion.dev/docs/effects).
- `<ThreeCanvas>` is the stable 3D route and synchronizes React Three Fiber with Remotion's frame clock. Use it only for looks that genuinely need depth, lighting, meshes, or camera motion. [Three integration](https://www.remotion.dev/docs/three), [ThreeCanvas source](https://github.com/remotion-dev/remotion/blob/main/packages/three/src/ThreeCanvas.tsx).

### A better discovery and editing surface

Remotion describes collections of parameterized animated assets as a **Motion Design System**. That language matches the intended Fixtura background catalogue. [Motion Design Systems](https://www.remotion.dev/docs/design-systems).

Studio can expose constrained props through schemas and edit effect parameters visually. Recent releases also added external element libraries, background-element reordering, and element catalogues through `addElementLibraryToStudio()`. A future Fixtura catalogue could therefore be browsable in Studio while one shared background contract remains the production entry point. [Schemas](https://www.remotion.dev/docs/schemas), [visual editing](https://www.remotion.dev/docs/visual-editing), [v4.0.517](https://github.com/remotion-dev/remotion/releases/tag/v4.0.517), [v4.0.518](https://github.com/remotion-dev/remotion/releases/tag/v4.0.518).

The repo is 19 patch releases behind the current v4.0.518 release. Any adoption work should begin with an upgrade review because the newer catalogue and Studio features are not present in 4.0.499. [v4.0.518 release](https://github.com/remotion-dev/remotion/releases/tag/v4.0.518).

### Features that are useful but not central

The new official GSAP adapter drives a paused GSAP timeline from Remotion's frame clock. It can help author complex motion, but it does not solve background classification and would add another animation vocabulary. Keep it out of the first background spike unless a proposed look is painful to express with frame-derived values. [GSAP integration](https://www.remotion.dev/docs/gsap), [v4.0.517](https://github.com/remotion-dev/remotion/releases/tag/v4.0.517).

## Experimental or deferred features

- `<ThreeWebGPUCanvas>` is new in 4.0.503 and supports Three.js WebGPU and TSL node materials, but Remotion marks it experimental because Three.js does. Remotion 4 also needs explicit ANGLE or software-backed rendering settings. Treat it as a visual lab, not the production default. [ThreeWebGPUCanvas](https://www.remotion.dev/docs/three-webgpu-canvas).
- HTML-in-canvas can post-process live DOM with Canvas 2D, WebGL, or WebGPU, but the browser API is explicitly experimental and still requires a Chrome flag for Studio preview. Do not make the shared background contract depend on it. [HTML-in-canvas](https://www.remotion.dev/docs/html-in-canvas).
- Remotion's release notes still place `@remotion/browser-studio` and `@remotion/canvas` work under "Internal and experimental". They are not a safe foundation for this project yet. [v4.0.517](https://github.com/remotion-dev/remotion/releases/tag/v4.0.517), [v4.0.518](https://github.com/remotion-dev/remotion/releases/tag/v4.0.518).
- The standalone `@remotion/light-leaks` and `@remotion/starburst` packages are deprecated. New work should use `lightLeak()` and `starburst()` from `@remotion/effects`; the standalone packages are planned to stop publishing in Remotion 5. [Light leak effect](https://www.remotion.dev/docs/effects/light-leak), [starburst effect](https://www.remotion.dev/docs/effects/starburst), [v5 retirement issue](https://github.com/remotion-dev/remotion/issues/9667).

## Proposed catalogue shape for further discovery

Use **Backgrounds** as the overall product area and **Generated** as one banner inside it.

| Product group           | What the user chooses            | Likely engine                       |
| ----------------------- | -------------------------------- | ----------------------------------- |
| Essential               | Solid, gradient                  | CSS or Solid                        |
| Media                   | Image, video, texture            | Existing media renderers            |
| Mapped                  | Luminance artwork                | Existing luminance pipeline         |
| Generated               | Named procedural presets         | Solid plus effects for most presets |
| Generated, vector       | Art-directed SVG/path presets    | Shapes, paths, existing SVG         |
| Generated, motion asset | Art-directed reusable animations | Lottie or Rive                      |
| Generated, 3D           | Selected depth-based presets     | ThreeCanvas                         |

This gives the UI one Generated banner without pretending that a shader, a Rive file, and a Three.js scene have the same runtime needs.

Within Generated, catalogue entries should be named by appearance and use, not implementation. Each entry should have a preview, palette behaviour, motion intensity, render class, readability policy, and a small set of art-directed controls. Raw implementation controls should remain behind an advanced view.

## Promising new options

### First wave: stable and close to the current system

1. **Broadcast halftone**. Palette-driven halftone gradient on Solid. This is the cleanest proof that the effects pipeline can replace a hand-built background family.
2. **Topographic flow**. Animated contour lines or liquid contours with two club colours and restrained motion.
3. **Signal grid**. Gridlines plus scanlines, vignette, or a mild glow for scoreboard and tech treatments.
4. **Energy burst**. Starburst with controlled ray count, centre offset, rotation, and palette colours.
5. **Paper club**. A solid or gradient base treated with paper, burlap, noise, or halftone. This could absorb several Texture and Grain use cases while remaining deterministic.
6. **Wave field**. Rings, waves, zigzags, or noise displacement driven slowly from the Remotion frame.
7. **Brand geometry**. A small set of SVG shapes and paths animated as a coherent field. This is a better successor to the mixed Geometric, Triangle Swarm, and Pulsing Circles options.

### Second wave: art-directed assets

8. **Motion motif**. Lottie or Rive assets designed once and recoloured or parameterized per club. This gives designers a controlled lane without turning every asset into code.
9. **Reactive path system**. Path evolution and warping for fixture routes, orbit lines, or team-energy marks.

### Research lane

10. **3D stadium field**. A lightweight ThreeCanvas scene with camera depth, particles, ribbons, or a low-poly surface. It needs render-time and memory benchmarks before it becomes a catalogue option.
11. **WebGPU material lab**. TSL-generated fields and materials in ThreeWebGPUCanvas. Keep it explicitly experimental until renderer parity is proven.

## Superseded discovery proposal

This proposal is retained as research history. It is not the active plan. The active handoff replaces it.

1. Capture a contact sheet of every current generated option at the same palette, frame, resolution, and foreground content.
2. Mark each option keep, merge, replace, or retire. The current Noise, Pattern, Particle, Graphics, and Animated labels should not survive this audit automatically.
3. Select five first-wave concepts and define their visual intent before choosing controls.
4. Compare three engines on the same brief: current DOM/SVG, Solid plus first-party effect, and one custom effect only where needed.
5. Measure local and Lambda output, render time, memory, deterministic frame output, and foreground readability.
6. Decide whether Studio's new element catalogue is only a development browser or also the long-term authoring interface.

The main design decision to carry forward is simple: **one Generated catalogue, several rendering engines, named presets instead of implementation categories**.

## Primary sources

- [Remotion effects](https://www.remotion.dev/docs/effects)
- [Shaders as backgrounds](https://www.remotion.dev/docs/shaders)
- [createEffect](https://www.remotion.dev/docs/create-effect)
- [Motion Design Systems](https://www.remotion.dev/docs/design-systems)
- [Remotion v4.0.518](https://github.com/remotion-dev/remotion/releases/tag/v4.0.518)
- [Remotion releases](https://github.com/remotion-dev/remotion/releases)
