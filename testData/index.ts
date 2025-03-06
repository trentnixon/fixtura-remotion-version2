// Import sample data files
// Cricket
import CricketLadder from "./samples/Cricket/Cricket_Ladder.json";
import CricketResults from "./samples/Cricket/Cricket_Results.json";
import CricketRoster from "./samples/Cricket/Cricket_Roster.json";
import CricketSingleGameResult from "./samples/Cricket/Cricket_WeekendResultsSingle.json";
import CricketTop5Batting from "./samples/Cricket/Cricket_Top5Batters.json";
import CricketTop5Bowling from "./samples/Cricket/Cricket_Top5Bowlers.json";
import CricketUpcoming from "./samples/Cricket/Cricket_upcoming.json";

// AFL
import AFLLadder from "./samples/AFL/AFL_Ladder.json";
import AFLResults from "./samples/AFL/AFL_Results.json";
import AFLSingleGameResult from "./samples/AFL/AFL_WeekendSingleGameResultAFL.json";
import AFLTop5 from "./samples/AFL/Top5AFLScorers.json";
import AFLUpcoming from "./samples/AFL/AFL_UpComingFixtures.json";

// Netball
import NetballLadder from "./samples/Netball/Netball_Ladder.json";
import NetballResults from "./samples/Netball/Netball_Results.json";
import NetballSingleGameResult from "./samples/Netball/Netball_WeekendSingleGameResultNetball.json";
import NetballUpcoming from "./samples/Netball/NetBall_UpComingFixtures.json";

// Define dataset types locally to avoid circular dependencies
export interface DatasetInfo {
  id: string;
  name: string;
}

export type DatasetCategories = Record<string, DatasetInfo[]>;
export type DatasetRecord = Record<string, any>;

// Organize datasets by sport and type
export const testDatasets: Record<string, any> = {
  // Cricket
  CricketLadder: CricketLadder,
  CricketResults: CricketResults,
  CricketRoster: CricketRoster,
  CricketSingleGameResult: CricketSingleGameResult,
  CricketTop5Batting: CricketTop5Batting,
  CricketTop5Bowling: CricketTop5Bowling,
  CricketUpcoming: CricketUpcoming,

  // AFL
  AFLLadder: AFLLadder,
  AFLResults: AFLResults,
  AFLSingleGameResult: AFLSingleGameResult,
  AFLTop5: AFLTop5,
  AFLUpcoming: AFLUpcoming,

  // Netball
  NetballLadder: NetballLadder,
  NetballResults: NetballResults,
  NetballSingleGameResult: NetballSingleGameResult,
  NetballUpcoming: NetballUpcoming,
};

// Dataset categories using the same IDs
export const datasetsByCategory: DatasetCategories = {
  Cricket: [
    { id: "CricketLadder", name: "Ladder" },
    { id: "CricketResults", name: "Results" },
    { id: "CricketRoster", name: "Roster" },
    { id: "CricketSingleGameResult", name: "Single Game Result" },
    { id: "CricketTop5Batting", name: "Top 5 Batting" },
    { id: "CricketTop5Bowling", name: "Top 5 Bowling" },
    { id: "CricketUpcoming", name: "Upcoming Fixtures" },
  ],
  AFL: [
    { id: "AFLLadder", name: "Ladder" },
    { id: "AFLResults", name: "Results" },
    { id: "AFLSingleGameResult", name: "Single Game Result" },
    { id: "AFLTop5", name: "Top 5" },
    { id: "AFLUpcoming", name: "Upcoming Fixtures" },
  ],
  Netball: [
    { id: "NetballLadder", name: "Ladder" },
    { id: "NetballResults", name: "Results" },
    { id: "NetballSingleGameResult", name: "Single Game Result" },
    { id: "NetballUpcoming", name: "Upcoming Fixtures" },
  ],
  FontTesting: [
    { id: "FontTestDefault", name: "Default Font" },
    { id: "FontTestRoboto", name: "Roboto Font" },
    { id: "FontTestHeebo", name: "Heebo Font" },
    { id: "FontTestTungsten", name: "Tungsten Font" },
    { id: "FontTestDruk", name: "Druk Font" },
    { id: "FontTestMonumentExtended", name: "Monument Extended Font" },
  ],
};
