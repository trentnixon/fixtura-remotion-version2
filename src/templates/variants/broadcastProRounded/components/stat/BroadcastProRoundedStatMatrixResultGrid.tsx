import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import type {
  BroadcastProRoundedGlassStyle,
  BroadcastProRoundedSurfaceConnection,
} from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { RESULT_STAT_CELL_STAGGER } from "../../../../../compositions/cricket/utils/broadcastProRounded/results/matchContentHelpers";
import {
  BroadcastProRoundedStatMatrixResultCell,
  type BroadcastProRoundedResultStatTier,
} from "./BroadcastProRoundedStatMatrixResultCell";

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
  tier?: BroadcastProRoundedResultStatTier;
  connection?: BroadcastProRoundedSurfaceConnection;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

export const BroadcastProRoundedStatMatrixResultGrid: React.FC<
  BroadcastProRoundedStatMatrixResultGridProps
> = ({
  items,
  delay,
  accentColor,
  glass,
  className = "",
  tier = "list",
  connection = "standalone",
  exitAnimation,
  exitFrame,
}) => {
  const { componentStyles } = useThemeContext();
  const gridClass = csClass(
    componentStyles,
    "broadcastProRoundedStatMatrixResultGrid",
  );
  const resolvedGridClass =
    tier === "listEmbedded"
      ? `${gridClass} w-full min-w-0 border-t border-white/20 pt-1`
      : gridClass;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${resolvedGridClass} ${className}`.trim()}>
      {items.map((item, index) => (
        <BroadcastProRoundedStatMatrixResultCell
          key={`${item.playerName}-${item.statValue}-${index}`}
          {...item}
          delay={delay + index * RESULT_STAT_CELL_STAGGER}
          accentColor={accentColor}
          glass={glass}
          tier={tier}
          connection={connection}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      ))}
    </div>
  );
};
