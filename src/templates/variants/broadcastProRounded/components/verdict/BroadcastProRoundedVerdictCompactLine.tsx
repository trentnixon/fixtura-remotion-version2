import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { BROADCAST_PRO_VERDICT_ROLE_THEME_KEY } from "../../../../../templates/types/broadcast-pro-rounded/verdict-typography";

export interface BroadcastProRoundedVerdictCompactLineProps {
  line: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  delay?: number;
}

export const BroadcastProRoundedVerdictCompactLine: React.FC<
  BroadcastProRoundedVerdictCompactLineProps
> = ({ line, animation, exitAnimation, exitFrame, delay = 0 }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text } = useBroadcastProRoundedTheme();
  const bodyFont =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const lineClass =
    componentStyles.broadcastProRoundedVerdictLine?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.line]?.className ??
    "";

  return (
    <AnimatedText
      type="ResultStatementShort"
      variant="onContainerCopy"
      fontFamily={bodyFont}
      className={`${lineClass} w-full`.trim()}
      animation={animation}
      animationDelay={delay}
      exitAnimation={exitAnimation}
      exitFrame={exitFrame}
      letterAnimation="word"
      style={{ color: text.copy }}
    >
      {line}
    </AnimatedText>
  );
};
