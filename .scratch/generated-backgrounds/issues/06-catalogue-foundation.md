# 06 — Catalogue foundation (WP-1)

**What to build:** In-repo Generated catalogue module owning all 25 visual presets, renderer adapter registry, and canonical egress definitions. Single source for preset IDs, adapter keys, and inventory linkage.

**Blocked by:** None — can start immediately.

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-1; `catalogue-contract.md`; `current-preset-inventory.md`

## Acceptance criteria

- [x] Catalogue module exists under `src/components/backgrounds/variants/Generated/` (or agreed equivalent) exporting all `GeneratedCatalogueEntry` records.
- [x] All **25** unique visual preset IDs match `catalogue-contract.md` (Pattern 6, Particle 5, Noise/Graphics 14 catalogue rows; `noise.graphics` ingress-only — no catalogue row).
- [x] Each entry includes: `id`, `displayName`, `description`, `inventoryKey`, `rendererAdapter`, `defaultConfiguration`, `operatorVisibility`, `readabilityPolicy`, `paletteBehavior`, `operatorControls` (empty Phase 1), `authorControls` (metadata), `legacyIngressIds`, `discovery`.
- [x] Renderer adapter registry maps each `presetId` to one of: `pattern-tiled`, `particle-field`, `grid-noise` (8), `particle-noise` (4), `svg-geometric`, `svg-spokes`.
- [x] Canonical egress per preset matches `compatibility-plan.md` table (including `floating-particles` → Graphics, geometric/spokes → Graphics).
- [x] `grain-field` has unresolved palette behavior documented; excluded from derived operator list logic (test or helper).
- [x] Unit tests assert every inventory key (26) resolves to expected `presetId` via catalogue ingress IDs.
- [x] Unit tests assert canonical egress shape per preset.

## Verification commands

```bash
npm test
```

## References

- `.scratch/generated-backgrounds/catalogue-contract.md`
- `.scratch/generated-backgrounds/compatibility-plan.md`
- `.scratch/generated-backgrounds/current-preset-inventory.md`

## Comments

### 2026-08-28 — Agent implementation complete

- Added the Generated catalogue module and public exports under `src/components/backgrounds/variants/Generated/catalogue/`.
- Added 25 catalogue records, six adapter groups, 45 unique generated ingress IDs, canonical egress, and operator eligibility.
- Kept `noise.graphics` as ingress-only and mapped it to `balanced-noise`.
- Added six focused tests covering counts, inventory mapping, ingress uniqueness, canonical egress, operator controls, and unresolved visibility/palette filtering.
- Verification: `npm test` passed 96 tests with one existing write-mode test skipped.
- Verification: `npm run lint` completed with no TypeScript errors.

### 2026-08-28 — Human approval

The user approved downstream implementation and authorized the team to start tickets 07–13. Ticket 06 is accepted as the completed dependency for tickets 07 and 09.
