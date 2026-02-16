# Folder Overview

Dynamic particle-based backgrounds (dots, lines, bubbles, snow, confetti). Theme and template-variation driven; renderer selected by particle type.

## Files

- **`index.tsx`**: ParticleBackground — reads video.templateVariation.particle and selectedPalette (via StyleContext); builds particleProps; selects renderer from variants registry
- **`config.ts`**: ParticleType, ParticleDirection, ParticleAnimation, Particle; PARTICLE_TYPES, PARTICLE_VARIANTS, DEFAULT_PARTICLE_SETTINGS
- **`utils.ts`**: shared particle math/randomization helpers
- **`variants/`**: DotsRenderer, LinesRenderer, BubblesRenderer, SnowRenderer, ConfettiRenderer; index.ts registry

## Child Modules

- **`variants/`**: per-type renderer components

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/VideoDataContext`, `core/context` (StyleContext)
- Consumed by: BackgroundComponents.Particle, SelectTemplateBackground

## Dependencies

- Internal: `core/context`, `variants/`
- External: React, Remotion
