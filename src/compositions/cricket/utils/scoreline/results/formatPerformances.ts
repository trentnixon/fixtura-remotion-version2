import type {
  BattingPerformance,
  BowlingPerformance,
} from "../../../results/_types/types";

export type ScorelinePerformanceRow =
  | {
      kind: "batting";
      player: string;
      runs: number;
      balls: number;
      notOut: boolean;
    }
  | {
      kind: "bowling";
      player: string;
      wickets: number;
      runs: number;
      overs: number;
    };

export const pickTopBatting = (
  performances: BattingPerformance[],
  limit = 3,
): ScorelinePerformanceRow[] =>
  performances.slice(0, limit).map((p) => ({
    kind: "batting" as const,
    player: p.player,
    runs: p.runs,
    balls: p.balls,
    notOut: p.notOut,
  }));

export const pickTopBowling = (
  performances: BowlingPerformance[],
  limit = 3,
): ScorelinePerformanceRow[] =>
  performances.slice(0, limit).map((p) => ({
    kind: "bowling" as const,
    player: p.player,
    wickets: p.wickets,
    runs: p.runs,
    overs: p.overs,
  }));

export const formatBattingFigure = (row: Extract<ScorelinePerformanceRow, { kind: "batting" }>) => {
  const notOut = row.notOut ? "*" : "";
  return `${row.runs}${notOut} (${row.balls})`;
};

export const formatBowlingFigure = (row: Extract<ScorelinePerformanceRow, { kind: "bowling" }>) =>
  `${row.wickets}/${row.runs} (${row.overs})`;
