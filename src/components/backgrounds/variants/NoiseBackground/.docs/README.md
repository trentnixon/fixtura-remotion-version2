# Folder Overview

Procedural noise and SVG graphics backgrounds. GridNoise, ShapeNoise, ParticleNoise, GraphicsBackground; plus variants (SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise, FloatingParticles, DynamicParticles, TriangleSwarm, PulsingCircles, DigitalRain, GradientGrid, SpokesGraphics). NOISE_VARIANTS config; SpokesGraphics uses VideoDataContext timings.

## Files

- **`index.ts`**: exports GridNoise, ParticleNoise, GraphicsBackground, NOISE_VARIANTS
- **`config.ts`**: NoiseVariant union, NOISE_VARIANTS metadata
- **`GridNoise.tsx`**: grid-based noise; 2D/3D noise
- **`ShapeNoise.tsx`**: helper for ParticleNoise; renders circles, squares, triangles, lines
- **`ParticleNoise.tsx`**: particle-based noise
- **`GraphicsBackground.tsx`**: SVG graphics (geometric, organic, abstract, tech, flowing variants)
- **`variants/`**: SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise, FloatingParticles, DynamicParticles, TriangleSwarm, PulsingCircles, DigitalRain, GradientGrid, GeometricGraphics, SpokesGraphics

## Child Modules

- **`variants/`**: procedural and graphics variant components; svg/spokes/ for SpokesGraphics intro/content

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/VideoDataContext` (SpokesGraphics timings), `core/context/ThemeContext`
- Consumed by: BackgroundComponents.Noise.*, SelectTemplateBackground

## Dependencies

- Internal: `core/context`, `variants/`
- External: React, Remotion
