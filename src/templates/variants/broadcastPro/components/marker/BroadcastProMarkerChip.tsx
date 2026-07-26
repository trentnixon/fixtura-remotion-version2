import React from "react";
import tinycolor from "tinycolor2";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import {
  BROADCAST_PRO_MARKER_CHIP_THEME_KEY,
  type BroadcastProMarkerChipTier,
} from "../../../../../templates/types/broadcast-pro/marker-notch";

export interface BroadcastProMarkerChipProps {
  label: string;
  tier?: BroadcastProMarkerChipTier;
  accentColor: string;
  className?: string;
}

/** Teko uppercase label chip — qualification footer, rank callouts. */
export const BroadcastProMarkerChip: React.FC<BroadcastProMarkerChipProps> = ({
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
