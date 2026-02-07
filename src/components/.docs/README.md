## Components Directory

This directory contains the reusable building blocks used to assemble Remotion-based video compositions. Components are organized by concern: backgrounds, containers, typography, images, layout, transitions, and supporting animation/easing utilities. They are designed to be:

- Composable and theme-aware via `ThemeContext` and related contexts
- Data-driven via `VideoDataContext` (e.g., template variations)
- Animation-first, using Remotion frame-based rendering and easing/spring utilities

Parent documentation: see the project root README at `../../README.md`.

### Cross-cutting concerns

- **Theme integration**: Most components pull palette, typography, and layout from `core/context/ThemeContext` and `core/utils/designPalettes`.
- **Video data**: Many components adapt to `video.templateVariation` from `core/context/VideoDataContext`.
- **Remotion APIs**: Components frequently use `useCurrentFrame`, `useVideoConfig`, `interpolate`, and the `@remotion/transitions` package for declarative animation.

---

## Directory Map

- `animations/config/variants.ts`: Small helper for generic animation variant configs
- `backgrounds/`: All background systems (solid, gradient, image, video, noise, particles, patterns, animated)
- `containers/`: The polymorphic `AnimatedContainer` plus animation utilities, styles, modules, and examples
- `easing/`: Shared easing types and mapping utilities
- `images/`: Animated image component and a rich animation system for images
- `layout/`: Page-level layout building blocks (headers, title screens, screen wrappers)
- `transitions/`: Thin wrappers around `@remotion/transitions` for sequences and transitions
- `typography/`: Animated typography with theme-aware styles and variants
- `ui/`: Reserved for future UI atoms/molecules (currently empty)

---

## backgrounds/

Background selection and rendering for compositions. Central entry and multiple variant families. Child-docs:

- Noise background README: `backgrounds/variants/NoiseBackground/README.md`
- Image variants README: `backgrounds/variants/Image/variants/README.md`
- Image overlays README: `backgrounds/variants/Image/overlays/readMe.md`

### backgrounds/index.tsx

- Exposes a registry `BackgroundComponents` for Solid, Gradient, Image, Video, Graphics, Pattern, Particle, and `Noise` sub-variants.
- `SelectTemplateBackground()` reads `video.templateVariation.useBackground` and returns the appropriate background.
- Implements typed wrappers for each variant to pass in theme/video context driven props.
- `NoiseBackground({ variant })` switches on `NoiseVariant` (from `variants/NoiseBackground/config.ts`) and renders the associated component, defaulting to `GridNoise`.
- Uses `useThemeContext` for palette colors and `useVideoDataContext` for template-driven choices.

### backgrounds/config/

- `animations.ts`: Utility functions to animate backgrounds (fade, zoom, pan, Ken Burns, parallax, slideIn/out) using `interpolate`. Export `getBackgroundAnimation(type, frame, start, end, isExit)` to derive style objects per frame.
- `constants.ts`: Canonical enums and defaults (e.g., `BACKGROUND_TYPES`, `GRADIENT_TYPES`, `BACKGROUND_POSITIONS`, default configs for solid/gradient fallbacks).
- `index.ts` and `types.ts`: Re-exports and shared types for background props and configuration.

### backgrounds/variants/Solid/SolidBackground.tsx

- Solid fill using theme palette via `useThemeContext`.
- Returns `AbsoluteFill` with `selectedPalette.background.main`.

### backgrounds/variants/Gradient/GradientBackground.tsx

- Computes a background gradient using `ThemeContext` and `VideoDataContext`.
- Extracts the gradient CSS from palette objects which may provide direction-specific CSS (e.g., `HORIZONTAL`, `VERTICAL`).
- Fallbacks if palette/variation don’t provide required keys.

### backgrounds/variants/Image/

High-level, effect-driven image background with overlays.

