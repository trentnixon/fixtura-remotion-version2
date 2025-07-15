// Import the basic component from the ladder module
import { basic as ladderBasic, brickwork as ladderBrickWork } from "./ladder";
import {
  basic as upcomingBasic,
  brickWork as upcomingBrickWork,
} from "./upcoming";
import { basic as top5Basic, brickWork as top5BrickWork } from "./top5";
import {
  basic as resultsBasic,
  brickWork as resultsBrickWork,
} from "./results";
// Import directly from BasicTemplate for resultSingle
import { Basic as resultSingleBasic } from "./resultSingle/BasicTemplate";
import { basic as rosterBasic } from "./teamRoster/index";

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
};

export const CricketTop5 = {
  basic: top5Basic,
  brickwork: top5BrickWork,
};

export const CricketResults = {
  basic: resultsBasic,
  brickwork: resultsBrickWork,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
  brickwork: upcomingBrickWork,
};

export const CricketResultSingle = {
  basic: resultSingleBasic,
  brickwork: resultSingleBasic,
};

// Add CricketRoster export to match compositionId in test data
export const CricketRoster = {
  basic: rosterBasic,
  brickwork: rosterBasic,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
  brickwork: PlaceholderComposition,
};
