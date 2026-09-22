/**
 * Broadcast Pro hero headline fitting — Teko display caps and fitText parameters.
 * Set on {@link TemplateThemeConfig.broadcastProRoundedHeadlineSizing} in `variants/broadcastProRounded/theme/tokens.ts`.
 */

export interface BroadcastProRoundedHeadlineSizing {
  /** Main header asset title cap (px). */
  mainHeaderMaxPx: number;
  /** Intro screen asset title cap (px). */
  introMaxPx: number;
  /** Minimum font size after fitText (px). */
  minPx: number;
  /** Tight Teko display line height ratio. */
  lineHeight: number;
  /** fitText letter-spacing (tracking-tight). */
  letterSpacing: string;
  /** Teko Regular — matches loaded TTF weight. */
  fontWeight: number;
  /** Secondary line may wrap or fit (no nowrap clip). */
  secondaryWraps: boolean;
  /** Org badge in the main header (px). */
  headerOrgCrestPx: number;
}

export const DEFAULT_BROADCAST_PRO_HEADLINE_SIZING: BroadcastProRoundedHeadlineSizing =
  {
    mainHeaderMaxPx: 124,
    introMaxPx: 140,
    minPx: 48,
    lineHeight: 0.82,
    letterSpacing: "-0.025em",
    fontWeight: 400,
    secondaryWraps: true,
    headerOrgCrestPx: 72,
  };

export type BroadcastProRoundedHeadlineVariant = "mainHeader" | "intro";
