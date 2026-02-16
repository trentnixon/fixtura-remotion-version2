# Skill: Components Images Folder

## Purpose

Guides working with `src/components/images`: AnimatedImage, config/animations, useDualImageAnimation. Use when adding image entry/exit animations, new animation types, or handling dual-image (logo swap) flows.

## Applies To

- `src/components/images/` (root)
- `AnimatedImage.tsx`: animation, exitAnimation, exitFrame, aspect ratio
- `config/`: normalizeImageAnimation, useImageAnimation, useDualImageAnimation
- `config/animations/`: fade, zoom, slide, special, rotate, spring, camera, cinematic, effects, perspective, broadcast, composite
- Consumers: compositions, templates, layout

## Inputs

- `../easing` for shared easing and types
- Remotion Img
- Folder readMe: `images/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/images/
├── AnimatedImage.tsx
├── placeholders.ts         # GENERIC_PLACEHOLDER, LOGO_PLACEHOLDER, etc.
├── index.ts
└── config/
    ├── animationUtils.ts   # normalizeImageAnimation
    ├── useImageAnimation.ts  # useImageAnimation, useDualImageAnimation
    ├── springConfigs.ts
    ├── imageAnimations.ts  # re-exports from animations
    └── animations/         # per-category functions (fade, zoom, slide, etc.)
```

### 2. Animation Flow

1. **normalizeImageAnimation**: shorthand (e.g. "fadeIn") → full ImageAnimationConfig
2. **useImageAnimation** (single): entry animation styles
3. **useDualImageAnimation**: entry + exit with dual images (e.g. logo swap); crossfade or sequenced
4. **getAnimationStyles**: dispatched to config/animations/* by type

### 3. When to Use useDualImageAnimation

- Logo or image swap: two sources, crossfade or sequenced exit/entry
- Single image with entry/exit: useImageAnimation + exitAnimation on AnimatedImage
- AnimatedImage handles preloadImage(s), getImageDimensions internally

### 4. When Adding a New Animation Type

1. Add type to animation config union (e.g. in config or animations)
2. Create or extend file in `config/animations/` (e.g. `myAnimations.ts`) — export `AnimationFunction(frame, start, end, config) → React.CSSProperties`
3. Wire into useImageAnimation dispatch (switch or registry)
4. Add shorthand to normalizeImageAnimation if desired (e.g. "myIn" → full config)

### 5. Animation Categories (config/animations)

| Category | Examples |
|----------|----------|
| fade | fade in/out |
| zoom | zoom in/out |
| slide | slide from edges |
| special | kenBurns, pulse |
| rotate | rotate |
| spring | physics-based |
| camera | focus, exposure |
| cinematic | wipes, splits |
| effects | glitch, ripple, tint |
| perspective | flips, swings |
| broadcast | lower thirds, scoreboards |
| composite | composed multi-step |

### 6. Placeholders

- `placeholders.ts`: GENERIC_PLACEHOLDER, LOGO_PLACEHOLDER, PLAYER_PLACEHOLDER, SPORT_PLACEHOLDERS for fallbacks

## Output

- Correct use of useImageAnimation vs useDualImageAnimation
- Ability to add new image animation types

## Rules

- Use shared easing from `../easing`; config re-exports types and getImageEasingFunction
- Animation functions return CSSProperties; use Remotion interpolate/spring
- Keep config/animations organized by category; index aggregates for dispatch

## References

- images: `src/components/images/.docs/readMe.md`
- config: `src/components/images/config/.docs/readMe.md`
- config/animations: `src/components/images/config/animations/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- easing: `components-easing-folder.md`
