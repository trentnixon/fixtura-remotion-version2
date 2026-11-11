// Import the basic component from the ladder module
import {
  basic as ladderBasic,
  brickwork as ladderBrickWork,
  sixersThunder as ladderSixersThunder,
  classic as ladderClassic,
  classicTwoColumn as ladderClassicTwoColumn,
  cnsw as ladderCNSW,
  cnswprivate as ladderCNSWPrivate,
  mudgeeraba as ladderMudgeeraba,
  broadcastpro as ladderBroadcastPro,
  broadcastprorounded as ladderBroadcastProRounded,
  scoreline as ladderScoreline,
  nightsession as ladderNightSession,
} from "./ladder";
import {
  basic as upcomingBasic,
  brickWork as upcomingBrickWork,
  SixersThunder as upcomingSixersThunder,
  classic as upcomingClassic,
  classicTwoColumn as upcomingClassicTwoColumn,
  cnsw as upcomingCNSW,
  cnswprivate as upcomingCNSWPrivate,
  mudgeeraba as upcomingMudgeeraba,
  broadcastpro as upcomingBroadcastPro,
  broadcastprorounded as upcomingBroadcastProRounded,
  scoreline as upcomingScoreline,
  nightsession as upcomingNightSession,
} from "./upcoming";
import {
  basic as top5Basic,
  brickWork as top5BrickWork,
  SixersThunder as top5SixersThunder,
  classic as top5Classic,
  twocolumnclassic as top5ClassicTwoColumn,
  cnsw as top5CNSW,
  cnswprivate as top5CNSWPrivate,
  mudgeeraba as top5Mudgeeraba,
  broadcastpro as top5BroadcastPro,
  broadcastprorounded as top5BroadcastProRounded,
  scoreline as top5Scoreline,
  nightsession as top5NightSession,
} from "./top5";
import {
  basic as resultsBasic,
  brickWork as resultsBrickWork,
  SixersThunder as resultsSixersThunder,
  classic as resultsClassic,
  classicTwoColumn as resultsClassicTwoColumn,
  cnsw as resultsCNSW,
  cnswPrivate as resultsCNSWPrivate,
  mudgeeraba as resultsMudgeeraba,
  broadcastpro as resultsBroadcastPro,
  broadcastprorounded as resultsBroadcastProRounded,
  scoreline as resultsScoreline,
  nightsession as resultsNightSession,
} from "./results";
// Import directly from BasicTemplate for resultSingle
import {
  basic as resultSingleBasic,
  classic as resultSingleClassic,
  sixers as resultSingleSixers,
  classicTwoColumns as resultSingleClassicTwoColumns,
  cnsw as resultSingleCNSW,
  cnswPrivate as resultSingleCNSWPrivate,
  brickWork as resultSingleBrickWork,
  mudgeeraba as resultSingleMudgeeraba,
  broadcastpro as resultSingleBroadcastPro,
  broadcastprorounded as resultSingleBroadcastProRounded,
  scoreline as resultSingleScoreline,
  nightsession as resultSingleNightSession,
} from "./resultSingle";

