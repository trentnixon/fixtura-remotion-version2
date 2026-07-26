import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ResultPlayerName } from "../../../../../compositions/cricket/utils/primitives/ResultPlayerName";
import { BroadcastProGlassPanel } from "../../../../../compositions/cricket/utils/broadcastPro/results/BroadcastProGlassPanel";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { BroadcastProStatMatrixCompact } from "./BroadcastProStatMatrixCompact";

export interface BroadcastProStatMatrixResultCellProps {
  playerName: string;
  statValue: string;
  highlight?: boolean;
  delay: number;
  accentColor: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
}

export const BroadcastProStatMatrixResultCell: React.FC<
  BroadcastProStatMatrixResultCellProps
> = ({
  playerName,
  statValue,
  highlight = false,
  delay,
  accentColor,
  glass,
  className = "",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const copyIn = animations.text.main.copyIn;
  const cellClass = csClass(componentStyles, "broadcastProStatMatrixResultCell");
  const nameClass = csClass(componentStyles, "broadcastProStatMatrixResultName");
  const valueClass = csClass(
    componentStyles,
    "broadcastProStatMatrixResultValue",
  );
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  return (
    <BroadcastProGlassPanel glass={glass} className={`${cellClass} ${className}`.trim()}>
      <ResultPlayerName
        value={playerName}
        animation={{ ...copyIn, delay }}
        variant="onContainerCopy"
        className={nameClass}
      />
      <div
        className={valueClass}
        style={highlight ? { color: accentColor } : undefined}
      >
        <BroadcastProStatMatrixCompact
          value={statValue}
          animation={{ ...copyIn, delay: delay + 2 }}
          colorVariant={highlight ? "onContainerTitle" : "onContainerCopy"}
          fontFamily={headingFont}
        />
      </div>
    </BroadcastProGlassPanel>
  );
};
