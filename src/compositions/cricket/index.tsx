// Import the basic component from the ladder module
import {
  basic as ladderBasic,
  brickwork as ladderBrickWork,
  sixersThunder as ladderSixersThunder,
  classic as ladderClassic,
  classicTwoColumn as ladderClassicTwoColumn,
  cnsw as ladderCNSW,
  cnswprivate as ladderCNSWPrivate,
} from "./ladder";
import {
  basic as upcomingBasic,
  brickWork as upcomingBrickWork,
  SixersThunder as upcomingSixersThunder,
  classic as upcomingClassic,
  classicTwoColumn as upcomingClassicTwoColumn,
  cnsw as upcomingCNSW,
  cnswprivate as upcomingCNSWPrivate,
} from "./upcoming";
import {
  basic as top5Basic,
  brickWork as top5BrickWork,
  SixersThunder as top5SixersThunder,
  classic as top5Classic,
  twocolumnclassic as top5ClassicTwoColumn,
  cnsw as top5CNSW,
  cnswprivate as top5CNSWPrivate,
} from "./top5";
import {
  basic as resultsBasic,
  brickWork as resultsBrickWork,
  SixersThunder as resultsSixersThunder,
  classic as resultsClassic,
  classicTwoColumn as resultsClassicTwoColumn,
  cnsw as resultsCNSW,
  cnswPrivate as resultsCNSWPrivate,
} from "./results";
// Import directly from BasicTemplate for resultSingle
import {
  basic as resultSingleBasic,
  classic as resultSingleClassic,
  sixers as resultSingleSixers,
  classicTwoColumns as resultSingleClassicTwoColumns,
  cnsw as resultSingleCNSW,
  cnswPrivate as resultSingleCNSWPrivate,
} from "./resultSingle";

import {
  basic as rosterBasic,
  SixersThunder as rosterSixersThunder,
  Classic as rosterClassic,
  ClassicTwoColumn as rosterClassicTwoColumn,
} from "./teamRoster";

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
  classic: ladderClassic,
  twocolumnclassic: ladderClassicTwoColumn, // alias to classic
  cnsw: ladderCNSW,
  cnswprivate: ladderCNSWPrivate,
};

export const CricketTop5 = {
  basic: top5Basic,
  brickwork: top5BrickWork,
  sixers: top5SixersThunder,
  thunder: top5SixersThunder,
  classic: top5Classic,
  twocolumnclassic: top5ClassicTwoColumn, // alias to classic
  cnsw: top5CNSW,
  cnswprivate: top5CNSWPrivate,
};

export const CricketResults = {
  basic: resultsBasic,
  brickwork: resultsBrickWork,
  sixers: resultsSixersThunder,
  thunder: resultsSixersThunder,
  classic: resultsClassic,
  twocolumnclassic: resultsClassicTwoColumn, // alias to classic
  cnsw: resultsCNSW,
  cnswprivate: resultsCNSWPrivate,
};

export const CricketUpcoming = {
  basic: upcomingBasic,
  brickwork: upcomingBrickWork,
  sixers: upcomingSixersThunder,
  thunder: upcomingSixersThunder,
  classic: upcomingClassic,
  twocolumnclassic: upcomingClassicTwoColumn, // alias to classic
  cnsw: upcomingCNSW,
  cnswprivate: upcomingCNSWPrivate,
};

export const CricketResultSingle = {
  basic: resultSingleBasic,
  brickwork: resultSingleBasic,
  sixers: resultSingleSixers,
  thunder: resultSingleSixers,
  classic: resultSingleClassic,
  twocolumnclassic: resultSingleClassicTwoColumns, // alias to classic
  cnsw: resultSingleCNSW,
  cnswprivate: resultSingleCNSWPrivate,
};

// Add CricketRoster export to match compositionId in test data
export const CricketRoster = {
  basic: rosterBasic,
  brickwork: rosterBasic,
  sixers: rosterSixersThunder,
  thunder: rosterSixersThunder,
  classic: rosterClassic,
  twocolumnclassic: rosterClassicTwoColumn, // alias to classic
  cnsw: rosterClassic,
};

export const singleGameResult = {
  basic: PlaceholderComposition,
  brickwork: PlaceholderComposition,
  sixers: PlaceholderComposition,
  classic: PlaceholderComposition,
  twocolumnclassic: PlaceholderComposition, // alias to classic placeholder
  cnsw: PlaceholderComposition,
};
