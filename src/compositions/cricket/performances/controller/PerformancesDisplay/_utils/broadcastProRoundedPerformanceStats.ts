import { PerformanceData } from "../../../_types/types";
import { buildBroadcastProRoundedPerformanceStatMatrixCells } from "../../../../utils/broadcastProRounded/stat/buildBroadcastProRoundedStatMatrixCells";
import type { BroadcastProRoundedTripleStat } from "../../../../utils/broadcastProRounded/playerRanking/types";

export type BroadcastProRoundedPerformanceTripleStat = BroadcastProRoundedTripleStat;

export const getPerformanceBroadcastProRoundedTripleStats = (
  performance: PerformanceData,
): BroadcastProRoundedPerformanceTripleStat => {
  const cells = buildBroadcastProRoundedPerformanceStatMatrixCells(performance);
  return {
    label1: cells[0]?.label ?? "",
    value1: cells[0]?.value ?? "—",
    label2: cells[1]?.label ?? "",
    value2: cells[1]?.value ?? "",
    label3: cells[2]?.label ?? "",
    value3: cells[2]?.value ?? "",
  };
};
