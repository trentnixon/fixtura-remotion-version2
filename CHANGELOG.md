# Changelog

All notable changes to `@fixtura/remotion-assets` are documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

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
