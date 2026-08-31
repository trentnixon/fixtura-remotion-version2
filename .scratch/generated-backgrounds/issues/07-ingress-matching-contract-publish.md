# 07 — Ingress matching and contract publish (WP-2)

**What to build:** Canonical `matchLegacyIngress(wire: unknown)` with discriminated results, display/save helpers, and `buildDiscoveryContract()` publishing JSON + JSON Schema from the catalogue. CMS consumes this artifact — no mirror matcher.

**Blocked by:** 06

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-2; `compatibility-plan.md`; `discovery-surfaces.md` §11

## Acceptance criteria

- [x] `matchLegacyIngress(wire: LegacyWirePayload)` accepts **`unknown`** only at the boundary; returns discriminated union with `presetId?: never` on passthrough and unsupported branches.
- [x] `normalizeForDisplay(match)` consumes validated match only — does not re-parse payload.
- [x] `applyCanonicalEgress(presetId)` returns catalogue `defaultConfiguration`.
- [x] Sticky-save helper preserves original wire on no-change preset (Graphics/Noise alias pairs, `noise.graphics` sticky).
- [x] **45** generated ingress rows, **9** unsupported machine rows (one `useBackground` each), **7** passthrough rows — counts verified by tests.
- [x] Missing-type vs unknown-type discriminators behave per `compatibility-plan.md` (implicit default vs unsupported).
- [x] `buildDiscoveryContract()` emits `public/generated-backgrounds/discovery-contract.json` with `contractVersion: "1.0.0"`, `catalogue.presets`, derived `operatorPresets`, and `legacyIngress`.
- [x] JSON Schema lives at **`schemas/generated-backgrounds/discovery-contract.schema.json`** — durable source-controlled path, **not** under `.scratch`.
- [x] Build or npm script generates contract JSON from catalogue (not hand-edited).
- [x] Tests cover representative generated, passthrough, unsupported, and dual Graphics/Noise ingress cases.

## Verification commands

```bash
npm test
npm run build:generated-backgrounds-contract
```

(Add script name if different; document in ticket completion.)

## Comments

### 2026-08-28 — Consolidated to catalogue module

- Canonical ingress: `src/components/backgrounds/variants/Generated/catalogue/ingress.ts`
- Duplicate `Generated/ingress/` removed
- `preserveStickyIngress` merges canonical egress while retaining sibling blocks (RC-6)
- Nested `templateVariation` extraction + Phase 1 `Generated` wire rejection
- Verification: `npm test` (118 passed), `npm run lint`, `npm run build:generated-backgrounds-contract`

## References

- `.scratch/generated-backgrounds/compatibility-plan.md`
- `.scratch/generated-backgrounds/catalogue-contract.md`
- `.scratch/generated-backgrounds/discovery-surfaces.md`
