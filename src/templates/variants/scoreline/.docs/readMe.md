# Folder Overview

Scoreline variant: overlay-first cricket graphics with crease motif grammar, Barlow Condensed + Source Sans 3 typography, and mode-aware container panels at 20% tint over the Remotion background.

## Files

- `index.tsx`: entry point exporting the Scoreline variant composition
- `theme/`: see [Theme folder layout](#theme-folder-layout) below
- `animations.ts`: animation presets used by Scoreline components
- `components/`: shell (intro, outro, background, main, header, sponsor footer, crease markup)
- `styles/`: scoped CSS synced with `design/_shared/scoreline-*.css` (motifs, ledgers, mode tokens)

## Theme folder layout

The Scoreline theme is split by responsibility. The **public export** is `scorelineTheme` from **`theme/index.ts`**.

| File / folder                     | Responsibility                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `theme/index.ts`                  | Assembles `baseTheme` + tokens + layout + mode + merged `componentStyles`; **`satisfies TemplateThemeConfig`**. |
| `theme/tokens.ts`                 | `fonts`, `fontClasses` (Barlow Condensed, Source Sans 3).                                                       |
| `theme/componentStyles.shared.ts` | Cross-cutting keys: canvas shell, animated shells, typography roles, sponsor strip.                             |
| `theme/composition/`              | One file per cricket asset: `results`, `resultSingle`, `upcoming`, `ladder`, `top5`, `roster`, `teamOfTheWeek`. |
| `theme/layout.ts`                 | Zone heights: header 140px, asset 1088px, footer 112px (1080×1350).                                             |
| `theme/mode.ts`                   | `light` / `lightAlt` / `dark` / `darkAlt` — Alt flips header title only; container copy unchanged.              |

**Editing guidance:** tune zone layout in **`layout.ts`**; tune shared Tailwind shell classes in **`componentStyles.shared.ts`**; tune per-asset ledger keys in **`theme/composition/{asset}.ts`**; tune visual identity (panels, crease, typography scale) in **`styles/`** and **`design/_shared/`**.

## Styling split (Scoreline-specific)

| Concern                                             | Location                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Flex/grid shells, animated wrappers                 | `componentStyles` via `csClass()` in composition displays                                               |
| Ledger markup, team bands, result bar, performances | Semantic CSS classes (`.results-ledger`, `.match-module`, …) in `styles/scoreline-*.css`                |
| Mode/container colours                              | `useScorelineCanvasStyle()` + `resolveScorelineOverlayTokens.ts` → CSS variables on `.scoreline-canvas` |
| Club accents                                        | Fixture palette + `--club-primary` / `--club-secondary`                                                 |
| Sponsor/footer strip                                | Transparent — layout from `scorelineSponsorStrip`; no panel background                                  |

Composition utils: `src/compositions/cricket/utils/scoreline/` — `csClass`, `useScorelineTheme`, match/fixture primitives, canvas dataset.

## Design handoff mapping

| Design HTML                                      | Remotion composition                  | Theme surface                        |
| ------------------------------------------------ | ------------------------------------- | ------------------------------------ |
| `design/variants/scoreline/cricket/results.html` | `cricket/results/scoreline.tsx`       | `theme/composition/results.ts`       |
| `…/result-single.html`                           | `cricket/resultSingle/scoreline.tsx`  | `theme/composition/resultSingle.ts`  |
| `…/upcoming.html`                                | `cricket/upcoming/scoreline.tsx`      | `theme/composition/upcoming.ts`      |
| `…/ladder.html`                                  | `cricket/ladder/scoreline.tsx`        | `theme/composition/ladder.ts`        |
| `…/top5-batting.html` / `top5-bowling.html`      | `cricket/top5/scoreline.tsx`          | `theme/composition/top5.ts`          |
| `…/team-roster.html`                             | `cricket/teamRoster/scoreline.tsx`    | `theme/composition/roster.ts`        |
| `…/team-of-the-week.html`                        | `cricket/TeamOfTheWeek/scoreline.tsx` | `theme/composition/teamOfTheWeek.ts` |

Manifest: `design/_shared/routes.json`, `design/.docs/asset-index.md`.

## Child Modules

- `./components/` — variant shell and shared overlay chrome
- `./styles/` — per-asset scoped CSS imported via `src/index.css` and `src/package/styles.css`
- `src/compositions/cricket/utils/scoreline/` — composition-side helpers and display primitives

## Relations

- Parent: `src/templates/variants/` (variant registry)
- Registry key: `Scoreline` (`src/templates/registry.tsx`)
- Routing key: `scoreline` (lowercase in `src/compositions/cricket/index.tsx`)
- Reference variant: `src/templates/variants/broadcastPro/.docs/readMe.md`
- Handoff runbook: `design/.docs/remotion-handoff.md`
