// Import the basic component from the ladder module
import { basic as ladderBasic } from "./ladder";
import { basic as upcomingBasic } from "./upcoming";
/* export * as ladder from './ladder';
export * as top5 from './top5';
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

export const top5 = {
  basic: PlaceholderComposition,
};

export const results = {
  basic: PlaceholderComposition,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
};

export const roster = {
  basic: PlaceholderComposition,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
};