- `index.tsx` (ImageBackground):
  - Adapts `video.templateVariation.image` via `TemplateVariationAdapter.ts`.
  - Renders effect component based on `ImageEffectType` (Zoom, Pan, Breathing, FocusBlur, None).
  - Applies `OverlayRenderer` with `OverlayConfig` (Solid, Gradient, Vignette, Duotone, Pattern, ColorFilter, None) with colors derived from palette when not specified.
  - Uses `AbsoluteFill` + effect component + overlay for composition.
- `ImageBackground.types.ts`: Enumerations for effect types and supporting enums (positions, sizes, directions) and effect prop contracts.
- `ImageBackground.config.ts` / `ImageBackground.variants.tsx`: Config helpers and curated variant exports.
- `TemplateVariationAdapter.ts`: Normalizes legacy or flexible template variation data into a strict `config` consumed by `ImageBackground`.
- `ImageBackground.presets.ts`: Preset configurations aligned to test data schemas to simplify template setup.
- `overlays/`: `OverlayRenderer.tsx`, overlay `index.ts` and theme integration helpers; renders visual overlays on top of the base image effect.
- `variants/`: Individual effect components (`zoom.tsx`, `pan.tsx`, `kenBurns.tsx`, `breath.tsx`, `blur.tsx`, `colorOverlay.tsx`, and `combined.tsx` orchestrator). Each component uses `useCurrentFrame` + `interpolate` to derive frame-based transforms/opacity.
- Child docs: `variants/README.md`, `overlays/readMe.md`.

### backgrounds/variants/Video/VideoBackground.tsx

- Plays a video as the background.
- `processVideoConfig(...)` merges props with `templateVariation` (URL, position, size, loop/muted, overlay, offthread option, volume/playbackRate).
- Selects between `Video` and `OffthreadVideo` for performance.
- Supports an optional overlay color/opacity layer.
- `VideoBackgroundWithContext` binds to `video.templateVariation.video` automatically.

### backgrounds/variants/NoiseBackground/

Noise and SVG graphics variants.

- `config.ts`: Declares `NoiseVariant` union and `NOISE_VARIANTS` metadata (names/descriptions).
- `GridNoise.tsx`, `ShapeNoise.tsx`, `ParticleNoise.tsx`: Base procedural noise/particle renderers.
- Additional variants (e.g., `SubtleNoise`, `GrainNoise`, `WaveNoise`, `FogNoise`, `StaticNoise`, `FloatingParticles`, `DynamicParticles`, `TriangleSwarm`, `PulsingCircles`, `DigitalRain`, `GradientGrid`) implement specific visual patterns with props like `baseColor`, `noiseColor`, opacity/scale.
- `GraphicsBackground.tsx`: SVG-driven geometric shapes animated by frame.
- `SpokesGraphics.tsx` with `svg/spokes/intro.tsx` and `svg/spokes/content.tsx`: Gradient-backed animated spoke motifs. Uses `VideoDataContext` timings to stage intro vs content animations.
- README: `variants/NoiseBackground/README.md`.

### backgrounds/variants/Particles/

- `index.tsx` (ParticleBackground): Chooses particle renderer (`dots`, `lines`, `bubbles`, `snow`, `confetti`) based on template variation and theme colors; delegates to `variants/*Renderer.tsx`.
- `config.ts`: Types (`Particle`, movement direction, animations, props) and sensible defaults.
- `utils.ts`: Shared math/utilities for particles.

### backgrounds/variants/Patterns/

- `index.tsx` (PatternBackground): Renders patterns (dots, lines, grid, crosshatch, triangles, chevron) with theme-driven colors and optional animation/transform config from template variation.
- `variants/`: Individual pattern components use SVG and Remotion `interpolate` to create motion/transform effects.

### backgrounds/variants/AnimatedBackground.tsx

- Pure CSS/SVG animated backgrounds independent of assets (pulsing/moving gradients, breathing color, wave effect). Uses frame-based interpolation to animate properties.

---

## containers/

Animated, theme-aware container component and helpers. Child-docs:

- Containers README: `containers/README.md`

### containers/AnimatedContainer.tsx

