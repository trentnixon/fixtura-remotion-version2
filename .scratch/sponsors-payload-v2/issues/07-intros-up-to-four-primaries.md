# 07 — Intros: up to four primaries

**What to build:** Intro layouts that currently show a single primary logo instead show account primaries only, up to four — no general or entity logos on intro.

**Blocked by:** 02 — v2 sponsor types & presence gating.

**Status:** completed

- [x] Intro shows account `sponsors.primary` only
- [x] Up to four primary logos can appear when present
- [x] General and entity sponsors do not appear on intro
- [x] Templates that previously hardcoded `primary[0]` only are updated
- [x] Demoable in Studio with an account that has multiple primaries

## Completion Summary
Added `getIntroPrimarySponsors` + shared `IntroPrimarySponsors` and wired all template intros to show up to four account primaries. Upcoming sample now has four primaries for Studio.
