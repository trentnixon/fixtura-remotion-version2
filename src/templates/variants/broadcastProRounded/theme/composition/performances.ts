import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedCompositionComponentStylesPlayerRanking } from "./playerRanking";

export const broadcastProRoundedCompositionComponentStylesPerformances = {
  ...broadcastProRoundedCompositionComponentStylesPlayerRanking,
} satisfies Pick<
  ThemeComponentStyles,
  keyof typeof broadcastProRoundedCompositionComponentStylesPlayerRanking
>;
