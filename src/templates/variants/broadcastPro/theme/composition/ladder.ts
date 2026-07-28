import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";

export const broadcastProCompositionComponentStylesLadder = {
  ladderGradeLabel: {
    className: "text-2xl font-bold uppercase tracking-[0.2em] leading-snug",
  },
  ladderTeamName: {
    className: "text-4xl font-normal uppercase tracking-wide leading-none",
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
