# Folder Overview

Ladder compositions for cricket standings across multiple variants.

## Files

- `index.tsx`: exports ladder composition variants
- `basic.tsx`, `brickWork.tsx`, `classic.tsx`, `classicTwoColumn.tsx`, `sixersThunder.tsx`: variant entries
- `types.ts`: ladder-specific typing
- `ladder.md`: human-facing notes

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses templates variants and shared primitives
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`, `modules`
- External: React, Remotion
