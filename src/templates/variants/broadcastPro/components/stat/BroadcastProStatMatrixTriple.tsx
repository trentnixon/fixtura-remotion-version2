import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import {
  BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS,
  type BroadcastProStatMatrixCell,
  type BroadcastProStatMatrixTier,
} from "../../../../../templates/types/broadcast-pro/stat-matrix";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProTextOnContainer } from "../../../../../compositions/cricket/utils/broadcastPro/themeColors";
import { BroadcastProStatMatrixCellView } from "./BroadcastProStatMatrixCell";

export interface BroadcastProStatMatrixTripleProps {
  cells: BroadcastProStatMatrixCell[];
  tier: Exclude<BroadcastProStatMatrixTier, "compact" | "resultRow">;
  headingFont: string;
  text: BroadcastProTextOnContainer;
  glass: BroadcastProGlassStyle;
  accent: string;
  className?: string;
}

export const BroadcastProStatMatrixTriple: React.FC<
  BroadcastProStatMatrixTripleProps
> = ({ cells, tier, headingFont, text, glass, accent, className = "" }) => {
  const { componentStyles } = useThemeContext();
  const tierKeys = BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS[tier];
  const rowClass = csClass(componentStyles, tierKeys.row);
  const dividerClass = csClass(componentStyles, tierKeys.divider);
  const labelClass = csClass(componentStyles, "broadcastProStatMatrixLabel");

  const performancesBorderStyle =
    tier === "performancesTriple" ? { borderTop: glass.border } : undefined;

  const tripleCells = cells.slice(0, 3);
  while (tripleCells.length < 3) {
    tripleCells.push({ value: "" });
  }

  return (
    <div
      className={`${rowClass} ${className}`.trim()}
      style={performancesBorderStyle}
    >
      {tripleCells.map((cell, index) => (
        <BroadcastProStatMatrixCellView
          key={`${cell.label ?? "stat"}-${index}`}
          cell={cell}
          tier={tier}
          index={index}
          withDivider={index > 0}
          headingFont={headingFont}
          labelClassName={labelClass}
          dividerClassName={dividerClass}
          text={text}
          glass={glass}
          accent={accent}
        />
      ))}
    </div>
  );
};
