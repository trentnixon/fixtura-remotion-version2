import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import { BroadcastProScoreText } from "../score/BroadcastProScoreText";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";

export interface BroadcastProMatchupDividerProps {
  variant: "vs" | "versus";
  delay?: number;
  compact?: boolean;
  fontFamily?: string;
  className?: string;
  animateContent?: boolean;
}

export const BroadcastProMatchupDivider: React.FC<
  BroadcastProMatchupDividerProps
> = ({
  variant,
  delay = 0,
  compact = false,
  fontFamily,
  className = "",
  animateContent = true,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { textOnGlass, headingFont } = useBroadcastProTheme();
  const copyIn = animations.text.main.copyIn;
  const resolvedFont = fontFamily ?? headingFont;

  if (variant === "vs") {
    const slotClass = csClass(
      componentStyles,
      "broadcastProMatchupDividerSlot",
    );
    return (
      <div
        className={`${slotClass} ${className}`.trim()}
        style={{ fontFamily: resolvedFont }}
      >
        <BroadcastProScoreText
          value="VS"
          role="matchDivider"
          variant="onContainerTitle"
          animation={
            animateContent ? { ...copyIn, delay: delay + 9 } : { type: "none" }
          }
          exitAnimation={animateContent ? undefined : "none"}
          fontFamily={resolvedFont}
          compact={compact}
          style={{ color: textOnGlass.copy }}
        />
      </div>
    );
  }

  const versusClass = csClass(
    componentStyles,
    "broadcastProMatchupDividerVersus",
  );

  return (
    <AnimatedText
      type="bodyText"
      variant="onContainerCopy"
      fontFamily={resolvedFont}
      className={`${versusClass} ${className}`.trim()}
      style={{ color: textOnGlass.muted }}
      animation={animateContent ? { ...copyIn, delay } : { type: "none" }}
      exitAnimation={animateContent ? undefined : "none"}
      letterAnimation="none"
    >
      VERSUS
    </AnimatedText>
  );
};
