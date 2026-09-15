import { nightSessionCompositionComponentStylesResults } from "./results";
import { nightSessionCompositionComponentStylesResultSingle } from "./resultSingle";
import { nightSessionCompositionComponentStylesUpcoming } from "./upcoming";
import { nightSessionCompositionComponentStylesLadder } from "./ladder";
import { nightSessionCompositionComponentStylesTop5 } from "./top5";
import { nightSessionCompositionComponentStylesRoster } from "./roster";
import { nightSessionCompositionComponentStylesTeamOfTheWeek } from "./teamOfTheWeek";
import { nightSessionCompositionComponentStylesPerformances } from "./performances";

export const nightSessionCompositionComponentStyles = {
  ...nightSessionCompositionComponentStylesResults,
  ...nightSessionCompositionComponentStylesResultSingle,
  ...nightSessionCompositionComponentStylesUpcoming,
  ...nightSessionCompositionComponentStylesLadder,
  ...nightSessionCompositionComponentStylesTop5,
  ...nightSessionCompositionComponentStylesRoster,
  ...nightSessionCompositionComponentStylesTeamOfTheWeek,
  ...nightSessionCompositionComponentStylesPerformances,
};
