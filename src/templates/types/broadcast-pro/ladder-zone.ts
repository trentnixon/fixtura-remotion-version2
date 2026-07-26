/**
 * Broadcast Pro ladder rank zones — finals, tail de-emphasis, leader accent.
 */

export type BroadcastProLadderZone =
  | "leader"
  | "finals"
  | "mid"
  | "lower"
  | "relegation";

export interface BroadcastProLadderZoneSizing {
  /** Top N ranks in the finals / qualification zone (stitch default 4). */
  finalsCount: number;
  /** Number of tail rows de-emphasised by index (stitch: penultimate + last). */
  lowerTailRows: number;
  /** Row opacity for penultimate row. */
  lowerOpacity: number;
  /** Row opacity for last row. */
  relegationOpacity: number;
}

export const DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING: BroadcastProLadderZoneSizing =
  {
    finalsCount: 4,
    lowerTailRows: 2,
    lowerOpacity: 0.8,
    relegationOpacity: 0.6,
  };

export interface BroadcastProLadderZoneResult {
  zone: BroadcastProLadderZone;
  rowOpacity: number;
  /** Primary rank border — leader tier. Bias team handled at row level. */
  rankAccent: boolean;
  /** Primary points column — leader tier only (stitch). */
  pointsAccent: boolean;
}

export const BROADCAST_PRO_LADDER_ZONE_RANK_THEME_KEY: Record<
  "leader" | "default",
  string
> = {
  leader: "broadcastProLadderZoneRankLeader",
  default: "broadcastProLadderZoneRankDefault",
};
