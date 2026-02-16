# Skill: Components Containers Folder

## Purpose

Guides working with `src/components/containers`: AnimatedContainer, animations, styles, modules, and examples. Use when adding entry/exit animations, new modules, or choosing between raw AnimatedContainer vs pre-wired modules.

## Applies To

- `src/components/containers/` (root)
- `AnimatedContainer.tsx`: type, size, rounded, shadow, backgroundColor, animation, exitAnimation, exitFrame
- Child modules: animations, styles, modules, examples
- Consumers: compositions, templates, layout, typography

## Inputs

- ThemeContext (palette, component styles)
- `../easing` for shared easing
- Folder readMe: `containers/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/containers/
├── AnimatedContainer.tsx   # Main component
├── types.ts
├── index.ts
├── animations/             # animationTypes, animationUtils, useAnimation, springConfigs
│   └── utils/             # fade, slide, scale, perspective, spring, special
├── styles/                 # getBackgroundColorStyle, getTypeStyles, getSizeStyles, etc.
├── modules/                # Pre-wired wrappers (fade, slide, scale, reveal, spring, threeD)
└── examples/               # Showcase components
```

### 2. Entry/Exit Flow

1. **normalizeContainerAnimation** (animations): converts declarative config → full animation config
2. **useAnimation**: frame-based hook; computes progress from start/end frames; calls calculateAnimationStyles
3. **calculateAnimationStyles**: maps to CSS transforms, filters, clip-path via utils (fade, slide, scale, etc.)
4. **ThemeContext**: palette-driven backgroundColor, typeStyles, sizeStyles, rounded, shadow

### 3. When to Use Modules vs Raw AnimatedContainer

| Use | Choose |
|-----|--------|
| Common pattern with defaults (fade, slide, scale) | `modules/` (FadeIn, SlideIn, ScaleIn, etc.) |
| Custom animation or composite needs | Raw `AnimatedContainer` with animation prop |
| Predefined 3D effects | `modules/threeD` (FlipX, FlipY, Rotate3D, Swing, etc.) |

### 4. When Adding a New Animation Type

1. Add to `animations/animationTypes.ts` (ContainerAnimationType union)
2. Implement calculator in `animations/utils/` (e.g. `myAnimations.ts`)
3. Wire into `calculateAnimationStyles` in animationUtils
4. Optional: add module in `modules/` if it's a common pattern

### 5. When Adding a New Module

1. Create file in `modules/` (e.g. `myModule.tsx`)
2. Wrap AnimatedContainer with fixed animation config
3. Export from `modules/index.ts`
4. Use in compositions or examples for verification

### 6. Key Props

- `type`, `size`, `rounded`, `shadow`, `backgroundColor`: styling from ThemeContext
- `animation`, `exitAnimation`, `exitFrame`: entry/exit via useAnimation

## Output

- Correct choice between modules and raw AnimatedContainer
- Ability to add animation types or new modules

## Rules

- All animation uses Remotion interpolate/spring; easing from `../easing`
- Styles come from ThemeContext; use getTypeStyles, getSizeStyles, etc.
- Modules are convenience wrappers; do not duplicate logic from animations

## References

- containers: `src/components/containers/.docs/readMe.md`
- animations: `src/components/containers/animations/.docs/readMe.md`
- modules: `src/components/containers/modules/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- easing: `components-easing-folder.md`
