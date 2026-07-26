import {
  DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  type BroadcastProLadderZone,
  type BroadcastProLadderZoneResult,
  type BroadcastProLadderZoneSizing,
} from "../../../../../templates/types/broadcast-pro/ladder-zone";

export interface ResolveBroadcastProLadderZoneInput {
  position: number;
  index: number;
  totalTeams: number;
  sizing?: BroadcastProLadderZoneSizing;
}

const effectiveFinalsCount = (
  totalTeams: number,
  finalsCount: number,
): number => Math.max(1, Math.min(finalsCount, totalTeams));

/**
 * Rank-based finals zone + index-based tail de-emphasis (stitch ladder.html).
 * Tail opacity applies only outside the finals zone (small tables stay fully opaque).
 */
export const resolveBroadcastProLadderZone = ({
  position,
  index,
  totalTeams,
  sizing = DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
}: ResolveBroadcastProLadderZoneInput): BroadcastProLadderZoneResult => {
  const finalsCutoff = effectiveFinalsCount(totalTeams, sizing.finalsCount);

  if (position === 1) {
    return {
      zone: "leader",
      rowOpacity: 1,
      rankAccent: true,
      pointsAccent: true,
    };
  }

  if (position <= finalsCutoff) {
    return {
      zone: "finals",
      rowOpacity: 1,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  if (totalTeams >= 3 && index === totalTeams - 2) {
    return {
      zone: "lower",
      rowOpacity: sizing.lowerOpacity,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  if (totalTeams >= 2 && index === totalTeams - 1) {
    return {
      zone: "relegation",
      rowOpacity: sizing.relegationOpacity,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  const zone: BroadcastProLadderZone = "mid";
  return {
    zone,
    rowOpacity: 1,
    rankAccent: false,
    pointsAccent: false,
  };
};
