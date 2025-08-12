## Backgrounds Config

Shared configuration for background systems, including default constants and reusable animation helpers.

### Files

- `constants.ts`

  - Declares canonical enumerations and defaults used across all background variants:
    - `BACKGROUND_TYPES`: `solid | gradient | image | video | graphics | pattern | particle`
    - `GRADIENT_TYPES`: `linear | radial | conic`
    - `GRADIENT_DIRECTIONS`: common named directions and degrees (e.g., `to top`, `45deg`)
    - `BACKGROUND_POSITIONS`: `center | top | bottom | left | right | ...`
    - `BACKGROUND_SIZES`: `cover | contain | auto | stretch`
    - Default config objects for solid/gradient fallbacks (types include animation scaffolding fields)
  - Purpose: unify options and defaults so variants and templates reference the same vocabulary

- `animations.ts`

  - Pure functions returning per-frame style objects for common background animations:
    - `fadeAnimation(frame, start, end, fadeIn=true)` → `{ opacity }`
    - `zoomAnimation(frame, start, end, zoomIn=true)` → `{ transform: scale(...) }`
    - `panAnimation(frame, start, end, direction)` → `{ transform: translate(...) }`
    - `kenBurnsAnimation(frame, start, end)` → combined scale and translate for cinematic effect
    - `parallaxAnimation(frame, start, end, depth)` → vertical translate proportional to depth
    - `slideInAnimation(...)` / `slideOutAnimation(...)` → translate in/out from edges
    - `getBackgroundAnimation(type, frame, start, end, isExit?)` → dispatcher selecting a specific animation
  - Internals use Remotion `interpolate` with clamped extrapolation

- `index.ts`, `types.ts`
  - Barrel exports and shared type declarations for background props and configurations

### How it Fits

- Consumed by variant components in `../variants/*` and by `backgrounds/index.tsx`
- Keeps animation math centralized so visual consistency remains across background families

### Links

- Parent: `../README.md`
- Variants overview: `../README.md#variants`
