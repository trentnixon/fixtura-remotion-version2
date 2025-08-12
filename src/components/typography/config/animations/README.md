## Typography Animations (Internals)

Low-level pieces that power `config/animations.ts` for typography.

### Files

- `types.ts` — Animation types and configs
- `animationUtils.ts` — Normalization helpers and shared math
- `useAnimation.ts` — Hook computing frame-based styles for text
- `fadeAnimations.ts` — Fade-in variants (including directional fade)
- `scaleAnimations.ts` — Scale-in, typewriter-like scale effects
- `springAnimations.ts` — Spring-powered text motion
- `slideAnimation.ts` — Single-file slide animation for text
- `specialAnimations.ts` — Extra effects (e.g., bounce, elastic)
- `springConfigs.ts` — Named spring configs for text
- `index.ts` — Barrel export

### Notes

- Text animations are tuned for readability and work well with letter/word splitting in `AnimatedText`.
