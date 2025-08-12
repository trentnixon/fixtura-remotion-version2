## Backgrounds

Centralized background rendering for compositions. Provides Solid, Gradient, Image, Video, Patterns, Particles, Noise, and Animated background variants. Integrates with Theme and Video template variations.

### Entry

- `index.tsx`:
  - `BackgroundComponents`: Registry for top-level background families and noise sub-variants.
  - `SelectTemplateBackground()`: Reads `video.templateVariation.useBackground` and selects the appropriate background at runtime.

### Config

- `config/constants.ts`: Enums/defaults for background types, positions, sizes, and default solid/gradient presets.
- `config/animations.ts`: Frame-based style calculators (`getBackgroundAnimation`) for fade/zoom/pan/kenBurns/parallax/slide.
- `config/index.ts`, `config/types.ts`: Shared types/exports.

### Variants

- Solid: `variants/Solid/SolidBackground.tsx` — theme color fill.
- Gradient: `variants/Gradient/GradientBackground.tsx` — palette-driven gradients with direction support.
- Image: `variants/Image/index.tsx` — effect-driven rendering (zoom/pan/breathing/focus-blur/none), with overlays (solid/gradient/vignette/duotone/pattern/color-filter) and preset/adapters.
- Video: `variants/Video/VideoBackground.tsx` — plays videos as background (supports offthread rendering and overlays).
- Patterns: `variants/Patterns/index.tsx` — SVG-based repeatable patterns with optional animation.
- Particles: `variants/Particles/index.tsx` — dynamic particle fields (dots/lines/bubbles/snow/confetti).
- Noise: `variants/NoiseBackground/*` — procedural noise and SVG graphics variants (see child README).
- Animated: `variants/AnimatedBackground.tsx` — CSS/SVG animated backgrounds independent of assets.

### Child Documentation

- Noise backgrounds: `variants/NoiseBackground/README.md`
- Image effect variants: `variants/Image/variants/README.md`
- Image overlays: `variants/Image/overlays/readMe.md`

### Integration

- Theme: `useThemeContext()` supplies palette and gradients.
- Data: `useVideoDataContext()` provides `video.templateVariation` (e.g., background type, noise type, gradient direction, image overlay).

### Example

```tsx
// Choose based on template variation
<SelectTemplateBackground />
```
