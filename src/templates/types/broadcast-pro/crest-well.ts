/**
 * Broadcast Pro crest well tiers — square logo isolation wells (glass.logoWell).
 */

export type BroadcastProCrestTier =
  | "compact"
  | "row"
  | "fixture"
  | "grid"
  | "featured"
  | "rosterHome"
  | "rosterAway";

export interface BroadcastProCrestSizing {
  /** Default inset for compact / row / fixture / roster tiers (stitch ≈ 85%). */
  contentInsetRatio: number;
  /** Grid + featured use full well with flex centre. */
  fullBleedInsetRatio: number;
  compactPx: number;
  fixtureDefaultPx: number;
  rowDefaultPx: number;
  gridPx: number;
  featuredPx: number;
  rosterHomePx: number;
  rosterAwayPx: number;
}

export const DEFAULT_BROADCAST_PRO_CREST_SIZING: BroadcastProCrestSizing = {
  contentInsetRatio: 0.85,
  fullBleedInsetRatio: 1,
  compactPx: 48,
  fixtureDefaultPx: 80,
  rowDefaultPx: 48,
  gridPx: 80,
  featuredPx: 176,
  rosterHomePx: 128,
  rosterAwayPx: 96,
};

export const BROADCAST_PRO_CREST_TIER_THEME_KEY: Record<
  BroadcastProCrestTier,
  string
> = {
  compact: "broadcastProCrestWellCompact",
  row: "broadcastProCrestWellRow",
  fixture: "broadcastProCrestWellFixture",
  grid: "broadcastProCrestWellGrid",
  featured: "broadcastProCrestWellFeatured",
  rosterHome: "broadcastProCrestWellRosterHome",
  rosterAway: "broadcastProCrestWellRosterAway",
};
