// Import the basic component from the ladder module
import {
  basic as ladderBasic,
  brickwork as ladderBrickWork,
  sixersThunder as ladderSixersThunder,
} from "./ladder";
import {
  basic as upcomingBasic,
  brickWork as upcomingBrickWork,
  SixersThunder as upcomingSixersThunder,
} from "./upcoming";
import {
  basic as top5Basic,
  brickWork as top5BrickWork,
  SixersThunder as top5SixersThunder,
} from "./top5";
import {
  basic as resultsBasic,
  brickWork as resultsBrickWork,
  SixersThunder as resultsSixersThunder,
} from "./results";
// Import directly from BasicTemplate for resultSingle
import {
  basic as resultSingleBasic,
  sixers as resultSingleSixers,
} from "./resultSingle";

import {
  basic as rosterBasic,
  SixersThunder as rosterSixersThunder,
} from "./teamRoster/index";

/* export * as ladder from './ladder';

export * as results from './results';
export * as upcoming from './upcoming';
export * as roster from './roster';
export * as singleGameResult from './single-game-result'; */

// Import placeholder implementations for other composition types
import { PlaceholderComposition } from "./placeholders";

// Export implementations for all composition types
// Each composition type should include all template variations
export const CricketLadder = {
  basic: ladderBasic,
  brickwork: ladderBrickWork,
  sixers: ladderSixersThunder,
  thunder: ladderSixersThunder,
};

export const CricketTop5 = {
  basic: top5Basic,
  brickwork: top5BrickWork,
  sixers: top5SixersThunder,
  thunder: top5SixersThunder,
};

export const CricketResults = {
  basic: resultsBasic,
  brickwork: resultsBrickWork,
  sixers: resultsSixersThunder,
  thunder: resultsSixersThunder,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
  brickwork: upcomingBrickWork,
  sixers: upcomingSixersThunder,
  thunder: upcomingSixersThunder,
};

export const CricketResultSingle = {
  basic: resultSingleBasic,
  brickwork: resultSingleBasic,
  sixers: resultSingleSixers,
  thunder: resultSingleSixers,
};

// Add CricketRoster export to match compositionId in test data
export const CricketRoster = {
  basic: rosterBasic,
  brickwork: rosterBasic,
  sixers: rosterSixersThunder,
  thunder: rosterSixersThunder,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
  brickwork: PlaceholderComposition,
  sixers: PlaceholderComposition,
};
