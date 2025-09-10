# Folder Overview

Utilities to produce application themes from inputs using the color system.

## Files

- `core/`: base manipulation and types for theme creation
- `generators/`: utilities for backgrounds, gradients, contrast, text, palette generation
- `index.ts`: public API for creating standardized themes

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: depends on `colorSystem` operations and presets
- Consumed by: templates, ThemeContext, and other theming utilities

## Dependencies

- Internal: `core`, `generators`
- External: none (relies on internal color system)
