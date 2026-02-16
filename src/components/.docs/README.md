# Folder Overview

Reusable building blocks for Remotion video compositions. Theme-aware via ThemeContext; data-driven via VideoDataContext (template variations); animation-first using Remotion frame-based rendering.

## Skill

- `.skills/architecture/components-folder-structure.md` – Implementation guidance for components directory; ThemeContext/VideoDataContext; cross-cutting concerns; composition flow

## Files

No root-level source files; all logic in child modules.

## Child Modules

- **`animations/`**: generic animation variant configs (getAnimationConfig); lightweight, non–frame-accurate
- **`backgrounds/`**: BackgroundComponents, SelectTemplateBackground; Solid, Gradient, Image, Video, Patterns, Particles, Noise, Animated, Textures
- **`containers/`**: AnimatedContainer, animations, styles, modules, examples
- **`easing/`**: shared easing types, getImageEasingFunction; used by images, containers, typography
- **`images/`**: AnimatedImage, config/animations; entry/exit, aspect ratio, fallbacks
- **`layout/`**: screen (OneColumn), main/header, main/titleScreen, sponsors
- **`transitions/`**: TransitionWrapper, TransitionSeriesWrapper; @remotion/transitions
- **`typography/`**: AnimatedText; type-based styles, variants, word/letter splitting
- **`ui/`**: reserved for UI primitives (empty)

## Relations

- Parent folder: [../../README.md](../../README.md) (project root)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`, `core/utils/designPalettes`
- Consumed by: templates, compositions, core/utils/routing

## Dependencies

- Internal: core/context, core/utils
- External: React, Remotion, @remotion/transitions

## Cross-Cutting Concerns

- **Theme**: palette, typography, layout from ThemeContext
- **Data**: video.templateVariation from VideoDataContext
- **Animation**: useCurrentFrame, interpolate, spring; entry/exit normalized via hooks

## Child Documentation

- Detailed directory map, deep-dives, and usage examples: [DirectoryMap.md](DirectoryMap.md)
