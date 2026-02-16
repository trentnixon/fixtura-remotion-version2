# Folder Overview

High-level screen wrappers for compositions. OneColumn uses ThemeContext.layout.heights and RouteToComposition.

## Files

- **`OneColumn.tsx`**: single-column screen; Header slot; ThemeContext.layout.heights for header/content; RouteToComposition for content; ProgressTimer

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`, `core/utils/routing`, `../main/Timer/ProgressTimer`
- Consumed by: compositions, routing

## Dependencies

- Internal: core/context, core/utils, main
- External: React, Remotion (AbsoluteFill)
