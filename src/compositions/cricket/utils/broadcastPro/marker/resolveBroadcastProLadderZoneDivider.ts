import {
  DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  type BroadcastProLadderZoneSizing,
} from "../../../../../templates/types/broadcast-pro/ladder-zone";

const effectiveFinalsCount = (
  totalTeams: number,
  finalsCount: number,
): number => Math.max(1, Math.min(finalsCount, totalTeams));

export interface ShouldShowBroadcastProLadderZoneDividerInput {
  position: number;
  totalTeams: number;
  sizing?: BroadcastProLadderZoneSizing;
}

/**
 * Show a zone-divider notch after the last finals-qualified row when
 * at least one team sits outside the finals zone.
 */
export const shouldShowBroadcastProLadderZoneDivider = ({
  position,
  totalTeams,
  sizing = DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
}: ShouldShowBroadcastProLadderZoneDividerInput): boolean => {
  const cutoff = effectiveFinalsCount(totalTeams, sizing.finalsCount);
  return totalTeams > cutoff && position === cutoff;
};