A high-level container component with unified props for variant, size, rounding, shadows, background color, and entry/exit animations.

- Combines props from `types.ts` (container styling) and `animations` (animation config).
- Reads `selectedPalette` via `ThemeContext`.
- Animation flow:
  1. Normalize entry/exit animation configs with `normalizeContainerAnimation`.
  2. Merge optional spring configs (`springConfig`, `exitSpringConfig`).
  3. Determine `isExiting` from `exitFrame` vs current frame.
  4. Compute animation start frame (considering delays and exit offsets).
  5. Call `useAnimation(config, startFrame)` to receive animated style object.
- Styling flow:
  - `getBackgroundColorStyle(backgroundColor, palette)` maps semantic names to palette colors/gradients.
  - `getTypeStyles(type, palette)`, `getSizeStyles(size)`, `getRoundedStyles(rounded)`, `getShadowStyles(shadow)` produce inline style objects.
  - Final style merges user `style` with animation and computed styles.
- Output is a single `<div>` with combined class names and ARIA props that can wrap any children.

### containers/animations/

- `animationTypes.ts`: Declares `ContainerAnimationType` (fade, slide, scale, reveal, spring, 3D, special) and config types including easing and optional spring.
- `animationUtils.ts`:
  - `normalizeContainerAnimation(...)` converts string types to full configs.
  - `calculateAnimationProgress(frame, start, duration, easing)` uses `interpolate` with `getImageEasingFunction` to produce normalized progress.
  - `createSpringAnimation(frame, start, fps, config, durationInFrames?)` delegates to Remotion `spring`.
  - `calculateAnimationStyles(type, progress)` returns style transforms/filters/clip-path based on progress, covering fade/slide/scale/reveal/spring/3D/glitch/blur.
- `useAnimation.ts`: Hook that applies the new animation system per frame (entry/exit), built on the above utilities.
- `springConfigs.ts`: Named spring configs for reuse.
- `utils/*`: Categorized animation calculators (fade, slide, scale, perspective, spring, special) used internally.
- `index.ts`: Barrel export aggregating the system.

### containers/styles/

- `backgroundStyles.ts`: Map semantic background names to palette colors/gradients.
- `typeStyles.ts`: Per-container-type styles (borders, cards, gradients) using palette.
- `sizeStyles.ts`, `roundedStyles.ts`, `shadowStyles.ts`: Utility mappers for sizing, border radius, and shadows.
- `index.ts`: Barrel export of style utilities.

### containers/modules/

Small pre-wired components that wrap `AnimatedContainer` for common patterns (fade, slide, scale, reveal, spring, 3D) and expose default configs for consistency. `index.ts` exports all modules.

### containers/examples/

Showcases for using `AnimatedContainer` in different scenarios (`AnimatedContainerExamples.tsx`).

### containers/types.ts

Consolidated prop and layout types used by the container system.

---

## images/

Animated single-image component and a rich animation system.

Child-docs:

- Images README: `images/README.md`
- Images config README: `images/config/README.md`
- Image animations README: `images/config/animations/README.md`

### images/AnimatedImage.tsx

- A robust `<Img>` wrapper supporting:
  - Entry/exit animations with per-frame style computation
  - Aspect ratio/orientation modes (auto/fixed/original) with safe defaults
  - Fallback image handling and load/error hooks
  - Memoized normalization of animation configs and dual-animation handling (`useDualImageAnimation`)
- Data flow:
  - Normalize entry and exit configs via `normalizeImageAnimation` (merges delay, duration, easing, spring).
  - Compute styles via `useDualImageAnimation(entry, exit, exitFrame)` which internally uses `useImageAnimation` and frame offsets.
  - Calculate layout styles with `calculateStyles()` (width/height/max constraints, object-fit, and `aspectRatio` when requested).

### images/config/