import {
  basic as rosterBasic,
  SixersThunder as rosterSixersThunder,
  Classic as rosterClassic,
  ClassicTwoColumn as rosterClassicTwoColumn,
  mudgeeraba as rosterMudgeeraba,
  brickwork as rosterBrickwork,
  broadcastpro as rosterBroadcastPro,
  broadcastprorounded as rosterBroadcastProRounded,
  scoreline as rosterScoreline,
  nightSession as rosterNightSession,
} from "./teamRoster";
import {
  basic as performancesBasic,
  brickWork as performancesBrickWork,
  classic as performancesClassic,
  classicTwoColumn as performancesClassicTwoColumn,
  cnsw as performancesCNSW,
  cnswPrivate as performancesCNSWPrivate,
  sixersThunder as performancesSixersThunder,
  mudgeeraba as performancesMudgeeraba,
  broadcastpro as performancesBroadcastPro,
  broadcastprorounded as performancesBroadcastProRounded,
  scoreline as performancesScoreline,
  nightsession as performancesNightSession,
} from "./performances";
import {
  basic as teamOfTheWeekBasic,
  classic as teamOfTheWeekClassic,
  brickwork as teamOfTheWeekBrickWork,
  cnsw as teamOfTheWeekCNSW,
  cnswPrivate as teamOfTheWeekCNSWPrivate,
  sixersThunder as teamOfTheWeekSixersThunder,
  classicTwoColumn as teamOfTheWeekClassicTwoColumn,
  mudgeeraba as teamOfTheWeekMudgeeraba,
  broadcastpro as teamOfTheWeekBroadcastPro,
  broadcastprorounded as teamOfTheWeekBroadcastProRounded,
  scoreline as teamOfTheWeekScoreline,
  nightSession as teamOfTheWeekNightSession,
} from "./TeamOfTheWeek";
import {
  basic as resultsLiteBasic,
  brickwork as resultsLiteBrickWork,
  classic as resultsLiteClassic,
  twocolumnclassic as resultsLiteClassicTwoColumn,
  cnsw as resultsLiteCNSW,
  cnswprivate as resultsLiteCNSWPrivate,
  sixersThunder as resultsLiteSixersThunder,
  mudgeeraba as resultsLiteMudgeeraba,
  broadcastpro as resultsLiteBroadcastPro,
  broadcastprorounded as resultsLiteBroadcastProRounded,
  scoreline as resultsLiteScoreline,
  nightSession as resultsLiteNightSession,
} from "./resultsLite";

/* export * as ladder from './ladder';

export * as results from './results';
export * as upcoming from './upcoming';
export * as roster from './roster';
export * as singleGameResult from './single-game-result'; */

// Import placeholder implementations for other composition types
import { PlaceholderComposition } from "./placeholders";
import { buildCompositionVariantMap } from "../../core/utils/buildCompositionVariantMap";

// Export implementations for all composition types
// Each composition type should include all template variations
export const CricketLadder = buildCompositionVariantMap({
  basic: ladderBasic,
  brickwork: ladderBrickWork,
  sixers: ladderSixersThunder,
  thunder: ladderSixersThunder,
  classic: ladderClassic,
  twocolumnclassic: ladderClassicTwoColumn,
  cnsw: ladderCNSW,
  cnswprivate: ladderCNSWPrivate,
  mudgeeraba: ladderMudgeeraba,
  broadcastpro: ladderBroadcastPro,
  broadcastprorounded: ladderBroadcastProRounded,
  scoreline: ladderScoreline,
  nightsession: ladderNightSession,
});

export const CricketTop5 = buildCompositionVariantMap({
  basic: top5Basic,
  brickwork: top5BrickWork,
  sixers: top5SixersThunder,
  thunder: top5SixersThunder,
  classic: top5Classic,
  twocolumnclassic: top5ClassicTwoColumn,
  cnsw: top5CNSW,
  cnswprivate: top5CNSWPrivate,
  mudgeeraba: top5Mudgeeraba,
  broadcastpro: top5BroadcastPro,
  broadcastprorounded: top5BroadcastProRounded,
  scoreline: top5Scoreline,
  nightsession: top5NightSession,
});

export const CricketResults = buildCompositionVariantMap({
  basic: resultsBasic,
  brickwork: resultsBrickWork,
  sixers: resultsSixersThunder,
  thunder: resultsSixersThunder,
  classic: resultsClassic,
  twocolumnclassic: resultsClassicTwoColumn,
  cnsw: resultsCNSW,
  cnswprivate: resultsCNSWPrivate,
  mudgeeraba: resultsMudgeeraba,
  broadcastpro: resultsBroadcastPro,
  broadcastprorounded: resultsBroadcastProRounded,
  scoreline: resultsScoreline,
  nightsession: resultsNightSession,
});

export const CricketUpcoming = buildCompositionVariantMap({
  basic: upcomingBasic,
  brickwork: upcomingBrickWork,
  sixers: upcomingSixersThunder,
  thunder: upcomingSixersThunder,
  classic: upcomingClassic,
  twocolumnclassic: upcomingClassicTwoColumn,
  cnsw: upcomingCNSW,
  cnswprivate: upcomingCNSWPrivate,
  mudgeeraba: upcomingMudgeeraba,
  broadcastpro: upcomingBroadcastPro,
  broadcastprorounded: upcomingBroadcastProRounded,
  scoreline: upcomingScoreline,
  nightsession: upcomingNightSession,
});

