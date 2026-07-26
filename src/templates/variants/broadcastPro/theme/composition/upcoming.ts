import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";

export const broadcastProCompositionComponentStylesUpcoming = {
  upcomingFixtureHeader: {
    className: "text-2xl font-bold uppercase tracking-wider leading-tight",
  },
  upcomingTeamName:
    broadcastProComponentStylesShared.broadcastProMatchupFixtureTeamName,
  upcomingVs: broadcastProComponentStylesShared.broadcastProMatchupDividerVs,
} satisfies Pick<
  ThemeComponentStyles,
  "upcomingFixtureHeader" | "upcomingTeamName" | "upcomingVs"
>;
