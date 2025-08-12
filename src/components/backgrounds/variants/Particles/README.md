## Particle Background

Dynamic particle-based backgrounds with multiple renderer variants.

### Files

- `index.tsx` (ParticleBackground)
  - Reads `video.templateVariation.particle` and `selectedPalette` (via `StyleContext`)
  - Constructs `particleProps` (color, background gradient, type, count, speed, direction, animation)
  - Chooses a renderer component from `variants/index.ts` mapping, defaulting to dots
- `config.ts`
  - Types: `ParticleType`, `ParticleDirection`, `ParticleAnimation`, `Particle`, `ParticleBackgroundProps`, `ParticleVariantProps`
  - Constants: `PARTICLE_TYPES`, `PARTICLE_VARIANTS`, and `DEFAULT_PARTICLE_SETTINGS`
- `utils.ts`
  - Shared helpers for particle math/randomization (implementation-specific)
- `variants/`
  - `DotsRenderer.tsx`, `LinesRenderer.tsx`, `BubblesRenderer.tsx`, `SnowRenderer.tsx`, `ConfettiRenderer.tsx`
  - `index.ts`: Registry mapping `ParticleType` to a renderer component

### Data Flow

- Theme → background gradient and particle color
- Video data → variant type and motion parameters
- Renderer → produces a canvas/SVG/DOM animation per frame

### Usage

```tsx
<ParticleBackground />
```

### Links

- Parent: `../../README.md`
