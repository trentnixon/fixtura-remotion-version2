# Folder Overview

TypeScript contracts for template configuration: shared theme tokens, per-template style packs, and related config types.

## Theme type system (global + template packs)

- **`global/`** — Types used by **all** template variants (fonts, layout, palette, modes, animation, media, and **global** `componentStyles` keys such as `title`, `RosterPlayerName`, `ResultScore`, etc.).
- **`broadcast-pro/`** — **Broadcast Pro–only** additions: optional `componentStyles` keys (`broadcastProRoster*`, `upcoming*`, etc.) and glass helpers (`BroadcastProTransparentLayers`, presets, `resolveBroadcastProTransparentLayers`).
- **`TemplateThemeConfig.ts`** — Root barrel: defines `TemplateThemeConfig`, merges component styles, re-exports `global/` and `broadcast-pro/`.

**Merged component styles**

- `ThemeComponentStyles` = `GlobalThemeComponentStyles` **&** `BroadcastProThemeComponentStyles` (intersection).
- Variant themes (e.g. `variants/broadcastPro/theme/`) implement the full merged shape where needed. For how Broadcast Pro splits that folder (`tokens`, `composition/*`, etc.), see [variants/broadcastPro/.docs/readMe.md](../../variants/broadcastPro/.docs/readMe.md#theme-folder-layout).

**Imports**

- Prefer `TemplateThemeConfig` (or `export *` from this file) for backward compatibility.
- Optional direct imports: `templates/types/global`, `templates/types/broadcast-pro`.

## Files (this folder)

| Path | Purpose |
|------|---------|
| `TemplateThemeConfig.ts` | `TemplateThemeConfig`, `ThemeComponentStyles` merge, re-exports |
| `global/component-style.ts` | `ComponentStyle` (`className` shell) |
| `global/theme-component-styles.ts` | `GlobalThemeComponentStyles` |
| `global/theme-shared.ts` | `ThemeFonts`, `ThemeLayout`, palette types, `ThemeModes`, `ThemeAnimation`, `ThemeMedia`, etc. |
| `global/index.ts` | Re-exports global types |
| `broadcast-pro/component-styles.ts` | `BroadcastProThemeComponentStyles` |
| `broadcast-pro/transparent-layers.ts` | `BroadcastProTransparentLayers`, presets, `resolveBroadcastProTransparentLayers` |
| `broadcast-pro/index.ts` | Re-exports Broadcast Pro types |
| `AnimationConfig .ts` | Animation configuration hooks |
| `AssetConfig.ts` | External assets required by a template |
| `settingsConfig.ts` | Runtime settings / controls per template |

## Relations

- Parent: [templates/.docs/readMe.md](../../.docs/readMe.md)
- Consumed by: `templates/base`, `templates/variants/*`, `templates/registry`, compositions, `core/context`, font loader
- New template packs: add under `templates/types/<pack-name>/` (mirror `broadcast-pro/`), intersect into `ThemeComponentStyles` in `TemplateThemeConfig.ts` when wired.

## Dependencies

- Internal: TypeScript only
- External: none
