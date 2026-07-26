import React from "react";
import {
  AnimatedText,
  type ColorVariant,
} from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { BroadcastProScoreRole } from "../../../../../templates/types/broadcast-pro/score-typography";
import { DEFAULT_BROADCAST_PRO_SCORE_SIZING } from "../../../../../templates/types/broadcast-pro/score-typography";
import {
  getBroadcastProScoreRoleClass,
  getBroadcastProScoreThemeKey,
} from "../../../../../compositions/cricket/utils/broadcastPro/score/scoreRoleClass";

export interface BroadcastProScoreTextProps {
  value: string;
  role: BroadcastProScoreRole;
  variant?: ColorVariant;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  className?: string;
  style?: React.CSSProperties;
  fontFamily?: string;
  compact?: boolean;
  letterAnimation?: "none" | "word";
  /** Overrides AnimatedText `type` / componentStyles lookup (e.g. TotW stat suffix). */
  themeType?: string;
}

const COMPACT_ROLES: BroadcastProScoreRole[] = [
  "tableRank",
  "tableStat",
  "tablePoints",
  "matchDivider",
];

export const BroadcastProScoreText: React.FC<BroadcastProScoreTextProps> = ({
  value,
  role,
  variant = "onContainerCopy",
  animation,
  exitAnimation,
  exitFrame,
  className = "",
  style,
  fontFamily: fontFamilyOverride,
  compact = false,
  letterAnimation = "none",
  themeType,
}) => {
  const { componentStyles, fontClasses, fonts, broadcastProScoreSizing } =
    useThemeContext();

  const sizing = broadcastProScoreSizing ?? DEFAULT_BROADCAST_PRO_SCORE_SIZING;
  const useCompactTier = compact && COMPACT_ROLES.includes(role);
  const roleClass = getBroadcastProScoreRoleClass(componentStyles, role, {
    compact: useCompactTier,
    sizing,
  });
  const fontFamily =
    fontFamilyOverride ??
    fontClasses?.heading?.family ??
    fonts?.title?.family ??
    "Teko";

  const animatedType =
    themeType ??
    (useCompactTier ? "bodyText" : getBroadcastProScoreThemeKey(role));

  return (
    <AnimatedText
      type={animatedType}
      variant={variant}
      fontFamily={fontFamily}
      className={
        useCompactTier
          ? `${roleClass} ${className}`.trim()
          : className || roleClass
      }
      style={style}
      animation={animation}
      exitAnimation={exitAnimation}
      exitFrame={exitFrame}
      letterAnimation={letterAnimation}
    >
      {value}
    </AnimatedText>
  );
};
