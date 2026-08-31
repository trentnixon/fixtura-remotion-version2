# 09 — Generic layout integration

**What to build:** One generic integration render through the central background selector and base template layout (not template-specific). Visual verification confirms the background appears behind composition content and foreground protection appears between the mapped image and content. No template-specific baselines.

**Blocked by:** 03 — Foreground protection and F01–F09 fixture registry

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Integration test composition (or harness) wires `useBackground: "Luminance"` through `SelectTemplateBackground` into `BaseTemplateLayout` with minimal placeholder main content.
- [ ] Still render completes for a representative luminance config with foreground protection enabled.
- [ ] Visual verification documents or automates that background imagery sits behind composition content.
- [ ] Visual verification documents or automates that foreground protection sits between the mapped image and composition content.
- [ ] No BroadcastPro, cricket dataset, or template-specific pixel baselines introduced.
- [ ] Component test for explicit layer order or z-index values included if the still alone cannot prove stacking.

## Verification commands

```bash
npm test
npx remotion still src/index.ts Luminance-Layout-Integration out/luminance-smoke/layout-integration.png --frame=0 --props=.scratch/luminance-background/fixtures/layout-integration.json
```

Expected: layout integration tests pass; still PNG written showing content above protected background. Create props fixture and composition registration as part of this ticket.
