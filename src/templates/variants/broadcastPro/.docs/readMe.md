# Folder Overview

Broadcast Pro variant: template extending the base layout with Teko and Rajdhani typography and Basic-aligned animations.

## Files

- `index.tsx`: entry point exporting the BroadcastPro variant composition
- `theme/`: see [Theme folder layout](#theme-folder-layout) below
- `animations.ts`: animation presets used by Broadcast Pro components
- `components/`: all Broadcast Pro variant building blocks

## Theme folder layout

The Broadcast Pro theme is split by responsibility. The **public export** is `broadcastProTheme` from **`theme/index.ts`**. **`index.tsx`** imports it via **`import { broadcastProTheme } from "./theme"`** (the `theme/` directory; there is no `theme.ts` file at the variant root—avoids a name clash where `./theme` would resolve to a file instead of the folder).

| File / folder                     | Responsibility                                                                                                                                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme/index.ts`                  | Assembles `baseTheme` + tokens + layout + mode + merged `componentStyles`; **`satisfies TemplateThemeConfig`**.                                                                                                   |
| `theme/tokens.ts`                 | `fonts`, `fontClasses`, `broadcastProGlassOpacity`, **`broadcastProRosterListSizing`** (roster name/index pixel scaling consumed by `computeBroadcastProRosterPlayerListMetrics`).                                |
| `theme/componentStyles.shared.ts` | Cross-cutting `componentStyles` keys: titles, body, player/team/label, `metadata*`.                                                                                                                               |
| `theme/composition/`              | One file per **cricket composition** surface: `ladder.ts`, `upcoming.ts`, `top5.ts`, `teamOfTheWeek.ts`, `results.ts`, `roster.ts`. Merged in `composition/index.ts` as `broadcastProCompositionComponentStyles`. |
| `theme/layout.ts`                 | `layout` (heights, spacing, padding, border radius).                                                                                                                                                              |
| `theme/mode.ts`                   | `mode` (light / lightAlt / dark / darkAlt palettes).                                                                                                                                                              |

**Editing guidance:** tune glass and roster list math in **`tokens.ts`**; tune shared typography in **`componentStyles.shared.ts`**; tune a single composition’s Tailwind classes in the matching file under **`theme/composition/`**.

**Types:** partials use `satisfies Pick<ThemeComponentStyles, …>` where useful; full shape is checked on the assembled `broadcastProTheme`.

## Main header (BroadcastProMainHeader)

- Layout: centered vertical stack (logo → `metadata.title` → secondary line), `layout.heights.header` 540px; logo badge always shown (image when `club.logo.url` exists).
- Secondary line text: `metadata.videoTitle` if non-empty; else `metadata.titleSplit` joined with `·`; else `club.name`.

## Child Modules

- **`components/`**: [components/.docs/readMe.md](./components/.docs/readMe.md)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Mode: `text.copy` vs `text.title` (light / dark / alts)

- `theme.mode.*.text.copy` drives **`onContainerCopy`** in the color system (`palette.text.onContainer.copy`). Body copy on glass-style surfaces (e.g. upcoming fixtures, ladder rows) uses that token.
- **`text.copy` is the same for `light` and `lightAlt`, and the same for `dark` and `darkAlt`.** Alt modes only change **`text.title`** (e.g. for header/hero contrast). No separate alt body-copy token unless product adds it to `theme/mode.ts`.

## Glass opacity: `broadcastProGlassOpacity` (sm / md / lg)

- Set **`broadcastProGlassOpacity: 'sm' | 'md' | 'lg'`** on **`theme/tokens.ts`**. **`md`** is the template default (stronger main row + header than stitch **`sm`** for copy contrast). **`lg`** is the strongest preset.
- Alphas are defined in **`BROADCAST_PRO_TRANSPARENT_BY_PRESET`** in [TemplateThemeConfig.ts](../../types/TemplateThemeConfig.ts). Resolution: **`resolveBroadcastProTransparentLayers`**.

## `broadcastProTransparentLayers` (optional override)

- If set, **fully replaces** the preset. Same shape as preset entries: **`glass`**, **`logoWell`**, **`fixtureHeader`** (alpha-only over mode surface). **`DEFAULT_BROADCAST_PRO_TRANSPARENT_LAYERS`** equals the **`sm`** preset.

## Dependencies

- Internal: `components`
- External: Remotion, React