export const CricketResultSingle = buildCompositionVariantMap({
  basic: resultSingleBasic,
  brickwork: resultSingleBrickWork,
  sixers: resultSingleSixers,
  thunder: resultSingleSixers,
  classic: resultSingleClassic,
  twocolumnclassic: resultSingleClassicTwoColumns,
  cnsw: resultSingleCNSW,
  cnswprivate: resultSingleCNSWPrivate,
  mudgeeraba: resultSingleMudgeeraba,
  broadcastpro: resultSingleBroadcastPro,
  broadcastprorounded: resultSingleBroadcastProRounded,
  scoreline: resultSingleScoreline,
  nightsession: resultSingleNightSession,
});

// Add CricketRoster export to match compositionId in test data
export const CricketRoster = buildCompositionVariantMap(
  {
    basic: rosterBasic,
    brickwork: rosterBrickwork,
    sixers: rosterSixersThunder,
    thunder: rosterSixersThunder,
    classic: rosterClassic,
    twocolumnclassic: rosterClassicTwoColumn,
    mudgeeraba: rosterMudgeeraba,
    broadcastpro: rosterBroadcastPro,
    broadcastprorounded: rosterBroadcastProRounded,
    scoreline: rosterScoreline,
    nightsession: rosterNightSession,
  },
  { cnsw: rosterClassic },
);

// Add CricketPerformances export for batting and bowling performances
export const CricketPerformances = buildCompositionVariantMap({
  basic: performancesBasic,
  brickwork: performancesBrickWork,
  sixers: performancesSixersThunder,
  thunder: performancesSixersThunder,
  classic: performancesClassic,
  twocolumnclassic: performancesClassicTwoColumn,
  cnsw: performancesCNSW,
  cnswprivate: performancesCNSWPrivate,
  mudgeeraba: performancesMudgeeraba,
  broadcastpro: performancesBroadcastPro,
  broadcastprorounded: performancesBroadcastProRounded,
  scoreline: performancesScoreline,
  nightsession: performancesNightSession,
});

// Add CricketTeamOfTheWeek export for Team of the Week
export const CricketTeamOfTheWeek = buildCompositionVariantMap({
  basic: teamOfTheWeekBasic,
  classic: teamOfTheWeekClassic,
  brickwork: teamOfTheWeekBrickWork,
  cnsw: teamOfTheWeekCNSW,
  cnswprivate: teamOfTheWeekCNSWPrivate,
  sixers: teamOfTheWeekSixersThunder,
  thunder: teamOfTheWeekSixersThunder,
  twocolumnclassic: teamOfTheWeekClassicTwoColumn,
  mudgeeraba: teamOfTheWeekMudgeeraba,
  broadcastpro: teamOfTheWeekBroadcastPro,
  broadcastprorounded: teamOfTheWeekBroadcastProRounded,
  scoreline: teamOfTheWeekScoreline,
  nightsession: teamOfTheWeekNightSession,
});

export const CricketResultsLite = buildCompositionVariantMap({
  basic: resultsLiteBasic,
  brickwork: resultsLiteBrickWork,
  classic: resultsLiteClassic,
  twocolumnclassic: resultsLiteClassicTwoColumn,
  cnsw: resultsLiteCNSW,
  cnswprivate: resultsLiteCNSWPrivate,
  sixers: resultsLiteSixersThunder,
  thunder: resultsLiteSixersThunder,
  mudgeeraba: resultsLiteMudgeeraba,
  broadcastpro: resultsLiteBroadcastPro,
  broadcastprorounded: resultsLiteBroadcastProRounded,
  scoreline: resultsLiteScoreline,
  nightsession: resultsLiteNightSession,
});

export const singleGameResult = {
  basic: PlaceholderComposition,
  brickwork: PlaceholderComposition,
  sixers: PlaceholderComposition,
  classic: PlaceholderComposition,
  twocolumnclassic: PlaceholderComposition, // alias to classic placeholder
  cnsw: PlaceholderComposition,
};
