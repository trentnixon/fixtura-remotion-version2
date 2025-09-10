# Folder Overview

Color system utilities for generating standardized palettes and performing color operations.

## Files

- `config/`: constants and default palette structures
- `core/`: fundamental color operations and relationships
- `generators/`: palette, gradient, contrast, and utility generators
- `utils/`: math, color spaces, validation, tinycolor wrappers
- `index.ts`, `createStandardizedPalettes.ts`, `gradientResolver.ts`: entry points and helpers

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: consumed by `createThemeUtils` and templates/themes
- Consumed by: theme creation and runtime color utilities

## Dependencies

- Internal: `config`, `core`, `generators`, `utils`
- External: color math libraries (wrapped)
