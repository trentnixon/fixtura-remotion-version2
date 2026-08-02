import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING } from "../../../../../templates/types/broadcast-pro-rounded/ladder-zone";
import { formatBroadcastProRoundedQualificationLabel } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";
import { BroadcastProRoundedMarkerChip } from "./BroadcastProRoundedMarkerChip";

export interface BroadcastProRoundedLadderQualificationFooterProps {
  finalsCount?: number;
  className?: string;
}

/** Stitch-style qualification chip below the ladder body. */
export const BroadcastProRoundedLadderQualificationFooter: React.FC<
  BroadcastProRoundedLadderQualificationFooterProps
> = ({ finalsCount, className = "" }) => {
  const { componentStyles, broadcastProRoundedLadderZoneSizing } =
    useThemeContext();
  const { accent } = useBroadcastProRoundedTheme();
  const footerClass = csClass(
    componentStyles,
    "broadcastProRoundedMarkerQualificationFooter",
  );
  const n =
    finalsCount ??
    broadcastProRoundedLadderZoneSizing?.finalsCount ??
    DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING.finalsCount;

  return (
    <div className={`${footerClass} ${className}`.trim()}>
      <BroadcastProRoundedMarkerChip
        label={formatBroadcastProRoundedQualificationLabel(n)}
        tier="qualification"
        accentColor={accent}
      />
    </div>
  );
};
