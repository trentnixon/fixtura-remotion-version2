# Folder Overview

Palette-driven gradients derived from ThemeContext and optional `video.templateVariation.gradient` (type, direction). Extracts CSS from palette gradient objects.

## Files

- **`GradientBackground.tsx`**: reads selectedPalette from ThemeContext, video.templateVariation.gradient for type/direction; resolves CSS via extractCSS helper; uses AbsoluteFill with negative z-index

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`
- Consumed by: BackgroundComponents.Gradient, SelectTemplateBackground

## Dependencies

- Internal: `core/context`
- External: React, Remotion (AbsoluteFill)

## Palette Gradient Keys

- Types: primary, secondary, primaryToSecondary, primaryRadial, conicGradient, etc.
- Direction keys on css map: DEFAULT, HORIZONTAL, VERTICAL, DIAGONAL, etc.
