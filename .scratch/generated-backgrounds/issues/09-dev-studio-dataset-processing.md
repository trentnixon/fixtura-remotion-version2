# 09 — Dev Studio and dataset processing (WP-4)

**What to build:** Remotion Studio dev browse aligned with Generated catalogue. Folder structure `{Template}/Generated/{presetId}/{Sport}/{Dataset}`; explicit legacy wire injection; registry cleanup. Studio folder labels never become production wire.

**Blocked by:** 06

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-4; `discovery-surfaces.md` §4–§6

## Acceptance criteria

- [x] `DevelopmentRoot` iterates catalogue preset IDs under `{Template}/Generated/{presetId}/{Sport}/{Dataset}`.
- [x] `CompositionEntry` receives `{ presetId, legacyEgress: LegacyEgressPayload }` from catalogue canonical egress — not folder name as wire.
- [x] Dev Remotion composition `id` format: `{templateId}-generated-{presetId}-{datasetId}`.
- [x] `processDatasetForTemplate` accepts explicit `LegacyEgressPayload` (or background selection object) — **removes** blind `useBackground: variant` coupling.
- [x] `"Generated"` is never written to `templateVariation.useBackground`.
- [x] `appearance.type` records dev metadata (preset ID or dev-only shape) — not `"Generated"` as wire.
- [x] Registry `Variants` removes `Graphics`, `Pattern`, `Particle`; passthrough variants remain for dev browse where needed.
- [x] Optional passthrough dev folders may exist per **engineering need** — not gated on CMS visibility (`implementation-handoff.md` clarification).
- [x] Passthrough dev folders pass explicit `LegacyEgressPayload` per category.

## Verification commands

```bash
npm test
npm run dev
```

Manual: confirm Studio tree shows Generated → presetId folders and compositions render with legacy wire from catalogue egress.

## Comments

### 2026-08-28 — Implementation complete

- `DevelopmentRoot`: `{Template}/Generated/{presetId}/{Sport}/{Dataset}` + passthrough folders
- `CompositionEntry`: explicit legacy egress + dev composition IDs
- `processDatasetForTemplate`: explicit `DevBackgroundWire` (see `datasetProcessing.test.ts`)
- Registry: removed Graphics / Pattern / Particle variants
- Verification: `npm test`, `npm run lint`

## References

- `src/DevelopmentRoot.tsx`
- `src/core/utils/datasetProcessing.ts`
- `src/templates/registry.tsx`
- `.scratch/generated-backgrounds/discovery-surfaces.md`
