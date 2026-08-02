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
import type { BroadcastProRoundedScoreRole } from "../../../../../templates/types/broadcast-pro-rounded/score-typography";
import { DEFAULT_BROADCAST_PRO_SCORE_SIZING } from "../../../../../templates/types/broadcast-pro-rounded/score-typography";
import {
  getBroadcastProRoundedScoreRoleClass,
  getBroadcastProRoundedScoreThemeKey,
} from "../../../../../compositions/cricket/utils/broadcastProRounded/score/scoreRoleClass";

export interface BroadcastProRoundedScoreTextProps {
  value: string;
  role: BroadcastProRoundedScoreRole;
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

const COMPACT_ROLES: BroadcastProRoundedScoreRole[] = [
  "tableRank",
  "tableStat",
  "tablePoints",
  "matchDivider",
];

export const BroadcastProRoundedScoreText: React.FC<BroadcastProRoundedScoreTextProps> = ({
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
  const { componentStyles, fontClasses, fonts, broadcastProRoundedScoreSizing } =
    useThemeContext();

  const sizing = broadcastProRoundedScoreSizing ?? DEFAULT_BROADCAST_PRO_SCORE_SIZING;
  const useCompactTier = compact && COMPACT_ROLES.includes(role);
  const roleClass = getBroadcastProRoundedScoreRoleClass(componentStyles, role, {
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
    (useCompactTier ? "bodyText" : getBroadcastProRoundedScoreThemeKey(role));

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
