import React from "react";
import type { DesignPalette } from "../../../../../core/utils/designPalettes/types";
import type { BroadcastProGlassStyle } from "../glass";
import {
  resolveBroadcastProCopyOnBackground,
  type BroadcastProTextOnContainer,
} from "../themeColors";
import type { BroadcastProPlayerRankBadgePlacement } from "./types";

export interface BroadcastProPlayerRankBadgeProps {
  rank: number;
  placement: BroadcastProPlayerRankBadgePlacement;
  isFeatured: boolean;
  className: string;
  glass: BroadcastProGlassStyle;
  text: BroadcastProTextOnContainer;
  accent: string;
  headingFont: string;
  selectedPalette: DesignPalette;
}

export const BroadcastProPlayerRankBadge: React.FC<
  BroadcastProPlayerRankBadgeProps
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
        color: resolveBroadcastProCopyOnBackground(accent, selectedPalette),
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
