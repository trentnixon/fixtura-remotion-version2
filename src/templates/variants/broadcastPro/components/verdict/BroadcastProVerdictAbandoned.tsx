import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BROADCAST_PRO_VERDICT_ROLE_THEME_KEY } from "../../../../../templates/types/broadcast-pro/verdict-typography";

export interface BroadcastProVerdictAbandonedProps {
  status: string;
  result?: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  delay?: number;
}

export const BroadcastProVerdictAbandoned: React.FC<
  BroadcastProVerdictAbandonedProps
> = ({ status, result, animation, exitAnimation, exitFrame, delay = 0 }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const bodyFont =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const statusClass =
    componentStyles.broadcastProVerdictStatus?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.status]?.className ??
    "";
  const resultClass =
    componentStyles.broadcastProVerdictFixtureResult?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.fixtureResult]
      ?.className ??
    "";

  return (
    <>
      {status ? (
        <AnimatedText
          type="ResultMetaData"
          variant="onContainerCopy"
          fontFamily={bodyFont}
          className={statusClass}
          animation={animation}
          animationDelay={delay}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        >
          {status}
        </AnimatedText>
      ) : null}
      {result ? (
        <AnimatedText
          type="ResultFixtureResult"
          variant="onContainerTitle"
          fontFamily={bodyFont}
          className={`${resultClass} text-center`.trim()}
          animation={animation}
          animationDelay={delay + 2}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        >
          {result}
        </AnimatedText>
      ) : null}
    </>
  );
};