- `types` co-located in `../../easing/types` for re-use by containers and typography.
- `animationUtils.ts`: `normalizeImageAnimation(...)` coercion helper.
- `useImageAnimation.ts`:
  - `useImageAnimation(config)`: Returns style based on current frame and config, dispatching to the selected named animation.
  - `getImageAnimationStyles(config, frame)`: Stateless version for arbitrary frames.
  - `useDualImageAnimation(entry, exit, exitFrame)`: Switches animation styles when `frame >= exitFrame`, defaulting exit to `fadeOut` if unspecified.
- `springConfigs.ts`: Named image-specific spring presets (`IMAGE_SPRING_CONFIGS`).
- `animations/*`: A comprehensive set of animation calculators (fade, zoom, slide, special, rotate, spring, camera, cinematic, effects, perspective/3D, broadcast, composite). Each function takes `(frame, start, end, config, fps?)` and returns a style object.
- `index.ts`: Re-exports types, utils, hooks, and animations for ergonomic imports.

### images/index.ts

Barrel export for `AnimatedImage`, helpers (`preloadImage(s)`, `getImageDimensions`), and placeholder constants.

---

## typography/

Theme-bound animated text rendering with word/letter splitting support.

Child-docs:

- Typography README: `typography/README.txt`

### typography/AnimatedText.tsx

- Props: `type` (style preset), `variant` (color variant), `letterAnimation` (none|word|letter or animation type/config), entry/exit animation props, and optional overrides (`textAlign`, `textTransform`, `fontFamily`).
- Fonts: Resolves font family from explicit prop, theme-provided `fontClasses`, or sensible defaults; dynamically loads missing fonts via `FontContext.loadFont`.
- Styles: Starts from `ThemeContext.componentStyles[type]` (fallbacks to `bodyText`), applies palette-driven color variant via `config/variants.getVariantStyles`, optionally passes it through `applyContrastSafety`.
- Animation:
  - Entry: `normalizeAnimation` + `useAnimation` for styles.
  - Exit: If `exitAnimation` and `frame >= exitFrame`, applies `getAnimationStyles(exitAnimConfig, frame - exitFrame, fps)`.
  - Also computes `entryProgress` / `exitProgress` and sets `opacity` appropriately.
- Rendering: Chooses plain text, word-level `<span>`s, or character-level `<span>`s depending on `letterAnimation` mode.

### typography/config/

- `animations.ts`: Surface area exporting types, spring configs, easing function mapping, and the typography animation hooks/animations (fade, scale, spring, special, typewriter, etc.).
- `styles.ts`: `getTypographyStyles(...)` to derive className/style from Theme typography scales (sizes, weights, lineHeight, letterSpacing).
- `variants.ts`: `getVariantStyles(variant, palette)` and `applyContrastSafety(...)` returning text color and optional gradient text styles.
- `animations/*`: Implementation details of entry/exit animations specialized for text.
- `types.ts`: Local types used by the typography animations.
- `index.tsx`: Export `AnimatedText` as the primary Typography component (re-export from `AnimatedText`).

---

## layout/

Layout primitives for composing screens and reusable headers/title-screens.

### layout/screen/OneColumn.tsx

- High-level screen wrapper. Uses `ThemeContext.layout.heights` to carve vertical sections and calls `RouteToComposition()` in the primary content area.

### layout/main/header/

- `index.tsx`: Exports a rich set of header layout variants (vertical stack permutations and two-column permutations). Each variant is a composition of `Logo`, `Title`, `Name` slots with ordering rules.
- `types.ts`: Shared props (e.g., alignment, optional height/exitFrame), and `getAlignmentClasses(...)` helper to derive flexbox alignment utility classes.
- `variants/VerticalStack.tsx`, `variants/TwoColumnLayout.tsx`: Concrete layout permutations (standard and reversed orders, single/double-slot variants).

### layout/titleScreen/

- `index.tsx`: Similar pattern as header: exports vertical and two-column variants for title screens, operating with `Logo`, `Title`, `Name`, `PrimarySponsor` slots.
- `types.ts`: Shared props and `getAlignmentClasses(...)`.

---

## transitions/

