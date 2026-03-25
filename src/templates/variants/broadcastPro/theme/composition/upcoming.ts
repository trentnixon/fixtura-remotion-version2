import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

export const broadcastProCompositionComponentStylesUpcoming = {
  upcomingFixtureHeader: {
    className:
      "text-2xl font-bold uppercase tracking-wider leading-tight",
  },
  upcomingTeamName: {
    className:
      "text-5xl font-normal uppercase tracking-wide leading-none",
  },
  upcomingVs: {
    className: "text-4xl font-bold italic tracking-tight leading-none",
  },
} satisfies Pick<
  ThemeComponentStyles,
  "upcomingFixtureHeader" | "upcomingTeamName" | "upcomingVs"
>;
