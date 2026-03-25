# Folder Overview

Team roster compositions showing players, headers, sponsors, and metadata across variants.

## Files

- `llm-brief/llm-brief-cricket-team-roster.md`: index to design LLM briefs (association vs club)
- `llm-brief/llm-brief-cricket-team-roster-association.md`: static brief — balanced match context, both team identities
- `llm-brief/llm-brief-cricket-team-roster-club.md`: static brief — club squad hero, opponent supporting
- `index.tsx`: exports team roster composition variants
- `basic.tsx`, `classic.tsx`, `classicTwoColumn.tsx`, `sixersThunder.tsx`: variant entries
- `types.ts`: typing for team roster compositions

## Skill

- `.skills/architecture/cricket-team-roster-folder.md` – Implementation guidance for this composition

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: templates variants, core contexts/utils, shared roster sections
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`, `modules`
- External: React, Remotion
