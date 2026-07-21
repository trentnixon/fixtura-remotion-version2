import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../../../_types/types";
import { getBowlingEconomyDisplay } from "../../../../top5/controller/PlayersDisplay/_utils/broadcastProStats";

export interface BroadcastProPerformanceTripleStat {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  label3: string;
  value3: string;
}

export const getPerformanceBroadcastProTripleStats = (
  performance: PerformanceData,
): BroadcastProPerformanceTripleStat => {
  if (isBattingPerformance(performance)) {
    const runs = performance.notOut
      ? `${performance.runs}*`
      : `${performance.runs}`;
    return {
      label1: "Runs",
      value1: runs,
      label2: "Balls",
      value2: `${performance.balls}`,
      label3: "SR",
      value3: Number.isFinite(performance.SR) ? performance.SR.toFixed(2) : "—",
    };
  }
  if (isBowlingPerformance(performance)) {
    return {
      label1: "Figs",
      value1: `${performance.wickets}/${performance.runs}`,
      label2: "Ov",
      value2: `${performance.overs}`,
      label3: "Econ",
      value3: getBowlingEconomyDisplay(performance.runs, performance.overs),
    };
  }
  return {
    label1: "",
    value1: "—",
    label2: "",
    value2: "",
    label3: "",
    value3: "",
  };
};
