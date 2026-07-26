import {
  PerformanceData,
} from "../../../_types/types";
import { buildBroadcastProPerformanceStatMatrixCells } from "../../../../utils/broadcastPro/stat/buildBroadcastProStatMatrixCells";
import type { BroadcastProTripleStat } from "../../../../utils/broadcastPro/playerRanking/types";

export type BroadcastProPerformanceTripleStat = BroadcastProTripleStat;

export const getPerformanceBroadcastProTripleStats = (
  performance: PerformanceData,
): BroadcastProPerformanceTripleStat => {
  const cells = buildBroadcastProPerformanceStatMatrixCells(performance);
  return {
    label1: cells[0]?.label ?? "",
    value1: cells[0]?.value ?? "—",
    label2: cells[1]?.label ?? "",
    value2: cells[1]?.value ?? "",
    label3: cells[2]?.label ?? "",
    value3: cells[2]?.value ?? "",
  };
};
