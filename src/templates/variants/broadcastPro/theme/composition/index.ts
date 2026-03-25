import { broadcastProCompositionComponentStylesLadder } from "./ladder";
import { broadcastProCompositionComponentStylesResults } from "./results";
import { broadcastProCompositionComponentStylesRoster } from "./roster";
import { broadcastProCompositionComponentStylesTeamOfTheWeek } from "./teamOfTheWeek";
import { broadcastProCompositionComponentStylesTop5 } from "./top5";
import { broadcastProCompositionComponentStylesUpcoming } from "./upcoming";

/**
 * All cricket-composition–scoped `componentStyles` for Broadcast Pro, merged for the root theme.
 */
export const broadcastProCompositionComponentStyles = {
  ...broadcastProCompositionComponentStylesLadder,
  ...broadcastProCompositionComponentStylesUpcoming,
  ...broadcastProCompositionComponentStylesTop5,
  ...broadcastProCompositionComponentStylesTeamOfTheWeek,
  ...broadcastProCompositionComponentStylesResults,
  ...broadcastProCompositionComponentStylesRoster,
};
