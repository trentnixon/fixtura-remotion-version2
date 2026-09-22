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
  DEFAULT_BROADCAST_PRO_CREST_SIZING,
  type BroadcastProCrestTier,
} from "../../../../../templates/types/broadcast-pro/crest-well";

export interface BroadcastProCrestWellProps {
  tier: BroadcastProCrestTier;
  logo: TeamLogoType | string | null;
  teamName: string;
  delay: number;
  glass: BroadcastProGlassStyle;
  /** Row / fixture / ranking adaptive sizing from parent container height. */
  containerHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** Ranking wells use glass.border on the well surface. */
  showBorder?: boolean;
  animate?: boolean;
}

const TALL_COVER_TIERS: ReadonlySet<BroadcastProCrestTier> = new Set([
  "fixture",
  "grid",
  "featured",
]);

const resolveTallCoverWidthPx = (
  tier: BroadcastProCrestTier,
  sizePx: number | null,
  sizing: typeof DEFAULT_BROADCAST_PRO_CREST_SIZING,
): number | null => {
  if (sizePx != null) return sizePx;
  if (tier === "grid") return sizing.gridPx;
  if (tier === "featured") return Math.min(sizing.featuredPx, 136);
  return null;
};

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
  animate = true,
}) => {
  const { componentStyles, broadcastProCrestSizing } = useThemeContext();
  const themeKey = BROADCAST_PRO_CREST_TIER_THEME_KEY[tier];
  const wellClass = csClass(componentStyles, themeKey);
  const sizing = broadcastProCrestSizing ?? DEFAULT_BROADCAST_PRO_CREST_SIZING;

  const { sizePx, contentInsetRatio } = resolveBroadcastProCrestWellSize(
    tier,
    containerHeight,
    sizing,
  );

  const tallWidthPx = resolveTallCoverWidthPx(tier, sizePx, sizing);
  const isTallCover =
    TALL_COVER_TIERS.has(tier) &&
    containerHeight != null &&
    tallWidthPx != null;

  const insetPct = `${contentInsetRatio * 100}%`;

  const sizeStyle: CSSProperties = isTallCover
    ? {
        width: tallWidthPx,
        minWidth: tallWidthPx,
        height: containerHeight,
        minHeight: containerHeight,
        alignSelf: "stretch",
      }
    : sizePx != null
      ? {
          width: sizePx,
          height: sizePx,
          minWidth: sizePx,
          minHeight: sizePx,
        }
      : tier === "grid"
        ? {
            width: sizing.gridPx,
            height: sizing.gridPx,
            minWidth: sizing.gridPx,
            minHeight: sizing.gridPx,
          }
        : tier === "featured"
          ? {
              width: sizing.featuredPx,
              height: sizing.featuredPx,
              minWidth: sizing.featuredPx,
              minHeight: sizing.featuredPx,
            }
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
        fit={isTallCover ? "cover" : "contain"}
        imgStyle={{
          width: insetPct,
          height: insetPct,
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: isTallCover ? "cover" : "contain",
        }}
        animate={animate}
      />
    </div>
  );
};
