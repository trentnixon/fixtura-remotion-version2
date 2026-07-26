import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";
import {
  broadcastProCompositionComponentStylesPlayerRanking,
} from "./playerRanking";

export const broadcastProCompositionComponentStylesTop5 = {
  ...broadcastProCompositionComponentStylesPlayerRanking,
  Top5PlayerName: {
    className: "text-5xl font-black  tracking-wide leading-snug",
  },
  Top5PlayerTeam: {
    className: "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
  },
  Top5PlayerScore:
    broadcastProCompositionComponentStylesPlayerRanking.broadcastProScoreFeatured,
  Top5PlayerScoreSuffix:
    broadcastProComponentStylesShared.broadcastProScorePlayerSuffix,
} satisfies Pick<
  ThemeComponentStyles,
  | "Top5PlayerName"
  | "Top5PlayerTeam"
  | "Top5PlayerScore"
  | "Top5PlayerScoreSuffix"
  | keyof typeof broadcastProCompositionComponentStylesPlayerRanking
>;
