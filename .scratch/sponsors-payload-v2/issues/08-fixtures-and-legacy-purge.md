**Status:** completed

- [x] Remaining cricket (and other sport) samples used in Studio no longer ship legacy `default` maps as the outro source of truth
- [x] Samples that need row sponsors include `primaryForScreen` and v2 `assignSponsors` where compositions expect them
- [x] Legacy sponsor helpers/types still referencing `default` or wrong team assign shapes are removed or updated
- [x] No production reader path depends on legacy `default` for outro or gating
- [x] Smoke: key compositions load in Studio on updated samples without sponsor-related runtime warnings from missing v2 fields

## Completion Summary
Migrated all sample JSON account sponsors to v2 (`primary` / `general` / `sponsorNum`), converted legacy row `assignSponsors` metadata to empty sponsor arrays with `primaryForScreen` / `gradeName`, purged leftover legacy type shapes (`AssetConfig` SponsorsGroup, performances/topBowlers assign, `TeamsAssignSponsors`), and added a fixture-contract regression test.
