# Folder Overview

Reusable title-screen arrangements: Logo, Title, Name, PrimarySponsor slots. Vertical and two-column variants with alignment support.

## Files

- **`index.tsx`**: exports vertical and two-column title-screen variants
- **`types.ts`**: shared props, getAlignmentClasses(alignment)
- **`variants/VerticalStack.tsx`**: stacked permutations
- **`variants/TwoColumnLayout.tsx`**: two-column permutations (including reversed)

## Child Modules

- **`variants/`**: VerticalStack, TwoColumnLayout

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: none
- Consumed by: compositions

## Dependencies

- Internal: variants
- External: React
