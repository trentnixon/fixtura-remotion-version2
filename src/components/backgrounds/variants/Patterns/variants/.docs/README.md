# Folder Overview

Individual SVG pattern implementations (dots, lines, grid, crosshatch, triangles, chevron) used by PatternBackground. Selected by PATTERN_TYPES; use frame interpolation for subtle motion.

## Files

- **`dots.tsx`**: dot grid with optional scale/opacity/translate animation
- **`lines.tsx`**: animated lines pattern
- **`grid.tsx`**: rectangular grid with transform support
- **`CrosshatchPattern.tsx`**: crosshatch lines
- **`TrianglesPattern.tsx`**: triangular tessellation
- **`ChevronPattern.tsx`**: chevron shapes
- **`config.ts`**: pattern and animation type definitions, constants

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: Remotion (interpolate)
- Consumed by: PatternBackground (index.tsx)

## Dependencies

- Internal: none
- External: React, Remotion
