# Folder Overview

Results compositions for cricket matches across multiple variants.

## Files

- `llm-brief/llm-brief-cricket-results.md`: index to design LLM briefs (association vs club)
- `llm-brief/llm-brief-cricket-results-association.md`: static brief — both teams, full stats
- `llm-brief/llm-brief-cricket-results-club.md`: static brief — club stats only, opponent in score band
- `index.tsx`: exports results composition variants
- `basic.tsx`, `brickWork.tsx`, `classic.tsx`, `classicTwoColumn.tsx`, `sixersThunder.tsx`: variant entries
- `types.tsx`: results-specific typing
- `results.md`: human-facing notes

## Skill

- `.skills/architecture/cricket-results-folder.md` – Implementation guidance for this composition

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: templates variants, core contexts/utils, shared primitives
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`, `modules`, `utils`
- External: React, Remotion
