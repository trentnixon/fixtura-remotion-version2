# Folder Overview

Reusable header arrangements with permutations of Title, Logo, Name slots. Vertical stack and two-column variants; alignment via getAlignmentClasses.

## Files

- **`index.tsx`**: exports header variants (VerticalHeader, VerticalHeaderTitleLogoName, TwoColumnHeader*, Reverse*, etc.)
- **`types.ts`**: shared props, getAlignmentClasses(alignment)
- **`variants/VerticalStack.tsx`**: vertical ordering permutations
- **`variants/TwoColumnLayout.tsx`**: two-column arrangements

## Child Modules

- **`variants/`**: VerticalStack, TwoColumnLayout

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: none
- Consumed by: screen wrappers, compositions

## Dependencies

- Internal: variants
- External: React
