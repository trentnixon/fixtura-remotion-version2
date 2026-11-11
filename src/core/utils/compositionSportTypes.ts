/** Metadata composition IDs → `src/compositions/{sport}` export map keys. */
export const SPORT_COMPOSITION_MODULE_KEYS: Record<
  string,
  Record<string, string>
> = {
  cricket: {
    CricketLadder: "CricketLadder",
    CricketUpcoming: "CricketUpcoming",
    CricketTop5Batting: "CricketTop5",
    CricketTop5Bowling: "CricketTop5",
    CricketBattingPerformances: "CricketPerformances",
    CricketBowlingPerformances: "CricketPerformances",
    CricketResultSingle: "CricketResultSingle",
    CricketRoster: "CricketRoster",
    CricketResults: "CricketResults",
    CricketResultsLite: "CricketResultsLite",
    CricketTeamOfTheWeek: "CricketTeamOfTheWeek",
  },
  afl: {
    AFLLadder: "ladder",
    AFLTop5: "top5",
    AFLResults: "results",
    AFLUpcoming: "upcoming",
    AFLSingleGameResult: "singleGameResult",
  },
  netball: {
    NetballLadder: "ladder",
    NetballTop5: "top5",
    NetballResults: "results",
    NetballUpcoming: "upcoming",
    NetballSingleGameResult: "singleGameResult",
  },
};
