import { PlayerData, isBatter, isBowler } from "../../../_types/types";

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

export interface BroadcastProTripleStat {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  label3: string;
  value3: string;
}

export const getBroadcastProTripleStats = (
  player: PlayerData,
): BroadcastProTripleStat => {
  if (isBatter(player)) {
    const runs = player.notOut ? `${player.runs}*` : `${player.runs}`;
    return {
      label1: "Runs",
      value1: runs,
      label2: "Balls",
      value2: `${player.balls}`,
      label3: "SR",
      value3: Number.isFinite(player.SR) ? player.SR.toFixed(2) : "—",
    };
  }
  if (isBowler(player)) {
    return {
      label1: "Figures",
      value1: `${player.wickets}/${player.runs}`,
      label2: "Overs",
      value2: `${player.overs}`,
      label3: "Economy",
      value3: getBowlingEconomyDisplay(player.runs, player.overs),
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
