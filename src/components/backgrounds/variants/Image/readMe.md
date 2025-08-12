# Image Background Component

This component provides customizable image backgrounds for Remotion video templates with various animation and styling options.

## Image Background

Effect-driven image background system with theme-integrated overlays and a compatibility adapter for template variations.

### Overview

- Entry: `index.tsx` (ImageBackground)
- Effects: `variants/` (zoom, pan, kenBurns, breath, blur, combined)
- Overlays: `overlays/` (Solid, Gradient, Vignette, Duotone, Pattern, ColorFilter)
- Adapter/Config: `TemplateVariationAdapter.ts`, `ImageBackground.config.ts`, `ImageBackground.types.ts`, `ImageBackground.variants.tsx`, `ImageBackground.presets.ts`

### index.tsx (ImageBackground)

- Reads `video.templateVariation.image` from `VideoDataContext`
- Normalizes raw data via `adaptImageConfig` (see adapter below)
- Selects an effect component (`ImageEffectType`):
  - Zoom: `variants/zoom.tsx` with `direction` and `intensity`
  - Pan: `variants/pan.tsx` with `direction`
  - Breathing: `variants/breath.tsx` with `intensity`
  - FocusBlur: `variants/blur.tsx` with `direction` and `maxBlur`
  - None: Static `Img` fallback
- Builds an `OverlayConfig` by:
  - Reading explicit config from the adapted object
  - Falling back to theme colors (`selectedPalette`) if overlay colors are not provided
  - Switching by `OverlayStyle` to create a typed configuration
- Renders `<AbsoluteFill>` with the selected effect and `<OverlayRenderer config={...} />`

### TemplateVariationAdapter.ts

Adapts legacy template variation shapes into a richer, typed config used by `ImageBackground`.

- `mapEffectType(legacyType)`:
  - Maps string identifiers (e.g., `"zoom"`, `"pan"`, `"kenBurns"`, `"breathing"`, `"focus-blur"`) to `ImageEffectType`
- `mapDirection(direction, effectType)`:
  - Disambiguates zoom vs pan directions depending on the selected effect
  - Provides sensible defaults when missing (e.g., zoom `in`, pan `left`)
- `adaptImageConfig(legacyConfig)`:
  - Copies base props (`url`, `ratio`, `width`, `height`)
  - Computes `effectType` and direction fields
  - Maps a single `intensity` into the correct domain field (`zoomIntensity`, `panIntensity`, `breathingIntensity`, `blurIntensity`)
  - Passes through overlay fields (`overlayStyle`, `overlayPreset`, `overlayColor`, `overlayOpacity`)
- `updatetemplateVariation(templateVariation)`:
  - Safe deep clone and update of `templateVariation.Image` using `adaptImageConfig`

### Effect Variants (variants/)

- `zoom.tsx`: Scales the image in/out with Remotion interpolation
- `pan.tsx`: Translates the image horizontally/vertically across the frame
- `kenBurns.tsx`: Combines subtle zoom and pan for a cinematic feel
- `breath.tsx`: Low-frequency in/out scaling (“breathing”)
- `blur.tsx`: Varies `filter: blur(px)` in/out or pulses
- `colorOverlay.tsx`, `combined.tsx`: Utilities for combining effects and overlays where helpful
- `index.tsx`: Exports the effect components and the `ImageEffectType` enum used by `ImageBackground`

### Overlays (overlays/)

- `index.ts`: Types and helpers
  - `OverlayStyle`: `none | solid | gradient | vignette | duotone | pattern | colorFilter`
  - `BlendMode`: CSS blend modes
  - Individual typed configs per overlay style (e.g., `SolidOverlayConfig`, `GradientOverlayConfig`, ...)
  - Factory helpers: `createSolidOverlay`, `createGradientOverlay`, `createVignetteOverlay`, `createDuotoneOverlay`, `createPatternOverlay`, `createColorFilterOverlay`
- `OverlayRenderer.tsx`:
  - Accepts `OverlayConfig` and renders the appropriate overlay layer(s)
  - Common behavior:
    - Applies a breathing-curve animated opacity when `animateOpacity` is set
    - Uses CSS `mix-blend-mode` where relevant
  - Style-specific logic:
    - Solid: `backgroundColor`
    - Gradient: `linear` or `radial` gradient using provided colors and angle
    - Vignette: large `inset` `box-shadow` to simulate vignette (circle/ellipse)
    - Duotone: layered `multiply` (shadow) + `screen` (highlight) with `intensity`
    - Pattern: optional background color base, repeating pattern image, `backgroundSize` based on `patternScale`
    - ColorFilter: builds `backdrop-filter` with `hue-rotate`, `saturate`, `brightness`, `contrast`, `sepia`

### Config/Types/Presets

- `ImageBackground.types.ts`: Exported enums and props contracts for effects and overlays (positions, sizes, directions)
- `ImageBackground.config.ts`, `ImageBackground.variants.tsx`:
  - Centralized config helpers and curated variant exports for convenience
- `ImageBackground.presets.ts`: Presets aligned with test data schemas. Examples include:
  - `kenBurns_gentle_left_vignette`, `focus_dramatic_in_solid`, `breathing_gentle_none`, `static_vignette`, `zoom_slow_in_none`, `pan_fast_right_solid`, etc.
  - These presets can be spread into `video.templateVariation.image` for quick configuration

### Data Flow & Dependencies

- Theme: `ThemeContext` provides palette and gradients used when overlay colors are omitted
- Video data: `VideoDataContext` supplies `templateVariation.image` which is adapted and consumed
- Remotion: `useCurrentFrame`, `useVideoConfig`, and `interpolate` power per-frame transforms; `Img` renders the base image

### Usage

```tsx
// Use defaults from template variation
<ImageBackground />;

// Manually specify a preset effect via data
video.templateVariation.image = {
  ...imageBackgroundPresets.kenBurns_gentle_left_vignette,
  url: "https://example.com/hero.jpg",
};
```

### Links

- Parent: `../../README.md`
- Child READMEs:
  - Overlays: `./overlays/readMe.md`
  - Effect variants: `./variants/README.md`
