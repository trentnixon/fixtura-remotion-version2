import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

export const broadcastProCompositionComponentStylesTeamOfTheWeek = {
  TeamOfTheWeekPlayerName: {
    className: "text-3xl font-bold tracking-tighter leading-none",
  },
  TeamOfTheWeekTeam: {
    className: "text-xs font-normal tracking-wider leading-tight",
  },
  TeamOfTheWeekType: {
    className: "text-md font-bold uppercase tracking-wider leading-none",
  },
  TeamOfTheWeekStat: {
    className: "text-4xl font-bold tracking-tight leading-none",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "TeamOfTheWeekPlayerName"
  | "TeamOfTheWeekTeam"
  | "TeamOfTheWeekType"
  | "TeamOfTheWeekStat"
>;
