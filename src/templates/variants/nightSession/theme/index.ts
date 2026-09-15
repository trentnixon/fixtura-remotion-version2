import { baseTheme } from "../../../base/theme";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";
import { nightSessionComponentStylesShared } from "./componentStyles.shared";
import { nightSessionCompositionComponentStyles } from "./composition";
import { nightSessionLayout } from "./layout";
import { nightSessionMode } from "./mode";
import { nightSessionTokens } from "./tokens";

export const nightSessionTheme: TemplateThemeConfig = {
  ...baseTheme,
  ...nightSessionTokens,
  layout: nightSessionLayout,
  mode: nightSessionMode,
  componentStyles: {
    ...baseTheme.componentStyles,
    ...nightSessionComponentStylesShared,
    ...nightSessionCompositionComponentStyles,
  } as unknown as TemplateThemeConfig["componentStyles"],
};
