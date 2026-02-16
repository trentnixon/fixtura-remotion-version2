# Folder Overview

Data type definitions for normalized inputs to compositions and utilities. Exported via `index.ts`; consumed by VideoDataContext, dataset processing, and composition mapping.

## Files

- **`index.ts`**: barrel export (common, team, performance, sponsors, videoData, assets, root)
- **`common.ts`**: ImageLogo, Theme, TemplateVariation, ThemeData, Account, Timings, Render
- **`videoData.ts`**: Video, VideoMetadata, VideoAppearance, VideoMedia, VideoContentLayout, VideoTemplateVariation, DivideFixturesBy, VideoTheme, VideoMeta, CricketLadderData, CricketTeam
- **`root.ts`**: FixturaDataset<T> (generic data key)
- **`team.ts`**: Team, HomeTeam, AwayTeam, TeamsAssignSponsors; uses ImageLogo, BattingPerformance, BowlingPerformance
- **`performance.ts`**: BattingPerformance, BowlingPerformance
- **`sponsors.ts`**: Sponsor, Logo, SponsorsData, Club, GradeAssignSponsors, CompetitionAssignSponsors
- **`assets.ts`**: Asset
- **`userTheme.ts`**: UserTheme (primaryColor, secondaryColor, fontFamily, logoPosition, etc.)
- **`match.ts`**: MatchData (date, round, homeTeam, awayTeam, assignSponsors, etc.); imports from composition-types

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../../../compositions/cricket/_types/composition-types` (AssignSponsors in match.ts)
- Consumed by: datasetProcessing, compositionMapping, VideoDataContext, cricket compositions

## Dependencies

- Internal: compositions/cricket/_types (match.ts only)
- External: TypeScript
