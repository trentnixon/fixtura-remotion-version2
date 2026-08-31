# 10 — CMS integration (WP-5)

**What to build:** External CMS integration spec and coordination for Generated background picker. CMS consumes single ingress source — published `legacyIngress` contract (path A) or shared package from same catalogue build (path B). No separately maintained matcher.

**Blocked by:** 07

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-5; `discovery-surfaces.md` §1, §11; `decisions.md` parallel CMS visibility task

## Acceptance criteria

- [ ] Integration path chosen and documented: **A** (JSON consumer) or **B** (shared generated package).
- [ ] CMS reads `contractVersion` and rejects or warns on unsupported major versions.
- [ ] Operator UI presents `Background → Generated → Preset` from derived `operatorPresets`.
- [ ] Read path: match via published `legacyIngress` / shared matcher → display `Generated → presetId` or passthrough / unsupported.
- [ ] Save, preset unchanged: sticky ingress — exact original wire preserved.
- [ ] Save, preset changed: write catalogue canonical egress (`defaultConfiguration`).
- [ ] Unsupported: reset/unsupported UI; **preserve original payload** until operator selects valid preset.
- [ ] Phase 1 operator controls: preset selection only.
- [ ] Passthrough category CMS visibility preserved per product inventory — do not newly expose hidden categories (e.g. Animated).
- [ ] Comms doc or ticket records CMS team handoff payload (contract URL, schema path, semver).

## Notes

Primary implementation may live outside this repository. Remotion repo delivers contract artifact and canonical matcher (WP-2). Track CMS work here for Phase 1 release gate (WP-8).

## References

- `public/generated-backgrounds/discovery-contract.json`
- `schemas/generated-backgrounds/discovery-contract.schema.json`
- `.scratch/generated-backgrounds/discovery-surfaces.md`
