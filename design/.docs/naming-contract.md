# Design template factory — naming contract

Operational mapping for design-site prototypes and planned Remotion handoff. Product glossary terms live in root `CONTEXT.md`.

## Identifiers

| Concept | Convention | Example |
| -------- | ------------- | -------- |
| **Variant slug** | kebab-case URL segment | `stadium-signal` |
| **Registry ID** | PascalCase in video data | `StadiumSignal` |
| **Routing key** | Registry ID lowercased (Remotion composition maps) | `stadiumsignal` |
| **Asset slug** | kebab-case HTML/bind filename | `result-single` |
| **Remotion variant folder** | Default: lowercase first character of Registry ID | `StadiumSignal` → `stadiumSignal` |

**Do not** use variant slug as the Remotion routing key when they differ (e.g. `broadcast-pro` → routing key `broadcastpro`).

Documented folder exceptions:

| Registry ID | Variant slug | Remotion folder |
| ----------- | ------------ | --------------- |
| `BroadcastPro` | `broadcast-pro` | `broadcastPro` |
| `Scoreline` | `scoreline` | `scoreline` |

Override at scaffold time with `--variant-folder` when needed.

## Cricket asset slugs (ten)

| Asset slug | Tab label | Fixture (under `testData/samples/Cricket/`) | Composition | Theme file |
| ---------- | --------- | ------------------------------------------- | ----------- | ---------- |
| `results` | Results | `Cricket_Results.json` | `cricket/results` | `results.ts` |
| `result-single` | Result Single | `Cricket_WeekendResultsSingle.json` | `cricket/resultSingle` | `resultSingle.ts` |
| `upcoming` | Upcoming Fixtures | `Cricket_upcoming.json` | `cricket/upcoming` | `upcoming.ts` |
| `ladder` | Ladder | `Cricket_Ladder.json` | `cricket/ladder` | `ladder.ts` |
| `top5-batting` | Top 5 Batting | `Cricket_Top5Batters.json` | `cricket/top5` | `top5.ts` |
| `top5-bowling` | Top 5 Bowling | `Cricket_Top5Bowlers.json` | `cricket/top5` | `top5.ts` |
| `performances-batting` | Batting Performances | `Cricket_BattingPerformances.json` | `cricket/performances` | `performances.ts` |
| `performances-bowling` | Bowling Performances | `Cricket_BowlingPerformances.json` | `cricket/performances` | `performances.ts` |
| `team-roster` | Team Roster | `Cricket_Roster.json` | `cricket/teamRoster` | `roster.ts` |
| `team-of-the-week` | Team of the Week | `Cricket_TeamOfTheWeek.json` | `cricket/teamOfTheWeek` | `teamOfTheWeek.ts` |

Theme paths are explicit filenames — not derived from asset slugs alone.

## CSS (generic scaffolds)

| Layer | Pattern |
| ----- | ------- |
| Template-wide | `design/_shared/{variant-slug}-shared.css` |
| Per asset | `design/_shared/{variant-slug}-{asset-slug}.css` |
| Canvas root class | `.template-canvas` |

Legacy Scoreline keeps `scoreline-polish.css` / `scoreline-{asset}.css` (grandfathered).

## Bootstrap profiles

| `bootstrap` value | Meaning |
| ----------------- | ------- |
| `generic` | Factory scaffold: `init-template.js`, population modules, template CSS |
| `legacy` | Scoreline or Broadcast Pro — pre-factory wiring |
