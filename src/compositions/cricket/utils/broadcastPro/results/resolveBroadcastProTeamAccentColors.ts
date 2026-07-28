import type { ResultSummary } from "../../../results/_types/types";
import type { BroadcastProResultMatchData } from "./types";

export type BroadcastProTeamAccentRole = "primary" | "secondary";

export interface BroadcastProTeamAccentColors {
  home: string;
  away: string;
  homeRole: BroadcastProTeamAccentRole;
  awayRole: BroadcastProTeamAccentRole;
}

export interface BroadcastProTeamAccentInput {
  match: Pick<
    BroadcastProResultMatchData,
    "homeTeam" | "awayTeam" | "resultSummary" | "status"
  >;
  isAccountClub: boolean;
  primary: string;
  secondary: string;
}

export type BroadcastProClubSide = "home" | "away" | null;

export const getClubSide = (params: {
  isAccountClub: boolean;
  homeIsClub: boolean;
  awayIsClub: boolean;
}): BroadcastProClubSide => {
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
  primarySide: BroadcastProClubSide,
  primary: string,
  secondary: string,
): BroadcastProTeamAccentColors => {
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
export const resolveBroadcastProTeamAccentColors = (
  input: BroadcastProTeamAccentInput,
): BroadcastProTeamAccentColors => {
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
