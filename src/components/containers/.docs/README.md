# Folder Overview

Theme-aware, animation-first container system. AnimatedContainer combines palette-driven styling with entry/exit animations via normalizeContainerAnimation and useAnimation. Used across compositions and templates.

## Skill

- `.skills/architecture/components-containers-folder.md` – AnimatedContainer; animations, styles, modules; when to use modules vs raw

## Files

- **`AnimatedContainer.tsx`**: main component; props: type, size, rounded, shadow, backgroundColor, animation, exitAnimation, exitFrame; uses ThemeContext, useAnimation, style mappers
- **`types.ts`**: ContainerType, ContainerSize, ContainerRounded, ContainerShadow, ContainerBackgroundColor, ContainerProps
- **`index.ts`**: barrel export (AnimatedContainer, types, animations, styles, modules, examples)

## Child Modules

- **`animations/`**: animationTypes, animationUtils, useAnimation, springConfigs; normalizeContainerAnimation, calculateAnimationProgress, calculateAnimationStyles; utils by category (fade, slide, scale, etc.)
- **`styles/`**: getBackgroundColorStyle, getTypeStyles, getSizeStyles, getRoundedStyles, getShadowStyles
- **`modules/`**: pre-wired wrappers (fade, slide, scale, reveal, spring, threeD)
- **`examples/`**: showcase components for verification

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/utils/classNames`, `../easing`
- Consumed by: compositions, templates, layout, typography

## Dependencies

- Internal: animations, styles, core/context, core/utils, easing
- External: React, Remotion
