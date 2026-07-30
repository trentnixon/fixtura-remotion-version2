import React from "react";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import { BroadcastProStructuredScore } from "../score/BroadcastProStructuredScore";

export interface BroadcastProStatMatrixCompactProps {
  value: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  colorVariant?: ColorVariant;
  className?: string;
  suffixClassName?: string;
  fontFamily?: string;
  primaryStyle?: React.CSSProperties;
  suffixStyle?: React.CSSProperties;
}

/** Inline primary + suffix figures for TotW cards (`33* (14)`, `4/32 (10)`). */
export const BroadcastProStatMatrixCompact: React.FC<
  BroadcastProStatMatrixCompactProps
> = ({
  value,
  animation,
  exitAnimation,
  exitFrame,
  colorVariant = "onContainerCopy",
  className = "",
  suffixClassName = "",
  fontFamily,
  primaryStyle,
  suffixStyle,
}) => (
  <BroadcastProStructuredScore
    value={value}
    variant="playerStat"
    animation={animation}
    exitAnimation={exitAnimation}
    exitFrame={exitFrame}
    colorVariant={colorVariant}
    primaryVariant={colorVariant}
    suffixVariant={colorVariant}
    className={className}
    suffixClassName={suffixClassName}
    fontFamily={fontFamily}
    primaryStyle={primaryStyle}
    suffixStyle={suffixStyle}
  />
);
