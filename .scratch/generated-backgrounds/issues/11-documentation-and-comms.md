# 11 — Documentation and comms (WP-6)

**What to build:** Update external and domain documentation for Generated consolidation. Separate operator model (Generated → Preset) from integrator wire reference (legacy Phase 1). Document CMS vs Studio visibility distinction.

**Blocked by:** 07

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-6; `discovery-surfaces.md` §10

## Acceptance criteria

- [x] `.comms/TEMPLATES.md` updated: Generated operator model; passthrough list not asserted as fixed CMS menu; legacy wire reference table retained for Phase 1 integrators.
- [x] `.comms/Guide to Remotion Set up handoff.md` §10.6–10.8 cross-references compatibility plan and discovery contract; preserves payload field reference.
- [x] `CONTEXT.md` updated if Generated vocabulary drift exists.
- [x] Documents state: Generated is not Phase 1 production wire (ADR 0002).
- [x] Documents state: Studio passthrough dev browse may exceed CMS operator visibility (engineering-governed).
- [x] Contract artifact paths documented: JSON under `public/generated-backgrounds/`, schema under `schemas/generated-backgrounds/`.

## Verification commands

Review only — no automated test required.

## Comments

### 2026-08-28 — Documentation updated

- `.comms/TEMPLATES.md`: operator model, legacy wire table, contract paths, Studio browse note
- `.comms/Guide to Remotion Set up handoff.md`: §10.6–10.8 Generated consolidation cross-refs
- `CONTEXT.md`: no vocabulary drift; existing Generated definitions retained

## References

- `.comms/TEMPLATES.md`
- `.comms/Guide to Remotion Set up handoff.md`
- `docs/adr/0002-generated-background-wire-deferred.md`
- `.scratch/generated-backgrounds/discovery-surfaces.md`
