# Folder Overview

Procedural noise and SVG graphics variant components under the Noise family. SubtleNoise, GrainNoise, WaveNoise, FogNoise, StaticNoise; FloatingParticles, DynamicParticles, TriangleSwarm, PulsingCircles, DigitalRain, GradientGrid; GeometricGraphics, SpokesGraphics (with svg/spokes intro/content).

## Files

- **Procedural**: SubtleNoise.tsx, GrainNoise.tsx, WaveNoise.tsx, FogNoise.tsx, StaticNoise.tsx
- **Particle/shape**: FloatingParticles.tsx, DynamicParticles.tsx, TriangleSwarm.tsx, PulsingCircles.tsx, DigitalRain.tsx, GradientGrid.tsx
- **Graphics**: GeometricGraphics.tsx, SpokesGraphics.tsx
- **`svg/spokes/`**: intro.tsx, content.tsx (used by SpokesGraphics)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/VideoDataContext` (SpokesGraphics timings), theme palette for colors
- Consumed by: BackgroundComponents.Noise registry (index.tsx)

## Dependencies

- Internal: `core/context`
- External: React, Remotion
