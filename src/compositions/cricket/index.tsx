// Import the basic component from the ladder module
import { basic as ladderBasic } from "./ladder";
import { basic as upcomingBasic } from "./upcoming";
import { basic as top5Basic } from "./top5";
import { basic as resultsBasic } from "./results";
// Import directly from BasicTemplate for resultSingle
import { Basic as resultSingleBasic } from "./resultSingle/BasicTemplate";
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
};

export const CricketTop5 = {
  basic: top5Basic,
};

export const CricketResults = {
  basic: resultsBasic,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
};

export const CricketResultSingle = {
  basic: resultSingleBasic,
};

export const roster = {
  basic: PlaceholderComposition,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
};
