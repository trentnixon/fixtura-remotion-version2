import { FieldingStats, TeamOfTheWeekPlayer } from "../types";

// Re-export icon pack functions for backward compatibility
export {
  getPositionIcon,
  setDefaultIconPack,
  getDefaultIconPack,
  registerIconPack,
  type IconPack,
} from "./iconPacks";

// Helper function to format category position labels
export const getCategoryPositionLabel = (position: string): string => {
  const labels: Record<string, string> = {
    topscorer: "Top Scorer",
    higheststrikerate: "Highest Strike Rate",
    mostwickets: "Most Wickets",
    besteconomy: "Best Economy",
    topallrounder: "Top All-Rounder",
    bestoftherest: "12th Man",
    wicketKeeper: "Wicket-Keeper",
  };
  return labels[position] || position;
};

export const formatFieldingStat = (fielding: FieldingStats): string => {
  return `${fielding.catches} ct · ${fielding.stumpings} st`;
};

// Helper function to clean player names by removing captain/vice-captain/wicket-keeper suffixes
export const cleanPlayerName = (name: string): string => {
  // Remove (c), (C), (vc), (VC), (wk), (WK) and any surrounding spaces
  return name
    .replace(/\s*\([cC]\)\s*/g, " ")
    .replace(/\s*\([vV][cC]\)\s*/g, " ")
    .replace(/\s*\([wW][kK]\)\s*/g, " ")
    .trim();
};

// Helper function to get score values for Sixers/Thunder format
export const getScoreValues = (
  player: TeamOfTheWeekPlayer,
): { mainValue: string; suffix: string } => {
  // For all-rounders and 12th man with both stats, show batting first
  if (
    (player.categoryDetail.position === "topallrounder" ||
      player.categoryDetail.position === "bestoftherest") &&
    player.batting &&
    player.bowling
  ) {
    // Show batting stats as main
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Batting positions
  if (
    (player.categoryDetail.position === "topscorer" ||
      player.categoryDetail.position === "higheststrikerate") &&
    player.batting
  ) {
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Bowling positions
  if (
    (player.categoryDetail.position === "mostwickets" ||
      player.categoryDetail.position === "besteconomy") &&
    player.bowling
  ) {
    const mainValue = `${player.bowling.wickets}/${player.bowling.runs}`;
    const suffix = `(${player.bowling.overs})`;
    return { mainValue, suffix };
  }

  // Wicket-keeper position
  if (
    player.categoryDetail.position === "wicketKeeper" &&
    "fielding" in player &&
    player.fielding
  ) {
    return { mainValue: formatFieldingStat(player.fielding), suffix: "" };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
