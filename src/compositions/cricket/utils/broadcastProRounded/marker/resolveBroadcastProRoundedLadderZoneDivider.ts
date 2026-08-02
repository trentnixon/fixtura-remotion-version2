import {
  DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  type BroadcastProRoundedLadderZoneSizing,
} from "../../../../../templates/types/broadcast-pro-rounded/ladder-zone";

const effectiveFinalsCount = (
  totalTeams: number,
  finalsCount: number,
): number => Math.max(1, Math.min(finalsCount, totalTeams));

export interface ShouldShowBroadcastProRoundedLadderZoneDividerInput {
  position: number;
  totalTeams: number;
  sizing?: BroadcastProRoundedLadderZoneSizing;
}

/**
 * Show a zone-divider notch after the last finals-qualified row when
 * at least one team sits outside the finals zone.
 */
export const shouldShowBroadcastProRoundedLadderZoneDivider = ({
  position,
  totalTeams,
  sizing = DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
}: ShouldShowBroadcastProRoundedLadderZoneDividerInput): boolean => {
  const cutoff = effectiveFinalsCount(totalTeams, sizing.finalsCount);
  return totalTeams > cutoff && position === cutoff;
};
