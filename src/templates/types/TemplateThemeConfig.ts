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
import type { BroadcastProRoundedThemeComponentStyles } from "./broadcast-pro-rounded/component-styles";
import type { BroadcastProRoundedHeadlineSizing } from "./broadcast-pro-rounded/headline-lockup";
import type { BroadcastProRoundedRosterListSizing } from "./broadcast-pro-rounded/roster-list-sizing";
import type { BroadcastProRoundedCrestSizing } from "./broadcast-pro-rounded/crest-well";
import type { BroadcastProRoundedLadderZoneSizing } from "./broadcast-pro-rounded/ladder-zone";
import type { BroadcastProRoundedScoreSizing } from "./broadcast-pro-rounded/score-typography";
import type {
  BroadcastProRoundedGlassOpacityPreset,
  BroadcastProRoundedTransparentLayers,
} from "./broadcast-pro-rounded/transparent-layers";
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

/** Merged component style map: shared keys + optional Broadcast Pro / Broadcast Pro Rounded keys. */
export type ThemeComponentStyles = GlobalThemeComponentStyles &
  BroadcastProThemeComponentStyles &
  BroadcastProRoundedThemeComponentStyles;

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
  /**
   * Broadcast Pro Rounded only: alpha-only glass layers (see `variants/broadcastProRounded/theme/tokens.ts`).
   * If set, overrides {@link broadcastProRoundedGlassOpacity}.
   */
  broadcastProRoundedTransparentLayers?: BroadcastProRoundedTransparentLayers;
  /**
   * Broadcast Pro Rounded: preset glass opacity (sm / md / lg).
   * Ignored when `broadcastProRoundedTransparentLayers` is set.
   */
  broadcastProRoundedGlassOpacity?: BroadcastProRoundedGlassOpacityPreset;
  /** Broadcast Pro Rounded team roster list sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedRosterListSizing?: BroadcastProRoundedRosterListSizing;
  /** Broadcast Pro Rounded hero headline fitText caps (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedHeadlineSizing?: BroadcastProRoundedHeadlineSizing;
  /** Broadcast Pro Rounded score typography compact tiers (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedScoreSizing?: BroadcastProRoundedScoreSizing;
  /** Broadcast Pro Rounded crest well tier sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedCrestSizing?: BroadcastProRoundedCrestSizing;
  /** Broadcast Pro Rounded ladder zone sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedLadderZoneSizing?: BroadcastProRoundedLadderZoneSizing;
}

export * from "./broadcast-pro";
export * from "./global";
