import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { NightSessionResultsMatchContent } from "../../utils/nightSession/results/NightSessionResultsMatchContent";
import { useNightSessionRowEnterTiming } from "../../utils/nightSession/NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX } from "../../utils/nightSession/nightSessionAnimationTiming";
import { MatchResult } from "../../results/_types/types";
import { calculateAnimationOutFrame } from "../../results/controller/MatchRow/_utils/calculations";

export const LiteMatchCardNightSession: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const containerAnimation = animations.container.main.itemContainer;
  const enterTiming = useNightSessionRowEnterTiming();
  const delay = enterTiming.rowDelayForIndex(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );

  const fixtureEnter = useMemo(
    () => ({
      ...containerAnimation.containerIn,
      custom: { distance: NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX },
    }),
    [containerAnimation.containerIn],
  );
  const fixtureExit = useMemo(
    () => ({
      ...containerAnimation.containerOut,
      custom: { distance: NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX },
    }),
    [containerAnimation.containerOut],
  );

  return (
    <AnimatedContainer
      type="full"
      size="auto"
      className="flex min-h-0 w-full flex-1 flex-col rounded-none"
      backgroundColor="none"
      animation={fixtureEnter}
      animationDelay={delay}
      exitAnimation={fixtureExit}
      exitFrame={animationOutFrame}
    >
      <NightSessionResultsMatchContent
        match={match}
        rowDelay={delay}
        exitFrame={animationOutFrame}
        showPerformancePanels={false}
        showMatchContext={false}
        bandLogoBackground
        className="min-h-0 flex-1"
      />
    </AnimatedContainer>
  );
};
