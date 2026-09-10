import { baseTheme } from "../../../base/theme";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";
import { scorelineComponentStylesShared } from "./componentStyles.shared";
import { scorelineCompositionComponentStyles } from "./composition";
import { scorelineLayout } from "./layout";
import { scorelineMode } from "./mode";
import { scorelineTokens } from "./tokens";

export const scorelineTheme: TemplateThemeConfig = {
  ...baseTheme,
  ...scorelineTokens,
  layout: scorelineLayout,
  mode: scorelineMode,
  componentStyles: {
    ...baseTheme.componentStyles,
    ...scorelineComponentStylesShared,
    ...scorelineCompositionComponentStyles,
  } as unknown as TemplateThemeConfig["componentStyles"],
};
