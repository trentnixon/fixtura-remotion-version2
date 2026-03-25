import { baseTheme } from "../../../base/theme";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "./componentStyles.shared";
import { broadcastProCompositionComponentStyles } from "./composition";
import { broadcastProLayout } from "./layout";
import { broadcastProMode } from "./mode";
import { broadcastProTokens } from "./tokens";

/**
 * Broadcast Pro template theme — Teko for main titles (fonts.title → ThemeProvider headingFontFamily);
 * Rajdhani for subtitle line and body (fonts.subtitle / fonts.copy).
 *
 * Split under `./theme/`: tokens, shared styles, `composition/` per cricket composition, layout, mode.
 */
export const broadcastProTheme = {
  ...baseTheme,

  ...broadcastProTokens,

  layout: broadcastProLayout,
  mode: broadcastProMode,

  componentStyles: {
    ...broadcastProComponentStylesShared,
    ...broadcastProCompositionComponentStyles,
  },
} satisfies TemplateThemeConfig;
