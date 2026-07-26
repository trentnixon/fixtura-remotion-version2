/**
 * Template theme configuration — root entry.
 *
 * - **Global** types: `./global/` (shared across all template variants).
 * - **Broadcast Pro** pack: `./broadcast-pro/` (variant-specific component keys + glass helpers).
 *
 * Import from this file for backward compatibility, or from `./global` / `./broadcast-pro` directly.
 */

import type { BroadcastProThemeComponentStyles } from "./broadcast-pro/component-styles";
import type { BroadcastProHeadlineSizing } from "./broadcast-pro/headline-lockup";
import type { BroadcastProRosterListSizing } from "./broadcast-pro/roster-list-sizing";
import type { BroadcastProCrestSizing } from "./broadcast-pro/crest-well";
import type { BroadcastProLadderZoneSizing } from "./broadcast-pro/ladder-zone";
import type { BroadcastProScoreSizing } from "./broadcast-pro/score-typography";
import type {
  BroadcastProGlassOpacityPreset,
  BroadcastProTransparentLayers,
} from "./broadcast-pro/transparent-layers";
import type { GlobalThemeComponentStyles } from "./global/theme-component-styles";
import type {
  ThemeAnimation,
  ThemeColors,
  ThemeFontClasses,
  ThemeFonts,
  ThemeLayout,
  ThemeMedia,
  ThemeModes,
  ThemeSelectedPalette,
  ThemeTypography,
} from "./global/theme-shared";

/** Merged component style map: shared keys + optional Broadcast Pro keys. */
export type ThemeComponentStyles = GlobalThemeComponentStyles &
  BroadcastProThemeComponentStyles;

/**
 * Root interface representing the entire theme configuration.
 */
export interface TemplateThemeConfig {
  fonts?: ThemeFonts;
  fontConfig?: string;
  defaultCopyFontFamily?: string;
  headingFontFamily?: string;
  subheadingFontFamily?: string;
  fontClasses?: ThemeFontClasses;
  componentStyles?: ThemeComponentStyles;
  layout?: ThemeLayout;
  typography?: ThemeTypography;
  colors?: ThemeColors;
  selectedPalette?: ThemeSelectedPalette;
  sports?: Record<string, unknown>;
  gradientDegree?: string;
  animation?: ThemeAnimation;
  media?: ThemeMedia;
  mode?: ThemeModes;
  /**
   * Broadcast Pro only: alpha-only layers over `mode.container.background` (surface is white or black from mode).
   * Three groups — glass row, logo wells, fixture header strip — tuned independently; no RGB here.
   * If set, overrides {@link broadcastProGlassOpacity}.
   */
  broadcastProTransparentLayers?: BroadcastProTransparentLayers;
  /**
   * Broadcast Pro: preset glass opacity (sm = subtle stitch-like, md/lg = stronger panel fill for copy contrast).
   * Ignored when `broadcastProTransparentLayers` is set. Defaults to `md` in {@link resolveBroadcastProTransparentLayers}.
   */
  broadcastProGlassOpacity?: BroadcastProGlassOpacityPreset;
  /**
   * Broadcast Pro team roster: scales player name + index number font sizes from row height.
   * See `variants/broadcastPro/theme/tokens.ts` — consumed by `computeBroadcastProRosterPlayerListMetrics`.
   */
  broadcastProRosterListSizing?: BroadcastProRosterListSizing;
  /**
   * Broadcast Pro hero headline: fitText caps and Teko display parameters.
   * See `variants/broadcastPro/theme/tokens.ts`.
   */
  broadcastProHeadlineSizing?: BroadcastProHeadlineSizing;
  /**
   * Broadcast Pro score typography: compact-tier class overrides for ladder/upcoming.
   * See `variants/broadcastPro/theme/tokens.ts`.
   */
  broadcastProScoreSizing?: BroadcastProScoreSizing;
  /**
   * Broadcast Pro crest well: tier sizes and content inset ratios.
   * See `variants/broadcastPro/theme/tokens.ts`.
   */
  broadcastProCrestSizing?: BroadcastProCrestSizing;
  /**
   * Broadcast Pro ladder: finals zone size and tail row opacity.
   * See `variants/broadcastPro/theme/tokens.ts`.
   */
  broadcastProLadderZoneSizing?: BroadcastProLadderZoneSizing;
}

export * from "./broadcast-pro";
export * from "./global";
