import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { BroadcastProStatMatrixResultCell } from "./BroadcastProStatMatrixResultCell";

export interface BroadcastProStatMatrixResultItem {
  playerName: string;
  statValue: string;
  highlight?: boolean;
}

export interface BroadcastProStatMatrixResultGridProps {
  items: BroadcastProStatMatrixResultItem[];
  delay: number;
  accentColor: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
  tier?: "list" | "single";
}

export const BroadcastProStatMatrixResultGrid: React.FC<
  BroadcastProStatMatrixResultGridProps
> = ({ items, delay, accentColor, glass, className = "", tier = "list" }) => {
  const { componentStyles } = useThemeContext();
  const gridClass = csClass(componentStyles, "broadcastProStatMatrixResultGrid");
  const resolvedGridClass =
    tier === "single" ? `${gridClass} gap-2` : gridClass;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${resolvedGridClass} ${className}`.trim()}>
      {items.map((item, index) => (
        <BroadcastProStatMatrixResultCell
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
