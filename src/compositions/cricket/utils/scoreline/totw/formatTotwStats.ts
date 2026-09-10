import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";

export type ScorelineTotwStats = {
  main: string;
  suffix: string;
  subline: string;
};

const POSITION_LABELS: Record<string, string> = {
  topscorer: "Top Scorer",
  higheststrikerate: "Highest Strike Rate",
  mostwickets: "Most Wickets",
  besteconomy: "Best Economy",
  topallrounder: "Top All-Rounder",
  bestoftherest: "12th Man",
  wicketKeeper: "Wicket-Keeper",
};

export const getTotwRoleLabel = (player: TeamOfTheWeekPlayer): string => {
  const position = player.categoryDetail?.position ?? "";
  const positionLabel =
    POSITION_LABELS[position] ??
    position.replace(/([a-z])([A-Z])/g, "$1 $2");

  return `${player.category} · ${positionLabel}`;
};

export const formatTotwStats = (
  player: TeamOfTheWeekPlayer,
): ScorelineTotwStats => {
  const position = player.categoryDetail?.position ?? "";

  if (
    (position === "topscorer" ||
      position === "higheststrikerate" ||
      position === "bestoftherest") &&
    "batting" in player &&
    player.batting
  ) {
    const { runs, balls, strikeRate, notOut } = player.batting;
    const main = notOut ? `${runs}*` : String(runs);
    const suffix = balls > 0 ? `(${balls})` : "";
    const subline =
      strikeRate > 0 ? `SR ${Number(strikeRate).toFixed(1)}` : "";

    return { main, suffix, subline };
  }

  if (
    (position === "mostwickets" || position === "besteconomy") &&
    "bowling" in player &&
    player.bowling
  ) {
    const { wickets, runs, overs, economy } = player.bowling;

    return {
      main: `${wickets}/${runs}`,
      suffix: overs > 0 ? `(${overs})` : "",
      subline: economy > 0 ? `Econ ${Number(economy).toFixed(2)}` : "",
    };
  }

  if (
    position === "topallrounder" &&
    "batting" in player &&
    player.batting &&
    "bowling" in player &&
    player.bowling
  ) {
    const { runs, balls, notOut } = player.batting;
    const main = notOut ? `${runs}*` : String(runs);
    const suffix = balls > 0 ? `(${balls})` : "";
    const subline = `${player.bowling.wickets}/${player.bowling.runs} (${player.bowling.overs})`;

    return { main, suffix, subline };
  }

  if (position === "wicketKeeper" && "fielding" in player && player.fielding) {
    return {
      main: `${player.fielding.catches} ct`,
      suffix: "",
      subline: `${player.fielding.stumpings} st`,
    };
  }

  return { main: "", suffix: "", subline: "" };
};

export const resolveTotwDensity = (
  count: number,
): "normal" | "compact" | "tight" => {
  if (count <= 7) {
    return "normal";
  }

  if (count <= 10) {
    return "compact";
  }

  return "tight";
};
