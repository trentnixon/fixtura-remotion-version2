import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";

export const broadcastProRoundedCompositionComponentStylesUpcoming = {
  upcomingFixtureHeader: {
    className: "text-2xl font-bold uppercase tracking-wider leading-tight",
  },
  upcomingTeamName: {
    className: "font-normal uppercase !leading-[0.92] tracking-wide",
  },
  upcomingVs: broadcastProRoundedComponentStylesShared.broadcastProRoundedMatchupDividerVs,
} satisfies Pick<
  ThemeComponentStyles,
  "upcomingFixtureHeader" | "upcomingTeamName" | "upcomingVs"
>;
