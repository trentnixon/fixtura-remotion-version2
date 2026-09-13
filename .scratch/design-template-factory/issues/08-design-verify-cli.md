# 08 — design:verify (explore + handoff)

**What to build:** npm verify command with explore default, --handoff flag, variant/asset filters; starter validation; legacy rules; vitest shares validators.

**Blocked by:** 02, 04, 06, 07

**Status:** ready-for-agent

- [ ] Explore mode validates manifest parity, binds, starters, orphans; no Remotion file requirement
- [ ] Handoff mode adds theme/registry/routing existence checks
- [ ] Filters limit checks to one variant or asset
