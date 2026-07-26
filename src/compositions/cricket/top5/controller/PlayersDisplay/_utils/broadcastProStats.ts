import { PlayerData } from "../../../_types/types";
import type { BroadcastProTripleStat } from "../../../../utils/broadcastPro/playerRanking/types";
import { buildBroadcastProTop5StatMatrixCells } from "../../../../utils/broadcastPro/stat/buildBroadcastProStatMatrixCells";

export type { BroadcastProTripleStat };

/** Cricket overs string → total legal balls (e.g. "8.4" → 8*6+4). */
export const parseOversToBalls = (oversStr: string): number => {
  const s = oversStr.trim();
  if (!s) return 0;
  const dot = s.indexOf(".");
  if (dot === -1) {
    const whole = parseFloat(s);
    return Number.isFinite(whole) ? Math.round(whole * 6) : 0;
  }
  const whole = parseInt(s.slice(0, dot), 10) || 0;
  const ballsPart = s.slice(dot + 1);
  const balls = parseInt(ballsPart, 10) || 0;
  return whole * 6 + balls;
};

export const getBowlingEconomyDisplay = (
  runs: number,
  oversStr: string,
): string => {
  const balls = parseOversToBalls(oversStr);
  if (balls <= 0) return "—";
  const decimalOvers = balls / 6;
  return (runs / decimalOvers).toFixed(2);
};

export const getBroadcastProTripleStats = (
  player: PlayerData,
): BroadcastProTripleStat => {
  const cells = buildBroadcastProTop5StatMatrixCells(player);
  return {
    label1: cells[0]?.label ?? "",
    value1: cells[0]?.value ?? "—",
    label2: cells[1]?.label ?? "",
    value2: cells[1]?.value ?? "",
    label3: cells[2]?.label ?? "",
    value3: cells[2]?.value ?? "",
  };
};
