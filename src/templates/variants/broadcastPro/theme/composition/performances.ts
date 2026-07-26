import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProCompositionComponentStylesPlayerRanking } from "./playerRanking";

export const broadcastProCompositionComponentStylesPerformances = {
  ...broadcastProCompositionComponentStylesPlayerRanking,
} satisfies Pick<
  ThemeComponentStyles,
  keyof typeof broadcastProCompositionComponentStylesPlayerRanking
>;
