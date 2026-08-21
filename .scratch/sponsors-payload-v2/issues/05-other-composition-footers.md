# 05 — Other composition footers (single-item entity)

**What to build:** Ladder, Performances, Top5, Team of the Week, and similar compositions use the same footer selector with that item’s entity only (no multi-row union), plus that item’s `primaryForScreen` (or equivalent single-item primary candidates). Behaviour matches the shared max-5 / paint-order policy.

**Blocked by:** 01 — Sponsors selection & outro sequence module; 02 — v2 sponsor types & presence gating.

**Status:** ready-for-agent

- [ ] Ladder footer uses the ladder item’s entity + `primaryForScreen` through the shared selector
- [ ] Performances footer uses single-item (or screen’s intended item) entity policy through the shared selector — not Results-style multi-row union unless the screen truly shows multiple independent assign sets that product already treated as one item
- [ ] Top5 / Team of the Week (and other cricket footers still on legacy merge or account-primary-only) use the shared selector consistently
- [ ] Max 5 and primaries-then-entities paint order hold across these templates
- [ ] Demoable in Studio for at least one non-Results/Upcoming composition on v2 data
