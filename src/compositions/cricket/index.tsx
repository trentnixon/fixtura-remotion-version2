// Import the basic component from the ladder module
import {
  basic as ladderBasic,
  brickwork as ladderBrickWork,
  sixers as ladderSixers,
} from "./ladder";
import {
  basic as upcomingBasic,
  brickWork as upcomingBrickWork,
  sixers as upcomingSixers,
} from "./upcoming";
import {
  basic as top5Basic,
  brickWork as top5BrickWork,
  sixers as top5Sixers,
} from "./top5";
import {
  basic as resultsBasic,
  brickWork as resultsBrickWork,
  sixers as resultsSixers,
} from "./results";
// Import directly from BasicTemplate for resultSingle
import {
  basic as resultSingleBasic,
  sixers as resultSingleSixers,
} from "./resultSingle";

import {
  basic as rosterBasic,
  sixers as rosterSixers,
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
  sixers: ladderSixers,
};

export const CricketTop5 = {
  basic: top5Basic,
  brickwork: top5BrickWork,
  sixers: top5Sixers,
};

export const CricketResults = {
  basic: resultsBasic,
  brickwork: resultsBrickWork,
  sixers: resultsSixers,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
  brickwork: upcomingBrickWork,
  sixers: upcomingSixers,
};

export const CricketResultSingle = {
  basic: resultSingleBasic,
  brickwork: resultSingleBasic,
  sixers: resultSingleSixers,
};

// Add CricketRoster export to match compositionId in test data
export const CricketRoster = {
  basic: rosterBasic,
  brickwork: rosterBasic,
  sixers: rosterSixers,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
  brickwork: PlaceholderComposition,
  sixers: PlaceholderComposition,
};
