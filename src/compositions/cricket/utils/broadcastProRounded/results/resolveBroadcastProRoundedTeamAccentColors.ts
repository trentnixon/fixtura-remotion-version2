import type { ResultSummary } from "../../../results/_types/types";
import type { BroadcastProRoundedResultMatchData } from "./types";

export type BroadcastProRoundedTeamAccentRole = "primary" | "secondary";

export interface BroadcastProRoundedTeamAccentColors {
  home: string;
  away: string;
  homeRole: BroadcastProRoundedTeamAccentRole;
  awayRole: BroadcastProRoundedTeamAccentRole;
}

export interface BroadcastProRoundedTeamAccentInput {
  match: Pick<
    BroadcastProRoundedResultMatchData,
    "homeTeam" | "awayTeam" | "resultSummary" | "status"
  >;
  isAccountClub: boolean;
  primary: string;
  secondary: string;
}

export type BroadcastProRoundedClubSide = "home" | "away" | null;

export const getClubSide = (params: {
  isAccountClub: boolean;
  homeIsClub: boolean;
  awayIsClub: boolean;
}): BroadcastProRoundedClubSide => {
  const { isAccountClub, homeIsClub, awayIsClub } = params;
  if (!isAccountClub) return null;
  if (homeIsClub && !awayIsClub) return "home";
  if (!homeIsClub && awayIsClub) return "away";
  return null;
};

export const isHomeWinner = (
  summary: ResultSummary,
  homeName: string,
  awayName: string,
): boolean => {
  const winner = summary.winner.trim();
  if (winner === homeName.trim()) return true;
  if (winner === awayName.trim()) return false;
  return true;
};

const assignBySide = (
  primarySide: BroadcastProRoundedClubSide,
  primary: string,
  secondary: string,
): BroadcastProRoundedTeamAccentColors => {
  if (primarySide === "home") {
    return {
      home: primary,
      away: secondary,
      homeRole: "primary",
      awayRole: "secondary",
    };
  }
  if (primarySide === "away") {
    return {
      home: secondary,
      away: primary,
      homeRole: "secondary",
      awayRole: "primary",
    };
  }
  return {
    home: primary,
    away: secondary,
    homeRole: "primary",
    awayRole: "secondary",
  };
};

/**
 * Resolves per-team accent colours for score badges and bowling stat highlights.
 *
 * Priority: club bias (account club + single isClubTeam) → outcome (winner) → positional (home/away).
 */
export const resolveBroadcastProRoundedTeamAccentColors = (
  input: BroadcastProRoundedTeamAccentInput,
): BroadcastProRoundedTeamAccentColors => {
  const { match, isAccountClub, primary, secondary } = input;
  const { homeTeam, awayTeam, resultSummary } = match;

  const clubSide = getClubSide({
    isAccountClub,
    homeIsClub: homeTeam.isClubTeam,
    awayIsClub: awayTeam.isClubTeam,
  });

  if (clubSide != null) {
    return assignBySide(clubSide, primary, secondary);
  }

  if (resultSummary?.winner) {
    const homeWon = isHomeWinner(resultSummary, homeTeam.name, awayTeam.name);
    return assignBySide(homeWon ? "home" : "away", primary, secondary);
  }

  return assignBySide("home", primary, secondary);
};
