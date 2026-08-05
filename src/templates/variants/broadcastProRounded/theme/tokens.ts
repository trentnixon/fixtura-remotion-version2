import { DEFAULT_BROADCAST_PRO_CREST_SIZING } from "../../../types/broadcast-pro-rounded/crest-well";
import { DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING } from "../../../types/broadcast-pro-rounded/ladder-zone";
import { DEFAULT_BROADCAST_PRO_HEADLINE_SIZING } from "../../../types/broadcast-pro-rounded/headline-lockup";
import { DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING } from "../../../types/broadcast-pro-rounded/roster-list-sizing";
import { DEFAULT_BROADCAST_PRO_SCORE_SIZING } from "../../../types/broadcast-pro-rounded/score-typography";
import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

/**
 * Fonts, fontClasses, and Broadcast Pro–only tuning keys (glass + roster + headline sizing).
 */
export const broadcastProRoundedTokens = {
  broadcastProRoundedGlassOpacity: "lg" as const,

  broadcastProRoundedHeadlineSizing: {
    ...DEFAULT_BROADCAST_PRO_HEADLINE_SIZING,
  },

  broadcastProRoundedScoreSizing: {
    ...DEFAULT_BROADCAST_PRO_SCORE_SIZING,
  },

  broadcastProRoundedCrestSizing: {
    ...DEFAULT_BROADCAST_PRO_CREST_SIZING,
  },

  broadcastProRoundedLadderZoneSizing: {
    ...DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  },

  broadcastProRoundedRosterListSizing: {
    ...DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING,
    /** Home team card lives in sidebar (13); list uses full column height. */
    leftColumnHeaderReservePx: 0,
    /** Larger index + name type on glass rows (still capped by row height + player count). */
    minNameFontPx: 15,
    maxNameFontPx: 48,
    minNumberFontPx: 14,
    maxNumberFontPx: 44,
    nameRowHeightMultiplier: 0.52,
    numberRowHeightMultiplier: 0.48,
    nameFontBonusPx: 2,
    listChromeReservePx: 24,
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
  | "broadcastProRoundedGlassOpacity"
  | "broadcastProRoundedHeadlineSizing"
  | "broadcastProRoundedScoreSizing"
  | "broadcastProRoundedCrestSizing"
  | "broadcastProRoundedLadderZoneSizing"
  | "broadcastProRoundedRosterListSizing"
>;
