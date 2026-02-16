# Folder Overview

Reusable layout primitives for assembling scenes: screen containers, headers, title-screen permutations, sponsors. Uses ThemeContext.layout.heights; presentational arrangements that slot in AnimatedContainer, AnimatedText, AnimatedImage.

## Skill

- `.skills/architecture/components-layout-folder.md` – screen (OneColumn), header, titleScreen, sponsors; RouteToComposition; slot composition pattern

## Files

No root-level files; all in child modules.

## Child Modules

- **`screen/`**: OneColumn — page-level wrapper with header/content heights, RouteToComposition; TwoColumn (if present)
- **`main/header/`**: header layout variants (VerticalStack, TwoColumnLayout); slots: Title, Logo, Name; getAlignmentClasses
- **`main/header/variants/`**: VerticalStack.tsx, TwoColumnLayout.tsx — concrete permutations
- **`main/Timer/`**: ProgressTimer
- **`titleScreen/`**: title-screen variants with Logo, Title, Name, PrimarySponsor
- **`titleScreen/variants/`**: VerticalStack, TwoColumnLayout for title screens
- **`sponsors/`**: sponsor layout components

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`, `core/utils/routing`
- Consumed by: compositions, templates, RouteToComposition

## Dependencies

- Internal: core/context, core/utils
- External: React, Remotion (AbsoluteFill)
