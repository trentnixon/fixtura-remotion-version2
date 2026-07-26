import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import {
  DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
} from "../../../../../templates/types/broadcast-pro/ladder-zone";
import { formatBroadcastProQualificationLabel } from "../../../../../templates/types/broadcast-pro/marker-notch";
import { BroadcastProMarkerChip } from "./BroadcastProMarkerChip";

export interface BroadcastProLadderQualificationFooterProps {
  finalsCount?: number;
  className?: string;
}

/** Stitch-style qualification chip below the ladder body. */
export const BroadcastProLadderQualificationFooter: React.FC<
  BroadcastProLadderQualificationFooterProps
> = ({ finalsCount, className = "" }) => {
  const { componentStyles, broadcastProLadderZoneSizing } = useThemeContext();
  const { accent } = useBroadcastProTheme();
  const footerClass = csClass(
    componentStyles,
    "broadcastProMarkerQualificationFooter",
  );
  const n =
    finalsCount ??
    broadcastProLadderZoneSizing?.finalsCount ??
    DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING.finalsCount;

  return (
    <div className={`${footerClass} ${className}`.trim()}>
      <BroadcastProMarkerChip
        label={formatBroadcastProQualificationLabel(n)}
        tier="qualification"
        accentColor={accent}
      />
    </div>
  );
};
