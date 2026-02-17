# Folder Overview

Team section components for results layouts. Displays team information including logos, names, scores, and first innings scores in various layout configurations.

## Files

- `TeamsSectionVertical.tsx`: Vertical team section layout
- `TeamsSectionLogoAbove.tsx`: Logo above team name layout
- `TeamsSectionLogoBelow.tsx`: Logo below team name layout
- `TeamsSectionLogoAndScore.tsx`: Logo and score combined layout
- `TeamsSectionLogoAndScore-BrickWork.tsx`: Brickwork-template-specific logo and score layout
- `TeamsSectionScoreOverTeamNameOnly.tsx`: Score over team name only layout
- `LogoWithScoreOverName.tsx`: Logo with score over name layout
- `ScoreOverNameWithLogo.tsx`: Score over name with logo layout
- `Horizontal_SingleTeam_LogoWithName_Score.tsx`: Horizontal single team layout with logo, name, and score
- `Horizontal_SingleTeam_CNSW.tsx`: Horizontal single team CNSW variant
- `Horizontal_SingleTeam_CNSW-private.tsx`: Horizontal single team CNSW private variant
- `index.tsx`: Export file for TeamsSection components

## Child Modules

- `_types/`: Shared type definitions
  - `TeamsSectionProps.ts`: Props interfaces for TeamsSectionProps and HorizontalTeamsSectionProps
- `_utils/`: Shared utility functions
  - `helpers.ts`: Text truncation, score normalization, and first innings display helpers

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `_types/types` for Team and TeamLogo, primitives, animation context, theme context
- Consumed by: MatchCard layouts

## Dependencies

- Internal: `_types/types`, `utils/primitives`, `core/context`, `components`
- External: React
