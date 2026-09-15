# Design prototype → Remotion index

**Broadcast Pro** intentionally registers **Results only** (golden single-page reference). Other cricket asset types are not missing by mistake; expand via a future additive command, not scaffold overwrite.

**Scoreline** does not yet register standalone **performances-batting** / **performances-bowling** pages (grandfathered). New factory scaffolds include all ten assets per [naming-contract.md](./naming-contract.md).

| Design route                         | Registry       | Fixture                                                      | Remotion composition    | Theme surface                                  |
| ------------------------------------ | -------------- | ------------------------------------------------------------ | ----------------------- | ---------------------------------------------- |
| `broadcast-pro/cricket/results`      | `BroadcastPro` | `testData/samples/Cricket/Cricket_Results.json`              | `cricket/results`       | `broadcastPro/theme/composition/results.ts`    |
| `scoreline/cricket/results`          | `Scoreline`    | `testData/samples/Cricket/Cricket_Results.json`              | `cricket/results`       | `scoreline/theme/composition/results.ts`       |
| `scoreline/cricket/upcoming`         | `Scoreline`    | `testData/samples/Cricket/Cricket_upcoming.json`             | `cricket/upcoming`      | `scoreline/theme/composition/upcoming.ts`      |
| `scoreline/cricket/top5-batting`     | `Scoreline`    | `testData/samples/Cricket/Cricket_Top5Batters.json`          | `cricket/top5`          | `scoreline/theme/composition/top5.ts`          |
| `scoreline/cricket/top5-bowling`     | `Scoreline`    | `testData/samples/Cricket/Cricket_Top5Bowlers.json`          | `cricket/top5`          | `scoreline/theme/composition/top5.ts`          |
| `scoreline/cricket/ladder`           | `Scoreline`    | `testData/samples/Cricket/Cricket_Ladder.json`               | `cricket/ladder`        | `scoreline/theme/composition/ladder.ts`        |
| `scoreline/cricket/result-single`    | `Scoreline`    | `testData/samples/Cricket/Cricket_WeekendResultsSingle.json` | `cricket/resultSingle`  | `scoreline/theme/composition/resultSingle.ts`  |
| `scoreline/cricket/team-roster`      | `Scoreline`    | `testData/samples/Cricket/Cricket_Roster.json`               | `cricket/teamRoster`    | `scoreline/theme/composition/roster.ts`        |
| `scoreline/cricket/team-of-the-week` | `Scoreline`    | `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`        | `cricket/teamOfTheWeek` | `scoreline/theme/composition/teamOfTheWeek.ts` |

<!-- scaffold night-session -->

| `night-session/cricket/results` | `NightSession` | `testData/samples/Cricket/Cricket_Results.json` | `cricket/results` | `nightSession/theme/composition/results.ts` |
| `night-session/cricket/result-single` | `NightSession` | `testData/samples/Cricket/Cricket_WeekendResultsSingle.json` | `cricket/resultSingle` | `nightSession/theme/composition/resultSingle.ts` |
| `night-session/cricket/upcoming` | `NightSession` | `testData/samples/Cricket/Cricket_upcoming.json` | `cricket/upcoming` | `nightSession/theme/composition/upcoming.ts` |
| `night-session/cricket/ladder` | `NightSession` | `testData/samples/Cricket/Cricket_Ladder.json` | `cricket/ladder` | `nightSession/theme/composition/ladder.ts` |
| `night-session/cricket/top5-batting` | `NightSession` | `testData/samples/Cricket/Cricket_Top5Batters.json` | `cricket/top5` | `nightSession/theme/composition/top5.ts` |
| `night-session/cricket/top5-bowling` | `NightSession` | `testData/samples/Cricket/Cricket_Top5Bowlers.json` | `cricket/top5` | `nightSession/theme/composition/top5.ts` |
| `night-session/cricket/performances-batting` | `NightSession` | `testData/samples/Cricket/Cricket_BattingPerformances.json` | `cricket/performances` | `nightSession/theme/composition/performances.ts` |
| `night-session/cricket/performances-bowling` | `NightSession` | `testData/samples/Cricket/Cricket_BowlingPerformances.json` | `cricket/performances` | `nightSession/theme/composition/performances.ts` |
| `night-session/cricket/team-roster` | `NightSession` | `testData/samples/Cricket/Cricket_Roster.json` | `cricket/teamRoster` | `nightSession/theme/composition/roster.ts` |
| `night-session/cricket/team-of-the-week` | `NightSession` | `testData/samples/Cricket/Cricket_TeamOfTheWeek.json` | `cricket/teamOfTheWeek` | `nightSession/theme/composition/teamOfTheWeek.ts` |
