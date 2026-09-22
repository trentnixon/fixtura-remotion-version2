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
  DEFAULT_BROADCAST_PRO_CREST_SIZING,
  type BroadcastProRoundedCrestTier,
} from "../../../../../templates/types/broadcast-pro-rounded/crest-well";

export interface BroadcastProRoundedCrestWellProps {
  tier: BroadcastProRoundedCrestTier;
  logo: TeamLogoType | string | null;
  teamName: string;
  delay: number;
  glass: BroadcastProRoundedGlassStyle;
  /** Row / fixture / ranking adaptive sizing from parent container height. */
  containerHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** Ranking wells use glass.border on the well surface. */
  showBorder?: boolean;
}

const TALL_COVER_TIERS: ReadonlySet<BroadcastProRoundedCrestTier> = new Set([
  "fixture",
  "grid",
  "featured",
]);

const resolveTallCoverWidthPx = (
  tier: BroadcastProRoundedCrestTier,
  sizePx: number | null,
  sizing: typeof DEFAULT_BROADCAST_PRO_CREST_SIZING,
): number | null => {
  if (sizePx != null) return sizePx;
  if (tier === "grid") return sizing.gridPx;
  if (tier === "featured") return Math.min(sizing.featuredPx, 136);
  return null;
};

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
  const sizing =
    broadcastProRoundedCrestSizing ?? DEFAULT_BROADCAST_PRO_CREST_SIZING;

  const { sizePx, contentInsetRatio } = resolveBroadcastProRoundedCrestWellSize(
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
        fit={isTallCover ? "cover" : "contain"}
        imgStyle={{
          width: insetPct,
          height: insetPct,
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: isTallCover ? "cover" : "contain",
        }}
      />
    </div>
  );
};
