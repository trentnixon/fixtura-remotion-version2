type TeamPerformance = {
  team: string;
};

type TeamWithPerformances<
  TBatting extends TeamPerformance,
  TBowling extends TeamPerformance,
> = {
  name: string;
  battingPerformances?: TBatting[];
  bowlingPerformances?: TBowling[];
};

type MatchWithPerformances<
  TBatting extends TeamPerformance,
  TBowling extends TeamPerformance,
  TTeam extends TeamWithPerformances<TBatting, TBowling>,
> = {
  homeTeam: TTeam;
  awayTeam: TTeam;
};

export type PerformerOwnedPerformances<
  TBatting extends TeamPerformance,
  TBowling extends TeamPerformance,
> = {
  home: {
    battingPerformances: TBatting[];
    bowlingPerformances: TBowling[];
  };
  away: {
    battingPerformances: TBatting[];
    bowlingPerformances: TBowling[];
  };
};

const filterByTeam = <TPerformance extends TeamPerformance>(
  performances: readonly TPerformance[],
  teamName: string,
): TPerformance[] =>
  performances.filter((performance) => performance.team === teamName);

/**
 * Converts innings-grouped result arrays into performer-owned arrays.
 *
 * Weekend-result payloads store the bowlers for an innings on the team that
 * batted. The performance's `team` field identifies the actual performing
 * team, so both parent arrays must be searched before rendering team stats.
 */
export const resolvePerformerOwnedPerformances = <
  TBatting extends TeamPerformance,
  TBowling extends TeamPerformance,
  TTeam extends TeamWithPerformances<TBatting, TBowling>,
>(
  match: MatchWithPerformances<TBatting, TBowling, TTeam>,
): PerformerOwnedPerformances<TBatting, TBowling> => {
  const teams: readonly TTeam[] = [match.homeTeam, match.awayTeam];
  const allBattingPerformances: TBatting[] = [];
  const allBowlingPerformances: TBowling[] = [];

  for (const team of teams) {
    allBattingPerformances.push(...(team.battingPerformances ?? []));
    allBowlingPerformances.push(...(team.bowlingPerformances ?? []));
  }

  return {
    home: {
      battingPerformances: filterByTeam(
        allBattingPerformances,
        match.homeTeam.name,
      ),
      bowlingPerformances: filterByTeam(
        allBowlingPerformances,
        match.homeTeam.name,
      ),
    },
    away: {
      battingPerformances: filterByTeam(
        allBattingPerformances,
        match.awayTeam.name,
      ),
      bowlingPerformances: filterByTeam(
        allBowlingPerformances,
        match.awayTeam.name,
      ),
    },
  };
};
