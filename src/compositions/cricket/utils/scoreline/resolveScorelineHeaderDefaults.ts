const SCORELINE_HEADER_DEFAULTS: Record<
  string,
  { eyebrow: string; title: string }
> = {
  CricketUpcoming: { eyebrow: "Upcoming", title: "Upcoming Fixtures" },
  CricketResults: { eyebrow: "Results", title: "Weekend Results" },
  CricketResultSingle: { eyebrow: "Result", title: "Match Result" },
  CricketLadder: { eyebrow: "Ladder", title: "Ladder" },
  CricketTop5Batting: { eyebrow: "Top 5", title: "Top 5 Batting" },
  CricketTop5Bowling: { eyebrow: "Top 5", title: "Top 5 Bowling" },
  CricketRoster: { eyebrow: "Team", title: "Team Roster" },
  CricketTeamOfTheWeek: {
    eyebrow: "Team of the Week",
    title: "Team of the Week",
  },
};

export const resolveScorelineHeaderDefaults = (
  compositionId: string | undefined,
): { eyebrow: string; title: string } => {
  if (compositionId && SCORELINE_HEADER_DEFAULTS[compositionId]) {
    return SCORELINE_HEADER_DEFAULTS[compositionId];
  }

  return SCORELINE_HEADER_DEFAULTS.CricketResults;
};
