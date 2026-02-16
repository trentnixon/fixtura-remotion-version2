# Skill: Components Backgrounds Folder

## Purpose

Guides working with `src/components/backgrounds`: BackgroundComponents registry, SelectTemplateBackground, config, variants (Solid, Gradient, Image, Video, Patterns, Particles, Noise, Animated, Textures), TemplateVariationAdapter, overlay system. Use when adding or modifying background variants, overlays, or template variation integration.

## Applies To

- `src/components/backgrounds/` (root)
- `index.tsx`: BackgroundComponents registry, SelectTemplateBackground
- `config/`: constants, animations, types
- `variants/`: Solid, Gradient, Image, Video, Patterns, Particles, NoiseBackground, Animated, Textures
- Consumers: templates (SelectTemplateBackground), compositions

## Inputs

- ThemeContext (palette, layout)
- VideoDataContext (video.templateVariation.useBackground, image, noise.type)
- `core/types/data/videoData` (VideoTemplateVariation)
- Folder readMe: `backgrounds/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/backgrounds/
├── index.tsx              # BackgroundComponents, SelectTemplateBackground
├── config/                # constants, animations, types
├── hooks/                 # placeholder
└── variants/
    ├── Solid/
    ├── Gradient/
    ├── Image/             # overlays/, variants/; TemplateVariationAdapter
    ├── Video/
    ├── Patterns/
    ├── Particles/
    ├── NoiseBackground/   # NOISE_VARIANTS, sub-variants (Subtle, Grain, etc.)
    ├── AnimatedBackground.tsx
    └── Textures/
```

### 2. SelectTemplateBackground Flow

1. Reads `video.templateVariation?.useBackground` from VideoDataContext
2. Switch: Gradient, Image, Video, Texture, Graphics, Noise, Pattern, Particle, Solid (fallback)
3. For Noise: passes `video.templateVariation?.noise?.type` to choose sub-variant
4. For Image: ImageBackground reads `video.templateVariation.image`; TemplateVariationAdapter normalizes legacy config

### 3. Config (Shared)

- **constants**: BACKGROUND_TYPES, GRADIENT_TYPES, GRADIENT_DIRECTIONS, BACKGROUND_POSITIONS, BACKGROUND_SIZES
- **animations**: `getBackgroundAnimation(type, frame, start, end, isExit?)` — fade, zoom, pan, kenBurns, parallax, slide

### 4. ImageBackground: Effects + Overlays

- **Effects**: zoom, pan, kenBurns, breathing, focusBlur (ImageEffectType)
- **Overlays**: solid, gradient, vignette, duotone, pattern, colorFilter (OverlayRenderer)
- **TemplateVariationAdapter**: adaptImageConfig, mapEffectType, mapDirection — normalizes legacy template variation
- **Presets**: kenBurns_gentle_left_vignette, focus_dramatic_in_solid, etc.

### 5. NoiseBackground Sub-variants

- GridNoise (Default), SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise
- FloatingParticles, DynamicParticles, TriangleSwarm, PulsingCircles, DigitalRain, GradientGrid
- GeometricGraphics, SpokesGraphics
- NOISE_VARIANTS config for template configuration

### 6. When Adding a New Background Variant

1. Implement component in `variants/<Name>/`
2. Add to BackgroundComponents registry in index.tsx
3. Add case to SelectTemplateBackground switch (or extend existing branch)
4. Update VideoTemplateVariation type if new useBackground value
5. Use config/animations for shared frame-based effects

### 7. When Adding Image Overlay Type

1. Add to overlays (OverlayStyle, createXxxOverlay)
2. Wire into OverlayRenderer
3. ThemeIntegration for palette-derived colors when omitted

### 8. When Adding Noise Sub-variant

1. Add component to NoiseBackground/variants/
2. Add to NOISE_VARIANTS and BackgroundComponents.Noise
3. Update noise type in template variation if needed

## Output

- Correct understanding of SelectTemplateBackground and variant dispatch
- Ability to add variants, overlays, or noise types
- Clear path from templateVariation to rendered background

## Rules

- Templates use SelectTemplateBackground(); custom backgrounds only when variant-specific
- ThemeContext and VideoDataContext drive palette and config
- config/animations provides shared getBackgroundAnimation
- Image overlays use themeIntegration for default colors

## References

- backgrounds: `src/components/backgrounds/.docs/readMe.md`
- config: `src/components/backgrounds/config/.docs/README.md`
- Image: `src/components/backgrounds/variants/Image/.docs/readMe.md`
- Image overlays: `src/components/backgrounds/variants/Image/overlays/.docs/readMe.md`
- NoiseBackground: `src/components/backgrounds/variants/NoiseBackground/.docs/README.md`
- Parent: `components-folder-structure.md`
- Tier 3 (if needed): components-backgrounds-image-folder, components-backgrounds-noise-folder
