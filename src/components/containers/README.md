# AnimatedContainer and Container System

A theme-aware, animation-first container system for Remotion videos. Provides a single `AnimatedContainer` component, a full animation pipeline, type-safe style utilities, and pre-wired modules for common motion patterns.

## Architecture

- Component: `AnimatedContainer.tsx`
- Animations: `animations/` (types, utils, hooks, spring configs)
- Styles: `styles/` (background, type, size, rounded, shadow mappers)
- Modules: `modules/` (preconfigured wrappers for fade, slide, scale, reveal, spring, 3D)
- Examples: `examples/`
- Barrel: `index.ts`

## Data & Theme Flow

- Reads palette from `ThemeContext` to compute semantic container backgrounds and type-specific borders/shadows.
- Entry/Exit animation selection and easing normalization follow image/typography systems for consistency.
- Final inline styles are the union of: user `style` → animation styles → background/type/rounded/shadow/size styles.

## AnimatedContainer.tsx (internals)

1. Normalize entry and exit configs via `normalizeContainerAnimation(animation, delay, duration, easing)`.
2. Merge optional spring config onto the normalized config.
3. Compute `isExiting` by comparing `useCurrentFrame()` with `exitFrame`.
4. Determine animation start frame, offsetting by delays and `exitFrame` for exits.
5. Call `useAnimation(config, startFrame)` to resolve the current frame’s style object.
6. Compose CSS from `getBackgroundColorStyle`, `getTypeStyles`, `getSizeStyles`, `getRoundedStyles`, `getShadowStyles`.
7. Render a `<div>` with combined className/style and ARIA props.

## Animations

`containers/animations/` provides:

- `animationTypes.ts`: `ContainerAnimationType` (fade, slide, scale, reveal, spring, 3D, special), easing types, and config interfaces.
- `animationUtils.ts`:
  - `normalizeContainerAnimation`
  - `calculateAnimationProgress` (uses `interpolate` with `getImageEasingFunction`)
  - `createSpringAnimation` (delegates to Remotion `spring`)
  - `calculateAnimationStyles` (map progress to transforms/filters/clip-path)
- `useAnimation.ts`: Hook to compute frame-based entry/exit animation styles.
- `springConfigs.ts`: Named spring presets.
- `utils/*`: Granular calculators grouped by category.

## Styles

- `backgroundStyles.ts`: Maps semantic names like `primary`, `main`, `transparentSecondary`, and various gradient tokens to palette values.
- `typeStyles.ts`: Per-type decorations (borders, cards, gradients).
- `sizeStyles.ts`, `roundedStyles.ts`, `shadowStyles.ts`: Common mappers to standardize layout.

## Modules

Preconfigured wrappers for frequent patterns. Each module exports a small set of components and default configs to ensure consistency:

- `fade.tsx`: `FadeIn`, `FadeOut`, `FadeInOut`, `FadeInSpring`, with `DEFAULT_*` configs
- `slide.tsx`: Directional slide-in/out and spring translate variants
- `scale.tsx`: Scale-in/out/inX/inY and a spring scale
- `reveal.tsx`: Reveal/collapse from edges
- `spring.tsx`: Spring-in/out/scale/translate/rotate presets
- `threeD.tsx`: FlipX/Y, rotate3D, swing, zoomPerspective, glitch, blur
- `index.ts`: Aggregates all module exports

## Examples

Use examples to verify behaviors and as a quick-start reference:

```tsx
import {
  BasicContainer,
  FadeInContainer,
  SlideInContainer,
  ScaleContainer,
  SpringContainer,
  FlipContainer,
  SequencedContainers,
  AnimationShowcase,
  SpringConfigShowcase,
} from "./examples";
```

## Usage

Basic:

```tsx
<AnimatedContainer
  type="border"
  backgroundColor="primary"
  rounded="md"
  shadow="md"
>
  <Typography>Container Content</Typography>
</AnimatedContainer>
```

With animation and exit:

```tsx
<AnimatedContainer
  type="card"
  backgroundColor="light"
  rounded="lg"
  shadow="lg"
  animation={{
    type: "fadeIn",
    duration: 30,
    easing: { type: "inOut", base: "ease" },
  }}
  exitAnimation={{ type: "fadeOut", duration: 30 }}
  exitFrame={60}
>
  <Typography>Animated Container</Typography>
</AnimatedContainer>
```

Spring animation:

```tsx
<AnimatedContainer
  type="card"
  backgroundColor="light"
  rounded="lg"
  shadow="lg"
  animation="springIn"
  springConfig={{ mass: 1, damping: 8, stiffness: 100 }}
  animationDuration={45}
/>
```

## Props (summary)

- Variant & layout: `type`, `size`, `rounded`, `shadow`, `backgroundColor`
- Entry: `animation`, `animationDelay`, `animationDuration`, `animationEasing`, `springConfig`
- Exit: `exitAnimation`, `exitAnimationDelay`, `exitAnimationDuration`, `exitAnimationEasing`, `exitSpringConfig`, `exitFrame`
- Misc: `className`, `style`, `onClick`, `role`, `ariaLabel`, `tabIndex`

See `containers/types.ts` and `containers/animations/animationTypes.ts` for full typing.
