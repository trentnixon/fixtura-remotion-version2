# Folder Overview

Semantic-to-CSS mappers for AnimatedContainer. Produce React.CSSProperties from palette and token names.

## Files

- **`backgroundStyles.ts`**: map semantic tokens (primary, transparentSecondary, gradients) to palette colors/gradients
- **`typeStyles.ts`**: per-type decorations (borders, card shadow, gradients)
- **`sizeStyles.ts`**: size tokens (xs..full, auto)
- **`roundedStyles.ts`**: border-radius presets (none..full)
- **`shadowStyles.ts`**: shadow presets (none..xl, inner)
- **`index.ts`**: barrel export

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: palette from ThemeContext
- Consumed by: AnimatedContainer.tsx

## Dependencies

- Internal: none
- External: React (CSSProperties)
