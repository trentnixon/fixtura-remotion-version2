import type { MatchResult } from "../../../results/_types/types";
import {
  pickTopBatting,
  pickTopBowling,
  type ScorelinePerformanceRow,
} from "./formatPerformances";

export const PERFORMANCE_SLOT_COUNT = 3;

export const toPerformanceSlots = (
  rows: ScorelinePerformanceRow[],
): Array<ScorelinePerformanceRow | null> =>
  Array.from(
    { length: PERFORMANCE_SLOT_COUNT },
    (_, index) => rows[index] ?? null,
  );

/**
 * Performance sources follow design scoreline results / result-single bind maps:
 * batting prefers home when populated, else away; bowling prefers away when populated, else home.
 */
export const resolveScorelineMatchPerformances = (match: MatchResult) => {
  const battingSource =
    match.homeTeam.battingPerformances.length > 0
      ? match.homeTeam.battingPerformances
      : match.awayTeam.battingPerformances;

  const bowlingSource =
    match.awayTeam.bowlingPerformances.length > 0
      ? match.awayTeam.bowlingPerformances
      : match.homeTeam.bowlingPerformances;

  const battingRows = toPerformanceSlots(pickTopBatting(battingSource));
  const bowlingRows = toPerformanceSlots(pickTopBowling(bowlingSource));

  const hasBatting = battingRows.some((row) => row?.kind === "batting");
  const hasBowling = bowlingRows.some((row) => row?.kind === "bowling");
  const performancePanelCount = (hasBatting ? 1 : 0) + (hasBowling ? 1 : 0);

  return {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  };
};
