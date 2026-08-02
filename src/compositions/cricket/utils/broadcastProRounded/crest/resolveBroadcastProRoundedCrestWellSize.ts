import {
  DEFAULT_BROADCAST_PRO_CREST_SIZING,
  type BroadcastProRoundedCrestSizing,
  type BroadcastProRoundedCrestTier,
} from "../../../../../templates/types/broadcast-pro-rounded/crest-well";

export interface BroadcastProRoundedCrestWellSize {
  /** When null, rely on theme Tailwind size classes (grid / featured). */
  sizePx: number | null;
  contentInsetRatio: number;
}

const clamp = (min: number, value: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const insetForTier = (
  tier: BroadcastProRoundedCrestTier,
  sizing: BroadcastProRoundedCrestSizing,
): number =>
  tier === "grid" || tier === "featured"
    ? sizing.fullBleedInsetRatio
    : sizing.contentInsetRatio;

/**
 * Ladder row well — square crest fills the full row height (tier="row" is ladder-only).
 * Min scales down for short rows (large leagues).
 */
export const resolveBroadcastProRoundedRowCrestSize = (
  containerHeight: number,
): number => {
  const minPx = containerHeight < 40 ? 24 : containerHeight < 52 ? 28 : 36;
  return clamp(minPx, containerHeight, containerHeight);
};

/**
 * Upcoming fixture well — clamp(48, containerHeight - 32, max(72, floor(h * 0.42))).
 */
export const resolveBroadcastProRoundedFixtureCrestSize = (
  containerHeight: number,
): number =>
  Math.min(
    Math.max(containerHeight - 32, 48),
    Math.max(72, Math.floor(containerHeight * 0.42)),
  );

export const resolveBroadcastProRoundedCrestWellSize = (
  tier: BroadcastProRoundedCrestTier,
  containerHeight?: number,
  sizing: BroadcastProRoundedCrestSizing = DEFAULT_BROADCAST_PRO_CREST_SIZING,
): BroadcastProRoundedCrestWellSize => {
  const contentInsetRatio = insetForTier(tier, sizing);

  switch (tier) {
    case "compact":
      return { sizePx: sizing.compactPx, contentInsetRatio };
    case "row":
      return {
        sizePx:
          containerHeight != null
            ? resolveBroadcastProRoundedRowCrestSize(containerHeight)
            : sizing.rowDefaultPx,
        contentInsetRatio,
      };
    case "fixture":
      return {
        sizePx:
          containerHeight != null
            ? resolveBroadcastProRoundedFixtureCrestSize(containerHeight)
            : sizing.fixtureDefaultPx,
        contentInsetRatio,
      };
    case "grid":
      return { sizePx: null, contentInsetRatio };
    case "featured":
      return { sizePx: null, contentInsetRatio };
    case "rosterHome":
      return { sizePx: sizing.rosterHomePx, contentInsetRatio };
    case "rosterAway":
      return { sizePx: sizing.rosterAwayPx, contentInsetRatio };
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
};
