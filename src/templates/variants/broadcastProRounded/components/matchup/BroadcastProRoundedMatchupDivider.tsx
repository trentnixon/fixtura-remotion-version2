import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { BroadcastProRoundedScoreText } from "../score/BroadcastProRoundedScoreText";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";

export interface BroadcastProRoundedMatchupDividerProps {
  variant: "vs" | "versus";
  delay?: number;
  compact?: boolean;
  fontFamily?: string;
  className?: string;
}

export const BroadcastProRoundedMatchupDivider: React.FC<
  BroadcastProRoundedMatchupDividerProps
> = ({ variant, delay = 0, compact = false, fontFamily, className = "" }) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { textOnGlass, headingFont } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const resolvedFont = fontFamily ?? headingFont;

  if (variant === "vs") {
    const slotClass = csClass(
      componentStyles,
      "broadcastProRoundedMatchupDividerSlot",
    );
    return (
      <div
        className={`${slotClass} ${className}`.trim()}
        style={{ fontFamily: resolvedFont }}
      >
        <BroadcastProRoundedScoreText
          value="VS"
          role="matchDivider"
          variant="onContainerTitle"
          animation={{ ...copyIn, delay: delay + 9 }}
          fontFamily={resolvedFont}
          compact={compact}
          style={{ color: textOnGlass.copy }}
        />
      </div>
    );
  }

  const versusClass = csClass(
    componentStyles,
    "broadcastProRoundedMatchupDividerVersus",
  );

  return (
    <AnimatedText
      type="bodyText"
      variant="onContainerCopy"
      fontFamily={resolvedFont}
      className={`${versusClass} ${className}`.trim()}
      style={{ color: textOnGlass.muted }}
      animation={{ ...copyIn, delay }}
      letterAnimation="none"
    >
      VERSUS
    </AnimatedText>
  );
};
