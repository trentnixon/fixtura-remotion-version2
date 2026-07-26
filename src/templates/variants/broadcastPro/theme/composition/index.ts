import { broadcastProCompositionComponentStylesLadder } from "./ladder";
import { broadcastProCompositionComponentStylesResults } from "./results";
import { broadcastProCompositionComponentStylesRoster } from "./roster";
import { broadcastProCompositionComponentStylesTeamOfTheWeek } from "./teamOfTheWeek";
import { broadcastProCompositionComponentStylesTop5 } from "./top5";
import { broadcastProCompositionComponentStylesPerformances } from "./performances";
import { broadcastProCompositionComponentStylesUpcoming } from "./upcoming";
import { broadcastProCompositionComponentStylesStatMatrix } from "./statMatrix";
import { broadcastProCompositionComponentStylesMarker } from "./marker";

/**
 * All cricket-composition–scoped `componentStyles` for Broadcast Pro, merged for the root theme.
 */
export const broadcastProCompositionComponentStyles = {
  ...broadcastProCompositionComponentStylesLadder,
  ...broadcastProCompositionComponentStylesUpcoming,
  ...broadcastProCompositionComponentStylesTop5,
  ...broadcastProCompositionComponentStylesPerformances,
  ...broadcastProCompositionComponentStylesTeamOfTheWeek,
  ...broadcastProCompositionComponentStylesResults,
  ...broadcastProCompositionComponentStylesRoster,
  ...broadcastProCompositionComponentStylesStatMatrix,
  ...broadcastProCompositionComponentStylesMarker,
};
