# Folder Overview

Single match result compositions across multiple variants.

## Files

- `llm-brief/llm-brief-cricket-result-single.md`: index to design LLM briefs (association vs club)
- `llm-brief/llm-brief-cricket-result-single-association.md`: static brief — one match, both teams’ stats
- `llm-brief/llm-brief-cricket-result-single-club.md`: static brief — one match, club stats only
- `index.tsx`: exports single-result composition variants
- `BasicTemplate.tsx`, `classic.tsx`, `classicTwoColumns.tsx`, `sixers.tsx`: variant entries
- `types.tsx`: typing for single result compositions
- `resultSingle.md`: human-facing notes

## Skill

- `.skills/architecture/cricket-result-single-folder.md` – Implementation guidance for this composition

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: templates variants, core contexts/utils, shared sections
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`, `modules`
- External: React, Remotion
