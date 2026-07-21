import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

export const broadcastProCompositionComponentStylesTop5 = {
  Top5PlayerName: {
    className: "text-5xl font-black  tracking-wide leading-snug",
  },
  Top5PlayerTeam: {
    className: "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
  },
  Top5PlayerScore: {
    className: "text-7xl font-black  tracking-normal leading-tight mr-4",
  },
  Top5PlayerScoreSuffix: {
    className: "text-2xl font-black  tracking-wide leading-none",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "Top5PlayerName"
  | "Top5PlayerTeam"
  | "Top5PlayerScore"
  | "Top5PlayerScoreSuffix"
>;
