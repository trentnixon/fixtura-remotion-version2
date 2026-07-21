import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

export const broadcastProCompositionComponentStylesLadder = {
  ladderGradeLabel: {
    className: "text-2xl font-bold uppercase tracking-[0.2em] leading-snug",
  },
  ladderTeamName: {
    className: "text-4xl font-normal uppercase tracking-wide leading-none",
  },
  ladderTeamPoints: {
    className: "text-4xl font-bold tracking-tight leading-none text-center",
  },
} satisfies Pick<
  ThemeComponentStyles,
  "ladderGradeLabel" | "ladderTeamName" | "ladderTeamPoints"
>;
