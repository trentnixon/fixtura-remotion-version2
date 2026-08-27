# 05 — Production selector and in-repo discovery from the catalogue

**What to build:** Production background selection routes Graphics and Pattern through Generated. DevelopmentRoot and template-registry discovery metadata for those looks derive from the catalogue without duplicate hard-coded lists. A non-ID-bearing Generated Studio folder is added only if composition IDs stay identical after nesting; otherwise the blocker is recorded and the catalogue still ships.

**Blocked by:** 03 — Retained SVG presets through Generated; 04 — Retained Pattern presets through Generated

**Status:** ready-for-agent

## Acceptance criteria

- [ ] `useBackground: "Graphics"` and `"Pattern"` resolve through the Generated selector while preserving composition ID segments
- [ ] In-repo discovery metadata for retained Generated presets is derived from the catalogue
- [ ] Adding a retained preset does not require editing duplicate background lists
- [ ] Studio Generated nesting proof runs: either IDs unchanged and nesting ships, or blocker is recorded and nesting deferred
- [ ] Noise remains accepted at runtime and is not newly advertised in the registry

## Verification

```bash
npm test
npm run lint
```

Plus a focused check that composition ID construction for Graphics/Pattern paths is unchanged when nesting is enabled (or nesting is absent with a recorded blocker).
