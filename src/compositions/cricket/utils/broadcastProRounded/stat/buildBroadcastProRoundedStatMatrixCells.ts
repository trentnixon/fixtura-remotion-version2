import {
  BROADCAST_PRO_BATTING_STAT_LABELS,
  BROADCAST_PRO_BOWLING_STAT_LABELS,
  type BroadcastProRoundedStatLabelStyle,
  type BroadcastProRoundedStatMatrixCell,
} from "../../../../../templates/types/broadcast-pro-rounded/stat-matrix";
import { getBowlingEconomyDisplay } from "../../../top5/controller/PlayersDisplay/_utils/broadcastProRoundedStats";
import { PlayerData, isBatter, isBowler } from "../../../top5/_types/types";
import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../../../performances/_types/types";
import type {
  BattingStats,
  BowlingStats,
  FieldingStats,
} from "../../../TeamOfTheWeek/types";

const battingTripleCells = (
  runs: number,
  balls: number,
  sr: number,
  notOut: boolean,
  labelStyle: BroadcastProRoundedStatLabelStyle,
): BroadcastProRoundedStatMatrixCell[] => {
  const labels = BROADCAST_PRO_BATTING_STAT_LABELS[labelStyle];
  const runsDisplay = notOut ? `${runs}*` : `${runs}`;
  return [
    { label: labels.runs, value: runsDisplay },
    { label: labels.balls, value: `${balls}` },
    {
      label: labels.sr,
      value: Number.isFinite(sr) ? sr.toFixed(2) : "—",
    },
  ];
};

const bowlingTripleCells = (
  wickets: number,
  runs: number,
  overs: string,
  labelStyle: BroadcastProRoundedStatLabelStyle,
): BroadcastProRoundedStatMatrixCell[] => {
  const labels = BROADCAST_PRO_BOWLING_STAT_LABELS[labelStyle];
  return [
    { label: labels.figures, value: `${wickets}/${runs}` },
    { label: labels.overs, value: `${overs}` },
    {
      label: labels.economy,
      value: getBowlingEconomyDisplay(runs, overs),
    },
  ];
};

/** Triple matrix cells for Top 5 player cards (full labels). */
export const buildBroadcastProRoundedTop5StatMatrixCells = (
  player: PlayerData,
): BroadcastProRoundedStatMatrixCell[] => {
  if (isBatter(player)) {
    return battingTripleCells(
      player.runs,
      player.balls,
      player.SR,
      player.notOut,
      "full",
    );
  }
  if (isBowler(player)) {
    return bowlingTripleCells(
      player.wickets,
      player.runs,
      player.overs,
      "full",
    );
  }
  return [{ value: "—" }, { value: "" }, { value: "" }];
};

/** Triple matrix cells for Performances grid (short bowling labels). */
export const buildBroadcastProRoundedPerformanceStatMatrixCells = (
  performance: PerformanceData,
): BroadcastProRoundedStatMatrixCell[] => {
  if (isBattingPerformance(performance)) {
    return battingTripleCells(
      performance.runs,
      performance.balls,
      performance.SR,
      performance.notOut,
      "full",
    );
  }
  if (isBowlingPerformance(performance)) {
    return bowlingTripleCells(
      performance.wickets,
      performance.runs,
      performance.overs,
      "short",
    );
  }
  return [{ value: "—" }, { value: "" }, { value: "" }];
};

/** Structured player-stat string for compact surfaces (TotW, result rows). */
export const formatBroadcastProRoundedCompactBattingStat = (
  batting: BattingStats,
): string => `${batting.runs}${batting.notOut ? "*" : ""} (${batting.balls})`;

export const formatBroadcastProRoundedCompactBowlingStat = (
  bowling: BowlingStats,
): string => `${bowling.wickets}/${bowling.runs} (${bowling.overs})`;

export const formatBroadcastProRoundedCompactFieldingStat = (
  fielding: FieldingStats,
): string => `${fielding.catches} ct · ${fielding.stumpings} st`;
