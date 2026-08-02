import React from "react";
import type { DesignPalette } from "../../../../../core/utils/designPalettes/types";
import type { BroadcastProRoundedGlassStyle } from "../glass";
import {
  resolveBroadcastProRoundedCopyOnBackground,
  type BroadcastProRoundedTextOnContainer,
} from "../themeColors";
import type { BroadcastProRoundedPlayerRankBadgePlacement } from "./types";

export interface BroadcastProRoundedPlayerRankBadgeProps {
  rank: number;
  placement: BroadcastProRoundedPlayerRankBadgePlacement;
  isFeatured: boolean;
  className: string;
  glass: BroadcastProRoundedGlassStyle;
  text: BroadcastProRoundedTextOnContainer;
  accent: string;
  headingFont: string;
  selectedPalette: DesignPalette;
}

export const BroadcastProRoundedPlayerRankBadge: React.FC<
  BroadcastProRoundedPlayerRankBadgeProps
> = ({
  rank,
  isFeatured,
  className,
  glass,
  text,
  accent,
  headingFont,
  selectedPalette,
}) => {
  const style: React.CSSProperties = isFeatured
    ? {
        backgroundColor: accent,
        color: resolveBroadcastProRoundedCopyOnBackground(
          accent,
          selectedPalette,
        ),
      }
    : {
        backgroundColor: glass.muted,
        color: text.muted,
      };

  return (
    <div className={`${className} ${headingFont}`.trim()} style={style}>
      #{rank}
    </div>
  );
};
