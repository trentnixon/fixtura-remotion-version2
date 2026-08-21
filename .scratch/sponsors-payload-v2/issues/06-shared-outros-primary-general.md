# 06 — Shared outros: primary then general

**What to build:** Every template outro that currently reads legacy default sponsors instead shows one sequence of account primaries then generals, chunked into pages of 6, gated by `includeSponsors` / `sponsorNum` as available. Shared across all assets that use those outro variants.

**Blocked by:** 02 — v2 sponsor types & presence gating.

**Status:** ready-for-agent

- [ ] Outro logo source is account `primary` then `general` (not legacy `default` maps)
- [ ] Logos are presented in pages of 6
- [ ] Outro still gates on v2 presence / `includeSponsors` / `sponsorNum` appropriately
- [ ] All template outro variants that previously used `default` are updated
- [ ] Demoable in Studio: asset with primaries + generals shows them in order across pages
