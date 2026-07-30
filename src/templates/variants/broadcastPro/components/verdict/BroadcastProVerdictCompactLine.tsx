import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import { BROADCAST_PRO_VERDICT_ROLE_THEME_KEY } from "../../../../../templates/types/broadcast-pro/verdict-typography";

export interface BroadcastProVerdictCompactLineProps {
  line: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  delay?: number;
}

export const BroadcastProVerdictCompactLine: React.FC<
  BroadcastProVerdictCompactLineProps
> = ({ line, animation, exitAnimation, exitFrame, delay = 0 }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text } = useBroadcastProTheme();
  const bodyFont =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const lineClass =
    componentStyles.broadcastProVerdictLine?.className ??
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
