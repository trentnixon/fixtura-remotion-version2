import React, { type CSSProperties } from "react";
import { TeamLogo } from "../../../../../compositions/cricket/utils/primitives/TeamLogo";
import type { TeamLogo as TeamLogoType } from "../../../../../compositions/cricket/utils/primitives/_types/TeamLogoProps";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import { resolveBroadcastProRoundedCrestWellSize } from "../../../../../compositions/cricket/utils/broadcastProRounded/crest/resolveBroadcastProRoundedCrestWellSize";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import {
  BROADCAST_PRO_CREST_TIER_THEME_KEY,
  type BroadcastProRoundedCrestTier,
} from "../../../../../templates/types/broadcast-pro-rounded/crest-well";

export interface BroadcastProRoundedCrestWellProps {
  tier: BroadcastProRoundedCrestTier;
  logo: TeamLogoType | string | null;
  teamName: string;
  delay: number;
  glass: BroadcastProRoundedGlassStyle;
  /** Row / fixture adaptive sizing from parent container height. */
  containerHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** Ranking wells use glass.border on the well surface. */
  showBorder?: boolean;
}

export const BroadcastProRoundedCrestWell: React.FC<
  BroadcastProRoundedCrestWellProps
> = ({
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
  const { componentStyles, broadcastProRoundedCrestSizing, layout } =
    useThemeContext();
  const imageRadius =
    layout.borderRadius.image ?? layout.borderRadius.container;
  const themeKey = BROADCAST_PRO_CREST_TIER_THEME_KEY[tier];
  const wellClass = csClass(componentStyles, themeKey);

  const { sizePx, contentInsetRatio } = resolveBroadcastProRoundedCrestWellSize(
    tier,
    containerHeight,
    broadcastProRoundedCrestSizing,
  );

  const insetPct = `${contentInsetRatio * 100}%`;

  const sizeStyle: CSSProperties =
    sizePx != null
      ? { width: sizePx, height: sizePx, minWidth: sizePx, minHeight: sizePx }
      : {};

  return (
    <div
      className={`${wellClass} overflow-hidden ${imageRadius} ${className}`.trim()}
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
