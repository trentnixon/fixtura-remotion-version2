## Particle Renderers

Renderer components for each supported `ParticleType`.

### Files

- `DotsRenderer.tsx` — Renders a field of dots with size/speed variations
- `LinesRenderer.tsx` — Renders moving line segments
- `BubblesRenderer.tsx` — Ascending bubble-like circles
- `SnowRenderer.tsx` — Snowfall-like particles with varying drift
- `ConfettiRenderer.tsx` — Multicolor confetti with randomized angles
- `index.ts` — Registry mapping types to renderer components

### Notes

- Each renderer receives `ParticleVariantProps { particles, frame }` and is responsible for producing visuals based on current frame.
- Shared helpers live in `../utils.ts`.
