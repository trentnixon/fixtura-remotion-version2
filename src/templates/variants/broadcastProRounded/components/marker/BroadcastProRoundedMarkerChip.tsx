import React from "react";
import tinycolor from "tinycolor2";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import {
  BROADCAST_PRO_MARKER_CHIP_THEME_KEY,
  type BroadcastProRoundedMarkerChipTier,
} from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";

export interface BroadcastProRoundedMarkerChipProps {
  label: string;
  tier?: BroadcastProRoundedMarkerChipTier;
  accentColor: string;
  className?: string;
}

/** Teko uppercase label chip — qualification footer, rank callouts. */
export const BroadcastProRoundedMarkerChip: React.FC<BroadcastProRoundedMarkerChipProps> = ({
  label,
  tier = "qualification",
  accentColor,
  className = "",
}) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const chipClass = csClass(
    componentStyles,
    BROADCAST_PRO_MARKER_CHIP_THEME_KEY[tier],
  );
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  return (
    <div
      className={`${chipClass} ${headingFont} ${className}`.trim()}
      style={{
        backgroundColor: tinycolor(accentColor).setAlpha(0.2).toRgbString(),
        color: accentColor,
      }}
    >
      {label}
    </div>
  );
};
