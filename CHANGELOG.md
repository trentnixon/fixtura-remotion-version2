# Changelog

All notable changes to `@fixtura/remotion-assets` are documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

## [0.1.12] - 2026-11-11

### Changed

- **Main-sequence exit policy** — `mainSequenceExitPolicy` documents and centralizes footer (−15), main header (−30), and row exit framing; all template `*MainHeader` components use `calculateMainHeaderExitFrame`. Top 5 row exit delegates to `calculateMainRowExitFrame`. `SponsorFooterChrome` wraps shared `SponsorFooter` with variant decoration (Scoreline crease, Night Session rule).

- **Composition routing manifest** — `COMPOSITION_REGISTRY_MANIFEST` is the single source for Registry ID → export keys, legacy aliases, and `resolveCompositionTemplateComponent`. Cricket composition exports are built via `buildCompositionVariantMap`; `compositionTemplateKey` is a deprecated re-export shim.

- **Template registration manifest** — `TEMPLATE_REGISTRATION_MANIFEST` is authoritative for `TEMPLATE_IDS`, composition export keys, preview lazy loaders, and optional `dist/templates/*` publish chunks. `registry.tsx` and `compositionRoutingManifest` derive from it; `templateIds` is a deprecated re-export barrel.

## [0.1.11] - 2026-11-11

### Changed

- **Generated background ingress** — `backgroundPort` centralizes legacy wire matching, validated render routes, and production composition ID registration (`buildProductionCompositionIds`, `listProductionCompositionIds`). `SelectTemplateBackground`, Broadcast Pro backgrounds, `getProductionCompositionMeta`, and `ProductionRoot` route through the port; ADR-0002 legacy `useBackground` in remote IDs unchanged.

## [0.1.10] - 2026-11-11

### Changed

- **Composition × Registry ID routing** — `resolveCompositionTemplateComponent` and `compositionExportKeyCandidates` unify PascalCase Registry IDs with legacy composition export keys (e.g. `nightSession` / `nightsession`). `RouteToComposition` uses Registry ID as-is instead of lowercasing; Night Session one-off and debug logging removed. `compositionRoutingManifest` maps design `remotion.composition` paths (kebab + camelCase) to metadata composition IDs; Vitest walks `design/_shared/routes.json` for handoff parity.

## [0.1.9] - 2026-11-11

### Changed

- **Bind-map layering** — Runtime hydration loads canonical `design/_templates/cricket/*.bind.json` and merges optional `design/_shared/hydration/overlays/{variant}/{sport}/*.bind.json` overlays (`__bindMode: replace` when needed). Legacy per-variant copies identical to starters were removed.

## [0.1.8] - 2026-11-11

### Changed

- **Design bootstrap pipeline** — `runDesignPipeline` unifies hydrate → manifest population → canvas resolution for factory, Scoreline, and Night Session pages. Cricket layout adapters moved under `design/_shared/layout/cricket/`; `scoreline-layout.js` is a compatibility barrel.

## [0.1.7] - 2026-11-11

### Added

- **`@fixtura/remotion-assets/preview-core`** — composition metadata, Registry ID helpers, and `loadPreviewTemplateComponent` without pulling full template implementations into the host’s initial chunk.
- **Per–Registry ID publish entries** — `@fixtura/remotion-assets/preview/templates/scoreline`, `night-session`, and `mudgeeraba` for hosts that compose `TemplateComponent` and bundled styles manually.
- **Lazy template chunks** — `dist/preview.*` resolves templates via dynamic `import()` (with `splitting: true` in tsup). Hosts must ship the full `dist/` chunk graph (not only `preview.mjs`). `FixturaTemplateScene` preloads the Registry ID chunk on mount; `getProductionCompositionFromData` from `/preview` returns a lazy `TemplateComponent` (distinct from the sync resolver under shipped `src/core/`).

### Changed

- **`getProductionCompositionMeta`** — shared ID/duration resolution extracted from `getProductionCompositionFromData` for the core publish seam.

## [0.1.6] - 2026-09-11

### Added

- **Scoreline bundled CSS in preview bundle** — `build:package` inlines Scoreline scoped stylesheets into `dist/preview.*` and injects them at runtime via `ScorelineBundledStyles`, so consuming apps only need `@fixtura/remotion-assets/preview` (no separate stylesheet import for Scoreline layout).

### Changed

- **`build:package`** runs `scripts/inline-scoreline-css.mjs` before `tsup`; **`verify:pack`** asserts Scoreline CSS markers in `dist/preview.css`, `dist/preview.mjs`, and the generated module.

## [0.1.3] - 2026-04-14

### Added

- **`./tailwind-preset`** export (`src/package/tailwind-preset.cjs`) — single source of truth for `font-teko` / `font-rajdhani` theme extensions; use in consuming apps alongside Tailwind content scanning of the published package source.
- **`verify:pack`** script — validates `package.json` `files` paths and critical publish paths (including `src/templates/variants` coverage via sentinel files and shipped trees). Runs at the end of `build:package`.

### Documentation

- README: **public API**, **semver** expectations for exports and shipped `files`, **consuming-app** Tailwind v3 `content` + preset, monorepo `require.resolve` pattern, Tailwind v4 `@source` note, **`styles.css` as supplementary**, isolation note.
- Cross-reference from [.comms/Remotion Package Styles Implementation Note.md](.comms/Remotion%20Package%20Styles%20Implementation%20Note.md): primary integration is app-side scanning + theme parity, not CSS-only.

### Changed

- Root **`tailwind.config.ts`** now applies the same preset as consumers to avoid theme drift.

## [0.1.2] - prior

Earlier releases: see git history.

[0.1.3]: https://github.com/trentnixon/fixtura-remotion-version2/compare/v0.1.2...v0.1.3
