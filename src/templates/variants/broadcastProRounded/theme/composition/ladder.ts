import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";

export const broadcastProRoundedCompositionComponentStylesLadder = {
  ladderGradeLabel: {
    className: "text-2xl font-bold uppercase tracking-[0.2em] leading-snug",
  },
  ladderTeamName: {
    className: "text-4xl font-normal uppercase tracking-wide leading-none",
  },
  ladderTeamPoints:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreTablePoints,
  broadcastProRoundedLadderZoneRankLeader:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedLadderZoneRankLeader,
  broadcastProRoundedLadderZoneRankDefault:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedLadderZoneRankDefault,
} satisfies Pick<
  ThemeComponentStyles,
  | "ladderGradeLabel"
  | "ladderTeamName"
  | "ladderTeamPoints"
  | "broadcastProRoundedLadderZoneRankLeader"
  | "broadcastProRoundedLadderZoneRankDefault"
>;
