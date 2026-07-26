/**
 * Broadcast Pro matchup axis — home-vs-away layout tiers and divider variants.
 */

import type { TeamLogo } from "../../../compositions/cricket/utils/primitives/_types/TeamLogoProps";

export type BroadcastProMatchupTier = "fixture" | "result" | "roster";

export type BroadcastProMatchupDivider = "vs" | "versus" | "none";

export interface BroadcastProMatchupSideInput {
  teamName: string;
  logo: TeamLogo | string | null;
  /** e.g. Home, Away, HOME TEAM */
  roleLabel?: string;
}

export const BROADCAST_PRO_MATCHUP_TIER_DIVIDER: Record<
  BroadcastProMatchupTier,
  BroadcastProMatchupDivider
> = {
  fixture: "vs",
  result: "none",
  roster: "versus",
};

export const BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY: Record<
  BroadcastProMatchupTier,
  string
> = {
  fixture: "broadcastProMatchupFixture",
  result: "broadcastProMatchupResultStack",
  roster: "broadcastProMatchupRosterSidebar",
};
