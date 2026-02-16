# Folder Overview

Centralized background rendering for compositions. Provides Solid, Gradient, Image, Video, Patterns, Particles, Noise, Animated, and Texture background variants. Integrates with ThemeContext and VideoDataContext via `video.templateVariation`.

## Files

- **`index.tsx`**: BackgroundComponents registry (Solid, Gradient, Image, Video, Graphics, Pattern, Particle, Texture, Noise sub-variants, Animated); SelectTemplateBackground() reads `video.templateVariation.useBackground` and renders the selected background; re-exports config

## Child Modules

- **`config/`**: constants, animations, types — shared enums (BACKGROUND_TYPES, GRADIENT_TYPES, positions, sizes) and frame-based style calculators (getBackgroundAnimation for fade/zoom/pan/kenBurns/parallax/slide)
- **`hooks/`**: placeholder for future shared hooks (e.g. useBackgroundGradient, useBackgroundExitTiming); none defined yet
- **`variants/Solid/`**: SolidBackground — theme palette fill
- **`variants/Gradient/`**: GradientBackground — palette-driven gradients with direction support
- **`variants/Image/`**: ImageBackground — effect-driven (zoom/pan/breathing/focus-blur), overlays (solid/gradient/vignette/duotone/pattern/color-filter), presets, TemplateVariationAdapter
- **`variants/Video/`**: VideoBackground — plays video as background, offthread option, overlays
- **`variants/Patterns/`**: PatternBackground — SVG patterns (dots/lines/grid/crosshatch/triangles/chevron)
- **`variants/Particles/`**: ParticleBackground — particle fields (dots/lines/bubbles/snow/confetti)
- **`variants/NoiseBackground/`**: procedural noise and SVG graphics (GridNoise, ShapeNoise, ParticleNoise, SpokesGraphics, plus SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise, FloatingParticles, etc.)
- **`variants/AnimatedBackground.tsx`**: pure CSS/SVG animated backgrounds (pulsing gradients, breathing, wave) via frame interpolation
- **`variants/Textures/`**: TextureBackground — tiled image with color overlay in multiply blend mode

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`, `core/types/data/videoData`
- Consumed by: templates (SelectTemplateBackground), compositions, base layout

## Dependencies

- Internal: `config`, `variants`, `core/context`, `core/types`
- External: React, Remotion (interpolate, useCurrentFrame)

## Child Documentation

- config: [config/.docs/readMe.md](config/.docs/readMe.md)
- hooks: [hooks/.docs/readMe.md](hooks/.docs/readMe.md)
- variants: [variants/.docs/readMe.md](variants/.docs/readMe.md)
- Solid: [variants/Solid/.docs/readMe.md](variants/Solid/.docs/readMe.md)
- Gradient: [variants/Gradient/.docs/readMe.md](variants/Gradient/.docs/readMe.md)
- Image: [variants/Image/.docs/readMe.md](variants/Image/.docs/readMe.md), [variants/Image/variants/.docs/readMe.md](variants/Image/variants/.docs/readMe.md), [variants/Image/overlays/.docs/readMe.md](variants/Image/overlays/.docs/readMe.md)
- Video: [variants/Video/.docs/readMe.md](variants/Video/.docs/readMe.md)
- Patterns: [variants/Patterns/.docs/readMe.md](variants/Patterns/.docs/readMe.md), [variants/Patterns/variants/.docs/readMe.md](variants/Patterns/variants/.docs/readMe.md)
- Particles: [variants/Particles/.docs/readMe.md](variants/Particles/.docs/readMe.md), [variants/Particles/variants/.docs/readMe.md](variants/Particles/variants/.docs/readMe.md)
- NoiseBackground: [variants/NoiseBackground/.docs/readMe.md](variants/NoiseBackground/.docs/readMe.md), [variants/NoiseBackground/variants/.docs/readMe.md](variants/NoiseBackground/variants/.docs/readMe.md)
- Textures: [variants/Textures/.docs/readMe.md](variants/Textures/.docs/readMe.md)
