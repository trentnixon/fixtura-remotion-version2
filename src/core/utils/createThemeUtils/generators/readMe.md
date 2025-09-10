# Folder Overview

Generators to derive theme parts from color inputs: backgrounds, gradients, contrast, text, palettes, and utilities.

## Files

- `backgroundUtils.ts`, `gradientUtils.ts`: create background/gradient theme tokens
- `contrastUtils.ts`: derive contrast-aware theme values
- `colorVariations.ts`: produce light/dark/tint variations
- `paletteGenerators.ts`: generate theme palettes
- `shadowUtils.ts`: produce shadow tokens
- `textUtils.ts`, `utilityColors.ts`: text and utility color tokens

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: builds on `../core` utilities and `colorSystem`
- Consumed by: `../index.ts` and ThemeContext

## Dependencies

- Internal: `../core`
- External: none
