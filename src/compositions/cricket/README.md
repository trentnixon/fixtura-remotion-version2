# Folder Overview

Cricket feature compositions and modules. Contains multiple composition families (ladder, results, resultSingle, teamRoster, top5, upcoming) along with shared utils and primitives.

## Files

- `index.tsx`: registers/exports cricket compositions
- `composition-types.ts`: shared types for cricket compositions
- `README.md`: feature overview
- `DevelopmentRoadMap.md`: roadmap for cricket feature
- `DocumentationAudit.md`: audit notes for this feature

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `src/templates/*` variants, `src/core/*` contexts/utils, `testData` samples
- Consumed by: application roots rendering cricket compositions

## Dependencies

- Internal: `ladder`, `results`, `resultSingle`, `sponsorFooter`, `teamRoster`, `top5`, `upcoming`, `utils`
- External: Remotion, React
