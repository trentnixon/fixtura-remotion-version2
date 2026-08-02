import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { BROADCAST_PRO_VERDICT_ROLE_THEME_KEY } from "../../../../../templates/types/broadcast-pro-rounded/verdict-typography";

export interface BroadcastProRoundedVerdictAbandonedProps {
  status: string;
  result?: string;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  delay?: number;
}

export const BroadcastProRoundedVerdictAbandoned: React.FC<
  BroadcastProRoundedVerdictAbandonedProps
> = ({ status, result, animation, exitAnimation, exitFrame, delay = 0 }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text } = useBroadcastProRoundedTheme();
  const bodyFont =
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const statusClass =
    componentStyles.broadcastProRoundedVerdictStatus?.className ??
    componentStyles[BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.status]?.className ??
    "";
  const resultClass =
    componentStyles.broadcastProRoundedVerdictFixtureResult?.className ??
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
          style={{ color: text.muted }}
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
          style={{ color: text.copy }}
        >
          {result}
        </AnimatedText>
      ) : null}
    </>
  );
};
