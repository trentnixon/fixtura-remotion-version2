# 04 — Upcoming footer dual placement

**What to build:** Cricket Upcoming screens match Results footer behaviour: multi-row entity collection, first-row `primaryForScreen` fill, shared max-5 selection and paint order.

**Blocked by:** 01 — Sponsors selection & outro sequence module; 02 — v2 sponsor types & presence gating.

**Status:** completed

- [x] Multi-row Upcoming screen collects entities from all visible fixtures’ grade/team assign arrays
- [x] Primary fill uses the first visible row’s `primaryForScreen`
- [x] Footer respects max 5 and paint order via the shared selection module
- [x] Empty entity on all rows still shows primaries when present
- [x] Demoable in Studio on a v2 Upcoming sample

## Completion Summary
Upcoming fixture displays use `buildUpcomingFooterSponsors` → shared multi-row selector and pass logos to `SponsorFooter`. Sample enriched with per-row entities for Studio demo.
