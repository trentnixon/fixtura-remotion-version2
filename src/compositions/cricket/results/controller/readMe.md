# Folder Overview

Controller components coordinating how match result rows and displays assemble per variant.

## Files

- `MatchRow/`: row renderers per variant
- `ResultsDisplay/`: display containers per variant

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes layout sections and primitives
- Consumed by: results variant entries

## Dependencies

- Internal: `MatchRow`, `ResultsDisplay`
- External: React
