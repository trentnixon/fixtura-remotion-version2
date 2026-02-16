# Folder Overview

Per-type particle renderer components. Each renders a field of particles based on ParticleVariantProps (particles, frame). Registry maps ParticleType to renderer.

## Files

- **`DotsRenderer.tsx`**: dots with size/speed variations
- **`LinesRenderer.tsx`**: moving line segments
- **`BubblesRenderer.tsx`**: ascending bubble-like circles
- **`SnowRenderer.tsx`**: snowfall with drift
- **`ConfettiRenderer.tsx`**: multicolor confetti with randomized angles
- **`index.ts`**: registry mapping ParticleType to renderer

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../utils.ts` for particle math
- Consumed by: ParticleBackground (index.tsx)

## Dependencies

- Internal: `../utils`
- External: React, Remotion
