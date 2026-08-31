# 13 — Phase 1 release readiness (WP-8)

**What to build:** Phase 1 release gate — incorporate CMS visibility inventory into published `operatorPresets`, semver `1.0.0` contract publish, product sign-off on operator list. Confirms all Phase 1 success criteria.

**Blocked by:** 10, 11, 12

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-8; `decisions.md` Phase 1 success

## Acceptance criteria

- [ ] CMS visibility inventory complete (product); catalogue entries updated from `unresolved` to `resolved-visible` or `resolved-hidden` where applicable.
- [ ] Published `discovery-contract.json` at `1.0.0` with derived `operatorPresets` reflecting visibility + readability + palette rules.
- [ ] `grain-field` remains excluded from `operatorPresets` until palette resolves (or product explicitly overrides).
- [ ] CMS live or staged: one Generated option consuming contract (WP-10 complete).
- [ ] Production render path deployed with validation + adapters (WP-3).
- [ ] Documentation published (WP-11).
- [ ] Verification suite green (WP-12).
- [ ] Product sign-off recorded on operator preset list (order and labels).
- [ ] Phase 1 success criteria in `implementation-handoff.md` checked off.

## Phase 1 success criteria (checklist)

- [ ] CMS shows one Generated option from published contract
- [ ] Recognized legacy payloads round-trip without composition identity churn on no-change save
- [ ] Renderer adapters remain independent behind one catalogue
- [ ] All Graphics, Pattern, Particle, and Noise modes in catalogue
- [ ] Unsupported input → Solid + diagnostic in production
- [ ] CMS and render path share one ingress source
- [ ] Generated not emitted as production wire

## Notes

WP-9 (Remotion effects, new presets, Generated wire rollout) remains **deferred** until this ticket closes.

## References

- `.scratch/generated-backgrounds/implementation-handoff.md`
- `.scratch/generated-backgrounds/decisions.md`
