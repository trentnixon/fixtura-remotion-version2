import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { BROADCAST_PRO_VERDICT_ROLE_THEME_KEY } from "../../../../../templates/types/broadcast-pro-rounded/verdict-typography";

export interface BroadcastProRoundedVerdictHeroLockupProps {
  winner: string;
  contextLine: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  delay?: number;
  accentColor: string;
}

export const BroadcastProRoundedVerdictHeroLockup: React.FC<
  BroadcastProRoundedVerdictHeroLockupProps
> = ({
  winner,
  contextLine,
  animation,
  exitAnimation,
  exitFrame,
  delay = 0,
  accentColor,
}) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text } = useBroadcastProRoundedTheme();
  const copyIn = animation;
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";
  const bodyFont =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const winnerClass =
    componentStyles.broadcastProRoundedVerdictWinner?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.winner]?.className ??
    "";
  const contextClass =
    componentStyles.broadcastProRoundedVerdictContext?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.context]?.className ??
    "";

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <AnimatedText
        type={BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.winner}
        variant="onContainerTitle"
        fontFamily={headingFont}
        className={winnerClass}
        animation={copyIn}
        animationDelay={delay}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        letterAnimation="word"
        style={{ color: accentColor }}
      >
        {winner}
      </AnimatedText>
      <AnimatedText
        type={BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.context}
        variant="onContainerCopy"
        fontFamily={bodyFont}
        className={contextClass}
        animation={copyIn}
        animationDelay={delay + 2}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        letterAnimation="word"
        style={{ color: text.copy }}
      >
        {contextLine}
      </AnimatedText>
    </div>
  );
};
