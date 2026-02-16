# Folder Overview

SVG-based repeating patterns (dots, lines, grid, crosshatch, triangles, chevron) with optional animation and transforms. Theme and template-variation driven.

## Files

- **`index.tsx`**: PatternBackground — reads video.templateVariation.pattern and selectedPalette; selects variant via PATTERN_TYPES; exports PatternVariants, PATTERN_TYPES, ANIMATION_TYPES
- **`variants/`**: dots.tsx, lines.tsx, grid.tsx, CrosshatchPattern.tsx, TrianglesPattern.tsx, ChevronPattern.tsx; config.ts for type definitions

## Child Modules

- **`variants/`**: individual pattern implementations

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/VideoDataContext`
- Consumed by: BackgroundComponents.Pattern, SelectTemplateBackground

## Dependencies

- Internal: `core/context`, `variants/`
- External: React, Remotion
