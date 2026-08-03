# Cricket Result Single — LLM design briefs (index)

**Component anatomy:** `../../.docs/component-anatomy/result-single-component-anatomy.md`  
**Stitch brief:** `../../.docs/stitch-briefs/result-single-stitch-component-brief.md`  
**Shared match parts:** `../../.docs/component-anatomy/results-component-anatomy.md`

Two static one-page briefs for design LLMs (no motion or implementation):

- **Association — both teams** — file `llm-brief-cricket-result-single-association.md` — **One match** on screen; **full player stats for home and away**.
- **Club — club stats only** — file `llm-brief-cricket-result-single-club.md` — **One match** on screen; **club player stats only**; opponent in the **team/score** band.

Shared rules: portrait artboard (e.g. 1080×1350), **one fixture per screen**, optional sponsor strip. Sample data: `testData/samples/Cricket/Cricket_WeekendResultsSingle.json` (also usable: a single object from `Cricket_Results.json`).
