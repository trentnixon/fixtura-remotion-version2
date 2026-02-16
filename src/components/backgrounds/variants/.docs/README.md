# Folder Overview

Background variant families used by compositions. Each family exposes a primary entry; some have internal subcomponents. Wired into `BackgroundComponents` and `SelectTemplateBackground()` in `../index.tsx`.

## Files

- **`AnimatedBackground.tsx`**: pure CSS/SVG animated backgrounds (pulsing gradients, breathing, wave) via frame interpolation

## Child Modules

- **`Solid/`**: SolidBackground — theme palette fill
- **`Gradient/`**: GradientBackground — palette-driven gradients with direction
- **`Image/`**: ImageBackground — effect-driven image (zoom/pan/breathing/blur), overlays, presets
- **`Video/`**: VideoBackground — plays video, offthread, overlays
- **`Patterns/`**: PatternBackground — SVG patterns (dots/lines/grid/crosshatch/triangles/chevron)
- **`Particles/`**: ParticleBackground — particle fields (dots/lines/bubbles/snow/confetti)
- **`NoiseBackground/`**: procedural noise and SVG graphics (GridNoise, variants, SpokesGraphics)
- **`Textures/`**: TextureBackground — tiled texture with color overlay in multiply blend

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../../config`, `core/context/ThemeContext`, `core/context/VideoDataContext`
- Consumed by: `../index.tsx` (BackgroundComponents, SelectTemplateBackground)

## Dependencies

- Internal: `../../config`, `core/context`
- External: React, Remotion
