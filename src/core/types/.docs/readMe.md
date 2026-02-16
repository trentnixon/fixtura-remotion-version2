# Folder Overview

Type definitions for normalized data structures used across contexts, templates, compositions, and utilities. Organizes shared data types and sport-specific extensions.

## Skill

- `.skills/architecture/core-types-folder.md` – Structure, FixturaDataset schema, adding sport types or shared data shapes

## Child Modules

- **`data/`**: shared data types (assets, common, match, performance, sponsors, team, userTheme, videoData, root)
- **`sport/cricket/`**: cricket-specific types (results, topBowlers)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: consumed by VideoDataContext, composition mapping, data processing, templates
- Consumed by: contexts, utils, templates, compositions (cricket, afl, netball)

## Dependencies

- Internal: `data`, `sport`
- External: TypeScript
