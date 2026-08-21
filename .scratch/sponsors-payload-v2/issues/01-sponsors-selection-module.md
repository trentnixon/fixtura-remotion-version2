# 01 — Sponsors selection & outro sequence module

**What to build:** A pure sponsors helper that, given primary candidates and entity candidates, returns the footer logo list under the locked rules (max 5, entities claim slots first, remaining filled from primaries, paint order primaries then entities; entities alone ≥ 5 means entities only). Also build the outro sequence as all account primaries then all generals, ready to chunk into pages of 6. Behaviour is verifiable via automated tests without rendering a full composition.

**Blocked by:** None — can start immediately.

**Status:** completed

- [x] Footer selection returns at most 5 logos
- [x] Entities claim slots before primaries; spare slots filled from provided primaries
- [x] When entities alone are ≥ 5, result is entities only (capped at 5, first five in input order)
- [x] Empty entities yields primaries only
- [x] Returned footer list is ordered primaries then entities for paint
- [x] Outro builder concatenates primary then general
- [x] Outro list can be chunked into groups of 6
- [x] Automated tests cover the cases above (Creator/Scheduler assumed to own id dedupe)

## Completion Summary

Pure selection/outro module landed under `src/core/utils/sponsors` with Vitest coverage for the locked footer and outro rules.
