import { baseTheme } from "../../../base/theme";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "./componentStyles.shared";
import { broadcastProRoundedCompositionComponentStyles } from "./composition";
import { broadcastProRoundedLayout } from "./layout";
import { broadcastProRoundedMode } from "./mode";
import { broadcastProRoundedTokens } from "./tokens";

/**
 * Broadcast Pro template theme — Teko for main titles (fonts.title → ThemeProvider headingFontFamily);
 * Rajdhani for subtitle line and body (fonts.subtitle / fonts.copy).
 *
 * Split under `./theme/`: tokens, shared styles, `composition/` per cricket composition, layout, mode.
 */
export const broadcastProRoundedTheme = {
  ...baseTheme,

  ...broadcastProRoundedTokens,

  layout: broadcastProRoundedLayout,
  mode: broadcastProRoundedMode,

  componentStyles: {
    ...broadcastProRoundedComponentStylesShared,
    ...broadcastProRoundedCompositionComponentStyles,
  },
} satisfies TemplateThemeConfig;
