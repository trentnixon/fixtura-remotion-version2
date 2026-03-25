import { DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING } from "../../../types/broadcast-pro/roster-list-sizing";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

/**
 * Fonts, fontClasses, and Broadcast Pro–only tuning keys (glass + roster list sizing).
 */
export const broadcastProTokens = {
  broadcastProGlassOpacity: "md" as const,

  broadcastProRosterListSizing: {
    ...DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING,
    /** Larger index + name type on glass rows (still capped by row height + player count). */
    minNameFontPx: 15,
    maxNameFontPx: 48,
    minNumberFontPx: 14,
    maxNumberFontPx: 44,
    nameRowHeightMultiplier: 0.52,
    numberRowHeightMultiplier: 0.48,
    nameFontBonusPx: 4,
  },

  fonts: {
    title: {
      family: "Teko",
    },
    subtitle: {
      family: "Rajdhani",
    },
    copy: {
      family: "Rajdhani",
    },
  },

  /**
   * Aligns with stitch HTML (`teamRoster.html`): Teko for display/titles; Rajdhani for body/labels.
   * Family strings must match `fontPathMap` / `loadFontsFromTheme` (see `src/core/utils/fonts/fontLoader.ts`).
   */
  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Rajdhani" },
    body: { family: "Rajdhani" },
  },
} satisfies Pick<
  TemplateThemeConfig,
  | "fonts"
  | "fontClasses"
  | "broadcastProGlassOpacity"
  | "broadcastProRosterListSizing"
>;
