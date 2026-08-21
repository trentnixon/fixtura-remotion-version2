# 02 — v2 sponsor types & presence gating

**What to build:** Remotion’s sponsor contract matches Scheduler v2: slim sponsor DTO; account `primary` / `general` / `sponsorNum`; row `primaryForScreen` and `assignSponsors` as sponsor arrays (grade/team/competition). “Does this account have sponsors?” / outro gating no longer treats legacy `default` as presence — use `includeSponsors` / `sponsorNum` / non-empty primary|general as appropriate. At least one cricket sample asset is updated to v2 so Studio can load real-shaped data.

**Blocked by:** None — can start immediately.

**Status:** completed

- [x] Sponsor DTO guarantees only `id`, `name`, and `logo: { id, url }`
- [x] Account sponsors expose `primary`, `general`, and `sponsorNum` (no reliance on legacy `default` for gating)
- [x] Content rows can carry `primaryForScreen` and v2 `assignSponsors` shape
- [x] Layout/outro presence checks work from v2 fields without truthy empty-array false positives from legacy maps
- [x] At least one cricket sample JSON under test data is v2-shaped and loads in Studio

## Completion Summary
Core sponsor types and gating cut over to v2; `Cricket_upcoming.json` updated. Outro variants wired to `primary`+`general` so the type hard-cut stays compile-green (overlaps ticket 06).
