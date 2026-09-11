import { scorelineCompositionComponentStylesResults } from "./results";
import { scorelineCompositionComponentStylesResultSingle } from "./resultSingle";
import { scorelineCompositionComponentStylesUpcoming } from "./upcoming";
import { scorelineCompositionComponentStylesLadder } from "./ladder";
import { scorelineCompositionComponentStylesTop5 } from "./top5";
import { scorelineCompositionComponentStylesRoster } from "./roster";
import { scorelineCompositionComponentStylesTeamOfTheWeek } from "./teamOfTheWeek";
import { scorelineCompositionComponentStylesPerformances } from "./performances";

export const scorelineCompositionComponentStyles = {
  ...scorelineCompositionComponentStylesResults,
  ...scorelineCompositionComponentStylesResultSingle,
  ...scorelineCompositionComponentStylesUpcoming,
  ...scorelineCompositionComponentStylesLadder,
  ...scorelineCompositionComponentStylesTop5,
  ...scorelineCompositionComponentStylesRoster,
  ...scorelineCompositionComponentStylesTeamOfTheWeek,
  ...scorelineCompositionComponentStylesPerformances,
};
