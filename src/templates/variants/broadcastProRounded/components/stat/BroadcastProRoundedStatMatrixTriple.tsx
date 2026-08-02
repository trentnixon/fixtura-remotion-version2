import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import {
  BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS,
  type BroadcastProRoundedStatMatrixCell,
  type BroadcastProRoundedStatMatrixTier,
} from "../../../../../templates/types/broadcast-pro-rounded/stat-matrix";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type { BroadcastProRoundedTextOnContainer } from "../../../../../compositions/cricket/utils/broadcastProRounded/themeColors";
import { BroadcastProRoundedStatMatrixCellView } from "./BroadcastProRoundedStatMatrixCell";

export interface BroadcastProRoundedStatMatrixTripleProps {
  cells: BroadcastProRoundedStatMatrixCell[];
  tier: Exclude<BroadcastProRoundedStatMatrixTier, "compact" | "resultRow">;
  headingFont: string;
  text: BroadcastProRoundedTextOnContainer;
  glass: BroadcastProRoundedGlassStyle;
  accent: string;
  className?: string;
}

export const BroadcastProRoundedStatMatrixTriple: React.FC<
  BroadcastProRoundedStatMatrixTripleProps
> = ({ cells, tier, headingFont, text, glass, accent, className = "" }) => {
  const { componentStyles } = useThemeContext();
  const tierKeys = BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS[tier];
  const rowClass = csClass(componentStyles, tierKeys.row);
  const dividerClass = csClass(componentStyles, tierKeys.divider);
  const labelClass = csClass(componentStyles, tierKeys.label);

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
        <BroadcastProRoundedStatMatrixCellView
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
