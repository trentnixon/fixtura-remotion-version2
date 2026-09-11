import type { MatchResult, Team } from "../../../results/_types/types";
import { resolveScorelineUpcomingClubSides } from "../fixture/resolveScorelineUpcomingClubSides";
import { pickTopBatting, pickTopBowling } from "./formatPerformances";
import {
  resolveScorelineMatchPerformances,
  toPerformanceSlots,
} from "./resolveScorelineMatchPerformances";

/** Mirrors design/variants/scoreline/cricket/result-single.html applyClubPerformances. */
export const resolveScorelineClubTeam = (
  match: MatchResult,
  clubName?: string,
): Team | null => {
  if (match.homeTeam.isClubTeam) {
    return match.homeTeam;
  }

  if (match.awayTeam.isClubTeam) {
    return match.awayTeam;
  }

  const { homeIsClub, awayIsClub } = resolveScorelineUpcomingClubSides(
    match.homeTeam.name,
    match.awayTeam.name,
    clubName,
  );

  if (homeIsClub) {
    return match.homeTeam;
  }

  if (awayIsClub) {
    return match.awayTeam;
  }

  return null;
};

export const resolveScorelineResultSinglePerformances = (
  match: MatchResult,
  clubName?: string,
) => {
  const clubTeam = resolveScorelineClubTeam(match, clubName);

  if (clubTeam) {
    const battingRows = toPerformanceSlots(
      pickTopBatting(clubTeam.battingPerformances),
    );
    const bowlingRows = toPerformanceSlots(
      pickTopBowling(clubTeam.bowlingPerformances),
    );
    const hasBatting = battingRows.some((row) => row?.kind === "batting");
    const hasBowling = bowlingRows.some((row) => row?.kind === "bowling");
    const performancePanelCount = (hasBatting ? 1 : 0) + (hasBowling ? 1 : 0);

    return {
      battingRows,
      bowlingRows,
      hasBatting,
      hasBowling,
      performancePanelCount,
    };
  }

  return resolveScorelineMatchPerformances(match);
};
