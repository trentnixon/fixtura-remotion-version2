import type { PerformanceData } from "../../../performances/_types/types";
import type { PlayerData } from "../../../top5/_types/types";

/** Performance rows share the same batting/bowling shape as Top 5 leader rows. */
export const performanceAsLeaderPlayer = (
  performance: PerformanceData,
): PlayerData => performance as PlayerData;
