# 02 — Required/optional scalar binds and fail-closed hydration

**What to build:** Bind maps support required vs optional scalars; hydration fails closed without palette/fonts/population; duplicate JSON key detection; vitest coverage shared with verify.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Optional bind entries do not throw when data or nodes absent
- [ ] Hydration returns success/failure; initializer skips data-dependent steps on failure
- [ ] Error banner identifies variant/sport/asset and failing bind or fixture
- [ ] Duplicate-key parse helper fails on duplicate bind JSON keys
- [ ] Vitest covers bind policy and duplicate JSON helper
