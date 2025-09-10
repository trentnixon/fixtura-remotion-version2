# Folder Overview

Type definitions that describe normalized data structures used across contexts, templates, and utilities.

## Files

- `data/`: shared data types for assets, teams, matches, performance, sponsors, user theme, video data
- `sport/`: sport-specific types (e.g., cricket results, top bowlers)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: imported by contexts, utils, and templates
- Consumed by: anywhere data structures are required

## Dependencies

- Internal: `data`, `sport`
- External: TypeScript
