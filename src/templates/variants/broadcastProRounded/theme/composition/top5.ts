import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";
import { broadcastProRoundedCompositionComponentStylesPlayerRanking } from "./playerRanking";

export const broadcastProRoundedCompositionComponentStylesTop5 = {
  ...broadcastProRoundedCompositionComponentStylesPlayerRanking,
  Top5PlayerName: {
    className: "text-5xl font-black  tracking-wide leading-snug",
  },
  Top5PlayerTeam: {
    className: "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
  },
  Top5PlayerScore:
    broadcastProRoundedCompositionComponentStylesPlayerRanking.broadcastProRoundedScoreFeatured,
  Top5PlayerScoreSuffix:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScorePlayerSuffix,
} satisfies Pick<
  ThemeComponentStyles,
  | "Top5PlayerName"
  | "Top5PlayerTeam"
  | "Top5PlayerScore"
  | "Top5PlayerScoreSuffix"
  | keyof typeof broadcastProRoundedCompositionComponentStylesPlayerRanking
>;
