import React from "react";
import tinycolor from "tinycolor2";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { BROADCAST_PRO_ZONE_NOTCH_THEME_KEY } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";

export interface BroadcastProRoundedZoneDividerNotchProps {
  accentColor: string;
  className?: string;
}

/**
 * Horizontal zone boundary with a centred primary notch — ladder finals cutoff.
 */
export const BroadcastProRoundedZoneDividerNotch: React.FC<
  BroadcastProRoundedZoneDividerNotchProps
> = ({ accentColor, className = "" }) => {
  const { componentStyles } = useThemeContext();
  const notchClass = csClass(
    componentStyles,
    BROADCAST_PRO_ZONE_NOTCH_THEME_KEY.finalsCutoff,
  );
  const ruleColor = tinycolor(accentColor).setAlpha(0.12).toRgbString();

  return (
    <div className={`${notchClass} ${className}`.trim()} aria-hidden>
      <div className="h-px flex-1" style={{ backgroundColor: ruleColor }} />
      <div
        className="mx-2 h-1 w-6 shrink-0"
        style={{ backgroundColor: accentColor }}
      />
      <div className="h-px flex-1" style={{ backgroundColor: ruleColor }} />
    </div>
  );
};