Simple wrappers for Remotion transition primitives.

- `TransitionWrapper.tsx`:

  - Props: `transitionType` (slide|fade|wipe|clockWipe|flip|none), `direction`, `timing` (linear or spring with optional config), width/height for geometric transitions.
  - Internals: Maps `transitionType` to a `TransitionPresentation` (from `@remotion/transitions`). Maps `timing` to `linearTiming` or `springTiming`.
  - Renders a single `TransitionSeries.Sequence` for children content plus one `TransitionSeries.Transition`.

- `TransitionSeriesWrapper.tsx`:

  - Props: `sequences: {content, durationInFrames}[]` and the same `transitionType`, `direction`, `timing` as above.
  - Renders a series of `TransitionSeries.Sequence` blocks, inserting transitions between them.

- `index.ts`: Barrel exports for the two wrappers.

---

## easing/

Shared easing types and mapping from declarative easing descriptors to Remotion easing functions.

- `types.ts`: Reusable animation types used across images/containers/typography (easing descriptors, spring config, image animation config, etc.).
- `easingFunctions.ts`: `getImageEasingFunction(easing)` returns a real function using `remotion`’s `Easing` API. Handles strings (`linear`, `ease`, `quad`, `cubic`, etc.), parameterized objects (`poly`, `elastic`, `back`, `bezier`), and composed types (`in`, `out`, `inOut`).

---

## animations/config/variants.ts

Lightweight, generic animation presets used in places where a small, non-Remotion-specific config is useful.

- `getAnimationConfig(variant, duration?, delay?)` returns a normalized config with initial/final styles for simple fade/slide/zoom/bounce/pulse buckets (extensible by adding keyframes).

---

## ui/

Currently empty. Reserved for future shared UI primitives.

---

## How these parts work together

- **Theme + Data**: Components query `ThemeContext` (palette, component styles, typography scales) and `VideoDataContext` (template variation settings). This enables consistent visuals that adapt per composition.
- **Animation**: All animation is frame-driven. Components compute styles per frame using `interpolate`, spring helpers, and easing mapping. Entry/exit animations are standardized via normalization helpers and hooks.
- **Composability**: Layout components (headers/title screens/screen wrappers) compose `AnimatedContainer`, `AnimatedText`, `AnimatedImage`, and Backgrounds. Transitions wrap sequences to create between-scene motion.

## Example usage snippets

- Select a background from template variation:

```tsx
<SelectTemplateBackground />
```

- Animated container with slide in, exit at a specific frame:

```tsx
<AnimatedContainer
  type="card"
  backgroundColor="light"
  rounded="lg"
  shadow="md"
  animation="slideInRight"
  animationDuration={30}
  exitAnimation="slideOutRight"
  exitFrame={120}
>
  <Typography>Slide Animated Container</Typography>
</AnimatedContainer>
```

- Animated image with dual animations:

```tsx
<AnimatedImage
  src={logoUrl}
  animation={{ type: "fadeIn", duration: 30 }}
  exitAnimation={{ type: "fadeOut", duration: 30 }}
  exitFrame={90}
  width={200}
  height={200}
/>
```

- Title screen/layout variant:

```tsx
<VerticalHeaderTitleLogoName
  alignment="center"
  Title={<AnimatedText type="title">Grand Final</AnimatedText>}
  Logo={<img src={logo} />}
  Name={<AnimatedText type="subtitle">Premier League</AnimatedText>}
/>
```

## Links to child READMEs

- Containers: `./containers/README.md`
- Images (overview): `./images/README.md`
- Images config: `./images/config/README.md`
- Images animations: `./images/config/animations/README.md`
- Backgrounds – Noise variants: `./backgrounds/variants/NoiseBackground/README.md`
- Backgrounds – Image effect variants: `./backgrounds/variants/Image/variants/README.md`
- Backgrounds – Image overlays: `./backgrounds/variants/Image/overlays/readMe.md`

If a specific subfolder does not have a README, refer back to this document and the file headers for details.
