import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardNightSession from "../../layout/MatchCard/card-NightSession";
import { MatchRowProps } from "./_types/MatchRowProps";
import { calculateAnimationOutFrame } from "./_utils/calculations";
import { useNightSessionRowEnterTiming } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX } from "../../../utils/nightSession/nightSessionAnimationTiming";

const MatchRowNightSession: React.FC<MatchRowProps> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const enterTiming = useNightSessionRowEnterTiming();
  const delay = enterTiming.rowDelayForIndex(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

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
      <MatchCardNightSession
        match={match}
        index={index}
        rowHeight={0}
        delay={delay}
        exitFrame={animationOutFrame}
        className="min-h-0 flex-1"
      />
    </AnimatedContainer>
  );
};

export default MatchRowNightSession;
