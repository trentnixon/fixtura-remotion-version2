# 08 — Production render boundary (WP-3)

**What to build:** Validated production render path in `SelectTemplateBackground`: ingress check via `matchLegacyIngress`, catalogue adapter routing for generated presets, Solid + structured diagnostic for unsupported. Legacy wire values and valid family routing preserved.

**Blocked by:** 06, 07

**Status:** ready-for-human

**Related:** `implementation-handoff.md` WP-3; `discovery-surfaces.md` §3; `compatibility-plan.md`

## Acceptance criteria

- [x] `SelectTemplateBackground` validates stored `templateVariation` through `matchLegacyIngress` before render.
- [x] **`generated`** outcome routes through catalogue → renderer adapter (same visual outcome as current family renderers).
- [x] **`passthrough`** outcome uses existing renderers unchanged (Solid, Gradient, Image, Video, Texture, Luminance, Animated).
- [x] **`unsupported`** outcome renders **Solid** + emits structured diagnostic — does not silently fall back to family defaults.
- [x] Phase 1 does **not** accept `useBackground: "Generated"` as production wire.
- [x] RC-6 honored: only active family config read at render time.
- [x] No bypass of ingress validation for external/stored payloads.
- [x] Tests for generated routing (at least one per adapter family), passthrough, and unsupported paths.

## Verification commands

```bash
npm test
```

## Comments

### 2026-08-28 — Implementation complete

- `SelectTemplateBackground` uses `matchLegacyIngress` + `resolveValidatedBackgroundRoute`
- Unsupported → `SolidBackground` + `console.warn` diagnostic (`unsupported-background-ingress`)
- Tests: `src/components/backgrounds/resolveValidatedBackgroundRoute.test.ts`
- Verification: `npm test` (118 passed), `npm run lint`

## References

- `src/components/backgrounds/index.tsx`
- `src/components/backgrounds/resolveValidatedBackgroundRoute.ts`
- `.scratch/generated-backgrounds/compatibility-plan.md`
- `.scratch/generated-backgrounds/discovery-surfaces.md`
