## Container Animations

Unified animation system for `AnimatedContainer` built on Remotion interpolation and spring primitives.

### Files

- `animationTypes.ts` — `ContainerAnimationType` union, easing types (reuse of image easing types), config interfaces
- `animationUtils.ts`
  - `normalizeContainerAnimation(animation, delay, duration, easing)` → config object
  - `calculateAnimationProgress(frame, start, duration, easing)` → normalized [0..1] progress using `interpolate`
  - `createSpringAnimation(frame, start, fps, config, durationInFrames?)` → Remotion `spring` result
  - `calculateAnimationStyles(type, progress)` → style transforms for all supported types (fade/slide/scale/reveal/spring/3D/glitch/blur)
- `useAnimation.ts` — Hook to compute current animation style from config and start frame, with exit-handling
- `springConfigs.ts` — Named presets
- `utils/` — Category-specific calculators used internally by `useAnimation` or style generators
- `index.ts` — Barrel export of the system (types, utils, hook, spring configs)

### Flow

1. Normalize config (string → object)
2. Compute progress based on frame/start/duration and easing
3. Optionally compute spring value for spring-based animations
4. Map to CSS transforms/filters/clip paths

### Links

- Parent: `../README.md`
- Component: `../AnimatedContainer.tsx`
