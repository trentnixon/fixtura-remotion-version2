import React, { type CSSProperties } from "react";
import { TeamLogo } from "../../../../../compositions/cricket/utils/primitives/TeamLogo";
import type { TeamLogo as TeamLogoType } from "../../../../../compositions/cricket/utils/primitives/_types/TeamLogoProps";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { resolveBroadcastProCrestWellSize } from "../../../../../compositions/cricket/utils/broadcastPro/crest/resolveBroadcastProCrestWellSize";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import {
  BROADCAST_PRO_CREST_TIER_THEME_KEY,
  type BroadcastProCrestTier,
} from "../../../../../templates/types/broadcast-pro/crest-well";

export interface BroadcastProCrestWellProps {
  tier: BroadcastProCrestTier;
  logo: TeamLogoType | string | null;
  teamName: string;
  delay: number;
  glass: BroadcastProGlassStyle;
  /** Row / fixture adaptive sizing from parent container height. */
  containerHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** Ranking wells use glass.border on the well surface. */
  showBorder?: boolean;
}

export const BroadcastProCrestWell: React.FC<BroadcastProCrestWellProps> = ({
  tier,
  logo,
  teamName,
  delay,
  glass,
  containerHeight,
  className = "",
  style,
  showBorder = false,
}) => {
  const { componentStyles, broadcastProCrestSizing } = useThemeContext();
  const themeKey = BROADCAST_PRO_CREST_TIER_THEME_KEY[tier];
  const wellClass = csClass(componentStyles, themeKey);

  const { sizePx, contentInsetRatio } = resolveBroadcastProCrestWellSize(
    tier,
    containerHeight,
    broadcastProCrestSizing,
  );

  const insetPct = `${contentInsetRatio * 100}%`;

  const sizeStyle: CSSProperties =
    sizePx != null
      ? { width: sizePx, height: sizePx, minWidth: sizePx, minHeight: sizePx }
      : {};

  return (
    <div
      className={`${wellClass} ${className}`.trim()}
      style={{
        background: glass.logoWell,
        ...(showBorder && glass.border ? { border: glass.border } : {}),
        ...cellBlur,
        ...sizeStyle,
        ...style,
      }}
    >
      <TeamLogo
        logo={logo}
        teamName={teamName}
        delay={delay}
        fit="contain"
        imgStyle={{
          width: insetPct,
          height: insetPct,
          objectFit: "contain",
        }}
      />
    </div>
  );
};
