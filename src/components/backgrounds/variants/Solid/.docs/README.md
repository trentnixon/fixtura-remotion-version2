# Folder Overview

Single-color background using the theme palette. Renders via ThemeContext.

## Files

- **`SolidBackground.tsx`**: reads `selectedPalette.background.main` via ThemeContext; renders AbsoluteFill with background and negative z-index

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`
- Consumed by: BackgroundComponents.Solid, SelectTemplateBackground

## Dependencies

- Internal: `core/context`
- External: React, Remotion (AbsoluteFill)
