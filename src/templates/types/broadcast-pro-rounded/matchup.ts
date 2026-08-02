/**
 * Broadcast Pro matchup axis — home-vs-away layout tiers and divider variants.
 */

import type { TeamLogo } from "../../../compositions/cricket/utils/primitives/_types/TeamLogoProps";

export type BroadcastProRoundedMatchupTier = "fixture" | "result" | "roster";

export type BroadcastProRoundedMatchupDivider = "vs" | "versus" | "none";

export interface BroadcastProRoundedMatchupSideInput {
  teamName: string;
  logo: TeamLogo | string | null;
  /** e.g. Home, Away, HOME TEAM */
  roleLabel?: string;
}

export const BROADCAST_PRO_MATCHUP_TIER_DIVIDER: Record<
  BroadcastProRoundedMatchupTier,
  BroadcastProRoundedMatchupDivider
> = {
  fixture: "vs",
  result: "none",
  roster: "versus",
};

export const BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY: Record<
  BroadcastProRoundedMatchupTier,
  string
> = {
  fixture: "broadcastProRoundedMatchupFixture",
  result: "broadcastProRoundedMatchupResultStack",
  roster: "broadcastProRoundedMatchupRosterSidebar",
};
