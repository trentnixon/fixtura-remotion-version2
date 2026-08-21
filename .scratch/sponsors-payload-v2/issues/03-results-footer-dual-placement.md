# 03 — Results footer dual placement

**What to build:** Cricket Results screens show the shared footer policy end-to-end: collect entity sponsors from every result on the current screen, fill remaining slots from the first row’s `primaryForScreen`, cap at 5, paint primaries then entities. Replaces shallow merge of assign buckets that could overwrite earlier rows.

**Blocked by:** 01 — Sponsors selection & outro sequence module; 02 — v2 sponsor types & presence gating.

**Status:** completed

- [x] Multi-row Results screen collects entities from all visible rows’ grade/team assign arrays
- [x] Primary fill uses the first visible row’s `primaryForScreen`
- [x] Footer respects max 5 and paint order via the shared selection module
- [x] Empty entity on all rows still shows primaries when present
- [x] Demoable in Studio on a v2 Results sample

## Completion Summary
Results displays build footer logos via `buildMultiRowFooterSponsors` / `buildResultsFooterSponsors` and pass them to `SponsorFooter`. `Cricket_Results.json` updated to v2 with `primaryForScreen`.
