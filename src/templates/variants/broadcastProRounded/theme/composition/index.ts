import { broadcastProRoundedCompositionComponentStylesLadder } from "./ladder";
import { broadcastProRoundedCompositionComponentStylesResults } from "./results";
import { broadcastProRoundedCompositionComponentStylesRoster } from "./roster";
import { broadcastProRoundedCompositionComponentStylesTeamOfTheWeek } from "./teamOfTheWeek";
import { broadcastProRoundedCompositionComponentStylesTop5 } from "./top5";
import { broadcastProRoundedCompositionComponentStylesPerformances } from "./performances";
import { broadcastProRoundedCompositionComponentStylesUpcoming } from "./upcoming";
import { broadcastProRoundedCompositionComponentStylesStatMatrix } from "./statMatrix";
import { broadcastProRoundedCompositionComponentStylesMarker } from "./marker";

/**
 * All cricket-composition–scoped `componentStyles` for Broadcast Pro, merged for the root theme.
 */
export const broadcastProRoundedCompositionComponentStyles = {
  ...broadcastProRoundedCompositionComponentStylesLadder,
  ...broadcastProRoundedCompositionComponentStylesUpcoming,
  ...broadcastProRoundedCompositionComponentStylesTop5,
  ...broadcastProRoundedCompositionComponentStylesPerformances,
  ...broadcastProRoundedCompositionComponentStylesTeamOfTheWeek,
  ...broadcastProRoundedCompositionComponentStylesResults,
  ...broadcastProRoundedCompositionComponentStylesRoster,
  ...broadcastProRoundedCompositionComponentStylesStatMatrix,
  ...broadcastProRoundedCompositionComponentStylesMarker,
};
