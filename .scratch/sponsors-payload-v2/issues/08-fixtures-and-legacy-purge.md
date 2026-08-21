# 08 — Remaining fixtures & legacy contract removal

**What to build:** Remaining sample assets are on the v2 sponsor shape, and the codebase no longer compiles against or gates on legacy `default` / obsolete assign shapes. End state: hard-cut complete — Scheduler v2 is the only contract Remotion speaks.

**Blocked by:** 03 — Results footer dual placement; 04 — Upcoming footer dual placement; 05 — Other composition footers; 06 — Shared outros: primary then general; 07 — Intros: up to four primaries.

**Status:** ready-for-agent

- [ ] Remaining cricket (and other sport) samples used in Studio no longer ship legacy `default` maps as the outro source of truth
- [ ] Samples that need row sponsors include `primaryForScreen` and v2 `assignSponsors` where compositions expect them
- [ ] Legacy sponsor helpers/types still referencing `default` or wrong team assign shapes are removed or updated
- [ ] No production reader path depends on legacy `default` for outro or gating
- [ ] Smoke: key compositions load in Studio on updated samples without sponsor-related runtime warnings from missing v2 fields
