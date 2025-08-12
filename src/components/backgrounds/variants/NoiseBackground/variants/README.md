## Noise and Graphics Variants

A collection of procedural and SVG graphics backgrounds used under the `Noise` family.

### Files

- `SubtleNoise.tsx`, `GrainNoise.tsx`, `WaveNoise.tsx`, `FogNoise.tsx`, `StaticNoise.tsx` — Procedural noise patterns with different visual traits
- `FloatingParticles.tsx`, `DynamicParticles.tsx`, `TriangleSwarm.tsx`, `PulsingCircles.tsx`, `DigitalRain.tsx`, `GradientGrid.tsx` — Animated particle and shape-based effects
- `GeometricGraphics.tsx`, `SpokesGraphics.tsx` — SVG graphics backgrounds
  - `svg/spokes/intro.tsx`, `svg/spokes/content.tsx` — Intro/content spokes used by `SpokesGraphics`

### Data Flow

- Many variants accept color props (`baseColor`, `primaryColor`, `secondaryColor`, `accentColor`) mapped from the theme palette by the caller
- `SpokesGraphics` uses `VideoDataContext.timings` to synchronize intro/content segments

### Links

- Parent family: `../README.md`
- Family entry: `../../index.ts` (registry)
