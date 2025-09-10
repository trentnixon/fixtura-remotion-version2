# Folder Overview

Contains concrete template implementations (“variants”) that extend the base layout and theme to produce distinct visual styles.

## Files

- One subfolder per variant: `basic/`, `brickwork/`, `classic/`, `sixers/`, `thunder/`, `twoColumnClassic/`

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: imports base building blocks from `../base` and types from `../types`
- Consumed by: `../registry.tsx` registers these for use by compositions

## Dependencies

- Internal: variant subfolders and their `components/`
- External: Remotion, React
