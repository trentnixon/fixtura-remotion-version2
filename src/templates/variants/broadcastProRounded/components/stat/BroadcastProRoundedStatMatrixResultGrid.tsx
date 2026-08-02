import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import { BroadcastProRoundedStatMatrixResultCell } from "./BroadcastProRoundedStatMatrixResultCell";

export interface BroadcastProRoundedStatMatrixResultItem {
  playerName: string;
  statValue: string;
  highlight?: boolean;
}

export interface BroadcastProRoundedStatMatrixResultGridProps {
  items: BroadcastProRoundedStatMatrixResultItem[];
  delay: number;
  accentColor: string;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
  tier?: "list" | "single";
}

export const BroadcastProRoundedStatMatrixResultGrid: React.FC<
  BroadcastProRoundedStatMatrixResultGridProps
> = ({ items, delay, accentColor, glass, className = "", tier = "list" }) => {
  const { componentStyles } = useThemeContext();
  const gridClass = csClass(
    componentStyles,
    "broadcastProRoundedStatMatrixResultGrid",
  );
  const resolvedGridClass =
    tier === "single" ? `${gridClass} gap-2` : gridClass;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${resolvedGridClass} ${className}`.trim()}>
      {items.map((item, index) => (
        <BroadcastProRoundedStatMatrixResultCell
          key={`${item.playerName}-${item.statValue}-${index}`}
          {...item}
          delay={delay + index * 2}
          accentColor={accentColor}
          glass={glass}
          tier={tier}
        />
      ))}
    </div>
  );
};
