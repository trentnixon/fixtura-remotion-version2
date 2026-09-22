import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";

export const broadcastProCompositionComponentStylesLadder = {
  ladderGradeLabel: {
    className: "text-2xl font-bold uppercase tracking-wide leading-snug",
  },
  ladderTeamName: {
    className:
      "font-rajdhani text-4xl font-normal uppercase tracking-wide leading-none",
  },
  ladderTeamPoints:
    broadcastProComponentStylesShared.broadcastProScoreTablePoints,
  broadcastProLadderZoneRankLeader:
    broadcastProComponentStylesShared.broadcastProLadderZoneRankLeader,
  broadcastProLadderZoneRankDefault:
    broadcastProComponentStylesShared.broadcastProLadderZoneRankDefault,
} satisfies Pick<
  ThemeComponentStyles,
  | "ladderGradeLabel"
  | "ladderTeamName"
  | "ladderTeamPoints"
  | "broadcastProLadderZoneRankLeader"
  | "broadcastProLadderZoneRankDefault"
>;
