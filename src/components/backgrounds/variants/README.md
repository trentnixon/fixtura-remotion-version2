## Background Variants

Families of background implementations used by compositions. Each family exposes a primary entry and internal subcomponents.

### Families

- `AnimatedBackground.tsx`: Pure CSS/SVG animated backgrounds (pulsing/moving gradients, breathing color, wave) using frame-interpolated values.
- `Gradient/`:
  - `GradientBackground.tsx`: Theme-driven gradient fills derived from `ThemeContext` and `VideoDataContext` directions.
- `Image/`:
  - `index.tsx` (ImageBackground): Effect-driven image background (zoom/pan/breathing/focus-blur), overlays, presets, and template variation adapter.
  - Child docs: `variants/README.md`, `overlays/readMe.md`
- `NoiseBackground/`:
  - Procedural noise and SVG graphics variants including `SpokesGraphics`, with configuration in `config.ts`.
  - Child docs: `README.md`
- `Particles/`:
  - `index.tsx` (ParticleBackground): Particle fields (dots/lines/bubbles/snow/confetti) with variant renderers.
- `Patterns/`:
  - `index.tsx` (PatternBackground): SVG pattern backgrounds (dots/lines/grid/crosshatch/triangles/chevron).
- `Solid/`:
  - `SolidBackground.tsx`: Theme background color fill.
- `Video/`:
  - `VideoBackground.tsx`: Plays a video background with optional offthread rendering and overlay.

### Integration

- See `../README.md` for how these families plug into `backgrounds/index.tsx` via `BackgroundComponents` and `SelectTemplateBackground()`.
