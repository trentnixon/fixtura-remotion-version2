## Animation Utilities (by Category)

Helper functions grouped by effect category. These are used internally by the container animation system.

### Files

- `fadeAnimations.ts` — Opacity-only transitions
- `slideAnimations.ts` — Translate X/Y based on edge direction and progress
- `scaleAnimations.ts` — Scale in/out and axis-specific scaling
- `perspectiveAnimations.ts` — 3D-like transforms (`flipX/Y`, `rotate3D`, `zoomPerspective`, `swing`)
- `springAnimations.ts` — Spring-in/out/scale/translate/rotate helpers
- `specialAnimations.ts` — Extras like `glitch`, `blur`
- `index.ts` — Barrel export

### Notes

- Prefer using `useAnimation` which routes to these helpers. Direct use is possible when composing custom animation graphs.
