# Folder Overview

Generators for palette variants, gradients, contrast, shadows, text, and utility colors.

## Files

- `backgroundGenerator.ts`, `gradientGenerator.ts`: background/gradient creation
- `contrastGenerator.ts`: derive contrast-aware colors
- `colorVariations.ts`: create light/dark/tinted variants
- `shadowGenerator.ts`: derive shadow tokens
- `standardPaletteFactory.ts`: produce standardized palette objects
- `textGenerator.ts`, `utilityGenerator.ts`: text and utility color tokens

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: rely on `core` operations and `config` presets
- Consumed by: theme creation and `createThemeUtils`

## Dependencies

- Internal: `core`, `config`
- External: none (uses wrapped color math)
